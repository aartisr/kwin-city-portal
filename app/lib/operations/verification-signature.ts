import { createHmac, timingSafeEqual } from 'node:crypto';

export const EVIDENCE_TIMESTAMP_HEADER = 'x-kwin-evidence-timestamp';
export const EVIDENCE_NONCE_HEADER = 'x-kwin-evidence-nonce';
export const EVIDENCE_SIGNATURE_HEADER = 'x-kwin-evidence-signature';
const MAX_CLOCK_SKEW_MS = 5 * 60_000;

export function signEvidencePayload(secret: string, timestamp: string, nonce: string, body: string): string {
  return createHmac('sha256', secret).update(`${timestamp}.${nonce}.${body}`).digest('hex');
}

export function verifyEvidenceSignature(args: { secret: string; timestamp: string | null; nonce: string | null; signature: string | null; body: string; now?: number }): boolean {
  if (!args.timestamp || !args.nonce || !args.signature || !/^[a-zA-Z0-9_-]{16,120}$/.test(args.nonce)) return false;
  const timestamp = Number(args.timestamp);
  if (!Number.isFinite(timestamp) || Math.abs((args.now ?? Date.now()) - timestamp) > MAX_CLOCK_SKEW_MS) return false;
  const expected = Buffer.from(signEvidencePayload(args.secret, args.timestamp, args.nonce, args.body));
  const received = Buffer.from(args.signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}
