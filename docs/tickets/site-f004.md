# site-f004 — Feature: /integrations Page

**Type:** Feature
**Status:** Not Started
**Priority:** P1
**Epic:** site-e001 (Multi-Page Routing)
**Phase:** 2 — Core Build

---

## Problem

The homepage Integrations section (`Integrations.tsx`) provides a six-card grid with CLI commands and tier labels (Native, Validated, General). It is good as a snapshot but is insufficient as a primary integration reference because:

- There is no per-integration setup explanation
- There is no link to the per-integration guides in the Iranti repo
- The honest boundary note about browser-tab injection is correct but needs more context for evaluators who expect more from "Any LLM"
- There is no MCP-specific section even though MCP is a first-class integration mode for both Claude Code and Codex

---

## Value

- Gives developers a canonical URL to understand how Iranti integrates with their stack
- Reduces "can I use this with X?" questions by being comprehensive about what is and isn't supported
- Routes each integration type to the right guide without forcing visitors to dig through GitHub

---

## Scope

### Sections to Include
1. **Integration philosophy** — Iranti is a layer underneath your tools. It does not replace or wrap your framework — it gives it memory. Framework-agnostic because all integrations use the same REST API and SDK.
2. **Native integrations** — Claude Code and Codex: what "native" means (MCP server + hooks), the single setup command for each, and a link to the relevant guide
3. **Validated integrations** — CrewAI, LangChain, Raw OpenAI API: what validation means (experiments run, results documented), the Python install command, links to usage examples
4. **General API integration** — TypeScript SDK (`@iranti/sdk`) and Python client (`iranti`), REST API basics, the middleware pattern
5. **What is not supported** — Browser-tab injection, Claude.ai web UI, ChatGPT web UI. Honest explanation of why (CSP, no programmatic access) and what the correct path is instead (API-based middleware)
6. **CTA** — Get Started, GitHub

### Out of Scope
- Full per-integration documentation (remains in GitHub guides)
- LLM provider management (separate from integrations — this is about agent frameworks and tools, not model providers)

---

## Dependencies

- site-e001 — routing must be wired
- site-e002 — light mode must be functional
- Guide links verified accessible:
  - `docs/guides/claude-code.md`
  - `docs/guides/codex.md`
  - `docs/guides/quickstart.md`

---

## Acceptance Criteria

- [ ] `/integrations` resolves and renders without errors
- [ ] Claude Code integration section references `iranti claude-setup` as the setup command (verified against CHANGELOG 0.2.6)
- [ ] Codex integration section references `iranti codex-setup` as the setup command (verified against CHANGELOG 0.2.6)
- [ ] CrewAI, LangChain, and OpenAI API sections reference `pip install iranti` and link to usage examples
- [ ] MCP is explained as the protocol used by both Claude Code and Codex
- [ ] Browser-tab injection limitation is explained with the reason (CSP) and the correct alternative path
- [ ] All integration descriptions are accurate against the current CLI surface (`AGENTS.md` CLI section and CHANGELOG)
- [ ] Page has a distinct `<title>` and `<meta description>`
- [ ] Page renders correctly in both modes and is responsive

---

## Risks

- The "Any LLM / Middleware" card references `IrantiMiddleware` with `before_send()` and `after_receive()`. This should be verified against the middleware client (`clients/middleware/`) to ensure the API matches.
- Integration guides on GitHub must exist and be reachable — if they are incomplete the page should still route there with a "guide in progress" note rather than omitting the link

---

## Open Questions

- Should the middleware client be listed more prominently given it enables the widest range of integrations?
- Should `iranti chat` be listed as an integration surface here? It is mentioned in the AGENTS.md CLI surface but not on the homepage Integrations section.

---

## Definition of Done

- Page is live at `/integrations`
- Content is PM-approved and technically accurate against current CLI surface
- All acceptance criteria are checked
- Page is included in `sitemap.xml`
