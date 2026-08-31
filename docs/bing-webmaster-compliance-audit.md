# Bing Webmaster Guidelines 2026 Compliance Audit

Audit date: 2026-04-29

Source documents reviewed:

- `Bing_Webmaster_Guidelines_2026.docx`
- `Bing_Webmaster_Guidelines_2026.pdf`
- `docs/webmaster_guidelines.txt`

Official cross-checks:

- Bing Webmaster Guidelines: `https://www.bing.com/webmasters/help/webmasters-guidelines-36f4f636`
- IndexNow setup guidance: `https://www.bing.com/indexnow/IndexNowView/IndexNowGetStartedView`
- Bing URL submission note recommending IndexNow: `https://blogs.bing.com/webmaster/september-2021/Access-to-Instant-Indexing-%C2%A0Bing%C2%A0URL-submission-API`

This is a best-effort technical compliance audit. Bing indexing, ranking, crawl frequency, and Copilot citation eligibility cannot be guaranteed from repository changes alone.

## Implemented In Repo

- Discovery: `public/robots.txt` allows public pages, disallows `/api/`, exposes the XML sitemap, exposes the RSS feed as a sitemap-compatible discovery source, and explicitly allows `bingbot`.
- IndexNow: `scripts/ping-search-engines.mjs` verifies the IndexNow key file and can submit canonical sitemap URLs through IndexNow.
- Sitemap hygiene: `app/sitemap.ts` lists only canonical public URLs, excludes noindex utility pages, includes `lastModified`, and includes update detail pages.
- Freshness: `SITE_CONFIG.lastUpdatedISO`, `public/ai.txt`, and `public/llms.txt` were refreshed for this audit.
- URL consolidation: `next.config.js` and `netlify.toml` redirect `www.kwin-city.com` to the apex domain and redirect `/og-image.png` to `/opengraph-image`.
- Robots and noindex: account, analytics, community, region-map, offline, search, and evidence-library pages use noindex where appropriate and are excluded from sitemap.
- Crawl waste reduction: noindex utility pages were removed from global crawlable navigation and footer link groups.
- Metadata: route-level descriptions were lengthened and made more specific for indexable pages and link previews.
- Structured data: homepage JSON-LD now describes visible homepage content only; FAQPage markup remains on the visible FAQ page.
- Content trust: major pages expose source links, verification labels, source ledgers, evidence pages, trust policy, and document downloads.
- Internal linking: primary pages are reachable through crawlable Next links in header, footer, homepage modules, route grids, and related-link chips.
- Abuse avoidance: no link schemes, no cloaking, no keyword-stuffed pages, no affiliate-only content, and no deceptive structured data were found in the audited code paths.

## Guideline Checklist

1. SEO fundamentals: addressed through metadata, schema, sitemap, canonical URLs, source-led content, and internal links.
2. URL discovery: addressed through sitemap, RSS feed, robots discovery, internal links, and IndexNow script.
3. Sitemaps: addressed in `app/sitemap.ts`; no known noindex utility URLs are included.
4. Notify URL changes: addressed by `npm run notify:search` after deployment.
5. Links and authority: internal links are strong; inbound external links require off-site outreach.
6. Duplicate URLs: addressed through canonical metadata and host redirects.
7. URL moves: addressed through permanent redirects in `next.config.js` and `netlify.toml`.
8. Crawling and rendering: public content is server-rendered or prerendered by Next; API routes are blocked from crawlers.
9. Removed URLs: Next not-found route returns 404 behavior; removals should be submitted through IndexNow and Bing tools.
10. Robots and directives: robots and noindex are used for the correct purposes; no noarchive, nocache, or nosnippet directives were found.
11. Clear useful content: public pages focus on KWIN City topics, source context, and audience-specific intent.
12. Images and video: primary Next images generally include alt text; future media additions should keep descriptive alt/captions.
13. HTML structure: pages use titles, descriptions, headings, semantic sections, and route-level metadata.
14. Structured data: homepage structured data was corrected to match visible content; update and FAQ schemas remain topic-aligned.
15. Independent verification: sources, evidence vault, trust center, and verification labels support independent review.
16. Entity definition: KWIN City, North Bengaluru, Doddaballapura, KIADB, and project pillars are named consistently.
17. Single-topic URLs: sitemap URLs map to focused page topics.
18. Key information early: page intros and hero sections state topic, location, and evidence posture near the top.
19. Accuracy and updates: `lastUpdatedISO`, update pages, source ledger, and RSS feed support freshness.
20. URL stability: existing public URLs were preserved; no unnecessary route renames were made.
21. Crawl efficiency: noindex utility URLs were removed from global navigation/footer and excluded from sitemap.
22. Measurement beyond clicks: Bing Webmaster Tools should monitor impressions, indexing, crawl errors, and AI/citation performance.

## Manual Follow-Up

- Deploy these changes.
- Run `npm run notify:search` after deployment.
- In Bing Webmaster Tools, resubmit `https://kwin-city.com/sitemap.xml`.
- Use URL Inspection for the most important URLs: `/`, `/sources`, `/evidence`, `/why-north-bengaluru`, `/updates`, `/faq`.
- Build high-quality inbound links using the outreach plan in `docs/webmaster-warning-action-plan.md`.
- Keep checking Bing crawl errors, indexed pages, blocked pages, duplicate/canonical reports, and AI Performance reports.
