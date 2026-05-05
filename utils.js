// ═══════════════════════════════════════════
// TEA COMMUNITY V15 — UTILS.JS
// ═══════════════════════════════════════════

export function debounce(fn, ms = 280) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

export function throttle(fn, ms = 100) {
  let last = 0;
  return (...a) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...a); }
  };
}

export function generateMemberID() {
  const yr  = new Date().getFullYear();
  const num = String(Math.floor(2500 + Math.random() * 500)).padStart(4, '0');
  return `TEA-${yr}-${num}`;
}

export function getJoinDate() {
  const d  = new Date();
  const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${String(d.getDate()).padStart(2,'0')} ${mo[d.getMonth()]} ${d.getFullYear()}`;
}

export function getInitials(name = '') {
  return name.trim().split(/\s+/).slice(0,2).map(w => w[0]?.toUpperCase() || '').join('') || '?';
}

export function esc(str) {
  if (!str) return '–';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

export const validate = {
  required: v => v.trim() ? null : 'Field ini wajib diisi',
  minLen:   (n) => v => v.trim().length >= n ? null : `Minimal ${n} karakter`,
  age:      v => {
    const n = Number(v);
    if (!v || isNaN(n)) return 'Umur tidak valid';
    if (n < 13 || n > 60) return 'Umur harus antara 13–60';
    return null;
  }
};

/** Run array of validator fns against a value, return first error or null */
export function runValidators(value, fns = []) {
  for (const fn of fns) {
    const err = fn(value);
    if (err) return err;
  }
  return null;
}
