# Architecture

This document explains the high-level architecture of the KWIN City Portal — how it is structured, how data flows, how pages are composed, and how the key systems interact.

---

## Contents

1. [Technology Stack](#1-technology-stack)
2. [Directory Structure](#2-directory-structure)
3. [Rendering Model](#3-rendering-model)
4. [Page Composition](#4-page-composition)
5. [Data Flow](#5-data-flow)
6. [Source & Evidence System](#6-source--evidence-system)
7. [Design System](#7-design-system)
8. [Configuration](#8-configuration)
9. [Build Isolation](#9-build-isolation)

---

## 1. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js (App Router) | 15 | SSR, file-based routing, API routes |
| Language | TypeScript | 5.3 | Type safety across components and data |
| Styling | Tailwind CSS | 3.4 | Utility-first CSS, no separate stylesheet sprawl |
| Animation | Framer Motion | 11 | Page entrances, stagger effects, progress bars |
| Charts | Recharts | 3 | Bar, line, area, pie charts for Data Insights |
| Maps | Mapbox GL JS + react-map-gl | 3.6 / 7 | Spatial visualization (future use) |
| State | Zustand | 4 | Client-side global state (filter state, UI flags) |
| HTTP | Axios | 1.6 | Data fetching utilities |
| Date utilities | date-fns | 2 | Date formatting in Timeline |
| Testing | Vitest | — | Unit and component tests |
| Linting | ESLint (next config) | 8 | Code quality |
| Formatting | Prettier | 3 | Consistent code style |

---

## 2. Directory Structure

```
kwin-city-portal/
│
├── app/                          # Next.js App Router root
│   ├── layout.tsx                ← Root layout: font, SEO metadata, body class
│   ├── page.tsx                  ← Home page composition
│   ├── globals.css               ← Global CSS (Tailwind base + custom vars)
│   │
│   ├── about/page.tsx            ← /about — Three Pillars
│   ├── why-north-bengaluru/      ← /why-north-bengaluru — Regional evidence
│   ├── timeline/page.tsx         ← /timeline — Development phases
│   ├── sectors/page.tsx          ← /sectors — Economic sector targets
│   ├── sustainability/page.tsx   ← /sustainability — Metrics + infrastructure
│   ├── data-insights/page.tsx    ← /data-insights — Live OpenCity charts
│   ├── evidence/page.tsx         ← /evidence — Evidence Vault
│   ├── sources/page.tsx          ← /sources — Full Claim Ledger
│   ├── terms/page.tsx            ← /terms — Legal terms
│   │
│   ├── for/                      ← Persona hub + five persona pages
│   │   ├── page.tsx              ← /for — PersonaHub landing
│   │   ├── investor/page.tsx
│   │   ├── resident/page.tsx
│   │   ├── researcher/page.tsx
│   │   ├── journalist/page.tsx
│   │   └── curious-citizens/page.tsx
│   │
│   ├── api/
│   │   └── opencity/route.ts     ← GET /api/opencity — CKAN proxy
│   │
│   ├── components/               ← All UI components
│   │   ├── SiteFrame.tsx         ← Header + children + Footer wrapper
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ImageStrip.tsx
│   │   ├── BengaluruPride.tsx
│   │   ├── HomeSummary.tsx
│   │   ├── HomeTrustSnapshot.tsx
│   │   ├── HomeRouteGrid.tsx
│   │   ├── EvidencePreview.tsx
│   │   ├── PersonaHub.tsx
│   │   ├── PersonaPage.tsx
│   │   ├── PageIntro.tsx
│   │   ├── Pillars.tsx
│   │   ├── Timeline.tsx
│   │   ├── Sectors.tsx
│   │   ├── Sustainability.tsx
│   │   ├── WhyNorthBengaluru.tsx
│   │   ├── DataInsightsHub.tsx
│   │   ├── EvidenceVault.tsx
│   │   ├── SourceReferences.tsx
│   │   └── InlineSourceBadges.tsx
│   │
│   ├── data/
│   │   └── constants.ts          ← Single source of truth for all structured data
│   │
│   └── types/
│       └── kwin.ts               ← All TypeScript interface definitions
│
├── docs/                         ← Project documentation
│   ├── ARCHITECTURE.md           ← This file
│   ├── API.md
│   ├── COMPONENTS.md
│   ├── DATA_MODEL.md
│   ├── DEVELOPMENT.md
│   └── EVIDENCE_SYSTEM.md
│
├── next.config.js                ← Next.js config (security headers, image domains, distDir)
├── tailwind.config.js            ← Tailwind theme and content paths
├── tsconfig.json                 ← TypeScript config
├── postcss.config.js             ← PostCSS (Tailwind + Autoprefixer)
├── package.json                  ← Scripts and dependencies
├── README.md                     ← Entry-point documentation
├── CONTRIBUTING.md               ← How to contribute
└── kwin-city-portal.code-workspace  ← VS Code workspace isolator
```

---

## 3. Rendering Model

The portal uses Next.js 15 **App Router** with a deliberate mix of Server and Client Components.

### Server Components (default)

Used for: static layouts, prose content, data display, page composition.

```
SiteFrame, HomeSummary, HomeRouteGrid, EvidencePreview,
PageIntro, PersonaPage, WhyNorthBengaluru
```

These components render entirely on the server — no JavaScript is sent to the browser for them. They are fast, SEO-friendly, and can directly import constants from `app/data/constants.ts`.

### Client Components (`'use client'`)

Used for: interactive UI, animations, live data fetch, hover effects, state.

```
Header, Footer, Hero, ImageStrip, BengaluruPride,
HomeTrustSnapshot, PersonaHub, Pillars, Timeline, Sectors,
Sustainability, DataInsightsHub, EvidenceVault,
SourceReferences, InlineSourceBadges
```

Client components ship JavaScript to the browser and support `useState`, `useEffect`, Framer Motion, and Recharts.

### ISR (Incremental Static Regeneration)

The OpenCity API proxy uses `next: { revalidate: 3600 }` on all upstream fetches. This means:
- Each unique CKAN request is statically cached for 1 hour
- No cold-start latency for chart data on repeat visits
- Stale-while-revalidate: if the cache is expired, the old data is served while fresh data is fetched in the background

---

## 4. Page Composition

Every page follows the same composition pattern:

```tsx
// Standard page structure
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import SomeFeatureComponent from '@/components/SomeFeatureComponent';
import { RELEVANT_SOURCE_IDS } from '@/data/constants';

export const metadata = { title: 'Page Title' };

export default function MyPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Section Label"
        title="Main Heading"
        description="Introductory paragraph..."
        sourceIds={RELEVANT_SOURCE_IDS}
      />
      <SomeFeatureComponent />
    </SiteFrame>
  );
}
```

**Exceptions:**
- `app/page.tsx` (home) does not use `PageIntro` — it uses `Hero` as the entry point
- `app/sources/page.tsx` does not use `SiteFrame` — it renders the Claim Ledger standalone with its own minimal layout

---

## 5. Data Flow

### Static Data (most pages)

```
app/data/constants.ts
        │
        ▼
Component imports data directly
        │
        ▼
Rendered as HTML on the server (or hydrated on client)
        │
        ▼
InlineSourceBadges links to /sources#{source-id}
```

### Live Data (Data Insights page)

```
User: "Generate Chart"
        │
        ▼
DataInsightsHub → fetch('/api/opencity?dataset=<slug>')
        │
        ▼
app/api/opencity/route.ts
        │
        ├── fetch: CKAN package_show  (cached 1 hr)
        │         → discover resource_id
        │
        └── fetch: CKAN datastore_search  (cached 1 hr)
                  → returns records[]
        │
        ▼
Recharts renders Bar/Line/Area/Pie chart
```

---

## 6. Source & Evidence System

The Evidence System is a first-class architectural concern, not an afterthought. See [EVIDENCE_SYSTEM.md](EVIDENCE_SYSTEM.md) for full details.

At the architecture level, the system has three layers:

```
Layer 1: KWIN_SOURCE_REGISTRY   → defines what sources exist and their status
                │
Layer 2: KWIN_CLAIM_MAPPINGS    → maps each site claim to its source(s)
                │
Layer 3: InlineSourceBadges     → renders badges inline next to each claim
         SourceReferences       → renders full source block per section
         /sources page          → renders the complete Claim Ledger
```

This separation means:
- Sources can be updated in one place and all badges update automatically.
- The `/sources` page is always the authoritative, complete record.
- A new source can be added to the registry and immediately used across any page.

---

## 7. Design System

The portal uses Tailwind CSS exclusively — no separate CSS modules or styled-components.

### Color Palette

| Role | Color | Tailwind |
|------|-------|---------|
| Knowledge (blue) | `#3b82f6` | `blue-500` |
| Wellbeing (green) | `#10b981` | `emerald-500` |
| Innovation (amber) | `#f59e0b` | `amber-500` |
| Verified badge | `#10b981` | `emerald-500` |
| Pending badge | `#f59e0b` | `amber-500` |
| Contextual badge | `#3b82f6` | `blue-500` |
| Background (sections) | `#1f2937` | `gray-800` |
| Background (dark hero) | `#111827` | `gray-900` |
| Text (body) | `#111827` | `gray-900` |

### Typography

Single font family: **Inter** (loaded via `next/font/google` in `app/layout.tsx`).  
CSS variable: `--font-inter`.  
Applied to: `body` class.

### Spacing

Base unit: `4px` (Tailwind's default scale).  
Sections use `py-16` to `py-24` (64–96px) vertical padding.  
Content containers use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

### Animations

Framer Motion is used for:
- Hero headline stagger (letters animate in with `y` + `opacity`)
- Gradient orb entrance (Hero background)
- Timeline progress bar (width animates from 0 to target %)
- Persona card hover glow

---

## 8. Configuration

### `next.config.js`

Key settings:
- `reactStrictMode: true` — surfaces double-invocation bugs in development
- `images.remotePatterns` — allows Next.js `<Image>` from Mapbox, Cloudinary, Unsplash
- `images.formats: ['image/avif', 'image/webp']` — modern image formats for performance
- Security headers on all routes: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`
- `distDir` is isolated by phase: `.next-dev` in development, `.next` in production

### `tailwind.config.js`

Content paths include `app/**/*.{ts,tsx}` so Tailwind purges unused classes from the build bundle.

### `tsconfig.json`

Path alias `@/` maps to the project root, enabling clean imports:
```ts
import SiteFrame from '@/components/SiteFrame';
import { KWIN_PILLARS } from '@/data/constants';
```

---

## 9. Build Isolation

The `kwin-city-portal.code-workspace` file ensures VS Code opens this project as a single-root workspace. This prevents accidental multi-root workspace coupling with unrelated local projects.

Build artifacts are isolated by phase:
- **Development:** `.next-dev/` (avoids manifest corruption from switching between `next dev` and `next build`)
- **Production:** `.next/`

To clear both:
```bash
npm run clean:next
# Runs: rm -rf .next .next-dev
```
