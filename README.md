# Iranti Site

Technical product site for Iranti.

This repo exists to build the public-facing site for Iranti as a technical product, not a generic marketing page.
The site should explain the product clearly, prove credibility, route visitors to install/docs/GitHub, and create a conversion surface for future hosted or commercial interest.

## Primary Jobs
- explain what Iranti is
- make the benchmark and architecture legible
- convert visitors to GitHub, docs, install, and contact/waitlist
- give evaluators confidence that Iranti is real infrastructure, not vague AI branding

## Start Iranti For This Repo
Open a separate terminal and run:

```powershell
iranti run --instance local
```

Check it:

```powershell
iranti doctor --instance local
iranti status
```

This repo is intended to bind to the local Iranti instance via `.env.iranti`.

## Common Local Workflow
From this repo:

```powershell
iranti project init . --instance local --agent-id site_main --mode isolated
iranti claude-setup .
```

Then open Claude Code in this repo.

## Repo Map
- `CLAUDE.md` - project operating context for Claude Code and agent collaboration
- `.claude/agents/` - specialist agent instructions
- `docs/prd/site-prd.md` - product requirements document
- `docs/roadmap.md` - phased roadmap
- `docs/backlog.md` - prioritized backlog
- `docs/tickets/` - ticket breakdowns

## Notes
- This site should be technical, credible, and visually distinctive.
- It should not look like generic AI startup wallpaper.
- It should stay tightly aligned with the real Iranti product and docs.
