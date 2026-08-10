# Always-Current Website Strategy: Zero-Budget, Plug-and-Play

## Executive decision

No website can be honestly described as “always current” merely because it has a schedule. The dependable outcome is a system that continuously detects change, verifies it before publication, records what happened, and makes failure visible to a human.

This document compares the three strongest no-budget operating models and recommends **Option 3: a Git-backed verification pipeline with a small, secure runtime refresh layer**. It is generic by design: replace the source registry, validation rules, and content adapters—not the operating model.

| Option | Best for | Cost | Reliability | Editorial control | Recommendation |
| --- | --- | ---: | --- | --- | --- |
| 1. Scheduled runtime refresh | Small sites with live API/feed content | $0 on an existing host plan | Medium | Medium | Good starting point |
| 2. Git-native content operations | Documentation, evidence portals, static/reference content | $0 for public repositories / available included CI | High | Very high | Best source of truth |
| 3. Verified hybrid control plane | Public-facing sites that need both live signals and durable facts | $0 using existing Git + host capabilities | Highest | Highest | **Choose this** |

## Non-negotiable operating principles

1. **Source is not proof.** A URL or RSS item is a lead until its publisher, domain, date, and claim scope are checked.
2. **No silent publishing.** Automated collection may prepare a change; publication requires deterministic validation and an auditable decision.
3. **Use immutable evidence.** Keep the original URL, retrieval time, canonical URL, source type, and content hash with every published fact.
4. **Fail closed for claims; fail open for reading.** If a source cannot be verified, preserve the existing approved content and show a degraded-data state rather than inventing an update.
5. **Separate monitoring from authority.** Discovery feeds, search results, social posts, and commentary can alert the system; they cannot automatically upgrade a factual claim.
6. **Every task must be idempotent.** Running a job twice must produce the same result, except for explicitly timestamped logs.
7. **Every automated change needs a rollback path.** Git history is the primary rollback mechanism.

## Common architecture

```text
Verified source registry
        │
        ▼
Fetch + normalize ──► change detector ──► validation gates
                                              │
                         ┌────────────────────┴────────────────────┐
                         ▼                                         ▼
                    no material change                       approved change
                         │                                         │
                         ▼                                         ▼
                     heartbeat log                        Git change / runtime cache
                                                                   │
                                                                   ▼
                                                        deploy + synthetic checks
                                                                   │
                                                                   ▼
                                                          status page / issue alert
```

Every option below uses these five reusable interfaces:

```ts
type SourceDefinition = {
  id: string;
  name: string;
  canonicalDomain: string;
  kind: 'institutional' | 'publisher' | 'dataset' | 'discovery';
  feedUrl?: string;
  pageUrl: string;
  verification: 'domain-match' | 'signed-api' | 'manual-review';
  refreshMinutes: number;
  claimPolicy: 'auto-publish' | 'review-required' | 'monitor-only';
};

type SourceObservation = {
  sourceId: string;
  retrievedAt: string;
  canonicalUrl: string;
  title: string;
  publishedAt?: string;
  contentHash: string;
  rawLocation: string;
};

type Decision = 'no-change' | 'propose' | 'publish' | 'quarantine';
```

## Option 1 — Scheduled runtime refresh with a verified source registry

### What it is

The deployed app runs a protected scheduled endpoint. The endpoint fetches only a reviewed allowlist of sources, normalizes them, validates them, and refreshes a short-lived cache or data store. Pages read the most recently verified snapshot.

This is best for live news, availability, status, events, public notices, and other content that benefits from freshness but does not require a Git change for every item.

Vercel cron jobs invoke a production HTTP endpoint on a schedule, use UTC, and can be configured in `vercel.json`. Secure them with a `CRON_SECRET`; Vercel documents both the invocation model and secret-based protection. [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs), [managing cron jobs](https://vercel.com/docs/cron-jobs/manage-cron-jobs)

### Required components

- `sources.ts`: the reviewed source registry
- `/api/cron/refresh`: protected runner
- `fetchSource(source)`: timeout, response-size limit, redirect policy, canonical-domain check
- `normalize(source, response)`: source-specific parser
- `validate(observation)`: schema, date, URL, provenance, duplication, and claim checks
- `snapshot store`: database if available; otherwise a versioned JSON artifact committed by Option 2
- `health record`: most recent run, source success rate, accepted/rejected counts, error samples

### Reference execution sequence

1. Verify `Authorization: Bearer $CRON_SECRET` before doing any work.
2. Read the enabled source registry.
3. Fetch sources concurrently with a strict bounded pool (for example, four at a time).
4. Reject non-HTTPS URLs, redirect escapes, private addresses, unexpected MIME types, oversized bodies, and sources outside their canonical domain.
5. Normalize into `SourceObservation` records.
6. Compare each normalized record’s hash to the last accepted record.
7. Apply content policy:
   - `auto-publish`: only low-risk, structured content such as event date/status where the authoritative API/domain matches.
   - `review-required`: create a proposal, never overwrite public copy.
   - `monitor-only`: show as a labelled signal; never use it as evidence.
8. Write one atomic snapshot after all validations succeed.
9. Emit a health record, including a heartbeat when nothing changed.
10. Run a synthetic read of the public endpoint after refresh.

### Minimal secure cron contract

```ts
export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const run = await refreshAllSources({ dryRun: false });
  if (run.failedCriticalSources.length) {
    return Response.json({ ok: false, run }, { status: 503 });
  }
  return Response.json({ ok: true, run });
}
```

### Guardrails

- Never accept a source URL from an anonymous request.
- Do not treat an aggregator/search feed as an authoritative publisher record.
- Check resolved redirect URLs as well as the initial URL.
- Cap response bytes and parsing time.
- Use per-source timeouts; one failing source must not block the full run.
- Keep the last known good snapshot for at least 30 days.
- Alert only after repeated failure (for example, three consecutive critical-source failures) to avoid noise.

### Zero-budget implementation

- Use the existing Vercel Cron configuration and server route.
- Store latest snapshots in an existing free Supabase project if one is already configured; otherwise use Option 2’s versioned JSON artifact.
- Surface status at `/status/data-freshness` with no external monitoring service.
- Use GitHub Issues as the alert inbox through Option 2 rather than paid paging.

### Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Scheduler is delayed | Treat schedule as eventual; expose `lastSuccessfulRefreshAt` and retry on the next run. |
| Serverless memory cache disappears | Persist the accepted snapshot; do not rely only on in-memory state. |
| Source changes format | Per-source parser tests and quarantine instead of publishing malformed data. |
| Bad data replaces good data | Atomic writes plus last-known-good snapshot and Git rollback. |

## Option 2 — Git-native content operations

### What it is

Scheduled CI checks sources and repository content, creates a small pull request only when a validated update exists, and deploys only after standard checks pass. Git becomes the evidence ledger, review queue, and rollback history.

This is best for factual pages, documentation, source directories, policy pages, datasets, and editorial content where accuracy matters more than minute-level freshness.

GitHub Actions supports scheduled and manually dispatched workflows. Scheduled jobs can be delayed during high load, so the workflow must record lateness and never assume exact timing. [GitHub event documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) Workflows live in `.github/workflows` and can be invoked manually through `workflow_dispatch`. [GitHub workflow documentation](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows), [triggering workflows](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)

### Recommended workflow set

1. `content-verify.yml` — every pull request and every push
2. `source-refresh.yml` — scheduled, plus manual dispatch
3. `site-smoke.yml` — after deployment or on schedule
4. `staleness-audit.yml` — weekly
5. `dependency-audit.yml` — weekly or monthly

### `source-refresh.yml` behavior

```yaml
name: Source refresh
on:
  schedule:
    - cron: '17 2 * * *'
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write
  issues: write

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run sources:refresh -- --propose-only
      - run: npm run quality:verify-facts
      - run: npm run type-check
      - run: npm test
      - name: Create review artifact
        run: npm run sources:report
      # Use a reviewed, pinned PR-creation action or the GitHub CLI.
```

### What the refresh script must produce

- `data/sources/<source-id>.json`: normalized source snapshot
- `data/changes/<yyyy-mm-dd>.json`: proposed additions, removals, and modified fields
- `docs/source-health.md`: generated current health summary
- `artifacts/source-refresh-report.md`: human-readable diff with links

Never have the job edit prose directly. It may update structured data; presentation code should render the structured record with source labels.

### Review rules

| Content category | Can automation merge? | Required evidence |
| --- | --- | --- |
| Machine-readable status from an authoritative API | Yes, after schema/domain checks | Source URL, retrieved time, hash |
| Public event/calendar change | Usually, after validation | Original page and date |
| Project claim, approval, land, investment, timeline | No | Primary document and reviewer approval |
| Aggregator or social discovery | Never | Converted to a review task only |
| Broken link/metadata-only correction | Yes | Link checker output |

### Zero-budget implementation

- Use repository workflows, issues, pull requests, and branch protection.
- Keep source snapshots in Git when their size is reasonable.
- Use a `STALE` issue label and an issue template for source review.
- Add a `workflow_dispatch` trigger so anyone with repository access can request an immediate refresh without paid tooling.

### Reliability details

- Schedule at an off-peak minute, not exactly on the hour.
- Add `concurrency` so a delayed run cannot overlap a newer one.
- Make the refresh script exit nonzero only for critical failures; create an issue for degraded noncritical sources.
- Pin third-party actions to commit SHAs for supply-chain hygiene.
- Use a bot identity with the minimum repository permissions.
- Add a weekly job that checks whether every source has been verified within its declared review interval.

## Option 3 — Recommended: verified hybrid control plane

### What it is

Combine Option 1 for time-sensitive, low-risk live information and Option 2 for high-stakes factual content. The key is one shared source registry and one shared validation library, so a live reader, an editorial page, and a scheduled workflow cannot disagree about source quality.

This is the best zero-budget strategy because it gives users freshness without turning automation into an unaccountable publisher.

### Content lanes

| Lane | Examples | Update mechanism | Publication policy |
| --- | --- | --- | --- |
| Live, low-risk | RSS headlines, public alerts, service availability | Runtime cron + cache | Automated with visible provenance |
| Verified structured | Official calendars, datasets, notices | Runtime cron + persisted snapshot | Automated after strict schema/domain checks |
| High-stakes factual | approvals, land, investment, legal status, timelines | Git proposal | Human review required |
| Discovery | search, aggregators, social, third-party commentary | Runtime monitor | Never treated as factual evidence |
| Evergreen | explainers, guides, core site content | Weekly Git staleness audit | Human review required |

### The shared source registry

Keep a single `app/lib/sources/registry.ts` (or equivalent) with fields such as:

```ts
export const SOURCES: SourceDefinition[] = [
  {
    id: 'agency-notices',
    name: 'Example Agency Notices',
    canonicalDomain: 'agency.example.gov',
    kind: 'institutional',
    pageUrl: 'https://agency.example.gov/notices',
    feedUrl: 'https://agency.example.gov/notices/rss.xml',
    verification: 'domain-match',
    refreshMinutes: 360,
    claimPolicy: 'review-required',
  },
];
```

The registry is the plug-and-play boundary. To adapt the system for another website, add or remove source definitions and their parsers; do not alter validation rules to make a source “fit.”

### Validation gate order

1. URL and transport validation: HTTPS; allowlisted domain; redirect target remains allowlisted.
2. Source identity validation: feed/title/page matches the registry record.
3. Retrieval validation: response content type, byte limit, timeout, schema.
4. Freshness validation: publish/retrieval timestamps are plausible.
5. Content validation: required fields, canonical URL, duplicate hash.
6. Claim validation: determine whether the content can auto-publish, requires review, or is monitor-only.
7. Presentation validation: source badge, original-link target, date, and uncertainty label are rendered.
8. Deployment validation: type check, tests, build, route smoke, and accessibility smoke.

### Status and observability without paid services

Create a public or internal status document/page with:

- last successful refresh timestamp
- per-source freshness target and observed age
- source health (`healthy`, `degraded`, `quarantined`)
- last successful build/deploy commit
- count of pending review proposals
- next scheduled run window

Store the detailed logs as CI artifacts or versioned JSON. Create a GitHub issue automatically only when a critical source crosses its agreed freshness threshold.

### Daily, weekly, and monthly operating rhythm

**Daily (automated)**

- Refresh live sources.
- Verify source domains and snapshot changes.
- Create review proposals for high-stakes changes.
- Run basic site smoke checks.
- Record a heartbeat even when unchanged.

**Weekly (automated + 15-minute human pass)**

- Run staleness audit for all factual pages.
- Review quarantined sources and pending proposals.
- Review failed link checks.
- Check analytics only for quality signals: empty states, failed loads, no-result searches.

**Monthly (human, 30–60 minutes)**

- Revalidate each source registry entry against its official publisher page.
- Rotate/disable sources with repeated parsing or reliability failures.
- Review update rules and page ownership.
- Test restore from a prior Git revision.
- Review dependency and platform notices.

## Generic scripts and commands

Add project-specific adapters behind these stable command names:

```json
{
  "scripts": {
    "sources:refresh": "node scripts/refresh-sources.mjs",
    "sources:report": "node scripts/report-source-health.mjs",
    "sources:verify": "node scripts/verify-source-registry.mjs",
    "content:staleness": "node scripts/check-content-staleness.mjs",
    "site:smoke": "playwright test e2e/routes-regression.spec.ts --project=chromium"
  }
}
```

The scripts should accept `--dry-run`, `--source=<id>`, and `--propose-only`. This makes local debugging, CI scheduling, and manual emergency runs share exactly the same code path.

## GitHub Actions implementation checklist

The repository implementation is `.github/workflows/always-current.yml`. It runs every six hours at minute 17 (UTC) and can also be launched manually from the **Actions** tab.

To enable the secure runtime handoff without buying another service, add these existing values as **GitHub repository secrets**:

| Secret | Value | Purpose |
| --- | --- | --- |
| `SITE_REFRESH_URL` | Full protected endpoint URL, for example `https://your-domain.example/api/cron/your-refresh-job` | Lets CI call the deployed refresh job. |
| `CRON_SECRET` | The same random value configured for the host’s protected cron route | Authenticates CI to the production refresh endpoint. |

The workflow deliberately does not infer or expose these values. If either secret is absent, it continues with verification and emits a clear warning rather than attempting an insecure refresh.

## Definition of done for “always current”

Do not declare this system complete until all items below are true:

- [ ] Every published source comes from a version-controlled registry.
- [ ] Every source has an owner, a freshness target, and a claim policy.
- [ ] Discovery sources are visually and programmatically labelled as non-authoritative.
- [ ] The update pipeline has bounded timeouts, response-size limits, and redirect/domain validation.
- [ ] A failed refresh preserves the last known good content.
- [ ] Each run records a machine-readable health result and a human-readable report.
- [ ] High-stakes factual changes arrive as reviewable Git changes, not silent edits.
- [ ] The production site exposes `lastUpdated` and source provenance where it matters.
- [ ] Tests cover normal, malformed, stale, duplicate, and unavailable source responses.
- [ ] A manual runbook explains how to pause a source, revert a change, and restore the last known good snapshot.

## Recommended adoption plan

### Week 1: establish truth and safety

1. Inventory all current external sources.
2. Assign source kind, canonical domain, owner, freshness target, and claim policy.
3. Remove or relabel any aggregator source represented as an original authority.
4. Lock all server-side fetches to the registry.
5. Add source health output and last-known-good snapshots.

### Week 2: automate verification

1. Add `sources:verify` and `content:staleness` scripts.
2. Add scheduled CI with a manual dispatch option.
3. Make high-stakes updates open proposals rather than publish automatically.
4. Add route and source-parser tests.

### Week 3: add runtime freshness

1. Add a protected scheduled endpoint for low-risk live data only.
2. Persist verified snapshots and show freshness metadata.
3. Add degradation behavior and source-health visibility.

### Week 4: rehearse failure

1. Simulate a source outage, malformed feed, redirected domain, and stale record.
2. Confirm the public site remains usable and does not publish unverified claims.
3. Restore a known-good snapshot and verify the recovery path.

## Final recommendation

Adopt **Option 3**. It is more valuable than a simple scheduler because it treats freshness as a trust problem, not an automation problem. Use runtime updates only where the risk is low and provenance is clear; use Git-backed proposals for consequential factual claims. This remains zero-budget when built on the repository, the existing hosting plan, and the source systems already in use—and it scales cleanly when budget becomes available later.
