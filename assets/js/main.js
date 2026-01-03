// ==================================
// Vertera — mobile menu (stable, single source)
// File: assets/js/main.js
// Works with: #burgerBtn, #mobileMenu, .menu-overlay, #menuClose, .mobile-nav a
// ==================================

(() => {
  if (window.__verteraMenuInit) return;
  window.__verteraMenuInit = true;

  document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileMenu');
    const overlay = document.querySelector('.menu-overlay');
    const closeBtn = document.getElementById('menuClose');
    const links = document.querySelectorAll('.mobile-nav a');

    if (!burger || !menu || !overlay || !closeBtn) return;

    // ----- State -----
    let isOpen = false;
    let scrollY = 0;
    let lastActiveElement = null;

    // страховка от горизонтального "уезда"
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    const lockScroll = () => {
      scrollY = window.scrollY || 0;

      // фиксируем body, чтобы не прыгал фон и не было iOS-багов
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    };

    const unlockScroll = () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };

    const openMenu = () => {
      if (isOpen) return;
      isOpen = true;

      lastActiveElement = document.activeElement;

      menu.classList.add('active');
      overlay.classList.add('active');

      burger.setAttribute('aria-expanded', 'true');
      overlay.setAttribute('aria-hidden', 'false');

      lockScroll();
      closeBtn.focus();
    };

    const closeMenu = () => {
      if (!isOpen) return;
      isOpen = false;

      menu.classList.remove('active');
      overlay.classList.remove('active');

      burger.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');

      unlockScroll();

      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      } else {
        burger.focus();
      }
    };

    // ----- Events -----
    burger.setAttribute('aria-expanded', 'false');

    burger.addEventListener('click', (e) => {
      e.preventDefault();
      isOpen ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });

    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });

    // Close on link tap (+ даём браузеру перейти по якорю уже после закрытия)
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        // если это якорь, закрываем меню и даём переходу случиться
        // закрытие синхронно, переход по якорю остаётся штатным
        closeMenu();
      });
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close on outside click (extra safety)
    document.addEventListener('click', (e) => {
      if (!isOpen) return;
      const t = e.target;
      if (t === burger || burger.contains(t)) return;
      if (t === menu || menu.contains(t)) return;
      if (t === closeBtn || closeBtn.contains(t)) return;
      closeMenu();
    });

    // Resize safety
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    }, { passive: true });

    // Prevent overscroll-x "swipe ghost"
    // Не блокируем вертикальную прокрутку. Только гасим горизонтальный сдвиг страницы.
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

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) {
        e.preventDefault();
      }
    }, { passive: false });
  });
})();
