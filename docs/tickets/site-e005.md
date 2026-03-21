# site-e005 — Epic: Launch Readiness (SEO, Accessibility, Performance, Analytics)

**Type:** Epic
**Status:** Not Started
**Priority:** P0 (before production launch)
**Phase:** 4 — Launch Readiness

---

## Problem

The site has no SEO metadata, no accessibility audit, no performance baseline, and no analytics instrumentation. In its current state it cannot be meaningfully launched:

- **SEO:** Every page has an empty `<title>` and no `<meta description>` or OpenGraph tags. The site is invisible to search and unfurls poorly when shared on social or Slack.
- **Accessibility:** Some ARIA labels exist (copy buttons, navigation toggle) but there has been no formal audit. Color contrast in dark mode has not been checked against WCAG AA. Light mode is unimplemented so a11y in light mode is unknown.
- **Performance:** No Lighthouse run exists. Font loading, image optimization, and Core Web Vitals are unvalidated.
- **Analytics:** There is no way to know if visitors are reaching the proof section, clicking the install CTA, or bouncing from the hero. Without analytics, there is no feedback loop for improving the site post-launch.

None of these are cosmetic. They are prerequisites for a credible launch.

---

## Value

- Makes the site discoverable through search
- Ensures the site is usable by visitors using screen readers or keyboard navigation
- Validates that the site loads fast enough to not lose visitors on first impression
- Creates a data feedback loop for the PM to understand visitor behavior and iterate

---

## Scope

### In Scope

**SEO:**
- `<title>` and `<meta name="description">` per page using Next.js Metadata API
- OpenGraph tags per page (`og:title`, `og:description`, `og:image`)
- Twitter/X card tags
- `sitemap.xml` generated and accessible at `/sitemap.xml`
- `robots.txt` with correct allow/disallow rules

**Accessibility:**
- Full keyboard navigation audit — every interactive element must be reachable and operable without a mouse
- ARIA labels on all interactive elements — copy buttons, nav toggle, theme toggle, form fields
- Color contrast audit in both dark and light mode (WCAG AA minimum: 4.5:1 for normal text)
- Focus ring visibility in both modes
- Semantic HTML audit — headings are hierarchical, lists are lists, buttons are buttons

**Performance:**
- Lighthouse audit targeting ≥ 90 on Performance, Accessibility, Best Practices, SEO
- Font optimization — `next/font` or preconnect/preload for Inter and JetBrains Mono
- No render-blocking resources
- Image optimization if any images are added before launch

**Analytics:**
- Decision on analytics provider: PostHog (recommended for self-hosted or cloud, good for product analytics) or Plausible (simpler, privacy-first, no cookie banner needed)
- Analytics script wired and firing on all pages
- Key events tracked: hero CTA clicks (Install, See Proof, GitHub), nav clicks, proof section scroll-in, integrations section scroll-in, contact form submission

### Out of Scope
- A/B testing infrastructure
- User session recording
- Heatmaps

---

## Dependencies

- All pages must exist before SEO metadata can be written per-page (site-e001)
- Light mode must be functional before accessibility audit is valid (site-e002)
- Analytics provider decision must be made by PM

---

## Acceptance Criteria

**SEO:**
- [ ] Every page has a unique `<title>` following the pattern "[Page] — Iranti"
- [ ] Every page has a `<meta name="description">` under 160 characters
- [ ] OpenGraph tags are present and display correctly when URL is shared on Slack or Twitter
- [ ] `sitemap.xml` exists at `/sitemap.xml` and includes all pages
- [ ] `robots.txt` is present and does not block crawling

**Accessibility:**
- [ ] All interactive elements are keyboard-accessible (tab navigation reaches every button, link, and form field)
- [ ] Focus rings are visible in both themes
- [ ] ARIA labels are present on all icon-only buttons
- [ ] Color contrast meets WCAG AA in both dark and light modes (validated with automated tool + manual spot-check)
- [ ] Heading hierarchy is correct on all pages (one h1 per page, logical h2/h3 structure)
- [ ] Axe or similar automated a11y tool reports zero critical or serious violations

**Performance:**
- [ ] Lighthouse Performance score ≥ 90 on desktop
- [ ] Lighthouse Performance score ≥ 80 on mobile
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] Largest Contentful Paint (LCP) < 2.5s on desktop
- [ ] Cumulative Layout Shift (CLS) < 0.1

**Analytics:**
- [ ] Analytics fires on page load across all pages
- [ ] At least three key CTA events are tracked and visible in the analytics dashboard
- [ ] No PII is collected without consent (Plausible avoids this entirely; PostHog requires configuration)

---

## Risks

- Lighthouse performance on mobile may be challenging if fonts are not optimized — JetBrains Mono is a large font
- Color contrast in dark mode for teal-400 on dark backgrounds may be close to WCAG AA limits — needs measurement
- Analytics choice matters: if PostHog is chosen and a cookie banner is required in certain jurisdictions, that adds UI complexity

---

## Open Questions

- PostHog or Plausible? Plausible is simpler and cookie-free; PostHog offers richer product analytics and funnel analysis. What does the PM need?
- What is the production domain? SEO metadata and OpenGraph images need absolute URLs.
- Will there be an OG image per page, or a single shared image?

---

## Definition of Done

- All four criteria categories above are checked off
- Lighthouse report is saved and attached to the launch review
- PM has signed off on analytics events
- Site is ready to be submitted to search consoles (Google, Bing)
- Launch readiness review is complete
