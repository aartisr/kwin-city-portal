import type { VerificationSubmission } from './verification-contracts';
import { sha256Fingerprint } from './verification-fingerprint';
import { evaluateVerification, qualificationExpiry } from './verification-policy';

export function buildVerificationRecord(submission: VerificationSubmission) {
  const evaluation = evaluateVerification(submission);
  const manifest = { ...(submission.manifest ?? {}), qualificationReasons: evaluation.reasons };
  return {
    evaluation,
    manifest,
    manifestSha256: sha256Fingerprint(manifest),
    requestSha256: sha256Fingerprint(submission),
    expiresAt: qualificationExpiry(evaluation.rail, submission.completedAt),
  };
}
