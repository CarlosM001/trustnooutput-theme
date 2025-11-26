# TRUST.NO.OUTPUT Theme Audit Report

**Generated:** 2025-11-25
**Priority:** Ensure bottom MENU button works in all cases

---

## A. DETECTED PROBLEMS

### CRITICAL ISSUES

#### 1. Duplicate Event Listeners for Bottom Menu Button

**File:** `assets/header.js`
**Lines:** 285 and 333
**Problem:** Two separate event listeners are attached to `#bottom-tab-menu`:

- Line 285: Inside `initMobileMenu()` - calls `toggleMobileMenu()`
- Line 333: Inside `wireBottomTabMenuToDrawer()` - simulates summary click

**Impact:** Double-toggle behavior causing menu to open and immediately close, or vice versa.

#### 2. Mismatched ARIA Controls Between Components

**Files:**

- `snippets/tno-bottom-tabs.liquid:56` - `aria-controls="menu-drawer"`
- `sections/header-trust.liquid:617` - `aria-controls="mobile-menu"`
- `sections/header-trust.liquid:1272` - `aria-controls="mobile-menu"`

**Problem:** The bottom tab menu button in `tno-bottom-tabs.liquid` references `menu-drawer` (Shopify native drawer), while `header-trust.liquid` uses `mobile-menu` (custom TNO menu). The header-group.json uses `header-trust`, not `header`, so the native Shopify drawer is not present.

#### 3. Orphaned/Unused Snippet Reference

**File:** `snippets/mobile-menu-overlay.liquid:15`
**Problem:** This snippet renders `tno-bottom-tabs` inside a mobile menu overlay, but `mobile-menu-overlay.liquid` is never rendered anywhere in the theme.

---

### HIGH PRIORITY ISSUES

#### 4. Duplicate Bottom Tabs Implementation

**Files:**

- `snippets/tno-bottom-tabs.liquid` - Standalone snippet
- `sections/header-trust.liquid:1217-1281` - Inline implementation

**Problem:** Two separate implementations of the bottom tabs exist. Since `header-trust` is the active header (per `header-group.json`), and it includes inline bottom tabs, the snippet may cause conflicts if rendered elsewhere.

#### 5. Z-Index Layering Conflicts

**File:** `assets/custom.css`

| Element                 | Z-Index | File:Line       |
| ----------------------- | ------- | --------------- |
| .tno-bottom-tabs        | 1100    | custom.css:2216 |
| .site-header            | 1100    | custom.css:2439 |
| .menu-drawer            | 1000    | custom.css:2202 |
| .mobile-menu            | 900     | custom.css:1657 |
| .tno-mobile-back-header | 1050    | custom.css:1766 |

**Problem:** Bottom tabs and site header share same z-index (1100). This can cause stacking issues on some devices.

#### 6. Unused/Legacy Files

| File                                          | Status                                                |
| --------------------------------------------- | ----------------------------------------------------- |
| `snippets/mobile-menu-overlay.liquid`         | UNUSED - Never rendered                               |
| `snippets/progress-bar.liquid`                | UNUSED - No references                                |
| `sections/main-product-tno-BACKUP.liquid`     | BACKUP FILE - Should be removed                       |
| `sections/main-product-tno-REFACTORED.liquid` | REFACTORED FILE - Should be reviewed/removed          |
| `backup-phase1/` directory                    | BACKUP DIRECTORY - Should be in .gitignore or removed |
| `assets/component-progress-bar.css`           | UNUSED - Not referenced                               |

---

### MEDIUM PRIORITY ISSUES

#### 7. Competing Mobile Menu Implementations

**Problem:** The theme has multiple mobile menu systems:

1. **Shopify Native** (`snippets/header-drawer.liquid`):
   - Uses `<details id="Details-menu-drawer-container">`
   - Rendered by `sections/header.liquid` (NOT currently active)

2. **TNO Custom** (`sections/header-trust.liquid`):
   - Uses `<div class="mobile-menu" id="mobile-menu">`
   - Has drilldown panels (APPAREL, ACCESSORIES, PRINTS)

3. **Overlay Snippet** (`snippets/mobile-menu-overlay.liquid`):
   - Wraps `tno-bottom-tabs` in overlay
   - UNUSED

**Active Implementation:** `header-trust.liquid` via `header-group.json`

#### 8. Pointer-Events Issues

**File:** `assets/custom.css`

Lines with `pointer-events: none` that could block clicks:

- Line 2220: `.tno-tab::before, .tno-tab::after` - OK (pseudo-elements)
- Line 2349: `#bottom-tab-menu.is-active::after` - OK (pseudo-element)

No critical pointer-events issues blocking the MENU button directly.

#### 9. Console Debug Logging in Production

**File:** `assets/header.js:334`

```javascript
console.log('[TNO DEBUG] Bottom tab menu button clicked');
```

**Problem:** Debug logging left in production code.

---

## B. EXACT FILE + LINE NUMBERS

### Critical Code Locations

#### Bottom Tab Menu Button Control

| Location                                 | Purpose                       |
| ---------------------------------------- | ----------------------------- |
| `snippets/tno-bottom-tabs.liquid:49-71`  | Menu button element (snippet) |
| `sections/header-trust.liquid:1267-1280` | Menu button element (inline)  |
| `assets/header.js:284-296`               | Click handler 1               |
| `assets/header.js:327-356`               | Click handler 2 (duplicate)   |
| `assets/header.js:358-382`               | Element initialization        |

#### Mobile Menu Control

| Location                               | Purpose               |
| -------------------------------------- | --------------------- |
| `sections/header-trust.liquid:612-622` | Mobile toggle button  |
| `sections/header-trust.liquid:942-951` | Mobile menu container |
| `assets/header.js:261-272`             | toggleMobileMenu()    |
| `assets/header.js:238-259`             | closeMobileMenu()     |

#### CSS Z-Index Stack

| Location          | Element          | Value |
| ----------------- | ---------------- | ----- |
| `custom.css:2216` | .tno-bottom-tabs | 1100  |
| `custom.css:2439` | .site-header     | 1100  |
| `custom.css:1657` | .mobile-menu     | 900   |
| `custom.css:2202` | .menu-drawer     | 1000  |

---

## C. SUGGESTIONS FOR FIXES

### Fix 1: Remove Duplicate Event Listener (CRITICAL)

**File:** `assets/header.js`

Remove the `wireBottomTabMenuToDrawer()` function and its call, as it duplicates functionality and targets the wrong drawer (Shopify native vs TNO custom).

```diff
- function wireBottomTabMenuToDrawer() {
-     var bottomTabMenu = document.getElementById('bottom-tab-menu');
-     var drawerSummary = document.getElementById('mobile-menu-toggle');
-     if (bottomTabMenu && detailsContainer) {
-       var menuDrawer = detailsContainer.querySelector('.menu-drawer');
-       var drawerSummary = detailsContainer.querySelector('summary');
-       bottomTabMenu.addEventListener('click', function () {
-         console.log('[TNO DEBUG] Bottom tab menu button clicked');
-         if (detailsContainer.hasAttribute('open')) {
-           // Simulate native summary click to close
-           if (drawerSummary) drawerSummary.click();
-           detailsContainer.removeAttribute('open');
-           if (menuDrawer) {
-             menuDrawer.classList.remove('menu-opening');
-             menuDrawer.style.visibility = '';
-             menuDrawer.style.transform = '';
-           }
-         } else {
-           // Simulate native summary click to open
-           if (drawerSummary) drawerSummary.click();
-           detailsContainer.setAttribute('open', '');
-           if (menuDrawer) {
-             menuDrawer.classList.add('menu-opening');
-             menuDrawer.style.visibility = 'visible';
-             menuDrawer.style.transform = 'translateX(0)';
-           }
-         }
-       });
-     }
-   }
```

And remove the calls at lines 388 and 392:

```diff
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('js');
      init();
-     wireBottomTabMenuToDrawer();
    });
  } else {
    document.body.classList.add('js');
    init();
-   wireBottomTabMenuToDrawer();
  }
```

### Fix 2: Update initMobileMenu() to target correct menu (CRITICAL)

**File:** `assets/header.js`

Update `initMobileMenu()` to work with the TNO custom mobile menu instead of the Shopify details drawer:

```javascript
function initMobileMenu() {
  const mobileMenuElement = document.getElementById('mobile-menu');
  const bottomTabMenuBtn = document.getElementById('bottom-tab-menu');
  const headerToggle = document.getElementById('mobile-menu-toggle');

  if (!mobileMenuElement || !bottomTabMenuBtn) {
    dbg('initMobileMenu: missing elements');
    return;
  }

  function openMenu() {
    mobileMenuElement.classList.add('is-active');
    mobileMenuElement.setAttribute('aria-hidden', 'false');
    bottomTabMenuBtn.classList.add('is-active');
    bottomTabMenuBtn.setAttribute('aria-expanded', 'true');
    if (headerToggle) headerToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden-mobile');
  }

  function closeMenu() {
    mobileMenuElement.classList.remove('is-active');
    mobileMenuElement.setAttribute('aria-hidden', 'true');
    bottomTabMenuBtn.classList.remove('is-active');
    bottomTabMenuBtn.setAttribute('aria-expanded', 'false');
    if (headerToggle) headerToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden-mobile');
  }

  function toggleMenu() {
    const isOpen = mobileMenuElement.classList.contains('is-active');
    isOpen ? closeMenu() : openMenu();
  }

  // Bottom tab menu toggle
  bottomTabMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });

  // Header hamburger toggle (if present)
  if (headerToggle) {
    headerToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });
  }

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuElement.classList.contains('is-active')) {
      closeMenu();
    }
  });
}
```

### Fix 3: Update ARIA Controls in bottom-tabs snippet

**File:** `snippets/tno-bottom-tabs.liquid:56`

Change from:

```liquid
aria-controls="menu-drawer"
```

To:

```liquid
aria-controls="mobile-menu"
```

### Fix 4: Separate Z-Index for Bottom Tabs

**File:** `assets/custom.css:2216`

Change:

```css
.tno-bottom-tabs,
.tno-bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100; /* Same as header - potential conflict */
}
```

To:

```css
.tno-bottom-tabs,
.tno-bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1200; /* Above header to ensure always clickable */
}
```

---

## D. UNNECESSARY FILES TO DELETE

### Immediate Deletion Recommended

1. **`snippets/mobile-menu-overlay.liquid`**
   - Reason: Never rendered, orphaned file

2. **`sections/main-product-tno-BACKUP.liquid`**
   - Reason: Backup file in production code

3. **`sections/main-product-tno-REFACTORED.liquid`**
   - Reason: Refactored version not in use, creates confusion

4. **`backup-phase1/` directory**
   - Reason: Backup directory should not be in repo
   - Alternative: Add to `.gitignore`

### Review Before Deletion

5. **`snippets/progress-bar.liquid`**
   - Check: May be used dynamically or planned for future

6. **`assets/component-progress-bar.css`**
   - Check: Related to progress-bar.liquid

7. **`sections/header.liquid`** (792 lines)
   - Note: NOT currently used (header-trust is active)
   - Risk: May be needed for fallback/different templates

---

## E. MENU/DRAWER INTERACTIONS MAP

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CURRENT ACTIVE FLOW                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  header-group.json                                                       │
│       │                                                                  │
│       └──> sections/header-trust.liquid                                  │
│                 │                                                        │
│                 ├──> #mobile-menu-toggle (hamburger button)              │
│                 │         aria-controls="mobile-menu"                    │
│                 │                                                        │
│                 ├──> #mobile-menu (custom TNO overlay)                   │
│                 │         ├── .tno-mobile-panel.is-root                  │
│                 │         ├── .tno-mobile-panel.is-child (APPAREL)       │
│                 │         ├── .tno-mobile-panel.is-child (ACCESSORIES)   │
│                 │         └── .tno-mobile-panel.is-child (PRINTS)        │
│                 │                                                        │
│                 └──> .tno-bottom-tabs (inline, lines 1217-1281)          │
│                           └── #bottom-tab-menu                           │
│                                 aria-controls="mobile-menu"              │
│                                                                          │
│  assets/header.js                                                        │
│       │                                                                  │
│       ├──> init()                                                        │
│       │      └── initMobileMenu()                                        │
│       │              └── bottomTabMenu.addEventListener('click')         │
│       │                       └── toggleMobileMenu()                     │
│       │                               └── detailsContainer manipulation  │
│       │                                   (WRONG - targets Shopify drawer)│
│       │                                                                  │
│       └──> wireBottomTabMenuToDrawer() [DUPLICATE - SHOULD REMOVE]       │
│              └── bottomTabMenu.addEventListener('click')                 │
│                       └── drawerSummary.click()                          │
│                           (WRONG - simulates native drawer click)        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        INACTIVE/ORPHANED FLOW                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  sections/header.liquid (NOT ACTIVE)                                     │
│       │                                                                  │
│       ├──> snippets/header-drawer.liquid                                 │
│       │         └── #Details-menu-drawer-container (Shopify native)      │
│       │               └── #menu-drawer                                   │
│       │                                                                  │
│       └──> snippets/tno-bottom-tabs.liquid                               │
│                 └── #bottom-tab-menu                                     │
│                       aria-controls="menu-drawer" [MISMATCHED]           │
│                                                                          │
│  snippets/mobile-menu-overlay.liquid [NEVER RENDERED]                    │
│       └── renders tno-bottom-tabs (orphaned)                             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## F. RECOMMENDED CLEANUP SEQUENCE

### Phase 1: Critical Fixes (Do First)

1. **Fix duplicate event listener** in `assets/header.js`
   - Remove `wireBottomTabMenuToDrawer()` function
   - Remove calls to it at lines 388 and 392

2. **Fix menu toggle logic** in `assets/header.js`
   - Update `initMobileMenu()` to target `#mobile-menu` instead of `detailsContainer`
   - Add proper `is-active` class toggling
   - Update ARIA states correctly

3. **Test bottom MENU button** on mobile
   - Verify single-tap opens menu
   - Verify second tap closes menu
   - Verify hamburger button syncs state

### Phase 2: ARIA/Accessibility

4. **Update ARIA controls** in `snippets/tno-bottom-tabs.liquid`
   - Change `aria-controls="menu-drawer"` to `aria-controls="mobile-menu"`

5. **Verify ARIA states sync** between:
   - `#bottom-tab-menu`
   - `#mobile-menu-toggle`
   - `#mobile-menu`

### Phase 3: Z-Index Cleanup

6. **Adjust z-index hierarchy** in `assets/custom.css`
   - Bottom tabs: 1200 (highest, always clickable)
   - Site header: 1100
   - Mobile menu: 1050 (above content, below header)
   - Back header: 1040

### Phase 4: File Cleanup

7. **Delete unused files:**
   - `snippets/mobile-menu-overlay.liquid`
   - `sections/main-product-tno-BACKUP.liquid`
   - `sections/main-product-tno-REFACTORED.liquid`

8. **Move backup files:**
   - Add `backup-phase1/` to `.gitignore`
   - Or delete the directory entirely

9. **Review and decide:**
   - Keep or remove `sections/header.liquid`
   - Keep or remove `snippets/progress-bar.liquid`

### Phase 5: Testing

10. **Full regression test:**
    - Desktop navigation (mega menu)
    - Mobile hamburger menu
    - Mobile bottom tab menu
    - Search functionality
    - Cart icon/drawer
    - Account links

---

## SUMMARY

| Category   | Critical | High | Medium | Low |
| ---------- | -------- | ---- | ------ | --- |
| JavaScript | 1        | 0    | 1      | 0   |
| Liquid     | 1        | 1    | 1      | 0   |
| CSS        | 0        | 1    | 1      | 0   |
| Files      | 0        | 4    | 2      | 0   |

**Primary Issue:** The bottom MENU button has duplicate click handlers that conflict with each other. The first handler (line 285) tries to toggle a `detailsContainer` (Shopify native drawer), while the second (line 333) simulates a summary click. Neither correctly targets the active `#mobile-menu` element used by `header-trust.liquid`.

**Solution:** Remove the duplicate handler and update the remaining one to properly toggle the `.is-active` class on `#mobile-menu`.

---

## CSS FIXES APPLIED (2025-11-25)

### Overview

Fixed CSS issues with search page layout, product card visibility, and related products section. All fixes are properly scoped to specific templates to avoid conflicts with Shopify theme editor and other pages.

### Files Modified

- `assets/custom.css`

### 1. Search Page Layout Fix (/search)

**Problem:** On the `/search` page, the search input and submit button were stacked vertically instead of horizontally.

**Solution:** Added scoped CSS rules (lines 6659-6779) targeting `body.template-search`:

- Force horizontal flexbox layout on `.search__form`
- Input field takes full width with `flex: 1`
- Button has fixed width with `flex-shrink: 0`
- TNO cyan gradient button style matching header search
- Mobile-responsive with adjusted sizing for screens < 750px

**Key Selectors:**

```css
body.template-search .search__form {
  display: flex !important;
}
body.template-search .search__input {
  height: 44px;
  border-radius: 999px;
}
body.template-search .search__button {
  background: linear-gradient(135deg, #00e5ff, #00ccdd);
}
```

### 2. Product Grid Cards (Collection Pages)

**Problem:** Product cards on collection pages appeared with white/invisible text, making them unreadable. Theme editor color schemes were being overridden globally.

**Solution:** Refactored product grid styles (lines 6515-6656) with proper template scoping:

- Scoped to `body.template-collection` and `body.template-search` only
- Dark background: `#0c0f14` for cards, `#050608` for container
- Light text: `#f5f5f5` for all headings, prices, and links
- Cyan border on hover: `#00f0ff` with subtle glow effect
- Applied `!important` only where needed to override Shopify defaults

**Key Selectors:**

```css
body.template-collection .product-grid .card {
  background: #0c0f14 !important;
}
body.template-collection .product-grid .card__heading {
  color: #f5f5f5 !important;
}
body.template-collection .color-scheme-1 {
  background: #050608 !important;
}
```

### 3. Related Products Section (Product Pages)

**Problem:** "Related Products" section on product pages had same visibility issues as product grids.

**Solution:** Created dedicated styles (lines 6573-6640) scoped to `body.template-product .related-products`:

- Consistent dark theme matching product grids
- Section heading in light color
- Card hover effects with cyan accent
- Works with all Shopify color schemes (1, 2, 3)

**Key Selectors:**

```css
body.template-product .related-products {
  background: #050608 !important;
}
body.template-product .related-products .card {
  background: #0c0f14 !important;
}
body.template-product .related-products .card__heading {
  color: #f5f5f5 !important;
}
```

### 4. Removed Debug Code

**Removed:** Line 2486-2488 had temporary debug red outline on all product cards:

```css
/* REMOVED */
.grid__item .card {
  outline: 2px solid red !important;
}
```

### Scoping Strategy

All fixes use **template-specific body class selectors** to avoid conflicts:

| Template         | Body Class                 | Affected Sections            |
| ---------------- | -------------------------- | ---------------------------- |
| Collection pages | `body.template-collection` | Product grids, color schemes |
| Search page      | `body.template-search`     | Search form, product grids   |
| Product pages    | `body.template-product`    | Related products section     |

This ensures:

- Theme editor color schemes still work on other pages
- Blog posts, static pages remain unaffected
- Only collection/product/search pages get dark TNO theme
- Specificity is high enough to override Shopify defaults

### CSS Specificity Notes

Used `!important` strategically on:

- Background colors (to override Shopify color scheme styles)
- Text colors (to ensure readability)
- Border colors on hover (for TNO cyan accent)

Avoided `!important` on:

- Layout properties (margin, padding, width, flex)
- Transitions and animations
- Z-index values

### Testing Checklist

- [x] `/search` page: Input and button horizontal on desktop and mobile
- [x] Collection pages: Product cards visible with dark background and light text
- [x] Product pages: Related products section visible and styled
- [x] Theme editor: Color schemes don't break on save
- [x] Mobile responsive: All layouts work on small screens
- [x] Reduced motion: Animations respect user preferences
- [x] Hover effects: Cyan glow on product card hover

### Performance Impact

- No additional HTTP requests (all inline in custom.css)
- Minimal CSS specificity battles (scoped selectors)
- GPU-accelerated transforms for hover effects
- Reduced motion support for accessibility
