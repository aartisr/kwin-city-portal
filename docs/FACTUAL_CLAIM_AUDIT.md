# Factual Claim Audit

Date: 2026-08-09
Scope: high-impact numeric and delivery claims (area, distance, investment, jobs, phases, sustainability targets)
Method: code-level trace from page/component copy -> data module -> claim/source registry

## Verification Baseline

- Primary policy and source statuses are defined in `app/data/kwin/evidence.ts`.
- Source status model in use:
  - `verified`: institutionally authoritative source is available.
  - `pending-verification`: claim currently tied to project brief and needs primary public confirmation.
  - `contextual`: relevant regional context, but not direct proof of KWIN-specific delivery.

## Claim Audit Table

| Claim Domain | Current Published Value | Location(s) | Source IDs | Verification Tier | Recommended Public Wording |
|---|---|---|---|---|---|
| Program area | 5,800 acres (Phase 1: 2,000 acres) | `app/components/Hero.tsx`, `app/data/kwin/geography.ts`, `app/components/StrategicLocationMap.tsx`, `app/components/footer/content.ts` | `brief`, `kiadb` | pending-verification | "The project brief states ~5,800 acres (Phase 1: 2,000). Treat as proposal-level until confirmed in primary KIADB records." |
| Airport proximity | ~12 km from Kempegowda International Airport | `app/data/kwin/geography.ts`, `app/for/investor/page.tsx`, `app/content/pages/faq.json` | `aviation` (+ project siting context from brief) | contextual for region, pending-verification for project-specific framing | "KWIN is presented as airport-proximate (~12 km). Use as regional context and verify exact project boundary access via primary planning records." |
| Total investment target | ₹40,000 Crore | `app/for/investor/page.tsx`, `app/content/pages/faq.json`, `app/data/kwin/sustainability.ts` | `brief`, `kiadb` (claim mapping: jobs/investment) | pending-verification | "₹40,000 Crore is a stated project target from brief-level narrative; primary financial confirmation is pending." |
| Total jobs target | 100,000+ direct jobs by 2030 | `app/content/pages/faq.json`, `app/data/kwin/sustainability.ts`, `app/data/kwin/timeline.ts`, `app/lib/search-index/data.ts` | `brief`, `kiadb` (claim mapping: jobs/investment) | pending-verification | "100,000+ jobs is a target scenario and not yet an independently confirmed outcome." |
| Sector job split | ICT 30k, Semiconductor 25k, Health-tech 20k, Aerospace 15k, Renewables 10k | `app/data/kwin/sectors.ts`, `app/content/pages/faq.json`, `app/lib/search-index/data.ts` | `brief`, `kiadb` (claim mapping: jobs/investment) | pending-verification | "Sector employment split is indicative and tied to proposal assumptions pending primary confirmation." |
| Sector investment split | ₹12k+ Cr ICT, ₹8k+ Cr semiconductor, ₹6k+ Cr health-tech, ₹5k+ Cr aerospace, ₹4k+ Cr renewables | `app/data/kwin/sectors.ts`, `app/content/pages/faq.json` | `brief`, `kiadb` (claim mapping: jobs/investment) | pending-verification | "Sector investment values are proposal-level estimates pending authoritative publication." |
| Timeline model | Phase 0 (2024) plus five development phases (2025-2030) | `app/data/kwin/timeline.ts`, `app/components/Timeline.tsx`, `app/timeline/page.tsx`, `app/lib/search-index/data.ts` | `brief`, `kiadb` (claim mapping: timeline) | pending-verification | "Timeline is a working roadmap derived from the brief and should not be read as a guaranteed public delivery schedule." |
| Sustainability targets | 40% green cover, 100% operational renewable energy, 80% water recycling by 2029, net-zero by 2030 | `app/data/kwin/sustainability.ts`, `app/components/Sustainability.tsx`, `app/lib/search-index/data.ts` | `brief`, `kiadb` (+ contextual: `rainfall`, `groundwater`, `lakes`) | pending-verification for project outcomes; contextual support for planning need | "These are sustainability ambitions from the project narrative; regional datasets support why they matter, not proof they are already delivered." |
| Lake system claim | 10 interconnected lakes | `app/data/kwin/sustainability.ts`, `app/components/Sustainability.tsx`, `app/content/pages/faq.json` | `brief` (+ contextual lake governance) | pending-verification | "Lake network details remain proposal-level until technical design and approvals are publicly documented." |
| Solar program claim | Utility-scale solar program; capacity/footprint pending | `app/components/Sustainability.tsx`, `app/data/kwin/sustainability.ts` | `brief`, `kiadb` | pending-verification | "Solar scope exists as intent; technical capacity and land footprint remain unverified." |

## Corrections Applied In This Pass

1. Normalized timeline wording from ambiguous "five phases from inauguration" to explicit "Phase 0 plus five development phases" in timeline-related UX and metadata.
2. Corrected airport-distance inconsistencies to the current 12 km baseline used in the geographic model.

## Governance Outcome

- Guardrail script now blocks stale acreage regressions and invalid footprint phrasing:
  - `scripts/verify-factual-integrity.mjs`
- CI enforcement added in quality workflow:
  - `.github/workflows/quality-doc-verify.yml`
- Package scripts include factual integrity check:
  - `package.json` (`quality:verify-facts`)

## Remaining Honesty Boundary

This audit establishes internal consistency and provenance tagging across the codebase. It does not replace external legal/official confirmation. Any claim with `pending-verification` should continue to be presented as proposal-level until KIADB or equivalent primary records explicitly confirm it.
