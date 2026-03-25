/* ══════════════════════════════════════════════════════════
   MITRA Sanitär – 3-Schritt-Buchungssystem
   ══════════════════════════════════════════════════════════ */

// ── Konfiguration ────────────────────────────────────────
const WEBHOOK_AVAILABILITY = 'https://n8n.tech-artist.de/webhook/booking/availability';

const WEBHOOK_BY_PERSON = {
  'Milo Sekulovic':    'https://n8n.tech-artist.de/webhook/04f3fcf8-232a-4e6a-82e1-f44e324d6eb2',
  'Patrick van Dalen': 'https://n8n.tech-artist.de/webhook/04f3fcf8-232a-4e6a-82e1-f44e324d6eb2',
};

// Berater pro Wochentag
const PERSON_BY_DAY = {
  'Mittwoch':   { name: 'Milo Sekulovic',    initials: 'MS', avatarClass: '',   role: 'Fachberater Bad & Sanitär' },
  'Donnerstag': { name: 'Patrick van Dalen', initials: 'PD', avatarClass: ' sk', role: 'Fachberater Bad & Sanitär' },
};

// Belegte Slots – werden dynamisch via GET /availability befüllt
// Format: { "Mittwoch": ["09:00", "10:30"], "Donnerstag": ["08:00"] }
let TAKEN_SLOTS = {};

// ── Zustand ──────────────────────────────────────────────
const state = { day: null, date: null, person: null, initials: null, time: null };

// ── Busy-Blöcke auswerten ────────────────────────────────
// Gibt zurück: { bookingDays, takenSlots }
// bookingDays: [{ dayName, isoDate }, ...] sortiert nach Datum
// takenSlots:  { "2026-03-26": ["09:00", ...], ... }
function parseBusyData(busy) {
  const allSlots   = generateSlots();
  const BOOKING_DAYS = ['Mittwoch', 'Donnerstag'];
  const dayNames   = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];

  // Busy-Einträge nach Datum gruppieren
  const byDate = {};
  busy.forEach(({ start, end }) => {
    const datePart = start.split('T')[0];
    if (!byDate[datePart]) byDate[datePart] = [];
    byDate[datePart].push({ start, end });
  });

  // Alle Mittwoche + Donnerstage der nächsten 28 Tage generieren
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingDays = [];

  for (let i = 1; i <= 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = dayNames[d.getDay()];
    if (!BOOKING_DAYS.includes(dayName)) continue;
    const isoDate = d.toISOString().slice(0, 10);
    bookingDays.push({ dayName, isoDate });
  }

  // Belegte Slots pro Datum berechnen
  const takenSlots = {};
  bookingDays.forEach(({ isoDate }) => {
    takenSlots[isoDate] = [];
    (byDate[isoDate] || []).forEach(({ start, end }) => {
      const [sh, sm] = start.split('T')[1].slice(0, 5).split(':').map(Number);
      const [eh, em] = end.split('T')[1].slice(0, 5).split(':').map(Number);
      const busyStart = sh * 60 + sm;
      const busyEnd   = eh * 60 + em;
      allSlots.forEach(slot => {
        const [slotH, slotM] = slot.split(':').map(Number);
        const slotMin = slotH * 60 + slotM;
        if (slotMin >= busyStart && slotMin < busyEnd) {
          if (!takenSlots[isoDate].includes(slot)) takenSlots[isoDate].push(slot);
        }
      });
    });
  });

  return { bookingDays, takenSlots };
}

// ── Day-Cards dynamisch rendern ───────────────────────────
function renderDayCards(bookingDays) {
  const grid      = document.getElementById('dayGrid');
  const allSlots  = generateSlots();
  grid.innerHTML  = '';

  bookingDays.forEach(({ dayName, isoDate }, index) => {
    const person    = PERSON_BY_DAY[dayName];
    if (!person) return;
    const taken     = TAKEN_SLOTS[isoDate] || [];
    const freeCount = allSlots.length - taken.length;

    const card = document.createElement('div');
    card.className          = 'card day-card';
    card.dataset.day        = dayName;
    card.dataset.date       = isoDate;
    card.dataset.person     = person.name;
    card.dataset.initials   = person.initials;

    card.innerHTML = `
      <div class="day-card-header">
        <span class="day-badge">Tag ${index + 1}</span>
        <span class="day-avail">${freeCount} Slot${freeCount !== 1 ? 's' : ''} frei</span>
      </div>
      <div class="day-name">${dayName}</div>
      <div class="day-date">${formatDate(isoDate)}</div>
      <div class="day-slots">30-Min-Slots · 08:00 – 15:00 Uhr</div>
      <div class="day-person">
        <div class="avatar${person.avatarClass}">${person.initials}</div>
        <div class="person-info">
          <div class="person-name">${person.name}</div>
          <div class="person-role">${person.role}</div>
        </div>
        <div class="check-indicator"></div>
      </div>
    `;

    card.addEventListener('click', () => selectDayCard(card));
    grid.appendChild(card);
  });
}

// ISO-Datum "2026-03-25" → "25.03.2026"
function formatDate(isoStr) {
  const [y, m, d] = isoStr.split('-');
  return `${d}.${m}.${y}`;
}

// ── Availability beim Seitenstart laden ──────────────────
async function loadAvailability() {
  try {
    const res = await fetch(WEBHOOK_AVAILABILITY);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    // data = { ok: true, timezone: "Europe/Berlin", busy: [...] }
    if (data.busy && Array.isArray(data.busy)) {
      const { bookingDays, takenSlots } = parseBusyData(data.busy);
      TAKEN_SLOTS = takenSlots;
      renderDayCards(bookingDays);
    }
  } catch (err) {
    // Kein Blocker – alle Slots bleiben anwählbar
    console.warn('Availability nicht geladen:', err.message);
  }
}

loadAvailability();

// ── Slot-Generator (08:00–15:00, 30 Min., Pause 12:00–13:00) ──
const BREAK_START = 12 * 60;      // 720 Min.
const BREAK_END   = 13 * 60;      // 780 Min.

function generateSlots() {
  const slots = [];
  for (let h = 8; h <= 15; h++) {
    for (const m of [0, 30]) {
      if (h === 15 && m === 30) break; // Schluss nach 15:00
      const mins = h * 60 + m;
      if (mins >= BREAK_START && mins < BREAK_END) continue; // Pause überspringen
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
}

// ── Zeitraster rendern ───────────────────────────────────
function renderTimeGrid() {
  const grid  = document.getElementById('timeGrid');
  const taken = TAKEN_SLOTS[state.date] || [];

  grid.innerHTML = '';
  generateSlots().forEach(slot => {
    const el = document.createElement('div');
    el.className = 'time-slot' + (taken.includes(slot) ? ' taken' : '');
    el.textContent = slot;
    if (!taken.includes(slot)) {
      el.addEventListener('click', () => selectTime(slot, el));
    }
    grid.appendChild(el);
  });

  document.getElementById('step2Sub').textContent =
    `Freie Slots für ${state.day}, ${formatDate(state.date)} – wähle deinen Wunschtermin.`;
}

// ── Tag-Auswahl ──────────────────────────────────────────
function selectDayCard(card) {
  document.querySelectorAll('.day-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  state.day      = card.dataset.day;
  state.date     = card.dataset.date || null;
  state.person   = card.dataset.person;
  state.initials = card.dataset.initials;
  state.time     = null;
  document.getElementById('btn2Next').disabled = true;
  document.getElementById('btn1Next').disabled = false;
  updateSummary();
}

// ── Zeit-Auswahl ─────────────────────────────────────────
function selectTime(slot, el) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  state.time = slot;
  document.getElementById('btn2Next').disabled = false;
  updateSummary();
}

// ── Navigation zwischen Schritten ────────────────────────
function goTo(step) {
  // Aktuellen Schritt ausblenden
  [1, 2, 3].forEach(s => {
    const el = document.getElementById('step' + s);
    el.classList.add('hidden');
    el.classList.remove('step-animate');
  });

  // Neuen Schritt einblenden + Animation
  const next = document.getElementById('step' + step);
  next.classList.remove('hidden');
  // Force reflow so animation replays
  void next.offsetWidth;
  next.classList.add('step-animate');

  // Fortschritts-Dots aktualisieren
  [1, 2, 3].forEach(s => {
    const dot = document.getElementById('dot' + s);
    const lbl = document.getElementById('lbl' + s);
    dot.classList.remove('active', 'done');
    lbl.classList.remove('active');
    if (s < step)  { dot.classList.add('done'); }
    if (s === step){ dot.classList.add('active'); lbl.classList.add('active'); }
  });

  document.getElementById('conn1').classList.toggle('done', step > 1);
  document.getElementById('conn2').classList.toggle('done', step > 2);

  if (step === 2 && state.date) renderTimeGrid();

  updateSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Zusammenfassung aktualisieren ────────────────────────
function updateSummary() {
  document.getElementById('sum_day').textContent    = state.day    || '—';
  document.getElementById('sum_date').textContent   = state.date ? formatDate(state.date) : '—';
  document.getElementById('sum_person').textContent = state.person || '—';
  document.getElementById('sum_time').textContent   = state.time   || '—';
}

// ── Inline-Fehler setzen / löschen ───────────────────────
function setError(inputId, errId, show) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (!input || !err) return;
  input.classList.toggle('field-error', show);
  err.classList.toggle('visible', show);
}

function clearErrors() {
  ['f_name', 'f_phone', 'f_email'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.classList.remove('field-error');
  });
  ['err_name', 'err_phone', 'err_email'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('visible');
  });
  const wrap = document.getElementById('disclaimerWrap');
  if (wrap) wrap.classList.remove('has-error');
  const errPrivacy = document.getElementById('err_privacy');
  if (errPrivacy) errPrivacy.classList.remove('visible');
}

// Fehler beim Tippen löschen
['f_name', 'f_phone', 'f_email'].forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener('input', () => {
      input.classList.remove('field-error');
      const errEl = document.getElementById(id.replace('f_', 'err_'));
      if (errEl) errEl.classList.remove('visible');
    });
  }
});

// ── Datenschutz-Checkbox → Buttons freischalten ──────────
const privacyCb = document.getElementById('f_privacy');
if (privacyCb) {
  privacyCb.addEventListener('change', () => {
    const checked = privacyCb.checked;
    ['btnSubmit', 'btnSubmit2'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = !checked;
    });
    if (checked) {
      const wrap = document.getElementById('disclaimerWrap');
      if (wrap) wrap.classList.remove('has-error');
      const errPrivacy = document.getElementById('err_privacy');
      if (errPrivacy) errPrivacy.classList.remove('visible');
    }
  });
}

// ── Formular-Validierung ─────────────────────────────────
function validate() {
  clearErrors();
  const name    = document.getElementById('f_name').value.trim();
  const phone   = document.getElementById('f_phone').value.trim();
  const email   = document.getElementById('f_email').value.trim();
  const privacy = document.getElementById('f_privacy')?.checked;

  let ok = true;

  if (!name) {
    setError('f_name', 'err_name', true);
    ok = false;
  }
  if (!phone) {
    setError('f_phone', 'err_phone', true);
    ok = false;
  }
  if (!email || !email.includes('@')) {
    setError('f_email', 'err_email', true);
    ok = false;
  }
  if (!privacy) {
    const wrap = document.getElementById('disclaimerWrap');
    if (wrap) wrap.classList.add('has-error');
    const errPrivacy = document.getElementById('err_privacy');
    if (errPrivacy) errPrivacy.classList.add('visible');
    ok = false;
  }

  if (!ok) {
    const firstErr = document.querySelector('.field-error, .has-error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return ok;
}

// ── Formular absenden ────────────────────────────────────
async function submitForm() {
  if (!validate()) return;

  const webhookUrl = WEBHOOK_BY_PERSON[state.person];
  if (!webhookUrl) {
    alert('Für diesen Berater ist noch kein Buchungs-Webhook konfiguriert.');
    return;
  }

  const payload = {
    tag:        state.day,
    datum:      state.date,
    zustaendig: state.person,
    uhrzeit:    state.time,
    name:       document.getElementById('f_name').value.trim(),
    telefon:    document.getElementById('f_phone').value.trim(),
    email:      document.getElementById('f_email').value.trim(),
    adresse:    document.getElementById('f_address').value.trim(),
    anliegen:   document.getElementById('f_message').value.trim(),
    timestamp:  new Date().toISOString(),
  };

  // Lade-Zustand
  const btns = [
    document.getElementById('btnSubmit'),
    document.getElementById('btnSubmit2'),
  ];
  btns.forEach(b => {
    if (!b) return;
    b.disabled = true;
    b.innerHTML = '<span class="spinner"></span>Wird gesendet …';
  });

  try {
    const res = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('HTTP ' + res.status);

    // Erfolg
    document.getElementById('step3').classList.add('hidden');
    const screen = document.getElementById('successScreen');
    screen.classList.remove('hidden');
    void screen.offsetWidth;
    document.getElementById('successDetail').textContent =
      `${state.day} · ${state.time} Uhr · ${state.person}`;

    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (err) {
    btns.forEach(b => {
      if (!b) return;
      b.disabled = false;
      b.innerHTML = 'Termin anfragen <svg class="btn-arrow" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });

    const errBox = document.createElement('div');
    errBox.style.cssText = 'background:#fff5f5;border:2px solid #dc2626;border-radius:8px;padding:12px 16px;font-size:.875rem;color:#dc2626;font-weight:600;margin-bottom:16px;';
    errBox.textContent = 'Fehler beim Senden (' + err.message + '). Bitte prüfe die n8n-Verbindung.';
    const formCol = document.querySelector('.form-col');
    if (formCol) formCol.prepend(errBox);
    setTimeout(() => errBox.remove(), 8000);
  }
}
