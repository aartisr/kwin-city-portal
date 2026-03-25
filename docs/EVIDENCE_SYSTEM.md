# The Evidence System

> *"We don't just present the vision. We show you the evidence — and we're honest about what the evidence can and cannot prove."*

The Evidence System is the intellectual backbone of the KWIN City Portal. Every substantive claim published on the site is traceable to at least one source, and every source is clearly categorized by its evidential reach.

---

## Contents

1. [Philosophy: Radical Epistemic Transparency](#1-philosophy-radical-epistemic-transparency)
2. [The Three Evidence Tiers](#2-the-three-evidence-tiers)
3. [Source Registry (S1–S9)](#3-source-registry-s1s9)
4. [Inline Source Badges](#4-inline-source-badges)
5. [Claim Ledger](#5-claim-ledger)
6. [Evidence Vault](#6-evidence-vault)
7. [Editorial Guardrails](#7-editorial-guardrails)
8. [Maintaining the Evidence System](#8-maintaining-the-evidence-system)

---

## 1. Philosophy: Radical Epistemic Transparency

Urban development projects — especially at the scale of KWIN City (₹40,000 Cr, 465+ acres, 100,000+ projected jobs) — attract a wide range of stakeholders with different information needs and different tolerances for uncertainty. Investors, residents, journalists, and researchers all deserve to know **not just what is claimed, but how well-supported each claim actually is**.

The KWIN City Portal operationalizes this with four editorial guardrails:

| # | Guardrail |
|---|-----------|
| 1 | **Source every claim.** No claim appears without at least one source badge. |
| 2 | **Distinguish tiers.** Primary institutional documents, pending-verification claims, and regional contextual data are never mixed without clear labeling. |
| 3 | **State what can't be proven.** Each source's `cannotProve` list is as important as its `supports` list. |
| 4 | **Update openly.** When a source is verified or withdrawn, both the source registry and all affected claim mappings are updated together. |

---

## 2. The Three Evidence Tiers

### ✅ Verified / Confirmed Context

A claim is **verified** when it is sourced from an official government document, institutional portal, or a formally published primary source.

**Examples:**
- KIADB's official portal confirming the project's location in Doddaballapura
- OpenCity datasets published by Karnataka government agencies

### 🔍 Pending Verification

A claim is **pending verification** when it derives from a project brief, promotional material, or a secondary source that has not yet been cross-confirmed by KIADB or a government agency. These are not falsehoods — they are published claims that require primary-source confirmation.

**Examples:**
- Investment targets (₹40,000 Cr) from the KWIN project brief
- Employment projections (100,000+ jobs) from the project brief

### ⚪ Contextual / Regional Evidence

A claim uses **contextual evidence** when it relies on regional public data (e.g., airport traffic, rainfall, groundwater depth) that is legitimately relevant to the region but does not directly prove anything about the KWIN project specifically.

**Examples:**
- Bengaluru International Airport traffic data supporting a claim about regional connectivity
- Karnataka rainfall data supporting a claim about water planning feasibility

---

## 3. Source Registry (S1–S9)

All sources are registered in `app/data/constants.ts` under `KWIN_SOURCE_REGISTRY`. Each entry is keyed by a semantic ID and rendered as a badge label (S1–S9) throughout the site.

| Label | Key | Source | Publisher | Status |
|-------|-----|--------|-----------|--------|
| **S1** | `brief` | KWIN City Project Brief | BAJA Associates / KIADB | 🔍 Pending Verification |
| **S2** | `kiadb` | KIADB Official Portal | Karnataka Government | ✅ Verified |
| **S3** | `aviation` | Bengaluru Aviation Traffic Dataset | OpenCity / AAI | ⚪ Contextual |
| **S4** | `economicSurvey` | Economic Survey Karnataka 2025–26 | OpenCity / GoK | ⚪ Contextual |
| **S5** | `strr` | STRR (Satellite Town Ring Road) Documents | OpenCity / BDA | ⚪ Contextual |
| **S6** | `irr` | BDA Intermediate Ring Road Documents | OpenCity / BDA | ⚪ Contextual |
| **S7** | `rainfall` | Karnataka Annual Rainfall by District | OpenCity / KSNDMC | ⚪ Contextual |
| **S8** | `groundwater` | Taluk-wise Groundwater Depth (Doddaballapura) | OpenCity / CGWB | ⚪ Contextual |
| **S9** | `lakes` | Bengaluru Lakes & Maintainers Registry | OpenCity / BBMP | ⚪ Contextual |

### Source Groups

Source IDs are also grouped by the page sections they support, making it easier to update a section's evidence in one place:

```ts
// app/data/constants.ts
export const HERO_SOURCE_IDS         = ['brief', 'kiadb', 'aviation', 'economicSurvey'];
export const TIMELINE_SOURCE_IDS     = ['brief', 'kiadb'];
export const PILLARS_SOURCE_IDS      = ['brief', 'kiadb', 'economicSurvey'];
export const SECTORS_SOURCE_IDS      = ['brief', 'economicSurvey', 'aviation', 'strr'];
export const SUSTAINABILITY_SOURCE_IDS = ['brief', 'rainfall', 'groundwater', 'lakes'];
```

---

## 4. Inline Source Badges

The `InlineSourceBadges` component renders small circular badges (e.g., `S1`, `S2`) inline with any piece of content. Clicking a badge navigates to `/sources#{source-id}` where the full source record is displayed.

**Usage:**

```tsx
import InlineSourceBadges from '@/components/InlineSourceBadges';

// Render badges for specific sources next to a claim
<InlineSourceBadges sourceIds={['brief', 'kiadb']} />

// Use a pre-defined group constant
import { SECTORS_SOURCE_IDS } from '@/data/constants';
<InlineSourceBadges sourceIds={SECTORS_SOURCE_IDS} />
```

**Badge appearance by status:**

| Status | Badge Color |
|--------|------------|
| `verified` | Green ring |
| `pending-verification` | Amber ring |
| `contextual` | Blue ring |

---

## 5. Claim Ledger

The `/sources` page renders the full **Claim Ledger** — a publicly accessible table that lists every substantive claim on the site, the section it appears in, and the source(s) that back it. This is the highest-accountability layer of the system.

The ledger is built from `KWIN_CLAIM_MAPPINGS` in `app/data/constants.ts`.

### Current Claims in the Ledger

| ID | Section | Claim (summary) | Sources | Status |
|----|---------|-----------------|---------|--------|
| `location` | Hero | KWIN is located in Doddaballapura, North Bengaluru | S1, S2 | 🔍 Pending |
| `scope` | Hero | 465 acres; ₹40,000 Cr investment; 100,000 jobs | S1 | 🔍 Pending |
| `airport` | Regional Context | 37M+ annual passengers at Bengaluru Airport | S3 | ⚪ Contextual |
| `corridor` | Regional Context | STRR and IRR improve North Bengaluru connectivity | S5, S6 | ⚪ Contextual |
| `economic` | Regional Context | Karnataka GDP growing at 9%+ | S4 | ⚪ Contextual |
| `jobsInvestment` | Sectors | Sector-by-sector jobs & investment projections | S1, S4 | 🔍 Pending |
| `waterPlanning` | Sustainability | 10 existing lakes; groundwater depth data | S7, S8, S9 | ⚪ Contextual |
| `sustainability` | Sustainability | Green cover 40%, net-zero 2030 targets | S1 | 🔍 Pending |
| `timeline` | Timeline | 2024 inauguration through 2030 full operations | S1, S2 | 🔍 Pending |
| `pillars` | About | Knowledge, Wellbeing, Innovation pillar features | S1, S2, S4 | 🔍 Pending |

### Adding a New Claim

1. Add an entry to `KWIN_CLAIM_MAPPINGS` in `app/data/constants.ts`.
2. Include the relevant `sourceIds` from the Source Registry.
3. Set the `status` accurately.
4. Add `<InlineSourceBadges sourceIds={[...]} />` in the component that renders the claim.

---

## 6. Evidence Vault

The `/evidence` page renders the **Evidence Vault** using the `EvidenceVault` component. Each source is displayed as a card with:

- Publisher and dataset title
- Scope (what the data covers geographically and thematically)
- **"Useful for saying..."** — a list of things this evidence legitimately supports
- **"Not enough to prove..."** — an explicit list of what this evidence cannot prove

This two-sided disclosure is what distinguishes the KWIN portal from typical promotional content.

### Evidence Sources in the Vault

| Source | Supports | Cannot Prove |
|--------|----------|--------------|
| **S3** Aviation Traffic | Airport is a regional anchor; connectivity exists | That KWIN will directly benefit from airport proximity |
| **S7** Rainfall Data | Annual precipitation pattern for Doddaballapura district | That KWIN's specific water infrastructure will be adequate |
| **S8** Groundwater Depth | Groundwater exists in the taluk | That KWIN's aquifer access is viable at project scale |
| **S9** Lakes Registry | Lakes exist in the Bengaluru region | That KWIN's 10 planned lakes are constructed or approved |
| **S4** Economic Survey | Karnataka economy has strong growth trajectory | That KWIN specifically will capture projected investment |
| **S5** STRR Documents | Ring road is planned / under development | That KWIN will be directly served by STRR on schedule |
| **S6** IRR Documents | IRR corridor exists in BDA planning | That IRR will enhance KWIN's connectivity as projected |

---

## 7. Editorial Guardrails

These rules govern what may and may not be published:

1. **No unattributed statistics.** Every number (jobs, investment, area, percentage) must carry at least one source badge.

2. **No inflating source scope.** A contextual source (e.g., regional rainfall data) cannot be used to verify a project-specific promise (e.g., "KWIN will have adequate water"). The `cannotProve` list enforces this.

3. **Pending verification is not a failure state.** Many KWIN claims derive from the project brief (S1), which is a credible document. Labeling these as "pending verification" is accurate and honest, not a demotion.

4. **The Claim Ledger is always current.** If a source is added, upgraded, or invalidated, both the source registry and all affected claim mappings must be updated in the same commit.

---

## 8. Maintaining the Evidence System

### When a source is verified

1. Change its `status` from `'pending-verification'` to `'verified'` in `KWIN_SOURCE_REGISTRY`.
2. Update all `ClaimMapping` entries that reference this source to `'verified'` if applicable.
3. Update source badge ring colors (they derive automatically from status).

### When a new source is added

1. Add it to `KWIN_SOURCE_REGISTRY` with a new semantic key and the next available label (e.g., `S10`).
2. Add a corresponding entry in `KWIN_EVIDENCE_SOURCES` if it is an OpenCity dataset.
3. Create a new source group constant if the source applies to a new section.
4. Add `ClaimMapping` entries for every claim it supports.

### When a claim changes

1. Find the affected `ClaimMapping` entry by `id`.
2. Update `sourceIds` and `status`.
3. Update the `<InlineSourceBadges>` in the component rendering that claim.

### When a source URL changes

Update `url` in the `SourceReference` record inside `KWIN_SOURCE_REGISTRY`. The change propagates automatically to the badge links and the `/sources` page.
