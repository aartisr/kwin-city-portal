# KWIN City Research Portal

> Evidence-first public research for understanding the proposed KWIN City and the wider North Bengaluru growth corridor.

[Explore the portal](https://kwin-city.com/) · [Read the claim ledger](https://kwin-city.com/evidence) · [Browse the API](https://kwin-city.com/openapi.json) · [Read the full machine guide](https://kwin-city.com/llms-full.txt)

## Why this exists

KWIN City is a consequential urban proposition. Consequential propositions deserve more than polished claims: they deserve sources, clear uncertainty, and tools that make it easier to ask better questions.

This open-source portal brings spatial context, public records, regional datasets, and decision-support tools into one research surface. It is designed for investors, landowners, journalists, researchers, public-interest groups, and curious residents—anyone who needs to distinguish a verified record from a proposal or a regional inference.

## The standard

Every substantive statement should be legible as one of three things:

- **Verified record** — supported by a primary institutional source.
- **Project proposal** — reported in a project brief or public statement, awaiting fuller institutional confirmation.
- **Regional context** — evidence about North Bengaluru that informs the setting but does not prove a KWIN-specific outcome.

This distinction is the project’s core contribution. It replaces both uncritical promotion and empty skepticism with inspectable evidence.

## What you can do

| Research need | Portal resource |
| --- | --- |
| Understand place, scale, and district context | [Spatial Masterplan Explorer](https://kwin-city.com/spatial) |
| Examine directional valuation assumptions | [Valuation Index](https://kwin-city.com/valuation) |
| Identify approvals and authorities to verify | [Regulatory Navigator](https://kwin-city.com/regulatory) |
| Assess preliminary land or corridor questions | [Risk Check](https://kwin-city.com/risks) |
| Inspect claims and their limitations | [Evidence Vault](https://kwin-city.com/evidence) |
| Follow research updates | [News Intelligence](https://kwin-city.com/news) |

## Research principles

1. **Evidence before narrative.** Link the original record whenever possible.
2. **Precision before persuasion.** Do not make a stronger claim than the source supports.
3. **Context is not confirmation.** Regional momentum cannot establish project-specific delivery.
4. **Uncertainty is a feature.** Pending verification is a useful answer.
5. **Open scrutiny improves public understanding.** Corrections and better primary sources are welcome.

## Data and API

The portal offers a small, public read-only API for research context:

- `GET /api/health`
- `GET /api/masterplan`
- `GET /api/valuation?district=<name>`
- `GET /api/regulatory`

See [OpenAPI 3.0 specification](https://kwin-city.com/openapi.json). These endpoints are independent research context—not official government records, title opinions, investment advice, or permissions.

## Source hierarchy

We prioritize, in order:

1. Statutory records and responsible government authorities, including [KIADB](https://kiadb.karnataka.gov.in/) and [Karnataka Udyog Mitra](https://kum.karnataka.gov.in/).
2. Primary institutional datasets and documents.
3. Public-interest data repositories, including [OpenCity](https://data.opencity.in/).
4. Reputable reporting clearly labelled as reporting, not proof.
5. Derived portal analysis, with assumptions and limits stated.

## Run locally

```bash
npm install
npm run dev
```

Validation:

```bash
npm run lint
npm run build
```

## Notify IndexNow after publishing

IndexNow can notify participating search engines when a public URL changes. It verifies ownership separately for each hostname, so the main portal and GitHub Pages use different keys.

```bash
cp .env.indexnow.example .env.indexnow
# Set two unique keys in .env.indexnow, then load them into your shell.
set -a && source .env.indexnow && set +a

# Create the public verification files, commit them, and deploy first.
npm run indexnow -- --write-key-files

# Inspect payloads before sending (default).
npm run indexnow

# Submit only after each key file is publicly reachable.
npm run indexnow -- --submit
```

The script deliberately skips GitHub Wiki URLs: their host is `github.com`, where a repository cannot host the required IndexNow ownership key. Internal links and ordinary crawling remain the appropriate discovery path for the Wiki.

## Contribute a correction or source

If you find a stronger primary source, an outdated statement, or an ambiguity that needs clearer labelling, please open an issue with:

1. The exact claim or page.
2. A stable original-source URL or document reference.
3. The relevant page, section, and publication date.
4. A brief explanation of what should change and why.

Do not submit personal data, land-title documents, or confidential material in public issues.

## Citation

> KWIN City Research Portal. Independent evidence-first research on KWIN City and North Bengaluru. https://kwin-city.com/

Please cite the original public source alongside this portal when one is available.

## Independence and limitations

This repository and portal are independent research work. They are not an official Government of Karnataka, KIADB, or Karnataka Udyog Mitra service. Nothing here is legal, financial, investment, engineering, survey, title, or government advice. Confirm consequential decisions with the responsible authority and qualified professionals.

## Further reading

- [Research charter](wiki/Research-Charter.md)
- [Evidence standard](wiki/Evidence-Standard.md)
- [Methods](wiki/Methods.md)
- [Data and API guide](wiki/Data-and-API.md)
- [GitHub Pages research companion](docs/index.html)
