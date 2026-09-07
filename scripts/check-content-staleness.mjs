#!/usr/bin/env node

import { readFileSync } from 'node:fs';

const MAX_AGE_DAYS = 14;
const auditPath = 'docs/FACTUAL_CLAIM_AUDIT.md';
const audit = readFileSync(auditPath, 'utf8');
const match = audit.match(/^Date:\s*(\d{4}-\d{2}-\d{2})$/m);
if (!match) throw new Error(`${auditPath} must declare a YYYY-MM-DD audit date.`);

const auditedAt = new Date(`${match[1]}T00:00:00Z`);
if (Number.isNaN(auditedAt.getTime())) throw new Error(`Invalid audit date: ${match[1]}`);
const ageDays = Math.floor((Date.now() - auditedAt.getTime()) / 86_400_000);
if (ageDays > MAX_AGE_DAYS) {
  throw new Error(`Factual claim audit is ${ageDays} days old (maximum ${MAX_AGE_DAYS}). Review and update ${auditPath}.`);
}

console.log(JSON.stringify({ status: 'healthy', auditPath, auditedAt: match[1], ageDays, maxAgeDays: MAX_AGE_DAYS }, null, 2));
