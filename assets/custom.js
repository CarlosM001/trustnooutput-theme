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
   * Initialize Scroll Reveal Animation
   *
   * Uses IntersectionObserver for efficient scroll-triggered animations.
   * Moved from inline script in manifesto-trust.liquid for better performance.
   */
  function initTnoScrollReveal() {
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');

    if (revealElements.length === 0) {
      return; // No scroll reveal elements present on this page
    }

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => observer.observe(el));
  }

  /**
   * Initialize Product Page Mobile Bottom Nav Scroll Behavior
   *
   * On mobile product pages:
   * - Scroll DOWN: Hide bottom nav, show only ADD TO CART bar at bottom
   * - Scroll UP: Show bottom nav at bottom, move ADD TO CART bar above it
   *
   * Only runs on:
   * - Product templates (body.template-product)
   * - Mobile viewport (max-width: 749px)
   */
  function initTnoProductMobileNavScroll() {
    // Check if we're on a product page
    const isProductPage = document.body.classList.contains('template-product');
    if (!isProductPage) {
      return; // Not a product page, skip
    }

    // Check if we're on mobile
    const isMobile = window.matchMedia('(max-width: 749px)').matches;
    if (!isMobile) {
      return; // Not mobile, skip
    }

    // Get elements - use more specific selectors
    const bottomNav = document.querySelector('.tno-bottom-tabs') || document.getElementById('bottom-tabs');
    const ctaBar = document.querySelector('.tno-product-actions');

    // Debug logging (temporary - remove after testing)
    // console.log('[TNO] Product mobile nav init:', {
    //   isProductPage: isProductPage,
    //   isMobile: isMobile,
    //   bottomNav: bottomNav,
    //   ctaBar: ctaBar,
    //   bodyClasses: document.body.className
    // });

    // Null check - if elements don't exist, do nothing
    if (!bottomNav || !ctaBar) {
      // console.log('[TNO] Elements not found - bottomNav:', !!bottomNav, 'ctaBar:', !!ctaBar);
      return; // Elements not found, fail gracefully
    }

    // Scroll detection state
    let lastScrollY = window.scrollY || window.pageYOffset || 0;
    let ticking = false;
    const scrollThreshold = 8; // Minimum scroll distance to trigger change (px)

    /**
     * Update nav visibility based on scroll direction
     */
    function updateNavVisibility() {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const scrollDelta = currentScrollY - lastScrollY;

      // Determine scroll direction
      if (Math.abs(scrollDelta) < scrollThreshold) {
        // Scroll distance too small, ignore
        ticking = false;
        return;
      }

      // At the very top of the page, always show nav
      if (currentScrollY <= 10) {
        document.body.classList.add('tno-bottom-nav-visible');
        bottomNav.classList.remove('tno-bottom-tabs--hidden');
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      if (scrollDelta > 0) {
        // Scrolling DOWN: Hide bottom nav
        document.body.classList.remove('tno-bottom-nav-visible');
        bottomNav.classList.add('tno-bottom-tabs--hidden');
      } else if (scrollDelta < 0) {
        // Scrolling UP: Show bottom nav
        document.body.classList.add('tno-bottom-nav-visible');
        bottomNav.classList.remove('tno-bottom-tabs--hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    /**
     * Throttled scroll handler using requestAnimationFrame
     */
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateNavVisibility);
        ticking = true;
      }
    }

    // Initialize state: start with nav hidden on product pages
    // Use setTimeout to ensure DOM is fully ready
    setTimeout(function () {
      document.body.classList.remove('tno-bottom-nav-visible');
      if (bottomNav) {
        bottomNav.classList.add('tno-bottom-tabs--hidden');
      }
    }, 100);

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle resize: re-check mobile status
    let resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        const stillMobile = window.matchMedia('(max-width: 749px)').matches;
        if (!stillMobile) {
          // Switched to desktop: reset state
          document.body.classList.remove('tno-bottom-nav-visible');
          bottomNav.classList.remove('tno-bottom-tabs--hidden');
        }
      }, 150);
    });
  }

  /**
   * Initialize TNO Related Products Carousel
   *
   * Handles left/right arrow button clicks to scroll the related products carousel
   * horizontally on mobile product pages.
   *
   * Related Products Carousel - TRUST Style
   * Desktop: 4 cards per view, slide by 4
   * Mobile: 2 cards per view, slide by 2
   * Controls are hidden if totalCards <= cardsPerView
   *
   * IMPORTANT: This function is scoped to .product-related-trust containers only.
   * It does NOT affect collection grid cards or any other product cards on the page.
   */
  function initTnoRelatedProductsCarousel() {
    // Scope: Only select carousel containers, not individual cards globally
    const carousels = document.querySelectorAll('.product-related-trust');
    if (!carousels.length) {
      return;
    }

    carousels.forEach((carousel) => {
      // All selectors are scoped to this specific carousel container
      const track = carousel.querySelector('.product-related-trust__grid');
      const controlsWrapper = carousel.querySelector('.product-related-trust__controls');
      const prevBtn = carousel.querySelector('.product-related-trust__arrow--prev');
      const nextBtn = carousel.querySelector('.product-related-trust__arrow--next');

      if (!track || !prevBtn || !nextBtn || !controlsWrapper) {
        return;
      }

      // Count cards ONLY within this carousel's track (scoped selection)
      const totalCards = track.querySelectorAll('.tno-card-product--trust').length;

      // Determine cards per view based on screen size
      const isDesktop = window.matchMedia('(width >= 990px)').matches;
      const cardsPerView = isDesktop ? 4 : 2;

      // Hide controls if totalCards <= cardsPerView
      if (totalCards <= cardsPerView) {
        controlsWrapper.classList.add('tno-slider-controls--hidden');
        return; // Don't add event listeners if controls are hidden
      }

      // Remove hidden class if it exists (e.g., after resize)
      controlsWrapper.classList.remove('tno-slider-controls--hidden');

      const getSlideAmount = () => {
        // Scoped to this carousel's track
        const firstItem = track.querySelector('.product-related-trust__item');
        if (!firstItem) {
          return 0;
        }

        const itemWidth = firstItem.offsetWidth;
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || '12') || 12;

        /* Slide by cardsPerView: desktop = 4, mobile = 2 */
        return itemWidth * cardsPerView + gap * (cardsPerView - 1);
      };

      const scrollBySlide = (direction) => {
        const amount = getSlideAmount();
        if (!amount) {
          return;
        }

        // Only scroll this specific carousel's track
        track.scrollBy({
          left: direction * amount,
          behavior: 'smooth',
        });
      };

      // Only attach listeners to THIS carousel's buttons (scoped)
      prevBtn.addEventListener('click', () => scrollBySlide(-1));
      nextBtn.addEventListener('click', () => scrollBySlide(1));
    });
  }


  /**
   * Initialize TNO Latest Drops Carousel
   * Latest Drops section carousel: Desktop shows 4 per row, Mobile shows 2 per row
   * Desktop: slides by 4 cards per click, Mobile: slides by 2 cards per click
   * Arrow buttons positioned above grid (top-right)
   * Controls are hidden if totalCards <= cardsPerView
   *
   * IMPORTANT: This function is scoped to .tno-latest-drops containers only.
   * It does NOT affect collection grid cards or any other product cards on the page.
   */
  function initTnoLatestDropsCarousel() {
    // Scope: Only select carousel containers, not individual cards globally
    const carousels = document.querySelectorAll('.tno-latest-drops');
    if (!carousels.length) {
      return;
    }

    carousels.forEach((carousel) => {
      // All selectors are scoped to this specific carousel container
      const track = carousel.querySelector('.tno-latest-drops__track');
      // Use new selectors for arrow buttons positioned above grid
      // Scoped to the parent section containing this carousel
      const section = carousel.closest('.product-grid-trust');
      if (!section) {
        return; // Safety check: ensure we're in the right container
      }

      const controlsWrapper = section.querySelector('.product-grid-trust__controls');
      const prevBtn = section.querySelector('.product-grid-trust__arrow--prev');
      const nextBtn = section.querySelector('.product-grid-trust__arrow--next');

      if (!track || !prevBtn || !nextBtn || !controlsWrapper) {
        return;
      }

      // Count cards ONLY within this carousel's track (scoped selection)
      const totalCards = track.querySelectorAll('.tno-card-product--trust').length;

      // Determine cards per view based on screen size
      // Desktop (≥990px): 4 cards per row, slide by 4
      // Mobile (≤749px): 2 cards per row, slide by 2
      const isDesktop = window.innerWidth >= 990;
      const cardsPerView = isDesktop ? 4 : 2;

      // Hide controls if totalCards <= cardsPerView
      if (totalCards <= cardsPerView) {
        controlsWrapper.classList.add('tno-slider-controls--hidden');
        return; // Don't add event listeners if controls are hidden
      }

      // Remove hidden class if it exists (e.g., after resize)
      controlsWrapper.classList.remove('tno-slider-controls--hidden');

      const getSlideAmount = () => {
        // Scoped to this carousel's track
        const firstItem = track.querySelector('.tno-latest-drops__item');
        if (!firstItem) {
          return 0;
        }

        const itemWidth = firstItem.offsetWidth;
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || '16') || 16;

        // Calculate scroll amount: cardsPerView items + gaps between them
        return itemWidth * cardsPerView + gap * (cardsPerView - 1);
      };

      const scrollBySlide = (direction) => {
        const amount = getSlideAmount();
        if (!amount) {
          return;
        }

        // Only scroll this specific carousel's track
        track.scrollBy({
          left: direction * amount,
          behavior: 'smooth',
        });
      };

      // Only attach listeners to THIS carousel's buttons (scoped)
      prevBtn.addEventListener('click', () => scrollBySlide(-1));
      nextBtn.addEventListener('click', () => scrollBySlide(1));
    });
  }

  /**
   * Initialize TNO TRUST Card Interactions
   *
   * Handles:
   * - Add to Cart with conscious delay (400ms resistance to impulse)
   * - Color variant selection
   * - Loading and success states
   */
  function initTnoTrustCardInteractions() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Add to Cart with Conscious Delay
     */
    const addToCartButtons = document.querySelectorAll('.tno-card-button');

    addToCartButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        const form = this.closest('form');
        if (!form) {
          return;
        }

        // Visual feedback: Loading state
        this.classList.add('tno-card-button--loading');
        const textEl = this.querySelector('span');
        const originalText = textEl ? textEl.textContent : '';
        if (textEl) {
          textEl.textContent = 'Processing';
        }

        const doRequest = () => {
          const formData = new FormData(form);
          fetch('/cart/add.js', {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData,
          })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then(() => {
              this.classList.remove('tno-card-button--loading');
              this.classList.add('tno-card-button--success');
              if (textEl) {
                textEl.textContent = 'Added';
              }
              // Optional: update cart count if theme exposes helper
              if (window.theme && typeof window.theme.updateCartCount === 'function') {
                try {
                  window.theme.updateCartCount();
                } catch (err) {
                  // Silently fail if cart update helper doesn't exist
                }
              }
              // Reset after 2s
              setTimeout(() => {
                this.classList.remove('tno-card-button--success');
                if (textEl) {
                  textEl.textContent = originalText;
                }
              }, 2000);
            })
            .catch(() => {
              this.classList.remove('tno-card-button--loading');
              if (textEl) {
                textEl.textContent = 'Error';
              }
              setTimeout(() => {
                if (textEl) {
                  textEl.textContent = originalText;
                }
              }, 2000);
            });
        };

        if (prefersReducedMotion) {
          doRequest();
        } else {
          setTimeout(doRequest, 400); // Conscious delay
        }
      });
    });

    /**
     * Color Variant Selection
     */
    const variantButtons = document.querySelectorAll('.tno-card-variant');

    variantButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const card = this.closest('.tno-card-product');
        if (!card) {
          return;
        }
        const variantId = this.dataset.variantId;
        const variantInput = card.querySelector('input[name="id"]');
        const allButtons = card.querySelectorAll('.tno-card-variant');
        const newPrice = this.dataset.price;

        // Update selected state
        allButtons.forEach((b) => b.classList.remove('tno-card-variant--selected'));
        this.classList.add('tno-card-variant--selected');

        // Update form hidden input
        if (variantInput && variantId) {
          variantInput.value = variantId;
        }

        // Update price display (basic)
        const priceEl = card.querySelector('.price');
        if (priceEl && newPrice) {
          const priceValue = card.querySelector('.price__regular, .price-item--regular');
          if (priceValue) {
            priceValue.textContent = newPrice;
          }
        }
      });
    });
  }

  /**
   * Initialize TNO Product Card Click Behavior
   *
   * Uses Event Delegation with CAPTURE PHASE to intercept clicks BEFORE other scripts.
   * The 'true' parameter enables capture phase (event flows from document → target).
   * This ensures our handler runs first and can prevent other scripts from interfering.
   */
  function initTnoProductCardClicks() {
    // Das 'true' am Ende aktiviert die CAPTURE PHASE.
    // Das bedeutet: Wir fangen den Klick ab, BEVOR er das Element erreicht.
    document.addEventListener('click', function (e) {
      // 1. Ist es eine TRUST-Karte?
      const card = e.target.closest('.tno-card-product');

      if (!card) return; // Wenn nicht, lassen wir den Klick durch

      // 2. Interaktive Elemente schützen (Buttons, Inputs)
      const clickedElement = e.target;
      if (
        clickedElement.closest('a') ||
        clickedElement.closest('button') ||
        clickedElement.closest('.tno-card-button') ||
        clickedElement.closest('.tno-card-variant')
      ) {
        // Wenn Nutzer auf Button klickt, machen wir nichts und lassen es durchlaufen
        return;
      }

      // 3. Jetzt schlagen wir zu!
      const productUrl = card.dataset.productUrl;

      if (productUrl) {
        // Wir stoppen SOFORT alle anderen Skripte (das "böse" Skript wird gekillt)
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Wir führen unsere korrekte Navigation aus
        if (e.metaKey || e.ctrlKey) {
          window.open(productUrl, '_blank');
        } else {
          window.location.href = productUrl;
        }
      }
    }, true); // <--- WICHTIG: Dieses 'true' sorgt dafür, dass wir ZUERST dran sind!

    // Cursor Styling (optisch)
    const style = document.createElement('style');
    style.innerHTML = '.tno-card-product { cursor: pointer; }';
    document.head.appendChild(style);
  }

  /**
   * Initialize TNO Footer Accordion
   *
   * Handles mobile footer accordion toggle functionality.
   * Only runs on mobile screens (max-width: 749px) to avoid interfering with desktop.
   */
  function initTnoFooterAccordion() {
    const isMobile = window.matchMedia('(max-width: 749px)').matches;
    if (!isMobile) {
      return;
    }

    const accordionToggles = document.querySelectorAll('.tno-footer-accordion__toggle');
    if (!accordionToggles.length) {
      return;
    }

    accordionToggles.forEach((toggle) => {
      toggle.addEventListener('click', function () {
        const accordion = this.closest('.tno-footer-accordion');
        const panel = accordion.querySelector('.tno-footer-accordion__panel');
        const isOpen = accordion.classList.contains('is-open');

        if (!accordion || !panel) {
          return;
        }

        if (isOpen) {
          accordion.classList.remove('is-open');
          this.setAttribute('aria-expanded', 'false');
          panel.setAttribute('hidden', '');
        } else {
          accordion.classList.add('is-open');
          this.setAttribute('aria-expanded', 'true');
          panel.removeAttribute('hidden');
        }
      });
    });
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
    initTnoScrollReveal();
    initTnoProductMobileNavScroll();
    initTnoRelatedProductsCarousel();
    initTnoLatestDropsCarousel();
    initTnoTrustCardInteractions();
    initTnoProductCardClicks();
    initTnoFooterAccordion();

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

  // Re-initialize carousel when section loads in theme editor
  document.addEventListener('shopify:section:load', (event) => {
    if (event.detail.sectionId && document.querySelector('.tno-latest-drops')) {
      initTnoLatestDropsCarousel();
    }
  });
})();
