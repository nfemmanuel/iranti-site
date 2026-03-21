# site-e003 — Epic: Comparison Narrative (Memory Libraries and Agent Frameworks)

**Type:** Epic
**Status:** Not Started
**Priority:** P1
**Phase:** 2 — Core Build / 3 — Conversion and Polish

---

## Problem

The site currently explains one comparison: Iranti vs vector databases. That comparison is implemented well in `WhyNotVectorDB.tsx` with a clear framing ("what's similar?" vs "what do we know about X?") and a feature table.

However, two equally important comparisons are missing entirely:

1. **Iranti vs memory libraries** — MemGPT/Letta, LangChain memory, raw in-context accumulation. Evaluators familiar with these tools will immediately ask "how is this different from what I'm already doing?" The site has no answer.
2. **Iranti vs agent frameworks with built-in memory** — CrewAI's memory module, AutoGen's memory primitives, Camel AI's shared state. These frameworks bundle memory inside orchestration and evaluators need to understand why Iranti is a complement, not a competitor.

Without these comparisons, the site fails a key PRD requirement: "understand why Iranti is different from vector databases, memory libraries, or agent frameworks." The vector DB section covers one of three required comparisons.

There is detailed source material for these comparisons in `docs/comparison-narrative.md`.

---

## Value

- Closes the single largest messaging gap in the current site
- Prevents evaluators who use LangChain memory or CrewAI from incorrectly dismissing Iranti as redundant
- Reinforces the "memory infrastructure, not a framework" category positioning
- Gives the PM evidence that the positioning is communicated, not just stated in the PRD

---

## Scope

### In Scope
- Memory library comparison section — dedicated content covering MemGPT/Letta, LangChain memory, and raw in-context storage
- Agent framework comparison section — dedicated content covering CrewAI, AutoGen, and Camel
- Placement decision: homepage addition, `/product` page, or dedicated `/compare` sections
- All claims tied back to real product capabilities documented in `AGENTS.md` and the Iranti README
- Feature tables or callout cards similar to `WhyNotVectorDB.tsx` in style

### Out of Scope
- Full dedicated comparison landing pages per competitor (this is v1.1 per PRD)
- Benchmark-style tests against competitor tools (requires research program)
- Pricing comparisons (not relevant for open-source tools)

---

## Dependencies

- `docs/comparison-narrative.md` — content spec (complete, see that file)
- Placement must be decided before build: homepage sections or `/product` sub-page sections (requires PM input)
- Site-e001 (multi-page routing) if content lives on `/product` — but content could also land on homepage to avoid blocking on routing

---

## Acceptance Criteria

- [ ] Memory library comparison section exists on site with clear framing distinguishing Iranti from in-context memory, MemGPT/Letta, and LangChain memory
- [ ] Agent framework comparison section exists on site with clear framing that Iranti complements CrewAI/LangChain/AutoGen rather than competing with them
- [ ] Every claim in both sections is supported by a real, shipped product capability
- [ ] Neither section contains speculative or vaporware framing
- [ ] Both sections use visual treatment consistent with the existing `WhyNotVectorDB.tsx` design language
- [ ] Content passes a technical accuracy review against `AGENTS.md` and the upstream README
- [ ] PM approves final copy

---

## Risks

- Comparison content is easy to write poorly — it can come across as marketing attack content rather than honest differentiation. The framing must be respectful and technical.
- MemGPT/Letta has evolved significantly; any claims about how it works need to be accurate as of current versions. If unsure, frame as "in-process vs cross-process" which is factually stable.
- CrewAI's memory module does more than simple in-context storage; the comparison must acknowledge this rather than strawmanning it.

---

## Open Questions

- Homepage or /product page? Homepage has higher reach but the section would be long. /product is the right long-term home but requires site-e001 first.
- Should the three comparison categories (vector DB, memory libraries, agent frameworks) be unified into one "Why Iranti" page/section, or remain separate sections?
- Does the PM want to review comparison drafts before they go to the frontend developer?

---

## Definition of Done

- Both comparison sections are live on the site
- Every claim is traceable to a real product capability
- PM has reviewed and accepted the content
- No legal or brand concerns raised about competitor naming (framing is factual, not attack-style)
- Sections render correctly in both light and dark mode
