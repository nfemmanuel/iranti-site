# site-f006 — Feature: Memory Library Comparison Section

**Type:** Feature
**Status:** Not Started
**Priority:** P1
**Epic:** site-e003 (Comparison Narrative)
**Phase:** 2 — Core Build

---

## Problem

Iranti is often evaluated against memory libraries — MemGPT/Letta, LangChain's memory primitives, and the pattern of accumulating facts inside the context window. These tools solve real problems, and evaluators using them will ask: "Why not just use what I'm already using?" The site has no answer to this question.

The vector DB comparison (WhyNotVectorDB) is well-executed. The memory library comparison is completely missing.

---

## Value

- Closes the messaging gap for evaluators coming from LangChain or MemGPT/Letta
- Clarifies the "cross-agent, cross-process, cross-session" differentiation which is Iranti's clearest unique value
- Prevents evaluators from incorrectly treating Iranti as a drop-in replacement for tools it actually complements

---

## Scope

### Section Content (from docs/comparison-narrative.md, Section B)

**Framing:** Memory libraries store facts inside a single agent's context window or process. Iranti stores facts across agents, across sessions, and across processes.

**Key differentiators to cover:**
1. Cross-agent sharing — Agent A writes, Agent B reads, without sharing context windows or process memory
2. Cross-process persistence — Write in process 1, read in process 2 hours later. Not in-memory storage.
3. Conflict awareness — Two agents can independently write contradictory facts. Iranti detects this; memory libraries do not have the concept.
4. Scale beyond context window — Not limited by token budget. Facts live in PostgreSQL.
5. Auditability — Every write has source, confidence, conflict log, and timestamp. In-context memory is invisible.

**Tools to mention specifically:**
- Raw in-context accumulation (conversation history as memory)
- LangChain ConversationBufferMemory / ConversationSummaryMemory
- MemGPT / Letta (closest analog — it has a structured memory concept, but it is per-agent and process-coupled)

**What to acknowledge:**
- MemGPT/Letta has a more sophisticated memory model than raw in-context — the comparison with it should be precise, not dismissive
- LangChain memory is not designed for multi-agent cross-process sharing — that is a correct characterization, not an attack

### Section Format
- Follow the visual pattern of WhyNotVectorDB — framing text on the left, feature table or callout cards on the right
- A comparison table similar to the vector DB table, or a set of "key differences" cards

### Placement Decision (PM to confirm)
- Option A: Add as a new section on the homepage after WhyNotVectorDB
- Option B: Place on `/product` page (requires site-f001 to exist first)

---

## Dependencies

- `docs/comparison-narrative.md` — content source
- Placement decision from PM
- site-e003 Epic
- If placed on /product: site-f001 must be built first

---

## Acceptance Criteria

- [ ] Section exists on site with the framing "memory libraries store facts inside a process; Iranti stores facts across processes"
- [ ] At least three concrete differentiators are covered (cross-agent, cross-process, conflict awareness)
- [ ] MemGPT/Letta is mentioned by name and the comparison is accurate — not dismissive
- [ ] LangChain memory is mentioned by name and the comparison is accurate
- [ ] All claims are supported by real Iranti capabilities per `AGENTS.md`
- [ ] No vaporware framing — every stated differentiator is a shipped capability
- [ ] Visual treatment is consistent with existing site design language
- [ ] Section renders correctly in both modes

---

## Risks

- MemGPT/Letta has evolved — if any claims become inaccurate against the current version of that tool, it damages credibility. Frame claims as structural/architectural ("per-agent process coupling vs shared persistent store") rather than feature-specific.
- The comparison must not read as an attack — the goal is to help evaluators understand where Iranti fits, not to disparage other projects

---

## Open Questions

- Homepage or /product? This decision gates the timeline.
- Should the section also address raw SQLite-backed memory (e.g. simple persistent agent memory patterns) or keep scope to the named tools?

---

## Definition of Done

- Section is live on site
- All claims verified against `AGENTS.md` and upstream README
- PM has approved content and framing
- No regressions in surrounding sections
