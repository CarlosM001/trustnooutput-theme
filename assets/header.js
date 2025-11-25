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

  // Lightweight conditional debug utility. Enable via:
  // 1) window.TNO_DEBUG = true in console
  // 2) Adding ?debug=1 to the URL
  function dbg() {
    try {
      if (window.TNO_DEBUG || /[?&]debug=1(&|$)/.test(window.location.search)) {
        const args = Array.from(arguments);
        args.unshift('[TNO header]');
        // eslint-disable-next-line no-console
        console.debug.apply(console, args);
      }
    } catch {
      /* silent */
    }
  }

  const STATE = {
    scrollThreshold: 20,
    openPanel: null,
    openToggle: null,
    mobileOutsideHandler: null,
    hoverCloseTimer: null,
  };

  // Element references - initialized after DOM is ready
  let header;
  let nav;
  let detailsContainer;
  let mobileMenu;
  let mobileToggle;
  let bottomTabMenu;

  function initScrollState() {
    if (!header) {
      return;
    }
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      if (y > STATE.scrollThreshold) {
        header.classList.add('is-scrolled');
        dbg('scroll state: is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
        dbg('scroll state: reset');
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
          dbg('desktop panel closed via click', panelId);
        } else {
          closeNavPanel();
          btn.setAttribute('aria-expanded', 'true');
          panel.classList.add('is-open');
          STATE.openPanel = panel;
          STATE.openToggle = btn;
          dbg('desktop panel opened via click', panelId);
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
            dbg('desktop panel opened via hover', panelId);
          }
        }
      });

      navItem.addEventListener('mouseleave', () => {
        // Mark parent item as not hovered
        navItem.dataset.hovering = 'false';
        // Schedule close with default buffer; enhanced delay handled in custom.js
        // Will only close if panel is also not hovered
        scheduleCloseNavPanel(600);
        dbg('desktop panel leave scheduling close', panelId);
      });

      panel.addEventListener('mouseenter', () => {
        // Mark panel as hovered
        panel.dataset.hovering = 'true';
        // Cancel any pending close
        cancelCloseNavPanel();
        dbg('panel hover cancel close', panelId);
      });

      panel.addEventListener('mouseleave', () => {
        // Mark panel as not hovered
        panel.dataset.hovering = 'false';
        // Schedule close with default buffer; enhanced delay handled in custom.js
        // Will only close if parent nav item is also not hovered
        scheduleCloseNavPanel(600);
        dbg('panel leave scheduling close', panelId);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeNavPanel();
        dbg('escape key pressed - close panel');
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
          dbg('focus trap shift+tab to last');
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
          dbg('focus trap tab to first');
        }
      }
    });
  }

  // Removed unused openMobileMenu function to resolve compile error.

  function openMobileMenu() {
    if (!mobileMenu) {
      dbg('openMobileMenu: mobileMenu not found');
      return;
    }
    mobileMenu.classList.add('is-active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (bottomTabMenu) {
      bottomTabMenu.classList.add('is-active');
      bottomTabMenu.setAttribute('aria-expanded', 'true');
    }
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add('overflow-hidden-mobile');
    dbg('mobile menu opened');
  }

  function closeMobileMenu() {
    if (!mobileMenu) {
      dbg('closeMobileMenu: mobileMenu not found');
      return;
    }
    mobileMenu.classList.remove('is-active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (bottomTabMenu) {
      bottomTabMenu.classList.remove('is-active');
      bottomTabMenu.setAttribute('aria-expanded', 'false');
    }
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('overflow-hidden-mobile');
    // Also handle Shopify native drawer if present
    if (detailsContainer && detailsContainer.hasAttribute('open')) {
      detailsContainer.removeAttribute('open');
    }
    dbg('mobile menu closed');
  }

  function toggleMobileMenu() {
    if (!mobileMenu) {
      dbg('toggleMobileMenu: mobileMenu not found');
      return;
    }
    const isOpen = mobileMenu.classList.contains('is-active');
    dbg('toggleMobileMenu called', { currentlyOpen: isOpen, willToggleTo: !isOpen });
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function initMobileMenu() {
    if (!mobileMenu) {
      dbg('initMobileMenu: mobileMenu not found');
      return;
    }

    // Bottom tab menu toggle
    if (bottomTabMenu) {
      bottomTabMenu.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dbg('bottom tab menu clicked');
        toggleMobileMenu();
      });
    } else {
      dbg('bottomTabMenu not found');
    }

    // Header hamburger toggle
    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dbg('mobile toggle (hamburger) clicked');
        toggleMobileMenu();
      });
    }

    // Close menu when clicking links inside
    const links = mobileMenu.querySelectorAll('.tno-mobile-link, .mobile-menu__link');
    links.forEach((l) => l.addEventListener('click', closeMobileMenu));

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
        closeMobileMenu();
        dbg('escape key pressed - mobile menu');
      }
      // Focus trap for accessibility
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
          dbg('mobile focus trap shift+tab last');
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
          dbg('mobile focus trap tab first');
        }
      }
    });
  }

  // wireBottomTabMenuToDrawer removed - duplicate event handler causing double-toggle issues
  // Mobile menu handling is now consolidated in initMobileMenu()

  function init() {
    // Query DOM elements after DOM is ready
    header = document.getElementById('site-header');
    nav = document.querySelector('.tno-nav');
    // Support legacy drawer structure (Shopify <details> pattern) instead of a custom panel
    detailsContainer = document.getElementById('Details-menu-drawer-container');
    // Attempt standard id first, fall back to existing drawer id
    mobileMenu = document.getElementById('mobile-menu') || document.getElementById('menu-drawer');
    mobileToggle =
      document.getElementById('mobile-menu-toggle') ||
      (detailsContainer ? detailsContainer.querySelector('summary.header__icon--menu') : null);
    bottomTabMenu = document.getElementById('bottom-tab-menu');

    initScrollState();
    initDesktopNavPanels();
    initMobileMenu();
    dbg('header init complete', {
      hasHeader: !!header,
      hasNav: !!nav,
      mobileMenuResolved: !!mobileMenu,
      mobileToggleResolved: !!mobileToggle,
      bottomTabMenuResolved: !!bottomTabMenu,
      detailsContainerResolved: !!detailsContainer,
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('js');
      init();
    });
  } else {
    document.body.classList.add('js');
    init();
  }

  // Export (designMode only) for quick re-init
  if (window.Shopify && window.Shopify.designMode) {
    window.TNO = window.TNO || {};
    window.TNO.header = { reinit: init };
  }
})();
