# Analytics Plan — iranti.dev

## Provider

**Plausible Analytics** (https://plausible.io)

Plausible is a privacy-first, cookie-free analytics provider. The hosted plan is €9/mo with a 30-day free trial. It can also be self-hosted (open source, MIT). No API key or secret is required in this repository — the script only identifies the site via a public domain name (`iranti.dev`).

## Why Plausible over PostHog

| Concern | Plausible | PostHog |
|---|---|---|
| Bundle size | <1 KB | ~70 KB |
| Cookie use | None | Yes (session cookie) |
| GDPR compliance | By default | Requires configuration |
| Setup complexity | Script tag only | SDK + config |
| Self-hostable | Yes | Yes |
| Session replay | No | Yes |
| Feature flags | No | Yes |

For a pre-launch developer tool site where the primary goals are page-view visibility and CTA signal — not session replay or experimentation — Plausible is the right fit. PostHog should be reconsidered post-launch if deeper product analytics are needed.

## Account Setup

1. Go to https://plausible.io and sign up (no credit card required for trial).
2. Add `iranti.dev` as a site.
3. Plausible will confirm the domain is live by detecting the script.
4. No API key or token needs to be added to this repository. The `data-domain` attribute in `layout.tsx` is a public identifier.

For self-hosted deployment, see https://plausible.io/docs/self-hosting.

## What We Track

### Page Views (automatic)

Plausible automatically records a page view on every navigation. No additional code is required.

| Signal | Why |
|---|---|
| `/` | Hero impressions and overall traffic |
| `/proof` | Interest in benchmarks — a quality signal for serious evaluators |
| `/get-started` | Install intent |
| `/integrations` | Integration interest by framework |
| `/blog/*` | Content engagement |

### Custom Events

Custom events are fired via `trackEvent()` in `src/lib/analytics.ts`.

| Event name | Properties | Source | Why we track it |
|---|---|---|---|
| `install_copy` | — | `Hero.tsx` | Strongest install intent signal. A developer who copies the install command is seriously considering adoption. |
| `step_copy` | `step: string` | `GetStartedContent.tsx` | Which step in the get-started flow generates friction or interest. Useful for copy and UX optimisation. |

#### `install_copy`

Fired when the user clicks the clipboard button next to `npm install -g iranti` in the hero section.

No properties. Volume of this event is the primary pre-launch conversion proxy.

#### `step_copy`

Fired when the user copies any code block on the Get Started page that is part of the numbered step flow.

Property `step` is the human-readable label of the step, e.g.:

- `"Install the CLI"`
- `"Run guided setup"`
- `"Start your instance"`
- `"Bind your project"`

This lets us see which commands people copy most and which steps cause abandonment.

## Privacy Posture

- **No cookies.** Plausible does not set any cookies on visitor devices.
- **No PII.** No names, emails, IPs, or fingerprints are stored. Plausible uses a daily rotating salt hash for unique visitor counting — it cannot be reverse-engineered to identify an individual.
- **No cross-site tracking.** Data collected on `iranti.dev` stays on `iranti.dev`.
- **GDPR / CCPA compliant by default.** Because no personal data is collected, no cookie banner is required.
- **No data sold.** Plausible's business model is subscription-based, not advertising.

Full Plausible data policy: https://plausible.io/data-policy

## Implementation Files

| File | Role |
|---|---|
| `src/app/layout.tsx` | Loads the Plausible script in `<head>` via `<script defer data-domain="iranti.dev" src="https://plausible.io/js/script.js" />` |
| `src/lib/analytics.ts` | `trackEvent(name, props?)` wrapper — guards against SSR and ad-blocker environments |
| `src/components/Hero.tsx` | Calls `trackEvent("install_copy")` on clipboard copy |
| `src/components/GetStartedContent.tsx` | Calls `trackEvent("step_copy", { step })` via `CodeBlock` `onCopy` callback |

## Future Events to Consider (post-launch)

| Event | Trigger | Value |
|---|---|---|
| `github_click` | Click on "View on GitHub" CTA | Direct repo intent signal |
| `proof_view` | Scroll past benchmark table on `/proof` | Engagement depth |
| `integration_click` | Click on an integration card | Framework demand signal |
| `doc_link_click` | Outbound click to GitHub docs | Docs navigation signal |

These can be added incrementally using the same `trackEvent` wrapper.
