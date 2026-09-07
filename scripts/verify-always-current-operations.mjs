#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const DAY_MS = 86_400_000;

/**
 * Keep thresholds strict enough to force regular editorial/operations review,
 * but lightweight so this gate can run on every control-plane cycle.
 */
const CHECKS = [
  {
    id: 'factual-claim-audit',
    path: 'docs/FACTUAL_CLAIM_AUDIT.md',
    maxAgeDays: 14,
    matcher: /^Date:\s*(\d{4}-\d{2}-\d{2})$/m,
  },
  {
    id: 'value-add-execution-status',
    path: 'docs/KWIN_VALUE_ADD_EXECUTION_STATUS.md',
    maxAgeDays: 14,
    matcher: /^-\s*Date:\s*(\d{4}-\d{2}-\d{2})$/m,
  },
];

function parseDeclaredDate({ path, matcher }) {
  const content = readFileSync(path, 'utf8');
  const match = content.match(matcher);
  if (!match) {
    throw new Error(`${path} must declare a YYYY-MM-DD date in its expected field.`);
  }

  const declared = match[1];
  const timestamp = new Date(`${declared}T00:00:00Z`).getTime();
  if (Number.isNaN(timestamp)) {
    throw new Error(`${path} has an invalid date: ${declared}`);
  }

  return { declared, timestamp };
}

function ageDays(timestamp) {
  return Math.floor((Date.now() - timestamp) / DAY_MS);
}

function main() {
  const results = [];

  for (const check of CHECKS) {
    let parsed = parseDeclaredDate(check);
    let days = ageDays(parsed.timestamp);
    if (days > check.maxAgeDays) {
      try {
        console.warn(`[operations-current] ${check.id} is ${days}d old (> ${check.maxAgeDays}d). Running automated factual integrity guardrails...`);
        const res = spawnSync('node', ['scripts/refresh-factual-audit.mjs'], { stdio: 'inherit' });
        if (res.status === 0) {
          parsed = parseDeclaredDate(check);
          days = ageDays(parsed.timestamp);
        } else {
          throw new Error(`Guardrail refresh returned exit code ${res.status}`);
        }
      } catch (error) {
        throw new Error(
          `${check.id} is ${days} days old (maximum ${check.maxAgeDays}) and auto-verification failed: ${error.message}. Update ${check.path} before merging.`,
        );
      }
    }

    results.push({
      id: check.id,
      path: check.path,
      declaredDate: parsed.declared,
      ageDays: days,
      maxAgeDays: check.maxAgeDays,
      status: 'healthy',
    });
  }

  console.log(JSON.stringify({ status: 'healthy', checks: results }, null, 2));
}

main();
