# Publish-Ready Checklist — TRUST.NO.OUTPUT

## Pre-Publish Verification

### 🔍 Local Testing
- [ ] Run `npm run dev` → BrowserSync loads without errors
- [ ] Open http://localhost:3000 → page renders correctly
- [ ] Console: `document.documentElement.dataset.abVariant` returns valid variant
- [ ] Console: `window.dataLayer` contains `tno_variant`, `tno_reduced_motion`
- [ ] Add product to cart → `tno_atc` event fires
- [ ] Enable "Reduce motion" → no glitch animations visible
- [ ] Theme Customizer: Change "Glitch Intensity" → preview updates in real-time

### ⚡ Performance
- [ ] Run `npm run lh:report` → Lighthouse HTML report generated
- [ ] Desktop LCP < 2.5s
- [ ] Mobile LCP < 3.5s
- [ ] CLS < 0.1 (no layout shifts)
- [ ] No JavaScript errors in console
- [ ] Images: WebP format, lazy loading (except hero)

### ♿ Accessibility
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] Color contrast: All text passes WCAG AA (4.5:1 minimum)
- [ ] Focus indicators visible on all interactive elements
- [ ] Form labels present and properly associated

### 📱 Mobile Testing
- [ ] Test on real device (iOS Safari + Android Chrome)
- [ ] No horizontal scroll
- [ ] Touch targets ≥ 44×44px
- [ ] Text readable without zoom (min 16px body)
- [ ] Forms: Mobile keyboard shows correct input type

### 🛒 E-Commerce Flow
- [ ] Product page loads correctly
- [ ] Variant picker works (if applicable)
- [ ] Add to cart succeeds
- [ ] Cart drawer/page shows correct items
- [ ] Checkout redirects properly (test mode)
- [ ] Search returns results
- [ ] Filters work (collection pages)

### 📊 Analytics
- [ ] GA4 Measurement ID present in theme.liquid
- [ ] GA4 DebugView shows events: `tno_variant`, `tno_reduced_motion`, `tno_atc`
- [ ] No duplicate events (check dataLayer array)
- [ ] Event parameters correct: `variant` string, `value` boolean

### 🔐 Security & Privacy
- [ ] HTTPS enabled (Shopify default)
- [ ] No hardcoded API keys in theme code
- [ ] Cookie consent banner present (if required for region)
- [ ] Privacy policy linked in footer

### 🎨 Design Consistency
- [ ] Typography: Consistent font sizes across pages
- [ ] Colors: All brand colors use CSS variables
- [ ] Spacing: Consistent margins/padding
- [ ] Icons: Same style/weight throughout
- [ ] Buttons: Consistent styling and hover states

---

## Shopify Admin Checklist

### Theme Settings
- [ ] Logo uploaded and sized correctly
- [ ] Favicon uploaded (32×32px PNG)
- [ ] Color scheme matches brand
- [ ] Typography settings finalized
- [ ] Motion & Visuals: "Glitch Mode Override" set to `auto` (for A/B test)

### Navigation
- [ ] Main menu configured
- [ ] Footer menu configured
- [ ] Mobile menu displays correctly

### Pages
- [ ] Homepage published
- [ ] About/Philosophy page
- [ ] Contact page
- [ ] Shipping/Returns policy
- [ ] Privacy policy
- [ ] Terms of service

### Products
- [ ] At least 3 products published (for testing)
- [ ] Product images optimized (WebP, <200KB)
- [ ] Descriptions complete
- [ ] Prices set
- [ ] Inventory tracked (if applicable)

### Collections
- [ ] At least 1 collection published
- [ ] Collection image set
- [ ] Products assigned to collection

### Blog (Optional)
- [ ] Blog section enabled
- [ ] At least 1 article published (for testing)

---

## Pre-Launch Day-Of

### Backup
- [ ] Duplicate current live theme → "TNO Backup [Date]"
- [ ] Download theme files locally (Actions → Download theme file)
- [ ] Export product CSV (Products → Export)

### Final Smoke Test (15 min)
1. [ ] Homepage loads
2. [ ] Click product → product page loads
3. [ ] Add to cart → cart updates
4. [ ] View cart → items shown
5. [ ] Proceed to checkout → redirects correctly (don't complete)
6. [ ] Back to shop → navigation works
7. [ ] Search for product → results shown
8. [ ] Mobile: Repeat steps 1-5

### Soft Launch (30-60 min)
- [ ] Publish new theme
- [ ] Monitor for 30 minutes:
  - [ ] Check real-time GA4 for traffic
  - [ ] No JS errors in browser console
  - [ ] No 404s in Shopify Analytics → Online Store → Pages
  - [ ] Test 1 real purchase (test mode or small item)

### Rollback Plan
**If critical issue found:**
1. Shopify Admin → Online Store → Themes
2. Find previous live theme → Actions → Publish
3. New theme auto-unpublishes
4. Investigate issue in unpublished theme
5. Fix → Re-test → Re-publish

---

## Post-Launch (Week 1)

### Day 1
- [ ] Monitor GA4 real-time for first 2-4 hours
- [ ] Check Shopify Analytics → Conversions
- [ ] Review any customer support tickets
- [ ] Test checkout flow with real payment (refund after)

### Day 2-7
- [ ] Daily check: GA4 → Events → `tno_atc` count
- [ ] Compare conversion rate vs. previous week
- [ ] Review any bug reports
- [ ] Monitor page speed (Lighthouse weekly)

### Week 2
- [ ] Analyze A/B test results:
  - Segment by `variant` (pulse vs. continuous)
  - Compare ATC rates, bounce rates, time-on-site
- [ ] Decide: Keep 50/50 or force winning variant
- [ ] Plan Phase 2 features based on data

---

## Emergency Contacts

- **Shopify Support:** help.shopify.com (live chat)
- **Payment Provider:** [Your provider's support URL]
- **Hosting/CDN:** Shopify (built-in, no action needed)
- **Theme Developer:** [Your contact or agency]

---

## Sign-Off

- [ ] All checklist items completed
- [ ] Backup created
- [ ] Rollback plan understood
- [ ] Launch scheduled: __________
- [ ] Approved by: __________

**Ready to publish?** 🚀
