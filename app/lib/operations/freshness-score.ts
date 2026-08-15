export const FRESHNESS_TARGET_DAYS = {
  content: 3,
  factualAudit: 14,
  executionStatus: 14,
} as const;

type FreshnessAges = {
  contentAgeDays: number;
  factualAuditAgeDays: number;
  executionStatusAgeDays: number;
};

function railSlaScore(ageDays: number, targetDays: number): number {
  const safeAge = Math.max(0, ageDays);
  if (safeAge <= targetDays) return 100;
  return Math.max(0, Math.round((targetDays / safeAge) * 100));
}

/**
 * Measures compliance with the published freshness windows. All rails must be
 * within target for 100; the worst overdue rail determines the score so one
 * stale control cannot be hidden by averaging it with healthy controls.
 */
export function calculateFreshnessSlaScore(ages: FreshnessAges): number {
  return Math.min(
    railSlaScore(ages.contentAgeDays, FRESHNESS_TARGET_DAYS.content),
    railSlaScore(ages.factualAuditAgeDays, FRESHNESS_TARGET_DAYS.factualAudit),
    railSlaScore(ages.executionStatusAgeDays, FRESHNESS_TARGET_DAYS.executionStatus),
  );
}
