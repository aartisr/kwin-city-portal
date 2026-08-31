# KWIN City Portal

An evidence-first civic knowledge platform for Bengaluru.

## Media Brief (Immediate Public Use)

KWIN City Portal is a public-interest information platform designed to make complex urban-development narratives understandable, verifiable, and "humane".

If you are a journalist, editor, researcher, civic leader, or policy observer, this repository is your fast on-ramp to source-linked facts and transparent claim status.

Public links:

- Main site: <https://kwin-city.com>
- Evidence library: <https://kwin-city.com/evidence>
- Source registry: <https://kwin-city.com/sources>
- Trust center: <https://kwin-city.com/trust>
- Updates: <https://kwin-city.com/updates>

Short description for media use:

"KWIN City Portal is a Bengaluru-focused, evidence-first civic information platform that prioritizes public trust through source transparency, honest uncertainty, and accessible storytelling."

## Dependency Registry Policy

Vercel and all checked-in configuration use the public npm registry, so deployment never depends on an internal network or credential. Developers who need the private Artifactory registry can keep it local: copy `.npmrc.private.example` to `.npmrc.private`, set `KWIN_PRIVATE_NPM_TOKEN`, then run commands through `npm run npm:private -- <npm command>`. The private profile is ignored by Git.

## Why This Website Exists

Before this platform, one critical civic question was often left unanswered:
who gets to understand the future of a city?

Too often, the answer was limited to those with institutional access, technical language, or insider networks. KWIN City Portal exists to change that. It transforms complex policy, planning, and development narratives into public knowledge that can be read, checked, and discussed by everyone.

This is not a website built for attention. It is a website built for accountability. It helps residents make informed decisions, supports journalists in verification, equips researchers with traceable context, and gives communities a shared factual ground for meaningful dialogue.

In that sense, KWIN City Portal is a public-trust infrastructure: technology in service of dignity, transparency, and collective civic intelligence.

This project is built on a simple but powerful belief:
when public decisions affect millions of lives, truth, dignity, and clarity are not optional.

KWIN stands for Knowledge, Wellbeing, and Innovation. This portal helps people understand the proposed KWIN City initiative through source-linked facts, transparent uncertainty, and respectful public dialogue.

## Author and Stewardship

Created and stewarded by BAJA Associates.

Primary author: Aarti S Ravikumar.

Editorial and product posture:

- authenticity in claims
- kindness in communication
- innovation in civic information design

## A Cause Worth Building For

Some causes are larger than software. This is one of them.

We are not building pages for clicks. We are building public understanding.
We are not building narratives for hype. We are building context people can verify.
We are not building certainty theater. We are building honest confidence, one source at a time.

If this project has a north star, it is this:
use technology to strengthen trust between people, institutions, and the future city they are shaping together.

## Our Values

### Authenticity

- We tell readers what we know, how we know it, and what is still uncertain.
- We separate evidence from assumption and aspiration.
- We welcome correction because accuracy is a shared responsibility.

### Kindness

- We write for people, not just experts.
- We prefer plain language over gatekeeping language.
- We treat readers as civic partners, never as targets.

### Innovation

- We combine rigorous sourcing with modern product design.
- We use data storytelling to make complexity understandable.
- We treat accessibility, reliability, and credibility as innovation fundamentals.

## Evidence Covenant

Every meaningful claim should be traceable.
When proof is incomplete, we say so clearly.

### Verification Tiers

| Marker                 | Tier        | Meaning                                          |
| ---------------------- | ----------- | ------------------------------------------------ |
| `Confirmed Context`    | Verified    | Backed by official/public institutional evidence |
| `Pending Verification` | In Progress | Needs primary source confirmation                |
| `Contextual Evidence`  | Regional    | Useful context, not project-specific proof       |

Readers should be able to inspect, challenge, and verify. That is a feature, not a footnote.

## Who This Is For

- residents seeking practical, plain-language clarity
- researchers needing traceable methodology and evidence lineage
- journalists verifying claims and timelines
- investors and operators assessing context without spin
- students and civic contributors learning and participating

## What You Can Explore

- Bengaluru and North Bengaluru regional context
- KWIN pillars: Knowledge, Wellbeing, Innovation
- timeline and phase-oriented interpretation
- sector-level comparison and analysis
- sustainability and urban systems perspectives
- evidence library and source registry
- persona pathways under `/for/*`

## Product Principles

- Evidence-first by default
- Human-readable before jargon-heavy
- Accessibility and performance as non-negotiable quality gates
- Community trust as a measurable product outcome
- Precision over virality

## Technology Foundation

- Next.js 15 (App Router)
- React 18 + TypeScript 5
- Tailwind CSS
- Vitest + Playwright
- Recharts and map-based data storytelling

## Optional Analytics Providers

- Vercel Analytics
- Microsoft Clarity
- PostHog (plug-and-play, environment-gated)

The portal is also an installable, offline-resilient Progressive Web App. See
`docs/PWA.md` for its cache safety model, configuration, and deployment checks.

PostHog integration guide: `docs/POSTHOG_INTEGRATION.md`

## Minimal Contributor Setup

- Node.js 20.x
- Yarn 1.22.x

```bash
yarn install
yarn dev
```

For all task-level instructions, use `docs/README.md` and `HOW_TO.md`.

## Quality and Trust Gates

Technical debt can become trust debt. We treat both seriously.

Representative checks include:

- type safety and linting
- unit and component testing
- route and accessibility smoke coverage
- evidence labeling and traceability enforcement

## Project Structure

```text
app/                  Next.js routes, components, API handlers
app/content/          Structured content and narrative data
app/config/           Site-level configuration
app/lib/              Data, utilities, content/evidence logic
e2e/                  End-to-end test suites
docs/                 Architecture and system documentation
scripts/              Operational helper scripts
public/               Static assets, robots, feeds, verification files
```

## Documentation

Essential docs:

- `README.md`
- `docs/README.md`
- `HOW_TO.md`
- `docs/EVIDENCE_SYSTEM.md`
- `QUALITY_STANDARDS.md`
- `CONTRIBUTING.md`

## Contribution Philosophy

Contributions are welcome when they improve:

- factual clarity
- evidence rigor
- accessibility
- maintainability
- community usefulness

Please avoid:

- unverifiable claims
- manipulative framing
- false certainty where evidence is incomplete

## A Note to Bengaluru

This portal is built with respect for the city and its people.
Bengaluru deserves ambitious imagination and disciplined honesty.

If you spot an error, missing context, or weak evidence trail, please open an issue or contribute a correction.
Public trust is built line by line, together.

## License

Private / Proprietary.
