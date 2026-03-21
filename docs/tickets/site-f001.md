# site-f001 — Feature: /product Page

**Type:** Feature
**Status:** Not Started
**Priority:** P0
**Epic:** site-e001 (Multi-Page Routing)
**Phase:** 2 — Core Build

---

## Problem

There is no dedicated product page. The homepage's `#product` section (WhyNotVectorDB) covers the vector DB comparison but does not provide a full product overview. A visitor who wants to understand Iranti's architecture, The Staff system, use cases, and differentiated positioning cannot get all of that on one clean page — they have to scroll a long homepage and piece it together.

---

## Value

- Gives evaluators a single URL to understand the full product
- Allows deeper architecture and use-case content that would clutter the homepage
- Makes comparison content easier to expand (memory libraries, agent frameworks)
- Becomes the shareable "what is Iranti" URL for the team

---

## Scope

### Sections to Include
1. **Hero / positioning statement** — Category claim, one-paragraph product description, primary CTA to Get Started
2. **The problem in detail** — Why multi-agent systems need shared persistent memory; the failures of in-context storage, framework-bundled memory, and nearest-neighbor retrieval
3. **How it works** — The Staff system explained (Library, Librarian, Attendant, Archivist, Resolutionist) with the write and read flow diagrams from TheStaff.tsx as a starting point
4. **Why Iranti** — Expanded comparison narrative: vector DBs, memory libraries, agent frameworks. Uses content from `docs/comparison-narrative.md`.
5. **Use cases** — Multi-agent research pipelines, coding assistants with cross-session memory, long-running automation workflows
6. **CTA block** — Get Started, See Proof, GitHub

### Out of Scope for This Feature
- Full benchmark methodology (belongs on /proof)
- Integration-specific setup guides (belongs on /integrations or /get-started)

---

## Dependencies

- `docs/comparison-narrative.md` — content source for comparison sections
- site-e001 — routing must be wired
- site-e002 — light mode must be functional
- PM approval on content outline before build

---

## Acceptance Criteria

- [ ] `/product` resolves and renders without errors
- [ ] Page includes a clear positioning statement above the fold
- [ ] The Staff system is explained with all five components described accurately per `AGENTS.md`
- [ ] At least two comparison narratives are present (vector DB + one of: memory libraries or agent frameworks)
- [ ] All factual claims are accurate against `AGENTS.md` and upstream README
- [ ] Page has a distinct `<title>` and `<meta description>`
- [ ] Page renders correctly in both dark and light mode
- [ ] Page is responsive on mobile, tablet, and desktop
- [ ] At least one CTA is above the fold

---

## Risks

- Page can become too long and unfocused if all comparison content is included here — prioritize vector DB + memory libraries, defer agent frameworks to site-e003 follow-on
- Architecture diagrams from TheStaff.tsx are text-based ASCII art; a real diagram may be more legible at page width

---

## Open Questions

- Does the `#product` anchor on the homepage continue to point to the WhyNotVectorDB section, or redirect to `/product`?
- Should this page house all three comparison narratives (vector DB, memory libs, agent frameworks) or link to a dedicated `/compare` path?

---

## Definition of Done

- Page is live at `/product`
- Content is PM-approved
- All acceptance criteria are checked
- Page is included in `sitemap.xml`
