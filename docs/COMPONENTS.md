# Component Reference

Every UI component in the KWIN City Portal is documented here: its purpose, props, rendering context (server vs. client), and key usage notes.

---

## Contents

- [Architecture Overview](#architecture-overview)
- [Layout Components](#layout-components)
  - [SiteFrame](#siteframe)
  - [Header](#header)
  - [Footer](#footer)
- [Home Page Components](#home-page-components)
  - [Hero](#hero)
  - [ImageStrip](#imagestrip)
  - [BengaluruPride](#bengalurupride)
  - [HomeSummary](#homesummary)
  - [HomeTrustSnapshot](#hometrustsnapshot)
  - [HomeRouteGrid](#homeroutegrid)
  - [EvidencePreview](#evidencepreview)
  - [PersonaHub](#personahub)
- [Page-Level Components](#page-level-components)
  - [PageIntro](#pageintro)
  - [PersonaPage](#personapage)
- [Feature Components](#feature-components)
  - [Pillars](#pillars)
  - [Timeline](#timeline)
  - [Sectors](#sectors)
  - [Sustainability](#sustainability)
  - [WhyNorthBengaluru](#whynorthbengaluru)
  - [StrategicLocationMap](#strategiclocationmap)
  - [DataInsightsHub](#datainsightshub)
  - [EvidenceVault](#evidencevault)
- [Evidence & Source Components](#evidence--source-components)
  - [SourceReferences](#sourcereferences)
  - [InlineSourceBadges](#inlinesourcebadges)

---

## Architecture Overview

Components follow a clear two-level pattern:

```
SiteFrame
└── Header (client — sticky nav)
│
├── [Page-specific components]
│   ├── PageIntro (server — eyebrow + h1 + SourceReferences)
│   ├── Feature components (mostly client — interactive)
│   └── InlineSourceBadges (client — badge annotation)
│
└── Footer (client — CTA + links)
```

**Rendering context:**
- **Server Components** (no `'use client'`) are used for static layouts, data display sections, and page wrappers. They are cheaper to render and can access server-side data directly.
- **Client Components** (`'use client'` at top) are used for interactive elements: animations, dynamic fetch, state, hover effects.

---

## Layout Components

### SiteFrame

**File:** `app/components/SiteFrame.tsx`  
**Renders on:** Server  
**Purpose:** The universal page wrapper. Wraps every page in `<Header>`, `{children}`, `<Footer>`.

```tsx
// Usage (in any page file)
import SiteFrame from '@/components/SiteFrame';

export default function MyPage() {
  return (
    <SiteFrame>
      {/* page content */}
    </SiteFrame>
  );
}
```

**Notes:**
- Every page except the standalone `/sources` page uses `SiteFrame`.
- Do not add margin or padding inside `SiteFrame` — let child components own their spacing.

---

### Header

**File:** `app/components/Header.tsx`  
**Renders on:** Client  
**Purpose:** Fixed sticky navigation bar with transparent→white scroll transition, "By Persona" dropdown, and mobile hamburger menu.

**Navigation items:**
| Label | Route |
|-------|-------|
| Why North Bengaluru | `/why-north-bengaluru` |
| About KWIN | `/about` |
| Timeline | `/timeline` |
| Sectors | `/sectors` |
| Sustainability | `/sustainability` |
| Data Insights | `/data-insights` |
| Evidence | `/evidence` |
| By Persona ▾ | Dropdown → `/for/*` |

**Notes:**
- Uses `useScrollPosition` / `useEffect` to switch from transparent to solid white at scroll Y > 10px.
- Mobile hamburger is positioned at right. When open, the nav renders as a full-width dropdown overlay.
- "By Persona" dropdown renders links to all five persona routes.

---

### Footer

**File:** `app/components/Footer.tsx`  
**Renders on:** Client  
**Purpose:** Dark-background footer with a CTA banner, six link columns, and legal notice.

**Link columns:** Explore, Research, By Audience, Open Data  
**Copyright:** BAJA Associates / Aarti S Ravikumar

---

## Home Page Components

### Hero

**File:** `app/components/Hero.tsx`  
**Renders on:** Client  
**Purpose:** Full-screen dark hero section with animated gradient orbs, staggered K/W/I headline, and a stats strip.

**Key features:**
- Framer Motion stagger animation on the K / W / I headline letters
- Decorative gradient orbs (CSS `radial-gradient`) animate on load
- Stats strip shows KWIN City's headline numbers with source badges

---

### ImageStrip

**File:** `app/components/ImageStrip.tsx`  
**Renders on:** Client  
**Purpose:** A horizontal strip of 5 Unsplash images providing visual context for North Bengaluru and urban development.

**Important:** A visible disclaimer reads *"Images are illustrative and do not represent literal KWIN photography."*

---

### BengaluruPride

**File:** `app/components/BengaluruPride.tsx`  
**Renders on:** Client  
**Purpose:** Dark section with four regional evidence cards: Silicon Valley of India, World-Class Airport, STRR/IRR Corridors, Economic Ambition. Each card renders `<InlineSourceBadges>`.

```tsx
// Example card structure (illustrative)
<EvidenceCard
  title="World-Class Airport"
  description="37M+ annual passengers..."
  sourceIds={['aviation']}
/>
```

---

### HomeSummary

**File:** `app/components/HomeSummary.tsx`  
**Renders on:** Server  
**Purpose:** Three numbered answer-cards replying to the most common visitor questions:
1. What is KWIN?
2. Why North Bengaluru?
3. Can I trust it?

Each card uses a stretched link to navigate to the relevant deep-dive page.

---

### HomeTrustSnapshot

**File:** `app/components/HomeTrustSnapshot.tsx`  
**Renders on:** Client  
**Purpose:** A three-column trust matrix explaining the portal's three evidence tiers to new visitors.

| Column | Color | Tier |
|--------|-------|------|
| Confirmed Context | Green | ✅ Verified |
| Project Proposal | Amber | 🔍 Pending |
| Regional Evidence | Blue | ⚪ Contextual |

---

### HomeRouteGrid

**File:** `app/components/HomeRouteGrid.tsx`  
**Renders on:** Server  
**Purpose:** Six large navigation cards linking to the site's primary sections. Provides a map of the site for first-time visitors.

---

### EvidencePreview

**File:** `app/components/EvidencePreview.tsx`  
**Renders on:** Server  
**Purpose:** Preview of the first three evidence sources from `KWIN_EVIDENCE_SOURCES`. Includes CTAs to the full Evidence Vault (`/evidence`) and Source Registry (`/sources`).

---

### PersonaHub

**File:** `app/components/PersonaHub.tsx`  
**Renders on:** Client  
**Purpose:** Five full-bleed persona cards with gradient overlay imagery and hover-glow animations. Each card links to the corresponding `/for/*` page.

**Personas:** Investor, Resident, Researcher, Journalist, Curious Citizen

---

## Page-Level Components

### PageIntro

**File:** `app/components/PageIntro.tsx`  
**Renders on:** Server  
**Purpose:** Reusable page-header component. Renders an eyebrow label, `<h1>` title, prose description, and a `<SourceReferences>` block.

```tsx
import PageIntro from '@/components/PageIntro';
import { PILLARS_SOURCE_IDS } from '@/data/constants';

<PageIntro
  eyebrow="About KWIN"
  title="Three Pillars, One City"
  description="KWIN City is built on three foundational commitments..."
  sourceIds={PILLARS_SOURCE_IDS}
/>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `eyebrow` | `string` | Yes | Small label above the heading |
| `title` | `string` | Yes | `<h1>` text |
| `description` | `string` | Yes | Introductory paragraph |
| `sourceIds` | `string[]` | No | Source keys to render as `<SourceReferences>` |

---

### PersonaPage

**File:** `app/components/PersonaPage.tsx`  
**Renders on:** Server  
**Purpose:** Reusable template for all five `/for/*` persona pages. Renders a dark hero + image, a four-cell stats strip, a two-column section grid, and an evidence CTA.

All five persona pages (`investor`, `resident`, `researcher`, `journalist`, `curious-citizens`) pass persona-specific props to this component rather than duplicating layout code.

**Key prop shape (illustrative):**

```ts
interface PersonaPageProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  stats: Array<{ label: string; value: string }>;
  sections: Array<{ heading: string; body: string }>;
}
```

---

## Feature Components

### Pillars

**File:** `app/components/Pillars.tsx`  
**Renders on:** Client  
**Purpose:** Renders three pillar cards from `KWIN_PILLARS`, each with a color-coded top border, emoji icon, feature list, and source badges.

**Data source:** `KWIN_PILLARS` from `app/data/constants.ts`  
**Source badges:** `PILLARS_SOURCE_IDS`

---

### Timeline

**File:** `app/components/Timeline.tsx`  
**Renders on:** Client  
**Purpose:** Horizontal tab selector for the six development phases. The selected phase displays its title, an animated progress bar, and a milestone checklist.

**Data source:** `KWIN_TIMELINE_PHASES`

**Interaction:** Clicking a phase tab updates the displayed content via local `useState`. The progress bar animates on mount using Framer Motion.

---

### Sectors

**File:** `app/components/Sectors.tsx`  
**Renders on:** Client  
**Purpose:** Five sector cards with projected jobs, investment, and industry focus tags. A blue transparency note reminds visitors that figures are pending verification.

**Data source:** `KWIN_SECTORS`  
**Source badges:** `SECTORS_SOURCE_IDS`

---

### Sustainability

**File:** `app/components/Sustainability.tsx`  
**Renders on:** Client  
**Purpose:** Two panels: six sustainability metric cards (target, unit, deadline) and six infrastructure highlights. Inline source badges cite rainfall, groundwater, and lakes data.

**Data sources:** `KWIN_SUSTAINABILITY_METRICS`, `KWIN_INFRASTRUCTURE`  
**Source badges:** `SUSTAINABILITY_SOURCE_IDS`

---

### WhyNorthBengaluru

**File:** `app/components/WhyNorthBengaluru.tsx`  
**Renders on:** Server  
**Purpose:** Four evidence-article sections explaining the regional case for North Bengaluru (airport proximity, corridor access, economic context, historical precedent). An amber warning box reminds readers of the "important boundary" between regional context and project-specific proof.

---

### StrategicLocationMap

**File:** `app/components/StrategicLocationMap.tsx`  
**Renders on:** Client  
**Purpose:** Interactive geographic map visualization showing KWIN City's strategic position relative to key infrastructure and landmarks. This is the most important spatial visualization for all users, providing geographic context for why North Bengaluru is positioned as the optimal location for the township.

**Features:**
- **Interactive Mapbox GL JS map** centered on Doddaballapura, North Bengaluru (13.1939°N, 77.6045°E)
- **Location markers** for:
  - KWIN City (465-acre proposed site)
  - Bengaluru International Airport (~12 km adjacent)
  - City center landmark (~40 km south)
  - Satellite Town Ring Road (STRR) connectivity corridor
  - Whitefield Tech Corridor (~35 km south)
  - Electronic City (~50 km south)
  - Intermediate Ring Road (IRR) node
- **Site boundary visualization** showing approximate 465-acre KWIN footprint
- **Authenticated data sources** with clickable references to OpenCity datasets
- **Graceful fallback** if Mapbox token is not configured (static information card)

**Data sources:** 
- `KWIN_GEOGRAPHIC_LOCATIONS` from `app/data/constants.ts`
- `KWIN_EVIDENCE_SOURCES` (for source attribution)
- OpenStreetMap, Government of Karnataka (KIADB), OpenCity datasets

**Integration note:** Used on `/why-north-bengaluru` page to provide visual clarity on regional strategic positioning.

**Environment requirement:**
```
NEXT_PUBLIC_MAPBOX_TOKEN=<your_mapbox_public_token>
```

---

### DataInsightsHub

**File:** `app/components/DataInsightsHub.tsx`  
**Renders on:** Client  
**Purpose:** Interactive live data visualization hub. Fetches OpenCity CKAN datasets via `/api/opencity` and renders them as Bar, Line, Area, or Pie charts using Recharts.

**Features:**
- Tag-filter pills to narrow the dataset list
- "Generate Chart" button triggers a live fetch of the selected dataset
- Post-load chart-type switcher (Bar / Line / Area / Pie)
- A provenance note explains that all data comes from OpenCity and is cached for 1 hour

**Data flow:**
```
User clicks "Generate Chart"
  → fetch('/api/opencity?dataset=<slug>')
  → API proxy fetches CKAN datastore_search
  → Returns JSON records
  → Recharts renders the chart
```

---

### EvidenceVault

**File:** `app/components/EvidenceVault.tsx`  
**Renders on:** Client  
**Purpose:** Renders all seven OpenCity sources from `KWIN_EVIDENCE_SOURCES`. Each source card shows:
- Publisher and scope
- ✅ "Useful for saying..." (green list)
- ❌ "Not enough to prove..." (red list)

---

## Evidence & Source Components

### SourceReferences

**File:** `app/components/SourceReferences.tsx`  
**Renders on:** Client  
**Purpose:** Renders a labeled source block: numbered badges (S1–S9), status pills (green/amber/blue), brief note, and URL link for each source.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sourceIds` | `string[]` | Yes | Keys from `KWIN_SOURCE_REGISTRY` to display |

```tsx
import SourceReferences from '@/components/SourceReferences';

<SourceReferences sourceIds={['brief', 'kiadb']} />
```

---

### InlineSourceBadges

**File:** `app/components/InlineSourceBadges.tsx`  
**Renders on:** Client  
**Purpose:** Tiny circular badges rendered inline with a claim. Each badge shows the source label (S1–S9), colored by status, and links to `/sources#{source-id}`.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sourceIds` | `string[]` | Yes | Source keys to render as badges |

```tsx
import InlineSourceBadges from '@/components/InlineSourceBadges';

<p>
  KWIN City will create 100,000+ high-skill jobs.
  <InlineSourceBadges sourceIds={['brief']} />
</p>
```

**Badge color by status:**

| Status | Ring Color |
|--------|-----------|
| `verified` | Green (`#10b981`) |
| `pending-verification` | Amber (`#f59e0b`) |
| `contextual` | Blue (`#3b82f6`) |

**Accessibility:** Each badge renders with an `aria-label` describing the source title and status, so screen readers can identify the source without seeing the badge visually.
