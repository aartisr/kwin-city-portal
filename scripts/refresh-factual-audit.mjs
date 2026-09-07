#!/usr/bin/env node

/**
 * Automated Factual Audit & Freshness Refresh Tool
 * 
 * Runs the complete suite of factual integrity checks:
 * 1. Factual integrity guardrails (acreage, numbers, claims)
 * 2. Source registry validation (OPML HTTPS sources)
 * 3. AI discovery & citation signals
 * 
 * If all verification checks pass, updates the declared audit dates in:
 * - docs/FACTUAL_CLAIM_AUDIT.md
 * - docs/KWIN_VALUE_ADD_EXECUTION_STATUS.md
 * and updates fallback dates in app/lib/operations/site-freshness.ts.
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const today = new Date().toISOString().slice(0, 10);
console.log(`[audit-refresh] Running factual integrity guardrails for ${today}...`);

try {
  execSync('node scripts/verify-factual-integrity.mjs', { stdio: 'inherit' });
  execSync('node scripts/verify-source-registry.mjs', { stdio: 'inherit' });
  execSync('node scripts/verify-discovery-signals.mjs', { stdio: 'inherit' });
} catch (error) {
  console.error('[audit-refresh] Factual checks failed! Audit date will NOT be refreshed until claims are corrected.');
  process.exit(1);
}

// Update docs/FACTUAL_CLAIM_AUDIT.md
const auditPath = 'docs/FACTUAL_CLAIM_AUDIT.md';
let auditContent = readFileSync(auditPath, 'utf8');
auditContent = auditContent.replace(/^Date:\s*(\d{4}-\d{2}-\d{2})$/m, `Date: ${today}`);
writeFileSync(auditPath, auditContent, 'utf8');
console.log(`[audit-refresh] Updated ${auditPath} date to ${today}`);

// Update docs/KWIN_VALUE_ADD_EXECUTION_STATUS.md
const statusPath = 'docs/KWIN_VALUE_ADD_EXECUTION_STATUS.md';
let statusContent = readFileSync(statusPath, 'utf8');
statusContent = statusContent.replace(/^-\s*Date:\s*(\d{4}-\d{2}-\d{2})$/m, `- Date: ${today}`);
writeFileSync(statusPath, statusContent, 'utf8');
console.log(`[audit-refresh] Updated ${statusPath} date to ${today}`);

// Update app/lib/operations/site-freshness.ts fallback dates
const freshnessPath = 'app/lib/operations/site-freshness.ts';
let freshnessContent = readFileSync(freshnessPath, 'utf8');
freshnessContent = freshnessContent.replace(
  /const FACTUAL_AUDIT_FALLBACK_DATE = "[^"]+";/,
  `const FACTUAL_AUDIT_FALLBACK_DATE = "${today}";`
);
freshnessContent = freshnessContent.replace(
  /const EXECUTION_STATUS_FALLBACK_DATE = "[^"]+";/,
  `const EXECUTION_STATUS_FALLBACK_DATE = "${today}";`
);
writeFileSync(freshnessPath, freshnessContent, 'utf8');
console.log(`[audit-refresh] Updated ${freshnessPath} fallback dates to ${today}`);

console.log(`[audit-refresh] All factual checks passed and freshness dates successfully updated to ${today}.`);
