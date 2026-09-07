#!/usr/bin/env node

import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) throw new Error('DATABASE_URL must point to an isolated PostgreSQL test database.');

function psql(args, label) {
  const result = spawnSync('psql', [databaseUrl, '--set', 'ON_ERROR_STOP=1', '--no-psqlrc', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(`${label} failed.\n${result.stdout || ''}${result.stderr || ''}`.trim());
  }
  return result.stdout.trim();
}

psql(['--command', `
  DO $$ BEGIN CREATE ROLE anon NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN CREATE ROLE authenticated NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN CREATE ROLE service_role NOLOGIN BYPASSRLS; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
`], 'Supabase role bootstrap');

const directory = path.join(process.cwd(), 'supabase', 'migrations');
const migrations = readdirSync(directory).filter((name) => name.endsWith('.sql')).sort();

for (const pass of [1, 2]) {
  for (const migration of migrations) {
    psql(['--file', path.join(directory, migration)], `Migration ${migration} (pass ${pass})`);
  }
}

const scalar = (sql, label) => psql(['--tuples-only', '--no-align', '--command', sql], label).trim();
const idempotencyKey = `ci:migration-contract:${randomUUID()}`;
const completedAt = new Date();
const startedAt = new Date(completedAt.getTime() - 60_000).toISOString();
const completedAtIso = completedAt.toISOString();
const expiresAt = new Date(completedAt.getTime() + 14 * 86_400_000).toISOString();

const schemaResult = scalar(`
  SELECT CASE WHEN COUNT(*) = 3 THEN 'schema-ok' ELSE 'schema-missing' END
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name IN (
      'operational_verification_attempts',
      'operational_freshness_qualifications',
      'operational_scheduler_heartbeats'
    );
`, 'Schema contract');

const recordSql = `
  SELECT inserted::text
  FROM public.record_operational_verification(
    '${idempotencyKey}', repeat('a', 64), 'execution_status', 'passed', true,
    'ci-v1', '${startedAt}'::timestamptz, '${completedAtIso}'::timestamptz, repeat('b', 40), 'ci', 'github_actions',
    'migration-contract', 'https://github.com/example/repository/actions/runs/1', 'manual',
    '["migration-chain","rpc-execution"]'::jsonb, '{"contract":"database"}'::jsonb,
    repeat('c', 64), NULL, NULL, 'execution_status', '${expiresAt}'::timestamptz
  );
`;

const firstInsert = scalar(recordSql, 'Atomic RPC insert contract');
const replay = scalar(recordSql, 'Atomic RPC replay contract');
const verification = [schemaResult, firstInsert, replay];

const expected = ['schema-ok', 'true', 'false'];
if (verification.join(',') !== expected.join(',')) {
  throw new Error(`Unexpected database contract result: ${verification.join(', ')}; expected ${expected.join(', ')}.`);
}

console.log(`Applied ${migrations.length} migrations twice and verified the atomic evidence RPC.`);
