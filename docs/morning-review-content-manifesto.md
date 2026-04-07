# Iranti Marketing Site: User Journey and Content Manifesto

**Purpose:** morning-review reference for the Iranti marketing site.

This document defines the content model for the public site: the narrative arc, proof flow, integrations framing, install path, docs routing, and trust language. It is written against the current site story and should stay aligned with the live product state, benchmark evidence, and public repo truth.

---

## 1. What The Site Must Do

The site has one job: move a technically serious visitor from curiosity to confidence.

It must:
- explain what Iranti is in one sentence
- make the category distinction explicit: memory infrastructure, not an agent framework
- prove the product with evidence, not slogans
- route readers cleanly to install, docs, GitHub, integrations, and research links
- state boundaries honestly, especially around benchmarks, setup friction, and unsupported paths

The site is not trying to do everything. It is trying to do the right things in the right order.

---

## 2. Primary Audience Journeys

### A. Skeptical evaluator

Entry source:
- GitHub
- Hacker News
- search
- a forwarded link from a teammate

What they need:
- a clear category statement
- evidence that the product is real
- direct access to the benchmark story
- a quick path to source code and documentation
- honest limits, not sales language

What should happen:
1. They read the hero and understand the category.
2. They see proof before they are asked to install.
3. They understand that benchmark claims are grounded in current evidence.
4. They can click through to product, proof, and source without friction.

### B. Builder with an agent workflow

Entry source:
- a Claude Code, Codex, LangChain, or CrewAI user
- a developer comparing memory options
- someone trying to add persistent shared state to a multi-agent system

What they need:
- a practical install path
- a fast explanation of how Iranti fits their stack
- confidence that the setup is honest about PostgreSQL and local infrastructure
- a clear list of supported integrations

What should happen:
1. They understand the value in under a minute.
2. They see exactly how to install.
3. They choose the integration path that matches their workflow.
4. They land in docs only after the site has earned the click.

### C. Technical founder or platform reviewer

Entry source:
- direct site visit
- product comparison
- internal team review

What they need:
- architectural clarity
- evidence of maintainability
- security and trust language
- a truthful boundary between shipped product and future ambition

What should happen:
1. They understand Iranti as infrastructure.
2. They see the proof and the roadmap boundary.
3. They can infer how the product would fit into a broader system.
4. They have a credible next step if they want to evaluate further.

---

## 3. Homepage Narrative

The homepage should follow this sequence:

1. **Hero**
2. **Proof**
3. **Why not vector databases**
4. **Integrations**
5. **Install**
6. **Docs / source / research links**

This order matters. The page should earn trust before asking for commitment.

### Hero

The hero must do four things immediately:
- name the category
- define the differentiator
- point to proof
- show that the product is installable now

Recommended message shape:
- memory infrastructure for multi-agent AI
- identity-first, conflict-aware, session-persistent
- not an agent framework
- open source and usable now

The hero should not try to explain everything. It should create a clean mental model and move the visitor toward proof.

### Proof

The proof section is the homepage’s credibility engine.

Its job is to show that Iranti is not a speculative idea:
- cross-session persistence is real
- conflict handling is real
- write consistency is real
- the benchmark story is public and traceable

The proof block should read like evidence, not celebration.

### Comparison

The comparison section should answer the question:

> Why isn’t this just a vector database, a memory library, or a framework feature?

The answer must stay precise:
- vector databases are good at similarity retrieval; Iranti is about exact entity + key knowledge
- memory libraries help one agent remember; Iranti shares state across agents, sessions, and processes
- frameworks orchestrate agents; Iranti is the memory layer underneath them

### Integrations

The integrations section should answer:

> How do I use this with the tools I already have?

It should emphasize portability and coexistence, not replacement.

### Install

The install section should lower fear, not hide friction.

It should tell the truth:
- PostgreSQL is required
- Docker is an easy path
- the setup flow exists to reduce the burden
- the user can choose the path that matches their stack

### Docs and Research

The page should end by routing the visitor to:
- docs
- GitHub
- benchmark source
- current-state research

Do not trap users in the marketing site. The site should feel like a gateway to the real system.

---

## 4. Product Positioning

### Core statement

Iranti is memory infrastructure for multi-agent AI systems.

### What that means

Iranti stores structured facts by entity and key, with confidence, provenance, and conflict handling. It is designed for persistent knowledge across agents, sessions, and processes.

### What it is not

- not an agent framework
- not a model provider
- not a generic vector database
- not a browser-tab injection trick
- not a promise of magical long-term reasoning

### Why it matters

Multi-agent systems fail when knowledge is ambiguous, scattered, or overwritten. Iranti exists to make knowledge stable, queryable, and shared.

---

## 5. Proof and Evidence Flow

The site’s proof story should be layered, not monolithic.

### Layer 1: homepage proof strip

This is the quick trust signal.

It should communicate the current proof set at a glance:
- cross-session persistence
- internal conflict suite
- consistency validation

It should be visually compact but semantically clear enough that a reader knows what is being claimed.

### Layer 2: dedicated proof page

This page should explain:
- methodology
- benchmark scope
- what was tested
- what was not tested
- what remains bounded or uncertain

The page should keep the “valid claims / not yet supportable” distinction explicit.

### Layer 3: benchmark research links

The proof story should link to the current benchmark references in the research repo:
- [Current benchmark state](https://github.com/nfemmanuel/iranti-benchmarking/blob/main/articles/CURRENT-BENCHMARK-STATE.md)
- [Technical benchmark state](https://github.com/nfemmanuel/iranti-benchmarking/blob/main/papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md)
- [Benchmark program resume recommendation](https://github.com/nfemmanuel/iranti-benchmarking/blob/main/BENCHMARK_PROGRAM_RESUME_RECOMMENDATION.md)

### Evidence language rules

Use this wording discipline:
- say “validated,” “observed,” or “measured” when there is current evidence
- say “bounded,” “in progress,” or “not yet supportable” when the evidence is incomplete
- do not present a yellow or mixed track as a clean green win
- do not hide benchmark caveats in small print

### Benchmark story that must stay clear

The current public proof story should preserve the following distinctions:
- cross-session retrieval or persistence is one proof track
- the internal adversarial conflict suite is a separate proof track
- consistency or write-serialization validation is a separate proof track
- external benchmark or methodology material is its own evidence layer and should not be collapsed into the internal suite

The site must never let the visitor confuse those tracks.

---

## 6. Integrations Story

The integrations page should be organized around the user’s existing workflow.

### Native and first-class

- Claude Code
- Codex
- `iranti chat`

These are the cleanest entry points because they show Iranti in a real operator loop.

### Validated framework paths

- CrewAI
- LangChain
- raw OpenAI API

These should reinforce the “works with your stack” message, not suggest a locked-in ecosystem.

### General path

- API wrapper usage
- middleware / hook-based integration

The user should understand when to choose the direct SDK, when to use a hook, and when the framework integration is enough.

### Unsupported boundary

The site should clearly say that browser-tab ChatGPT / Claude UI injection is not the supported path.

That boundary increases trust. It shows the site is describing the product, not pretending to have a universal magic hack.

---

## 7. Install Story

The install flow should feel short, direct, and honest.

### The promise

The user should be able to get from “what is this?” to “I can run it” without a long setup detour.

### The actual shape

The page should expose:
- the global install
- setup / environment guidance
- the run command
- project binding or agent binding
- the first success signal

### Friction rules

Do not bury the PostgreSQL requirement.

Do not make the user feel that setup complexity is being concealed.

Do:
- state the dependency plainly
- offer Docker or a managed Postgres path when relevant
- show the shortest working path first
- make the first successful session feel obvious

### Conversion goal

The install page is successful if a skeptical builder leaves thinking:

> This is realistic, installable, and worth trying.

---

## 8. Docs Routing

The docs page should function as a gateway, not a dead end.

It should route to:
- quickstart
- Claude Code guide
- Codex guide
- security quickstart
- API / reference material
- concept docs

The docs section should tell visitors what they can learn, not just where files live.

The strongest docs framing is:
- understand the model
- install the system
- secure it
- integrate it
- evaluate it

---

## 9. Trust Language

This is the tone the site should maintain everywhere:

- technically confident, not inflated
- clear, not cryptic
- honest about setup friction
- specific about what is shipped now
- careful about what is still being benchmarked or expanded

### Good trust language

- “validated results, not marketing claims”
- “setup friction is real; we document it honestly”
- “memory infrastructure, not another framework”
- “identity-first, conflict-aware, session-persistent”
- “the benchmark story is public”

### Language to avoid

- “AI memory magic”
- “unlimited memory”
- “solves all agent problems”
- “production-ready for everything”
- “seamless” when the page is actually describing setup work
- “breakthrough” unless there is a very specific, evidenced claim behind it

### Trust rules

If the page asks for trust, it must show evidence.

If the page makes a claim, it should point to a source.

If the evidence is partial, the copy must say so.

---

## 10. Canonical Research Links

These are the research surfaces the site should continue to point toward:

- [README](../README.md)
- [Product PRD](prd/site-prd.md)
- [Comparison narrative](comparison-narrative.md)
- [Content audit](content-audit.md)
- [Evidence and claims protocol](protocols/evidence-and-claims.md)
- [Current benchmark state](https://github.com/nfemmanuel/iranti-benchmarking/blob/main/articles/CURRENT-BENCHMARK-STATE.md)
- [Technical benchmark state](https://github.com/nfemmanuel/iranti-benchmarking/blob/main/papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md)
- [Benchmark program resume recommendation](https://github.com/nfemmanuel/iranti-benchmarking/blob/main/BENCHMARK_PROGRAM_RESUME_RECOMMENDATION.md)

These links should support evaluation, not overwhelm the visitor.

---

## 11. Morning Review Checklist

Before copy is considered ready, confirm:

1. The homepage explains the category in one sentence.
2. The proof section is first-class, not decorative.
3. Benchmark claims map to current evidence and stay split by track.
4. The install page states PostgreSQL friction plainly.
5. Integrations show how Iranti fits the user’s existing stack.
6. Docs routing feels like progress, not escape.
7. Trust language stays honest and bounded.
8. No page implies support for unsupported browser-tab injection.
9. No proof claim collapses distinct benchmark tracks into one number.
10. Every CTA points to the next sensible step for the visitor’s intent.

---

## 12. Final Content Principle

The best version of the site does not sound like a launch pitch. It sounds like a serious technical product that has been tested, constrained, and explained with care.

That is the trust model.
