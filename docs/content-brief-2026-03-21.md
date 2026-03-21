# Content Strategy Brief — 2026-03-21

**Author:** Content Strategist
**Scope:** Full site copy audit across all pages and homepage components
**Source materials:** All page and component source files, `docs/prd/site-prd.md`, `docs/comparison-narrative.md`

---

## 1. Per-Page Summary Table

| Page / Component | Headline Grade | CTA Grade | Key Issue | Recommended Copy Change |
|---|---|---|---|---|
| **Hero** (`Hero.tsx`) | A | B | The H1 is strong and specific. The proof strip numbers (e.g. `20/20 cross-session retrieval`) are unlabeled scores — a first-time visitor cannot decode what `c1/20` means without context. The primary CTA ("View on GitHub") outranks "See proof," but proof is the stronger trust builder at this stage. | Swap CTA priority: make "See proof" the amber primary button, relegate GitHub to the secondary. Add a one-line label under each proof strip stat (e.g. "20/20 facts retrieved across sessions"). |
| **WhyNotVectorDB** | A | C (no CTA) | The H2 is the best headline on the homepage — crisp, contrast-driven, memorable. The comparison table is well-structured. However, there is no closing CTA at the end of the section. A reader who finishes the table has no signal where to go. The section also has no direct link to the fuller comparison on /product. | Add a terminal CTA: "See the full comparison →" linking to /product. This section should not be a dead end. |
| **TheStaff** | B | C (no CTA) | "Five components. Called The Staff." is evocative branding but offers no value framing. A visitor who has not yet bought into Iranti's premise does not know why a named five-component system is meaningful. The staff card descriptions are good — dense but specific. | Reframe H2: "Five focused components. One coherent memory layer." Add a transitional sentence after the grid linking to the architecture section on /product. |
| **Proof** (homepage component) | A | B | "Validated results. Not marketing claims." is the sharpest H2 on the site. The honesty box is strong. Weakness: the B3 result (4/5, 80%) is shown in the external benchmarks section without the same level of framing as it gets on /proof/. In a quick scroll, 80% can read as a failure rather than a documented design property. | Promote the B3 framing note to a visible inline callout rather than a collapsed text block. Add a link: "Full methodology on /proof." |
| **Integrations** (homepage component) | B | B | "Works with your stack. Not instead of it." is serviceable but passive. The tier legend (Native / Validated / General) is visually present but unexplained in text. A visitor reading quickly will not know what "Native" means versus "Validated." The card grid is solid. | Add a one-sentence tier explanation in the subhead or as a legend annotation. Strengthen the H2: "Plug into every major agent stack." |
| **Install** (homepage component) | B | A | "Up in four commands." works. The PostgreSQL dependency is mentioned but not foregrounded — for many visitors this is the friction point. The code samples are good, but right-column content (Claude Code, Codex) could confuse a reader still on step 1 of setup. | Add "PostgreSQL required" as a visible badge next to the H2 rather than buried in prose. Right column should start with the Python client (the universal path) before jumping to integrations. |
| **Contact** | B | A | "Building something serious with Iranti?" is the right register — respectful, peer-to-peer. "Design Partners" label is well-placed. The mailto CTA is correct. However, the body paragraph ("before the hosted version ships") is the only place on the entire site that mentions a future hosted version. This is meaningful signal that is underweight. | Add one sentence to the body: "Hosted Iranti is in development — design partners get early access and direct influence on the hosted roadmap." This turns the contact into a more explicit invitation. |
| **/product** — Hero | A | A | "Memory infrastructure, not another framework." is the strongest H1 on any inner page. Consistent with the homepage hero. The subhead accurately defines scope (not orchestrator, not model provider). The mental model paragraph adds the `entity + key` lookup framing cleanly. | Minimal change needed. Consider adding a one-line proof anchor ("Validated with CrewAI 6/6, LangChain 5/5, raw API 5/5") in the subhead zone to give credibility before the reader reaches the comparison sections. |
| **/product** — Architecture section | B | C (no CTA) | "Five components. Called The Staff." is repeated verbatim from the homepage. The expanded description ("Each component has a single job...") is clearer here. The flow diagram in the code block is the best technical artifact on the page — but it lacks a heading or caption. | Differentiate the H2: "The Staff: five components, one clear interface each." Add a caption above the code block: "// how a write and a read flow through Iranti." Link to the GitHub AGENTS.md at the end of this section. |
| **/product** — vs Vector DB | A | C (no CTA) | The H2 is strong — identical to homepage, appropriate for section repetition. The paragraph adds a critical nuance absent from the homepage: "Vector databases are excellent tools; they are not memory infrastructure." This is exactly the right tone for evaluators. | Add a link to the comparison narrative source or /proof for readers who want to verify claims. No other substantive change needed. |
| **/product** — vs Memory Libraries | B | C (no CTA) | "Memory libraries store facts inside the agent. Iranti stores facts across agents." is a clean contrast. The three-card comparison (MemGPT/Letta, raw in-context, custom database) is thin compared to the richness of `docs/comparison-narrative.md`. The narrative document has deeper reasoning about why MemGPT/Letta's model is actually sophisticated — but architecturally limited for multi-agent — that would make this section far more credible to evaluators who know MemGPT. | Expand the MemGPT/Letta card with language from the comparison narrative: acknowledge the sophistication of the model, then clarify the architectural boundary ("the memory is owned by one agent instance"). Add a feature comparison table matching the format of the vs Vector DB section. |
| **/product** — vs Agent Frameworks | B | C (no CTA) | "Frameworks bundle memory inside orchestration. Iranti is memory infrastructure you plug frameworks into." is accurate. The validated proof box at the bottom is the strongest copy in this section. The three framework cards (LangChain, CrewAI, AutoGen) are thin — one sentence each. The comparison narrative has much more. | Add a feature comparison table (same format as vs Vector DB). Add AutoGen nuance: "conversation history sharing between agents is explicit and manual." This section is the weakest of the three comparisons. |
| **/product** — Capabilities | C | C (no CTA) | "Beyond write and read." is the weakest H2 on the product page — descriptive rather than value-driving. The capabilities cards are rendered by `ProductCapabilityCards` (not directly auditable from source), but the section label alone signals that this is an appendix, not a feature. | Rename H2: "The full capability surface." or "What you get beyond the basics." Add a terminal CTA from this section to /get-started. |
| **/product** — CTA | B | A | "Ready to evaluate?" is appropriate. "See the benchmark results, or go straight to install." gives clear choice. | No change needed. |
| **/proof** — Hero | A | A | "Validated results. Not marketing claims." is excellent. The three stat tiles (20/20, 16/16, 4/4) are clean. The subhead ("We used fictional entities and invented facts that no LLM can know from training data") is the single most important credibility sentence on the site — it explains why the numbers mean something. | This is the strongest hero on any inner page. No change to the core copy. Consider adding a one-line description beneath each stat tile (they currently have a label and a sub-label but the framing feels abbreviated). |
| **/proof** — Methodology | A | B | The three methodology cards (fictional entities, cross-process isolation, adversarial conflict design) are the right content. The "Honest scope" box is strong. No CTA from this section. | Add a link from the methodology section to the GitHub benchmarking repo so a skeptical evaluator can immediately click through. |
| **/proof** — Goal Validation | B | C (no CTA) | H2 "Goal Validation — Retrieval" is mechanical. The table itself is excellent — clear and readable. | Reframe H2: "Core goals: what Iranti was designed to prove." No other change needed. |
| **/proof** — Conflict Benchmark | A | B | "Adversarial conflict resolution — 4 suites × 4 tests = 16/16" is very specific. Good. The resolution logic code block is a highlight — showing the deterministic algorithm is the right kind of technical transparency. | This section is strong. Consider adding the B3 limitation note (80% on external benchmark, C2 known failure) as a cross-reference here to contextualize the 16/16 internal score. |
| **/proof** — Framework Compat section | C | B | The section is labeled "Framework Compatibility" but the H2 says "Consistency validation — 4/4." These are different things. The heading-to-content mismatch creates confusion. Framework compatibility results and write serialization consistency are two distinct claims that have been merged into one section. | Split into two distinct sections: "Framework Compatibility" (CrewAI/LangChain/OpenAI results) and "Write Serialization — Consistency" (the 4/4 result). Give each its own H2. |
| **/proof** — Source CTA | B | A | "Source is public" is fine. The pairing of GitHub → "Get started" is the right terminal action. | No change. |
| **/get-started** | A | A | "Up in four commands. Friction documented honestly." is the best H1 on any inner page. The honest acknowledgment of PostgreSQL and friction is exactly what a serious evaluator wants to see — it builds trust rather than undermining it. The path selector (Quick install / Claude Code / Codex / iranti chat) is excellent UX. | Minimal copy work needed. The bottom CTA ("Need help? Open an issue on GitHub.") is too modest — add "We respond to real setup questions" (already present) and promote it. Optionally add a "What does a successful first session look like?" callout with a two-sentence expected outcome. |
| **/integrations** — Hero | B | B | "Works with your stack. Not instead of it." is repeated from the homepage integrations section. For an inner page that is the dedicated integrations destination, this headline should work harder. The subhead adds the right framing ("framework-agnostic for everything else"). | Strengthen H1 for the page context: "Plug in from any framework. The memory layer is always portable." Alternatively: "Seven integrations. One shared knowledge base." |
| **/integrations** — Native section | A | A | The three native integration cards (Claude Code, Codex, iranti chat) are the best content blocks on this page — specific, command-driven, with setup times. The `iranti chat` description ("not an agent — a direct interface") is exactly the right framing. | No substantive change. Add a one-line outcome sentence to the Claude Code card: "After setup, every Claude Code session starts with relevant memory already in context." |
| **/integrations** — Validated section | A | A | The validated integrations (CrewAI, LangChain, OpenAI) with code snippets are strong. The scores (6/6, 5/5, 5/5) are correctly cited and linked to the entity names used in testing. | No change needed. |
| **/integrations** — General / Any LLM | C | C | "Any LLM via middleware" has no H2 context about what `IrantiMiddleware` is or why a developer would choose this path over the SDK directly. The section is the thinnest on the page — one paragraph and one command. | Add two sentences of context: when to use middleware versus SDK, and one concrete example of a pre/post hook scenario. |
| **/docs** — Hero | C | B | "Documentation. Full source on GitHub." is the lowest-performing H1 on the site. It is purely descriptive — it tells the reader where docs are, not what they will enable. | Replace with: "Learn Iranti. Guides and reference, versioned with the code." or "Everything you need to understand and operate Iranti." |
| **/docs** — Guides section | A | A | The four guide cards (Quickstart, Claude Code, Codex, Security) are well-structured, with time estimates and clear descriptions. | No change. |
| **/docs** — Concepts section | B | C | The six concept cards are informative but the section intro is one thin sentence ("Core model and vocabulary for understanding how Iranti works"). | Add a short paragraph explaining the mental model: "If you understand entity+key lookup, confidence scoring, and the Attendant's role, you understand Iranti." This frames the concepts as a system rather than a glossary. |
| **/docs** — API Reference placeholder | B | B | "The full REST API reference... are available in the GitHub repository." This is honest and appropriate for the current state. | No change. Add a note when a dedicated API reference page is available. |

---

## 2. Top 5 Highest-Impact Copy Improvements

### 1. Swap the Hero CTA priority

**Current state:** "View on GitHub" is the amber primary button. "See proof" is the secondary.

**The problem:** For most evaluators, proof is the higher-value destination — it's what converts curiosity into real engagement. GitHub is for people who have already decided to investigate. Proof is for the undecided.

**Recommended change:** Make "See proof" the primary amber CTA. Make "View on GitHub" the secondary bordered button. This single change directs more traffic to the site's best conversion surface.

---

### 2. Add a feature comparison table to the vs Memory Libraries section on /product

**Current state:** Three sparse cards with one sentence each.

**The problem:** The `docs/comparison-narrative.md` document contains a complete, detailed feature comparison table for this section (Section B), including cross-agent access, conflict detection, scale, and auditability. None of this is on the page. A developer evaluating Iranti against MemGPT or LangChain's ConversationBufferMemory needs this specificity.

**Recommended change:** Implement the feature comparison table from the comparison narrative document. Acknowledge MemGPT/Letta's sophistication before making the architectural boundary argument — this signals that the comparison is honest, not strawmanned.

---

### 3. Add a feature comparison table to the vs Agent Frameworks section on /product

**Current state:** Three sparse cards with one sentence each. The validated proof box at the bottom is good.

**The problem:** Same as the memory libraries section — `docs/comparison-narrative.md` has a full comparison table for this section (Section C) that maps cross-framework sharing, cross-run persistence, conflict handling, and auditability. None of this is on the page.

**Recommended change:** Implement the feature comparison table. The section currently reads as a claim with light evidence. The table makes it a claim with specific, auditable evidence.

---

### 4. Fix the heading-to-content mismatch on /proof Framework Compatibility section

**Current state:** Section label says "Framework Compatibility," H2 says "Consistency validation — 4/4," body talks about write serialization, but the cards show framework results (CrewAI, LangChain, OpenAI).

**The problem:** This is a genuine navigation failure. A developer scanning the page for framework compatibility results will find them under a heading that talks about consistency validation. The two concepts have been merged into one section incorrectly.

**Recommended change:** Split into two sections. "Framework Compatibility" covers the CrewAI/LangChain/OpenAI 5/5 and 6/6 results with the entity names and details. "Write Serialization" covers the 4/4 consistency result with the serialization explanation. Both sections are strong content — they just need to be separated.

---

### 5. Rewrite the /docs page H1

**Current state:** "Documentation. Full source on GitHub."

**The problem:** This is the most passive H1 on the site. Documentation is a destination, not a benefit. Telling someone the source is on GitHub is not a value statement — it is a location. Every other page on the site opens with a headline that communicates what the page enables.

**Recommended change:** "Learn Iranti. Guides and concept reference, versioned with the code." This maintains the honest signal about GitHub while framing the page as an enabling resource rather than an index.

---

## 3. Missing Content That Would Increase Conversion

### A. Pricing / Hosting Roadmap Clarity

The Contact section mentions "before the hosted version ships," but nowhere on the site is there a clear statement about what "hosted Iranti" means, when it might be available, or what self-hosting costs (infrastructure only? plus developer time?). A serious evaluator considering Iranti for production will want to understand the total cost of ownership.

**Recommended addition:** A one-paragraph "What's coming" section on /product or a dedicated future-state callout on the Contact section. Even a sentence like "Hosted Iranti is in development. Self-hosting requires PostgreSQL (your infrastructure, your cost) and Node.js 18+. Design partners shape the hosted offering." substantially reduces uncertainty.

### B. Security and Data Residency FAQ

The /docs page lists a "Security Quickstart" guide, which signals this exists in some form. But the site has no surface-level answer to the questions a serious evaluator will ask before recommending Iranti to a team: Where does data go? Who can access the knowledge base? What isolation guarantees exist between agents? Is there encryption at rest?

**Recommended addition:** A "Security posture" callout on /get-started or /integrations — 3-4 bullet points covering self-hosted data residency, API key authentication, agent isolation modes, and a link to the security quickstart guide. This does not require building new content — it surfaces what already exists in the repo.

### C. Real Use Cases / Worked Examples

The site explains what Iranti does but does not show what it produces. A developer can read every page and still not be able to picture Iranti running in their system. The comparison narrative uses a concrete example ("Agent A writes a deadline, Agent B needs to look it up by name") but this example only appears in running prose, not as a dedicated use case artifact.

**Recommended addition:** A "Use cases" section on /product or the homepage — 3 distinct scenarios with a name, a one-sentence problem, and a one-sentence Iranti solution. Examples: (1) Multi-agent research pipeline — multiple researcher agents write findings, one synthesis agent retrieves them without context sharing. (2) Long-running coding agent — facts written in one session are available in the next without prompting. (3) Conflict management — two agents with conflicting project data get automatic resolution or escalation to a human queue.

### D. What Happens at the Conflict Escalation Step

The site mentions "escalation to human review" several times but never explains what that looks like in practice. For an infrastructure product, the human-in-the-loop story is a selling point — but only if the evaluator understands the workflow. Currently the `Resolutionist` is described in TheStaff but the concrete UX ("the CLI walks you through competing facts") is not surfaced on the main site.

**Recommended addition:** One paragraph or callout on /product explaining the human escalation workflow: what the `escalation/active/` queue looks like, how the Resolutionist CLI works, and what resolution looks like from the operator's perspective. This is a differentiator versus tools that silently overwrite conflicting data.

### E. Changelog / Release Cadence Signal

The hero badge shows "v0.2.12 — open source, AGPL" but there is no link to a changelog, release notes, or commit history beyond GitHub. A developer evaluating whether Iranti is actively maintained will look for evidence of recent commits, release frequency, and responsiveness to issues.

**Recommended addition:** A "Recent releases" widget or a "Last updated" timestamp in the footer. Even a simple line like "v0.2.12 — released March 2026 — changelog on GitHub" with a direct link removes the ambient uncertainty about project health.

---

## 4. Tone and Consistency Notes

### What the site gets right

The site's overall register is technically confident without being arrogant, honest without being self-deprecating. The repeated use of the phrase "Setup friction is real — we document it honestly" is the best example of this tone. The "Honest scope" boxes throughout /proof are excellent. The disclaimer about browser-tab injection ("that is not what Iranti does") is specific and appropriately blunt.

The hero, WhyNotVectorDB, Proof, and /product comparison sections all sound like the same product and the same team. The code-forward aesthetic is consistent and appropriate for the audience.

### Where tone drifts or weakens

**The /docs H1 is the sole example of passive, descriptive copy.** Every other H1 and H2 on the site communicates a value or a contrast. "Documentation. Full source on GitHub." communicates a location. This is the one place where the voice drops from confident infrastructure product to directory sign.

**The TheStaff H2 ("Five components. Called The Staff.")** is internally consistent but potentially alienating to a first-time visitor who does not yet trust the branding. The copy leans on the name before earning it. On the homepage this arrives before the visitor has seen any proof. On /product it appears after stronger context, which is the better location.

**The Capabilities section on /product ("Beyond write and read.")** is the most generic headline on the product page. Every other section on /product has a specific contrast or a named claim. "Beyond write and read" is a placeholder headline that does not carry the section.

**The /integrations hero repeats the homepage integrations H2 verbatim** ("Works with your stack. Not instead of it."). This is understandable for brand consistency but creates a slightly flat experience for someone navigating from homepage → /integrations and reading the same line twice as the page hero.

### Specific vocabulary to standardize

The site alternates between:
- "knowledge base" and "memory layer" and "shared memory" — these are used somewhat interchangeably. A glossary or a deliberate choice in the PRD would help lock the primary term.
- "fact" and "entry" and "record" — the site predominantly uses "fact" which is correct and clear. A few places use "entry." Standardize on "fact."
- "agent" and "LLM" — the site correctly distinguishes these in most places but occasionally conflates them. Worth flagging for a final pass.

---

## 5. Comparison Narrative Usage on /product

`docs/comparison-narrative.md` is a strong, well-sourced document with three fully specified comparison sections. Here is the current implementation status:

| Section | Narrative Status | Site Status | Gap |
|---|---|---|---|
| Section A: vs Vector Databases | Complete specification | Implemented on homepage + /product | Site implementation captures the core contrast and feature table. The narrative's nuance about hybrid search coexistence ("Iranti and a vector DB can coexist") is present in prose on /product but not surfaced in the comparison table itself. Low-priority gap. |
| Section B: vs Memory Libraries | Complete specification | Partially implemented on /product (3 sparse cards) | The full feature comparison table from the narrative is absent. The MemGPT/Letta nuance (sophisticated per-agent model, architectural boundary) is absent. The in-context / raw accumulation framing is reduced to one sentence. High-priority gap — this is the content for `site-f006`. |
| Section C: vs Agent Frameworks | Complete specification | Partially implemented on /product (3 sparse cards + proof box) | The full feature comparison table from the narrative is absent. The "framework-agnostic" concrete definition ("any framework that can make an HTTP call") is absent. AutoGen's specific limitation is mentioned only in one card. High-priority gap — this is the content for `site-f007`. |

The comparison narrative explicitly flags Sections B and C as unimplemented (`site-f006`, `site-f007`). Those tickets should be treated as high-priority based on this audit. The current sparse card implementations are insufficient for serious evaluators comparing Iranti against MemGPT, LangChain ConversationChain, or CrewAI's built-in memory module.

---

## 6. PM Action Items

The following items require PM decision or prioritization before copy changes can be implemented:

1. **Hosted product positioning** — How explicitly should the site communicate the hosted roadmap? The Contact section implies it; no other section acknowledges it. Decision needed on how much forward-looking signal is appropriate at this stage.

2. **CTA hierarchy on hero** — Swap "View on GitHub" and "See proof" as primary/secondary CTAs. Low-risk change; high expected impact on proof page traffic.

3. **Prioritize site-f006 and site-f007** — The vs Memory Libraries and vs Agent Frameworks comparison tables are the most significant content gap on /product. The comparison narrative is written and ready for implementation.

4. **Vocabulary standardization** — Choose between "memory layer," "knowledge base," and "shared memory" as the primary term. "Knowledge base" appears most consistently in the code and the Staff cards; this is likely the right anchor term.

5. **/proof section mismatch** — The Framework Compatibility / Consistency Validation section heading mismatch should be treated as a bug, not a copy improvement. It requires no new content — just section restructuring.
