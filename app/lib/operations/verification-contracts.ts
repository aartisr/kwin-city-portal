export const VERIFICATION_SUITES = ['content_refresh', 'factual_audit', 'execution_status'] as const;
export const VERIFICATION_OUTCOMES = ['passed', 'failed', 'partial', 'skipped', 'timed_out', 'indeterminate', 'cancelled'] as const;
export const FRESHNESS_RAILS = ['content', 'factual_audit', 'execution_status'] as const;

export type VerificationSuite = (typeof VERIFICATION_SUITES)[number];
export type VerificationOutcome = (typeof VERIFICATION_OUTCOMES)[number];
export type FreshnessRail = (typeof FRESHNESS_RAILS)[number];
export type VerificationProvider = 'github_actions' | 'vercel_cron' | 'manual' | 'local';
export type VerificationEnvironment = 'production' | 'preview' | 'ci' | 'development';

export type VerificationControl = {
  id: string;
  required: boolean;
  outcome: Exclude<VerificationOutcome, 'partial'>;
  summary?: string;
  durationMs?: number;
  metrics?: Record<string, string | number | boolean | null>;
};

export type VerificationSubmission = {
  idempotencyKey: string;
  suite: VerificationSuite;
  outcome: VerificationOutcome;
  policyVersion: string;
  startedAt: string;
  completedAt: string;
  commitSha?: string;
  environment: VerificationEnvironment;
  provider: VerificationProvider;
  providerRunId?: string;
  providerRunUrl?: string;
  trigger: 'schedule' | 'workflow_dispatch' | 'deployment' | 'retry' | 'manual' | 'request';
  controls: VerificationControl[];
  manifest?: Record<string, unknown>;
  failureCode?: string;
  failureSummary?: string;
};

export type VerificationReceipt = {
  attemptId: string;
  outcome: VerificationOutcome;
  qualified: boolean;
  rail: FreshnessRail;
  idempotent: boolean;
};

export type DurableRailEvidence = {
  rail: FreshnessRail;
  qualifiedAt: string;
  expiresAt: string;
  policyVersion: string;
  commitSha: string | null;
  provider: VerificationProvider;
  providerRunUrl: string | null;
};
