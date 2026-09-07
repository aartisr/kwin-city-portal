# KWIN Value-Add Execution Status

This file is the persistent checkpoint for staged implementation.

Update this file at the end of each implementation pass so work can resume without re-discovery.

## Last Updated

- Date: 2026-08-08
- Stage: Stage 5 (persistence migration for value-add write paths complete)
- Overall Progress: Stage 0 to Stage 5 complete for MVP + hardening baseline

## Completed

### Stage 0 foundation

- [x] Added shared value-add contracts in app/types/value-add.ts
- [x] Added server value-add modules:
  - [x] app/lib/server/value-add/common.ts
  - [x] app/lib/server/value-add/risk-check.ts
  - [x] app/lib/server/value-add/accessibility.ts
  - [x] app/lib/server/value-add/regulatory.ts
  - [x] app/lib/server/value-add/change-tracker.ts
  - [x] app/lib/server/value-add/exports.ts
  - [x] app/lib/server/value-add/alerts.ts
- [x] Added API routes under app/api/value-add:
  - [x] risk-check/route.ts
  - [x] accessibility/route.ts
  - [x] regulatory/route.ts
  - [x] change-tracker/route.ts
  - [x] exports/route.ts
  - [x] alerts/subscribe/route.ts
  - [x] alerts/unsubscribe/route.ts
- [x] Enforced security posture on write routes (same-origin, CSRF, rate limiting)
- [x] Verified type-check pass

### Stage 1 first utility slice

- [x] Added value-add UI components:
  - [x] app/components/value-add/RiskCheckForm.tsx
  - [x] app/components/value-add/AccessibilityCalculator.tsx
  - [x] app/components/value-add/RegulatoryChecklist.tsx
  - [x] app/components/value-add/ChangeTimeline.tsx
- [x] Added user-facing pages:
  - [x] app/tools/risk-check/page.tsx
  - [x] app/tools/accessibility/page.tsx
  - [x] app/tools/regulatory-navigator/page.tsx
  - [x] app/updates/change-tracker/page.tsx
- [x] Added initial unit tests:
  - [x] app/lib/server/value-add/__tests__/risk-check.test.ts
  - [x] app/lib/server/value-add/__tests__/accessibility.test.ts
- [x] Verified focused test pass for new server modules

### Stage 1 hardening (latest)

- [x] Added value-add API route tests:
  - [x] app/api/value-add/__tests__/route-validation.test.ts
  - [x] app/api/value-add/__tests__/route-fallbacks.test.ts
  - [x] app/api/value-add/__tests__/rate-limit-headers.test.ts
- [x] Added value-add API success-path tests:
  - [x] app/api/value-add/__tests__/route-success.test.ts
- [x] Verified value-add API route tests pass (3 files, 16 tests)

### Stage 1 discoverability and test depth (latest)

- [x] Added top-level header discoverability lane for tools:
  - [x] app/components/header/navigation.ts (new Tools lane)
  - [x] app/components/header/config.ts (Tools story copy)
  - [x] app/components/header/__tests__/config.test.ts (updated expected lanes)
- [x] Added persona quick-action entry points to tool routes:
  - [x] app/for/investor/page.tsx -> /tools/risk-check
  - [x] app/for/resident/page.tsx -> /tools/accessibility
- [x] Added centralized tools index route:
  - [x] app/tools/page.tsx
- [x] Added remaining server module tests:
  - [x] app/lib/server/value-add/__tests__/regulatory.test.ts
  - [x] app/lib/server/value-add/__tests__/change-tracker.test.ts
- [x] Verified targeted suite pass (4 files, 9 tests)
- [x] Verified type-check pass after discoverability and test additions

### Stage 1 E2E smoke coverage (latest)

- [x] Added tools E2E smoke spec:
  - [x] e2e/value-add-tools.spec.ts
- [x] Extended route-regression coverage list for tools routes:
  - [x] e2e/routes-regression.spec.ts
- [x] Verified Chromium smoke pass for tools flows (4 tests)
- [x] Verified type-check pass after E2E additions

### Stage 2 expansion: remaining utility services

- [x] Added shared contracts for expanded services in app/types/value-add.ts
- [x] Added server modules:
  - [x] app/lib/server/value-add/spatial-explorer.ts
  - [x] app/lib/server/value-add/satellite-tracker.ts
  - [x] app/lib/server/value-add/valuation.ts
  - [x] app/lib/server/value-add/investment-radar.ts
  - [x] app/lib/server/value-add/opportunity-exchange.ts
  - [x] app/lib/server/value-add/news-feed.ts
  - [x] app/lib/server/value-add/open-data.ts
- [x] Added API routes:
  - [x] app/api/value-add/spatial-explorer/route.ts
  - [x] app/api/value-add/satellite-tracker/route.ts
  - [x] app/api/value-add/valuation/route.ts
  - [x] app/api/value-add/investment-radar/route.ts
  - [x] app/api/value-add/opportunity-exchange/route.ts
  - [x] app/api/value-add/news-feed/route.ts
  - [x] app/api/value-add/open-data/route.ts
- [x] Added security controls to new write route:
  - [x] app/api/value-add/opportunity-exchange/route.ts (same-origin, CSRF, rate limiting)

### Stage 3 experience completion: all ten service surfaces

- [x] Added new value-add UI components:
  - [x] app/components/value-add/SpatialExplorer.tsx
  - [x] app/components/value-add/SatelliteTracker.tsx
  - [x] app/components/value-add/ValuationIndex.tsx
  - [x] app/components/value-add/InvestmentRadar.tsx
  - [x] app/components/value-add/OpportunityExchange.tsx
  - [x] app/components/value-add/GazetteNewsFeed.tsx
  - [x] app/components/value-add/OpenDataStudio.tsx
- [x] Added user-facing pages:
  - [x] app/tools/spatial-explorer/page.tsx
  - [x] app/updates/satellite-tracker/page.tsx
  - [x] app/tools/valuation-index/page.tsx
  - [x] app/tools/investment-radar/page.tsx
  - [x] app/tools/opportunity-exchange/page.tsx
  - [x] app/updates/regulatory-news/page.tsx
  - [x] app/tools/open-data-studio/page.tsx
- [x] Expanded discoverability:
  - [x] app/tools/page.tsx (expanded tool index cards)
  - [x] app/components/header/navigation.ts (expanded tools menu)
- [x] Verified type-check pass after stage 2 and stage 3 additions

## In Progress

### Stage 4 hardening and persistence

- [x] Move alerts and export jobs from in-memory storage to data-layer persistence.
- [x] Add API tests for new routes (spatial, satellite, valuation, radar, exchange, news, open-data).
- [x] Add E2E smoke for new tools and updates routes.

### Stage 5 persistence migration completed in this pass

- [x] Added data-layer persistence modules:
  - [x] app/lib/server/data-layer/value-add-alerts.ts
  - [x] app/lib/server/data-layer/value-add-exports.ts
  - [x] app/lib/server/data-layer/value-add-opportunities.ts
- [x] Exposed value-add persistence APIs from app/lib/server/data-layer.ts
- [x] Migrated value-add services to async data-layer persistence:
  - [x] app/lib/server/value-add/alerts.ts
  - [x] app/lib/server/value-add/exports.ts
  - [x] app/lib/server/value-add/opportunity-exchange.ts
- [x] Updated routes to await persistent storage operations:
  - [x] app/api/value-add/alerts/subscribe/route.ts
  - [x] app/api/value-add/alerts/unsubscribe/route.ts
  - [x] app/api/value-add/exports/route.ts
  - [x] app/api/value-add/opportunity-exchange/route.ts
- [x] Added Supabase schema docs for new persistence tables:
  - [x] docs/SUPABASE_SCHEMA.sql
- [x] Verified quality gates after migration:
  - [x] npm run type-check
  - [x] value-add server + API tests pass (9 files, 32 tests)

### Stage 4 hardening completed in this pass

- [x] Added API route test suite for stage-2 services:
  - [x] app/api/value-add/__tests__/route-stage2-services.test.ts
- [x] Updated route regression list with newly shipped routes:
  - [x] e2e/routes-regression.spec.ts
- [x] Added E2E smoke for newly added tools/updates pages:
  - [x] e2e/value-add-expansion.spec.ts
- [x] Verified API route tests pass:
  - [x] 5 files, 24 tests
- [x] Verified expansion E2E smoke pass:
  - [x] 4 tests (Chromium)

## Next Steps (Do These Next)

1. Run full multi-browser E2E for all value-add routes (including newly added tools and updates pages).
2. Apply new value-add Supabase tables in each environment using docs/SUPABASE_SCHEMA.sql.
3. Add targeted integration tests that exercise Supabase-backed reads/writes when credentials are configured.

## Resume Commands

Run these when resuming implementation:

```bash
npm run type-check
npm run test -- app/lib/server/value-add/__tests__/risk-check.test.ts app/lib/server/value-add/__tests__/accessibility.test.ts
```

For next-stage test work, use:

```bash
npm run test -- app/api/value-add/__tests__/*.test.ts
```

## Implementation Notes

- Exports, alerts, and opportunity leads now use data-layer persistence with Supabase-first and JSON fallback behavior.
- API envelope contract is standardized through app/lib/server/value-add/common.ts.
