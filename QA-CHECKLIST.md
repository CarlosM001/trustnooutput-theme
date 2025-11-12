# QA Checklist — TRUST.NO.OUTPUT v0.2.0

## Local Verification (5-Min Check)

### Browser Console Tests

#### 1. Server-Side A/B Variant
```javascript
// Open http://localhost:3000 or Shopify Preview
document.documentElement.dataset.abVariant
// Expected: "glitch_pulse" or "glitch_continuous"

document.documentElement.dataset.glitchOverride
// Expected: "auto" (or "pulse"/"continuous" if forced)
```

#### 2. DataLayer Events
```javascript
// Check all tracking events
window.dataLayer
// Expected: Array with tno_variant, tno_reduced_motion events

// Formatted view
console.table(window.dataLayer.filter(e => e.event?.startsWith('tno_')))
```

#### 3. Add-to-Cart Tracking
```javascript
// Before: Navigate to product page
// Action: Click "Add to Cart"
// After:
window.dataLayer.filter(e => e.event === 'tno_atc')
// Expected: [{event: "tno_atc", variant: "glitch_pulse"}]
```

#### 4. Reduced Motion
```
1. OS Setting: Enable "Reduce motion" (Windows: Settings → Accessibility → Visual effects)
2. Reload page
3. Visual Check: No glitch animations visible
4. Console Check:
```
```javascript
window.dataLayer.find(e => e.event === 'tno_reduced_motion')
// Expected: {event: "tno_reduced_motion", value: true}
```

### Visual QA

- [ ] Hero glitch animation respects variant (pulse = periodic bursts, continuous = always on)
- [ ] No layout shifts (CLS < 0.1)
- [ ] Mobile: All interactions work, no horizontal scroll
- [ ] Reduced motion: Static design, soft fade only

---

## ✅ Pass Criteria

- All console commands return expected values
- No JS errors in console
- ATC event fires on every add-to-cart
- Reduced motion disables all animations
- Theme Settings override works (test in Customizer)

---

## 🚨 Rollback Plan

If issues found:
1. Do NOT publish to live
2. Note issue in this file
3. Fix in dev theme
4. Re-run checklist
