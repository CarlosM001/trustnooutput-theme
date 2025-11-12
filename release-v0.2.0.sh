# Git Release Script - v0.2.0

# Stage all changes
git add .

# Commit with conventional commit format
git commit -m "feat(tno): server-side A/B, GA4 events, ATC tracking, CSS var UI + QA passed

BREAKING CHANGES:
- A/B bucketing moved from client-side (localStorage) to server-side (Liquid)
- data-ab-variant attribute now set on HTML element at render time

Features:
- Server-side A/B testing (50/50 split: glitch_pulse vs glitch_continuous)
- GA4 dataLayer integration (tno_variant, tno_reduced_motion, tno_atc events)
- Add-to-cart conversion tracking with variant correlation
- CSS variables live preview in Theme Customizer
- IntersectionObserver-based glitch activation (performance)
- Complete prefers-reduced-motion fallback

Performance:
- LCP < 2.5s maintained
- CLS < 0.1 (no layout shifts)
- Lighthouse audit script added (npm run lh:report)

Developer Experience:
- VS Code tasks for Getting Started, QA, Live Theme
- Chrome debugging configs (BrowserSync + Shopify dev)
- QA checklist and changelog added
- All hygiene checks passing (Prettier, ESLint, Stylelint)

Docs:
- QA-CHECKLIST.md with browser console tests
- CHANGELOG.md with versioned release notes
- Updated README with debugging instructions"

# Create annotated tag
git tag -a v0.2.0 -m "Phase 1 Complete: Foundation + Tracking

Server-side A/B testing, GA4 analytics, conversion tracking, and live CSS variable preview.
Performance optimized (<2.5s LCP, <0.1 CLS). Full accessibility support with reduced-motion fallback.

Key Features:
- Server-side Liquid bucketing (SEO-safe)
- GA4 dataLayer integration
- Add-to-cart tracking with variant correlation
- IntersectionObserver glitch activation
- Live Theme Customizer preview

See CHANGELOG.md for full details."

# Push commit and tag
git push origin main
git push origin v0.2.0

# Display summary
echo "✅ Release v0.2.0 pushed successfully"
echo "📦 Tag: https://github.com/CarlosM001/trustnooutput-theme/releases/tag/v0.2.0"
echo "📋 Next: Create GitHub Release with CHANGELOG excerpt"
