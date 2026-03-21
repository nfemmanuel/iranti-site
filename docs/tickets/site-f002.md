# site-f002 — Feature: /proof Page

**Type:** Feature
**Status:** Not Started
**Priority:** P0
**Epic:** site-e001 (Multi-Page Routing)
**Phase:** 2 — Core Build

---

## Problem

The homepage Proof section is a good summary — benchmark numbers, goal validation table, conflict benchmark table, framework compat table, and an honest scope box. But it is constrained by its position on a long-scroll homepage. A dedicated `/proof` page can:

- Show methodology, not just results
- Link directly to the test files in the Iranti repo
- Include the consistency model documentation
- Provide the context that makes the numbers credible to a skeptical engineer

The PRD explicitly requires a proof surface that is "strong, specific, and technically defensible."

---

## Value

- A shareable URL for the proof that can be posted to Show HN, technical discussions, and direct evaluator conversations
- Deeper credibility through methodology visibility, not just score display
- A clear home for future benchmark expansions as the research program grows

---

## Scope

### Sections to Include
1. **Proof header** — "Validated results. Not marketing claims." + the three headline numbers (16/16 retrieval, 16/16 conflict, 4/4 consistency)
2. **Methodology statement** — How the experiments were designed: fictional entities and invented facts that LLMs cannot know from training data; what reproducibility means here
3. **Goal validation table** — Full table from `Proof.tsx` (Easy Integration, Context Persistence, Cross-Agent Retrieval, Per-Agent Persistence, Response Quality)
4. **Conflict benchmark** — Full 4-suite table with explanations of what each suite tests (Direct contradiction, Temporal, Cascading, Multi-hop)
5. **Consistency validation** — 4/4 result with a plain-language description of what write serialization and read-after-write visibility mean
6. **Framework compatibility** — Raw OpenAI API (5/5), LangChain (5/5), CrewAI (6/6) results with time-to-complete context
7. **Honest scope** — Expanded from the homepage "Honest scope" box: what these experiments do not cover, what the broader benchmark program aims to address, links to relevant docs
8. **Links to source** — Direct links to benchmark files in the Iranti GitHub repo where available
9. **CTA** — Get Started, GitHub

### Out of Scope
- Benchmarks against competing tools (not yet run)
- Live/dynamic benchmark execution on the site

---

## Dependencies

- site-e001 — routing must be wired
- site-e002 — light mode must be functional
- Benchmark methodology docs in the Iranti repo (`docs/internal/conflict_benchmark.md`, `docs/internal/consistency_model.md`) should be verified accessible and linked

---

## Acceptance Criteria

- [ ] `/proof` resolves and renders without errors
- [ ] All three headline numbers (16/16 retrieval, 16/16 conflicts, 4/4 consistency) are present and accurately sourced from the upstream README
- [ ] Methodology section explains experiment design in plain language
- [ ] Honest scope section is present and makes clear what the benchmarks do and do not cover
- [ ] At least one direct link to a source file or methodology doc in the Iranti repo
- [ ] Framework compatibility section present with accurate scores
- [ ] Page has a distinct `<title>` and `<meta description>`
- [ ] Page renders correctly in both modes and is responsive

---

## Risks

- The conflict benchmark had an earlier published baseline of 7/16 (in CHANGELOG 0.2.0). The current state is 16/16. The page should acknowledge the improvement was made through ongoing development, not present 16/16 as if it was always the result.
- Framework compat tests show entity names (project/void_runner, project/stellar_drift, project/nexus_prime) — these are fine as test artifacts but the page should clarify they are fictional test identifiers

---

## Open Questions

- Should the page link directly to the test runner files in the repo, or only to the methodology documentation?
- Should "16/16 conflicts" be broken down as "4 suites × 4/4 each" prominently, or is the aggregate number sufficient at the top?

---

## Definition of Done

- Page is live at `/proof`
- Content is PM-approved for accuracy and tone
- All acceptance criteria are checked
- "Honest scope" section passes the tone bar — strong, specific, not apologetic, not hiding anything
- Page is included in `sitemap.xml`
