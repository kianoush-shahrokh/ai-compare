// ===== منوی موبایل =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// ===== سال جاری در فوتر =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}