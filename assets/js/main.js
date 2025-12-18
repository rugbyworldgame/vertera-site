// ===============================
// Vertera — mobile menu (stable)
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  const body = document.body;

  if (!burger || !nav) return;

  let isOpen = false;

  const openMenu = () => {
    burger.classList.add('active');
    nav.classList.add('active');
    body.classList.add('menu-open');
    isOpen = true;
  };

  const closeMenu = () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
    body.classList.remove('menu-open');
    isOpen = false;
  };

  burger.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Закрытие меню при клике на пункт
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Защита: если ресайзнули экран — меню схлопывается
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isOpen) {
      closeMenu();
    }
  });
});
