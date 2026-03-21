# Contributing

This is the site repo for Iranti. It builds the public product site, not the Iranti product itself.

---

## Running the Site Locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`. There is no database, backend, or external service required to run the site in development.

```bash
npm run build   # production build
npm run lint    # lint check
```

---

## Pull Requests

PRs go against `master`. No special review process — open a PR, describe what changed and why, and request a review.

Keep PRs focused. A PR that touches both content and visual system components is harder to review than two separate PRs.

---

## Project Structure

```
src/app/             Pages and root layout (Next.js App Router)
src/components/      One file per section component
docs/prd/            Product requirements — read before changing messaging
docs/roadmap.md      Phased roadmap — current status per phase
docs/backlog.md      Prioritized backlog per epic
docs/tickets/        Individual epic (site-eXXX) and feature (site-fXXX) tickets
docs/visual-system.md    Design system specification
docs/theme-token-map.md  CSS token reference — read before adding new colors
docs/templates/      Reusable doc templates
```

---

## Agents

This repo uses Claude Code with a set of specialist agent definitions in `.claude/agents/`. Each agent file defines a role, its scope, and its operating context. The active agents are:

| Agent file | Role |
|---|---|
| `product-manager.md` | Product decisions, acceptance criteria, roadmap |
| `brand-strategist.md` | Visual direction, tone, messaging constraints |
| `site-architect.md` | Page structure, routing, information architecture |
| `frontend-developer.md` | Component implementation, theme system |
| `content-strategist.md` | Copy, messaging, comparison content |
| `seo-growth.md` | SEO metadata, structured data, performance |
| `qa-engineer.md` | Acceptance testing, visual regression, cross-browser |
| `technical-writer.md` | Docs, tickets, templates, README |
| `backend-developer.md` | Any server-side or API work |
| `devops-engineer.md` | Build, deploy, environment |
| `user-researcher.md` | Audience research, positioning validation |

To invoke a specific agent in Claude Code, ask it to act as that agent or run a sub-agent session using that file as context.

---

## Iranti Memory Layer

This repo uses [Iranti](https://github.com/nfemmanuel/iranti) as a shared memory layer for AI agent collaboration. Agents read from and write to Iranti to keep decisions, research, and status synchronized across sessions.

If you are working with AI agents on this repo, Iranti is expected to run at `http://localhost:3001`. The project binding lives in `.env.iranti`.

To start Iranti (in a separate terminal):

```powershell
iranti run --instance local
```

To bind this repo to the local instance:

```powershell
iranti project init . --instance local --agent-id site_main --mode isolated
iranti claude-setup .
```

Human contributors working without AI agents do not need to run Iranti.

---

## Product Docs

Before changing messaging, page content, or information architecture, read:

- `docs/prd/site-prd.md` — product requirements and acceptance criteria
- `docs/roadmap.md` — what is done, what is in progress, what is pending
- `docs/backlog.md` — prioritized item list per epic

Do not change product strategy, positioning, or roadmap sequencing without PM review.
