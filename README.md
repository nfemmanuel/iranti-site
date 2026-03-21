# iranti-site

The public product site for [Iranti](https://github.com/nfemmanuel/iranti) — memory infrastructure for multi-agent AI.

This repo builds [iranti.dev](https://iranti.dev). It is a marketing and product site, not the Iranti product itself. The goal is to explain what Iranti is, prove its credibility with real benchmarks, and route visitors to install, docs, and GitHub.

---

## Tech Stack

- **Next.js 15** (App Router, static export)
- **TypeScript**
- **Tailwind CSS v4**
- **React 19**

---

## Run Locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

---

## Build

```bash
npm run build
```

Outputs a static site to `.next/`. Run `npm start` to serve the production build locally.

---

## Lint

```bash
npm run lint
```

---

## Contributing

PRs go against `master`. No special setup beyond `npm install`.

If you are working with the Iranti shared memory layer, see [CONTRIBUTING.md](./CONTRIBUTING.md) for how agents, Iranti, and the development workflow fit together.

---

## Repo Layout

```
src/app/             Next.js pages and root layout
src/components/      React components (one per section)
docs/                Product docs, roadmap, backlog, tickets, templates
docs/prd/            Product requirements document
docs/tickets/        Individual epic and feature tickets
.claude/agents/      Specialist agent instructions for Claude Code
CLAUDE.md            Project operating context for AI agents
```

---

## The Iranti Product

The Iranti product itself lives at: **[github.com/nfemmanuel/iranti](https://github.com/nfemmanuel/iranti)**

This repo is only the site. Do not file product issues here.
