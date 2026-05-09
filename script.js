document.getElementById('year').textContent = new Date().getFullYear();

// Language switcher
const languageSelector = document.getElementById('language-selector');
const allElements = document.querySelectorAll('[data-lang-en]');

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  allElements.forEach(el => {
    if (lang === 'en') {
      el.textContent = el.dataset.langEn;
    } else {
      // Restore original content from HTML - we'll do this differently
      // Store original on first load
      if (!el.dataset.original) {
        el.dataset.original = el.textContent;
      }
      el.textContent = el.dataset.original;
    }
  });
}

// Load saved language or default to Spanish
const savedLanguage = localStorage.getItem('language') || 'es';
languageSelector.value = savedLanguage;
setLanguage(savedLanguage);

languageSelector.addEventListener('change', (e) => {
  setLanguage(e.target.value);
});

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach(t => {
  t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    t.classList.add('active');
    document.getElementById(t.dataset.tab).classList.add('active');
  });
});

// Smooth nav highlight
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
  });
});
