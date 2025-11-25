````instructions
# GitHub Copilot Instructions – TRUST.NO.OUTPUT Shopify Theme

**Note:** This file provides AI-focused guidance. A more detailed human-readable version lives at `/copilot-instructions.md` in the project root. When in conflict, defer to root file.

## Architecture Overview

**Base:** Shopify Spotlight (2024) – extensively customized with cyber-philosophical aesthetic
**Brand:** TRUST.NO.OUTPUT – "Reality is under construction"
**Design:** Glitch-minimal (controlled RGB splits, scanlines, parallax) + accessibility-first

### Critical Path Files

- `layout/theme.liquid` – Server-side A/B testing (glitch variants), global HTML shell
- `assets/custom.css` – All TNO design tokens, glitch effects, hero layouts (~6500 lines)
- `assets/custom.js` – Motion orchestration (fade-in, reveal, parallax, glitch triggers)
- `sections/motion-hero-tno.liquid` – Hero section with data-driven parallax/glitch modes
- `scripts/dev-check.js` – Self-healing dev orchestrator (Shopify CLI + BrowserSync)
- `bs-config.js` – BrowserSync proxy config (watches Liquid/CSS/JS, proxies port 9292→3000)

### Component Patterns

**TNO Naming Convention:** All custom classes/data attributes use `tno-` prefix (e.g., `.tno-hero`, `.tno-glitch-strong`, `data-tno-bottom-nav`)

**Snippets:** Small, reusable partials (e.g., `snippets/product-variant-picker.liquid`, `snippets/tno-bottom-tabs.liquid`)
**Sections:** Self-contained blocks with Liquid schema for theme editor (e.g., `sections/main-product-brand.liquid`)

## Design System Tokens

Always reference/extend these CSS custom properties:

```css
:root {
  --tno-cyan: #00e5ff;
  --tno-magenta: #f0c;
  --tno-amber: #ffb000;
  --tno-bg: #fff;
  --tno-fg: #0f0f14;
  --tno-accent: var(--tno-cyan);
  --tno-r-xs: 8px; /* border-radius scales */
  --tno-r-sm: 12px;
  --tno-r-md: 16px;
  --tno-r-lg: 24px;
  --tno-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --tno-fast: 0.2s var(--tno-ease);
  --tno-base: 0.4s var(--tno-ease);
  --glitch-duration: 2.5s;
  --parallax-strength: 0.15;
  --rgb-shift: 0.08; /* Liquid can override via inline style */
}
```

**Glitch Effects:**
- `.tno-glitch-strong` – Heavy cyan/magenta RGB split via text-shadow pseudo-elements
- `.tno-glitch-soft` – Subtle version with lower opacity
- `.tno-glitch-pulse` – Triggered animation class (controlled via A/B variant in `theme.liquid`)

## Developer Workflow

### Starting Development

**Primary command:** `npm run dev` (or VS Code task: `Dev: Shopify + BrowserSync`)

This runs `scripts/dev-check.js` which:
1. Detects existing Shopify CLI (port 9292) or spawns new instance
2. Selects available preview port (3000+) for BrowserSync
3. Auto-restarts failed processes (bounded retry logic)
4. Persists state to `.dev-server.json` for external tools
5. Prints `TNO DEV READY -> http://localhost:3000` when both servers healthy

**Windows-specific:** Use `npm run dev:windows` for explicit `concurrently` dual-launch

**Debugging:** Use VS Code launch configs:
- "Debug: BrowserSync (Port 3000)" – preferred (live reload + CSS injection)
- "Debug: Shopify Dev (Port 9292)" – direct CLI output (fallback)

### Quality Checks

- `npm run hygiene` – Auto-fix Prettier, Stylelint, ESLint, validate JSON (run before commits)
- `npm run theme:check` – Shopify CLI theme validation
- VS Code task: `QA: All` – Sequential hygiene + theme check

### Build & Deploy

- `npm run build:css` – PostCSS: Autoprefixer + cssnano → `assets/custom.min.css`
- `npm run theme:push:dev` – Deploy to dev theme (ID: 186572767607)
- `npm run theme:push:live` – Deploy to live theme (use with caution)

## Motion & Performance Patterns

### Reduced Motion Respect

**Critical:** ALL animations must check `prefers-reduced-motion`. Pattern established in `assets/custom.js`:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  elements.forEach(el => el.classList.add('is-visible')); // Skip animations
  return;
}
```

### Scroll Effects Architecture

**IntersectionObserver pattern** (threshold: 0.2):
- `.reveal` class – Fade-in on scroll
- `[data-parallax]` – Subtle Y-axis transform (factor typically 0.05–0.15)
- Both initialized in `initScrollEffects()` with reduced-motion bailout

**Glitch triggers:**
- `.tno-glitch-pulse` – Single 120ms pulse on hero load
- Controlled via `data-glitch-mode` attribute in section schemas
- Never loop continuously (avoid seizure triggers per WCAG)

### Performance Targets (from docs)

- LCP < 2.5s desktop / < 3.5s mobile
- CLS < 0.1 (use ratio-locked containers for media)
- Avoid layout thrash: batch reads then writes in requestAnimationFrame

## A/B Testing Implementation

**Server-side bucketing** in `layout/theme.liquid` (lines 1-25):

```liquid
{% assign coin = timestamp | modulo: 2 %}
{% if coin == 0 %}
  {% assign tno_ab_variant = 'glitch_pulse' %}
{% else %}
  {% assign tno_ab_variant = 'glitch_continuous' %}
{% endif %}
```

Variant set on `<html data-ab-variant="glitch_pulse">` → JS reads and pushes to dataLayer/GTM.
Override via theme settings: `settings.tno_glitch_override` ('pulse', 'continuous', 'auto')

## Coding Conventions

### Liquid
- No inline styles – always extract to `assets/custom.css`
- Schema blocks: provide clear descriptions, sensible defaults, limit text fields appropriately
- Loading strategy: `eager` for section.index == 0, else `lazy`

### CSS
- BEM-ish or flat utility classes, prefer `tno-` namespace
- Mobile-first media queries
- Avoid `!important` except debug overrides
- Use calc() with CSS variables for responsive spacing

### JavaScript
- Vanilla ES6, no frameworks
- Pure functions for utilities (throttle, debounce patterns in existing code)
- Document all motion/animation logic with purpose comments
- Use `window.TNO` namespace for globals (established in `custom.js` tracking setup)

## When Suggesting Changes

1. **Specify exact file paths** (e.g., `assets/custom.css`, `sections/motion-hero-tno.liquid`)
2. **Include before/after context** (3-5 lines) for edits
3. **Justify performance/accessibility impact** (e.g., "uses transform instead of top for GPU acceleration")
4. **Provide test steps** (e.g., "View at localhost:3000, toggle reduced motion in DevTools")
5. **Flag risks** (e.g., "This changes global nav – test mobile drawer interactions")

## Common Tasks Quick Reference

| Task | Files | Pattern |
|------|-------|---------|
| Add glitch effect | `assets/custom.css` | Extend `.tno-glitch-*` with text-shadow pseudo-elements |
| New hero variant | `sections/motion-hero-tno.liquid` + `assets/custom.css` | Add schema setting, data attribute, CSS state class |
| Product page feature | `sections/main-product-brand.liquid` + `snippets/buy-buttons.liquid` | Leverage existing `.tno-product-actions` container |
| Mobile navigation | `snippets/header-drawer.liquid` + `snippets/tno-bottom-tabs.liquid` | State managed via `data-tno-*` attributes |
| New utility class | `assets/custom.css` (section 00 or utilities) | Use `tno-` prefix, document purpose |

## Avoid

- Generic Shopify boilerplate (adapt to TNO aesthetic)
- Heavy third-party libs without discussion (bundle size matters)
- Continuous animations without reduced-motion fallback
- Overwriting base Spotlight functionality unless necessary (extend via `custom.*` files)
````
