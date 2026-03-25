/* ══════════════════════════════════════════════════════════
   MITRA Sanitär – Kontaktformular
   ══════════════════════════════════════════════════════════ */

const WEBHOOK_URL = 'https://DEINE-N8N-INSTANZ/webhook/kontakt';

// ── Zustand ──────────────────────────────────────────────
let selectedTopic = null;

// ── Themen-Chips ─────────────────────────────────────────
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
    selectedTopic = chip.dataset.topic;
    // Fehler entfernen wenn Chip gewählt
    document.getElementById('err_topic').classList.remove('visible');
  });
});

// ── Zeichen-Zähler Textarea ───────────────────────────────
const textarea = document.getElementById('f_message');
const charCount = document.getElementById('charCount');
if (textarea) {
  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = len;
    charCount.style.color = len > 720 ? '#ef804e' : '';
  });
}

// ── Fehler beim Tippen löschen ────────────────────────────
['f_name', 'f_phone', 'f_email'].forEach(id => {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener('input', () => {
    input.classList.remove('field-error');
    const errEl = document.getElementById(id.replace('f_', 'err_'));
    if (errEl) errEl.classList.remove('visible');
  });
});

// ── Datenschutz-Checkbox ──────────────────────────────────
const privacyCb = document.getElementById('f_privacy');
if (privacyCb) {
  privacyCb.addEventListener('change', () => {
    if (privacyCb.checked) {
      document.getElementById('disclaimerWrap').classList.remove('has-error');
      document.getElementById('err_privacy').classList.remove('visible');
    }
  });
}

// ── Validierung ───────────────────────────────────────────
function setError(inputId, errId, show) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (input) input.classList.toggle('field-error', show);
  if (err)   err.classList.toggle('visible', show);
}

function validate() {
  let ok = true;

  // Thema
  if (!selectedTopic) {
    document.getElementById('err_topic').classList.add('visible');
    ok = false;
  }

  // Pflichtfelder
  const name  = document.getElementById('f_name').value.trim();
  const phone = document.getElementById('f_phone').value.trim();
  const email = document.getElementById('f_email').value.trim();

  if (!name)  { setError('f_name',  'err_name',  true); ok = false; }
  if (!phone) { setError('f_phone', 'err_phone', true); ok = false; }
  if (!email || !email.includes('@')) { setError('f_email', 'err_email', true); ok = false; }

  // DSGVO
  if (!privacyCb?.checked) {
    document.getElementById('disclaimerWrap').classList.add('has-error');
    document.getElementById('err_privacy').classList.add('visible');
    ok = false;
  }

  if (!ok) {
    const first = document.querySelector('.field-error, .has-error, #err_topic.visible');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return ok;
}

// ── Absenden ──────────────────────────────────────────────
async function submitForm() {
  if (!validate()) return;

  const btn = document.getElementById('btnSubmit');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Wird gesendet …';

  const payload = {
    thema:     selectedTopic,
    name:      document.getElementById('f_name').value.trim(),
    telefon:   document.getElementById('f_phone').value.trim(),
    email:     document.getElementById('f_email').value.trim(),
    adresse:   document.getElementById('f_address').value.trim(),
    nachricht: document.getElementById('f_message').value.trim(),
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('HTTP ' + res.status);

    document.getElementById('formCard').classList.add('hidden');
    const screen = document.getElementById('successScreen');
    screen.classList.remove('hidden');
    document.getElementById('successDetail').textContent = `Thema: ${selectedTopic}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = 'Nachricht senden <svg class="btn-arrow" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const errBox = document.createElement('div');
    errBox.style.cssText = 'background:#fff5f5;border:2px solid #dc2626;border-radius:8px;padding:12px 16px;font-size:.875rem;color:#dc2626;font-weight:600;margin-bottom:16px;';
    errBox.textContent = 'Fehler beim Senden (' + err.message + '). Bitte prüfe die n8n-Verbindung.';
    btn.before(errBox);
    setTimeout(() => errBox.remove(), 8000);
  }
}
