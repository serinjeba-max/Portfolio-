const body = document.body;
const toggleButton = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const setTheme = (isDark) => {
  body.classList.toggle('dark', isDark);
  if (toggleButton) {
    toggleButton.innerHTML = isDark ? '<span class="theme-icon">🌙</span>' : '<span class="theme-icon">☀️</span>';
  }
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  setTheme(savedTheme === 'dark');
} else {
  setTheme(prefersDark);
}

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    setTheme(!body.classList.contains('dark'));
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));
