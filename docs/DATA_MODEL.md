# Data Model Reference

This document describes every TypeScript type, interface, and data constant in the KWIN City Portal codebase. It is the authoritative reference for anyone adding new data, updating existing records, or building new components.

---

## Contents

1. [Single Source of Truth](#1-single-source-of-truth)
2. [TypeScript Interfaces (`app/types/kwin.ts`)](#2-typescript-interfaces)
3. [Data Constants (`app/data/constants.ts`)](#3-data-constants)
4. [Adding or Updating Data](#4-adding-or-updating-data)

---

## 1. Single Source of Truth

All structured data lives in exactly **two files**:

| File | Purpose |
|------|---------|
| [`app/types/kwin.ts`](../app/types/kwin.ts) | TypeScript interface definitions — the shape of all data |
| [`app/data/constants.ts`](../app/data/constants.ts) | All actual data objects, arrays, and group constants |

Components never define their own data literals. They import from `constants.ts`. If you find data defined inside a component, it should be moved to `constants.ts`.

---

## 2. TypeScript Interfaces

All interfaces are exported from `app/types/kwin.ts`.

### `TimelinePhase`

Represents a single phase in KWIN City's development plan.

```ts
interface TimelinePhase {
  id: string;                                              // e.g. 'phase-1'
  year: number;                                           // e.g. 2025
  title: string;                                          // Short phase name
  description: string;                                    // 1–2 sentence summary
  milestones: string[];                                   // Bullet list of deliverables
  status: 'completed' | 'in-progress' | 'planned';
  progress?: number;                                      // 0–100 percent complete
}
```

### `Pillar`

One of the three foundational pillars of KWIN City (Knowledge, Wellbeing, Innovation).

```ts
interface Pillar {
  id: string;                // 'knowledge' | 'wellbeing' | 'innovation'
  title: string;             // Display name
  subtitle: string;          // One-line tagline
  description: string;       // Paragraph description
  icon: string;              // Unicode emoji icon
  features: string[];        // List of key capabilities / offerings
  keyPartners?: string[];    // Notable partner institutions (optional)
  color: string;             // Hex color for the pillar's accent theme
}
```

### `InfrastructureItem`

A discrete infrastructure project within KWIN City.

```ts
interface InfrastructureItem {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'under-construction' | 'planned';
  capacity?: string;         // e.g. '50 MW' or '10 million litres/day'
  location?: string;         // Sub-location within the KWIN site
  certifications?: string[]; // e.g. ['LEED Platinum', 'ISO 14001']
}
```

### `Sector`

An economic sector targeted for development in KWIN's Innovation District.

```ts
interface Sector {
  id: string;
  name: string;
  description: string;
  industryFocus: string[];   // Key sub-industries or use cases
  expectedJobs: number;      // Projected direct employment (pending verification)
  expectedInvestment: string; // e.g. '₹12,000 Cr' (pending verification)
}
```

> **Note:** `expectedJobs` and `expectedInvestment` are sourced from the KWIN project brief (S1) and are pending-verification figures. Never display them without a source badge.

### `SourceCitation`

A lightweight citation attached to a `ContentBlock`.

```ts
interface SourceCitation {
  title: string;
  url?: string;
  author?: string;
  date?: string;             // ISO date string, e.g. '2025-03-01'
  status: 'verified' | 'pending-verification' | 'unconfirmed';
}
```

### `ContentBlock`

A discrete piece of content (e.g., a section of an article) with associated citations.

```ts
interface ContentBlock {
  id: string;
  title: string;
  content: string;           // Rendered as prose; may contain Markdown
  citations: SourceCitation[];
  lastUpdated: string;       // ISO date string
}
```

### `SustainabilityMetric`

A single quantified sustainability goal.

```ts
interface SustainabilityMetric {
  name: string;              // e.g. 'Green Cover'
  target: string;            // e.g. '40%'
  current?: string;          // Current baseline, if measurable
  unit: string;              // e.g. '%', 'tonnes CO₂', '°C'
  deadline?: string;         // e.g. '2030'
}
```

### `EvidenceSource`

An OpenCity dataset or external data source used in the Evidence Vault.

```ts
interface EvidenceSource {
  id: string;                // Matches a key in KWIN_SOURCE_REGISTRY
  title: string;             // Dataset title
  publisher: string;         // e.g. 'OpenCity / KSNDMC'
  scope: string;             // What the dataset covers
  url: string;               // Direct link to the dataset
  status: 'contextual' | 'project-adjacent';
  summary: string;           // 2–3 sentence plain-language description
  supports: string[];        // List of things this source legitimately supports
  cannotProve: string[];     // Explicit list of things this source cannot prove
}
```

### `SourceReference`

A source registry entry, used for inline badges and the `/sources` claim ledger.

```ts
interface SourceReference {
  id: string;                // Semantic key, e.g. 'brief', 'kiadb', 'rainfall'
  label: string;             // Short badge label, e.g. 'S1', 'S2'
  title: string;             // Full source title
  publisher: string;
  url?: string;              // Deep link to the document/dataset
  note: string;              // How to interpret this source
  status: 'verified' | 'pending-verification' | 'contextual';
}
```

### `ClaimMapping`

Maps a specific site claim to its supporting source(s). Powers the `/sources` Claim Ledger.

```ts
interface ClaimMapping {
  id: string;                // Semantic claim ID, e.g. 'location', 'scope'
  section: string;           // Site section where claim appears
  claim: string;             // Human-readable statement being made
  sourceIds: string[];       // One or more keys from KWIN_SOURCE_REGISTRY
  status: 'verified' | 'pending-verification' | 'contextual';
}
```

### `GeographicLocation`

Represents a geographic point or area relevant to KWIN City's strategic location and connectivity. Powered by verified government data (KIADB, OpenCity, OpenStreetMap).

```ts
interface GeographicLocation {
  id: string;                                    // Unique identifier, e.g. 'kwin-site'
  name: string;                                  // Display name
  coordinates: [number, number];                 // [longitude, latitude]
  type: 'kwin-site' | 'airport' | 'landmark' | 'connectivity';
  description: string;                           // 1–2 sentence summary
  distance?: string;                             // Distance from KWIN City (e.g. '~12 km')
  sourceId?: string;                             // Reference to KWIN_EVIDENCE_SOURCES key
}
```

---

## 3. Data Constants

All constants are exported from `app/data/constants.ts`.

### `KWIN_TIMELINE_PHASES: TimelinePhase[]`

Six development phases spanning 2024–2030.

| `id` | Year | Status | Progress |
|------|------|--------|----------|
| `phase-0` | 2024 | `completed` | 100% |
| `phase-1` | 2025 | `in-progress` | 35% |
| `phase-2` | 2026 | `planned` | 10% |
| `phase-3` | 2027 | `planned` | 0% |
| `phase-4` | 2028 | `planned` | 0% |
| `phase-5` | 2030 | `planned` | 0% |

### `KWIN_PILLARS: Pillar[]`

| `id` | Title | Icon | Color |
|------|-------|------|-------|
| `knowledge` | Knowledge District | 🎓 | `#3b82f6` (blue) |
| `wellbeing` | Wellbeing District | 🌿 | `#10b981` (green) |
| `innovation` | Innovation District | ⚡ | `#f59e0b` (amber) |

### `KWIN_INFRASTRUCTURE: InfrastructureItem[]`

Five infrastructure items: Solar Farm, Water Management System (10 lakes), STRR Connectivity, Healthcare Hub, and Multimodal Transit.

### `KWIN_SECTORS: Sector[]`

Five targeted economic sectors with projected employment and investment:

| Sector | Jobs | Investment |
|--------|------|------------|
| ICT & Software | 30,000 | ₹12,000+ Cr |
| Semiconductor Manufacturing | 25,000 | ₹8,000+ Cr |
| Health-Tech & Medical Devices | 20,000 | ₹6,000+ Cr |
| Aerospace & Defence | 15,000 | ₹5,000+ Cr |
| Renewable Energy & Green Tech | 10,000 | ₹4,000+ Cr |

> All figures are from the KWIN project brief (S1) and are pending-verification.

### `KWIN_SUSTAINABILITY_METRICS: SustainabilityMetric[]`

| Metric | Target | Deadline |
|--------|--------|---------|
| Green Cover | 40% of land area | 2030 |
| Renewable Energy | 100% on-site generation | 2030 |
| Water Recycling | 80% wastewater recycled | 2029 |
| Carbon Neutrality | Net-zero Scope 1+2 | 2030 |
| Biodiversity Index | Baseline established | 2028 |
| Urban Heat Island | −2 to −3 °C vs. surroundings | 2029 |

### `KWIN_FACTS`

A three-bucket object grouping claims by verification status:
- `verified`: Array of confirmed fact strings
- `pendingVerification`: Array of claims awaiting primary source confirmation
- `unconfirmed`: Array of aspirational or externally-referenced claims

### `KWIN_GEOGRAPHIC_LOCATIONS: GeographicLocation[]`

Seven geographic points and corridors representing KWIN City's strategic spatial context. All coordinates are sourced from verified public records (Government of Karnataka, KIADB, OpenStreetMap, OpenCity datasets).

| ID | Name | Type | Coordinates | Distance | Source |
|----|---------|----|-----------|-------|--------|
| `kwin-site` | KWIN City (Proposed) | kwin-site | 77.6045°E, 13.1939°N | — | KIADB |
| `bangalore-airport` | Bengaluru International Airport | airport | 77.7099°E, 13.1939°N | ~12 km | Aviation Traffic Data (S3) |
| `city-center` | Bengaluru City Center | landmark | 77.6369°E, 12.9716°N | ~40 km | OpenStreetMap |
| `strr-corridor` | Satellite Town Ring Road | connectivity | 77.6045°E, 13.0939°N | — | STRR Documents (S4) |
| `whitefield` | Whitefield Tech Corridor | landmark | 77.7499°E, 12.9656°N | ~35 km | OpenStreetMap |
| `electronic-city` | Electronic City | landmark | 77.6769°E, 12.8386°N | ~50 km | OpenStreetMap |
| `irr-node` | Intermediate Ring Road | connectivity | 77.5545°E, 13.0145°N | — | IRR Documents (S5) |

**Usage:**  Powers the interactive `StrategicLocationMap` component on `/why-north-bengaluru`.

**Key insight:** KWIN's location is defensible on three grounds: (1) airport adjacency (~12 km), (2) STRR corridor integration, (3) regional growth logic tied to Bengaluru's expanding metropolitan ecosystem.

### `KWIN_EVIDENCE_PRINCIPLES`

Four editorial guardrail strings, rendered in the Evidence Vault header.

### `KWIN_EVIDENCE_SOURCES: EvidenceSource[]`

Seven OpenCity datasets with full `supports` / `cannotProve` disclosures. Corresponds to sources S3–S9.

### `KWIN_SOURCE_REGISTRY: SourceReference[]`

Nine source registrations (S1–S9). This is the ground-truth for all badge rendering.

### Source Group Constants

```ts
export const HERO_SOURCE_IDS:           string[] // ['brief', 'kiadb', 'aviation', 'economicSurvey']
export const TIMELINE_SOURCE_IDS:       string[] // ['brief', 'kiadb']
export const PILLARS_SOURCE_IDS:        string[] // ['brief', 'kiadb', 'economicSurvey']
export const SECTORS_SOURCE_IDS:        string[] // ['brief', 'economicSurvey', 'aviation', 'strr']
export const SUSTAINABILITY_SOURCE_IDS: string[] // ['brief', 'rainfall', 'groundwater', 'lakes']
```

### `KWIN_CLAIM_MAPPINGS: ClaimMapping[]`

Ten claim-to-source mappings. The complete list is rendered at `/sources`.

---

## 4. Adding or Updating Data

### To update a timeline phase

Edit the relevant object in `KWIN_TIMELINE_PHASES`. When a phase moves from `planned` to `in-progress`, update both `status` and `progress`.

### To add a new sector

Add an object to `KWIN_SECTORS` following the `Sector` interface. If the sector isn't backed by a primary source, create a new `ClaimMapping` with `status: 'pending-verification'` and add `<InlineSourceBadges>` to the `Sectors` component.

### To add a new sustainability metric

Add an object to `KWIN_SUSTAINABILITY_METRICS`. If it comes from the project brief, add `brief` to `SUSTAINABILITY_SOURCE_IDS`.

### To register a new source

1. Add a `SourceReference` object to `KWIN_SOURCE_REGISTRY` with the next sequential label.
2. If it is an OpenCity dataset, also add an `EvidenceSource` object to `KWIN_EVIDENCE_SOURCES`.
3. Add the new key to the relevant source group constant.
4. Update all `ClaimMapping` entries that should reference it.

### To change a figure

1. Update the value in the relevant constant array.
2. If the source of that figure has changed, update the `sourceIds` in the affected `ClaimMapping`.
3. If the change affects a source's `supports` / `cannotProve` lists, update `KWIN_EVIDENCE_SOURCES` accordingly.
