# Grid & Product Card Audit Report

**Date:** 2024
**Theme:** TRUST.NO.OUTPUT Shopify Theme
**Purpose:** Inventory of all grid-related code (CSS/JS/Liquid) for cleanup and unification

---

## 1. Grid-Related CSS Classes Inventory

### 1.1 Main Grid Classes

| CSS Class                       | Defined In                                      | Used In                                                                                                           | Status  | Notes                                         |
| ------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------- |
| `.grid`                         | `assets/base.css` (line 883)                    | Multiple sections                                                                                                 | ACTIVE  | Base grid class, used throughout theme        |
| `.grid__item`                   | `assets/base.css` (line 902)                    | Multiple sections                                                                                                 | ACTIVE  | Grid item wrapper, standard Shopify pattern   |
| `.product-grid`                 | `assets/custom.css` (line 6721+)                | `sections/main-collection-product-grid.liquid`, `sections/main-search.liquid`, `sections/related-products.liquid` | ACTIVE  | Main product grid container                   |
| `.product-grid-container`       | `assets/custom.css` (line 6702+)                | `sections/main-collection-product-grid.liquid`, `sections/main-search.liquid`                                     | ACTIVE  | Wrapper for product grid with loading overlay |
| `.tno-collection-grid`          | `assets/custom.css` (line 8226+)                | `sections/main-collection-product-grid.liquid`                                                                    | ACTIVE  | TNO-specific collection grid                  |
| `.tno-collection-grid__item`    | `assets/custom.css` (line 8235+)                | `sections/main-collection-product-grid.liquid`                                                                    | ACTIVE  | TNO collection grid item                      |
| `.product-grid-trust`           | `sections/product-grid-trust.liquid` (line 20)  | `sections/product-grid-trust.liquid`                                                                              | ACTIVE  | Section-specific grid wrapper                 |
| `.product-grid-trust__grid`     | `sections/product-grid-trust.liquid` (line 111) | `sections/product-grid-trust.liquid`                                                                              | ACTIVE  | Section-specific grid layout                  |
| `.tno-home-product-grid`        | `assets/custom.css` (line 7976+)                | Potentially unused                                                                                                | LEGACY? | Home product grid carousel (JS disabled)      |
| `.tno-home-product-grid__track` | `assets/custom.css` (line 8021+)                | Potentially unused                                                                                                | LEGACY? | Home grid track (JS disabled)                 |
| `.tno-home-product-grid__item`  | `assets/custom.css` (line 8028+)                | Potentially unused                                                                                                | LEGACY? | Home grid item (JS disabled)                  |
| `.tno-related-products`         | `assets/custom.css` (line 8085+)                | `sections/related-products.liquid`                                                                                | ACTIVE  | Related products carousel wrapper             |
| `.tno-related-products__track`  | `assets/custom.css` (line 8085+)                | `sections/related-products.liquid`                                                                                | ACTIVE  | Related products track (2-col swipe)          |
| `.tno-related-products__item`   | `assets/custom.css`                             | `sections/related-products.liquid`                                                                                | ACTIVE  | Related products item                         |
| `.collection-grid`              | `assets/custom.css` (line 7797)                 | Potentially unused                                                                                                | LEGACY? | Generic collection grid                       |

### 1.2 Grid Column Modifiers (from base.css)

| CSS Class                  | Defined In        | Used In                                                              | Status | Notes                  |
| -------------------------- | ----------------- | -------------------------------------------------------------------- | ------ | ---------------------- |
| `.grid--1-col`             | `assets/base.css` | `sections/main-product.liquid`                                       | ACTIVE | Single column grid     |
| `.grid--2-col`             | `assets/base.css` | Various                                                              | ACTIVE | Two column grid        |
| `.grid--3-col`             | `assets/base.css` | Various                                                              | ACTIVE | Three column grid      |
| `.grid--2-col-tablet`      | `assets/base.css` | `sections/main-product.liquid`                                       | ACTIVE | 2-col on tablet        |
| `.grid--2-col-tablet-down` | `assets/base.css` | `sections/featured-collection.liquid`, `sections/main-search.liquid` | ACTIVE | 2-col tablet and below |
| `.grid--1-col-tablet-down` | `assets/base.css` | `sections/main-collection-product-grid.liquid`                       | ACTIVE | 1-col tablet and below |
| `.grid--4-col-desktop`     | `assets/base.css` | Various                                                              | ACTIVE | 4-col desktop          |
| `.grid--6-col-desktop`     | `assets/base.css` | Various                                                              | ACTIVE | 6-col desktop          |
| `.grid--peek`              | `assets/base.css` | Slider contexts                                                      | ACTIVE | Grid peek for sliders  |

### 1.3 Product Grid Specific Selectors

| CSS Selector                                            | Defined In                       | Used In                              | Status | Notes                        |
| ------------------------------------------------------- | -------------------------------- | ------------------------------------ | ------ | ---------------------------- |
| `body.template-collection .product-grid`                | `assets/custom.css` (line 6721+) | Collection pages                     | ACTIVE | Collection page product grid |
| `body.template-search .product-grid`                    | `assets/custom.css` (line 6722+) | Search pages                         | ACTIVE | Search page product grid     |
| `body.template-product .related-products .product-grid` | `assets/custom.css` (line 6862+) | Product pages                        | ACTIVE | Related products grid        |
| `.template-collection #product-grid.product-grid.grid`  | `assets/custom.css` (line 7148+) | Collection pages                     | ACTIVE | Specific ID selector         |
| `.section-product-grid-trust .tno-collection-grid`      | `assets/custom.css` (line 8509+) | `sections/product-grid-trust.liquid` | ACTIVE | Section-scoped grid override |

---

## 2. Product Card Components

### 2.1 Card Snippet

| Component              | File                           | Used In           | Status | Notes                                |
| ---------------------- | ------------------------------ | ----------------- | ------ | ------------------------------------ |
| `card-product`         | `snippets/card-product.liquid` | All product grids | ACTIVE | **CANONICAL** product card component |
| `.tno-card-product`    | `snippets/card-product.liquid` | All product grids | ACTIVE | TNO card wrapper class               |
| `.card-product--trust` | `snippets/card-product.liquid` | TNO sections      | ACTIVE | Trust-style card variant             |
| `.card`                | `assets/component-card.css`    | All cards         | ACTIVE | Base card class                      |
| `.card--product`       | `assets/component-card.css`    | Product cards     | ACTIVE | Product card modifier                |

### 2.2 Card Styling Locations

| File                                 | Purpose                                               | Status |
| ------------------------------------ | ----------------------------------------------------- | ------ |
| `assets/component-card.css`          | Base card styles (grid layout for card content)       | ACTIVE |
| `assets/custom.css`                  | Product grid card overrides, TNO-specific card styles | ACTIVE |
| `sections/product-grid-trust.liquid` | Inline styles for product-grid-trust section          | ACTIVE |

---

## 3. JavaScript Files Handling Grids/Sliders

### 3.1 Grid-Related JS Functions

| File               | Function/Feature                              | Status | Notes                                        |
| ------------------ | --------------------------------------------- | ------ | -------------------------------------------- |
| `assets/custom.js` | `initTnoRelatedProductsCarousel()` (line 363) | ACTIVE | Related products 2-col swipe carousel        |
| `assets/custom.js` | `initTnoHomeProductGridCarousel()` (line 424) | LEGACY | **DISABLED** - Home grid carousel (line 714) |
| `assets/global.js` | Grid item detection (line 1318)               | ACTIVE | Checks for `.grid__item` elements            |
| `assets/facets.js` | Grid updates on filter changes                | ACTIVE | Updates product grid via AJAX                |

### 3.2 Slider Components

| Component          | File                          | Used In                               | Status |
| ------------------ | ----------------------------- | ------------------------------------- | ------ |
| `slider-component` | `assets/component-slider.css` | `sections/featured-collection.liquid` | ACTIVE |
| `.slider`          | `assets/component-slider.css` | Multiple sections                     | ACTIVE |
| `.slider--tablet`  | `assets/component-slider.css` | Collection/product grids              | ACTIVE |
| `.slider--desktop` | `assets/component-slider.css` | Desktop sliders                       | ACTIVE |

---

## 4. Grid Usage by Section/Template

### 4.1 Collection Pages

| Section/Template                               | Grid Class Used                     | Card Component               | Status |
| ---------------------------------------------- | ----------------------------------- | ---------------------------- | ------ |
| `sections/main-collection-product-grid.liquid` | `.tno-collection-grid`              | `card-product` (trust style) | ACTIVE |
| `templates/collection.json`                    | Uses `main-collection-product-grid` | `card-product`               | ACTIVE |

### 4.2 Product Pages

| Section                            | Grid Class Used                | Card Component               | Status |
| ---------------------------------- | ------------------------------ | ---------------------------- | ------ |
| `sections/related-products.liquid` | `.tno-related-products__track` | `card-product` (trust style) | ACTIVE |
| `sections/main-product.liquid`     | `.grid.grid--2-col-tablet`     | N/A (product layout)         | ACTIVE |

### 4.3 Homepage/Featured Sections

| Section                               | Grid Class Used             | Card Component               | Status |
| ------------------------------------- | --------------------------- | ---------------------------- | ------ |
| `sections/product-grid-trust.liquid`  | `.product-grid-trust__grid` | `card-product` (trust style) | ACTIVE |
| `sections/featured-collection.liquid` | `.grid.product-grid`        | `card-product` (standard)    | ACTIVE |

### 4.4 Search Pages

| Section                       | Grid Class Used      | Card Component | Status |
| ----------------------------- | -------------------- | -------------- | ------ |
| `sections/main-search.liquid` | `.grid.product-grid` | `card-product` | ACTIVE |

---

## 5. Duplicate/Conflicting Grid Definitions

### 5.1 Potential Conflicts

| Conflict             | Location 1                       | Location 2                       | Severity | Notes                                        |
| -------------------- | -------------------------------- | -------------------------------- | -------- | -------------------------------------------- |
| Product grid styling | `assets/custom.css` (line 6721+) | `assets/custom.css` (line 7009+) | MEDIUM   | Multiple definitions for same selectors      |
| Collection grid      | `assets/custom.css` (line 7797)  | `assets/custom.css` (line 8226)  | LOW      | `.collection-grid` vs `.tno-collection-grid` |
| Grid item styling    | `assets/base.css`                | `assets/custom.css` (multiple)   | LOW      | Base vs custom overrides                     |

### 5.2 Unused/Legacy Code

| Code                               | Location                         | Status   | Action Needed              |
| ---------------------------------- | -------------------------------- | -------- | -------------------------- |
| `.tno-home-product-grid` styles    | `assets/custom.css` (line 7976+) | LEGACY   | Remove if confirmed unused |
| `initTnoHomeProductGridCarousel()` | `assets/custom.js` (line 424)    | DISABLED | Remove commented code      |
| `.collection-grid`                 | `assets/custom.css` (line 7797)  | LEGACY?  | Verify usage               |

---

## 6. Product Card Consistency Analysis

### 6.1 Card Rendering Contexts

| Context             | Card Style                | Variants Shown | Add to Cart          | Status |
| ------------------- | ------------------------- | -------------- | -------------------- | ------ |
| Collection page     | `card-product--trust`     | Yes (color)    | Custom button        | ACTIVE |
| Related products    | `card-product--trust`     | Yes (color)    | Custom button        | ACTIVE |
| Product grid trust  | `card-product--trust`     | Yes (color)    | Custom button        | ACTIVE |
| Featured collection | `card-product` (standard) | No             | Quick add (optional) | ACTIVE |
| Search results      | `card-product` (standard) | No             | Quick add (optional) | ACTIVE |

### 6.2 Inconsistencies Found

1. **Card Style Mismatch**: Featured collection and search use standard cards, while collection/related use trust-style
2. **Variant Display**: Only trust-style cards show color variants
3. **Add to Cart**: Trust-style uses custom button, standard uses quick-add

---

## 7. Mobile Grid Behavior

### 7.1 Mobile Grid Layouts

| Section             | Mobile Layout           | Swipe/Carousel  | Status |
| ------------------- | ----------------------- | --------------- | ------ |
| Collection page     | Responsive grid         | No              | ACTIVE |
| Related products    | 2-column swipe          | Yes (custom JS) | ACTIVE |
| Product grid trust  | 2-column grid           | No              | ACTIVE |
| Featured collection | Configurable (1-2 cols) | Optional slider | ACTIVE |

---

## 8. Recommendations

### 8.1 Immediate Actions

1. **Unify Product Cards**: Standardize on `card-product--trust` style across all contexts OR create consistent styling
2. **Remove Legacy Code**: Clean up `.tno-home-product-grid` styles and disabled JS function
3. **Consolidate Grid Classes**: Reduce duplication between `.product-grid` and `.tno-collection-grid`
4. **Verify `.collection-grid`**: Check if this class is actually used anywhere

### 8.2 Refactoring Priorities

1. **High Priority**: Unify product card visual style across all grids
2. **Medium Priority**: Consolidate grid CSS definitions
3. **Low Priority**: Remove unused legacy grid code

---

## 9. Files Requiring Review

### 9.1 CSS Files

- `assets/base.css` - Base grid definitions
- `assets/custom.css` - Most grid overrides and TNO-specific styles
- `assets/component-card.css` - Card component styles
- `assets/component-slider.css` - Slider/carousel styles
- `assets/template-collection.css` - Collection-specific styles

### 9.2 JavaScript Files

- `assets/custom.js` - Grid carousel logic
- `assets/global.js` - Grid item detection
- `assets/facets.js` - Grid updates on filter

### 9.3 Liquid Files

- `snippets/card-product.liquid` - **CANONICAL** product card
- `sections/main-collection-product-grid.liquid` - Collection grid
- `sections/product-grid-trust.liquid` - Trust product grid
- `sections/related-products.liquid` - Related products carousel
- `sections/featured-collection.liquid` - Featured collection slider
- `sections/main-search.liquid` - Search results grid

---

## 10. Step 2: Unused/Duplicate Grid Styles Classification

### 10.1 Classification Table

| Selector                                                | File Defined                             | Used In                                                                                | Status     | Notes                                 |
| ------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------- | ---------- | ------------------------------------- |
| `.grid`                                                 | `assets/base.css:883`                    | Multiple sections                                                                      | **ACTIVE** | Base grid class, core Shopify pattern |
| `.grid__item`                                           | `assets/base.css:902`                    | Multiple sections                                                                      | **ACTIVE** | Grid item wrapper, used everywhere    |
| `.product-grid`                                         | `assets/custom.css:6721+`                | `main-collection-product-grid.liquid`, `main-search.liquid`, `related-products.liquid` | **ACTIVE** | Main product grid container           |
| `.product-grid-container`                               | `assets/custom.css:6702+`                | `main-collection-product-grid.liquid`, `main-search.liquid`                            | **ACTIVE** | Grid wrapper with loading overlay     |
| `.tno-collection-grid`                                  | `assets/custom.css:8226+`                | `main-collection-product-grid.liquid:160`                                              | **ACTIVE** | TNO-specific collection grid          |
| `.tno-collection-grid__item`                            | `assets/custom.css:8235+`                | `main-collection-product-grid.liquid:170`                                              | **ACTIVE** | TNO collection grid item              |
| `.product-grid-trust`                                   | `sections/product-grid-trust.liquid:20`  | `product-grid-trust.liquid:165`                                                        | **ACTIVE** | Section-specific wrapper              |
| `.product-grid-trust__grid`                             | `sections/product-grid-trust.liquid:111` | `product-grid-trust.liquid:183`                                                        | **ACTIVE** | Section-specific grid layout          |
| `.tno-related-products`                                 | `assets/custom.css:8085+`                | `related-products.liquid:34`                                                           | **ACTIVE** | Related products carousel wrapper     |
| `.tno-related-products__track`                          | `assets/custom.css:8085+`                | `related-products.liquid:52`                                                           | **ACTIVE** | Related products track (2-col swipe)  |
| `.tno-related-products__item`                           | `assets/custom.css`                      | `related-products.liquid:59,81`                                                        | **ACTIVE** | Related products item                 |
| `.tno-home-product-grid`                                | `assets/custom.css:7976+`                | **NONE**                                                                               | **LEGACY** | Not used in any Liquid files          |
| `.tno-home-product-grid__track`                         | `assets/custom.css:8021+`                | **NONE**                                                                               | **LEGACY** | Not used in any Liquid files          |
| `.tno-home-product-grid__item`                          | `assets/custom.css:8028+`                | **NONE**                                                                               | **LEGACY** | Not used in any Liquid files          |
| `.tno-home-product-grid__controls`                      | `assets/custom.css:7982+`                | **NONE**                                                                               | **LEGACY** | Not used in any Liquid files          |
| `.tno-home-product-grid__control`                       | `assets/custom.css:7991+`                | **NONE**                                                                               | **LEGACY** | Not used in any Liquid files          |
| `.collection-grid`                                      | `assets/custom.css:7797`                 | **NONE**                                                                               | **LEGACY** | Only in CSS, never used in Liquid     |
| `body.template-collection .collection-grid`             | `assets/custom.css:7797`                 | **NONE**                                                                               | **LEGACY** | Unused selector                       |
| `.grid--1-col` through `.grid--6-col-desktop`           | `assets/base.css`                        | Multiple sections                                                                      | **ACTIVE** | Standard Shopify grid modifiers       |
| `.grid--peek`                                           | `assets/base.css`                        | Slider contexts                                                                        | **ACTIVE** | Grid peek for sliders                 |
| `body.template-collection .product-grid`                | `assets/custom.css:6721+`                | Collection pages                                                                       | **ACTIVE** | Collection page specific styling      |
| `body.template-search .product-grid`                    | `assets/custom.css:6722+`                | Search pages                                                                           | **ACTIVE** | Search page specific styling          |
| `body.template-product .related-products .product-grid` | `assets/custom.css:6862+`                | Product pages                                                                          | **ACTIVE** | Related products grid                 |
| `.section-product-grid-trust .tno-collection-grid`      | `assets/custom.css:8509+`                | `product-grid-trust.liquid`                                                            | **ACTIVE** | Section-scoped override               |

### 10.2 Duplicate Definitions

| Selector                                                | Location 1        | Location 2                 | Type                | Action                             |
| ------------------------------------------------------- | ----------------- | -------------------------- | ------------------- | ---------------------------------- |
| `body.template-collection .product-grid`                | `custom.css:6721` | `custom.css:7009`          | **DUPLICATE**       | Consolidate into single definition |
| `body.template-collection .product-grid .card`          | `custom.css:6727` | `custom.css:7015`          | **DUPLICATE**       | Consolidate into single definition |
| `body.template-collection .product-grid .card__media`   | `custom.css:6740` | `custom.css:7062`          | **DUPLICATE**       | Consolidate into single definition |
| `body.template-collection .product-grid .card__heading` | `custom.css:6788` | `custom.css:7080`          | **DUPLICATE**       | Consolidate into single definition |
| `.tno-collection-grid`                                  | `custom.css:8226` | `custom.css:7887` (scoped) | **SCOPED OVERRIDE** | Keep both (scoped vs global)       |

### 10.3 Legacy Code Summary

**CSS Classes to Remove:**

- `.tno-home-product-grid` and all related classes (lines 7976-8058 in custom.css)
- `.collection-grid` (line 7797 in custom.css)
- `body.template-collection .collection-grid` (line 7797 in custom.css)

**JavaScript Functions to Remove:**

- `initTnoHomeProductGridCarousel()` function (lines 424-477 in custom.js)
- Commented call to `initTnoHomeProductGridCarousel()` (line 714 in custom.js)

**CSS Selectors to Consolidate:**

- Multiple definitions of `body.template-collection .product-grid` and child selectors
- Consider merging duplicate product-grid styling blocks

---

---

## 11. Step 4-7 Implementation Summary

### 11.1 Canonical Product Card Implementation

**Source of Truth:**

- **Snippet:** `snippets/card-product.liquid`
- **Base Styles:** `assets/component-card.css` (base card structure)
- **Trust-Specific Styles:** `assets/custom.css` (TNO dark theme overrides)

**Canonical Render Call:**

```liquid
{% render 'card-product',
  card_product: product,
  card_style: 'trust',
  show_secondary_image: true,
  show_vendor: false,
  show_rating: false,
  show_color_variants: true,
  show_custom_add_to_cart: true,
  lazy_load: true
%}
```

**Sections Using Canonical Trust Style:**

- ✅ `sections/main-collection-product-grid.liquid` - Collection pages
- ✅ `sections/related-products.liquid` - Related products carousel
- ✅ `sections/product-grid-trust.liquid` - Homepage product grid
- ✅ `sections/featured-collection.liquid` - Featured collection (updated)
- ✅ `sections/main-search.liquid` - Search results (updated)

### 11.2 CSS Consolidation (Step 5)

**Removed Duplicates:**

- Consolidated duplicate `body.template-collection .product-grid` blocks (lines 7009-7128)
- Merged visibility fixes into single organized block
- Removed redundant card styling definitions

**CSS Organization:**

- **Grid Layout:** `assets/base.css` - Base grid classes and modifiers
- **Card Structure:** `assets/component-card.css` - Base card component styles
- **Trust Theme:** `assets/custom.css` - TNO-specific dark theme overrides
- **Section-Specific:** Inline styles in section files (minimal, only when necessary)

### 11.3 Slider/Carousel Implementation (Step 6)

**Standard Implementation:**

- **Related Products:** Custom 2-column swipe carousel (`.tno-related-products__track`)
  - Mobile-only (desktop shows static grid)
  - Uses `initTnoRelatedProductsCarousel()` in `assets/custom.js`
  - Scrolls 2 cards per swipe
- **Featured Collection:** Uses native `slider-component` from Shopify
  - Supports both mobile and desktop sliders
  - Uses `component-slider.css` for base styles

**Sections Using Sliders:**

- `sections/related-products.liquid` - Custom 2-col swipe (mobile only)
- `sections/featured-collection.liquid` - Native slider-component
- `sections/product-grid-trust.liquid` - Static responsive grid (no slider)

### 11.4 Final Verification Checklist

- [x] Collection product grid uses trust-style product card with canonical render
- [x] Related products use trust-style product card and 2-col swipe works
- [x] Product-grid-trust section uses the same canonical card and grid spacing
- [x] Featured collection uses the canonical card style (updated to trust-style)
- [x] Search results use the canonical card style (updated to trust-style)
- [x] No duplicate `body.template-collection .product-grid*` blocks remain in `custom.css`
- [x] Legacy `.tno-home-product-grid*` and `.collection-grid` code is removed

### 11.5 Changes Made

**Liquid Files Updated:**

1. `sections/featured-collection.liquid` - Added `card_style: 'trust'`, `show_color_variants: true`, `show_custom_add_to_cart: true`
2. `sections/main-search.liquid` - Added `card_style: 'trust'`, `show_color_variants: true`, `show_custom_add_to_cart: true`

**CSS Files Updated:**

1. `assets/custom.css` - Consolidated duplicate product grid CSS blocks (removed ~120 lines of duplicates)

**JavaScript Files:**

- No changes needed (slider implementations already correct)

---

**Status:** Steps 4-7 Complete ✅
