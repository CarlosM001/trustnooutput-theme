# 🧬 GitHub Copilot Instructions – TRUST.NO.OUTPUT Shopify Theme

Note: A more detailed and operational version of these instructions also lives at `/copilot-instructions.md` in the project root and should be treated as the source of truth. Keep both files aligned; if in doubt, prefer the root file.

## 🧭 Project Overview

This project is a **Shopify theme** for the cyber-philosophical fashion label **TRUST.NO.OUTPUT**.
It uses a **modified Spotlight base** and is developed in **VS Code** with **Shopify CLI**, **BrowserSync**, and **PostCSS**.
The design merges _glitch-art aesthetics_ with minimal, precise UI — clean typography, cyan / magenta RGB accents, and controlled motion.

**Core Philosophy:**

> “Reality is under construction.”
> The visuals and interactions should subtly express digital distortion and simulation — without chaos or seizure-like intensity.

---

## 🎨 Visual & Motion Guidelines

- Motion should feel **smooth, minimal, elegant** (Apple-level polish).
- Use **micro-glitches**, **RGB-split text**, **scanlines**, and **parallax reveals** sparingly.
- Avoid heavy flicker or unreadable distortions.
- Glitch palette:
  - **Cyan** `#00FFFF`
  - **Magenta** `#FF00FF`
  - **Black** `#0A0A0A`
  - **White** `#F2F2F2`

---

## 🧩 Technical Stack

- **Theme Base:** Shopify Spotlight (2024)
- **Languages:** Liquid, CSS, JavaScript (ES6)
- **Workflow Tools:** Shopify CLI, BrowserSync, PostCSS, GitHub Copilot
- **Key Files:**
  - `layout/theme.liquid` → global structure
  - `assets/custom.css` → all custom styles & animations
  - `assets/custom.js` → motion logic (fade-in, parallax, glitch)
  - `sections/motion-hero-tno.liquid` → hero section

---

## ⚙️ Coding Standards

- Keep **Liquid markup clean and modular** (no inline styles).
- Comment **every new function or animation** with its purpose.
- Prioritize **performance**: avoid unnecessary JS loops or heavy CSS filters.
- Ensure **WCAG 2.1 AA** contrast and accessibility.
- Respect **mobile-first principles**.
- Place assets in proper folders:
  - `/layout` → theme.liquid
  - `/sections` → page sections
  - `/snippets` → partials
  - `/assets` → CSS / JS / images

---

## 🧠 Copilot Behavior Guidelines

When generating or completing code:

1. Always explain your reasoning briefly in comments.
2. Prefer **extending** existing logic (do not overwrite custom sections).
3. Suggest **file-path locations** for new code blocks.
4. Align with brand tone: _digital minimalism meets simulation philosophy_.
5. Avoid generic Shopify boilerplate; adapt to the TNO design system.
6. When in doubt, ask the user for clarification rather than assuming intent.

---

## 🧱 Development Phases Reference

1. **Setup, Struktur & Designsystem** → Base structure, colors, typography, spacing.
2. **Hero & Key Sections** → Motion Hero, glitch banners, parallax reveals.
3. **Produkt-Templates & Apps** → POD integration (Printful / Gelato), product layouts.
4. **Feinschliff & Go-Live** → Optimization, accessibility, deployment.
5. **Optimierung & Weiterentwicklung** → A/B testing, automation, content scaling.

---

## ✅ Example Prompt Style for Copilot

```plaintext
Add a subtle RGB-split hover animation to product titles in assets/custom.css.
Use variables from the glitch color palette and respect mobile performance.
```
