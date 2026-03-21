# site-e004 — Epic: Contact and Waitlist Conversion Surface

**Type:** Epic
**Status:** Not Started
**Priority:** P1
**Phase:** 3 — Conversion and Polish

---

## Problem

Iranti currently has no mechanism for capturing serious evaluator interest. The site routes visitors to GitHub, docs, and install — which is correct for self-serve evaluation — but provides no path for:

- A founder who wants to discuss design partnership
- An engineering team that wants hosted memory without running PostgreSQL themselves
- A researcher who wants to be notified when the hosted version launches
- A developer who has a question that GitHub Issues is not the right surface for

The footer has GitHub links and a "Get started" CTA. There is no form, no email capture, and no "contact us" path. Evaluators who reach the end of the page with serious intent have nowhere to go except a cold GitHub issue.

---

## Value

- Enables Iranti to capture design partner leads before a hosted product exists
- Provides a waitlist surface for the hosted version (Phase 8 in AGENTS.md build status)
- Gives the PM a signal about evaluation-stage interest beyond GitHub star counts
- Removes the dead-end that currently exists at the bottom of the page for serious evaluators

---

## Scope

### In Scope
- A contact or waitlist section — either as a footer extension, a dedicated section on the homepage, or a lightweight `/contact` page
- A simple form: name, email, "what are you building?" (optional), and a submit action
- Copy framing that is honest about current state — open source is ready, hosted is coming
- A backend endpoint or third-party form service to receive submissions (e.g. Resend, Formspree, or a simple serverless function)
- A confirmation state after form submission
- An honest note that this is for "serious evaluation, design partners, and hosted waitlist" — not general support

### Out of Scope
- Full CRM integration in v1
- Newsletter or content marketing email sequences
- Live chat or support ticketing
- A managed hosted product — this surface only captures interest

---

## Dependencies

- Decision on form backend (Resend API, Formspree, or custom serverless) — PM and DevOps decision
- Copy approval from PM — the framing of "design partner" vs "waitlist" vs "contact" matters

---

## Acceptance Criteria

- [ ] A form surface exists and is reachable from at least the homepage footer and the Get Started section
- [ ] Form collects: name, email, and optional "what are you building?" field
- [ ] Form submits successfully and shows a clear confirmation state
- [ ] Form submission delivers the inquiry to the team (via email, Slack, or a submissions inbox)
- [ ] Copy is honest: makes clear Iranti is open source now and hosted is coming
- [ ] Form does not promise specific response times or SLAs
- [ ] Form renders correctly in both light and dark mode
- [ ] Form is accessible: keyboard navigable, properly labeled, error states are visible

---

## Risks

- If form backend is not decided early, this blocks build
- Framing must not over-promise the hosted product timeline or features
- Spam without CAPTCHA or honeypot protection — minimal but real concern

---

## Open Questions

- What email address or Slack webhook receives form submissions?
- Should the form call it "design partner inquiry", "hosted waitlist", or "contact" — or offer a radio button for intent?
- Is there a target response time the team is willing to commit to?

---

## Definition of Done

- Form surface is live and reachable
- A test submission has been verified end-to-end (form to inbox)
- PM has approved the copy
- Form renders correctly in both modes and is accessible
- Submission confirmation state exists and is not confusing
