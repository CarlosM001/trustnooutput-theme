/* ==========================================================================
   TRUST.NO.OUTPUT — custom.js (PRODUCTION READY)
   Motion: Page Fade, Reveal & Glitch Effects
   Version: 1.0.0
   ========================================================================== */

/* Analytics & Tracking Setup (runs immediately) */
(function TNO_TRACKING() {
  'use strict';

  // Initialize global namespace and dataLayer
  window.TNO = window.TNO || {};
  window.TNO.events = window.TNO.events || [];
  window.dataLayer = window.dataLayer || [];

  // Helper: push to both TNO.events and dataLayer
  const pushEvent = (eventData) => {
    window.TNO.events.push(eventData);
    window.dataLayer.push(eventData);
  };

  // 1) Read server-side A/B variant (already set in HTML by Liquid)
  const variant = document.documentElement.getAttribute('data-ab-variant') || 'unknown';
  window.TNO.abVariant = variant;

  // Apply CSS class for variant-specific styling
  document.documentElement.classList.add(
    variant === 'glitch_pulse' ? 'tno-ab-pulse' : 'tno-ab-continuous'
  );

  // 2) Push A/B variant event
  pushEvent({ event: 'tno_variant', variant: variant });

  // 3) Reduced-motion detection & analytics
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  pushEvent({ event: 'tno_reduced_motion', value: prefersReducedMotion });
})();

(function () {
  'use strict';

  /* Configuration */
  const CONFIG = {
    fadeIn: {
      duration: 600,
      delay: 60,
    },
    reveal: {
      threshold: 0.2,
      rootMargin: '0px',
    },
    parallax: {
      speed: 0.15,
      mouseSpeed: 0.02,
    },
    glitch: {
      minDelay: 300,
      maxDelay: 700,
    },
  };

  /* 1) Page Fade-In Effect */
  const initPageFade = () => {
    document.body.style.opacity = 0;
    document.body.style.transition = `opacity ${CONFIG.fadeIn.duration}ms ease`;

    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.style.opacity = 1;
      }, CONFIG.fadeIn.delay);
    });

    // Handle browser back/forward navigation
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        document.body.style.opacity = 0;
        setTimeout(() => {
          document.body.style.opacity = 1;
        }, 50);
      }
    });
  };

  /* 2) Reveal & Parallax Observer */
  const initScrollEffects = () => {
    const elements = document.querySelectorAll('.reveal, [data-parallax]');
    if (!elements.length) {
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.classList.add('is-visible');
        if (el.hasAttribute('data-parallax')) {
          el.style.transform = 'none';
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target.hasAttribute('data-parallax')) {
              entry.target.classList.add('in-view');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: CONFIG.reveal.threshold,
        rootMargin: CONFIG.reveal.rootMargin,
      }
    );

    elements.forEach((el) => observer.observe(el));
  };

  /* 3) Glitch Effect Initialization (with IntersectionObserver for performance) */
  const initGlitchEffects = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = document.querySelectorAll('.tno-hero[data-glitch-mode]');

    // Helper: ensure data-text mirrors content for pseudo layers
    const ensureDataText = (el) => {
      if (!el.hasAttribute('data-text')) {
        el.setAttribute('data-text', el.textContent || '');
      }
    };

    // If no hero sections declare mode, fallback to global safe nudge
    if (!sections.length) {
      const glitchElements = document.querySelectorAll(
        '.tno-glitch-strong, .tno-glitch-soft, .glitch'
      );
      glitchElements.forEach((el) => {
        ensureDataText(el);
        if (prefersReducedMotion) {
          el.style.animation = 'none';
          return;
        }
        el.style.animation = 'none';
        setTimeout(
          () => {
            el.style.animation = '';
          },
          CONFIG.glitch.minDelay + Math.random() * (CONFIG.glitch.maxDelay - CONFIG.glitch.minDelay)
        );
      });
      return;
    }

    // IntersectionObserver: activate glitch only when hero is onscreen
    const glitchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sec = entry.target;
          const mode = (sec.dataset.glitchMode || 'pulse').toLowerCase();
          const all = sec.querySelectorAll('.tno-glitch-strong, .tno-glitch-soft, .glitch');

          if (entry.isIntersecting) {
            // Hero is onscreen: activate glitch
            sec.classList.add('tno-hero--active');

            if (prefersReducedMotion || mode === 'off') {
              all.forEach((el) => {
                el.style.animation = 'none';
                el.classList.remove('is-glitching');
              });
              return;
            }

            if (mode === 'continuous') {
              all.forEach((el) => {
                el.style.animation = 'none';
                setTimeout(
                  () => {
                    el.style.animation = '';
                  },
                  CONFIG.glitch.minDelay +
                    Math.random() * (CONFIG.glitch.maxDelay - CONFIG.glitch.minDelay)
                );
              });
            } else {
              // Pulse mode
              const pulseEls = sec.querySelectorAll('.tno-glitch-pulse');
              pulseEls.forEach((el) => {
                if (el._tnoGlitchTimer) {
                  clearTimeout(el._tnoGlitchTimer);
                }

                const burst = () => {
                  if (!document.body.contains(el) || !sec.classList.contains('tno-hero--active')) {
                    return;
                  }
                  el.classList.add('is-glitching');
                  setTimeout(() => {
                    el.classList.remove('is-glitching');
                  }, 900);

                  const delay =
                    CONFIG.glitch.minDelay +
                    Math.random() * (CONFIG.glitch.maxDelay - CONFIG.glitch.minDelay);
                  el._tnoGlitchTimer = setTimeout(burst, delay + 900);
                };

                el._tnoGlitchTimer = setTimeout(burst, 200 + Math.random() * 600);
              });
            }
          } else {
            // Hero is offscreen: clean up timers and remove active state
            sec.classList.remove('tno-hero--active');
            all.forEach((el) => {
              if (el._tnoGlitchTimer) {
                clearTimeout(el._tnoGlitchTimer);
                el._tnoGlitchTimer = null;
              }
              el.classList.remove('is-glitching');
              el.style.animation = 'none';
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    sections.forEach((sec) => {
      const all = sec.querySelectorAll('.tno-glitch-strong, .tno-glitch-soft, .glitch');
      all.forEach(ensureDataText);
      glitchObserver.observe(sec);
    });
  };

  /* 4) Scroll Parallax (desktop only) */
  const initScrollParallax = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 768;
    if (prefersReducedMotion || !isDesktop) {
      return;
    }

    const parallaxElements = document.querySelectorAll('[data-parallax].in-view');
    if (!parallaxElements.length) {
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || CONFIG.parallax.speed;
        const yPos = -(scrollY * speed);

        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  };

  /* 5) Mouse Parallax (desktop only) */
  const initMouseParallax = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 768;
    if (prefersReducedMotion || !isDesktop) {
      return;
    }

    const mouseElements = document.querySelectorAll('[data-mouse-parallax]');
    if (!mouseElements.length) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let rafId = null;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / windowWidth - 0.5) * 2;
      mouseY = (e.clientY / windowHeight - 0.5) * 2;

      if (!rafId) {
        rafId = requestAnimationFrame(updateElements);
      }
    };

    const updateElements = () => {
      mouseElements.forEach((el) => {
        const speed = parseFloat(el.dataset.mouseParallax) || CONFIG.parallax.mouseSpeed;
        const x = mouseX * speed * 100;
        const y = mouseY * speed * 100;

        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      rafId = null;
    };

    const handleResize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
  };

  /* 6) Initialize Everything */
  const init = () => {
    // Immediate initializations
    initPageFade();

    // DOM-dependent initializations
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initScrollEffects();
        initGlitchEffects();
        initScrollParallax();
        initMouseParallax();
        initDelayedCtas();
        initCtaKeyboardSupport();
        initAtcTracking();
        initHeaderTransparency();
      });
    } else {
      // DOM already loaded
      initScrollEffects();
      initGlitchEffects();
      initScrollParallax();
      initMouseParallax();
      initDelayedCtas();
      initCtaKeyboardSupport();
      initAtcTracking();
      initHeaderTransparency();
    }
  };

  // Start initialization
  init();

  // Export for debugging (only in development)
  if (window.Shopify && window.Shopify.designMode) {
    window.TNO = {
      CONFIG,
      reinit: init,
    };
  }
})();

/* 9) Header Transparency Control (IntersectionObserver)
   Purpose: Smoothly toggle header transparency only while hero/banner is visible.
   Rationale: Avoid scroll event thrash; observer is cheaper and intent-driven.
   Behavior:
   - Adds 'is-transparent' class to header when hero sentinel is intersecting.
   - Removes class once hero is scrolled out of view (early trigger via rootMargin).
   - Respects existing manual transparency (does not force if section disabled).
*/
function initHeaderTransparency() {
  const header = document.getElementById('site-header');
  if (!header) {
    return;
  }
  // If merchant disabled transparent header we abort.
  if (!header.classList.contains('is-transparent')) {
    return;
  }

  // Try explicit hero section id first, fallback to first .tno-hero element.
  const hero =
    document.getElementById('shopify-section-motion-hero-tno') ||
    document.querySelector('.tno-hero, .motion-hero');
  if (!hero) {
    return; // No hero present; leave header as-is.
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.add('is-transparent');
        } else {
          header.classList.remove('is-transparent');
        }
      });
    },
    {
      // Trigger slightly before hero fully leaves to preempt abrupt change.
      rootMargin: '-120px 0px 0px 0px',
      threshold: 0,
    }
  );

  observer.observe(hero);
}

/* 7) CTA Enhancements: delayed navigation + Space activation */
function initDelayedCtas() {
  const links = document.querySelectorAll('a[data-delay]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const delay = parseInt(link.getAttribute('data-delay') || '0', 10);
      if (!delay) {
        return;
      } // no delay specified

      // Respect CMD/CTRL clicks and middle-click (open in new tab)
      if (e.metaKey || e.ctrlKey || e.button === 1) {
        return;
      }

      e.preventDefault();
      const href = link.getAttribute('href');
      link.setAttribute('aria-busy', 'true');

      setTimeout(() => {
        window.location.href = href;
      }, delay);
    });
  });
}

function initCtaKeyboardSupport() {
  const ctas = document.querySelectorAll('a[data-cta]');
  ctas.forEach((el) => {
    el.setAttribute('role', 'button');
    el.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
}

/* 8) Conversion Correlation: Track Add-to-Cart with A/B variant */
function initAtcTracking() {
  const forms = document.querySelectorAll('form[action*="/cart/add"]');
  if (!forms.length) {
    return;
  }

  const variant = document.documentElement.getAttribute('data-ab-variant') || 'unknown';

  forms.forEach((form) => {
    form.addEventListener(
      'submit',
      () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'tno_atc',
          variant: variant,
        });
      },
      { capture: true, once: false }
    );
  });
}

/* ==========================================================================
   10) MOBILE DRILLDOWN NAVIGATION (Digitec-style)
   Purpose: Slide-in panel navigation for mobile menu.
   Behavior:
   - Chevron buttons open child panels (slide in from right).
   - Back buttons return to parent panels (slide back from left).
   - Root panel slides left when child is active, creating depth perception.
   - Focus management ensures accessibility.
   - Supports multiple nesting levels.
   ========================================================================== */
function initMobileDrilldown() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) {
    return;
  }
  // Avoid double-initialization (particularly in Theme Editor)
  if (mobileMenu.dataset.drilldownInit === 'true') {
    return;
  }
  mobileMenu.dataset.drilldownInit = 'true';

  const rootPanel = mobileMenu.querySelector('.tno-mobile-panel.is-root');
  if (!rootPanel) {
    return;
  }

  // State tracking
  let activePanel = rootPanel;
  const panelStack = [rootPanel]; // Track navigation history
  let rootScrollTop = 0; // Preserve scroll position when entering child panels

  // Ensure ARIA visibility states
  rootPanel.setAttribute('aria-hidden', 'false');
  const childPanelsInit = mobileMenu.querySelectorAll('.tno-mobile-panel.is-child');
  childPanelsInit.forEach((p) => p.setAttribute('aria-hidden', 'true'));

  /**
   * Activate a child panel (slide in from right)
   * @param {HTMLElement} targetPanel - The panel to activate
   * @param {HTMLElement} chevronButton - The button that triggered the action
   */
  const openPanel = (targetPanel, triggerEl) => {
    if (!targetPanel || targetPanel === activePanel) {
      return;
    }

    // Slide root panel to the left
    if (activePanel === rootPanel) {
      // Store current scroll before hiding
      const rootContent = rootPanel.querySelector('.tno-mobile-panel__content');
      if (rootContent) {
        rootScrollTop = rootContent.scrollTop;
      }
      rootPanel.classList.add('is-hidden');
    }

    // Deactivate current panel
    if (activePanel && activePanel !== rootPanel) {
      activePanel.classList.remove('is-active');
    }

    // Activate target panel (slides in from right)
    targetPanel.classList.add('is-active');
    targetPanel.setAttribute('aria-hidden', 'false');
    activePanel.setAttribute('aria-hidden', 'true');
    activePanel = targetPanel;
    panelStack.push(targetPanel);

    // Update trigger ARIA
    if (triggerEl) {
      triggerEl.setAttribute('aria-expanded', 'true');
    }

    // Focus management: move focus to back button or first link
    setTimeout(() => {
      const backButton = targetPanel.querySelector('.tno-mobile-back');
      const firstLink = targetPanel.querySelector('.tno-mobile-link');
      if (backButton) {
        backButton.focus();
      } else if (firstLink) {
        firstLink.focus();
      }
    }, 50);
  };

  /**
   * Return to parent panel (slide back from left)
   * @param {HTMLElement} backButton - The back button that triggered the action
   */
  const closePanel = () => {
    if (panelStack.length <= 1) {
      return; // Already at root
    }

    // Get current and parent panel
    const currentPanel = panelStack.pop();
    const parentPanel = panelStack[panelStack.length - 1];

    // Deactivate current panel (slides out to right)
    currentPanel.classList.remove('is-active');
    currentPanel.setAttribute('aria-hidden', 'true');

    // Activate parent panel (slides in from left)
    if (parentPanel === rootPanel) {
      rootPanel.classList.remove('is-hidden');
      rootPanel.setAttribute('aria-hidden', 'false');
      // Restore root scroll position
      const rootContent = rootPanel.querySelector('.tno-mobile-panel__content');
      if (rootContent) {
        rootContent.scrollTop = rootScrollTop;
      }
    } else {
      parentPanel.classList.add('is-active');
      parentPanel.setAttribute('aria-hidden', 'false');
    }

    activePanel = parentPanel;

    // Update chevron ARIA (find the chevron that opened this panel)
    const parentId = currentPanel.getAttribute('id');
    // Find any trigger referencing this panel
    const trigger = mobileMenu.querySelector(`[data-mobile-panel-target="${parentId}"]`);
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    }

    // Focus management: return focus to the chevron that opened this panel
    setTimeout(() => {
      if (trigger) {
        trigger.focus();
      }
    }, 50);
  };

  /**
   * Reset all panels to initial state (when menu closes)
   */
  const resetPanels = () => {
    // Deactivate all child panels
    const childPanels = mobileMenu.querySelectorAll('.tno-mobile-panel.is-child');
    childPanels.forEach((panel) => {
      panel.classList.remove('is-active');
      panel.setAttribute('aria-hidden', 'true');
    });

    // Reset root panel
    rootPanel.classList.remove('is-hidden');
    rootPanel.setAttribute('aria-hidden', 'false');
    activePanel = rootPanel;
    panelStack.length = 1; // Keep only root in stack

    // Reset all chevron ARIA states
    const triggers = mobileMenu.querySelectorAll('.tno-mobile-drill-trigger');
    triggers.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
    });
  };

  // Event delegation: full-row triggers (open child panel)
  mobileMenu.addEventListener('click', (e) => {
    const trigger = e.target.closest('.tno-mobile-drill-trigger');
    if (trigger) {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-mobile-panel-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        openPanel(targetPanel, trigger);
      }
    }
  });

  // Event delegation: back button clicks (return to parent)
  mobileMenu.addEventListener('click', (e) => {
    const backButton = e.target.closest('.tno-mobile-back');
    if (backButton) {
      e.preventDefault();
      e.stopPropagation();
      closePanel();
    }
  });

  // Keyboard support for chevron buttons (Enter/Space)
  mobileMenu.addEventListener('keydown', (e) => {
    const trigger = e.target.closest('.tno-mobile-drill-trigger');
    if (trigger && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      trigger.click();
    }
    const backButton = e.target.closest('.tno-mobile-back');
    if (backButton && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      backButton.click();
    }
  });

  // Reset panels when menu closes
  const menuToggle = document.getElementById('mobile-menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      // Check if menu is closing (has is-active class)
      if (mobileMenu.classList.contains('is-active')) {
        // Menu is closing, reset panels after transition
        setTimeout(resetPanels, 300);
      }
    });
  }

  // Also listen for direct menu state changes
  const menuObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const isActive = mobileMenu.classList.contains('is-active');
        if (!isActive) {
          resetPanels();
        }
      }
    });
  });

  menuObserver.observe(mobileMenu, {
    attributes: true,
    attributeFilter: ['class'],
  });
}

// Initialize drilldown when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileDrilldown);
} else {
  initMobileDrilldown();
}

// Re-init in Shopify Theme Editor when the header section reloads
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (e) => {
    try {
      const el = e.target || (e.detail && e.detail.sectionId && document.getElementById(`shopify-section-${e.detail.sectionId}`));
      if (el && el.querySelector && el.querySelector('#mobile-menu')) {
        // Allow re-init by clearing the guard on the new node
        const mm = el.querySelector('#mobile-menu');
        if (mm) {
          mm.dataset.drilldownInit = 'false';
        }
        initMobileDrilldown();
      }
    } catch {
      // Silent guard for editor-only code
    }
  });
}
