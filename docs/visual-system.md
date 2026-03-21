# Iranti Visual System Specification

**Version:** 1.0
**Date:** 2026-03-21
**Author:** Brand Strategist
**Status:** Reference — hand to frontend developer for implementation

---

## 1. Design Philosophy

### What Iranti Is Visually

Iranti is memory infrastructure. That word — infrastructure — should be felt in the design. Not through industrial harshness, but through the quiet confidence of something that does not need to perform. Real infrastructure is precise, reliable, and understated. It does not wave its arms.

The site's visual character is: **technical editorial**. Think of a well-designed journal of engineering, or a handbook from a serious open-source project that has thought carefully about presentation. The aesthetic is closer to Stripe Docs, Oxide Computer's site, or early Linear than it is to any AI startup landing page.

The Yoruba word *iranti* means memory and remembrance — not retrieval in the mechanical sense, but the kind of memory that carries identity, context, and accumulated truth over time. That etymology is a design cue. This is not the aesthetic of flash storage. It is the aesthetic of an archive: layered, permanent, considered. Warm, not cold. Depth, not gloss.

### What the Site Should Evoke

- **Precision.** Every element placed with intent. No padding that doesn't mean something. No type size chosen carelessly.
- **Depth.** Dark mode backgrounds that feel like looking into something, not at a surface. Light mode that feels like good paper — not a whiteboard.
- **Trustworthiness.** Proof over assertion. Numbers in monospace. Claims followed by evidence. The design signals that this team is careful.
- **Understated capability.** The site does not shout. It demonstrates. A developer who reads closely should come away convinced, not dazzled.

### What It Must Not Look Like

- No purple gradients or violet glows. This aesthetic is over-associated with AI vaporware.
- No generic blue-gray enterprise dashboard (default Tailwind gray, default Shadcn, default Material palette).
- No floating orbs, particle effects, or animated background blobs.
- No glassmorphism, neumorphism, or heavy drop shadows.
- No hero sections with a single large illustration or stock photo.
- No rounded-avatar team sections or "built by humans" imagery.
- No phrases like "next-generation," "game-changing," "seamlessly," or "revolutionary."
- No full-bleed background images.

### How Yoruba Memory Influences Visual Language

The concept of *iranti* as layered, archive-quality memory should manifest in:

- **Warm backgrounds, not cool ones.** Archives are paper and wood, not fluorescent-lit server rooms. The palette uses warm-tinted near-blacks and warm-tinted off-whites.
- **Subtle texture through depth.** Layers of border, surface, and background create a sense of stacked information, not a single flat surface.
- **Monospace as artifact.** Code and architecture diagrams are treated as primary design elements, not supporting decoration. They are the evidence.
- **Permanence in typography.** Tight, controlled tracking on headings. Decisive weight choices. No playful or whimsical type treatments.

---

## 2. Color System

### 2.1 Design Intent

The palette has two accent colors with strict semantic roles, a neutral ink scale built warm (slightly yellow-brown, not blue-gray), and a sand scale for light mode surfaces.

Amber is the action color. It is the color of something you should interact with or pay attention to — CTAs, version badges, architecture labels that route the eye.

Teal is the proof color. It appears when Iranti is showing evidence: benchmark numbers, pass states, validation results. It is the color of: "this is real, this has been tested."

Neither color should appear by accident. Restrain both to their semantic roles.

### 2.2 Dark Mode (Primary)

Dark mode is the primary design surface. The site defaults to dark. All design decisions should be made in dark mode first.

| Token | Hex | Role |
|---|---|---|
| `--bg-base` | `#080808` | Page background. Near-black with a barely-perceptible warm cast. Not pure black — pure black reads as a void. |
| `--bg-surface` | `#111110` | Card backgrounds, nav background, inline surface elements. One step off the base. |
| `--bg-code` | `#0d0d0b` | Code block backgrounds. Slightly deeper than bg-surface to read as a different material. |
| `--border-subtle` | `#1c1c1a` | Section dividers, card borders in low-emphasis contexts, architectural grid lines. The quietest visible line. |
| `--border-light` | `#2a2a28` | Standard card borders, input borders, secondary button borders. Legible without demanding attention. |
| `--border-medium` | `#3d3d3a` | Hover states on bordered elements. Active states. Emphasis borders. |
| `--text-primary` | `#f5f5f2` | All primary body text, headings. Warm off-white, not pure white. |
| `--text-secondary` | `#8a8a85` | Supporting text, subtitles, labels not requiring primary emphasis. |
| `--text-muted` | `#5c5c58` | Captions, inline commentary, code prompt symbols, separator dots. |
| `--text-faint` | `#3d3d3a` | Ghost states, placeholder text, the lightest possible foreground. Meets contrast only against the darkest backgrounds. |
| `--text-code` | `#d8d8d2` | Code token default color. Slightly warm, readable without being primary-emphasis. |
| `--accent-amber` | `#f59e0b` | Amber-500. CTAs, section label lines, architecture color for Library and Archivist, version badge. |
| `--accent-amber-hover` | `#fbbf24` | Amber-400. Hover state for amber CTAs and amber-tinted elements. |
| `--accent-teal` | `#14b8a6` | Teal-500. Proof numbers, benchmark pass indicators, Librarian and Attendant architecture color. |
| `--accent-teal-bright` | `#2dd4bf` | Teal-400. Hover states, inline teal code tokens, animated pulse accents. |
| `--on-amber` | `#080808` | Text on amber backgrounds. Must pass 4.5:1 against #f59e0b — ink-950 does at ~11:1. |
| `--on-teal` | `#080808` | Text on teal backgrounds. Ink-950 against #14b8a6 passes at ~5.5:1. |

**Background amber glow (Hero):** The existing ambient glow in the Hero (`radial-gradient(ellipse, #f59e0b 0%, transparent 70%)` at opacity 0.06) is intentional and acceptable. It is not a blob — it is an extremely subtle warmth behind the content. Maximum opacity 0.06. Do not increase. Do not replicate in other sections.

**Background grid (Hero):** The 48px rule grid at opacity 0.03 is acceptable. It references graph paper, technical drawing, infrastructure diagramming. One occurrence (Hero only). Not a repeating site pattern.

### 2.3 Light Mode (Designed From Scratch, Not Inverted)

Light mode must feel like a different aesthetic expression of the same brand. The primary metaphor is archival paper: warm, slightly aged, with weight and texture. It should not feel like a bright white app or a corporate intranet.

Amber and teal are unchanged in hue. In light mode, teal becomes a more prominent accent because it reads as a stronger visual signal against warm paper tones than against near-black.

| Token | Hex | Role |
|---|---|---|
| `--bg-base` | `#f7f4ee` | Page background. Warm off-white. Closer to aged paper than to a white wall. Not sand-yellow — just a hint of warmth. |
| `--bg-surface` | `#efebe2` | Card backgrounds. Slightly deeper — enough contrast to read as a distinct surface against the page. |
| `--bg-code` | `#e8e3d9` | Code block backgrounds. A third layer of depth for technical content. |
| `--border-subtle` | `#ddd8cf` | Section dividers, quietest visible line. Warm light gray. |
| `--border-light` | `#ccc7bd` | Standard card borders, secondary button borders. |
| `--border-medium` | `#b8b3aa` | Hover states, emphasis borders. Still warm, not blue. |
| `--text-primary` | `#1c1a17` | Primary text. Warm near-black — same family as ink-950 but not pure black. Rationale: pure black on warm paper creates harsh dissonance. |
| `--text-secondary` | `#48453f` | Supporting text, subtitles. Warm dark gray. |
| `--text-muted` | `#6b6760` | Captions, labels, inline commentary. Meets WCAG AA against bg-base (4.7:1). |
| `--text-faint` | `#9a9794` | Ghost states, placeholders. Does not meet AA alone — use only for non-essential decorative text. |
| `--text-code` | `#2e2b25` | Code token default. Dark enough to read clearly against bg-code. |
| `--accent-amber` | `#f59e0b` | Unchanged. Reads well against warm paper tones. |
| `--accent-amber-hover` | `#fbbf24` | Unchanged. |
| `--accent-teal` | `#14b8a6` | Unchanged. More visually prominent in light mode — use it confidently for proof and validation. |
| `--accent-teal-bright` | `#2dd4bf` | Unchanged. Hover states. |
| `--on-amber` | `#1c1a17` | Text on amber backgrounds in light mode. Warm near-black. |
| `--on-teal` | `#1c1a17` | Text on teal backgrounds in light mode. |

**WCAG contrast verification (light mode):**

| Pair | Ratio | Result |
|---|---|---|
| `--text-primary` (#1c1a17) on `--bg-base` (#f7f4ee) | ~13.5:1 | AAA |
| `--text-secondary` (#48453f) on `--bg-base` (#f7f4ee) | ~7.3:1 | AA large + AA normal |
| `--text-muted` (#6b6760) on `--bg-base` (#f7f4ee) | ~4.7:1 | AA normal |
| `--text-primary` on `--bg-surface` (#efebe2) | ~12.8:1 | AAA |
| `--text-muted` on `--bg-surface` | ~4.4:1 | AA large — use with care for normal text |
| Amber (#f59e0b) on `--bg-base` | ~2.8:1 | Decorative use only; do not use amber as text color in light mode without dark surrounding context |
| Teal (#14b8a6) on `--bg-base` | ~3.1:1 | AA large — acceptable for large text/numbers; supplement with dark text for body |

**Note on amber in light mode:** Amber should not be used as body text in light mode — contrast is insufficient for normal text. Use it for decorative borders, section label lines, and button backgrounds only. Amber button text must always use `--on-amber` (#1c1a17).

### 2.4 Color Usage Rules

**Amber — action and architecture:**
- Primary CTA button fill
- Section label horizontal line (the 24px rule before mono labels)
- Architecture diagram labels: Library, Archivist, Resolutionist
- Version badge fill or border
- Hover state: always amber-400

**Teal — proof and validation:**
- Benchmark numbers and pass-state counts
- Architecture diagram labels: Librarian, Attendant
- Animated pulse indicators (the teal dot in the Hero badge)
- Read flow indicators

**Never:**
- No purple, violet, indigo, or gradient glows in any form
- No blue-gray (Tailwind slate, gray — avoid these entirely; use the ink scale)
- No gradient text (amber-to-teal, or any color-to-color text gradient)
- No amber or teal as large background fills — accents only

---

## 3. Typography

### 3.1 Typeface Rationale

**Inter** is chosen for all UI text and headings. Rationale: Inter is a workhorse typeface designed for legibility at small sizes on screens. At -0.02em to -0.03em tracking and 600 weight, it reads as technical and precise without being cold. It is a neutral container for serious content — it does not call attention to itself.

**JetBrains Mono** is chosen for all code, architecture diagrams, labels, and overlines. Rationale: JetBrains Mono is a developer tool. Its presence signals: "this is technical content." It has slightly wider letterforms than Fira Code or Cascadia, which means it occupies space with more presence. At small sizes with positive tracking, it reads cleanly as a label. Used in the architecture diagrams, it transforms a code block from decoration into evidence.

**The combination is intentional:** Inter for editorial structure, JetBrains Mono for technical artifact. Do not use Inter in code contexts or JetBrains Mono for headings. The alternation creates rhythm and semantic signal.

### 3.2 Type Scale

All sizes are target ranges; implementations should pick a single value within the range and apply consistently.

| Level | Size | Tracking | Weight | Line Height | Font | Usage |
|---|---|---|---|---|---|---|
| Display | 64–80px | -0.03em | 600 | 1.03–1.05 | Inter | Hero H1 only |
| Headline Large | 40–48px | -0.02em | 600 | 1.1–1.15 | Inter | Page section headlines (H2) |
| Headline Medium | 30–36px | -0.02em | 600 | 1.15–1.2 | Inter | Subsection headlines (H3) |
| Subhead | 20–24px | -0.015em | 500 | 1.3–1.4 | Inter | Lead paragraph, intro text under H2 |
| Body Large | 18–20px | 0 | 400 | 1.65–1.75 | Inter | Primary body copy — main reading paragraphs |
| Body | 15–16px | 0 | 400 | 1.65–1.75 | Inter | Standard body, card body, supporting paragraphs |
| Caption | 12–13px | 0 | 400–500 | 1.5 | Inter | Footnotes, fine print, image captions |
| Label / Overline | 10–12px | +0.08–0.12em | 500 | 1.0 | JetBrains Mono | Section labels (uppercase), badge text |
| Code body | 13–14px | 0 | 400 | 1.6 | JetBrains Mono | Code blocks, inline code in body |
| Code emphasis | 13–14px | 0 | 500 | 1.6 | JetBrains Mono | Highlighted tokens in architecture diagrams (amber/teal) |

### 3.3 Tracking (Letter-Spacing) Logic

Negative tracking on large headings is a technical publishing convention. At 60px+, default spacing creates a loose, casual feeling. At -0.03em, words lock together and read as precise, decisive statements.

Positive tracking on labels (+0.08–0.12em) is also conventional: small uppercase text needs wider spacing to remain readable. Do not apply positive tracking to anything above 14px.

Body text uses 0 tracking. Adjusting body tracking — especially negative — impairs readability for continuous reading. Do not touch it.

### 3.4 When to Use Inter vs JetBrains Mono

**Use Inter for:**
- All headings (H1–H6)
- All body and supporting paragraph text
- Button labels and CTA text
- Navigation items
- Any sentence-length or paragraph-length content

**Use JetBrains Mono for:**
- All code blocks and inline code
- Architecture diagrams (the text-based flow diagrams in TheStaff)
- Section labels / overlines (e.g., "// Architecture", "ARCHITECTURE")
- Version numbers in badges
- Benchmark numbers in proof strips (the teal numbers above the proof strip in Hero)
- Any content that is meant to read as an artifact, not prose

**The test:** If a developer would write it in a terminal or a code editor, it is JetBrains Mono. If a technical writer would write it, it is Inter.

### 3.5 Font Loading

Both fonts must be loaded from Google Fonts or a self-hosted equivalent. Prioritize WOFF2. The `@theme` block in `globals.css` already declares the font-family stacks correctly — no change needed to family declarations.

Preload the Inter 400 and 600 weights and JetBrains Mono 400 and 500 weights. Other weights are acceptable as fallbacks.

---

## 4. Spacing and Layout

### 4.1 Grid

- **Max content width:** 1152px (`max-w-6xl`). Content must not span the full viewport at large breakpoints. Technical documentation and editorial content require a reading width constraint.
- **Horizontal page padding:** 24px (`px-6`) on all viewports. At ≥1200px viewport, the max-width constraint takes over. Do not reduce below 16px on mobile.
- **Section vertical rhythm:** 96px (`py-24`) for major sections. This is the baseline — sections with heavier content may use 128px (`py-32`). Do not use less than 80px between sections.

### 4.2 Internal Spacing

| Context | Value | Notes |
|---|---|---|
| Section label → section headline | 24px (mb-6) | Space between the mono label and the H2 |
| Section headline → lead paragraph | 16px (mb-4) | Tight — they are continuous |
| Lead paragraph → CTA or next element | 32–40px (mb-8–mb-10) | Breathe before action |
| Card internal padding | 16–20px (p-4 to p-5) | Consistent across card variants |
| Card grid gap | 16–24px (gap-4 to gap-6) | Tighter for dense grids, wider for featured cards |
| Major column split (2-col layout) | 64px (gap-16) | TheStaff pattern: architecture diagram vs. staff cards |
| Section divider border | 1px | `border-t border-[var(--border-subtle)]` |
| Proof strip item gap | 24px (gap-6) | The horizontal proof strip in Hero |

### 4.3 Breakpoints

Use Tailwind's default breakpoints. Design mobile-first. The critical reflow points are:
- **sm (640px):** Install command goes from stacked to inline row
- **md (768px):** Heading scale increases (text-5xl → text-6xl → text-7xl pattern)
- **lg (1024px):** Two-column layouts activate (TheStaff, Integrations grids)

### 4.4 Vertical Rhythm Principles

Sections should feel spacious. Engineers reading technical content need breathing room between conceptual blocks. Do not pack sections. If a section feels short, that is usually fine — add the next section rather than padding the current one with filler.

Every major section is separated by a 1px border (`--border-subtle`). This creates the sense of archive pages — each section is a chapter with a clear boundary, not a continuous scroll of gradient blobs.

---

## 5. Component Patterns

### 5.1 Section Label

The consistent wayfinding element across all sections.

**Structure:** A short horizontal rule + mono uppercase label, flush left, in amber or teal.

**Implementation:**
```tsx
<div className="flex items-center gap-3 mb-6">
  <div className="w-6 h-px bg-amber-500" />
  <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
    Architecture
  </span>
</div>
```

**Rules:**
- Amber for structural/organizational labels: Architecture, Install, Integrations
- Teal for proof/evidence labels: Proof, Benchmarks, Validation
- Always `tracking-wider` (+0.08em minimum)
- Always `font-mono` (JetBrains Mono)
- Always `text-xs` (12px)
- The horizontal rule is always `w-6` (24px) — do not vary this
- Margin below: always `mb-6` before the headline

### 5.2 Card

The primary surface pattern for grouped information.

**Dark mode:**
```
background: var(--bg-surface)  /* #111110 */
border: 1px solid var(--border-light)  /* #2a2a28 */
border-radius: 12px (rounded-xl)
padding: 16–20px (p-4 or p-5)
box-shadow: none
```

**Light mode:**
```
background: var(--bg-surface)  /* #efebe2 */
border: 1px solid var(--border-light)  /* #ccc7bd */
border-radius: 12px
padding: 16–20px
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)
```

**Accent cards (amber or teal variant):**

Used in TheStaff and architecture contexts. Amber variant:
```
background: color-mix(in srgb, #f59e0b 5%, transparent)  /* amber-500/5 */
border: 1px solid color-mix(in srgb, #f59e0b 20%, transparent)  /* amber-500/20 */
```

Teal variant:
```
background: color-mix(in srgb, #14b8a6 5%, transparent)
border: 1px solid color-mix(in srgb, #14b8a6 20%, transparent)
```

**Rules:**
- No hover lift or scale transforms on cards
- No drop shadows in dark mode — depth is created by border + background contrast
- Cards do not have headers with colored backgrounds — accent is in the border and background only

### 5.3 Code Block

The evidence block. Treated as a primary design element.

**Structure:**
```
background: var(--bg-code)
border: 1px solid var(--border-subtle)
border-radius: 12px (rounded-xl)
padding: 20px (p-5)
font-family: JetBrains Mono
font-size: 12–13px
```

**Token coloring (dark mode):**
- Comments and arrows: `--text-faint` (#3d3d3a)
- Default tokens: `--text-secondary` (#8a8a85)
- Amber-highlighted tokens (Library, Archivist writes): `text-amber-400` (#fbbf24)
- Teal-highlighted tokens (Attendant, Librarian reads): `text-teal-400` (#2dd4bf)
- Prompt prefix `$`: `--text-muted` (#5c5c58)
- Command text: `--text-code` (#d8d8d2)

**Token coloring (light mode):**
- Comments and arrows: `--text-faint` (#9a9794)
- Default tokens: `--text-secondary` (#48453f)
- Amber-highlighted tokens: `#d97706` (amber-600 — amber-400 is too light in light mode)
- Teal-highlighted tokens: `#0d9488` (teal-600 — teal-400 is insufficient contrast)
- Prompt prefix: `--text-muted` (#6b6760)
- Command text: `--text-code` (#2e2b25)

**Rules:**
- Code blocks in architecture sections are not decorative — they are the diagram
- Line-height: 1.6 — do not reduce for space
- Do not truncate architecture flow diagrams — they must be complete and legible
- Horizontal scroll is acceptable on narrow viewports; do not wrap code
- The copy button in inline install commands should use `--text-muted` at rest, `--text-code` on hover

### 5.4 Badge and Tag

Used for version labels, status indicators, integration names.

**Version badge (Hero):**
```
border: 1px solid var(--border-light)
background: var(--bg-surface)
border-radius: 9999px (rounded-full)
padding: 4px 12px (py-1 px-3)
font: 12px JetBrains Mono, --text-secondary
```

**Teal pulse indicator:**
The animated dot inside the Hero badge — `w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse`. This is the only `animate-pulse` element on the page. It signals "live" / "real." Do not add more pulse animations.

**Proof strip items (Hero bottom):**
```
font: 12px JetBrains Mono, --text-muted for label text
accent number: text-teal-500, font-medium font-mono
separator: · in --border-light
```

### 5.5 CTA Buttons

**Primary (amber fill):**
```
background: #f59e0b (amber-500)
color: #080808 (--on-amber dark) or #1c1a17 (--on-amber light)
border-radius: 8px (rounded-lg) — not pill-shaped
padding: 12px 20px (py-3 px-5)
font: 14px Inter, weight 500
hover: background #fbbf24 (amber-400)
transition: background-color 200ms
```

Rationale for non-pill shape: pills read as consumer product. `rounded-lg` reads as developer tool — professional, precise.

**Secondary (bordered):**
```
background: transparent
border: 1px solid var(--border-light)
color: var(--text-code) or var(--text-primary)
border-radius: 8px
padding: 12px 20px
font: 14px Inter, weight 400
hover: border-color var(--border-medium)
transition: border-color 200ms, color 200ms
```

**Ghost/tertiary (for nav links and inline actions):**
```
background: transparent
color: var(--text-secondary)
hover: color var(--text-primary)
transition: color 150ms
```

**Rules:**
- Do not use amber for destructive actions
- Do not use more than two CTAs in the same visual cluster (usually: primary + secondary)
- CTA clusters should stack on mobile (flex-col) and go inline at sm (flex-row)
- Never use teal as a button fill color — it is a proof color, not an action color

### 5.6 Navigation

```
background: var(--bg-base) with backdrop-blur if sticky
border-bottom: 1px solid var(--border-subtle)
height: 56–64px
padding: 0 24px
max-width: 1152px + horizontal centering
```

Nav links: Inter 14px, `--text-secondary`, hover `--text-primary`, transition 150ms.

The logo/wordmark should sit left. Nav links center or right. Theme toggle rightmost.

At mobile: collapse to a hamburger or simplified menu. Nav items should not be visible on mobile by default unless a menu is open.

---

## 6. Motion Principles

### 6.1 Philosophy

Motion in the Iranti site has one purpose: to support comprehension. It helps users understand state changes and spatial relationships. It does not perform.

Technical infrastructure does not animate to impress. A database does not zoom in when you hover over it. The site should feel the same way — capable and still, moving only when it needs to.

### 6.2 Allowed Transitions

| Use Case | Transition | Duration |
|---|---|---|
| Color changes (hover, focus) | `transition-colors` | 150–200ms |
| Border changes (hover states on cards, buttons) | `transition-colors` | 150–200ms |
| Background changes (button hover, nav scroll) | `transition-colors` | 200ms |
| Opacity changes (copy button state, icons) | `transition-opacity` | 150ms |
| Theme switch (all tokens) | `transition: background-color 0.2s, color 0.2s, border-color 0.2s` | 200ms |
| Page mount (optional) | `opacity: 0 → 1` | 150ms |

All transitions use `ease` or `ease-out` easing. Do not use `ease-in` for hover states (it feels sluggish on the entry).

### 6.3 Specifically Allowed Animations

**Scroll indicator bounce (Hero):**
The `animate-bounce` on the chevron at the bottom of the Hero section is acceptable. It is subtle (opacity #2a2a28 — barely visible), purposeful (directs attention downward), and short in scope (a single small icon).

**Teal pulse indicator (Hero badge):**
`animate-pulse` on the teal dot. One instance. Signals the product is live and real.

**Architecture diagram line animations (TheStaff — optional):**
If implemented, animated lines showing data flow through the write path can be done carefully. Rules: CSS animation only (no JS), delay between steps to simulate a read/write sequence, maximum duration 1.5s per loop, pause between loops of ≥2s. Lines should trace the existing flow arrows — they should not move components.

### 6.4 Explicitly Forbidden

- No parallax scroll effects
- No scroll-triggered entrance animations (no elements fading or sliding in on scroll)
- No floating, pulsing, or orbiting background elements
- No skeleton shimmer animations on static content
- No hover scale transforms (`hover:scale-*`) — elements should not grow on hover
- No animated gradients
- No `animate-spin` except in genuine loading states (and the site has none in v1)

### 6.5 Rationale

The target audience is developers doing serious technical evaluation. Entrance animations that delay content are friction, not delight, for this audience. The site must render and be readable immediately. Transitions that are shorter than 200ms are imperceptible under normal interaction; transitions longer than 200ms for hover states feel laggy.

---

## 7. Dark/Light Mode Implementation

### 7.1 Token Architecture

Theme is applied via `data-theme` attribute on `<html>`. The attribute is the only mechanism — do not use `prefers-color-scheme` media queries as the primary driver (the user's explicit choice in `localStorage` always wins).

```css
:root, [data-theme="dark"] { /* dark tokens */ }
[data-theme="light"] { /* light tokens */ }
```

The `body` receives `transition: background-color 0.2s ease, color 0.2s ease` so the switch feels smooth. Individual component borders and backgrounds can also carry their own transition declarations when needed for complex components.

### 7.2 Flash Prevention

A `<script>` tag in `<head>` (before any CSS loads) must apply the theme before first paint:

```html
<script>
  (function() {
    var stored = localStorage.getItem('iranti-theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

This must run synchronously (no `defer`, no `async`). In Next.js, inject via `next/head` or via the `<head>` block in the root layout. The ThemeToggle component already handles the hydration mismatch by returning an invisible placeholder before `mounted` is true — this pattern is correct and should be preserved.

### 7.3 Toggle Icon Convention

- When in dark mode: show the **sun icon** (click to switch to light)
- When in light mode: show the **moon icon** (click to switch to dark)
- `aria-label` must be: "Switch to light mode" or "Switch to dark mode" accordingly

The existing `ThemeToggle.tsx` implementation is correct on all three points.

### 7.4 Storage

```
localStorage key: iranti-theme
Values: "dark" | "light"
Default (no stored value): "dark"
```

### 7.5 Component Considerations

Components must use CSS variables (`var(--bg-surface)`, etc.) for all colors that need to respond to theme. Hardcoded hex values in component files — as seen in the current Hero and TheStaff — should be migrated to CSS variables in future refactors. They are acceptable in v1 but create maintenance burden.

The one exception is accent colors (`text-amber-500`, `text-teal-500`, `bg-amber-500`): these are intentionally unchanged across themes and can remain as Tailwind utility classes.

---

## 8. Do's and Don'ts

### Don'ts

- **No purple or violet** — not as a gradient, border, or text color. Purple is the signature color of AI vaporware. One use removes all technical credibility.
- **No gradient glow effects** — the existing amber glow in Hero is acceptable at opacity 0.06. Any new glow must be approved against this baseline.
- **No generic blue-gray** — `slate-*`, `gray-*`, `zinc-*` Tailwind scales are forbidden. Use the ink and sand scales.
- **No floating elements or animated background blobs** — no particle systems, no floating circles, no CSS art.
- **No heavy drop shadows** — `shadow-lg`, `shadow-xl` are not used in dark mode. Light mode accepts `0 1px 3px rgba(0,0,0,0.08)` on cards only.
- **No neumorphism** — no inset shadows or extruded surfaces.
- **No rounded avatars or human imagery** — Iranti is not a team page aesthetic. Architecture and code are the imagery.
- **No full-bleed background images** — backgrounds are flat color or near-flat. The grid texture in Hero is the one exception.
- **No hover scale transforms** — elements do not grow when hovered.
- **No marketing language** — "next-generation," "seamless," "revolutionary," "game-changing," "the future of" — none of these phrases appear anywhere on the site.

### Do's

- **Use borders to create depth** — layers of border + background difference create a sense of stacked information without shadows or tricks.
- **Use monospace as design material** — architecture diagrams are rendered as code. They are not diagrams — they are technical artifacts that happen to communicate visually.
- **Use amber sparingly** — it is a strong accent. One amber element per section is usually correct. Two is the maximum.
- **Use teal to signal evidence** — when teal appears, the reader should know: "this is a number, a benchmark result, a proof." Do not use teal for decoration.
- **Use section labels consistently** — every major section opens with a section label. The consistency creates wayfinding. Visitors can scan the page by reading only the section labels.
- **Let sections breathe** — 96px vertical padding minimum. Do not reduce to fit more content. Cut content instead.
- **Write to developers** — the copy, the code blocks, the architecture diagrams — all of it assumes a developer reader. Do not soften technical language for a general audience.
- **Treat code as proof** — code blocks on the site are not decoration. They are evidence that the product is real and operable. They should be syntactically accurate and runnable.
- **Prefer warm over neutral** — when in doubt on any color decision, choose the warmer direction. The ink scale is warm. The sand scale is warm. This is the brand.

---

## 9. Reference Implementation Points

These existing components exemplify the visual system correctly and should be treated as the design reference:

- **Hero.tsx** — the dark mode aesthetic at its fullest: background grid, glow, section label, heading with amber accent span, install command block, secondary buttons, proof strip, scroll indicator
- **TheStaff.tsx** — the architecture section pattern: section label, two-column layout, text-based code diagram, accent cards with amber/teal border and bg variants
- **ThemeToggle.tsx** — the theme persistence and toggle icon pattern

These components contain hardcoded hex values. The design decisions they reflect are correct; the implementation detail of hardcoded values is a technical debt item, not a design debt item.

---

*This document is the visual system source of truth for the Iranti site. All component implementation, design review, and QA should reference this specification.*
