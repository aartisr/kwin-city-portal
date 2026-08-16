# KWIN City Portal Quality Standards

## Snapshot

- Assessment date: 2026-08-15
- Current status: Production-capable with enforced release contracts
- Quality score (engineering): 9.7/10 (not represented as a permanent or absolute 10/10)

## Verified Quality Gates

- `npm run type-check`: pass
- `npm run lint`: pass
- `npm test`: pass (66 files, 283 tests)
- `npm run test:coverage`: pass (thresholds met)
- `npm run build:ci`: pass
- `npm run e2e:smoke`: pass (45 routes)
- Author/ownership and PWA consent browser contracts: pass (2 tests)
- Supabase migration continuity and `SECURITY DEFINER` search-path policy: pass
- Ephemeral PostgreSQL migration execution and atomic-RPC contract: enforced in CI
- PWA static/service-worker contract: pass
- Critical mobile layout contracts: enforced across four high-value routes
- Homepage cognitive-load contract: orientation-first progressive disclosure enforced
- `npm run quality:verify-doc`: pass

## Scorecard

| Category | Score | Status | Priority |
| --- | --- | --- | --- |
| TypeScript and types | 9.5/10 | Strict settings and full-project type gate | Low |
| Component architecture | 8.8/10 | Shared identity, PWA policy, operations, and reader modules | Medium |
| API design and error handling | 9.3/10 | Shared route wrapper, bounded failures, request IDs, rate-limit contracts | Medium |
| Accessibility | 9.2/10 | Automated route-level accessibility gate | Medium |
| Performance and optimization | 9.1/10 | Production build gate and optimized application assets | Medium |
| Security | 9.3/10 | Database privilege, migration, CSRF, throttling, and evidence-integrity controls | Medium |
| Testing and quality gates | 9.9/10 | 283 tests plus executable database, static, build, browser, and live gates | Low |
| Error boundaries and recovery | 9.2/10 | Global boundaries, offline recovery, and fail-closed evidence behavior | Medium |
| Observability and monitoring | 9.1/10 | Structured telemetry and traceable operational evidence | Medium |
| E2E resilience | 9.8/10 | Canonical 45-route inventory plus identity, consent, accessibility, and mobile contracts | Low |
| Documentation quality | 9.3/10 | Evidence-backed standards and operational runbooks | Low |

## Hardening Completed

- Replaced fragile third-party homepage image dependencies with self-hosted assets.
- Added shared API wrapper for auth routes with:
  - request and response logging
  - standardized 500 fallback payloads
  - request ID propagation
  - provider-configurable APM capture hook (`KWIN_APM_PROVIDER=sentry|datadog`)
- Added auth failure-path tests validating wrapped fallback behavior.
- Added auth security-edge tests for throttling headers and CSRF rejection shape.
- Stabilized Playwright smoke execution on a deterministic port and host.
- Removed network-coupled font fetch risk from build path.
- Added CI-ready docs verification command: `npm run quality:verify-doc`.
- Replaced deprecated `next lint` with a full-project, zero-warning ESLint gate.
- Split the release gate into reusable static, test/build, browser, and live-health stages.
- Enforced continuous migration numbering and pinned search paths for privileged SQL functions.
- Added browser contracts for author/legal-owner semantics and permanent PWA install opt-out.
- Added disposable PostgreSQL 16 CI execution of every migration, including rerun and atomic-RPC behavior.
- Added non-fragile mobile viewport contracts for the home, news, evidence, and author experiences.
- Reduced the homepage’s initial decision surface to three common questions and one optional deep-dive control while retaining server-rendered content.

## Remaining Priorities

1. Connect the existing APM abstraction to the selected production provider and validate alert delivery.
2. Add reviewed visual-regression baselines only after establishing a deliberate baseline-update governance process.
3. Run live source-health checks separately from deterministic merge protection to avoid third-party outages blocking safe releases.
4. Keep this document synced with reproducible CI evidence at release cut time.

## Honesty and Source Policy

- Product claims must remain source-linked and status-labeled.
- If a claim is not fully verifiable, it must be explicitly marked as pending verification.
- Engineering claims in this file must only reflect reproducible command outputs.
- A numerical score is a maintained rubric, not proof of perfection; external services, browsers, dependencies, and content can change after verification.
