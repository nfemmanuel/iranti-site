# site-e001 — Epic: Multi-Page Routing

**Type:** Epic
**Status:** Not Started
**Priority:** P0
**Phase:** 2 — Core Build

---

## Problem

The site is currently a single-page application with anchor-based navigation. Nav links point to `#product`, `#proof`, `#integrations`, and `#install` within the homepage. There are no routed sub-pages.

This creates three concrete gaps:

1. There is no URL a visitor can share that takes someone directly to the proof page, the integrations page, or the get-started guide. Every deep-link lands on the top of the homepage.
2. SEO is effectively non-functional for sub-topics. Google cannot crawl a separate `/proof` page because it does not exist.
3. Content depth is bounded by what fits legibly on a single scroll. The homepage is intentionally skimmable — detailed product content, methodology, and integration guides do not belong there.

---

## Value

Multi-page routing unlocks:
- Shareable, crawlable URLs for every major product surface
- Deeper content per page without cluttering the homepage
- Proper SEO metadata per page
- A credible site structure that matches what evaluators expect from serious infrastructure products

---

## Scope

### In Scope
- Next.js App Router pages for `/product`, `/proof`, `/get-started`, `/integrations`
- Shared layout — Nav and Footer on all pages
- Nav links updated to route to pages rather than anchors
- Mobile navigation updated to match
- Each page has a defined content model before build begins

### Out of Scope
- Full docs hosting (remains GitHub-linked)
- Blog or changelog pages (Phase 3 or later)
- Dynamic routing for individual integration docs

---

## Dependencies

- Content models per page must be PM-approved before build (see site-f001 through site-f004)
- Light mode must be functional before pages launch (site-e002) — launching new pages with broken light mode would be a regression
- Comparison narrative content must be ready for /product and /proof pages (site-e003)

---

## Acceptance Criteria

- [ ] `/product` resolves and renders a complete page with defined sections
- [ ] `/proof` resolves and renders a complete page with defined sections
- [ ] `/get-started` resolves and renders a complete page with defined sections
- [ ] `/integrations` resolves and renders a complete page with defined sections
- [ ] Nav links on all pages correctly route to the appropriate page (not anchors)
- [ ] Back button works correctly from all sub-pages
- [ ] Each page has a distinct `<title>` and `<meta name="description">` tag
- [ ] All pages render correctly in both dark and light mode
- [ ] All pages are responsive across mobile, tablet, and desktop
- [ ] Homepage anchor links remain functional for visitors who land on `/`

---

## Risks

- Light mode component refactor (site-e002) is a prerequisite — if that is delayed, new pages will ship with broken light mode
- Content for sub-pages must be written and approved before build; building shells without content leads to placeholder-heavy pages that are worse than nothing
- Nav restructure could introduce regressions on homepage anchor behavior

---

## Open Questions

- Should `/product` and the homepage's `#product` anchor become the same content, or should the homepage retain a shorter summary version with the full version on `/product`?
- Should `/proof` link directly to the benchmark methodology file in the Iranti repo, or house a curated version of that content?
- What is the canonical URL strategy if the site lives on a subdomain vs root domain?

---

## Definition of Done

- All four sub-pages exist, are routed, and are content-complete
- PM has reviewed and accepted each page's content
- All acceptance criteria above are checked
- No regressions on homepage
- SEO metadata per page is present
- Shipped to production domain
