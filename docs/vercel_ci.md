# Vercel Deployment Notes

## Project Info

| Item | Value |
|---|---|
| Project Name | `fortune-poem-ai` |
| Production URL | https://fortune-poem-ai.vercel.app |
| Framework | Next.js 16 (App Router) |
| Root Directory | `web/` |
| Node.js | 22.x |
| Build Command | `npm run build` |
| Output Directory | `.next` (auto-detected) |
| Env Vars | None required (all data is static JSON) |

---

## Prerequisites

### Required

| Tool | Version | Install |
|---|---|---|
| **Node.js** | 22.x+ | [nvm](https://github.com/nvm-sh/nvm): `nvm install 22` |
| **npm** | 10.x+ | Bundled with Node.js |
| **Vercel CLI** | Latest | `npm i -g vercel` or use `npx vercel` (auto-installs) |

### Vercel Account Setup

1. Create a free account at [vercel.com](https://vercel.com)
2. Authenticate CLI:
   ```bash
   npx vercel login
   ```
3. Verify authentication:
   ```bash
   npx vercel whoami
   ```

### Project Dependencies

Before deploying, ensure the Next.js app builds locally:

```bash
cd web
npm ci          # Install dependencies from lock file
npm run build   # Verify production build passes
```

> **Note**: `npx vercel` will auto-install the Vercel CLI if not globally installed. No need to `npm i -g vercel` unless you prefer a persistent installation.

---

## Lessons Learned

### 1. Project Name Defaults to Directory Name

When running `vercel` CLI inside a subdirectory (e.g., `web/`), the project is auto-named after that directory — not the repo name.

**Fix**: Delete the wrong project and redeploy with `--name`:

```bash
# Remove the wrongly-named project
echo "y" | npx vercel project rm web

# Clean up local link
rm -rf web/.vercel

# Redeploy with correct name
cd web && npx vercel --yes --prod --name fortune-poem-ai
```

> Note: `--name` flag is deprecated but still works. The alternative is to rename in Vercel Dashboard > Settings > General > Project Name.

### 2. Domain Alias

After deployment, the auto-generated URL is `<project>-<hash>-<org>.vercel.app`. To get a clean URL:

```bash
npx vercel alias <deployment-url> fortune-poem-ai.vercel.app
```

When the project name matches the desired subdomain (e.g., `fortune-poem-ai`), Vercel auto-aliases to `fortune-poem-ai.vercel.app` on production deploys.

### 3. Monorepo Structure — Root Directory Setting

This repo has a Python backend at root and Next.js under `web/`. For Vercel:

- **CLI**: Run `vercel` from inside `web/`
- **Dashboard**: Set Root Directory to `web/` in Project Settings
- **GitHub Integration**: If connected, set Root Directory in Vercel project settings so it only triggers on `web/` changes

### 4. Static Data Strategy (No Env Vars Needed)

All poem data is pre-cached as JSON in `web/public/data/` (~1.2MB total):

| File | Content |
|---|---|
| `all_chances.json` | 100 poems with full metadata, interpretations, divine guidance |
| `all_contexts.json` | Pre-formatted RAG contexts |
| `all_divine.json` | 15 divine categories with sample questions |
| `chatgpt_response.json` | Cached GPT-4o responses for poem #58 |
| `claude_response.json` | Cached Claude responses for poem #58 |

This means:
- Zero API costs for the demo site
- No environment variables to configure on Vercel
- Fully static export possible (`output: 'export'` in next.config.ts)

### 5. Remote Images Configuration

Poem images are served from `lungshan.org.tw`. Next.js `<Image>` requires whitelisting:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lungshan.org.tw",
        pathname: "/fortune_sticks/images/**",
      },
    ],
  },
};
```

### 6. vercel.json — Keep It Minimal

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs"
}
```

Vercel auto-detects Next.js settings. Avoid overriding `buildCommand` or `outputDirectory` unless necessary.

### 7. `.vercel/` Directory

The `.vercel/` directory contains local project linkage (`project.json`). It is:
- Already in `.gitignore` — do not commit it
- Regenerated on `vercel` CLI first run per machine
- Safe to delete and re-link with `vercel link`

---

## CLI Quick Reference

```bash
# Deploy to production
cd web && npx vercel --yes --prod

# Preview deployment (non-production)
cd web && npx vercel --yes

# Check deployment logs
npx vercel inspect <deployment-url> --logs

# Redeploy last deployment
npx vercel redeploy <deployment-url>

# Add domain alias
npx vercel alias <deployment-url> fortune-poem-ai.vercel.app

# Remove project (destructive!)
echo "y" | npx vercel project rm <project-name>

# List deployments
npx vercel ls
```

---

## GitHub Actions Integration

Vercel can auto-deploy on push via GitHub integration (Vercel Dashboard > Git). If using that instead of CLI:

1. Connect GitHub repo in Vercel Dashboard
2. Set Root Directory to `web/`
3. Vercel will auto-build on push to `main` and create preview deploys for PRs
4. The GitHub Actions CI (`.github/workflows/ci.yml`) handles lint/build verification separately — they are complementary, not redundant
