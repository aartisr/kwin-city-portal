// @vitest-environment node

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('atomic operational evidence migration', () => {
  const sql = readFileSync('supabase/migrations/0005_atomic_operational_evidence_recording.sql', 'utf8');
  const ambiguityFix = readFileSync('supabase/migrations/0006_fix_operational_evidence_rpc_ambiguity.sql', 'utf8');

  it('records attempts and qualifications inside one security-definer transaction', () => {
    expect(sql).toMatch(/CREATE OR REPLACE FUNCTION public\.record_operational_verification/);
    expect(sql).toMatch(/SECURITY DEFINER/);
    expect(sql).toMatch(/INSERT INTO public\.operational_verification_attempts/);
    expect(sql).toMatch(/INSERT INTO public\.operational_freshness_qualifications/);
  });

  it('fails conflicting idempotency payloads and heals identical retries', () => {
    expect(sql).toContain('idempotency-key-payload-conflict');
    expect(ambiguityFix).toMatch(/ON CONFLICT DO NOTHING/);
    expect(ambiguityFix).not.toMatch(/ON CONFLICT \(rail, attempt_id\)/);
    expect(sql).toMatch(/COALESCE\(request_sha256, manifest_sha256\)/);
  });

  it('keeps the RPC service-role-only', () => {
    expect(sql).toMatch(/REVOKE ALL ON FUNCTION[\s\S]*FROM PUBLIC, anon, authenticated/);
    expect(sql).toMatch(/GRANT EXECUTE ON FUNCTION[\s\S]*TO service_role/);
  });
});
