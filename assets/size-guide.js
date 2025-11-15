/* TNO Size Guide Drawer
   Minimal JS to open/close size guide drawer.
   - Trigger: any link with .tno-size-guide__link
   - Drawer: #SizeGuideDrawer
   - Closes on close button, ESC, outside click.
*/
(function () {
  const drawer = document.getElementById('SizeGuideDrawer');
  if (!drawer) {
    return;
  }

  // Ensure basic dialog semantics exist even if markup is missing them.
  if (!drawer.hasAttribute('role')) {drawer.setAttribute('role', 'dialog');}
  if (!drawer.hasAttribute('aria-modal')) {drawer.setAttribute('aria-modal', 'true');}
  if (!drawer.hasAttribute('aria-hidden')) {drawer.setAttribute('aria-hidden', 'true');}
  if (!drawer.hasAttribute('tabindex')) {drawer.setAttribute('tabindex', '-1');}

  const openTriggers = document.querySelectorAll('.tno-size-guide__link');
  const closeBtn = drawer.querySelector('.tno-size-guide-drawer__close');
  let lastFocused = null;

  // Focus trap support handlers stored for add/remove symmetry.
  let trapKeydown = null;
  let onFocusIn = null;

  // Returns focusable descendants within a container. Lightweight and fast.
  function getFocusable(container) {
    const selector = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden="true"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    // Convert NodeList to array and filter out non-visible items quickly.
    return Array.prototype.filter.call(container.querySelectorAll(selector), function (el) {
      const style = window.getComputedStyle(el);
      return style.visibility !== 'hidden' && style.display !== 'none';
    });
  }

  // Installs a minimal focus trap inside the drawer while open.
  function installFocusTrap() {
    trapKeydown = function (e) {
      if (!drawer.classList.contains('is-open')) {return;}
      if (e.key !== 'Tab') {return;}

      const focusables = getFocusable(drawer);
      if (focusables.length === 0) {
        e.preventDefault();
        drawer.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !drawer.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !drawer.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    onFocusIn = function (e) {
      if (!drawer.classList.contains('is-open')) {return;}
      if (!drawer.contains(e.target)) {
        // If focus tries to leave, bounce it back to the first focusable.
        const focusables = getFocusable(drawer);
        (focusables[0] || drawer).focus();
        e.stopPropagation();
      }
    };

    // Use capture to catch early and reliably.
    document.addEventListener('keydown', trapKeydown, true);
    document.addEventListener('focusin', onFocusIn, true);
  }

  // Removes focus trap listeners.
  function removeFocusTrap() {
    if (trapKeydown) {
      document.removeEventListener('keydown', trapKeydown, true);
      trapKeydown = null;
    }
    if (onFocusIn) {
      document.removeEventListener('focusin', onFocusIn, true);
      onFocusIn = null;
    }
  }

  function openDrawer(evt) {
    // Open via click; preserve keyboard accessibility.
    if (evt) {evt.preventDefault();}
    lastFocused = document.activeElement;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('tno-no-scroll');
    installFocusTrap();

    // Move focus into drawer; prefer first focusable, fallback to drawer.
    const focusables = getFocusable(drawer);
    (focusables[0] || drawer).focus();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('tno-no-scroll');
    removeFocusTrap();
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  openTriggers.forEach((el) => el.addEventListener('click', openDrawer));
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  document.addEventListener('click', (e) => {
    if (!drawer.classList.contains('is-open')) {
      return;
    }
    if (!drawer.contains(e.target) && !e.target.closest('.tno-size-guide__link')) {
      closeDrawer();
    }
  });
})();
