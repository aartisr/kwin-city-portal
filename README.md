# KWIN City Portal

A public knowledge platform for Bengaluru, built with one promise:
truth before hype.

KWIN stands for Knowledge, Wellbeing, and Innovation. This portal exists to help people understand the proposed KWIN City initiative with clarity, evidence, and civic respect.

## Why This Project Exists

Cities are too important to be explained with marketing language alone.
People deserve source-linked facts, honest uncertainty, and clear distinctions between:

- what is verified
- what is plausible but unconfirmed
- what is aspiration

This project is rooted in Bengaluru's civic spirit: curious, practical, collaborative, and accountable to community outcomes.

## Our Community Promise (Bengaluru First)

This portal is designed for the people who live, work, build, report, study, and care in and around Bengaluru:

- residents who want understandable, plain-language answers
- researchers who need traceable evidence and methodology
- journalists who need claim status and source lineage
- investors and operators who need context without spin
- students and civic contributors who want to learn and participate

We are explicit about one value system:
research, honesty, integrity, kindness, and proof.

## Evidence Covenant

Every serious claim should be traceable to a source.
When proof is incomplete, we say so.

### Verification Tiers

| Marker | Tier | Meaning |
| --- | --- | --- |
| `Confirmed Context` | Verified | Backed by official/public institutional evidence |
| `Pending Verification` | In Progress | Needs primary source confirmation |
| `Contextual Evidence` | Regional | Useful context, not project-specific proof |

The portal links claims to source records so readers can inspect, disagree, verify, and contribute better questions.

## Narrative Ethos

If a sentence cannot survive scrutiny, it does not belong here.
If a claim affects public trust, it must carry evidence.
If data is unclear, we choose transparency over certainty theater.

This is not just content design; it is civic design.

## What You Can Explore

- Bengaluru and North Bengaluru context
- KWIN pillars: Knowledge, Wellbeing, Innovation
- timeline-oriented project interpretation
- sector-level analysis
- sustainability and urban systems perspective
- evidence and sources registry
- persona-based pathways (`/for/*`) for different audiences

## Product Principles

- Evidence-first by default
- Human-readable before jargon-heavy
- Accessibility and performance are non-negotiable quality gates
- Community trust is treated as a measurable product outcome
- Precision over virality

## Technology Foundation

- Next.js 15 (App Router)
- React 18 + TypeScript 5
- Tailwind CSS
- Vitest + Playwright
- Recharts and map components for data storytelling

## Quick Start

### Prerequisites

- Node.js 20.x
- Yarn 1.22.x

### Install

```bash
yarn install
```

### Run locally

```bash
yarn dev
```

Open:

```text
http://localhost:3000
```

## Developer Commands

```bash
yarn dev              # start dev server
yarn build            # production build
yarn start            # run production server
yarn lint             # lint checks
yarn test             # unit/integration tests (Vitest)
yarn type-check       # TypeScript validation
yarn e2e              # Playwright end-to-end tests
yarn format           # format codebase
yarn format:check     # check formatting only
```

## Quality and Trust Gates

This project values technical quality because technical debt can become trust debt.

Representative checks include:

- type safety and linting
- unit and component tests
- route and accessibility smoke tests
- evidence labeling and source traceability discipline

## Project Structure (High Level)

```text
app/                  Next.js routes, components, API handlers
app/content/          Structured content and narrative data
app/config/           Site-level configuration
app/lib/              Data, utilities, content/evidence logic
e2e/                  End-to-end test suites
docs/                 Architecture and system documentation
scripts/              Operational helper scripts
public/               Static assets, robots, feeds, web verification files
```

## Documentation

Core documents:

- `ARCHITECTURE.md`
- `DOCUMENTATION.md`
- `E2E_TESTING.md`
- `QUALITY_STANDARDS.md`
- `CONTRIBUTING.md`
- `docs/README.md`

## Contribution Philosophy

Contributions are welcome when they improve one or more of the following:

- factual clarity
- evidence rigor
- accessibility
- maintainability
- community usefulness

Please avoid:

- unverifiable claims
- manipulative framing
- certainty where the evidence is incomplete

## A Note to Bengaluru

This portal is made with respect for the city and its people.
Bengaluru deserves ambitious thinking, but also disciplined truth.

If you spot an error, missing context, or weak evidence trail, open an issue or contribute a correction.
Public trust is built line by line.

## License

Private / Proprietary.
