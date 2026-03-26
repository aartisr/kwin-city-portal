# KWIN City Portal

> **Knowledge · Wellbeing · Innovation**  
> *An evidence-first research portal for India's next-generation knowledge city.*

<!-- Tech Stack -->
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License: Private](https://img.shields.io/badge/License-Private-red)](LICENSE)
[![Canonical](https://img.shields.io/badge/Site-kwin--city.com-6366f1)](https://kwin-city.com)

<!-- Deployment & CI -->
[![Netlify Status](https://img.shields.io/netlify/REPLACE_WITH_NETLIFY_SITE_ID?label=Netlify)](https://app.netlify.com/sites/REPLACE_WITH_NETLIFY_SITE_NAME/deploys)
[![GitHub last commit](https://img.shields.io/github/last-commit/aartisr/kwin-city-portal?logo=github)](https://github.com/aartisr/kwin-city-portal/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/aartisr/kwin-city-portal)](https://github.com/aartisr/kwin-city-portal)

<!-- Security & Validation -->
[![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fkwin-city.com&label=Security%20Headers)](https://securityheaders.com/?q=kwin-city.com)
[![Mozilla Observatory](https://img.shields.io/mozilla-observatory/grade/kwin-city.com?publish=true&label=Mozilla%20Observatory)](https://observatory.mozilla.org/analyze/kwin-city.com)
[![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fkwin-city.com&label=W3C%20HTML)](https://validator.w3.org/nu/?doc=https%3A%2F%2Fkwin-city.com)
[![HSTS Preload](https://img.shields.io/hsts/preload/kwin-city.com?label=HSTS%20Preload)](https://hstspreload.org/?domain=kwin-city.com)

---

## Table of Contents

- [What Is This?](#what-is-this)
- [Claim Verification Tiers](#claim-verification-tiers)
- [What Is KWIN City?](#what-is-kwin-city)
- [Site Map](#site-map)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [The Evidence System](#the-evidence-system)
- [Data Sources (S1–S9)](#data-sources-s1s9)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## What Is This?

The **KWIN City Portal** is the official public research and information platform for **KWIN City** — a proposed multi-phase knowledge-economy township in Doddaballapura, North Bengaluru, India, operated by KIADB (Karnataka Industrial Areas Development Board).

**KWIN** stands for **K**nowledge · **W**ellbeing · **I**nnovation.

The portal's defining principle is **radical epistemic transparency**: every claim on every page is explicitly labeled with its verification status and linked to its source. Nothing is presented as established fact unless backed by a primary institutional document.

> *"We don't just present the vision. We show you the evidence — and we're honest about what the evidence can and cannot prove."*

---

## Claim Verification Tiers

| Symbol | Tier | Meaning |
|--------|------|---------|
| ✅ | **Confirmed Context** | Sourced from a verified official document or government record |
| 🔍 | **Pending Verification** | Requires primary source confirmation from KIADB or a government agency |
| ⚪ | **Contextual / Regional Evidence** | Legitimate public data providing regional context, not project-specific proof |

These tiers appear as colored inline badges (S1–S9) next to every claim on the site. Click any badge to navigate to the full source record at `/sources`.

---

## What Is KWIN City?

KWIN City is a multi-phase urban development project in **Doddaballapura, North Bengaluru** — approximately 40 km from the city center, adjacent to Bengaluru International Airport.

### The Three Pillars 🔍

| Pillar | Colour | Focus |
|--------|--------|-------|
| **Knowledge** | Blue | Research institutions, universities, innovation labs |
| **Wellbeing** | Green | Healthcare, green infrastructure, sustainable communities |
| **Innovation** | Amber | Semiconductor parks, aerospace, renewable energy, ICT |

### Key Project Stats 🔍 *(Pending Verification — sourced from project brief)*

| Metric | Figure |
|--------|--------|
| Location | Doddaballapura, North Bengaluru |
| Site Area | 465+ acres |
| Investment Target | ₹40,000 Crore |
| Projected Employment | 100,000+ high-skill jobs |
| Timeline | 2024 inauguration → 2030 full operations |
| Operator | Karnataka Industrial Areas Development Board (KIADB) |

### Development Timeline 🔍

| Phase | Year | Status |
|-------|------|--------|
| Phase 0 | 2024 | ✅ Completed (100%) — Inauguration & Land Acquisition |
| Phase 1 | 2025 | 🔄 In Progress (35%) — Infrastructure & Connectivity |
| Phase 2 | 2026 | 📋 Planned — Institutional & Knowledge District |
| Phase 3 | 2027 | 📋 Planned — Industrial & Revenue Generation |
| Phase 4 | 2028 | 📋 Planned — Wellbeing & Sustainability |
| Phase 5 | 2030 | 📋 Planned — Full Operational Status |

---

## Site Map

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Hero, trust snapshot, persona hub, evidence preview |
| `/about` | About KWIN | Three pillars deep-dive |
| `/why-north-bengaluru` | Why North Bengaluru | Regional evidence case |
| `/timeline` | Timeline | Interactive development phases |
| `/sectors` | Sectors | Five economic sector targets |
| `/sustainability` | Sustainability | Metrics + infrastructure highlights |
| `/data-insights` | Data Insights | Live charts from OpenCity CKAN |
| `/evidence` | Evidence Vault | All seven OpenCity sources with supports/cannot-prove |
| `/sources` | Claim Ledger | Every claim mapped to its source(s) |
| `/for` | By Persona | Hub for five audience-specific paths |
| `/for/investor` | Investor | Investment case with sourced projections |
| `/for/resident` | Resident | Living, sustainability, community |
| `/for/researcher` | Researcher | Data access, evidence methodology |
| `/for/journalist` | Journalist | Verified/pending breakdown for reporting |
| `/for/curious-citizens` | Curious Citizens | Accessible overview |
| `/terms` | Terms | Legal notice (effective 25 March 2026) |

---

## Getting Started

### Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | 18.x LTS |
| npm | 9.x |
| Git | 2.x |

No database, Docker, or cloud credentials are needed. The only external service (OpenCity CKAN API) is public and requires no key.

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kwin-city-portal

# Install dependencies
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Open in VS Code (Recommended)

Use the provided workspace file for proper project isolation:

```bash
code kwin-city-portal.code-workspace
```

This prevents accidental multi-root workspace coupling with other local projects.

---

## Available Scripts

| Script | Command | What it does |
|--------|---------|-------------|
| **Dev server** | `npm run dev` | Start dev server on port 3000 |
| **Production build** | `npm run build` | Build for production (outputs to `.next/`) |
| **Production server** | `npm start` | Serve the production build |
| **Lint** | `npm run lint` | Run ESLint |
| **Test** | `npm test` | Run Vitest test suite |
| **Type check** | `npm run type-check` | TypeScript compiler (no emit) |
| **Format** | `npm run format` | Prettier — write all files |
| **Format check** | `npm run format:check` | Prettier — check only (CI-safe) |
| **Clean** | `npm run clean:next` | Delete `.next/` and `.next-dev/` |
| **Android release tag** | `yarn release:android 1.2.3` | Create and push `v1.2.3` tag (triggers signed APK/AAB build) |

---

## Android Release (Signed)

The repository includes a production Android release workflow at `.github/workflows/build-android.yml`.

### 1. Add GitHub Repository Secrets

Set these in **GitHub → Settings → Secrets and variables → Actions**:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

Tip to create `ANDROID_KEYSTORE_BASE64` locally:

```bash
base64 -i android/kwin-release.jks | pbcopy
```

### 2. Trigger Release in One Command

```bash
yarn release:android 1.2.3
```

This will:

1. Create and push tag `v1.2.3`
2. Trigger GitHub Actions
3. Build **signed** `APK` and `AAB`
4. Publish both under GitHub Releases

### 3. Keep TWA Verification in Sync

Update these with your **release keystore SHA-256 fingerprint**:

- `public/.well-known/assetlinks.json`
- `android/app/src/main/res/values/strings.xml`

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js (App Router) | 15 | SSR, file-based routing, API routes |
| Language | TypeScript | 5.3 | Type safety |
| Styling | Tailwind CSS | 3.4 | Utility-first CSS |
| Animation | Framer Motion | 11 | Entrances, stagger effects |
| Charts | Recharts | 3 | Live data visualization |
| Maps | Mapbox GL JS + react-map-gl | 3.6 / 7 | Future spatial visualization |
| State | Zustand | 4 | Client-side global state |
| Testing | Vitest | — | Unit/component tests |
| HTTP | Axios | 1.6 | HTTP utilities |
| Formatting | Prettier | 3 | Code style consistency |

---

## Project Structure

```
kwin-city-portal/
│
├── app/                          # Next.js App Router root
│   ├── layout.tsx                ← Root layout: font, SEO metadata, body
│   ├── page.tsx                  ← Home page
│   ├── globals.css               ← Tailwind base + CSS variables
│   │
│   ├── about/                    ← /about
│   ├── why-north-bengaluru/      ← /why-north-bengaluru
│   ├── timeline/                 ← /timeline
│   ├── sectors/                  ← /sectors
│   ├── sustainability/           ← /sustainability
│   ├── data-insights/            ← /data-insights
│   ├── evidence/                 ← /evidence
│   ├── sources/                  ← /sources (Claim Ledger)
│   ├── terms/                    ← /terms
│   │
│   ├── for/                      ← Persona routes
│   │   ├── page.tsx
│   │   ├── investor/
│   │   ├── resident/
│   │   ├── researcher/
│   │   ├── journalist/
│   │   └── curious-citizens/
│   │
│   ├── api/
│   │   └── opencity/route.ts     ← GET /api/opencity — CKAN proxy
│   │
│   ├── components/               ← All UI components (25 files)
│   ├── data/
│   │   └── constants.ts          ← Single source of truth for all data
│   └── types/
│       └── kwin.ts               ← All TypeScript interface definitions
│
├── docs/                         ← In-depth documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── COMPONENTS.md
│   ├── DATA_MODEL.md
│   ├── DEVELOPMENT.md
│   └── EVIDENCE_SYSTEM.md
│
├── CONTRIBUTING.md
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## The Evidence System

The Evidence System is what makes this portal different from typical promotional content.

### How it works

1. **Every claim has a badge.** Numbers, projections, and attributions are followed by small circular badges (S1, S2, …S9) linked to their source.

2. **Every source is registered.** The Source Registry in `app/data/constants.ts` defines what each source is, who published it, and its verification status.

3. **Every claim is mapped.** The Claim Ledger at `/sources` lists every substantive claim on the site and the sources that back it.

4. **"Cannot prove" lists.** The Evidence Vault at `/evidence` shows not just what each source supports, but what it **cannot prove** — a deliberate reminder of the limits of contextual evidence.

### Why this matters

Urban development projects at this scale attract investors, residents, journalists, and researchers who all need different things from the same data. The transparency system means:

- **Investors** see which projections are verified vs. aspirational.
- **Journalists** can immediately distinguish confirmed facts from claims pending verification.
- **Researchers** can see exactly which OpenCity datasets underpin regional context claims.
- **Residents** can trust that the portal doesn't overstate what is known.

See [docs/EVIDENCE_SYSTEM.md](docs/EVIDENCE_SYSTEM.md) for the complete documentation.

---

## Data Sources (S1–S9)

| Label | Key | Source | Publisher | Status |
|-------|-----|--------|-----------|--------|
| **S1** | `brief` | KWIN City Project Brief | BAJA Associates / KIADB | 🔍 Pending |
| **S2** | `kiadb` | KIADB Official Portal | Karnataka Government | ✅ Verified |
| **S3** | `aviation` | Bengaluru Aviation Traffic | OpenCity / AAI | ⚪ Contextual |
| **S4** | `economicSurvey` | Economic Survey Karnataka 2025–26 | OpenCity / GoK | ⚪ Contextual |
| **S5** | `strr` | STRR Documents | OpenCity / BDA | ⚪ Contextual |
| **S6** | `irr` | BDA IRR Documents | OpenCity / BDA | ⚪ Contextual |
| **S7** | `rainfall` | Karnataka Annual Rainfall | OpenCity / KSNDMC | ⚪ Contextual |
| **S8** | `groundwater` | Taluk-wise Groundwater Depth | OpenCity / CGWB | ⚪ Contextual |
| **S9** | `lakes` | Bengaluru Lakes & Maintainers | OpenCity / BBMP | ⚪ Contextual |

---

## Documentation

The `docs/` directory contains in-depth guides for every major system:

| Document | Read it when… |
|----------|--------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | You want to understand how the project is structured and how systems interact |
| [docs/API.md](docs/API.md) | You're working with the OpenCity data API or adding a new dataset |
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | You're building or modifying a UI component |
| [docs/DATA_MODEL.md](docs/DATA_MODEL.md) | You're adding or updating data in `constants.ts` |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | You're setting up the project or troubleshooting |
| [docs/EVIDENCE_SYSTEM.md](docs/EVIDENCE_SYSTEM.md) | You're adding claims, sources, or updating the Claim Ledger |

---

## KWIN News Feed Import

Use the prebuilt OPML file to monitor KWIN City and related Bengaluru updates in feed readers.

- OPML file: [docs/kwin-city-news-feeds.opml](docs/kwin-city-news-feeds.opml)

### Feedly

1. Open Feedly and go to **Organize Sources**.
2. Select **Import OPML**.
3. Upload `docs/kwin-city-news-feeds.opml`.
4. Review and move feeds into your preferred collections.

### Inoreader

1. Open Inoreader and go to **Preferences → Import/Export**.
2. Select **Import OPML**.
3. Upload `docs/kwin-city-news-feeds.opml`.
4. Adjust folder names and notification rules.

### Suggested Alert Rules

- High priority: `KWIN City`, `KHIR City`, `MB Patil`
- Medium priority: `Doddaballapura`, `KIADB`, `foreign universities Karnataka`
- Recommended cadence: immediate alerts for high priority, digest mode for medium priority

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution guide.

The short version: every new claim needs a source badge, every new source needs a registry entry, and every figure needs a Claim Ledger mapping. The evidence system is not optional.

---

## License

Private. All content is the intellectual property of BAJA Associates / Aarti S Ravikumar.  
Multiple claims on this site are pending primary source verification — see the [Claim Ledger](https://kwin-city.com/sources) for current status.

---

*Last updated: 25 March 2026 · Version 0.1.0 · Built with Next.js 15 + TypeScript*
