# Always-Current Control Plane: Configuration and Debug Runbook

## Purpose

This runbook explains how to configure, operate, and troubleshoot the zero-budget “always-current” control plane.

The system has two complementary parts:

1. **Vercel cron** performs the protected production refresh.
2. **GitHub Actions** runs every six hours to trigger that refresh (when configured), verify source/factual health, and open one actionable issue if a critical gate fails.

The system is intentionally designed to preserve the last known good site state. A failed check must not silently publish unverified content.

## What is included

| Component | Location | Responsibility |
| --- | --- | --- |
| GitHub control plane | `.github/workflows/always-current.yml` | Schedule, verification, failure issue creation, optional production handoff |
| Source registry check | `scripts/verify-source-registry.mjs` | Allows only reviewed HTTPS feed hosts; reports direct vs discovery sources |
| Staleness check | `scripts/check-content-staleness.mjs` | Requires the factual claim audit to be refreshed every 30 days |
| Factual guardrail | `scripts/verify-factual-integrity.mjs` | Blocks known inaccurate/stale claim patterns |
| Runtime refresh endpoint | `app/api/cron/kwin-seo-agency/route.ts` | Protected production refresh job |
| Vercel schedule | `vercel.json` | Native host-side scheduled invocation |

## One-time configuration

### 1. Configure Vercel

In the Vercel project environment variables, configure:

| Variable | Required | Value |
| --- | --- | --- |
| `CRON_SECRET` | Yes | A random value of at least 16 characters |
| Existing application variables | As applicable | Supabase, email, social publishing, analytics, and other application configuration |

Use the same `CRON_SECRET` value in GitHub. Do not commit it to `.env`, source files, documentation examples, or workflow YAML.

Verify the Vercel schedule configuration in `vercel.json`. Its cron invokes the configured route in UTC.
On Vercel Hobby, the schedule must run no more than once a day; the repository guard enforces this before CI builds.

### 2. Configure GitHub Actions secrets

Open the repository’s **Settings → Secrets and variables → Actions** and create:

| Secret | Required | Example |
| --- | --- | --- |
| `SITE_REFRESH_URL` | Yes for GitHub-to-production refresh | `https://your-domain.example/api/cron/kwin-seo-agency` |
| `CRON_SECRET` | Yes for GitHub-to-production refresh | Same value as Vercel’s `CRON_SECRET` |

The URL must be HTTPS and must point to the protected production route—not a preview or localhost URL.

### 3. Enable GitHub Actions write permissions

The workflow needs `issues: write` only to create a single deduplicated alert issue when a critical check fails.

In repository settings, ensure Actions has permission to create issues, or remove the issue-creation step if issue creation is not desired. The verification jobs do not require write access to content or deployments.

### 4. Commit and push the workflow

GitHub only schedules workflows that exist on the default branch. Commit `.github/workflows/always-current.yml` and push it to `main` (or the repository’s default branch).

## First-run verification

### Local verification

Run these from the repository root:

```bash
npm run sources:verify
npm run content:staleness
npm run quality:verify-facts
npm run type-check
npm test
```

Expected result: every command exits with code `0`. The source command reports a healthy source inventory; the staleness command reports an audit age of at most 30 days.

### Manual GitHub run

1. Open **Actions → Always Current Control Plane**.
2. Select **Run workflow**.
3. Choose `standard` for routine validation, or `full` to include a production build.
4. Inspect each step and confirm it is green.

The first successful run verifies that GitHub can install dependencies, execute the controls, and access the configured secrets without exposing them in logs.

### Confirm the production handoff

When both secrets are set, the workflow log should show **Trigger protected production refresh** as successful.

Then inspect the Vercel function logs for the matching invocation. It should return a successful JSON result rather than `401 Unauthorized`.

## Normal operation

- The GitHub Action is scheduled at minute 17 every six hours, in UTC.
- Vercel cron remains the native runtime scheduler.
- GitHub scheduled workflows can be delayed; do not treat an exact minute as an SLA.
- A failed check opens at most one issue titled **Always-current control plane requires attention**. Fix the underlying cause, re-run the workflow, and close the issue after confirmation.

## Troubleshooting guide

### `Trigger protected production refresh` fails with `401`

**Likely cause:** `CRON_SECRET` is absent, mistyped, or different between GitHub and Vercel.

**Fix:**

1. Generate one new random secret.
2. Set it in Vercel as `CRON_SECRET`.
3. Set the exact same value in GitHub Actions secrets.
4. Redeploy Vercel if its environment-variable configuration requires it.
5. Re-run the workflow manually.

Never paste the secret into an issue or workflow log.

### `Trigger protected production refresh` fails with `404`

**Likely cause:** `SITE_REFRESH_URL` has the wrong hostname, path, deployment alias, or trailing path.

**Fix:** set it to the deployed route exactly, for example:

```text
https://your-domain.example/api/cron/kwin-seo-agency
```

Check that the route appears in the production build output and that the domain is the production domain.

### `Trigger protected production refresh` times out or returns `5xx`

**Likely cause:** a downstream provider, source feed, storage service, or the refresh job itself is unavailable.

**Fix:**

1. Open Vercel function logs for the matching timestamp.
2. Identify the first failing dependency.
3. Keep the last known good content in place; do not manually overwrite it with unverified data.
4. Disable the individual failing source if it is noncritical.
5. Re-run manually after the dependency is healthy.

### `Verify reviewed source registry` fails

**Likely cause:** a feed host was added without review, a duplicate URL was introduced, an insecure URL was used, or every direct institutional source was removed.

**Fix:**

1. Inspect `public/feeds/kwin-city-news-feeds.opml`.
2. Confirm every `xmlUrl` uses HTTPS.
3. Add a new host to the source-registry script only after documenting why it is authentic and what its claim policy is.
4. Never add a generic URL shortener, anonymous feed proxy, or private-network address.
5. Run `npm run sources:verify` locally before committing.

### `Audit factual-content freshness` fails

**Likely cause:** `docs/FACTUAL_CLAIM_AUDIT.md` is older than 30 days.

**Fix:**

1. Re-check every factual claim in scope against its original source.
2. Update the audit date, source status, findings, and any required copy changes.
3. Do not change only the date; the audit must represent a real review.
4. Run `npm run content:staleness` locally.

### `Enforce factual integrity guardrails` fails

**Likely cause:** a known invalid numeric/claim pattern was reintroduced.

**Fix:** inspect the file and line emitted by `npm run quality:verify-facts`; correct the claim or add source-qualified wording. Do not weaken a factual rule merely to pass CI.

### Type check or unit tests fail

**Fix:** reproduce locally with `npm run type-check` or `npm test`, fix the regression, and re-run the affected command. The workflow should not be bypassed for content changes because presentation bugs can hide evidence or freshness labels.

### No workflow run appears

**Likely causes:** the workflow is not on the default branch, Actions is disabled, the repository is inactive, or the scheduler was delayed.

**Fix:** use **Run workflow** manually first. Confirm the file path and YAML syntax. GitHub’s scheduled workflows are best-effort; Vercel cron provides the runtime refresh complement.

## Emergency procedures

### Pause automatic refresh

1. In Vercel, disable the relevant cron job; or temporarily remove it from `vercel.json` and deploy.
2. In GitHub, disable the **Always Current Control Plane** workflow from the Actions page.
3. Keep verification source code in place so the system can be restored deliberately.

### Quarantine one source

1. Remove or comment out the source in the reviewed OPML registry.
2. Record why it was removed in the factual audit or a source-health note.
3. Run `npm run sources:verify`.
4. Commit, deploy, and monitor subsequent refreshes.

### Roll back a bad publication

1. Identify the last known-good Git commit.
2. Revert the specific content/data commit with Git; do not reset shared history.
3. Run the normal validation commands.
4. Deploy the revert.
5. Add a guardrail test or source-policy change before reintroducing the update.

## Maintenance checklist

### Every week

- Check whether the alert issue exists.
- Review the most recent workflow run and Vercel cron logs.
- Review quarantined or degraded sources.

### Every month

- Complete a real factual claim audit.
- Revalidate each source domain and feed endpoint.
- Review GitHub Actions/Vercel platform notices.
- Test a manual workflow run and an endpoint handoff.
- Test a Git revert of a non-production branch.

## Security rules

- Repository secrets must never be logged, copied into issues, or committed.
- Only the reviewed source registry may be fetched server-side.
- Discovery sources are monitoring signals, never automatic factual proof.
- High-stakes claims must continue through a reviewable Git change.
- Keep workflow permissions minimal: the control plane reads contents and writes only a failure issue.
