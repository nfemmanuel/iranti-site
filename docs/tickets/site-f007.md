# site-f007 — Feature: Agent Framework Comparison Section

**Type:** Feature
**Status:** Not Started
**Priority:** P1
**Epic:** site-e003 (Comparison Narrative)
**Phase:** 2 — Core Build

---

## Problem

Developers evaluating Iranti often come from a CrewAI, LangChain, or AutoGen context. These frameworks have built-in memory features. The site's current position — "framework-agnostic" and "not a framework" — is stated in WhyNotVectorDB and the hero subhead but is never argued in detail.

A developer using CrewAI's memory module will ask: "CrewAI already has memory. Why would I add Iranti?" The site has no structured answer to this question.

---

## Value

- Directly addresses the most common "why not just use X's built-in memory" objection for framework users
- Reinforces the category positioning: memory infrastructure you plug into a framework, not a competing orchestration layer
- Prevents CrewAI or LangChain users from incorrectly treating Iranti as a replacement for their framework

---

## Scope

### Section Content (from docs/comparison-narrative.md, Section C)

**Framing:** Frameworks bundle memory inside orchestration. Iranti is memory infrastructure you plug any framework into. Adding Iranti to CrewAI gives CrewAI shared, persistent, conflict-aware memory that survives across runs and across agents in the crew — which the built-in memory module does not provide.

**Key differentiators to cover:**
1. Framework-agnostic — the same memory layer works with CrewAI, LangChain, AutoGen, or a raw API call. A decision to use Iranti is not a decision to leave your framework.
2. Not replacing orchestration — Iranti does not run tasks, assign roles, manage agent loops, or define workflows. It stores and retrieves facts.
3. Shared state across all agents — In a CrewAI crew, all agents can read from and write to the same Iranti knowledge base without sharing context windows. The researcher agent's findings are immediately available to the writer agent.
4. Cross-run persistence — CrewAI's built-in memory is reset or partially restored per run. Iranti persists across every run to the same PostgreSQL database.
5. Self-hostable — Your data stays in your infrastructure. Not framework-vendor-controlled.

**Tools to mention specifically:**
- CrewAI (memory module, verified 6/6 in integration test)
- LangChain (ConversationChain, AgentExecutor memory, verified 5/5)
- AutoGen (GroupChat memory patterns)
- Camel AI (shared state concepts)

**What to acknowledge:**
- CrewAI's memory module is useful and serves a real purpose — it handles short-term and entity memory in ways that complement Iranti
- The claim is not that framework memory is bad — it is that Iranti handles the cross-agent, cross-run, cross-process case that framework memory does not address

### Section Format
- Framing text explaining the "complement, not replace" positioning
- A callout or table showing: what framework memory handles, what Iranti adds
- Reference to the framework compatibility test scores (CrewAI 6/6, LangChain 5/5, OpenAI API 5/5) — these demonstrate Iranti works *with* the frameworks, not instead of them

### Placement Decision (PM to confirm)
- Option A: Homepage section after the memory library comparison
- Option B: /product page (requires site-f001)

---

## Dependencies

- `docs/comparison-narrative.md` — content source
- Placement decision from PM
- site-e003 Epic
- If placed on /product: site-f001 must be built first

---

## Acceptance Criteria

- [ ] Section exists on site with the core framing: Iranti is a complement to frameworks, not a replacement
- [ ] CrewAI and LangChain are mentioned by name with accurate characterization of what their built-in memory provides
- [ ] At least three concrete differentiators are covered (framework-agnostic, cross-run persistence, shared state across agents)
- [ ] Framework compatibility scores (CrewAI 6/6, LangChain 5/5) are referenced to demonstrate compatibility, not competition
- [ ] No claim implies Iranti is a framework competitor or that built-in framework memory is useless
- [ ] All claims are supported by real Iranti capabilities per `AGENTS.md`
- [ ] Visual treatment is consistent with existing site design language
- [ ] Section renders correctly in both modes

---

## Risks

- The "complement, not replace" framing is easy to state but hard to make concrete. The section must show specifically what Iranti provides that the framework's built-in memory does not — not just assert the positioning.
- AutoGen and Camel AI memory models are less well-known to the team than CrewAI and LangChain — any characterizations of those tools should be verified or omitted if uncertain.

---

## Open Questions

- Should AutoGen be mentioned specifically, or focus on CrewAI and LangChain where the team has direct validation data?
- Should this section include a code snippet showing Iranti + CrewAI side-by-side to make "complement" concrete?

---

## Definition of Done

- Section is live on site
- All claims verified against `AGENTS.md`, upstream README, and the Proof section's framework compat results
- PM has approved content and framing
- "Complement, not replace" is clear and backed by concrete examples, not just stated
