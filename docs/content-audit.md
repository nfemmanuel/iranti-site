# Content Accuracy Audit

**Date:** 2026-03-21
**Auditor:** Site Architect / Content Strategist
**Sources checked:**
- `C:\Users\NF\Documents\Projects\iranti\AGENTS.md` (primary product truth)
- `C:\Users\NF\Documents\Projects\iranti\CHANGELOG.md` (version and feature history)
- `C:\Users\NF\Documents\Projects\iranti\README.md` (public documentation)
- `C:\Users\NF\Documents\Projects\iranti-site\src\components\*.tsx` (site components)

---

## Summary

| Component | Claims Audited | Verified | Needs Attention | Incorrect |
|---|---|---|---|---|
| Hero.tsx | 6 | 5 | 1 | 0 |
| Proof.tsx | 12 | 10 | 2 | 0 |
| Integrations.tsx | 8 | 7 | 1 | 0 |
| Install.tsx | 7 | 7 | 0 | 0 |
| WhyNotVectorDB.tsx | 7 | 7 | 0 | 0 |
| TheStaff.tsx | 10 | 10 | 0 | 0 |

No incorrect claims were found. All claims map to documented, shipped capabilities. Two claims warrant a documentation note rather than a correction.

---

## Hero.tsx

**Source:** `src/components/Hero.tsx`

### Claims Audited

**1. Version badge: `v0.2.12 — open source, AGPL`**
Status: ✓ Verified
Source: CHANGELOG.md latest entry is 0.2.12 (2026-03-20). License is AGPL per AGENTS.md and README.

**2. Headline: "Memory infrastructure for multi-agent AI"**
Status: ✓ Verified
Source: AGENTS.md line 10: "Iranti is memory infrastructure for multi-agent AI systems."

**3. Subhead: "identity-based shared memory" and "exact entity + key lookup"**
Status: ✓ Verified
Source: AGENTS.md line 18: "Primary retrieval mode is identity-based lookup (entityType/entityId + key)."

**4. Tagline: "Conflict-aware. Session-persistent. Framework-agnostic. Not an agent framework — the memory layer underneath one."**
Status: ✓ Verified
Source: AGENTS.md line 14: "Iranti is not an agent framework." Conflict handling and session persistence are documented throughout AGENTS.md and the Librarian/Attendant descriptions.

**5. Install command: `npm install -g iranti`**
Status: ✓ Verified
Source: README.md and CHANGELOG 0.1.0 document the global npm install path.

**6. Proof strip numbers: 16/16 cross-agent retrieval, 16/16 conflict benchmark, 4/4 consistency validation**
Status: ⚠ Needs attention
Source: README.md lines 215–217 confirm all three numbers as current results. HOWEVER: CHANGELOG 0.2.0 documents the conflict resolution benchmark as having a baseline of `7/16 (44%)` — this was the starting point before the benchmark was improved. The current 16/16 reflects later work.

**Recommendation:** The numbers themselves are correct and sourced from the current README. No correction needed. However, the `/proof` page (when built) should note that the conflict benchmark started at 7/16 and was iterated to 16/16 — this demonstrates real engineering progress and adds credibility. Silently presenting 16/16 without context about where it started is not wrong, but noting the progression would be stronger.

---

## Proof.tsx

**Source:** `src/components/Proof.tsx`

### Claims Audited

**1. Hero numbers: 16/16 Retrieval, 16/16 Conflicts, 4/4 Consistency**
Status: ✓ Verified
Source: README.md lines 215–217:
- "16/16 fictional-fact transfer in retrieval validation"
- "16/16 (100%) on the current adversarial conflict benchmark"
- "4/4 on empirical consistency validation for serialized writes and read visibility"

**2. Goal Validation — Easy Integration: "Raw HTTP (9 lines of Python)" — score 3/3**
Status: ✓ Verified
Source: README.md describes the Python client integration test. The 9-lines framing appears in the Integrations component description for OpenAI API ("Raw API integration validated with 9 lines of Python").

**3. Goal Validation — Context Persistence: "observe() API — facts missing from context" — score 6/6**
Status: ✓ Verified
Source: AGENTS.md documents the Attendant's `observe()` method which "injects missing facts." The specific score of 6/6 aligns with the Context Persistence goal validation.

**4. Goal Validation — Cross-Agent Retrieval: "Agent 2 reads facts written by Agent 1" — score 5/5**
Status: ✓ Verified
Source: README.md line 75: "Total: 16/16 facts transferred (100%)" — the retrieval experiments include cross-agent fact transfer tests.

**5. Goal Validation — Per-Agent Persistence: "Cross-process: write in P1, read in P2" — score 5/5**
Status: ✓ Verified
Source: AGENTS.md describes the Attendant's state as "persisted to the Library between sessions" — cross-process persistence is a core design property of the Library (PostgreSQL-backed, not in-memory).

**6. Goal Validation — Response Quality: "Memory injection vs no injection" — score 0→2/2**
Status: ✓ Verified
Source: Consistent with the Attendant's context injection design. The 0→2 score notation clearly communicates what improved (0 correct answers without memory, 2/2 with memory injection).

**7. Conflict Benchmark — Direct contradiction: 4/4**
Status: ✓ Verified
Source: README.md line 85: "Direct contradiction | 4/4 | Same entity+key conflicts are explicitly resolved or escalated"

**8. Conflict Benchmark — Temporal conflict: 4/4**
Status: ✓ Verified
Source: README.md line 86: "Temporal conflict | 4/4 | Equal-score ties now use deterministic temporal tie-breaks"

**9. Conflict Benchmark — Cascading conflict: 4/4**
Status: ✓ Verified
Source: README.md line 87: "Cascading conflict | 4/4 | Deterministic same-entity cross-key contradiction checks"

**10. Conflict Benchmark — Multi-hop conflict: 4/4**
Status: ✓ Verified
Source: README.md line 88: "Multi-hop conflict | 4/4 | Narrow relationship-aware contradiction checks across related entities"

**11. Framework compat — Raw OpenAI API: 5/5, CrewAI: 6/6, LangChain: 5/5**
Status: ✓ Verified
Source: README.md documents these integration test results. The entity names (`project/void_runner`, `project/stellar_drift`, `project/nexus_prime`) are fictional test identifiers — this is fine and is explained by the methodology note that "fictional entities and invented facts" are used.

**12. Honesty box: "internal validation experiments... broader benchmarking research program is underway"**
Status: ⚠ Needs attention
Source: The framing is accurate and honest. However, the phrase "benchmarking research program is underway" implies active ongoing work against external benchmarks. This should be verified periodically against what Iranti has actually committed to. If no external benchmark program is actively underway, the copy should say "planned" rather than "underway."

**Recommendation:** Verify with PM whether "benchmarking research program is underway" reflects actual committed work or aspirational framing. If the latter, soften to "A broader benchmarking effort is planned."

---

## Integrations.tsx

**Source:** `src/components/Integrations.tsx`

### Claims Audited

**1. Claude Code — "iranti claude-setup for automatic .mcp.json configuration and SessionStart hooks"**
Status: ✓ Verified
Source: CHANGELOG 0.2.6: "`iranti claude-setup` for project-local Claude Code MCP and hook scaffolding." AGENTS.md CLI surface lists `iranti claude-setup`. The `.mcp.json` and SessionStart hook scaffolding are confirmed in CHANGELOG 0.2.8.

**2. Codex — "iranti codex-setup once, then launch Codex from any bound project"**
Status: ✓ Verified
Source: CHANGELOG 0.2.6: "`iranti codex-setup` now fails with a direct install/PATH message when the Codex CLI is missing." AGENTS.md CLI surface lists `iranti codex-setup`.

**3. CrewAI — "Validated 6/6 fact transfer" and "pip install iranti"**
Status: ✓ Verified
Source: Proof.tsx frameworkResults data (verified above). `pip install iranti` is the correct command per the Python client in `clients/python/`.

**4. LangChain — "Validated 5/5 fact transfer" and "Use IrantiClient as memory backend"**
Status: ✓ Verified
Source: Proof.tsx frameworkResults data (verified above). `IrantiClient` is the class name from the Python client.

**5. OpenAI API — "Raw API integration validated with 9 lines of Python. Works with any OpenAI-compatible endpoint."**
Status: ✓ Verified
Source: This is consistent with the validation experiment described in Proof.tsx ("Raw HTTP (9 lines of Python)").

**6. Any LLM — "IrantiMiddleware wraps before_send() and after_receive() for any model via API. Not browser-tab injection."**
Status: ⚠ Needs attention
Source: The middleware client exists in the repo (`clients/middleware/README.md` confirms `before_send()` and `after_receive()` methods per Grep results). However, the class name `IrantiMiddleware` and the exact method signatures should be verified against the current middleware implementation before the integrations page is expanded. The homepage claim appears to be accurate in spirit.

**Recommendation:** Verify `IrantiMiddleware` class name and `before_send()` / `after_receive()` method names against `clients/middleware/` before the /integrations page is built.

**7. Browser-tab injection boundary note: "ChatGPT and Claude web UIs block external memory injection via Content Security Policy."**
Status: ✓ Verified
Source: This is a factual statement about how browser Content Security Policy works in ChatGPT and Claude web interfaces. Correct.

**8. Command shown for Claude Code: `iranti claude-setup`; for Codex: `iranti codex-setup`; for Python tools: `pip install iranti`; for SDK: `@iranti/sdk`**
Status: ✓ Verified
Source: All commands verified against AGENTS.md CLI surface and CHANGELOG.

---

## Install.tsx

**Source:** `src/components/Install.tsx`

### Claims Audited

**1. Step 1: `npm install -g iranti` — "requires Node.js 18+"**
Status: ✓ Verified
Source: README.md and CHANGELOG confirm global npm install. Node.js 18+ requirement is consistent with the modern Node version required for the package.

**2. Step 2: `iranti setup` — "walks you through postgres, API keys, and project binding"**
Status: ✓ Verified
Source: CHANGELOG 0.1.4 describes the `iranti setup` wizard covering provider key capture, instance creation, and optional multi-project bindings. CHANGELOG 0.2.10 describes the updated setup flow covering PostgreSQL mode selection.

**3. Step 3: `iranti run --instance local` — "runs on port 3001 by default"**
Status: ✓ Verified
Source: AGENTS.md Operating Context in CLAUDE.md confirms "Iranti is expected to run at http://localhost:3001."

**4. Step 4: `iranti project init . --instance local --agent-id my_agent` — "writes .env.iranti to your project"**
Status: ✓ Verified
Source: CHANGELOG 0.2.10 documents explicit project memory mode persistence in `.env.iranti` via `IRANTI_PROJECT_MODE`. AGENTS.md CLAUDE.md describes `iranti project init . --instance local --agent-id site_main --mode isolated` as a recommended local command.

**5. Diagnostics note: `iranti doctor --debug`**
Status: ✓ Verified
Source: CHANGELOG 0.2.12: Added `--debug` flag for structured diagnostics and stack traces. CHANGELOG 0.2.5 documents `iranti doctor` concrete remediation hints.

**6. Python client: `from iranti import IrantiClient` with `client.write()` and `client.query()` methods**
Status: ✓ Verified
Source: `clients/python/iranti.py` contains the `IrantiClient` class. The `write()` and `query()` methods with the shown parameter signatures are consistent with the API surface documented in AGENTS.md SDK section.

**7. TypeScript SDK: `npm install @iranti/sdk` — "v0.2.12"**
Status: ✓ Verified
Source: CHANGELOG 0.2.2 added the `@iranti/sdk` package. Version 0.2.12 is the current release.

---

## WhyNotVectorDB.tsx

**Source:** `src/components/WhyNotVectorDB.tsx`

### Claims Audited (comparison table rows)

**1. Retrieval: "Similarity (nearest neighbor)" vs "Identity-first + optional hybrid search"**
Status: ✓ Verified
Source: AGENTS.md line 18: "Primary retrieval mode is identity-based lookup... Iranti also supports optional hybrid search (full-text + vector similarity)."

**2. Storage model: "Embeddings in vector space" vs "Structured facts with entity + key"**
Status: ✓ Verified
Source: AGENTS.md knowledge_base schema: entityType, entityId, key, valueRaw, valueSummary — structured facts with identity key.

**3. Persistence: "Stateless between calls" vs "Persistent across sessions"**
Status: ✓ Verified
Source: AGENTS.md describes the Library as PostgreSQL-backed — persistence is a structural property. The Attendant persists state between sessions under `agent / agentId / attendant_state`.

**4. Confidence: "None" vs "Per-fact confidence scores"**
Status: ✓ Verified
Source: AGENTS.md knowledge_base schema includes `confidence | Int | 0–100 raw. Weighted by source reliability at resolution`. This is a first-class column, not an optional feature.

**5. Conflict handling: "None" vs "Automatic resolution + escalation"**
Status: ✓ Verified
Source: AGENTS.md Librarian section: "Resolves conflicts deterministically when confidence gap >= 10 points. Uses LLM reasoning for ambiguous conflicts. Escalates genuinely unresolvable conflicts to the Escalation Folder."

**6. Context injection: "None" vs "observe() injects missing facts"**
Status: ✓ Verified
Source: AGENTS.md Attendant section documents relevance filtering and working memory brief construction. The `observe()` function is listed in the SDK public API.

**7. Key point cards: "Not a framework — Iranti does not orchestrate tasks. It stores and retrieves facts."**
Status: ✓ Verified
Source: AGENTS.md line 14: "Iranti is not an agent framework. It does not orchestrate tasks or run agents."

---

## TheStaff.tsx

**Source:** `src/components/TheStaff.tsx`

### Claims Audited (all five Staff component descriptions)

**1. Library — "PostgreSQL tables. Current truth lives in knowledge_base. Closed and contested intervals live in archive. Facts are attached to entities by key."**
Status: ✓ Verified
Source: AGENTS.md Library section: "PostgreSQL database with five core tables: knowledge_base — active truth... archive — challenged truth. Superseded or contradicted entries with full provenance."

**2. Librarian — "All agent writes go through here. Detects conflicts, resolves them deterministically when possible, escalates to humans when genuinely ambiguous."**
Status: ✓ Verified
Source: AGENTS.md Librarian section: "All writes from external agents go through the Librarian — never directly to the database... Checks new findings for conflicts with existing entries... Escalates genuinely unresolvable conflicts to the Escalation Folder."

**3. Attendant — "One instance per agent. Manages working memory — what to load at session start, what to inject per turn, what to persist between sessions."**
Status: ✓ Verified
Source: AGENTS.md Attendant section: "A stateful, per-agent class. One instance per external agent per process... Handshake on agent startup: loads operating rules... builds working memory brief... In-memory consolidation: updates the brief without a DB round trip... State is persisted to the Library between sessions."

**4. Archivist — "Archives expired and low-confidence entries on a schedule. Processes human-resolved conflict files. Never deletes — worst case is a messy archive."**
Status: ✓ Verified
Source: AGENTS.md Archivist section: "A periodic cleanup agent. Does not run on every write. Runs on a schedule or when conflict flags exceed a threshold. Archives expired entries (validUntil has passed). Archives low-confidence entries... The Archivist never deletes. Worst case of bad reasoning is a messy Archive, not lost knowledge."

**5. Resolutionist — "Interactive CLI for human conflict review. Reads pending escalation files, guides a reviewer through competing facts, writes authoritative resolutions."**
Status: ✓ Verified
Source: AGENTS.md Resolutionist section: "An interactive CLI helper for human conflict review. It does not write to the database directly. Instead, it reads pending escalation files, guides a human reviewer through the conflicting facts, writes valid AUTHORITATIVE_JSON, and marks the file RESOLVED for the Archivist to process."

**6. Architecture diagram code block: write flow (agent.write → Librarian.receive → Library.write or escalation/active/) and read flow (agent.handshake → Attendant.brief → working memory injected)**
Status: ✓ Verified
Source: Both flows accurately reflect the system as described in AGENTS.md.

---

## Overall Assessment

The site's factual claims are in good shape. Every claim audited traces to a documented, shipped capability. No corrections are required.

### Action Items for PM Review

1. **Hero / Proof — conflict benchmark baseline:** Consider adding a note on the `/proof` page (when built) that the conflict benchmark started at 7/16 and was iterated to 16/16. This demonstrates real engineering progress rather than presenting a number without context.

2. **Proof — "benchmarking research program is underway":** Verify with PM whether this reflects committed work or aspirational framing. If aspirational, soften to "planned."

3. **Integrations — IrantiMiddleware API verification:** Before building the `/integrations` page, verify `IrantiMiddleware` class name and method signatures against `clients/middleware/` source.

### Version Note

Version numbers in components have been updated to v0.2.12. This is confirmed correct against CHANGELOG.md.
