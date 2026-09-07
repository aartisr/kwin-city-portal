# KWIN Value-Add Platform Implementation Plan

This document converts the generic blueprint into an implementation-ready plan for the existing KWIN City Portal codebase.

It is designed for direct execution in this repository, aligned to current architecture and conventions.

## 1. Purpose and Outcome

Build a KWIN-specific intelligence layer that helps users move from reading to action by adding:

- location and parcel risk checks
- evidence-linked spatial exploration
- timeline and change monitoring
- persona-specific decision utilities
- exports and machine-readable access

Primary product outcome:

- a trusted, source-grounded decision portal for residents, investors, researchers, and journalists

## 2. Current Baseline in This Repo

Existing strengths to build on:

- App Router pages and shared components in app/
- source registry and claim mapping in app/data/constants.ts
- evidence and data insights surfaces in app/evidence/page.tsx and app/data-insights/page.tsx
- API wrapper and observability hooks in app/lib/server/api-route.ts and app/lib/server/observability.ts
- dual data backend (Supabase or local fallback) in app/lib/server/data-layer.ts
- map surface and map primitives in app/components/StrategicLocationMap.tsx and app/components/strategic-map/

## 3. Target User Flows

1. Resident flow:

- enter survey number or area
- view zoning and infrastructure risk summary
- see evidence links and next-step checklist

1. Investor flow:

- compare sectors and location accessibility
- review regulatory workflow and timelines
- export shortlist data

1. Researcher/journalist flow:

- inspect source-backed claims
- query timeline and project deltas
- download datasets and evidence packets

## 4. Route and Feature Map

Proposed additions are grouped by priority.

### 4.1 Phase 1 routes (foundation)

- app/tools/risk-check/page.tsx
- app/tools/accessibility/page.tsx
- app/tools/regulatory-navigator/page.tsx
- app/updates/change-tracker/page.tsx
- app/data/downloads/page.tsx

### 4.2 Phase 2 routes (advanced utility)

- app/tools/value-signals/page.tsx
- app/tools/opportunity-exchange/page.tsx
- app/api/value-add/alerts/route.ts
- app/api/value-add/exports/route.ts

### 4.3 Route ownership mapping

- evidence-driven claims and trust UX: app/components/EvidenceVault.tsx, app/components/SourceReferences.tsx
- spatial UX: app/components/StrategicLocationMap.tsx with new tool wrappers
- persona routing: app/for/* plus tool deep-links

## 5. Module Design and Code Placement

## 5.1 Server modules

Create under app/lib/server/value-add/:

- risk-check.ts
- accessibility.ts
- regulatory.ts
- change-tracker.ts
- exports.ts
- alerts.ts

Responsibilities:

- validate request payloads
- call data-layer + external source adapters
- produce normalized response envelopes with requestId
- enforce rate limits and origin checks through existing security utilities

## 5.2 API route layer

Create under app/api/value-add/:

- risk-check/route.ts
- accessibility/route.ts
- regulatory/route.ts
- change-tracker/route.ts
- exports/route.ts
- alerts/subscribe/route.ts
- alerts/unsubscribe/route.ts

All handlers must use withApiRoute from app/lib/server/api-route.ts.

## 5.3 Data adapters

Create under app/lib/value-add/sources/:

- kiadb-adapter.ts
- opencity-adapter.ts
- mapbox-adapter.ts
- registry.ts

Purpose:

- encapsulate upstream data mapping
- attach source metadata and confidence tags
- prevent provider-specific logic from leaking into API handlers

## 5.4 UI components

Create under app/components/value-add/:

- RiskCheckForm.tsx
- RiskResultPanel.tsx
- AccessibilityCalculator.tsx
- RegulatoryChecklist.tsx
- ChangeTimeline.tsx
- ExportPanel.tsx

Each component should consume typed data contracts from app/types/value-add.ts.

## 6. Data Model and Schema Plan

Supabase-first schemas with local fallback parity.

## 6.1 New TypeScript contracts

Create app/types/value-add.ts:

- RiskQuery
- RiskAssessment
- AccessibilityQuery
- AccessibilityResult
- RegulatoryStep
- ChangeEvent
- ValueSignal
- AlertSubscription
- ExportJob

## 6.2 Supabase tables

Add migration file in supabase/migrations/ (or documented SQL in docs/SUPABASE_SCHEMA.sql extension):

1. value_add_risk_requests

- id uuid pk
- user_id text nullable
- query_type text not null
- query_payload jsonb not null
- result_summary jsonb not null
- confidence numeric(5,2) not null
- created_at timestamptz default now()

1. value_add_change_events

- id uuid pk
- category text not null
- title text not null
- event_date date not null
- geography jsonb
- source_ids text[] not null
- metadata jsonb
- created_at timestamptz default now()

1. value_add_alert_subscriptions

- id uuid pk
- email text not null
- persona text not null
- topics text[] not null
- geofilters jsonb
- cadence text not null
- status text not null default 'active'
- created_at timestamptz default now()
- updated_at timestamptz default now()

1. value_add_export_jobs

- id uuid pk
- requester text
- export_type text not null
- filters jsonb not null
- status text not null default 'queued'
- file_url text
- created_at timestamptz default now()
- completed_at timestamptz

## 6.3 Source integrity tables

1. evidence_refresh_log

- id uuid pk
- source_id text not null
- refreshed_at timestamptz not null
- record_count int
- status text not null
- notes text

1. claim_confidence_snapshots

- id uuid pk
- claim_id text not null
- confidence numeric(5,2) not null
- status text not null
- computed_at timestamptz not null

## 7. API Contracts

All value-add APIs should return:

- requestId
- status
- data
- evidence
- warnings

Example envelope:

- status: success | partial | error
- evidence: array of source references including sourceId, title, url, lastUpdated, trustStatus

Validation requirements:

- strict input schema checks
- standard 400 for invalid payload
- 429 with rate-limit headers for throttled requests
- safe 500 fallback with non-sensitive error text

## 8. Performance and Resilience Targets

Service-level targets for new modules:

- p95 API latency < 350 ms for cached queries
- p95 API latency < 900 ms for uncached aggregation queries
- route-level error rate < 1%
- zero unhandled API exceptions in logs

Caching strategy:

- static and slow-moving sources: 1h revalidate
- medium volatility feeds: 5-15 minute server cache
- expensive aggregations: keyed cache by normalized query

Resilience requirements:

- graceful degradation when upstream source fails
- partial responses with warnings when one source is unavailable
- deterministic fallback to existing local/file-backed data layer

## 9. Security and Trust Requirements

Apply existing controls from app/lib/server/security.ts to all new write routes:

- CSRF verification for mutating endpoints
- same-origin checks
- per-endpoint rate limiting
- input sanitization and output escaping

Trust UX requirements:

- every computed result includes source badges
- stale data warnings when refresh age exceeds threshold
- confidence and caveat sections mandatory for risk results

## 10. Observability and Ops

Instrumentation plan:

- emit request lifecycle logs through withApiRoute
- add provider-neutral trace events via app/lib/server/observability.ts
- track domain events:
  - risk_check.requested
  - risk_check.completed
  - accessibility.calculated
  - alert.subscription.created
  - export.job.completed

Dashboard minimums:

- request volume by endpoint
- p95 latency by endpoint
- 4xx/5xx trend
- source refresh lag
- cache hit ratio

## 11. Testing Strategy

## 11.1 Unit tests

Add under app/lib/server/value-add/__tests__/:

- risk-check.test.ts
- accessibility.test.ts
- regulatory.test.ts
- change-tracker.test.ts

## 11.2 API tests

Add under app/api/value-add/__tests__/:

- route-validation.test.ts
- route-fallbacks.test.ts
- rate-limit-headers.test.ts

## 11.3 E2E tests

Add to e2e/:

- value-add-risk-check.spec.ts
- value-add-accessibility.spec.ts
- value-add-regulatory.spec.ts

E2E assertions should verify:

- core user journeys on desktop and mobile viewport sets
- source badges visible on results
- partial-degradation UX when one source fails

## 12. Phased Rollout Plan

## Phase 0: Prep (1 sprint)

- finalize contracts in app/types/value-add.ts
- add schema migrations and fallback mappings
- scaffold API routes and module structure

Exit criteria:

- type-check and tests pass
- basic stub responses available for all Phase 1 endpoints

## Phase 1: Core utilities (2 sprints)

- deliver Risk Check, Accessibility, Regulatory Navigator, Change Tracker
- wire source attribution and confidence output
- integrate persona links from app/for/* pages

Exit criteria:

- p95 latency and error-rate targets met in staging
- E2E suite green for all Phase 1 routes

## Phase 2: Intelligence and exports (2 sprints)

- deliver Value Signals, Alerts, Export jobs
- implement subscription lifecycle and export queue
- add operational dashboards

Exit criteria:

- end-to-end alert and export flows validated
- observability dashboards and on-call runbook ready

## Phase 3: Hardening and scale (ongoing)

- tune caching and rate limits from production telemetry
- optimize slow source adapters
- add monthly source-quality audits

Exit criteria:

- sustained SLO compliance for 30 days
- zero Sev-1 incidents tied to value-add routes

## 13. Ownership Matrix

- Product and evidence policy: content and research owners
- API and data contracts: backend team
- map and interaction UX: frontend team
- source quality and refresh discipline: data operations
- reliability and incident process: platform and SRE

## 14. Immediate Execution Checklist

1. Create app/types/value-add.ts with canonical request and response types.
2. Scaffold app/lib/server/value-add/ modules and app/api/value-add/ routes.
3. Add Supabase schema changes and fallback mappings in data-layer.
4. Implement Phase 1 UI pages and integrate from persona routes.
5. Add unit, API, and E2E tests before enabling public navigation entry points.
6. Add dashboards and alerting thresholds prior to Phase 2 release.

## 15. Definition of Done

A value-add module is done only when all of the following are true:

- source-backed results are visible and explainable
- route passes security checks and rate-limit behavior
- fallback behavior is tested and non-breaking
- performance target met in staging
- docs and runbooks updated in docs/

## 16. Implementation Progress

Status snapshot as of 2026-08-08:

- Stage 0 foundation: completed
- Stage 1 initial user-facing utilities: in progress
- Canonical continuation tracker: docs/KWIN_VALUE_ADD_EXECUTION_STATUS.md

Delivered in Stage 0:

- Value-add typed contracts in app/types/value-add.ts
- Server service layer under app/lib/server/value-add/
- API routes under app/api/value-add/ with wrapper-based error handling, rate limiting, and CSRF on write routes

Delivered in Stage 1 (first slice):

- New user-facing routes:
  - /tools/risk-check
  - /tools/accessibility
  - /tools/regulatory-navigator
  - /updates/change-tracker
- Supporting UI components under app/components/value-add/
