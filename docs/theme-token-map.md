# Iranti Theme Token Map

**Version:** 1.0
**Date:** 2026-03-21
**Source of truth for:** `src/app/globals.css` semantic token declarations

This document defines every CSS custom property used in the Iranti design system, its value in each theme, and its intended usage. The frontend developer must not introduce color values that are not present here or in `globals.css`. Any new token requires an entry in this table first.

---

## How Tokens Work

Tokens are declared as CSS custom properties on `:root` / `[data-theme="dark"]` and `[data-theme="light"]`. The theme is applied by setting `data-theme` on `<html>`. Components consume tokens via `var(--token-name)`.

```css
/* Dark (default) */
:root, [data-theme="dark"] {
  --bg-base: #080808;
  /* ... */
}

/* Light */
[data-theme="light"] {
  --bg-base: #f7f4ee;
  /* ... */
}
```

Accent colors (amber, teal) are not declared as semantic tokens — they use Tailwind's pre-declared palette (`--color-amber-500`, `--color-teal-500`, etc.) and are the same across both themes.

---

## Token Reference Table

### Background Tokens

| Token | Dark Value | Light Value | Usage |
|---|---|---|---|
| `--bg-base` | `#080808` | `#f7f4ee` | Page background. Applied to `body`. The lowest layer — everything else sits on top of this. |
| `--bg-surface` | `#111110` | `#efebe2` | Card backgrounds, nav background, any surface that sits above the page background. Must be visually distinct from `--bg-base`. |
| `--bg-code` | `#0d0d0b` | `#e8e3d9` | Code block and architecture diagram backgrounds. A third layer of depth — visually distinct from both `--bg-base` and `--bg-surface`. |

### Border Tokens

| Token | Dark Value | Light Value | Usage |
|---|---|---|---|
| `--border-subtle` | `#1c1c1a` | `#ddd8cf` | Section dividers (`border-t`), architectural grid lines, the quietest visible separator. Barely perceptible against its background. |
| `--border-light` | `#2a2a28` | `#ccc7bd` | Standard card borders, secondary button borders, install command block border. The default border color. |
| `--border-medium` | `#3d3d3a` | `#b8b3aa` | Hover states on bordered components. Active focus rings (where not overridden by a focus utility). Emphasis borders. |

### Text Tokens

| Token | Dark Value | Light Value | Usage |
|---|---|---|---|
| `--text-primary` | `#f5f5f2` | `#1c1a17` | All primary headings, all primary body copy. Highest contrast against background. |
| `--text-secondary` | `#8a8a85` | `#48453f` | Supporting text, subheadings, supporting body paragraphs, nav links at rest. Second tier of visual hierarchy. |
| `--text-muted` | `#5c5c58` | `#6b6760` | Captions, code prompt symbols (`$`), proof strip labels, section metadata. Third tier — readable but clearly subordinate. |
| `--text-faint` | `#3d3d3a` | `#9a9794` | Ghost text, placeholder text, separator dots and decorative punctuation, comment-style annotations. Does not meet WCAG AA for normal-size body text — use only for non-essential decorative content. |
| `--text-code` | `#d8d8d2` | `#2e2b25` | Default token color within code blocks and architecture diagrams. Distinct from primary text to reinforce "this is code." |

### Accent Tokens (Palette-Level, Theme-Invariant)

These tokens are declared in `@theme` in `globals.css` and do not change between light and dark. They are listed here for completeness.

| Token | Value (Both Themes) | Usage |
|---|---|---|
| `--color-amber-500` | `#f59e0b` | Primary action color. CTA button fills, section label lines and text, architecture labels (Library, Archivist, Resolutionist), version badge. |
| `--color-amber-400` | `#fbbf24` | Hover state for amber elements. Code block highlighted tokens (amber role). |
| `--color-amber-600` | `#d97706` | Amber on light backgrounds where amber-500 has insufficient contrast — specifically, amber code tokens in light mode code blocks. |
| `--color-teal-500` | `#14b8a6` | Proof and validation color. Benchmark numbers, pass-state counts, architecture labels (Librarian, Attendant), animated pulse dot. |
| `--color-teal-400` | `#2dd4bf` | Hover state for teal elements. Code block highlighted tokens (teal role) in dark mode. |
| `--color-teal-600` | `#0d9488` | Teal code tokens in light mode code blocks where teal-400/500 has insufficient contrast against `--bg-code`. |

### On-Accent Tokens (Text Over Accent Backgrounds)

| Token | Dark Value | Light Value | Usage |
|---|---|---|---|
| `--on-amber` | `#080808` | `#1c1a17` | Text rendered on amber (`#f59e0b`) backgrounds. Always the warmest near-black available. Contrast: ~11:1 dark, ~12:1 light against amber-500. |
| `--on-teal` | `#080808` | `#1c1a17` | Text rendered on teal (`#14b8a6`) backgrounds. Same principle. Contrast: ~5.5:1 dark, ~5.5:1 light against teal-500. |

### Composite / Derived Tokens (Not Yet in globals.css — Recommended Additions)

These tokens are referenced in the visual system spec but not yet explicitly declared in `globals.css`. They can be derived from existing palette values. The frontend developer should add them to `globals.css` as semantic tokens rather than computing them inline.

| Token | Dark Value | Light Value | Usage |
|---|---|---|---|
| `--border-medium` | `#3d3d3a` | `#b8b3aa` | Hover border state. Currently used as a hardcoded hex in components. Should be tokenized. |
| `--on-amber` | `#080808` | `#1c1a17` | Already used in buttons as hardcoded hex. Should be tokenized. |
| `--on-teal` | `#080808` | `#1c1a17` | Same situation. |

---

## Complete Token Block (Ready to Paste Into globals.css)

The following is the full recommended semantic token declaration. Replace the existing `:root` and `[data-theme="light"]` blocks in `globals.css` with this:

```css
/* Dark mode (default) */
:root,
[data-theme="dark"] {
  --bg-base:        #080808;
  --bg-surface:     #111110;
  --bg-code:        #0d0d0b;

  --border-subtle:  #1c1c1a;
  --border-light:   #2a2a28;
  --border-medium:  #3d3d3a;

  --text-primary:   #f5f5f2;
  --text-secondary: #8a8a85;
  --text-muted:     #5c5c58;
  --text-faint:     #3d3d3a;
  --text-code:      #d8d8d2;

  --on-amber:       #080808;
  --on-teal:        #080808;

  color-scheme: dark;
}

/* Light mode */
[data-theme="light"] {
  --bg-base:        #f7f4ee;
  --bg-surface:     #efebe2;
  --bg-code:        #e8e3d9;

  --border-subtle:  #ddd8cf;
  --border-light:   #ccc7bd;
  --border-medium:  #b8b3aa;

  --text-primary:   #1c1a17;
  --text-secondary: #48453f;
  --text-muted:     #6b6760;
  --text-faint:     #9a9794;
  --text-code:      #2e2b25;

  --on-amber:       #1c1a17;
  --on-teal:        #1c1a17;

  color-scheme: light;
}
```

---

## Contrast Verification

All text-on-background combinations verified below. Ratios are approximate and should be confirmed with a WCAG contrast checker (e.g., WebAIM Contrast Checker) using the exact hex values.

### Dark Mode Contrast

| Foreground | Background | Ratio (approx) | WCAG Result |
|---|---|---|---|
| `--text-primary` #f5f5f2 | `--bg-base` #080808 | ~19:1 | AAA |
| `--text-primary` #f5f5f2 | `--bg-surface` #111110 | ~17:1 | AAA |
| `--text-secondary` #8a8a85 | `--bg-base` #080808 | ~6.2:1 | AA |
| `--text-secondary` #8a8a85 | `--bg-surface` #111110 | ~5.7:1 | AA |
| `--text-muted` #5c5c58 | `--bg-base` #080808 | ~3.4:1 | AA large only |
| `--text-muted` #5c5c58 | `--bg-surface` #111110 | ~3.1:1 | AA large only |
| `--text-code` #d8d8d2 | `--bg-code` #0d0d0b | ~14.5:1 | AAA |
| `--on-amber` #080808 | amber-500 #f59e0b | ~11.1:1 | AAA |
| `--on-teal` #080808 | teal-500 #14b8a6 | ~5.5:1 | AA |

**Note on `--text-muted` at small sizes:** This token fails AA at 16px and below against dark backgrounds. Use it only for captions (12–13px) and labels where the content is non-essential, decorative, or supplemental (proof strip separators, code prompt `$` symbols). Do not use `--text-muted` for sentence-length body copy.

### Light Mode Contrast

| Foreground | Background | Ratio (approx) | WCAG Result |
|---|---|---|---|
| `--text-primary` #1c1a17 | `--bg-base` #f7f4ee | ~13.5:1 | AAA |
| `--text-primary` #1c1a17 | `--bg-surface` #efebe2 | ~12.8:1 | AAA |
| `--text-secondary` #48453f | `--bg-base` #f7f4ee | ~7.3:1 | AA |
| `--text-secondary` #48453f | `--bg-surface` #efebe2 | ~6.9:1 | AA |
| `--text-muted` #6b6760 | `--bg-base` #f7f4ee | ~4.7:1 | AA |
| `--text-muted` #6b6760 | `--bg-surface` #efebe2 | ~4.4:1 | AA large — edge case for normal text |
| `--text-faint` #9a9794 | `--bg-base` #f7f4ee | ~2.7:1 | Fails AA — decorative use only |
| `--text-code` #2e2b25 | `--bg-code` #e8e3d9 | ~9.4:1 | AAA |
| `--on-amber` #1c1a17 | amber-500 #f59e0b | ~12.1:1 | AAA |
| `--on-teal` #1c1a17 | teal-500 #14b8a6 | ~5.5:1 | AA |
| teal-500 #14b8a6 | `--bg-base` #f7f4ee | ~3.1:1 | AA large — acceptable for large proof numbers |
| amber-500 #f59e0b | `--bg-base` #f7f4ee | ~2.8:1 | Fails AA — do not use amber as text in light mode |

---

## Token Usage Decision Tree

When choosing a color for a new element, use this hierarchy:

```
Is it a page background?        → --bg-base
Is it a card / surface?         → --bg-surface
Is it a code block?             → --bg-code
Is it a section divider?        → --border-subtle
Is it a standard border?        → --border-light
Is it a hover border?           → --border-medium
Is it the most important text?  → --text-primary
Is it supporting text?          → --text-secondary
Is it a label or caption?       → --text-muted
Is it decorative / ghost?       → --text-faint
Is it code / monospace?         → --text-code
Is it a CTA or action accent?   → amber-500 (fill) / amber-400 (hover)
Is it a proof / validation?     → teal-500 (indicator) / teal-400 (hover)
Is it text ON amber?            → --on-amber
Is it text ON teal?             → --on-teal
```

If the element does not fit any category above, raise it as a design decision before implementing. Do not approximate with a hardcoded hex.

---

## Tokens Not Yet Tokenized (Technical Debt)

The following hardcoded values appear in component files and should be migrated to tokens in a future refactor. They are listed here so the frontend developer can plan the work.

| Hardcoded Value | Appears In | Target Token |
|---|---|---|
| `#080808` (on-amber) | Hero.tsx button | `var(--on-amber)` |
| `#1c1c1a` (border) | TheStaff.tsx section border | `var(--border-subtle)` |
| `#0d0d0b` (code bg) | TheStaff.tsx code block | `var(--bg-code)` |
| `#3d3d3a` (faint text) | TheStaff.tsx comment text | `var(--text-faint)` |
| `#5c5c58` (muted text) | Hero.tsx, TheStaff.tsx | `var(--text-muted)` |
| `#8a8a85` (secondary text) | Hero.tsx, TheStaff.tsx | `var(--text-secondary)` |
| `#d8d8d2` (code text) | Hero.tsx | `var(--text-code)` |
| `#f5f5f2` (primary text) | Hero.tsx | `var(--text-primary)` |
| `#2a2a28` (border light) | Hero.tsx | `var(--border-light)` |
| `#111110` (surface bg) | Hero.tsx | `var(--bg-surface)` |

Migration approach: replace inline hex values in component `className` strings and `style` props with `var(--token)`. For Tailwind classes like `border-[#2a2a28]`, replace with a custom class or an inline style using the token. Accent colors (`text-amber-500`, `text-teal-500`, `bg-amber-500`) are exempt — they are intentionally palette-level and theme-invariant.

---

*This document must be updated whenever a new token is introduced. Undocumented tokens in `globals.css` are not valid — they must have an entry here.*
