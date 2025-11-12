# Changelog

All notable changes to the TRUST.NO.OUTPUT Shopify theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

---

## [0.2.0] - 2025-11-12

### Added - Phase 1 Complete: Foundation + Tracking

#### Server-Side A/B Testing
- Implemented Liquid-based server-side bucketing (50/50 split: `glitch_pulse` vs `glitch_continuous`)
- Added `data-ab-variant` and `data-glitch-override` attributes to `<html>` element
- Theme Setting: "Glitch Mode Override" (auto/pulse/continuous) in Customizer

#### Analytics & Tracking
- GA4 integration via `window.dataLayer`
- Events: `tno_variant` (A/B assignment), `tno_reduced_motion` (accessibility), `tno_atc` (conversion tracking)
- Dual-push to `window.TNO.events` (debug) and `window.dataLayer` (analytics)

#### Motion & Glitch System
- IntersectionObserver-based glitch activation (performance optimization)
- CSS variables for glitch intensity and parallax strength
- Live preview in Theme Customizer (real-time slider updates)
- Complete `prefers-reduced-motion` fallback with soft fade alternative

#### Performance
- LCP < 2.5s target maintained
- CLS < 0.1 (no layout shifts from A/B variant application)
- Hero image eager loading for first section
- GPU-accelerated animations with `will-change`

#### Developer Experience
- VS Code tasks: Getting Started, QA (Theme Check + Hygiene), Live Theme opener
- Chrome debugging configs for BrowserSync (port 3000) and Shopify dev (port 9292)
- Lighthouse audit script: `npm run lh:report`
- `/reports/` folder for Lighthouse HTML reports

#### Code Quality
- Prettier + Liquid plugin for consistent formatting
- ESLint v9 flat config for JS linting
- Stylelint v16 with relaxed rules for Shopify class patterns
- All hygiene checks passing

### Changed
- Refactored A/B bucketing from client-side (localStorage) to server-side (Liquid)
- Simplified tracking logic (removed redundant localStorage reads)
- Updated custom.js structure for cleaner event handling

### Fixed
- ESLint "no-undef" warnings resolved
- Stylelint comment spacing issues
- Shopify schema range step validation (changed 0.05 → 0.1)

---

## [0.1.0] - 2025-11-09

### Added - Initial Setup
- Modified Spotlight theme base
- Custom CSS foundation (design tokens, typography, buttons)
- Custom JS (page fade, reveal, parallax, glitch effects)
- Motion Hero section with glitch headings and CTAs
- Header transparency logic and navigation styling
- Google Fonts integration (Space Mono)

---

## Future Roadmap

### Phase 2: Hero & Key Sections (Planned)
- Fine-tune Motion Hero (RGB-glitch intensity, parallax range, CTAs)
- Philosophy/Manifest section
- Featured Drops (product showcase)
- Journal/Blog integration
- Finalize design tokens (colors, spacing, typography)

### Phase 3: Product Templates & Apps (Planned)
- POD integration (Printful/Gelato)
- Product layout optimization
- Variant picker enhancements

### Phase 4: Polish & Go-Live (Planned)
- Mobile optimization pass
- Lighthouse audit → 90+ scores
- Accessibility audit (WCAG 2.1 AA)
- SEO meta tags and structured data

### Phase 5: Evolution & Scaling (Planned)
- A/B test results analysis
- Content automation (blog, drops)
- Email/SMS integrations
- Customer journey optimization

---

[Unreleased]: https://github.com/CarlosM001/trustnooutput-theme/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/CarlosM001/trustnooutput-theme/releases/tag/v0.2.0
[0.1.0]: https://github.com/CarlosM001/trustnooutput-theme/releases/tag/v0.1.0
