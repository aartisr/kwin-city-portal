# Evidence-Backed Freshness Automation Plan

Status: proposed implementation plan  
Plan date: 2026-08-15  
Owners: KWIN City Portal engineering and editorial governance  
Scope: content freshness, factual audit freshness, execution-status freshness, source health, discovery health, publishing health, and public freshness reporting

## 1. Executive decision

KWIN City Portal will treat freshness as a verifiable operational claim, not as a date that can be advanced by a scheduler or a documentation edit.

The production freshness status will be calculated from immutable, durable verification evidence stored in Supabase. A freshness rail advances only when its required controls complete successfully against a specific deployed or deployable Git commit. Failed, partial, skipped, timed-out, fallback, or unverifiable work never advances a rail.

The design is intentionally fail-closed:

- A cron invocation is not evidence of freshness.
- A generated article is not evidence that live sources were healthy.
- A green unit-test step is not evidence that production is reachable.
- Updating a Markdown date is not evidence that claims were reviewed.
- Missing telemetry preserves the last known good verification; it never invents a newer timestamp.
- Public UI always exposes the age, target, status, evidence type, and last qualified verification.

The current SLA remains:

| Rail | Target | Meaning of a qualified verification |
| --- | ---: | --- |
| Content | 3 days | Live inputs were sufficiently healthy, generation completed without fallback-only operation, persistence succeeded, and required public routes were revalidated. |
| Factual audit | 14 days | Claim inventory, primary-source health, staleness, factual guardrails, and discovery/citation controls passed for the recorded commit. |
| Execution status | 14 days | Required code, integration, migration, security, PWA, and production-build controls passed for the recorded commit. |

The public `Freshness SLA` score is 100 only while every rail is within its target. The individual ages remain visible. When a rail is overdue, the worst overdue rail determines the score so averaging cannot conceal a stale control.

## 2. Goals and non-goals

### 2.1 Goals

1. Make every public freshness statement traceable to durable evidence.
2. Automate routine verification without automating false assurance.
3. Keep the last known good state available during dependency failures.
4. Separate live, partial, fallback, failed, and indeterminate outcomes.
5. Make the system idempotent, retry-safe, modular, testable, and provider-aware.
6. Keep secrets and sensitive logs out of public responses and database payloads.
7. Detect silent scheduler failure, stale sources, migration drift, and telemetry gaps.
8. Provide a clear human review path for claims automation cannot establish.
9. Preserve checked-in audit documents as readable governance reports.
10. Support additional verification rails without rewriting the control plane.

### 2.2 Non-goals

- The system will not claim that automated checks prove every real-world project statement.
- The system will not scrape around paywalls, CAPTCHAs, robots restrictions, or provider controls.
- The system will not automatically change a factual claim merely because a source changed.
- The system will not update audit dates solely to maintain a green badge.
- The system will not expose service-role credentials, workflow tokens, raw environment values, or sensitive provider payloads.
- The system will not equate social publishing success with factual accuracy.

## 3. Current-state assessment

### 3.1 What exists today

- `vercel.json` invokes `/api/cron/kwin-seo-agency` daily at `03:11 UTC`.
- `.github/workflows/always-current.yml` runs every three hours and can invoke the protected production refresh.
- The workflow verifies operations, primary-source health, source registry, content staleness, factual integrity, discovery signals, TypeScript, and unit tests.
- Full production build currently runs only for manually selected `full` mode.
- A successful SEO job persists a payload to `seo_agency_runs` and advances content freshness through `generatedAt`.
- Factual audit and execution freshness are read from checked-in Markdown dates with embedded serverless fallbacks.
- The public UI exposes each age and a target-based Freshness SLA score.

### 3.2 Honesty gaps to close

1. `seo_agency_runs.generated_at` advances content freshness even when live news fetching fails and evergreen fallback content is used.
2. A file date can advance factual or execution freshness without machine-verifiable proof of the work performed.
3. `content:staleness` currently documents a 30-day audit gate while the public factual-audit target is 14 days.
4. Standard scheduled workflows do not run the full production build.
5. GitHub audit artifacts expire after seven days and are not sufficient as the durable production record.
6. A workflow can be green while an individual relevant step was skipped.
7. The public status cannot currently link a rail to a workflow, commit, evidence manifest, or failure reason.
8. Supabase read failure falls back to documentation dates, which can obscure a telemetry outage unless explicitly reported.
9. There is no append-only verification ledger or transition history.
10. Scheduler liveness and verification qualification are not separate concepts.

## 4. Freshness evidence model

### 4.1 Core vocabulary

**Attempt**: one execution of a verification suite. Attempts may pass, fail, be partial, time out, or become indeterminate.

**Qualified verification**: a passed attempt that completed every required control for a rail, persisted its sanitized evidence, and matches an allowed commit/deployment relationship.

**Rail**: an independently aged freshness domain such as `content`, `factual_audit`, or `execution_status`.

**Control**: a single named check with an expected command or observation, start/end timestamps, outcome, and safe diagnostic summary.

**Evidence manifest**: the sanitized, immutable description of what ran and what passed. It contains hashes and pointers, not secrets or unrestricted raw logs.

**Last known good**: the newest qualified verification for a rail. Failed attempts never replace it.

**Qualification policy**: a versioned definition of the controls required for a rail.

### 4.2 Attempt outcomes

Use a closed outcome set:

- `passed`: every required control passed and evidence persisted.
- `failed`: at least one required control produced a definite failure.
- `partial`: work completed using a declared fallback or with an allowed optional control failure; never freshness-qualified unless a future policy explicitly permits it.
- `skipped`: required work was intentionally or conditionally not run.
- `timed_out`: completion is known not to have occurred inside the allowed window.
- `indeterminate`: an external side effect or provider response cannot be established safely.
- `cancelled`: the orchestrator cancelled the attempt.

Only `passed` can qualify freshness.

### 4.3 Rail state

Each rail resolves to:

- `healthy`: a qualified verification exists and is within target.
- `watching`: within target but beyond the UI's early-warning band.
- `overdue`: a qualified verification exists but exceeds target.
- `never_verified`: no qualified verification exists.
- `telemetry_unavailable`: durable evidence could not be read.
- `policy_mismatch`: evidence was created under a policy version that is no longer accepted.

`telemetry_unavailable`, `never_verified`, and `policy_mismatch` must never render as healthy.

## 5. Supabase data design

Implement this in a new forward-only migration, proposed as `supabase/migrations/0003_operational_verification_evidence.sql`.

### 5.1 `operational_verification_attempts`

Append-only parent record for each workflow or runtime attempt.

| Column | Type | Rules |
| --- | --- | --- |
| `id` | uuid | Primary key, generated server-side. |
| `idempotency_key` | text | Unique; derived from provider, workflow run ID, attempt number, and suite. |
| `suite` | text | `content_refresh`, `factual_audit`, `execution_status`, or future registered suite. |
| `outcome` | text | Closed check constraint using the outcomes above. |
| `qualified` | boolean | Generated or enforced false unless outcome is `passed`. |
| `policy_version` | text | Required version identifier such as `factual-audit/v1`. |
| `started_at` | timestamptz | Required; cannot be materially in the future. |
| `completed_at` | timestamptz | Required for terminal outcomes; must be at or after start. |
| `commit_sha` | text | Full 40-character Git SHA when applicable. |
| `deployment_url` | text | Sanitized HTTPS production/preview URL when applicable. |
| `environment` | text | `production`, `preview`, or `ci`; qualification policy decides what is acceptable. |
| `provider` | text | `github_actions`, `vercel_cron`, `manual`, or registered provider. |
| `provider_run_id` | text | External run identifier, not a secret. |
| `provider_run_url` | text | Sanitized HTTPS evidence pointer. |
| `trigger` | text | `schedule`, `workflow_dispatch`, `deployment`, `retry`, or `manual`. |
| `manifest` | jsonb | Sanitized evidence manifest with a strict application schema. |
| `manifest_sha256` | text | Hash of canonical manifest JSON to detect mutation/corruption. |
| `failure_code` | text | Stable safe code for non-passed outcomes. |
| `failure_summary` | text | Redacted bounded-length description. |
| `created_at` | timestamptz | Database timestamp. |

Constraints:

- Terminal attempt rows are immutable to application roles.
- `qualified = true` requires `outcome = 'passed'`, a supported policy version, non-null completion time, all mandatory controls present, and a valid manifest hash.
- Reject timestamps beyond a small clock-skew allowance.
- Reject `provider_run_url` and `deployment_url` values that are not HTTPS or approved hostnames.
- Limit JSON and text sizes.

### 5.2 `operational_verification_controls`

Normalized child records make checks queryable without trusting arbitrary JSON.

| Column | Type | Rules |
| --- | --- | --- |
| `id` | uuid | Primary key. |
| `attempt_id` | uuid | Foreign key with restricted delete. |
| `control_id` | text | Stable identifier, unique per attempt. |
| `required` | boolean | Whether absence/failure blocks qualification. |
| `outcome` | text | `passed`, `failed`, `skipped`, `timed_out`, `indeterminate`, or `cancelled`. |
| `started_at` / `completed_at` | timestamptz | Duration evidence. |
| `command_label` | text | Safe logical label, not a shell command containing secrets. |
| `summary` | text | Bounded and redacted. |
| `metrics` | jsonb | Allowlisted scalar metrics only. |
| `artifact_name` | text | Optional non-secret artifact identifier. |
| `artifact_sha256` | text | Optional integrity hash. |

### 5.3 `operational_freshness_qualifications`

Materialized qualification history for rails.

| Column | Type | Rules |
| --- | --- | --- |
| `id` | uuid | Primary key. |
| `rail` | text | `content`, `factual_audit`, `execution_status`, or registered rail. |
| `attempt_id` | uuid | Unique per rail/attempt; references a qualified passed attempt. |
| `qualified_at` | timestamptz | Normally attempt completion time, set by database function. |
| `expires_at` | timestamptz | Derived from versioned rail target. |
| `policy_version` | text | Qualification policy used. |
| `commit_sha` | text | Copied for efficient traceability. |
| `created_at` | timestamptz | Database timestamp. |

This table is append-only. The current state is a query/view over the newest valid qualification, never a mutable singleton.

### 5.4 `operational_scheduler_heartbeats`

Scheduler liveness must be visible but must not qualify freshness.

Store provider, schedule ID, invocation ID, received timestamp, authorization outcome, terminal outcome, duration, and safe failure code. This answers “did the cron run?” independently of “did verification pass?”

### 5.5 Database functions and views

Create security-definer functions with fixed `search_path`, revoked public access, and service-role-only execution:

- `record_operational_verification_attempt(...)`
- `qualify_operational_freshness_rail(...)`
- `get_current_operational_freshness()`

Create a read-only view or RPC response returning only public-safe fields:

- rail
- state
- qualified timestamp
- age in days
- target in days
- policy version
- commit SHA prefix
- provider
- evidence URL when public-safe
- latest attempt outcome and safe failure code

RLS posture:

- `anon` and `authenticated`: no direct table access.
- `service_role`: insert/select as required, no arbitrary update/delete of terminal evidence.
- Public application route: reads through a sanitized server-side repository or narrowly scoped RPC.

## 6. Versioned qualification policies

Policies live in code under a proposed `app/lib/operations/verification-policies/` directory and are mirrored by tests.

Each policy declares:

- rail and suite
- policy version
- target days
- accepted environment
- accepted provider(s)
- required controls
- optional controls
- timeout limits
- whether a deployment/commit relationship is required
- qualification function
- public explanation

### 6.1 Content policy `content-refresh/v1`

Required controls:

1. Protected endpoint authorization passed.
2. Reviewed KWIN source registry loaded.
3. Minimum source availability threshold met.
4. At least one live KWIN or strategic signal fetched, unless the policy explicitly records a no-new-information successful check distinct from fallback generation.
5. No fallback-only content generation.
6. Generated content passed schema and factual-language guardrails.
7. Social publishing may fail without invalidating content freshness, but its result must be recorded separately.
8. Supabase persistence to `seo_agency_runs` succeeded; file fallback is not qualifying in production.
9. Required routes were revalidated.
10. A post-write read confirmed the stored run ID and generated timestamp.

Outcomes:

- Live signals + durable persistence + validation: `passed`, content rail qualifies.
- No new signals but all sources healthy: record a `passed` observation check only if no generated claim changes; policy must distinguish “checked current” from “new content published.”
- Feed failure + evergreen reservoir: `partial`, does not qualify content freshness.
- Supabase failure + local file fallback: `partial`, does not qualify production freshness.
- Provider timeout after uncertain social publication: content may qualify independently, social outcome is `indeterminate`.

### 6.2 Factual policy `factual-audit/v1`

Required controls:

1. `sources:verify-primary-health`
2. `sources:verify`
3. `content:staleness` with the policy target aligned to 14 days
4. `quality:verify-facts`
5. `discovery:verify-signals`
6. Claim registry/schema validation
7. Source-to-claim referential integrity
8. Detection of unsupported absolute language for pending/contextual claims
9. Detection of numeric claim divergence across page copy, structured data, search index, FAQs, and social templates
10. Verification that primary-source failures are surfaced rather than silently downgraded

Human-review boundary:

- Automated controls establish consistency, provenance presence, source reachability, and policy compliance.
- Claims marked `pending-verification`, disputed, legally sensitive, or materially changed require a human reviewer.
- A policy can qualify the automated audit only if the public label states its scope. A separate `human_factual_review` qualification should be introduced for true editorial review.
- The UI must never describe automated consistency checks as independent external confirmation.

Recommended human review cadence: at least monthly and immediately after a material official announcement, land/acquisition change, budget change, legal order, major investor announcement, or project timeline revision.

### 6.3 Execution policy `execution-status/v1`

Required controls for scheduled qualification:

1. Supported Node runtime verification
2. Dependency install with locked versions
3. `type-check`
4. Full unit/integration test suite
5. `db:verify:migrations`
6. `deploy:verify-vercel-config`
7. `pwa:verify`
8. Security and quality verification scripts
9. Production build
10. Route regression smoke test against a built application or qualified deployment
11. Protected cron persistence integration test
12. Public operations-status contract test

Additional deployment qualification:

- Commit SHA must match the production deployment SHA, or the qualification must be explicitly labeled `deployable_commit` rather than `production_verified`.
- A post-deploy smoke can promote a deployable qualification to production-qualified evidence.
- Skipped build/E2E controls prevent qualification.

## 7. Workflow architecture

### 7.1 Separate verification from recording

Do not let individual shell steps write freshness directly. The workflow must:

1. Run controls.
2. Build a local canonical evidence manifest with `if: always()`.
3. Determine outcome using a dedicated policy evaluator.
4. Sign/authenticate the request to the protected recording endpoint.
5. Persist the attempt exactly once using its idempotency key.
6. Qualify rails only inside the server/database after revalidating the manifest.

### 7.2 GitHub Actions changes

Refactor `.github/workflows/always-current.yml` into logical jobs:

- `refresh-content`
- `verify-factual-audit`
- `verify-execution-status`
- `record-evidence`
- `notify`

Use job outputs only for non-sensitive outcome metadata. Pass larger evidence through short-lived artifacts with SHA-256 verification. Never store secrets in artifacts.

Run the production build on every execution-status qualification attempt. If cost or duration becomes a constraint, run execution qualification daily and lighter health checks every three hours; never claim a 14-day execution qualification from a run that skipped required controls.

Use concurrency groups per suite. Do not cancel an attempt after it may have initiated external publishing; mark ambiguous provider effects `indeterminate`.

### 7.3 Vercel cron changes

The Vercel cron remains the runtime content-refresh scheduler. It must:

- record a heartbeat immediately after authorization
- run content refresh
- persist a content verification attempt
- return the attempt ID, qualification result, storage backend, live-source status, and safe diagnostics
- never return secret configuration values

GitHub may continue invoking the endpoint as a complementary control, but duplicate invocations for the same content date must be idempotent.

### 7.4 Recording endpoint

Add a dedicated endpoint such as:

```text
POST /api/operations/verifications
```

Requirements:

- Node runtime, force dynamic, strict body limit
- bearer or signed-request authentication using a dedicated `OPERATIONS_EVIDENCE_SECRET`, separate from `CRON_SECRET`
- constant-time secret comparison
- timestamp and nonce/replay protection
- strict JSON schema validation
- approved provider and workflow identifiers
- allowlisted evidence URLs
- idempotent insert
- service-role Supabase only
- generic errors to callers, detailed structured logs server-side
- rate limiting

Prefer a signed payload containing a timestamp, nonce, canonical body hash, and HMAC. Rotate the secret without invalidating historical evidence.

## 8. Application architecture

Proposed modules:

```text
app/lib/operations/
  freshness-score.ts
  verification-contracts.ts
  verification-schema.ts
  verification-policy.ts
  verification-service.ts
  verification-repository.ts
  current-site-freshness.ts
  verification-policies/
    content-refresh.ts
    factual-audit.ts
    execution-status.ts
```

Design rules:

- Contracts and score math remain pure and client-safe.
- Supabase and filesystem access remain server-only.
- Policy evaluation is deterministic and unit-tested.
- Repository interfaces allow an in-memory test adapter without production file fallback.
- Public status computation accepts a clock to make boundary tests deterministic.
- UI consumes one normalized status contract; Footer and Trust Banner never reimplement scoring.

## 9. Public status contract and UX

Extend `/api/operations/status` with sanitized fields:

```json
{
  "freshness": {
    "scoreType": "sla_compliance",
    "score": 100,
    "state": "healthy",
    "asOf": "2026-08-15T...Z",
    "telemetryAvailable": true,
    "rails": {
      "content": {
        "ageDays": 0,
        "targetDays": 3,
        "state": "healthy",
        "qualifiedAt": "...",
        "policyVersion": "content-refresh/v1",
        "evidenceType": "automated_live_refresh"
      }
    }
  }
}
```

UX rules:

- Say `Freshness SLA`, not a generic quality score.
- Show age and target together, for example `7d / 14d target`.
- Distinguish `Automated verification` from `Human review`.
- Show `Fallback used`, `Telemetry unavailable`, or `Last attempt failed` without replacing the last known good date.
- Provide a safe evidence link when available.
- Keep mobile notices compact and dismissible per incident ID.
- Never use green solely because the score is numeric; state is derived from evidence and telemetry availability.
- If telemetry is unavailable, display the last known checked-in baseline as `documentation fallback`, not as live telemetry.

## 10. Documentation strategy

`docs/FACTUAL_CLAIM_AUDIT.md` and `docs/KWIN_VALUE_ADD_EXECUTION_STATUS.md` remain valuable, but their dates become report metadata rather than the production freshness source.

Automation should generate or update a clearly delimited evidence appendix only after qualified verification, while preserving human-authored findings. Prefer generating separate reports:

- `docs/generated/LATEST_FACTUAL_VERIFICATION.md`
- `docs/generated/LATEST_EXECUTION_VERIFICATION.md`

Generated reports include policy version, commit SHA, workflow URL, qualified timestamp, control summary, and manifest hash. They must explicitly say whether the evidence is automated or human-reviewed.

No workflow should commit directly to the default branch merely to update dates. If checked-in generated reports are desired, open a bot pull request for review; production telemetry remains in Supabase.

## 11. Testing strategy

### 11.1 Unit tests

- Every attempt outcome and rail state
- Exact SLA boundaries
- Worst-rail scoring
- Future/invalid timestamps
- Policy-version mismatch
- Required-control missing/skipped/failed
- Partial fallback never qualifies
- Manifest canonicalization and hash verification
- URL and payload redaction
- Idempotency-key derivation
- Production file fallback cannot qualify

### 11.2 Database tests

- Constraints reject invalid outcome/qualification combinations
- Duplicate idempotency keys are harmless
- Terminal evidence cannot be updated/deleted by application roles
- Public roles cannot read raw evidence tables
- Service role can record valid attempts
- Qualification function rejects missing controls or unsupported policy versions
- Latest qualification query ignores newer failed attempts
- Concurrent recording produces one attempt

### 11.3 Integration tests

- GitHub-style signed evidence request persists an attempt and qualification
- Invalid signature, stale timestamp, replayed nonce, oversized body, and unknown workflow are rejected
- Content live success qualifies
- Feed failure + evergreen fallback persists `partial` and does not advance freshness
- Supabase failure never returns a qualifying success
- Post-write read mismatch fails qualification
- Operations status reads newest qualified evidence
- Telemetry outage returns explicit fallback state

### 11.4 Workflow contract tests

- Parse workflow YAML and assert required jobs/steps exist
- Assert required steps cannot be skipped in qualification mode
- Assert `record-evidence` uses `if: always()`
- Assert evidence secret is referenced but never echoed
- Assert audit artifact retention is documented
- Assert execution qualification runs production build
- Assert 14-day factual target matches code, workflow, staleness script, tests, and public copy

### 11.5 End-to-end tests

- Healthy status with evidence details
- Overdue rail presentation
- Latest attempt failed while last known good remains visible
- Telemetry unavailable presentation
- Mobile compactness and incident dismissal
- Accessibility: labels, contrast, keyboard interaction, and reduced motion

## 12. Observability and alerting

Emit structured logs with:

- attempt ID
- suite
- rail
- provider/run ID
- policy version
- outcome
- qualification result
- duration
- safe failure code
- storage backend
- source availability counts

Never log authorization headers, environment values, complete payloads, social access tokens, or raw provider responses containing sensitive data.

Alert conditions:

- Scheduler heartbeat absent beyond expected delay budget
- Latest attempt failed or timed out
- Rail enters early-warning band
- Rail becomes overdue
- Telemetry unavailable
- Policy mismatch
- Repeated partial/fallback content refreshes
- Source availability falls below threshold
- Evidence recording fails after verification succeeds
- Database clock or workflow clock differs beyond tolerance

Use one deduplicated GitHub issue per active incident class. Resolve automatically only after a qualified verification, but preserve issue history.

## 13. Security and privacy

- Dedicated evidence secret; do not reuse database or social credentials.
- HMAC request signing and replay prevention.
- Service-role key only in server runtime.
- Strict RLS and revoked public function access.
- Immutable terminal evidence.
- Host allowlists for evidence URLs.
- Bounded payloads and redacted diagnostics.
- No raw logs stored in public-readable tables.
- Dependency and action versions pinned to reviewed major versions or commit SHAs where appropriate.
- Threat-model SSRF, forged workflow evidence, replay, clock manipulation, JSON amplification, log injection, and compromised CI credentials.
- Document secret rotation and evidence-endpoint revocation procedures.

## 14. Retention and lifecycle

- Qualifications: retain indefinitely or for the legal/governance retention period.
- Attempts and controls: retain at least 13 months to show annual operating history.
- Detailed CI artifacts: retain 30–90 days depending on cost; store hashes and safe summaries permanently.
- Heartbeats: retain 90 days, then aggregate.
- Never hard-delete evidence through routine application code.
- If privacy or legal removal is required, use an audited administrative procedure and preserve a tombstone record.

## 15. Rollout plan

### Phase 0 — contract alignment

1. Approve rail names, targets, qualification meanings, and automated/human boundaries.
2. Align the factual staleness script from 30 days to the published 14-day SLA.
3. Inventory every current freshness consumer and test.
4. Define policy version `v1` for all three rails.
5. Add an architecture decision record confirming Supabase as production evidence authority.

Exit criteria: no conflicting target or definition remains in code or documentation.

### Phase 1 — schema and repository

1. Add migration `0003_operational_verification_evidence.sql`.
2. Add RLS, grants, immutable evidence controls, indexes, and RPCs.
3. Add repository interfaces and Supabase implementation.
4. Add migration and database contract tests.
5. Update `docs/DATABASE.md`, `docs/DATA_MODEL.md`, `docs/SUPABASE_SETUP.md`, and `.env.example`.

Exit criteria: valid attempts can be recorded idempotently; invalid qualification is impossible at the database boundary.

### Phase 2 — policy engine and recording API

1. Add contracts, schemas, canonical hashing, and policy evaluators.
2. Add signed protected recording endpoint.
3. Add replay defense, safe diagnostics, and integration tests.
4. Add a CLI/script that builds and submits manifests without shell-interpolating secrets.

Exit criteria: a simulated workflow can persist passed and failed attempts, while only a fully valid passed attempt qualifies a rail.

### Phase 3 — content refresh honesty

1. Separate live-source success from fallback generation in `runKwinSeoAgencyJob`.
2. Add explicit run outcome and source-health metrics.
3. Require Supabase persistence and post-write verification for production qualification.
4. Persist Vercel heartbeat and content attempt.
5. Ensure fallback-only runs never advance content freshness.

Exit criteria: content freshness advances only on qualified live/current checks.

### Phase 4 — factual and execution workflow evidence

1. Refactor Always Current workflow into suites.
2. Make all factual controls mandatory for factual qualification.
3. Make full build, migrations, PWA, integration, and smoke controls mandatory for execution qualification.
4. Record manifests with `if: always()`.
5. Add deduplicated alerts and job summaries with attempt IDs.

Exit criteria: scheduled workflows produce durable passed/failed evidence and cannot qualify with skipped required checks.

### Phase 5 — production status migration

1. Read Supabase qualifications in `getCurrentSiteFreshnessStatus`.
2. Preserve documentation fallback with an explicit `telemetry_unavailable` state.
3. Update status API, Trust Banner, Footer, discovery policies, `ai.txt`, and `llms.txt`.
4. Expose safe evidence metadata and automated/human labels.
5. Run dual-read comparison without changing public state for at least seven days.

Exit criteria: dual-read results are understood; production status uses durable evidence without hiding outages.

### Phase 6 — documentation and human-review workflow

1. Convert existing audit/status dates from telemetry inputs to report metadata.
2. Add generated evidence reports or bot PR workflow if desired.
3. Define reviewer roles and material-change triggers.
4. Add monthly human factual-review procedure.
5. Update the Always Current runbook and incident playbooks.

Exit criteria: humans can reproduce, review, and challenge any freshness claim.

### Phase 7 — hardening and recovery exercise

1. Test Supabase outage, GitHub delay, Vercel failure, source outage, secret rotation, replay, and policy upgrade.
2. Confirm last known good behavior and public degraded state.
3. Run a rollback drill using `git revert`, never destructive history rewriting.
4. Verify evidence remains intact across application rollback.
5. Complete security review and performance/load check.

Exit criteria: documented recovery objectives are met and no failure mode produces false green status.

## 16. Deployment and backward compatibility

Use expand-and-contract deployment:

1. Deploy additive schema.
2. Deploy writers while existing readers remain unchanged.
3. Accumulate at least one qualified verification for each rail.
4. Deploy dual-read diagnostics.
5. Switch public reads to evidence-backed status.
6. Retain documentation fallback.
7. Remove file dates as primary telemetry only after the observation window.

Do not backfill historical qualifications as if they were produced by the new system. Existing document dates may be imported only as `documentation_baseline`, never as automated passed evidence.

## 17. Operational runbook

### Healthy daily operation

1. Confirm scheduler heartbeat.
2. Confirm content attempt outcome and source-health threshold.
3. Confirm latest qualification remains within target.
4. Review warnings without changing dates.
5. Let the public UI derive state from durable evidence.

### Failed attempt

1. Preserve last known good qualification.
2. Display the latest safe failure state.
3. Open or update the deduplicated incident.
4. Fix the underlying control; never override qualification manually.
5. Re-run with trigger `retry` and a new provider attempt ID.

### False or disputed content

1. Quarantine the affected claim/source.
2. Revert or correct the published content.
3. Mark the related evidence through an append-only supersession record; do not mutate history.
4. Add or strengthen a guardrail.
5. Run a new factual verification and human review where required.

### Telemetry outage

1. Show `telemetry_unavailable` with documentation baseline and last known good evidence if cached safely.
2. Do not calculate a green SLA from fallback dates.
3. Restore Supabase connectivity or credentials.
4. Verify read and write paths.
5. Run qualified suites; do not manufacture missed qualifications.

### Policy upgrade

1. Add a new policy version; never reinterpret old evidence silently.
2. Test compatibility and UI wording.
3. Decide whether old qualifications remain accepted until expiry.
4. Deploy policy code before workflows emit the new version.
5. Record the decision in an architecture record.

## 18. Definition of done

The program is complete only when:

- Production freshness no longer depends primarily on Markdown dates.
- Every rail has at least one real qualified verification.
- Fallback-only SEO runs do not advance content freshness.
- Required factual and execution controls cannot be skipped while qualifying.
- Supabase constraints prevent invalid qualifications.
- The public UI exposes target, age, state, evidence type, and telemetry availability.
- Automated verification is never labeled as independent external confirmation.
- Tests cover boundary, failure, replay, persistence, and outage behavior.
- Documentation targets agree with code and workflows.
- A recovery drill demonstrates last-known-good, fail-closed behavior.
- An operator can trace any displayed freshness state to an immutable attempt and its controls.

## 19. Implementation checklist

- [ ] Approve this plan and qualification language.
- [ ] Create architecture decision record.
- [ ] Align 14-day factual target everywhere.
- [ ] Add migration and database security.
- [ ] Add verification contracts and policy engine.
- [ ] Add signed evidence endpoint and replay protection.
- [ ] Add evidence submission script.
- [ ] Make SEO live/fallback outcome explicit.
- [ ] Add content qualification and heartbeat recording.
- [ ] Refactor GitHub workflow into evidence-producing suites.
- [ ] Require full execution controls for execution qualification.
- [ ] Add human factual-review path.
- [ ] Add dual-read status computation.
- [ ] Update public UI and machine-readable policies.
- [ ] Update database, API, architecture, setup, and runbook documentation.
- [ ] Run seven-day observation window.
- [ ] Run failure and recovery drills.
- [ ] Switch production status authority to durable evidence.

## 20. First implementation slice

The safest first pull request should be additive and contain only:

1. Migration for attempts, controls, qualifications, heartbeats, grants, and indexes.
2. Pure TypeScript contracts and policy evaluators.
3. Supabase repository with an in-memory test adapter.
4. Signed recording endpoint.
5. Unit, migration, security, and integration tests.
6. Documentation updates for schema and configuration.

It should not yet change the public freshness UI or remove documentation fallback. That separation makes review safer, preserves rollback, and allows real evidence to accumulate before it becomes a public claim.

## 21. Implementation status (2026-08-15)

The additive system described above is implemented: migration, versioned policy engine, strict contracts, signed bounded endpoint, idempotent persistence, live-versus-fallback content qualification, scheduler heartbeats, daily independent GitHub evidence suites, dual-read public status, and operator documentation. The UI deliberately reports hybrid/degraded telemetry until all three durable rails have qualifying records.

The observation window and production failure/recovery drills remain operational rollout activities; they cannot be truthfully marked complete by a code change. Documentation fallback must remain until migrations `0003` through `0006` are applied and successful production evidence has accumulated.

### Resilience hardening addendum

The second-pass implementation adds database-level qualification integrity (`0004`), current-policy-only reads, complete payload conflict detection, batched evidence lookup, strict scalar metrics, bounded attempt duration, trusted scheduler enforcement, independent CI controls, qualified-receipt enforcement, explicit configuration preflight, and deterministic invocation identities. These controls preserve failed attempts for diagnosis while preventing them from advancing public freshness.

Migration `0005` closes the final write-consistency gap with a service-role-only transactional RPC. The pure record builder and canonical fingerprint module keep policy evaluation, serialization, persistence, and transport independently testable. Attempt and qualification writes are atomic under concurrency; exact retries converge on one record, and conflicting retries are rejected.
