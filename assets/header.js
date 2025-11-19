/* ==========================================================================
   TRUST.NO.OUTPUT — header.js
   Extracted header interactions for cacheability & clarity.
   Responsibilities:
   - Scroll state (adds .is-scrolled after threshold)
   - Mobile menu (ARIA dialog pattern: focus trap, outside click, ESC)
   - Mega / dropdown nav toggles (keyboard + aria-expanded)
   - Non-invasive: coexists with transparency IntersectionObserver in custom.js
   - Respects reduced motion preference (limits animations if needed)
   ==========================================================================
*/
(function TNO_HEADER() {
  'use strict';

  const STATE = {
    scrollThreshold: 20,
    openPanel: null,
    openToggle: null,
    mobileOutsideHandler: null,
    hoverCloseTimer: null,
  };

  const header = document.getElementById('site-header');
  const nav = document.querySelector('.tno-nav');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const bottomTabMenu = document.getElementById('bottom-tab-menu');

  function initScrollState() {
    if (!header) {
      return;
    }
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      if (y > STATE.scrollThreshold) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial
  }

  function getFocusable(root) {
    return Array.from(
      root.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
    );
  }

  function closeNavPanel() {
    if (!STATE.openPanel || !STATE.openToggle) {
      return;
    }
    STATE.openPanel.classList.remove('is-open');
    STATE.openToggle.setAttribute('aria-expanded', 'false');
    // Clear hover state from panel and parent nav item
    delete STATE.openPanel.dataset.hovering;
    const navItem = STATE.openToggle.closest('.tno-nav__item');
    if (navItem) {
      delete navItem.dataset.hovering;
    }
    STATE.openPanel = null;
    STATE.openToggle = null;
    // Clear any pending hover close timer
    if (STATE.hoverCloseTimer) {
      clearTimeout(STATE.hoverCloseTimer);
      STATE.hoverCloseTimer = null;
    }
  }

  function scheduleCloseNavPanel(delay = 600) {
    // Clear existing timer
    if (STATE.hoverCloseTimer) {
      clearTimeout(STATE.hoverCloseTimer);
      STATE.hoverCloseTimer = null;
    }

    // Only schedule close if BOTH parent nav item and panel are not hovered
    STATE.hoverCloseTimer = setTimeout(() => {
      const navItem = STATE.openToggle ? STATE.openToggle.closest('.tno-nav__item') : null;
      const navItemHovered = navItem && navItem.dataset.hovering === 'true';
      const panelHovered = STATE.openPanel && STATE.openPanel.dataset.hovering === 'true';

      // Only close if neither is hovered
      if (!navItemHovered && !panelHovered) {
        closeNavPanel();
      }
      STATE.hoverCloseTimer = null;
    }, delay);
  }
  function cancelCloseNavPanel() {
    if (STATE.hoverCloseTimer) {
      clearTimeout(STATE.hoverCloseTimer);
      STATE.hoverCloseTimer = null;
    }
  }

  function initDesktopNavPanels() {
    if (!nav) {
      return;
    }
    const toggles = nav.querySelectorAll('.tno-nav__toggle');
    if (!toggles.length) {
      return;
    }

    toggles.forEach((btn) => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (!panel) {
        return;
      }

      // Find parent nav item (<li>) - this is the unified hover target
      const navItem = btn.closest('.tno-nav__item');
      if (!navItem) {
        return;
      }

      // Click handler on button (toggle open/close, keyboard accessibility)
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          closeNavPanel();
        } else {
          closeNavPanel();
          btn.setAttribute('aria-expanded', 'true');
          panel.classList.add('is-open');
          STATE.openPanel = panel;
          STATE.openToggle = btn;
          const focusables = getFocusable(panel);
          if (focusables.length) {
            focusables[0].focus();
          } else {
            panel.setAttribute('tabindex', '-1');
            panel.focus();
          }
        }
      });

      // Hover handlers on PARENT nav item (unified text + arrow hover zone)
      navItem.addEventListener('mouseenter', () => {
        // Mark parent item as hovered
        navItem.dataset.hovering = 'true';
        cancelCloseNavPanel();

        // Open on hover (desktop only, non-touch)
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          const isOpen = btn.getAttribute('aria-expanded') === 'true';
          if (!isOpen) {
            closeNavPanel();
            btn.setAttribute('aria-expanded', 'true');
            panel.classList.add('is-open');
            STATE.openPanel = panel;
            STATE.openToggle = btn;
          }
        }
      });

      navItem.addEventListener('mouseleave', () => {
        // Mark parent item as not hovered
        navItem.dataset.hovering = 'false';
        // Schedule close with ~750ms buffer (improves diagonal travel)
        // Will only close if panel is also not hovered
        scheduleCloseNavPanel(750);
      });

      panel.addEventListener('mouseenter', () => {
        // Mark panel as hovered
        panel.dataset.hovering = 'true';
        // Cancel any pending close
        cancelCloseNavPanel();
      });

      panel.addEventListener('mouseleave', () => {
        // Mark panel as not hovered
        panel.dataset.hovering = 'false';
        // Schedule close with ~750ms buffer (improves diagonal travel)
        // Will only close if parent nav item is also not hovered
        scheduleCloseNavPanel(750);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeNavPanel();
      }
      if (e.key === 'Tab' && STATE.openPanel) {
        const focusables = getFocusable(STATE.openPanel);
        if (!focusables.length) {
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  function openMobileMenu() {
    if (!mobileMenu || !mobileToggle) {
      return;
    }
    if (mobileMenu.classList.contains('is-active')) {
      return;
    }
    mobileMenu.classList.add('is-active');
    mobileToggle.classList.add('is-active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('tno-no-scroll');

    // Update bottom tab bar menu button state
    if (bottomTabMenu) {
      bottomTabMenu.classList.add('is-active');
      bottomTabMenu.setAttribute('aria-expanded', 'true');
    }

    // Ensure menu starts at top on open to avoid first item appearing under header
    try {
      if (mobileMenu.scrollTop !== 0) {
        // Some browsers support 'instant'; fallback to direct assignment
        mobileMenu.scrollTo({ top: 0, behavior: 'instant' });
        if (mobileMenu.scrollTop !== 0) {
          mobileMenu.scrollTop = 0;
        }
      }
    } catch {
      mobileMenu.scrollTop = 0;
    }

    const focusables = getFocusable(mobileMenu);
    if (focusables.length) {
      focusables[0].focus();
    } else {
      mobileMenu.setAttribute('tabindex', '-1');
      mobileMenu.focus();
    }

    STATE.mobileOutsideHandler = (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== mobileToggle) {
        closeMobileMenu();
      }
    };
    document.addEventListener('mousedown', STATE.mobileOutsideHandler);
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileToggle) {
      return;
    }
    if (!mobileMenu.classList.contains('is-active')) {
      return;
    }
    mobileMenu.classList.remove('is-active');
    mobileToggle.classList.remove('is-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('tno-no-scroll');

    // Update bottom tab bar menu button state
    if (bottomTabMenu) {
      bottomTabMenu.classList.remove('is-active');
      bottomTabMenu.setAttribute('aria-expanded', 'false');
    }

    if (STATE.mobileOutsideHandler) {
      document.removeEventListener('mousedown', STATE.mobileOutsideHandler);
      STATE.mobileOutsideHandler = null;
    }
    mobileToggle.focus();
  }

  function initMobileMenu() {
    if (!mobileMenu || !mobileToggle) {
      return;
    }
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.contains('is-active') ? closeMobileMenu() : openMobileMenu();
    });

    // Connect bottom tab bar Menu button to mobile menu
    if (bottomTabMenu) {
      bottomTabMenu.addEventListener('click', () => {
        mobileMenu.classList.contains('is-active') ? closeMobileMenu() : openMobileMenu();
      });
    }

    const links = mobileMenu.querySelectorAll('.mobile-menu__link');
    links.forEach((l) => l.addEventListener('click', closeMobileMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
        closeMobileMenu();
      }
      if (e.key === 'Tab' && mobileMenu.classList.contains('is-active')) {
        const focusables = getFocusable(mobileMenu);
        if (!focusables.length) {
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  function init() {
    initScrollState();
    initDesktopNavPanels();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export (designMode only) for quick re-init
  if (window.Shopify && window.Shopify.designMode) {
    window.TNO = window.TNO || {};
    window.TNO.header = { reinit: init };
  }
})();
