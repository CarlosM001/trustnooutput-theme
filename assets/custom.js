(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.TNO = window.TNO || {};
  window.TNO.events = window.TNO.events || [];
  window.dataLayer = window.dataLayer || [];

  function pushEvent(eventData) {
    window.TNO.events.push(eventData);
    window.dataLayer.push(eventData);
  }

  const variant = document.documentElement.getAttribute('data-ab-variant') || 'unknown';
  document.documentElement.classList.add(
    variant === 'glitch_pulse' ? 'tno-ab-pulse' : 'tno-ab-continuous'
  );
  window.TNO.abVariant = variant;

  pushEvent({ event: 'tno_variant', variant });
  pushEvent({ event: 'tno_reduced_motion', value: prefersReducedMotion });

  const CONFIG = {
    fadeIn: { duration: 600, delay: 60 },
    reveal: { threshold: 0.2, rootMargin: '0px' },
    parallax: { speed: 0.15 },
    glitch: { minDelay: 300, maxDelay: 700 },
  };

  // TNO Header Search: Glitch effect & input clear
  function initTnoHeaderSearch() {
    const GLITCH_DURATION_MS = 300; // Matches CSS animation: 0.3s
    const searchForms = document.querySelectorAll('.tno-search form');
    searchForms.forEach((form) => {
      const input = form.querySelector('.tno-search__input');
      const button = form.querySelector('.tno-search__button');

      // Glitch effect on button
      if (button && !button.hasAttribute('data-tno-glitch')) {
        button.addEventListener('mousedown', () => {
          button.classList.add('is-glitching');
          setTimeout(() => {
            button.classList.remove('is-glitching');
          }, GLITCH_DURATION_MS);
        });
        button.setAttribute('data-tno-glitch', 'true');
      }

      // Clear input after submit
      if (input && !form.hasAttribute('data-tno-search-clear')) {
        form.addEventListener('submit', () => {
          setTimeout(() => {
            input.value = '';
          }, 100);
          // IIFE start
          (function () {
            'use strict';

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.TNO = window.TNO || {};
            window.TNO.events = window.TNO.events || [];
            window.dataLayer = window.dataLayer || [];

            function pushEvent(eventData) {
              window.TNO.events.push(eventData);
              window.dataLayer.push(eventData);
            }

            const variant = document.documentElement.getAttribute('data-ab-variant') || 'unknown';
            document.documentElement.classList.add(
              variant === 'glitch_pulse' ? 'tno-ab-pulse' : 'tno-ab-continuous'
            );
            window.TNO.abVariant = variant;

            pushEvent({ event: 'tno_variant', variant });
            pushEvent({ event: 'tno_reduced_motion', value: prefersReducedMotion });

            const CONFIG = {
              fadeIn: { duration: 600, delay: 60 },
              reveal: { threshold: 0.2, rootMargin: '0px' },
              parallax: { speed: 0.15 },
              glitch: { minDelay: 300, maxDelay: 700 },
            };

            function initPageFade() {
              document.body.style.opacity = 0;
              document.body.style.transition = `opacity ${CONFIG.fadeIn.duration}ms ease`;
              requestAnimationFrame(() => {
                setTimeout(() => {
                  document.body.style.opacity = 1;
                }, CONFIG.fadeIn.delay);
              });

              window.addEventListener('pageshow', (e) => {
                if (e.persisted) {
                  document.body.style.opacity = 0;
                  setTimeout(() => {
                    document.body.style.opacity = 1;
                  }, 50);
                }
              });
            }

            function initScrollEffects() {
              const elements = document.querySelectorAll('.reveal, [data-parallax]');
              if (!elements.length) {
                return;
              }

              if (prefersReducedMotion) {
                elements.forEach((el) => {
                  el.classList.add('is-visible');
                  if (el.hasAttribute('data-parallax')) {
                    el.style.transform = 'none';
                  }
                });
                return;
              }

              const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    if (entry.target.hasAttribute('data-parallax')) {
                      entry.target.classList.add('in-view');
                    }
                    observer.unobserve(entry.target);
                  }
                });
              }, CONFIG.reveal);

              elements.forEach((el) => observer.observe(el));
            }

            function initGlitchEffects() {
              const sections = document.querySelectorAll('.hero-section, .tno-hero, [data-glitch-section]');
              if (!sections.length) {
                return;
              }

              const glitchObserver = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    const sec = entry.target;
                    const mode = (sec.dataset.glitchMode || 'pulse').toLowerCase();
                    const all = sec.querySelectorAll('.tno-glitch-strong, .tno-glitch-soft, .glitch');

                    if (entry.isIntersecting) {
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

              sections.forEach((sec) => glitchObserver.observe(sec));
            }

            function initScrollParallax() {
              if (prefersReducedMotion || window.innerWidth < 768) {
                return;
              }

              const elements = document.querySelectorAll('[data-parallax].in-view');
              if (!elements.length) {
                return;
              }

              let ticking = false;

              function initAll() {
                initPageFade();
                initScrollEffects();
                initGlitchEffects();
                initScrollParallax();
                initHeaderTransparency();
                initTnoHeaderSearch();
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initAll);
              } else {
                initAll();
              }

              if (window.Shopify && window.Shopify.designMode) {
                document.addEventListener('shopify:section:load', () => {
                  initAll();
                });
              }
              const header = document.getElementById('site-header');
              if (!header || !header.classList.contains('is-transparent')) {
                return;
              }

              const hero =
                document.getElementById('shopify-section-motion-hero-tno') ||
                document.querySelector('.tno-hero, .motion-hero');
              if (!hero) {
                return;
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
                  rootMargin: '-120px 0px 0px 0px',
                  threshold: 0,
                }
              );

              observer.observe(hero);
            }

            function initTnoHeaderSearch() {
              const GLITCH_DURATION_MS = 300; // Matches CSS animation: 0.3s
              const searchForms = document.querySelectorAll('.tno-search form');
              searchForms.forEach((form) => {
                const input = form.querySelector('.tno-search__input');
                const button = form.querySelector('.tno-search__button');

                // Glitch effect on button
                if (button && !button.hasAttribute('data-tno-glitch')) {
                  button.addEventListener('mousedown', () => {
                    button.classList.add('is-glitching');
                    setTimeout(() => {
                      button.classList.remove('is-glitching');
                    }, GLITCH_DURATION_MS);
                  });
                  button.setAttribute('data-tno-glitch', 'true');
                }

                // Clear input after submit
                if (input && !form.hasAttribute('data-tno-search-clear')) {
                  form.addEventListener('submit', () => {
                    setTimeout(() => {
                      input.value = '';
                    }, 100);
                  });
                  form.setAttribute('data-tno-search-clear', 'true');
                }
              });
            }

            function initAll() {
              initPageFade();
              initScrollEffects();
              initGlitchEffects();
              initScrollParallax();
              initHeaderTransparency();
              initTnoHeaderSearch();
            }

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initAll);
            } else {
              initAll();
            }

            if (window.Shopify && window.Shopify.designMode) {
              document.addEventListener('shopify:section:load', () => {
                initAll();
              });
            }

          })();
