# Comparison Narrative

**Purpose:** This document provides the content specification for all three comparison sections on the Iranti site. It is intended for use by the frontend developer when implementing site-f006, site-f007, and the expanded WhyNotVectorDB content.

Every claim in this document maps to a real, shipped capability documented in `AGENTS.md` or the upstream Iranti README. No vaporware framing.

---

## Section A: Iranti vs Vector Databases

**Status:** Implemented in `WhyNotVectorDB.tsx`. This section documents the framing for the existing implementation and provides improvements for when the /product page is built.

### Core Insight

Vector databases answer: "What is most similar to this query?"
Iranti answers: "What do we know about this specific entity?"

These are different questions and they require different retrieval mechanisms.

When a research agent writes `project/my_research / hypothesis / "LLM memory scales with context"`, a downstream analysis agent needs to retrieve that exact fact by name — not find the most semantically similar sentence in a vector space. Nearest-neighbor search introduces the wrong kind of uncertainty for structured knowledge.

### Why Vector DBs Are Not Sufficient Alone

Vector databases are excellent tools. They are the right answer for document retrieval, semantic search, and finding relevant passages. They are not designed for:

**Exact identity lookup.** `entity + key` retrieval is deterministic. Vector search is probabilistic. If Agent B needs the deadline that Agent A wrote, a probability distribution over "similar" facts is not what it needs.

**Conflict detection.** A vector store accepts every write. When Agent A says the deadline is April 1 and Agent B says it is April 15, a vector database stores both. There is no mechanism to detect that these are conflicting facts about the same entity and key, resolve the contradiction, or escalate it.

**Confidence and provenance.** Vector databases store embeddings. Iranti stores structured facts with source, confidence (0–100), validFrom, validUntil, and a full conflict log. Every fact is auditable.

**Persistent agent-facing state.** Vector DBs are typically stateless retrieval layers. The same query returns the same results regardless of which agent is asking, what it has done before, or what it currently knows. Iranti's Attendant loads only the facts relevant to the current agent's task and injects missing context per turn.

### What Iranti Adds (Not What It Replaces)

Iranti supports optional hybrid search (full-text + vector similarity) for use cases where semantic retrieval matters. The claim is not that vector search is wrong. The claim is that vector search alone is insufficient for multi-agent systems that need shared, persistent, conflict-aware fact storage.

Iranti and a vector database can coexist in the same architecture. Iranti is the structured fact layer. A vector database can be the document retrieval layer.

### Feature Comparison

| Feature | Vector Database | Iranti |
|---|---|---|
| Retrieval model | Nearest-neighbor (similarity) | Identity-first (entity + key) + optional hybrid search |
| Storage model | Embeddings in vector space | Structured facts with entity, key, value, confidence |
| Persistence | Stateless between agent calls | Persistent across sessions and processes |
| Confidence | Not a concept | Per-fact confidence score (0–100), weighted by source reliability |
| Conflict handling | Not a concept — every write accepted | Automatic resolution when confidence gap ≥ 10 points; LLM-assisted reasoning for ambiguous cases; human escalation queue for unresolvable conflicts |
| Context injection | Not a concept | Attendant injects missing facts per turn via observe() |
| Auditability | Query and embed operations | Every write has source, agent, validFrom, conflict log |
| Multi-agent sharing | Available but without identity coordination | Explicit entity registry; any agent writes, any agent reads by entity + key |

---

## Section B: Iranti vs Memory Libraries

**Status:** Not yet on site. This is the content specification for site-f006.

The tools in this category include:
- Raw in-context accumulation (growing conversation history as agent memory)
- LangChain ConversationBufferMemory, ConversationSummaryMemory
- MemGPT / Letta (structured per-agent memory with a tiered memory model)

### Core Insight

Memory libraries store facts inside a single agent's context window or process. Iranti stores facts across agents, across sessions, and across processes.

The distinction is not about memory sophistication. MemGPT/Letta has a genuinely sophisticated memory model — tiered storage, archival memory, recursive summarization. The distinction is architectural: that memory belongs to one agent process. When the process ends, or when a different agent needs the same knowledge, the memory is not accessible without deliberate export/import plumbing that is not built into these libraries.

### Why In-Context and Memory Library Approaches Have Limits for Multi-Agent Systems

**Raw in-context accumulation:**
Facts are part of the conversation history. When the conversation ends, they are gone. When context windows fill up, earlier facts are dropped or summarized away. A second agent cannot read the first agent's conversation history without being given the entire history as input. There is no concept of structured fact retrieval — everything is a blob of text.

**LangChain memory (ConversationBufferMemory, ConversationSummaryMemory):**
LangChain's memory modules manage conversational context for a single chain or agent. They are designed to help one LLM call remember what happened in previous calls within a session. They are not designed to share knowledge between two different agents running in different processes, or to persist structured facts across multi-day workflow sessions.

**MemGPT / Letta:**
MemGPT/Letta has the most sophisticated memory model in this category — tiered main memory and archival memory, structured recall, and recursive memory consolidation. However, it operates per-agent. The memory is owned by one agent instance. For a multi-agent system where five researchers each write findings that a synthesis agent needs to read, MemGPT/Letta requires explicit coordination to share that state. Iranti is designed specifically for this multi-writer, multi-reader pattern as its primary use case.

### Iranti's Structural Differentiators

**Cross-agent sharing.** Any agent can write a fact to Iranti. Any other agent can read it by entity + key. No context window sharing. No pipe between agent processes. The Library is the shared state.

**Cross-process persistence.** Write in process 1 on Monday. Read in process 2 on Wednesday. The knowledge lives in PostgreSQL — not in RAM, not in a session, not in a conversation object that gets garbage-collected.

**Conflict awareness.** When Agent A and Agent B independently write conflicting facts about the same entity and key — both claiming to know the deadline for the same project — Iranti detects the conflict, resolves it deterministically when possible, and escalates to a human queue when the conflict is genuinely ambiguous. Memory libraries do not have this concept. If two agents write the same fact with different values, one silently overwrites the other.

**Scale beyond context window.** The knowledge base scales to PostgreSQL capacity. Retrieval is identity-based lookup, not context-window-constrained summarization. A fact written six months ago is as retrievable as one written today.

**Auditability.** Every write has source, agent ID, confidence score, validFrom timestamp, and a conflict log. You can query the full history of any fact. Memory libraries that accumulate context typically provide no structured audit trail.

### What Iranti Does Not Replace

Iranti is not a drop-in replacement for LangChain's ConversationChain or for MemGPT's memory management within a single-agent session. Those tools handle prompt assembly, conversation formatting, and in-session context management. Iranti handles the persistent, cross-agent, cross-session knowledge layer.

In a multi-agent pipeline, you might use LangChain to manage individual agent chains and Iranti to store the shared knowledge those chains produce and consume.

### Feature Comparison

| Feature | In-Context / Memory Libraries | Iranti |
|---|---|---|
| Scope | Per-agent, per-session | Cross-agent, cross-session, cross-process |
| Storage | RAM or conversation history | PostgreSQL — persistent, durable |
| Cross-agent access | Requires explicit coordination | Any agent writes and reads by entity + key |
| Conflict detection | None | Automatic — detects same entity+key conflicts |
| Conflict resolution | None (last write wins or merge) | Deterministic resolution + human escalation queue |
| Scale | Context window bounded | PostgreSQL capacity bounded |
| Auditability | Typically none | Full write provenance, conflict log, confidence history |
| Session persistence | Session-scoped (varies by tool) | Always persistent across sessions |

---

## Section C: Iranti vs Agent Frameworks with Built-in Memory

**Status:** Not yet on site. This is the content specification for site-f007.

The tools in this category include:
- CrewAI (memory module: short-term, long-term, entity memory)
- LangChain (AgentExecutor memory, ConversationChain)
- AutoGen (GroupChat conversation history, memory utilities)
- Camel AI (shared message history)

### Core Insight

Agent frameworks bundle memory inside orchestration. Iranti is memory infrastructure you plug any framework into.

These are not competing products. A CrewAI crew with Iranti gets everything CrewAI provides for task orchestration plus persistent, cross-run, cross-process memory that survives beyond any single crew execution.

### Why Framework-Bundled Memory Has Limits

Agent frameworks are designed to orchestrate tasks, assign roles, manage agent communication, and run workflows. Memory is a component of the framework, not a standalone infrastructure concern. This design makes sense for single-run, single-framework pipelines. It has limits when:

**Knowledge needs to persist across runs.** CrewAI's long-term memory can be configured with storage backends, but the memory is typically tied to the framework's lifecycle. Start a new crew, and the initialization behavior may not load the same state as the previous run. Iranti's memory is in PostgreSQL and is explicitly designed to be read by the next process, not just the current one.

**Multiple frameworks need to share state.** If one part of a pipeline uses CrewAI and another uses LangChain, their framework-bundled memories are isolated from each other. Iranti is framework-agnostic — any framework writes and reads from the same knowledge base through the same REST API.

**Conflict semantics are needed.** Framework memory modules generally do not have first-class conflict detection. If a CrewAI researcher agent and an analyst agent write conflicting facts about the same entity, the framework has no mechanism to detect or resolve the contradiction. Iranti's Librarian handles this as a core responsibility.

**The memory needs to be auditable.** Framework memory is often opaque — it is difficult to query "what does this agent know about project X and why?" Iranti's knowledge base is fully queryable, with source, confidence, and conflict history per fact.

### What "Framework-Agnostic" Means Concretely

Iranti exposes a REST API and published clients (TypeScript `@iranti/sdk`, Python `iranti`). Any framework that can make an HTTP call or use one of these clients can integrate with Iranti. The integration tests validate this explicitly:

- CrewAI: 6/6 fact transfer — a researcher crew writes facts, an analyst crew reads them
- LangChain: 5/5 fact transfer — LangChain agents write and read from Iranti's knowledge base
- Raw OpenAI API: 5/5 — no framework at all, just direct API calls

These tests demonstrate that Iranti works alongside frameworks, not instead of them. The CrewAI score is not evidence that Iranti replaces CrewAI. It is evidence that CrewAI + Iranti works.

### What Iranti Does Not Do

Iranti does not:
- Run agents or assign tasks
- Define crew roles or workflow graphs
- Manage agent communication protocols
- Replace the orchestration layer

Adding Iranti to a CrewAI project does not change how CrewAI works. It adds a persistent, shared, conflict-aware knowledge base that the crew's agents can write to and read from.

### Key Differentiators vs Framework Memory

**Framework-agnostic.** The same Iranti instance serves a CrewAI crew, a LangChain chain, a raw API agent, and a human developer querying via `iranti chat` — simultaneously.

**Cross-run persistence.** Facts written by one crew run are readable by the next run without any initialization ritual.

**Conflict handling.** Two CrewAI agents writing conflicting facts are detected and resolved or escalated. Framework memory does not have this concept.

**Self-hostable.** Iranti runs on your PostgreSQL. The data is yours. There is no framework vendor cloud requirement.

**Shared state across all agents in a crew.** In a five-agent CrewAI crew, all five agents read from and write to the same Iranti knowledge base. The researcher's findings are immediately available to the analyst and the writer without explicit handoffs.

### Feature Comparison

| Feature | Framework Built-in Memory | Iranti |
|---|---|---|
| Scope | Framework-coupled, often run-scoped | Framework-agnostic, always persistent |
| Cross-framework sharing | Not possible without custom plumbing | Native — REST API used by any framework |
| Cross-run persistence | Varies; often requires explicit configuration | Always — PostgreSQL-backed |
| Conflict detection | None | Automatic |
| Conflict resolution | None | Deterministic resolution + human escalation |
| Orchestration | Part of the framework's role | Not Iranti's concern |
| Self-hostable | Depends on framework's memory backend | Always — your PostgreSQL |
| Auditability | Typically opaque | Full write provenance per fact |

---

## Usage Notes for Frontend Developer

- Section A is already implemented. When building `/product`, expand it with the deeper framing above.
- Section B maps to `site-f006` — create a `MemoryLibraryComparison.tsx` component following the visual pattern of `WhyNotVectorDB.tsx`.
- Section C maps to `site-f007` — create a `FrameworkComparison.tsx` component following the same pattern.
- Every comparison table claim in this document is sourced from `AGENTS.md` and has been verified in `docs/content-audit.md`.
- Do not add claims not present in this document without PM review.
