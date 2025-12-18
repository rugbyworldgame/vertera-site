// ==================================
// Vertera — single source mobile menu (stable)
// File: assets/js/main.js
// ==================================

(() => {
  // защита от двойной загрузки/инициализации (частая причина "двух меню")
  if (window.__verteraMenuInit) return;
  window.__verteraMenuInit = true;

  document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');
    const body = document.body;
    const html = document.documentElement;

    if (!burger || !nav) return;

    // ----- Overlay (single instance) -----
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
    }

    // ----- State -----
    let isOpen = false;
    let scrollY = 0;

    // мелкая страховка от горизонтального "уезжания" (часто из-за off-canvas)
    html.style.overflowX = 'hidden';
    body.style.overflowX = 'hidden';

    const lockScroll = () => {
      scrollY = window.scrollY || 0;

      // фиксируем body без touchmove preventDefault по всему документу
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
    };

    const unlockScroll = () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';

      window.scrollTo(0, scrollY);
    };

    const openMenu = () => {
      if (isOpen) return;

      burger.classList.add('active');
      nav.classList.add('active');
      overlay.classList.add('active');
      body.classList.add('menu-open');

      burger.setAttribute('aria-expanded', 'true');

      lockScroll();

      isOpen = true;
    };

    const closeMenu = () => {
      if (!isOpen) return;

      burger.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('menu-open');

      burger.setAttribute('aria-expanded', 'false');

      unlockScroll();

      isOpen = false;
    };

    // ----- Burger click -----
    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isOpen ? closeMenu() : openMenu();
    });

    // ----- Overlay click -----
    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });

    // ----- Close on link tap -----
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    // ----- Close on ESC -----
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // ----- Close on outside click (extra safety) -----
    document.addEventListener('click', (e) => {
      if (!isOpen) return;
      const t = e.target;
      if (t === burger || burger.contains(t)) return;
      if (t === nav || nav.contains(t)) return;
      closeMenu();
    });

    // ----- Resize safety -----
    window.addEventListener('resize', () => {
      // если ушли в десктоп — закрываем, чтобы не было "двух состояний"
      if (window.innerWidth > 768) closeMenu();
    }, { passive: true });

    // ----- Prevent overscroll-x "swipe ghost" -----
    // НЕ блокируем вертикальную прокрутку вообще. Только гасим горизонтальный сдвиг страницы.
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', (e) => {
      if (!e.touches || !e.touches[0]) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!e.touches || !e.touches[0]) return;

      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      // если движение преимущественно горизонтальное — гасим (это и даёт "уезд" и фантомные панели)
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) {
        e.preventDefault();
      }
    }, { passive: false });
  });
})();
