/**
 * TRUST.NO.OUTPUT — Custom JavaScript
 *
 * This file contains JavaScript behavior for TRUST.NO.OUTPUT theme features:
 * - Header search interactions
 * - Mobile menu functionality
 * - Product grid interactions
 * - Glitch effect triggers
 * - Cart updates
 *
 * Architecture:
 * - All functions are safely wrapped with null checks
 * - Functions initialize only when DOM elements exist
 * - No side effects until elements are confirmed present
 *
 * Future enhancements:
 * - Header search: Focus handling, glitch effects on interaction
 * - Mobile menu: Drilldown navigation, panel transitions
 * - Product grid: Variant selection, add-to-cart with conscious delay
 * - Glitch effects: RGB shift animations, scanline effects
 */

(function () {
  'use strict';

  /**
   * Initialize TNO Header Search
   *
   * Handles search input focus/blur, form submission, and ensures clean UX.
   */
  function initTnoHeaderSearch() {
    const searchForms = document.querySelectorAll('.tno-search form');
    const searchInputs = document.querySelectorAll('.tno-search__input');

    if (searchForms.length === 0 && searchInputs.length === 0) {
      return; // Search elements not present on this page
    }

    // Handle all search forms (desktop + mobile)
    searchForms.forEach(function (searchForm) {
      const searchInput = searchForm.querySelector('.tno-search__input');

      if (!searchInput) {
        return;
      }

      // Clear input value after page load (if it was pre-filled from URL)
      // This ensures the placeholder shows instead of the search query
      if (searchInput.value && document.activeElement !== searchInput) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          if (searchInput.value && document.activeElement !== searchInput) {
            searchInput.value = '';
          }
        }, 100);
      }

      // Clear on blur if input is empty (show placeholder)
      searchInput.addEventListener('blur', function () {
        if (!this.value.trim()) {
          this.value = '';
        }
      });

      // Handle form submission: clear input and remove focus after submit
      searchForm.addEventListener('submit', function () {
        // Let the form submit normally (don't prevent default)
        // After navigation, the input will be cleared by the page load handler above
        // But also clear focus immediately to remove cyan glow
        setTimeout(() => {
          if (searchInput && document.activeElement === searchInput) {
            searchInput.blur();
          }
        }, 0);
      });
    });
  }

  /**
   * Initialize TNO Product Grid
   *
   * Future: Handle variant selection, add-to-cart with conscious delay,
   * glitch effects on hover, and loading states.
   */
  function initTnoProductGrid() {
    const productGrid = document.querySelector('.product-grid-trust');
    const productCards = document.querySelectorAll('.product-card-trust');
    const variantButtons = document.querySelectorAll('.product-card-trust__variant');
    const addToCartButtons = document.querySelectorAll('.product-card-trust__button');

    if (!productGrid && productCards.length === 0) {
      return; // Product grid not present on this page
    }

    if (productGrid) {
      // console.log('[TNO] Product grid found');
    }
    if (productCards.length > 0) {
      // console.log('[TNO] Product cards found:', productCards.length);
    }
    if (variantButtons.length > 0) {
      // console.log('[TNO] Variant buttons found:', variantButtons.length);
    }
    if (addToCartButtons.length > 0) {
      // console.log('[TNO] Add to cart buttons found:', addToCartButtons.length);
    }

    // TODO: Add product grid interaction logic here
    // - Variant selection handlers
    // - Add-to-cart with conscious delay (400ms)
    // - Loading and success states
    // - Glitch effects on hover
  }

  /**
   * Initialize TNO Mobile Menu
   *
   * Future: Handle drilldown navigation, panel transitions, back button logic,
   * and menu toggle animations.
   */
  function initTnoMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('bottom-tab-menu');
    const mobilePanels = document.querySelectorAll('.tno-mobile-panel');
    const backButtons = document.querySelectorAll('.tno-mobile-back');

    if (!mobileMenu && !menuToggle) {
      return; // Mobile menu not present on this page
    }

    if (mobileMenu) {
      // console.log('[TNO] Mobile menu found');
    }
    if (menuToggle) {
      // console.log('[TNO] Mobile menu toggle found');
    }
    if (mobilePanels.length > 0) {
      // console.log('[TNO] Mobile panels found:', mobilePanels.length);
    }
    if (backButtons.length > 0) {
      // console.log('[TNO] Back buttons found:', backButtons.length);
    }

    // TODO: Add mobile menu interaction logic here
    // - Menu toggle handlers
    // - Panel navigation (drilldown)
    // - Back button functionality
    // - Accessibility (ARIA states)
  }

  /**
   * Initialize TNO Glitch Effects
   *
   * Future: Trigger RGB shift animations, scanline effects, and glitch
   * animations on specific user interactions (hover, focus, etc.).
   */
  function initTnoGlitchEffects() {
    const glitchElements = document.querySelectorAll('[data-glitch-text]');
    const glitchButtons = document.querySelectorAll('.tno-search__button, .product-card-trust__button');

    if (glitchElements.length === 0 && glitchButtons.length === 0) {
      return; // No glitch elements present on this page
    }

    if (glitchElements.length > 0) {
      // console.log('[TNO] Glitch text elements found:', glitchElements.length);
    }
    if (glitchButtons.length > 0) {
      // console.log('[TNO] Glitch buttons found:', glitchButtons.length);
    }

    // TODO: Add glitch effect logic here
    // - RGB shift animations
    // - Scanline effects
    // - Glitch triggers on hover/focus
    // - Respect prefers-reduced-motion
  }

  /**
   * Initialize TNO Cart Updates
   *
   * Future: Update cart count badges, trigger cart animations, and handle
   * cart drawer updates.
   */
  function initTnoCartUpdates() {
    const cartBadges = document.querySelectorAll('.cart-badge, .tno-badge, .tno-tab__badge');
    const cartDrawer = document.querySelector('.cart-drawer');

    if (cartBadges.length === 0 && !cartDrawer) {
      return; // Cart elements not present on this page
    }

    if (cartBadges.length > 0) {
      // console.log('[TNO] Cart badges found:', cartBadges.length);
    }
    if (cartDrawer) {
      // console.log('[TNO] Cart drawer found');
    }

    // TODO: Add cart update logic here
    // - Update badge counts
    // - Trigger animations
    // - Handle cart drawer updates
  }

  /**
   * Main initialization function
   *
   * Runs when DOM is ready and initializes all TNO features.
   * Safe to call multiple times (idempotent).
   */
  function initTnoTheme() {
    // console.log('[TNO] Initializing TRUST.NO.OUTPUT theme...');

    // Initialize all TNO features
    initTnoHeaderSearch();
    initTnoProductGrid();
    initTnoMobileMenu();
    initTnoGlitchEffects();
    initTnoCartUpdates();

    // console.log('[TNO] Theme initialization complete');
  }

  /**
   * Initialize when DOM is ready
   *
   * Supports both modern and legacy browsers.
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTnoTheme);
  } else {
    // DOM is already ready
    initTnoTheme();
  }

  // Expose init function globally for manual re-initialization if needed
  window.initTnoTheme = initTnoTheme;
})();
