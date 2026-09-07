# Webmaster Warning Action Plan

This note tracks the two current Webmaster Tools warnings and the practical response.

## Short Meta Descriptions

Status: addressed in route metadata.

What changed:

- Lengthened short English route descriptions and social snippets so important pages provide clearer context in search results and link previews.
- Kept noindex utility pages noindex, but gave them fuller descriptions for consistency.
- Refreshed `SITE_CONFIG.lastUpdatedISO` so sitemap freshness reflects the metadata update.

Maintenance:

- Keep indexable page descriptions specific, human-readable, and roughly 120-170 characters.
- Mention the page topic, audience, and evidence/source angle when relevant.
- Avoid repeating the same site-wide description on multiple URLs.
- After deployment, run `npm run notify:search` so Bing/IndexNow sees the updated sitemap URLs faster.

## Inbound Links From High-Quality Domains

Status: requires off-site action. This cannot be fixed purely in code.

Best link targets:

- `https://kwin-city.com/sources` for journalists, researchers, and anyone validating claims.
- `https://kwin-city.com/evidence` for data-led references and research citations.
- `https://kwin-city.com/why-north-bengaluru` for regional context, airport corridor, STRR, and growth evidence.
- `https://kwin-city.com/news-intelligence` for media monitoring and publisher-feed methodology.
- `https://kwin-city.com/share` for social and community sharing.

Outreach actions:

- Ask credible partners, contributors, institutional profiles, and project-adjacent organizations to link to the most relevant source page, not only the homepage.
- Pitch the Sources and Evidence pages to journalists as verification resources.
- Add the site link to official social bios, newsletters, presentations, press materials, and conference/resource pages where appropriate.
- Prefer a small number of relevant links from trusted domains over directory submissions or generic SEO link packages.
- Use descriptive anchor text such as "KWIN City source ledger", "KWIN City evidence vault", or "North Bengaluru KWIN City regional analysis".

Avoid:

- Buying backlinks.
- Mass directory submissions.
- Exact-match anchor spam.
- Links from unrelated domains that exist only for SEO.
