# Iranti Site — Deployment Reference

## Git State

- **Repository:** `nfemmanuel/iranti-site` (GitHub, public)
- **Branch model:** `master` is the working branch; `main` is the integration target for PRs
- **Remote:** `origin` → `https://github.com/nfemmanuel/iranti-site`

To verify remote configuration:

```bash
git remote -v
```

---

## Hosting Recommendation: Vercel

Vercel is the recommended host for this project. Reasons:

- Native Next.js 15 support (zero-config build pipeline)
- Automatic preview deployments on every push / PR
- Edge network with global CDN
- Free tier is sufficient for the current traffic profile
- No server-side infrastructure to maintain — static pages served at edge

---

## Deployment Config

`vercel.json` at the project root declares the deployment contract:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

`next.config.ts` is intentionally minimal — no `output: 'export'` override, which means Vercel handles the build natively and retains support for ISR and server features if added later.

---

## How to Deploy

### Option A — Vercel CLI (fastest for first deploy)

Prerequisites: Vercel CLI installed globally (`npm i -g vercel`) and authenticated (`vercel login`).

```bash
# From the project root
vercel --prod
```

On first run, the CLI will prompt for:
- Link to existing project or create new one
- Which GitHub account/org to link
- Confirm project name (`iranti-site`)

Subsequent deploys are triggered automatically by `git push` once the GitHub integration is active.

### Option B — Vercel GitHub Integration (recommended for ongoing CI)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `nfemmanuel/iranti-site` GitHub repository
3. Accept the auto-detected Next.js settings (framework, build command, output dir)
4. Click **Deploy**

Vercel will:
- Deploy `master` (or `main`) to production on every push
- Create preview URLs for every PR/branch push

---

## Environment Variables

No environment variables are required for the static site itself at this time.

When the Iranti shared-memory integration is wired to the site (e.g., for dynamic content or edge functions), the following would be added in the Vercel dashboard under **Settings → Environment Variables**:

| Variable | Scope | Notes |
|---|---|---|
| `IRANTI_INSTANCE_URL` | Production / Preview | URL of the Iranti instance (e.g., `http://localhost:3001` for local) |
| `IRANTI_AGENT_ID` | Production / Preview | Agent ID for the site (e.g., `site_main`) |

Do **not** commit `.env.iranti` or any secrets to the repository.

---

## Domain and DNS Next Steps

1. Purchase or transfer the target domain (e.g., `iranti.dev`, `iranti.ai`, or `getiranti.com`) through a registrar (Cloudflare Registrar recommended for cost and DDoS protection).
2. In the Vercel dashboard, go to **Settings → Domains** and add the custom domain.
3. Vercel will provide nameserver records or a CNAME. Point DNS accordingly.
4. Vercel provisions a TLS certificate automatically via Let's Encrypt.
5. Set up a redirect from `www` → apex (or apex → `www`) depending on preference.

For now, each production deploy receives a stable Vercel URL of the form `iranti-site-[hash].vercel.app`.

---

## Rollback

Vercel keeps a full deployment history. To roll back:

```bash
vercel rollback [deployment-url]
```

Or use the Vercel dashboard → **Deployments** → select a previous deployment → **Promote to Production**.

---

_Last updated: 2026-03-21_
