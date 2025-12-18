// ===============================
// Vertera — mobile menu (stable)
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  const body = document.body;

  if (!burger || !nav) return;

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  let isOpen = false;

  const openMenu = () => {
    burger.classList.add('active');
    nav.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('menu-open');
    isOpen = true;
  };

  const closeMenu = () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    isOpen = false;
  };

  burger.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isOpen) {
      closeMenu();
    }
  });
});
