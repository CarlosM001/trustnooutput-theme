# TRUST.NO.OUTPUT — Shopify Theme

Cyber‑philosophical streetwear theme built on a customized Spotlight base. Glitch‑minimal aesthetic with controlled motion and strong accessibility.

## Start here

- Canonical Copilot guide: see `copilot-instructions.md` (root)
- GitHub copy: `.github/copilot-instructions.md` (points to root)

## Quick start (Windows / PowerShell)

- Install deps (first time): `npm install`
- Start local dev server + live reload:
  - `npm run dev:windows` (Windows‑optimized) or
  - `npm run dev` (cross‑platform)
- Hygiene tools:
  - `npm run hygiene` (Prettier + Stylelint fix + ESLint fix)
  - `npm run fmt` / `npm run lint:css:fix` / `npm run lint:js:fix`

  ## Debugging

  Two launch configs (open Run & Debug panel):

  1. "Debug: BrowserSync (Port 3000)" – launches against the BrowserSync proxy (preferred for live reload + injected CSS).
  2. "Debug: Shopify Dev (Port 9292)" – launches directly against the Shopify CLI server (raw output, helpful if proxy issues).

  Both can auto-start tasks:
  - BrowserSync config runs the compound *Getting Started* (opens instructions + starts dev stack).
  - Shopify Dev config runs only *Dev: Shopify + BrowserSync*.

  Breakpoints: Place in `assets/*.js`; source maps use project root (`webRoot`).

  Tip: If the debugger attaches before the dev server is ready, hit Reload once the 9292 or 3000 endpoint responds.

## Notes

- Theme dev proxy: Shopify CLI at 127.0.0.1:9292; BrowserSync on 3000.
- Motion respects `prefers-reduced-motion`.
- Keep commits small and messages clear. Branch: `main`.

## Files of interest

- `layout/theme.liquid` — shell
- `assets/custom.css` / `assets/custom.js` — TNO styles & motion logic
- `sections/motion-hero-tno.liquid` — hero section
- `postcss.config.js`, `bs-config.js`, `package.json` — tooling
 - `.vscode/tasks.json` / `.vscode/launch.json` — tasks and debug configs
