# GA4 Custom Dimensions Setup Guide

## Overview

This theme tracks 3 custom events that should be registered as Custom Dimensions in GA4 for proper segmentation and analysis.

---

## Events Tracked

### 1. `tno_variant` - A/B Test Assignment

**Purpose:** Track which glitch mode variant a user sees (pulse vs. continuous)

**Payload:**

```javascript
{
  event: 'tno_variant',
  variant: 'glitch_pulse' | 'glitch_continuous'
}
```

**Use Cases:**

- Segment conversion rates by variant
- Compare bounce rates between pulse/continuous modes
- Analyze time-on-site by variant

---

### 2. `tno_reduced_motion` - Accessibility Preference

**Purpose:** Track users who prefer reduced motion (accessibility)

**Payload:**

```javascript
{
  event: 'tno_reduced_motion',
  value: true | false
}
```

**Use Cases:**

- Measure accessibility adoption
- Ensure UX quality for reduced-motion users
- Identify correlation between accessibility needs and conversion

---

### 3. `tno_atc` - Add-to-Cart with Variant

**Purpose:** Track conversions (ATC) correlated with A/B variant

**Payload:**

```javascript
{
  event: 'tno_atc',
  variant: 'glitch_pulse' | 'glitch_continuous'
}
```

**Use Cases:**

- Primary A/B test success metric
- Compare ATC rates between variants
- Funnel analysis: variant assignment → ATC → checkout

---

## GA4 Setup Instructions

### Step 1: Create Custom Dimensions

1. **Go to GA4 Admin Panel**
   - Property → Data display → Custom definitions

2. **Create User-Scoped Dimension: "Glitch Variant"**
   - Dimension name: `Glitch Variant`
   - Scope: `User`
   - Description: `A/B test variant (pulse vs continuous glitch mode)`
   - Event parameter: `variant`
   - Click **Save**

3. **Create User-Scoped Dimension: "Reduced Motion"**
   - Dimension name: `Reduced Motion`
   - Scope: `User`
   - Description: `User prefers reduced motion (accessibility)`
   - Event parameter: `value`
   - Click **Save**

### Step 2: Create Custom Events (Optional)

If you want separate event tracking:

1. **Go to Events**
   - Property → Events → Create event

2. **Create "add_to_cart_variant" Event**
   - Event name: `add_to_cart_variant`
   - Matching conditions:
     - `event_name` equals `tno_atc`
   - Parameter modifications:
     - Add parameter: `variant` (copy from `variant`)
   - Click **Create**

### Step 3: Create Explorations

#### A/B Test Performance Report

1. **Go to Explore**
2. **Create Free Form Report**
3. **Dimensions:**
   - Add: `Glitch Variant`
   - Add: `Event name`
4. **Metrics:**
   - Add: `Event count`
   - Add: `Conversions`
   - Add: `Total revenue`
5. **Filters:**
   - Include: `Event name` contains `tno_atc`
6. **Save as:** "Glitch A/B Test Performance"

---

## Validation

### Real-Time Debugging

1. **Open GA4 DebugView**
   - Admin → DebugView (or Install GA4 Debugger Chrome Extension)

2. **Browse your Shopify store**
   - Page load → Check for `tno_variant` and `tno_reduced_motion`
   - Add to cart → Check for `tno_atc` with `variant` parameter

3. **Expected Events:**
   ```
   tno_variant {variant: "glitch_pulse"}
   tno_reduced_motion {value: false}
   page_view {...}
   [user adds to cart]
   tno_atc {variant: "glitch_pulse"}
   ```

### Console Validation

```javascript
// Check dataLayer (before GA4 processes)
window.dataLayer.filter((e) => e.event?.startsWith('tno_'))[
  // Expected:
  ({ event: 'tno_variant', variant: 'glitch_pulse' },
  { event: 'tno_reduced_motion', value: false },
  { event: 'tno_atc', variant: 'glitch_pulse' })
];
```

---

## Analysis Queries

### Conversion Rate by Variant (GA4 SQL)

```sql
SELECT
  custom_dimension.variant AS variant,
  COUNT(DISTINCT user_pseudo_id) AS users,
  SUM(IF(event_name = 'tno_atc', 1, 0)) AS add_to_carts,
  SAFE_DIVIDE(
    SUM(IF(event_name = 'tno_atc', 1, 0)),
    COUNT(DISTINCT user_pseudo_id)
  ) AS atc_rate
FROM
  `your_project.analytics_XXXXX.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name IN ('tno_variant', 'tno_atc')
GROUP BY
  variant
ORDER BY
  atc_rate DESC
```

### Reduced Motion Adoption

```sql
SELECT
  custom_dimension.value AS prefers_reduced_motion,
  COUNT(DISTINCT user_pseudo_id) AS users,
  ROUND(COUNT(DISTINCT user_pseudo_id) * 100.0 / SUM(COUNT(DISTINCT user_pseudo_id)) OVER(), 2) AS percentage
FROM
  `your_project.analytics_XXXXX.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name = 'tno_reduced_motion'
GROUP BY
  prefers_reduced_motion
```

---

## Privacy & Consent

### GDPR/CCPA Compliance

If you collect analytics data in EU/CA:

1. **Delay dataLayer pushes until consent**
   - Wrap tracking in consent check:
     ```javascript
     if (window.TNO.consentGiven) {
       window.dataLayer.push(event);
     }
     ```

2. **Use Shopify's Customer Privacy API**
   - [Shopify Privacy Docs](https://shopify.dev/docs/api/customer-privacy)

3. **Cookie banner integration**
   - Popular: Cookiebot, OneTrust, Osano

---

## Troubleshooting

### Events not showing in GA4

1. **Check GA4 Measurement ID**
   - Verify `gtag('config', 'G-XXXXXXX')` is present in theme.liquid

2. **Check dataLayer before GA4 loads**

   ```javascript
   console.log(window.dataLayer);
   // Should contain tno_* events before gtag.js processes them
   ```

3. **Ad blockers**
   - Disable uBlock Origin / Privacy Badger
   - Test in Incognito mode

### Variant not showing in reports

- **Wait 24-48h** for custom dimensions to populate
- Check "Custom definitions" → "Glitch Variant" shows recent values
- Ensure event parameter name matches exactly: `variant` (lowercase)

---

## Contact

For GA4 setup issues:

- Check Shopify Community: [community.shopify.com](https://community.shopify.com)
- GA4 Help Center: [support.google.com/analytics](https://support.google.com/analytics)
