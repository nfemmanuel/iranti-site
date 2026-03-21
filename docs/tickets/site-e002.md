# site-e002 — Epic: Light Mode and Theme System

**Type:** Epic
**Status:** Not Started
**Priority:** P0
**Phase:** 1 — Brand and Architecture (in progress)

---

## Problem

Light mode CSS tokens are defined in `globals.css` under `[data-theme="light"]`. `ThemeToggle.tsx` exists and correctly reads/writes `localStorage` and `document.documentElement.setAttribute("data-theme", ...)`. However:

1. **Every component uses hardcoded dark hex values** (e.g. `text-[#f5f5f2]`, `bg-[#111110]`, `border-[#1c1c1a]`) rather than semantic CSS variables (`var(--text-primary)`, `var(--bg-surface)`, `var(--border-subtle)`). When the theme switches to light, the components do not respond — they remain dark.
2. **ThemeToggle is not wired to Nav.** The toggle component exists but is never imported or rendered. There is currently no way for a user to switch themes.
3. **Light mode design quality is untested.** The token values exist but have never been validated against actual component layouts, contrast ratios, or the amber/teal accent palette on a light background.

The PRD explicitly requires both light and dark modes as first-class requirements.

---

## Value

- Fulfills the PRD's explicit requirement for both light and dark modes
- Expands the audience — a meaningful portion of developers prefer light mode
- Demonstrates visual maturity and intentionality
- Correct semantic token usage will make future design changes (reskin, rebrand) significantly cheaper

---

## Scope

### In Scope
- Refactor all components from hardcoded dark hex values to semantic CSS variables
- Import `ThemeToggle` into `Nav.tsx` and position it appropriately in the header
- Validate light mode visually across all components: Hero, Nav, WhyNotVectorDB, TheStaff, Proof, Integrations, Install, Footer
- Validate amber and teal accents render legibly against the light background palette
- Validate code blocks and monospace elements in light mode
- Validate focus states and hover states in light mode

### Out of Scope
- Changing the token palette values themselves (those are set)
- System-preference auto-detection (`prefers-color-scheme`) — the toggle is explicit, not automatic, by design
- Adding new color tokens

---

## Dependencies

- No blockers — this can start immediately
- Should be done before any new sub-pages are built (site-e001) to avoid compounding the refactor across more files

---

## Acceptance Criteria

- [ ] `ThemeToggle` is rendered in `Nav.tsx` and is accessible on desktop and mobile viewports
- [ ] Clicking the toggle switches the site between dark and light mode without a full page reload
- [ ] Theme preference persists across page refreshes via `localStorage`
- [ ] All components render correctly in light mode: no invisible text, no invisible borders, no unreadable code blocks
- [ ] Amber (`#f59e0b`) and teal (`#14b8a6`) accents are legible against the light background
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text) in both modes
- [ ] No component references hardcoded dark hex colors that do not adapt to light mode
- [ ] SSR hydration warning is absent (ThemeToggle already handles this correctly; verify no regressions after Nav integration)

---

## Risks

- The component refactor is broad — every component file will be touched. Risk of introducing layout regressions during the hex-to-token substitution.
- Amber on a sand/warm-light background needs careful contrast validation. A pure amber (`#f59e0b`) button on `#f8f6f1` sand may not meet contrast minimums.
- ThemeToggle placement in Nav needs to fit the existing layout without pushing the CTA buttons off-screen on medium viewports.

---

## Open Questions

- Should amber CTA buttons use a darker amber variant in light mode for contrast, or is the existing `#f59e0b` sufficient on the light base?
- Where exactly in the Nav should the ThemeToggle be placed — between the nav links and the GitHub CTA, or to the right of the GitHub CTA?
- Should the mobile menu also expose the theme toggle?

---

## Definition of Done

- ThemeToggle is accessible from all pages
- All components render without visual breakage in both themes
- WCAG AA contrast passes in both modes (validated with a contrast tool, not just eyeballed)
- PM has reviewed light mode and approved it
- No open regressions in dark mode after the refactor
