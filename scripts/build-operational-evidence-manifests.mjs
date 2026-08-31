import { writeFile } from 'node:fs/promises';

const now = new Date().toISOString();
const startedAt = process.env.VERIFICATION_STARTED_AT || now;
const runId = process.env.GITHUB_RUN_ID || `local-${Date.now()}`;
const attempt = process.env.GITHUB_RUN_ATTEMPT || '1';
const sha = (process.env.GITHUB_SHA || '').toLowerCase();
const runUrl = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
  ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${runId}` : undefined;
const trigger = process.env.GITHUB_EVENT_NAME === 'schedule' ? 'schedule' : process.env.GITHUB_EVENT_NAME === 'workflow_dispatch' ? 'workflow_dispatch' : 'manual';

function outcome(name) {
  const value = process.env[name] || 'skipped';
  return value === 'success' ? 'passed' : value === 'failure' ? 'failed' : value === 'cancelled' ? 'cancelled' : 'skipped';
}

function build(suite, policyVersion, definitions) {
  const controls = definitions.map(([id, env]) => ({ id, required: true, outcome: outcome(env) }));
  const passed = controls.every((control) => control.outcome === 'passed');
  return {
    idempotencyKey: `github:${runId}:${attempt}:${suite}`,
    suite, outcome: passed ? 'passed' : 'failed', policyVersion, startedAt, completedAt: now,
    ...(sha ? { commitSha: sha } : {}), environment: 'ci', provider: 'github_actions', providerRunId: `${runId}:${attempt}`,
    ...(runUrl ? { providerRunUrl: runUrl } : {}), trigger, controls,
    manifest: { repository: process.env.GITHUB_REPOSITORY, ref: process.env.GITHUB_REF, workflow: process.env.GITHUB_WORKFLOW, runAttempt: attempt },
    ...(!passed ? { failureCode: `${suite}-controls-failed`, failureSummary: `Required controls did not all pass: ${controls.filter((control) => control.outcome !== 'passed').map((control) => control.id).join(', ')}` } : {}),
  };
}

await writeFile('factual-audit-evidence.json', JSON.stringify(build('factual_audit', 'factual-audit/v1', [
  ['operations-current', 'OUTCOME_OPERATIONS'], ['primary-source-health', 'OUTCOME_PRIMARY'],
  ['source-registry', 'OUTCOME_SOURCES'], ['content-staleness', 'OUTCOME_STALENESS'],
  ['factual-integrity', 'OUTCOME_FACTS'], ['discovery-signals', 'OUTCOME_DISCOVERY'],
]), null, 2));

await writeFile('execution-status-evidence.json', JSON.stringify(build('execution_status', 'execution-status/v1', [
  ['node-runtime', 'OUTCOME_NODE'], ['type-check', 'OUTCOME_TYPES'], ['unit-tests', 'OUTCOME_TESTS'],
  ['migration-verification', 'OUTCOME_MIGRATIONS'], ['vercel-config', 'OUTCOME_VERCEL'],
  ['pwa-verification', 'OUTCOME_PWA'], ['production-build', 'OUTCOME_BUILD'],
]), null, 2));

console.log('Built sanitized factual and execution evidence manifests.');
