# Roadmap

---

## Phase 0 — Product Foundation
**Status: COMPLETE**

Every item below was completed before the first line of homepage code was written.

- [x] PRD finalized (`docs/prd/site-prd.md`)
- [x] Sitemap defined — eight primary pages identified
- [x] Page inventory produced
- [x] Message hierarchy defined — category statement, objections, proof framing, open-source narrative
- [x] Visual direction defined — ink + amber + teal palette, Inter + JetBrains Mono, dark-mode-first
- [x] Trust and proof strategy defined — real numbers only, honest scope box, limitations visible

**Definition of done:** PRD exists, is PM-accepted, and has been used as the brief for Phase 1 and Phase 2 work.

---

## Phase 1 — Brand and Architecture
**Status: IN PROGRESS**

### Done
- [x] Homepage IA — all anchor sections defined and implemented (#product, #proof, #integrations, #install)
- [x] Dark mode design system — full ink palette, amber accent, teal accent, semantic CSS variables in `globals.css`
- [x] Typography system — Inter (sans) and JetBrains Mono (mono) wired as Tailwind theme tokens
- [x] CTA architecture for homepage — three-tier: Install (primary), See Proof (secondary), GitHub (tertiary)
- [x] Visual direction validated through implemented components

### Still Missing
- [ ] Light mode design system — CSS tokens exist in `globals.css` but no component uses `var(--text-primary)` etc.; all components are hardcoded to dark hex values. Light mode will not work until components are refactored to semantic tokens.
- [ ] Theme toggle wired to Nav — `ThemeToggle.tsx` exists but is not imported into `Nav.tsx`
- [ ] Multi-page routing architecture — currently a single-page SPA with anchor links; `/product`, `/proof`, `/get-started`, `/integrations` pages are unbuilt
- [ ] Page-level content model for sub-pages
- [ ] Motion principles documented

**Definition of done:** Light mode works without visual breakage. Theme toggle is accessible from Nav. Multi-page routing decision is made and documented. Each page has a defined content model.

---

## Phase 2 — Core Build
**Status: IN PROGRESS**

### Done
- [x] Homepage — all required sections implemented: Hero, WhyNotVectorDB, TheStaff, Proof, Integrations, Install, Footer
- [x] Nav with mobile menu and scroll-aware background
- [x] Footer with full link grid (GitHub, docs, packages, community)
- [x] Vector DB comparison section on homepage

### Needs Build
- [ ] `/product` page — full product overview, architecture deep dive, use case narrative
- [ ] `/proof` page — expanded proof surface, methodology links, benchmark deep-dive
- [ ] `/get-started` page — isolated vs shared mode, PostgreSQL/Docker guidance, integration routing
- [ ] `/integrations` page — full per-integration docs gateway
- [ ] Comparison narrative sections — memory libraries and agent frameworks (site only covers vector DBs today)
- [ ] Contact / waitlist surface

**Definition of done:** All five primary pages are implemented, routed, and render correctly in both light and dark mode. Each page has a clear CTA and routes to the correct next action.

---

## Phase 3 — Conversion and Polish
**Status: PENDING**

- [ ] Contact or waitlist flow — form or email capture, honest "we will follow up" framing
- [ ] Analytics instrumentation — PostHog or Plausible decision made and implemented
- [ ] Motion principles applied — scroll-triggered reveals, purposeful transitions
- [ ] Comparison pages — memory library and agent framework comparisons expanded to dedicated sections or pages
- [ ] Changelog / release surface — surface CHANGELOG.md or a curated version on site

**Definition of done:** Conversion surface exists and is reachable from at least three pages. Analytics fires on page load and key CTA clicks. Site has no jarring static transitions on entry.

---

## Phase 4 — Launch Readiness
**Status: PENDING**

- [ ] SEO metadata — `<title>`, `<meta description>`, OpenGraph per page
- [ ] Structured data — JSON-LD for product/software application where appropriate
- [ ] Accessibility audit — keyboard navigation, ARIA labels, color contrast (WCAG AA minimum)
- [ ] Performance audit — Core Web Vitals pass, images optimized, fonts not render-blocking
- [ ] Final content accuracy pass — all claims re-verified against upstream Iranti repo state
- [ ] Cross-browser and responsive QA — mobile, tablet, desktop; Chrome, Firefox, Safari
- [ ] Launch readiness review with PM sign-off

**Definition of done:** Lighthouse scores ≥ 90 on performance and accessibility. All pages have valid SEO metadata. PM has signed off on content accuracy. Site is deployable to production domain.
