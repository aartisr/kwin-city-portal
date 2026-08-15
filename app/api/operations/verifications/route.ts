import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/server/security';
import { parseVerificationSubmission } from '@/lib/operations/verification-schema';
import { recordVerification } from '@/lib/operations/verification-repository';
import { evaluateVerification } from '@/lib/operations/verification-policy';
import { EVIDENCE_NONCE_HEADER, EVIDENCE_SIGNATURE_HEADER, EVIDENCE_TIMESTAMP_HEADER, verifyEvidenceSignature } from '@/lib/operations/verification-signature';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;
const MAX_BODY_BYTES = 96 * 1024;

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(request, { scope: 'operations-evidence', limit: 30, windowMs: 60_000 });
  const headers = getRateLimitHeaders(rateLimit);
  if (rateLimit.limited) return NextResponse.json({ success: false, error: 'Rate limit exceeded.' }, { status: 429, headers });
  const length = Number(request.headers.get('content-length') ?? '0');
  if (length > MAX_BODY_BYTES) return NextResponse.json({ success: false, error: 'Payload too large.' }, { status: 413, headers });
  const body = await request.text();
  if (Buffer.byteLength(body) > MAX_BODY_BYTES) return NextResponse.json({ success: false, error: 'Payload too large.' }, { status: 413, headers });
  const secret = process.env.OPERATIONS_EVIDENCE_SECRET;
  if (!secret || secret.length < 24) return NextResponse.json({ success: false, error: 'Evidence recording is not configured.' }, { status: 503, headers });
  const authorized = verifyEvidenceSignature({
    secret, timestamp: request.headers.get(EVIDENCE_TIMESTAMP_HEADER), nonce: request.headers.get(EVIDENCE_NONCE_HEADER),
    signature: request.headers.get(EVIDENCE_SIGNATURE_HEADER), body,
  });
  if (!authorized) return NextResponse.json({ success: false, error: 'Unauthorized evidence request.' }, { status: 401, headers });
  try {
    const submission = parseVerificationSubmission(JSON.parse(body));
    const evaluation = evaluateVerification(submission);
    const result = await recordVerification(submission);
    return NextResponse.json({
      success: true, attemptId: result.attempt.id, outcome: result.attempt.outcome,
      qualified: result.attempt.qualified, rail: evaluation.rail, idempotent: result.idempotent,
    }, { headers: { ...headers, 'Cache-Control': 'no-store' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'invalid-evidence';
    const storageFailure = message.includes('storage') || message.includes('write-failed');
    return NextResponse.json({ success: false, error: storageFailure ? 'Evidence persistence failed.' : 'Invalid evidence payload.' }, { status: storageFailure ? 503 : 400, headers });
  }
}
