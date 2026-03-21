# Iranti Site PRD

## Problem
Iranti has strong technical substance, but today the public surface is fragmented across the repo README, guides, release notes, benchmarks, and live CLI experiences. That creates a trust and conversion gap.

A developer can find Iranti, but they cannot immediately understand:
- what category it belongs to
- why it is different from vector databases, memory libraries, or agent frameworks
- whether it is real and technically credible
- how to install it
- what proof exists that it works
- what to do next after first curiosity

The missing product is not a prettier landing page. The missing product is a serious technical product site.

## Vision
Build a public site for Iranti that acts as:
- the best explanation of the product
- the most credible proof surface for benchmarks and validation
- the cleanest routing layer into docs, install, GitHub, and integrations
- the first serious conversion surface for design partners, self-hosters, and future customers

The site should feel like technical infrastructure with taste, not generic AI startup wallpaper.

## Product Principles
- Technical first: the site must survive scrutiny from serious engineers.
- Honest proof: claims must map back to real code, docs, benchmarks, and limitations.
- Clear routing: every page should tell visitors what to do next.
- Distinctive design: beautiful in light and dark mode without looking like any default SaaS template.
- Category clarity: Iranti is memory infrastructure, not an agent framework.
- Product alignment: the site must track the real state of the Iranti repo and releases.

## Target Users
### Primary
- developers evaluating Iranti for local or multi-agent use
- technical founders exploring shared memory infrastructure
- early design partners who want confidence before investing time

### Secondary
- open-source observers comparing Iranti against other memory systems
- future hosted-product evaluators
- technical writers, researchers, and community members who need one canonical explanation surface

## Core User Jobs
1. Understand what Iranti is in under one minute.
2. Understand why Iranti is different from vector DBs, memory libraries, and frameworks.
3. Verify that Iranti is real through evidence, not slogans.
4. Get from curiosity to install or docs quickly.
5. See integrations and supported workflows clearly.
6. Understand what is shipped now versus what is future-looking.
7. Find the right next action based on intent: install, docs, GitHub, benchmark, contact, or waitlist.

## Non-Goals
- become a vague all-purpose AI company homepage
- replace the docs site entirely
- hide limitations behind copywriting
- overload the site with every internal implementation detail
- build the hosted product itself in v1

## Desired Outcomes
- more users reach install/docs instead of bouncing from the README
- evaluators can understand the product without reading the entire repo first
- benchmark credibility becomes easier to communicate
- the site becomes the source of truth for public-facing product framing
- launch surfaces like Show HN, paper links, docs links, and GitHub all have a coherent home

## Product Scope
### Included In v1
- homepage
- product overview / how it works
- proof / benchmark page
- integrations page
- install / get started page
- open-source / docs routing
- future hosted / contact / waitlist surface
- light and dark themes
- responsive layout
- credibility/trust sections driven by real repo facts

### Likely Included In v1.1
- comparison pages
- dedicated benchmark methodology page
- changelog/release surface
- design partner/contact conversion form
- newsletter or launch updates capture

### Deferred
- full docs hosting replacement
- customer dashboard
- live control-plane experience
- full hosted onboarding

## Information Architecture
### Primary Pages
1. Home
2. Product
3. Proof
4. Integrations
5. Get Started
6. Docs Gateway
7. Open Source / GitHub
8. Hosted Future / Contact

### Recommended Hero Outcome
A visitor should leave the hero knowing:
- Iranti is memory infrastructure for multi-agent AI systems
- it is identity-first, conflict-aware, and persistent
- it is open source and installable now
- there is real proof behind the claim

## Homepage Requirements
The homepage must include:
- sharp category statement
- short explanation of the problem Iranti solves
- clear explanation of why vector DBs/framework memory are insufficient alone
- evidence section with real numbers
- architecture/Staff overview at a digestible level
- CTA block for install, docs, GitHub, and proof
- integrations snapshot
- honest note on what is currently shipped versus future hosted ambitions

## Proof Page Requirements
The proof surface should include:
- retrieval validation highlights
- conflict benchmark framing
- consistency validation highlights
- explicit honesty about benchmark scope and limitations
- links back to public docs or repo references where possible

It must avoid overclaiming. The framing should be:
- strong
- specific
- technically defensible

## Install/Get Started Requirements
This page must:
- show the fastest clean setup path
- explain isolated vs shared mode simply
- explain PostgreSQL/Docker expectations honestly
- route to docs, Claude Code, Codex, and chat guides
- reduce fear about setup friction rather than hiding it

## Integrations Requirements
The integrations page must cover:
- Claude Code
- Codex
- MCP
- API wrapper usage
- `iranti chat`
- the honest boundary that browser-tab ChatGPT/Claude injection is not the supported path

## Open Source And Conversion Requirements
The site should route visitors cleanly to:
- GitHub
- docs
- releases
- roadmap or future direction
- contact or waitlist for serious interest

This should not feel like hard sell.
It should feel like a technically mature invitation to engage.

## Visual Direction
The site must be visually distinctive.
Requirements:
- elegant but bold light mode
- equally intentional dark mode
- no default purple AI gradients
- no generic blue-gray enterprise dashboard look
- typography should feel chosen, not defaulted
- motion should support understanding, not decoration
- sections should feel editorial and product-grade, not template stitched

## Brand And Messaging Requirements
The messaging must:
- keep category clarity front and center
- explain why exact identity retrieval matters
- explain why conflict handling matters
- avoid promising AGI memory magic
- keep the product grounded in concrete capabilities
- align with the real CLI/docs/README state of the main Iranti repo

## Upstream Alignment Requirement
The PM and relevant specialists must periodically review the upstream Iranti repo and control-plane repo so the site remains aligned with:
- actual onboarding flow
- actual CLI commands
- actual benchmark numbers
- actual integrations
- actual product boundaries

## Functional Requirements
1. Repo must support structured product work through PRD, roadmap, backlog, and tickets.
2. Claude agent system must be present with specialist instructions.
3. Repo must include clear commands for starting Iranti and binding the project.
4. Site planning must be decomposable into page-level and section-level work.
5. Messaging work must be traceable back to PM decisions and research.
6. Claims must be reviewable against source materials.

## Success Metrics
### Early
- homepage and key pages complete
- PM-approved messaging system
- usable launch-ready site direction
- clean routing to docs and GitHub

### Mid-term
- increase docs clickthrough from site
- increase install attempts from site
- better evaluator comprehension in user testing
- lower confusion around category and setup

## Risks
- the site could over-market and lose technical trust
- the site could under-design and look like internal docs instead of a serious product
- the site could drift away from upstream Iranti reality if PM alignment discipline fails
- proof framing could become dishonest if benchmark limitations are hidden

## Open Questions
- primary domain strategy
- hosted/waitlist surface timing
- whether docs should remain in repo-only form or get a more polished public docs shell
- whether the site should include a comparison matrix at launch or later

## Initial Product Recommendation
Start with:
1. homepage
2. product page
3. proof page
4. get started page
5. integrations page

That is the minimum credible site system.
