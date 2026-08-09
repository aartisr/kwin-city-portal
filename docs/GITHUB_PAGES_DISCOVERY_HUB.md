# GitHub Pages Discovery Hub

This repository now includes a dedicated static discovery hub for improved crawlability and AI retrieval routing.

## Location

- Source files: `github-pages/`
- Primary page: `github-pages/index.html`
- Companion pages:
  - `github-pages/geo-ai-index.html`
  - `github-pages/seo-link-graph.html`

## What it does

- Publishes a curated set of contextual backlinks to `https://kwin-city.com`.
- Exposes machine-readable discovery files:
  - `robots.txt`
  - `sitemap.xml`
  - `llms.txt`
- Adds structured data on the index page to improve graph-style understanding.

## Deployment

Deployment is automatic via:

- `.github/workflows/deploy-github-pages.yml`

Workflow triggers on:

- Pushes to `main` affecting `github-pages/**`
- Manual run (`workflow_dispatch`)

Published URL:

- `https://aartisr.github.io/kwin-city-portal/`

## Vercel Compatibility

This hub is standalone and does not change Next.js runtime paths or `vercel.json` behavior.
Your Vercel deployment for the main app remains unchanged.

## Recommended Post-Deploy Checks

1. Confirm GitHub Pages URL loads and styles render.
2. Validate links resolve to live pages on `https://kwin-city.com`.
3. Submit both sitemaps in webmaster tools:
   - `https://kwin-city.com/sitemap.xml`
   - `https://aartisr.github.io/kwin-city-portal/sitemap.xml`
