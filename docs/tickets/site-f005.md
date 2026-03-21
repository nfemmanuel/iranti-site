# site-f005 — Feature: Theme Toggle and Light Mode CSS Refactor

**Type:** Feature
**Status:** Not Started
**Priority:** P0
**Epic:** site-e002 (Light Mode and Theme System)
**Phase:** 1 — Brand and Architecture

---

## Problem

Two specific engineering tasks must be completed for light mode to work:

1. **ThemeToggle not wired to Nav** — `ThemeToggle.tsx` exists with correct logic but is not imported into `Nav.tsx`. There is currently no way for a visitor to toggle the theme.
2. **Components use hardcoded hex values** — All component JSX uses hardcoded dark hex values (e.g. `text-[#f5f5f2]`, `bg-[#111110]`, `border-[#1c1c1a]`). Semantic CSS variables are defined in `globals.css` but not used. When `data-theme="light"` is set, the components do not respond.

---

## Value

- Unblocks light mode — one of two first-class PRD requirements for visual direction
- Eliminates the maintenance burden of hardcoded color values across all components

---

## Scope

### In Scope

**Part 1 — Wire ThemeToggle into Nav:**
- Import `ThemeToggle` into `Nav.tsx`
- Position in the desktop header between nav links and the GitHub CTA
- Also expose in the mobile menu
- Verify SSR hydration behavior (ThemeToggle already has a mounted guard — verify it integrates without flash)

**Part 2 — Component CSS token refactor:**

Replace hardcoded dark hex values with semantic CSS variables across all components. Mapping reference:

| Hardcoded value | Semantic token |
|---|---|
| `#f5f5f2` (primary text) | `var(--text-primary)` |
| `#d8d8d2` (code text, secondary headings) | `var(--text-code)` |
| `#8a8a85` (secondary text) | `var(--text-secondary)` |
| `#5c5c58` (muted text) | `var(--text-muted)` |
| `#3d3d3a` (faint text, monospace labels) | `var(--text-faint)` |
| `#111110` (surface background) | `var(--bg-surface)` |
| `#0d0d0b` (code block background) | `var(--bg-code)` |
| `#1c1c1a` (subtle border) | `var(--border-subtle)` |
| `#2a2a28` (light border) | `var(--border-light)` |
| `#080808` (base background) | `var(--bg-base)` |

Accent colors (amber and teal) should remain as Tailwind color classes — they adapt per-mode in the design without token changes.

Components to refactor:
- `Hero.tsx`
- `Nav.tsx`
- `WhyNotVectorDB.tsx`
- `TheStaff.tsx`
- `Proof.tsx`
- `Integrations.tsx`
- `Install.tsx`
- `Footer.tsx`

**Part 3 — Light mode validation:**
- After refactor, switch to light mode and do a visual pass on each component
- Check that amber accents are legible against the sand light background
- Check that teal accents are legible
- Check that code blocks and monospace elements render correctly

### Out of Scope
- Changing the token palette values
- Adding new semantic tokens beyond those already defined

---

## Dependencies

- No blockers — `ThemeToggle.tsx` and `globals.css` are already in place

---

## Acceptance Criteria

- [ ] `ThemeToggle` is rendered in the Nav desktop header and mobile menu
- [ ] Clicking the toggle switches `data-theme` on `<html>` and persists to `localStorage`
- [ ] All components listed above use semantic tokens, not hardcoded hex values, for background, text, and border colors
- [ ] Light mode visual pass: all sections are readable with no invisible text or borders
- [ ] Dark mode regression check: all sections render correctly in dark mode after the refactor
- [ ] No SSR hydration warning in the console after Nav integration

---

## Risks

- The refactor touches every component file — risk of introducing layout regressions via incorrect token mappings. Review each component in both modes after change.
- `bg-[#080808]/90` (the 90% opacity scrolled nav background) does not map cleanly to a CSS variable + Tailwind opacity modifier. May need a one-off approach for this specific case.
- The amber button text color (`text-[#080808]`) on amber background is a fixed color for legibility, not a theme-adaptive color — this should remain hardcoded.

---

## Open Questions

- Should the ThemeToggle be placed before or after the GitHub link in the desktop nav?
- Should `bg-[#080808]/90` in the Nav scroll state use a CSS variable with a baked-in opacity, or remain as a special case?

---

## Definition of Done

- ThemeToggle is accessible from the Nav on all pages
- All components refactored to semantic tokens
- Visual validation in both modes is complete with no regressions
- PM has reviewed light mode and approved
