# site-f003 — Feature: /get-started Page

**Type:** Feature
**Status:** Not Started
**Priority:** P0
**Epic:** site-e001 (Multi-Page Routing)
**Phase:** 2 — Core Build

---

## Problem

The homepage Install section (`Install.tsx`) provides the four-command quickstart path plus code examples for Python, Claude Code, Codex, and the TypeScript SDK. This is a good overview but is not sufficient as the primary install and onboarding surface because:

- It has no explanation of isolated vs shared mode — one of the most consequential decisions a new user makes
- It has no PostgreSQL setup guidance beyond "requires PostgreSQL"
- It does not route to the Claude Code guide, Codex guide, or quickstart guide in any structured way
- There is no post-install verification step
- It cannot be linked to directly as a canonical "get started" URL

The PRD requires a Get Started page that "reduces fear about setup friction rather than hiding it."

---

## Value

- A canonical, shareable URL for getting started with Iranti
- Covers the decisions a new user actually needs to make (mode, database, integration)
- Routes different user types to the right sub-guides (developers using Claude Code, developers using raw API, etc.)
- Reduces setup confusion which is a known friction point per the PRD

---

## Scope

### Sections to Include
1. **Prerequisites** — Node.js 18+, PostgreSQL (local, Docker, or managed), and npm. Honest about what Docker provides and what you need to do without it.
2. **The four commands** — Matching `Install.tsx` but with expanded annotations for each step
3. **Mode selection** — Isolated vs shared mode explained simply: isolated means one PostgreSQL database per project (the new default as of 0.2.10), shared means a single instance serves multiple projects. Decision guide: when to use each.
4. **PostgreSQL options** — Three paths: local Postgres, Docker (`docker-compose.yml` in the repo), and managed (e.g. Supabase, Railway). Honest about trade-offs.
5. **Verification** — `iranti doctor` output to confirm setup is healthy. What healthy looks like vs what common errors mean.
6. **Integration routing** — Three paths: Claude Code (link to guide), Codex (link to guide), raw API (link to quickstart). Clear cards for each with the one command to run.
7. **What to do if something fails** — `iranti doctor --debug`, `--verbose` flag, GitHub Issues.

### Out of Scope
- Full integration-specific documentation (belongs in the guides on GitHub)
- Hosted product setup (not yet available)

---

## Dependencies

- site-e001 — routing must be wired
- site-e002 — light mode must be functional
- Upstream guide links must be verified as accessible on GitHub:
  - `docs/guides/quickstart.md`
  - `docs/guides/claude-code.md`
  - `docs/guides/codex.md`

---

## Acceptance Criteria

- [ ] `/get-started` resolves and renders without errors
- [ ] All four install commands are present and accurate against current CLI surface
- [ ] Isolated vs shared mode is explained clearly with a decision guide
- [ ] PostgreSQL options are presented honestly (local, Docker, managed)
- [ ] `iranti doctor` is mentioned as the verification step
- [ ] Integration routing cards link to Claude Code guide, Codex guide, and quickstart
- [ ] `iranti doctor --debug` flag is mentioned for troubleshooting (verified against CHANGELOG 0.2.12 which added `--debug` and `--verbose`)
- [ ] Page has a distinct `<title>` and `<meta description>`
- [ ] Page renders correctly in both modes and is responsive

---

## Risks

- Setup friction is real — if the page tries to hide it, it will lose credibility. If it dwells on it too long, it will create anxiety. Tone calibration is critical.
- The Codex launch step (`codex -C /path/to/your/project`) shown in `Install.tsx` requires the Codex CLI to be separately installed and in PATH — this needs to be stated on the page

---

## Open Questions

- Should the page include Docker Compose instructions inline, or link out to the repo?
- Is there a recommended managed PostgreSQL provider the team wants to suggest, or should it remain provider-agnostic?
- Should setup modes (isolated vs shared) be shown as a visual step-selector or as a toggle that switches the command view?

---

## Definition of Done

- Page is live at `/get-started`
- Content is PM-approved and technically accurate
- All acceptance criteria are checked
- Page is included in `sitemap.xml`
- At least one team member has run through the steps on the page and verified they are accurate
