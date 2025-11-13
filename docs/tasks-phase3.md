# Phase 3 Tasks — TRUST.NO.OUTPUT

Context

- Builds on v0.2.1 (header.js extraction, accessible mobile menu with dialog semantics, transparency via IntersectionObserver).
- Focus: lightweight accessibility automation, progressive performance fallbacks, and small UX refinements consistent with TNO’s motion philosophy.

Changed (from v0.2.1)

- Removed inline header script from sections/header-trust.liquid to prevent duplication and improve performance.

Improved (from v0.2.1)

- Synchronize ARIA states on toggles and overlays (aria-expanded, aria-hidden).

Planned Tasks for Phase 3

1. Add axe-core accessibility smoke tests

- Scope: Add Playwright (or Puppeteer) + axe-core script to scan key routes (Home, Product, Collection, Cart, Search) with a small URL list.
- Files: tests/a11y/smoke-a11y.js, tests/a11y/urls.json, package.json (devDependencies + script "a11y:smoke").
- Acceptance: Running npm run a11y:smoke prints violations and highlights critical issues; baseline passes for Home or documented allowlist.

2. Evaluate fetchpriority="high" for hero LCP

- Scope: If Lighthouse flags hero image as LCP, add fetchpriority="high" and ensure width/height attributes to prevent CLS.
- Files: sections/motion-hero-tno.liquid (or wherever the LCP image is rendered).
- Acceptance: LCP meets target thresholds (≤2.5s desktop, ≤3.5s mobile); CLS < 0.05.

3. Improve mobile menu semantics (dialog + live feedback + labeling)

- Scope: Maintain role="dialog"/aria-modal; ensure aria-expanded toggles; add SR-friendly feedback for cart updates (aria-live="polite" or a hidden live region); add a visually-hidden heading and role="navigation" for the overlay’s link group.
- Files: sections/header-trust.liquid, assets/header.js (ensure updater emits live feedback).
- Acceptance: SR announces menu context and cart updates; labels and states are accurate and non-spammy.

4. Backdrop blur performance fallback (low-end devices)

- Scope: Provide gradient fallback for .site-header.is-scrolled on devices with low memory/cores; detect via heuristics (e.g., navigator.deviceMemory ≤ 4 or hardwareConcurrency ≤ 4) and toggle html.tno-low-end.
- Files: assets/custom.css (fallback styles), assets/header.js or assets/custom.js (detection + class toggle).
- Acceptance: On flagged devices, header uses gradient fallback; scroll remains smooth with cohesive visuals.

5. Review prefers-reduced-motion behavior

- Scope: Ensure glitch/scanline and long transitions are fully disabled under reduced motion; add early JS guard to skip motion observers when reduced motion is active.
- Files: assets/custom.css, assets/custom.js, assets/header.js.
- Acceptance: With reduced motion enabled, motion is suppressed; UX remains consistent and accessible.

6. Centralize remaining header micro-interactions into header.js

- Scope: Move the cart count updater into assets/header.js (e.g., TNO.header.updateCartCount) and ensure add-to-cart flows call it.
- Files: assets/header.js (+ any call sites as needed).
- Acceptance: Cart badge reliably updates after cart changes.

7. Prepare a performance/Lighthouse quick-check checklist

- Scope: Document a short repeatable checklist (Mobile + Desktop Lighthouse) with targets (LCP, CLS), header transparency verification, and menu behavior checks.
- Files: docs/perf-checks.md (new).
- Acceptance: 2–3 minute manual checklist available before publishing.

8. Optional: Document manual a11y checks

- Scope: Create /docs/a11y-checks.md covering tab order, focus-visible, dialog behavior, reduced motion.
- Files: docs/a11y-checks.md.
- Acceptance: Team can run a fast manual a11y pass pre-release.

9. Optional: Lighthouse CI exploration

- Scope: Evaluate @lhci/cli under Shopify interstitial constraints and document a credentials/cookies strategy if feasible.
- Files: docs/lighthouse-ci.md.
- Acceptance: Clear recommendation (adopt/defer/manual-only) with setup notes.

10. Optional: Header CSS micro-optimizations

- Scope: Replace transition: all with specific properties where applicable; validate/remove unnecessary will-change.
- Files: assets/custom.css (header-related rules).
- Acceptance: No visual regressions; fewer style/layout recalculations in DevTools Performance.

11. Optional: Analytics sanity check after header extraction

- Scope: Verify GA4 events (tno_variant, tno_reduced_motion, tno_atc) emit once per action—no duplicates.
- Files: assets/custom.js.
- Acceptance: GA4 DebugView shows expected single events; no double-fires on ATC.

Effort + Priority

- Effort tags: [S] ≤1h, [M] 2–4h, [L] half-day+
  - 1[S], 2[S], 3[S], 4[M], 5[M], 6[S], 7[S], 8[S], 9[M], 10[S], 11[S]
- First wins: 1, 2, 3, 5, 6; Follow-ups: 4, 7, 10; Docs/Infra: 8, 9, 11
