// ==================================
// Vertera — single source mobile menu
// ==================================

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  const body = document.body;

  if (!burger || !nav) return;

  // ----- Overlay (single instance) -----
  let overlay = document.querySelector('.menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
  }

  let isOpen = false;

  const openMenu = () => {
    if (isOpen) return;
    burger.classList.add('active');
    nav.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('menu-open');
    isOpen = true;
  };

  const closeMenu = () => {
    if (!isOpen) return;
    burger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    isOpen = false;
  };

  // ----- Burger click -----
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });

  // ----- Overlay click -----
  overlay.addEventListener('click', closeMenu);

  // ----- Close on link tap -----
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ----- Resize safety -----
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // ----- HARD BLOCK swipe / ghost menu -----
  let touchStartX = 0;

  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    const diffX = e.touches[0].clientX - touchStartX;
    if (Math.abs(diffX) > 30) {
      // блокируем любые свайп-инициации меню
      e.preventDefault();
    }
  }, { passive: false });
});
