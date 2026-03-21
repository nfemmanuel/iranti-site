# User Research Brief — Developer Personas and Trust Gap Analysis
**Date:** 2026-03-21
**Role:** User Researcher
**Scope:** Primary developer audience for iranti.dev — persona definitions, objection mapping, trust signal gaps, entry path analysis, install friction assessment

---

## 1. Persona Cards

### Persona A — The Multi-Agent Systems Builder

**Name:** Priya (composite)
**Role:** Senior backend or ML engineer at a startup or growth-stage company building a production multi-agent pipeline
**Current stack:** LangChain or CrewAI for orchestration, pgvector or Pinecone for semantic retrieval, PostgreSQL for application data, Redis for session caching

**Job to be done:**
She is solving the shared-state problem in a multi-agent system. Agent A writes research findings. Agent B needs those findings without being given them explicitly. The current approach is passing structured JSON between agents or maintaining a shared Redis key-value store with no conflict logic. Both approaches break down as the system grows. She needs something that handles the write/read lifecycle, conflict detection, and cross-agent coordination without requiring her to build it from scratch.

**What she already knows:**
- Familiar with entity + key patterns from database design
- Has used MemGPT or Mem0 and found them agent-local
- Understands why similarity search is insufficient for deterministic fact retrieval
- Knows PostgreSQL well, is comfortable with Docker

**Trust threshold:**
She needs to see: (1) a clear architectural diagram or mental model she can explain to her team, (2) at least one real integration example with a framework she already uses, (3) evidence that conflict resolution is deterministic and auditable rather than probabilistic. She will clone the repo before installing the npm package. She will read the schema before trusting the data model.

---

### Persona B — The Claude Code Power User

**Name:** Marcus (composite)
**Role:** Independent developer or technical founder using AI coding agents (Claude Code, Codex) as a core part of their development workflow
**Current stack:** Claude Code daily, occasional Codex, occasional raw API calls; manages a few projects simultaneously and is frustrated that each Claude session starts cold

**Job to be done:**
He wants his AI coding agent to remember decisions, context, and project-specific facts across sessions without having to re-explain the same things every time. He is not building a multi-agent system yet. He wants the simplest possible memory layer for a single Claude Code environment. The value proposition is: "Claude remembers what we decided about the architecture" across sessions.

**What he already knows:**
- Has read about MCP and understands the protocol at a high level
- Has tried prompt-prefixing and CLAUDE.md files as workarounds
- Knows npm and can run Docker when needed, but does not want infrastructure management to be the point
- Has not used LangChain or CrewAI seriously; those feel like over-engineering for his use case

**Trust threshold:**
He needs to see: (1) an install path that is under 5 minutes and requires minimal pre-configuration, (2) a concrete before/after of what Claude "knows" with and without Iranti, (3) evidence that the MCP integration actually works and is not a half-implemented feature. He will bounce if the get-started page leads with PostgreSQL requirements before showing the value.

---

### Persona C — The Technical Evaluator

**Name:** Jordan (composite)
**Role:** Staff or principal engineer at a mid-to-large company evaluating open-source tooling for potential adoption in an AI platform team
**Current stack:** Internal tooling, diverse agent frameworks, proprietary memory solutions that are beginning to crack under multi-agent load

**Job to be done:**
Jordan is doing due diligence. Someone on their team forwarded the GitHub link. They are not in a hurry to install anything — they are trying to understand whether this is real, who is behind it, what the failure modes are, and whether it is something they could responsibly introduce into a production system. They will look for reasons to say no as much as reasons to say yes.

**What they already know:**
- Deep familiarity with distributed systems, data consistency models, PostgreSQL internals
- Has read through Zep, Mem0, and other memory layer codebases
- Understands the operational implications of AGPL licensing
- Will look at the GitHub commit history, issue tracker, and contributor count before trusting the maintenance story

**Trust threshold:**
They need to see: (1) explicit honesty about what is not yet built, (2) a credible consistency model with documented guarantees and failure modes, (3) production usage signals or at minimum honest acknowledgment that this is early-stage, (4) security posture documentation, (5) a real answer to "who is behind this and will it be maintained?" A slick marketing site without these signals increases suspicion rather than trust.

---

## 2. Objection Map

### Objection 1: "The benchmarks are self-reported. How do I know they're real?"

**Current site response:** The proof page explicitly states: "These are internal validation experiments, not a peer-reviewed benchmark suite." It documents methodology (fictional entities, cross-process isolation, adversarial conflict design). The source code for benchmarks is referenced as public. The "Honest scope" callout is present and prominent.

**Grade: B+**

**Gap:** The site correctly avoids overclaiming and calls out limitations. However, the benchmark scripts are only described as living in the repo — there is no direct link to the specific benchmark files or a path like `clients/experiments/`. A skeptical engineer wants to be one click from the actual test code, not one click from the GitHub repo homepage. The "honest scope" framing is good but may not be enough for Persona C without the direct link.

---

### Objection 2: "PostgreSQL is a hard dependency. I don't want to manage a database just to try a memory layer."

**Current site response:** The get-started page is honest about the requirement: "Iranti requires Node.js 18+ and PostgreSQL." It provides a Docker one-liner and frames friction as documented rather than hidden. The wizard (`iranti setup`) is described as walking users through the path.

**Grade: C+**

**Gap:** The site acknowledges the friction but does not adequately reduce it. The Docker command is present but buried in a side panel below the fold of the main install steps. More critically: the page does not answer "what if I don't want Docker?" with a managed Postgres recommendation. The README documents that the setup wizard can steer toward managed PostgreSQL with "concrete install guidance" — but the get-started page does not surface this path. For Persona B (the Claude Code user with minimal infra interest), the PostgreSQL requirement is likely to cause immediate abandonment. There is no zero-infrastructure path offered. This is the highest-impact conversion gap on the site.

---

### Objection 3: "Is this maintained? Who is behind it?"

**Current site response:** The hero badge shows `v0.2.12 — open source, AGPL`. The GitHub link is present in the hero. There is no team page, no company context, no contributor information, no commit frequency signal, and no "built by" attribution anywhere on the site.

**Grade: D**

**Gap:** This is the largest unaddressed trust gap on the current site. The README footer shows an individual email address (`oluwaniifemi.emmanuel@uni.minerva.edu`) which reveals this is a solo or very early-team project from a student/researcher background. That context is not inherently a disqualifier — many excellent open-source projects start this way — but a senior evaluator finding this via GitHub without a clear answer on the site will either distrust the project or mentally de-risk it by treating it as "experimental only." The site should have an explicit section that answers: who built this, what is the current development pace, and what is the roadmap commitment.

---

### Objection 4: "How does conflict resolution actually work in ambiguous cases? What happens when I can't avoid escalation?"

**Current site response:** The proof page shows the resolution logic pseudocode (confidence-based resolution, temporal tie-breaking, escalation for ambiguous cases). The product page mentions escalation to a "human queue." `iranti resolve` is referenced in the README but not the get-started page.

**Grade: B-**

**Gap:** The conflict resolution story is technically described but operationally incomplete on the site. A senior engineer's follow-up question is: "What does my operator workflow look like when conflicts escalate? How do I review and resolve them?" The `iranti resolve` CLI command and the Resolutionist component are not mentioned on the get-started page. The escalation path is described as "human queue" without showing what that queue looks like in practice. The `iranti chat /conflicts` command is described but not linked from the proof page where the objection naturally arises. This creates an information gap at exactly the moment the evaluator is most engaged.

---

### Objection 5: "AGPL means I can't use this in a commercial product without open-sourcing my changes."

**Current site response:** The badge says "open source, AGPL." There is no further explanation of licensing implications anywhere on the site.

**Grade: D**

**Gap:** AGPL is a significant licensing decision for any commercial team. The site surfaces the license name but does not explain it. For Persona C evaluating this for a company, the AGPL question is non-trivial — it affects whether the legal team will approve adoption. The site should have at minimum a one-paragraph honest explanation: what AGPL means for self-hosted use (fine for internal use), what it means for SaaS offering (modifications must be published), and what the future hosted product licensing model is expected to be. Not addressing this is a trust failure for commercial evaluators.

---

## 3. Trust Signal Gaps (Ranked by Impact)

### Gap 1 — No team or maintainer context (Critical)
**Impact:** Causes Persona C to classify the project as "unproven individual project" and deprioritize evaluation. Causes Persona B to wonder if it will be abandoned in 6 months.
**What is missing:** An "About" section or homepage block that says who built this, what their background is, what the development pace looks like, and what the commitment to the project is.
**Recommendation:** One honest paragraph in the footer or a dedicated lightweight "Built by" section. Does not need to be a company page. Does need to be something.

### Gap 2 — No zero-friction PostgreSQL path (High)
**Impact:** Kills conversion for Persona B before they reach the product value. High bounce rate on the get-started page for developers who do not already have PostgreSQL.
**What is missing:** A managed PostgreSQL option (Railway, Supabase, Neon) linked explicitly from the get-started page, or a "fastest path if you have no database" section.
**Recommendation:** Add a "No PostgreSQL yet?" callout block on the get-started page with three sub-paths: (a) local PostgreSQL, (b) Docker one-liner, (c) Supabase/Neon free tier.

### Gap 3 — No direct links to benchmark source code (High)
**Impact:** Proof page claims are not immediately verifiable. A skeptical engineer will not follow a trail that goes "see GitHub" → navigate to benchmark scripts. The friction reduces the credibility that the detailed methodology is trying to establish.
**What is missing:** Direct links to `clients/experiments/` files from the proof page.
**Recommendation:** Add links like "Run this experiment yourself → `clients/experiments/validate_nexus_treatment.py`" under each benchmark result.

### Gap 4 — No AGPL licensing explanation (High)
**Impact:** Commercial evaluators (Persona C) either dismiss the project due to licensing uncertainty or defer the decision pending legal review, which often means the decision never happens.
**What is missing:** A plain-language explanation of what AGPL means for (a) self-hosted internal use, (b) commercial SaaS offering.
**Recommendation:** Add a "License" section to the get-started page or footer with a 3-sentence plain-language explanation.

### Gap 5 — No security posture surface (Medium)
**Impact:** Any developer integrating infrastructure into an agent pipeline that touches proprietary code or data will ask: "Where does my data go? Is the API key model secure? What happens if Iranti is exposed?"
**What is missing:** A visible link to the security quickstart (`docs/guides/security-quickstart.md`) from the get-started page. A brief summary of the security model (scoped API keys, local-only data, TLS expectations for non-local deployments).
**Recommendation:** Add a "Security model" callout on the get-started page. The security-quickstart doc exists in the repo — the site just does not surface it.

### Gap 6 — No "what is shipped vs. what is coming" summary (Medium)
**Impact:** Without an explicit current-state summary, evaluators either assume more capability than exists (sets up disappointment) or assume less (undersells the product). The PRD names this as a first-class concern.
**What is missing:** A clear "What is live today" vs "What is on the roadmap" section, ideally on the homepage or product page.
**Recommendation:** A small "Shipped / Roadmap" table or callout. v0.2.12 is shipped, CLI-first, PostgreSQL-backed, MCP-integrated. Hosted product, operator UI, and broader benchmark program are roadmap items.

### Gap 7 — No data residency answer (Medium)
**Impact:** Any developer working with sensitive data will ask "where does this data live?" Self-hosted is actually the right answer to this concern — it is a selling point — but the site does not frame it as one.
**What is missing:** An explicit statement that all data lives in the user's own PostgreSQL instance. No data is sent to Iranti servers in the self-hosted model.
**Recommendation:** Add a "Your data stays yours" callout or sentence to the get-started page and the homepage.

### Gap 8 — No production usage signal (Low-Medium)
**Impact:** v0.2.12 on a solo project with no visible external users is a weak signal for production adoption. The site cannot manufacture adoption that does not exist yet, but it can frame the project's current stage honestly rather than implying more adoption than exists.
**What is missing:** The README's Gap Analysis is honest: "broad production adoption is still limited." The site does not reflect this honestly, but it also does not claim production scale. The gap is that there is no signal of any external use — no testimonials, no "used by," no case study even at the prototype level.
**Recommendation:** If any external users or design partners exist, surface even one brief quote or reference. If not, lean into the "install it, run your own experiments" narrative more explicitly.

---

## 4. Entry Path Analysis

### Path A: GitHub → Site

**Trigger:** Developer finds the repo through search, a mention, or GitHub trending. Clicks the site link in the README.

**First thing they read:** The hero — "Memory infrastructure for multi-agent AI." + the install badge + the proof strip numbers (20/20, 16/16, 4/4).

**What they know at this point:** They have already read some of the README. They understand the basic concept. They are on the site to see if it is more legible than the README or to validate the marketing.

**What action we want:** Click "See proof" (validation-seeking) or "View on GitHub" → Get Started (conversion-seeking).

**Current site quality for this path: Good.** The hero is technically credible and consistent with the README. The proof strip numbers are the right hook. The "Not an agent framework — the memory layer underneath one" line will resonate with this audience.

**Gap for this path:** After they click to the proof page and find the benchmark methodology credible, the natural next step is "how do I actually run this?" The proof page CTA routes to get-started, which is correct. But the get-started page hits them with the PostgreSQL requirement before they understand the full value. The conversion funnel loses velocity at exactly this moment.

---

### Path B: Hacker News → Site

**Trigger:** A Show HN post or link in a comment. The developer is curious but skeptical, has 60–90 seconds to decide if this is worth investigating further.

**First thing they read:** The hero H1 + subhead. They are looking for category clarity in 5 seconds. "Memory infrastructure for multi-agent AI" is clear enough to pass the first filter.

**What they expect next:** Either a concrete demo or an immediate proof mechanism. The proof strip numbers (20/20, 16/16) are helpful. The "See proof" link is the right CTA to have immediately adjacent.

**What action we want:** Proof page → "this is credible" → Get Started or GitHub.

**Gap for this path:** This path is the highest-risk for the "who is behind this?" objection. HN commenters will immediately ask whether this is a solo project, what the maintenance story is, and whether AGPL is an issue. The site cannot currently answer any of these questions without the user leaving for GitHub. The hero has no maintainer or team signal. For a HN audience, the lack of any company or team context can be disqualifying before they even reach the proof page.

**Recommendation:** A single sentence in the hero or hero badge area — even "built by [name], open source since [date]" — significantly improves the trust posture for this path.

---

### Path C: Search → Site

**Trigger:** A developer searches "multi-agent memory layer," "shared memory for AI agents," "persistent memory LangChain alternative," or similar. Iranti appears in results.

**First thing they read:** The meta description + page title. The current product page title is "Product — Iranti vs LangChain Memory, MemGPT, and Vector Databases." This is well-optimized for discovery intent.

**What they expect:** A comparison against the alternatives they are already evaluating. The product page delivers this — the vs. Vector DBs, vs. Memory Libraries, and vs. Frameworks sections are exactly the right content for this intent.

**What action we want:** Read comparisons → find Iranti differentiated for their specific use case → Get Started.

**Gap for this path:** The product page comparisons are strong but do not address the "who built this, can I trust it?" question that a visitor arriving cold from search brings with them. The conversion from comparison comprehension to install intent is blocked by the same trust gaps identified above. Additionally, the search visitor does not have the GitHub context the direct-from-GitHub visitor has. They need a tighter trust signal on the product page itself.

---

## 5. Install Friction Assessment

### Current Install Path

The site presents a 4-step install:
1. `npm install -g iranti`
2. `iranti setup` (guided)
3. `iranti run --instance local`
4. `iranti project init .`

This is a reasonable path for a developer who already has PostgreSQL running. The "friction documented honestly" headline is the right posture.

### The PostgreSQL Barrier

**Barrier level:** High for Persona B (Claude Code user). Medium-high for Persona A (multi-agent builder, likely already has Postgres). Low for Persona C (evaluator, has infrastructure).

**Realistic conversion impact:** A developer arriving at the get-started page who does not have PostgreSQL running locally is presented with a Docker one-liner as the primary alternative. The Docker path is real friction:
- Requires Docker installed and running
- Requires understanding that `docker run` creates a container that may not persist after reboot without additional configuration
- Does not tell the user what happens to their Iranti data if they stop the container

For Persona B specifically — the solo Claude Code user — this is likely a 60–70% bounce trigger. They will see "PostgreSQL requirement" and decide the setup cost exceeds the value of trying it.

**Comparison to alternatives:** Mem0 cloud, Zep cloud, and similar services offer a hosted API with an API key as the zero-friction path. Iranti's self-hosted-only model is a strategic choice (data ownership, AGPL model), but it means Iranti is competing with a meaningfully higher setup cost for first-time evaluators.

### What the README Reveals That the Site Does Not

The README documents that `iranti setup` can intelligently steer users to:
- Existing local PostgreSQL (bootstraps the database automatically)
- Docker-hosted PostgreSQL (guided)
- Managed PostgreSQL services (with concrete guidance)

None of this is visible on the get-started page. The page shows step 2 as `iranti setup` with a comment "walks through postgres, API keys, and project binding" — but this undersells what the wizard actually does. A developer who sees only the Docker one-liner may never run `iranti setup` and discover that the wizard could have found a path for them.

### Specific Recommendations

**R1 — Expand the PostgreSQL block significantly.**
Replace the current short "PostgreSQL requirement" callout with a three-path decision tree:
- "I have PostgreSQL locally" → `iranti setup` will detect and bootstrap it automatically
- "I want to use Docker" → the one-liner, plus a note about data persistence
- "I want a managed database" → links to Supabase free tier, Neon, Railway with one-sentence setup estimate

**R2 — Move the wizard description earlier.**
`iranti setup` is presented as step 2 with a brief comment. The wizard's intelligence (database detection, path recommendation, interactive guidance) is the main friction reducer. Surface this capability in the step description: "The setup wizard detects your local PostgreSQL, recommends Docker if absent, or guides you to a managed database."

**R3 — Add a "minimum time to value" estimate.**
The metadata title says "Self-Hosted Agent Memory in 4 Commands." A supporting line like "10 minutes if PostgreSQL is already running; 20 minutes with Docker from scratch" sets accurate expectations and prevents abandonment caused by underestimated setup time.

**R4 — Add a smoke-test command after step 4.**
After `iranti project init .`, the developer does not know if Iranti is working until they try to use it. A step 5 smoke test — perhaps `iranti handshake --task "test"` — closes the loop and gives immediate positive feedback that the system is functional.

**R5 — Address the Claude Code path prominence.**
For Persona B, the Claude Code path (Path 2 on the get-started page) is the primary entry point, not the generic quick install. The path selector tabs exist but are visually subtle. Consider promoting the Claude Code path to equal or greater prominence than the generic quick install for the above-the-fold viewport.

---

## 6. Summary of Priority Actions

| Priority | Issue | Page | Impact |
|---|---|---|---|
| P0 | No team/maintainer context | All pages (especially homepage) | Trust for Personas B and C |
| P0 | PostgreSQL path not explained fully | Get Started | Conversion for Persona B |
| P1 | No direct links to benchmark source | Proof | Credibility for Persona A and C |
| P1 | AGPL not explained | Get Started or Footer | Commercial adoption for Persona C |
| P1 | No managed Postgres recommendation | Get Started | Conversion for Persona B |
| P2 | Security posture not surfaced | Get Started | Adoption confidence |
| P2 | No "shipped vs. roadmap" table | Product or Home | Expectation setting |
| P2 | Data residency not called out | Get Started or Home | Trust for privacy-sensitive users |
| P3 | No smoke-test after install | Get Started | First-run success rate |
| P3 | No production usage signal | Home or Proof | Credibility for Persona C |

---

*Research method: Close reading of site source code, product README, comparison narrative, and PRD. No external user interviews conducted at this stage. Findings represent hypothesized developer behavior patterns based on the content audit and product characteristics. Recommend user testing with 3–5 real developers to validate or refute the high-priority objection hypotheses before making structural site changes.*
