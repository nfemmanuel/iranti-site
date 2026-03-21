# Iranti Site - Project Operating Context

## Mission
Build the Iranti site as the public technical product surface for Iranti: a site that explains the product, proves its credibility, communicates benchmarks honestly, guides people into installation and docs, and turns curiosity into serious evaluation or adoption.

## Product Source Of Truth
Primary product document:
- `docs/prd/site-prd.md`

Supporting planning artifacts:
- `docs/roadmap.md`
- `docs/backlog.md`
- `docs/tickets/`

No major product or messaging decision should drift away from those artifacts.

## Shared Memory - Iranti
This project uses Iranti as the shared memory layer for all collaborating agents.
Iranti is expected to run at `http://localhost:3001`.
Project binding should live in `.env.iranti`.

Every agent should:
1. handshake at session start
2. query Iranti before making important product, brand, technical, or messaging decisions
3. write back stable findings, decisions, blockers, and completed work
4. record assumptions instead of inventing certainty
5. check with the PM before changing product strategy, positioning, information architecture, naming, roadmap, or acceptance criteria

## PM Coordination Rule
This repo's Product Manager must also stay aligned with the control-plane PM in:
- `C:\Users\NF\Documents\Projects\iranti-control-plane`

That means:
- periodically read the control-plane PRD, roadmap, and backlog
- identify shared assumptions about Iranti's positioning, onboarding, product surfaces, operator workflows, and roadmap sequencing
- write alignment notes back into Iranti so both PMs can discover the current state
- avoid brand or product-language drift between the site and the control-plane effort

The PM does not need to block on direct conversation every time, but it must actively synchronize assumptions.

## Delivery Hierarchy
For substantial work, maintain this structure:
1. PRD
2. roadmap
3. backlog
4. epics
5. features
6. stories
7. tasks
8. subtasks

## Quality Standard
All agents should operate at senior level or better:
- strong reasoning
- deep research when needed
- explicit tradeoffs
- PR-quality artifacts
- no low-effort filler

## Product Expectations
- The site must be technically credible.
- The site must make Iranti legible to developers, evaluators, and future customers.
- The site must be beautiful in both light and dark mode.
- The site must avoid generic AI startup aesthetics.
- The site should treat install, proof, docs routing, and conversion as first-class concerns.
- The site should help visitors understand that Iranti is memory infrastructure, not an agent framework.

## Starting Iranti From This Repo
Use a separate terminal:

```powershell
iranti run --instance local
```

Recommended local commands:

```powershell
iranti doctor --instance local
iranti project init . --instance local --agent-id site_main --mode isolated
iranti claude-setup .
```

## Core Agent IDs
- PM: `product_manager`
- User Research: `user_researcher`
- Brand Strategy: `brand_strategist`
- Site Architect: `site_architect`
- Backend: `backend_developer`
- Frontend: `frontend_developer`
- DevOps: `devops_engineer`
- Content Strategy: `content_strategist`
- SEO and Growth: `seo_growth`
- QA: `qa_engineer`
- Technical Writer: `technical_writer`

## Completion Rule
A task is not done when copy or code exists.
A task is done when:
- acceptance criteria are explicitly checked
- risks are documented
- relevant evidence exists
- PM has enough evidence to accept the work

## Suggested Iranti Entities
- `project/iranti_site`
- `agent/[agent_id]`
- `decision/[topic]`
- `research/[topic]`
- `roadmap/[phase_or_theme]`
- `ticket/[ticket_id]`
- `message/[theme]`
- `blocker/[topic]`
