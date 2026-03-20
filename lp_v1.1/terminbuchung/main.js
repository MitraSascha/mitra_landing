/* ══════════════════════════════════════════════════════════
   MITRA Sanitär – 3-Schritt-Buchungssystem
   ══════════════════════════════════════════════════════════ */

// ── Konfiguration ────────────────────────────────────────
const WEBHOOK_URL = 'https://DEINE-N8N-INSTANZ/webhook/termin-buchen';

// Bereits gebuchte Slots pro Tag
// Format: { "Mittwoch": ["09:00", "10:30"], "Donnerstag": ["08:00"] }
const TAKEN_SLOTS = {};

// ── Zustand ──────────────────────────────────────────────
const state = { day: null, person: null, initials: null, time: null };

// ── Slot-Generator (08:00–15:00, alle 30 Min.) ───────────
function generateSlots() {
  const slots = [];
  for (let h = 8; h < 15; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  slots.push('15:00');
  return slots;
}

// ── Zeitraster rendern ───────────────────────────────────
function renderTimeGrid(day) {
  const grid  = document.getElementById('timeGrid');
  const taken = TAKEN_SLOTS[day] || [];

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
    `Freie Slots für ${day} – wähle deinen Wunschtermin.`;
}

// ── Tag-Auswahl ──────────────────────────────────────────
document.querySelectorAll('.day-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.day-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.day      = card.dataset.day;
    state.person   = card.dataset.person;
    state.initials = card.dataset.initials;
    // Zeitauswahl zurücksetzen wenn Tag wechselt
    state.time = null;
    document.getElementById('btn2Next').disabled = true;
    document.getElementById('btn1Next').disabled = false;
    updateSummary();
  });
});

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

  if (step === 2 && state.day) renderTimeGrid(state.day);

  updateSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Zusammenfassung aktualisieren ────────────────────────
function updateSummary() {
  document.getElementById('sum_day').textContent    = state.day    || '—';
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
  const name  = document.getElementById('f_name').value.trim();
  const phone = document.getElementById('f_phone').value.trim();
  const email = document.getElementById('f_email').value.trim();
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

  const payload = {
    tag:        state.day,
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
    const res = await fetch(WEBHOOK_URL, {
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

    // Inline-Fehlermeldung über dem Formular
    const errBox = document.createElement('div');
    errBox.style.cssText = 'background:#fff5f5;border:2px solid #dc2626;border-radius:8px;padding:12px 16px;font-size:.875rem;color:#dc2626;font-weight:600;margin-bottom:16px;animation:errSlide .2s ease-out both;';
    errBox.textContent = 'Fehler beim Senden (' + err.message + '). Bitte WEBHOOK_URL in main.js konfigurieren.';
    const formCol = document.querySelector('.form-col');
    if (formCol) formCol.prepend(errBox);
    setTimeout(() => errBox.remove(), 8000);
  }
}
