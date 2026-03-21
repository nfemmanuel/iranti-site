# site-f008 — Feature: Contact and Waitlist Section

**Type:** Feature
**Status:** Not Started
**Priority:** P1
**Epic:** site-e004 (Contact and Waitlist Conversion Surface)
**Phase:** 3 — Conversion and Polish

---

## Problem

Visitors who reach the end of the page with serious intent — a founder, a technical lead evaluating Iranti for a production use case, someone interested in a hosted version — have no path forward except GitHub. The footer CTAs route to GitHub and the install section. There is no "talk to us" or "get notified when hosted launches" surface.

---

## Value

- Captures leads from serious evaluators before there is a hosted product to sell them
- Creates a waitlist for the hosted product (Phase 8 in AGENTS.md build status)
- Gives the PM a conversion signal beyond GitHub star counts

---

## Scope

### Implementation

A section component — `ContactWaitlist.tsx` (or similar) — placed in one of:
- The homepage above the footer, as a pre-footer conversion block
- An expanded footer section
- A dedicated `/contact` page (requires site-e001)

The simplest viable implementation is a pre-footer section on the homepage and the Get Started page.

### Form Fields
- Name (required)
- Email (required)
- "What are you building?" (optional, open text, ~200 char)
- A radio or select for intent: "Evaluating for a project", "Design partner interest", "Hosted waitlist", "Other"

### Form Backend Options (PM/DevOps to decide)
- **Resend** — Email delivery API; form POSTs to an API route that sends an email to the team inbox. Simple, cheap, no third-party form service.
- **Formspree** — Third-party form backend. No server-side code needed. Free tier available.
- **Custom serverless** — A Next.js API route that writes to a Notion database, Airtable, or similar.

### Copy Direction
- Headline: "Working on something serious? Let's talk." or "Get notified when hosted launches."
- Sub-copy: "Iranti is open source now. A hosted version is in progress. Share what you're building and we'll be in touch."
- Submit button: "Send" or "Get in touch"
- Confirmation state: "Got it. We'll be in touch." — no false promises about response time

### What Not to Do
- Do not promise a specific response time
- Do not imply the hosted product has a launch date
- Do not use aggressive marketing language ("exclusive early access", "limited spots")

---

## Dependencies

- Form backend decision (PM/DevOps)
- site-e004 Epic for backend setup
- PM approval on copy

---

## Acceptance Criteria

- [ ] Form section is visible on at least the homepage and the Get Started page
- [ ] Form collects name, email, optional message, and intent selection
- [ ] Form submits successfully and shows a confirmation state
- [ ] Form submission is delivered to the team (via email or a submissions inbox — to be verified end-to-end)
- [ ] Copy is honest about current open-source vs future hosted state
- [ ] Form is keyboard-accessible with correct ARIA labels on all inputs
- [ ] Form renders correctly in both dark and light mode
- [ ] Error states exist for required field validation (empty email, invalid email format)

---

## Risks

- If form backend is not decided, this blocks build
- Without a CAPTCHA or honeypot field, spam submissions are a low but real risk — a basic honeypot field is sufficient for v1
- If the team does not have a defined intake process for submissions, captured leads will sit unactioned

---

## Open Questions

- Who receives form submissions? What email address or Slack channel?
- Should "Design partner interest" be a visible option, or is that too early in Iranti's public-facing positioning?
- Should the form appear at the bottom of the homepage as a full section, or as a modal triggered by a CTA button?

---

## Definition of Done

- Form section is live on site
- A test submission has been completed end-to-end
- PM has approved the copy
- Form renders correctly in both modes
- Keyboard accessibility confirmed
- Intake process (who responds, how) is defined even if informal
