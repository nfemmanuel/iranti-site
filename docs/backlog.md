# Backlog

Items are ordered by epic, then by priority within each epic. Status reflects the state of the site as of 2026-03-21.

---

## Epic 1 — Category and Messaging

| Item | Priority | Status | Notes |
|---|---|---|---|
| Category statement defined | P0 | DONE | "Memory infrastructure for multi-agent AI" — in Hero, Footer, and throughout |
| Key objections and rebuttals — vector DB | P0 | DONE | WhyNotVectorDB component with full comparison table |
| Benchmark and proof framing | P0 | DONE | Proof section with real numbers and honest scope box |
| Open-source vs hosted narrative | P0 | DONE | Footer and hero badge make open-source status clear; hosted is not promised |
| Memory library comparison (MemGPT/Letta, LangChain memory, raw in-context) | P1 | NEEDS WORK | No dedicated section; only vector DB is covered. See `docs/comparison-narrative.md` for content spec. |
| Agent framework comparison (CrewAI orchestration, AutoGen, Camel) | P1 | NEEDS WORK | No dedicated section; "framework-agnostic" is stated but not argued. See `docs/comparison-narrative.md`. |
| Iranti vs raw in-context storage framing | P1 | NEEDS WORK | Not covered anywhere on site |
| Messaging for hosted/future surface | P2 | PENDING | No waitlist or contact framing yet |

---

## Epic 2 — Information Architecture

| Item | Priority | Status | Notes |
|---|---|---|---|
| Homepage single-page architecture with anchor sections | P0 | DONE | #product, #proof, #integrations, #install all anchor correctly |
| CTA architecture for homepage | P0 | DONE | Three-tier: Install, See Proof, GitHub |
| Multi-page routing: /product, /proof, /get-started, /integrations | P0 | DONE | All four page routes exist and build clean as static pages |
| Docs gateway page | P1 | NEEDS BUILD | Footer links to GitHub docs directly; no curated gateway page |
| Contact/waitlist surface | P1 | DONE | Contact.tsx component on homepage with mailto and GitHub Discussions |
| Per-page user job definitions | P1 | NEEDS WORK | Defined at PRD level; not yet translated to page content models |
| Sitemap / robots.txt | P2 | PENDING | No SEO infrastructure |

---

## Epic 3 — Visual System

| Item | Priority | Status | Notes |
|---|---|---|---|
| Dark mode design system | P0 | DONE | Full ink + amber + teal palette; semantic CSS tokens in globals.css |
| Typography system | P0 | DONE | Inter and JetBrains Mono wired as Tailwind theme tokens |
| Light mode CSS token definitions | P0 | DONE | Tokens exist in globals.css `[data-theme="light"]` block |
| ThemeToggle component | P0 | DONE | ThemeToggle.tsx exists with SSR-safe hydration handling |
| Light mode — component refactor | P0 | IN PROGRESS | CSS vars conversion underway — Hero, Nav done; Footer, Contact, others in agent run 2026-03-21 |
| Theme toggle wired to Nav | P0 | DONE | ThemeToggle imported and rendered in Nav.tsx (both desktop and mobile) |
| Motion principles | P2 | PENDING | Not defined or implemented |
| Section/component rhythm audit | P2 | PENDING | Spacing is consistent but not formally documented |

---

## Epic 4 — Core Page Implementation

| Item | Priority | Status | Notes |
|---|---|---|---|
| Homepage — all sections | P0 | DONE | Hero, WhyNotVectorDB, TheStaff, Proof, Integrations, Install, Nav, Footer |
| /product page | P0 | DONE | Full product page: architecture, VS vector DBs table, VS memory libraries, VS agent frameworks |
| /proof page | P0 | DONE | Expanded proof: methodology, goal validation table, conflict benchmark, framework compat, external benchmarks B1/B2/B3 |
| /get-started page | P0 | DONE | 4-step install, Claude Code MCP, Codex MCP, iranti chat, Python SDK, troubleshooting |
| /integrations page | P1 | DONE | Native (Claude Code, Codex, iranti chat), Validated (CrewAI, LangChain, OpenAI), General, honest browser boundary |
| Memory library comparison section | P1 | DONE | In /product page: MemGPT/Letta, LangChain memory, raw in-context comparison |
| Agent framework comparison section | P1 | DONE | In /product page: CrewAI, AutoGen, LangChain comparison |
| Contact/waitlist section | P1 | DONE | Contact.tsx on homepage with mailto and GitHub Discussions CTA |

---

## Epic 5 — Launch and Conversion

| Item | Priority | Status | Notes |
|---|---|---|---|
| GitHub/docs routing | P0 | PARTIAL | Exists in Footer; not as a dedicated gateway page |
| SEO metadata per page | P0 | DONE | All 4 sub-pages have Next.js Metadata exports with title + description |
| Contact/waitlist section | P1 | DONE | Contact.tsx on homepage |
| Analytics instrumentation | P1 | PENDING | No PostHog, Plausible, or other analytics wired |
| Accessibility audit | P1 | PENDING | Some ARIA labels exist in components; no formal audit done |
| Performance audit | P2 | PENDING | No Lighthouse run on record |
| Sitemap.xml | P2 | PENDING | Not generated |
| Structured data (JSON-LD) | P2 | PENDING | Not implemented |
| Cross-browser QA | P2 | PENDING | Not formally done |
