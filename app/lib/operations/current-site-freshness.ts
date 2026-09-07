import { getLatestSeoAgencyRun } from "@/lib/seo-agency/store";
import {
  getSiteFreshnessStatus,
  type SiteFreshnessStatus,
} from "./site-freshness";
import { getLatestDurableRailEvidence } from "./verification-repository";
import { FRESHNESS_TARGET_DAYS } from "./freshness-score";
import type { DurableRailEvidence, FreshnessRail } from "./verification-contracts";

const DAY_MS = 86_400_000;

function ageDays(isoDate: string): number {
  const timestamp = new Date(isoDate).getTime();
  return Number.isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : Math.max(0, Math.floor((Date.now() - timestamp) / DAY_MS));
}

function evidenceRecord(evidence: DurableRailEvidence, targetDays: number) {
  return {
    isoDate: evidence.qualifiedAt.slice(0, 10), ageDays: ageDays(evidence.qualifiedAt), targetDays,
    evidenceType: "durable-automated" as const, policyVersion: evidence.policyVersion,
    commitSha: evidence.commitSha, evidenceUrl: evidence.providerRunUrl,
  };
}

/**
 * Resolves the public freshness signal from durable operational evidence.
 * The checked-in content date remains a safe fallback when storage is empty or
 * unavailable, while a newer successful SEO run advances content freshness.
 */
export async function getCurrentSiteFreshnessStatus(): Promise<SiteFreshnessStatus> {
  let baseline: SiteFreshnessStatus;
  try {
    const latestRun = await getLatestSeoAgencyRun();
    baseline = getSiteFreshnessStatus(latestRun?.generatedAt);
  } catch {
    baseline = getSiteFreshnessStatus();
  }

  let evidence: Partial<Record<FreshnessRail, DurableRailEvidence>> | null = null;
  try { evidence = await getLatestDurableRailEvidence(); } catch { evidence = null; }
  const content = evidence?.content ? evidenceRecord(evidence.content, FRESHNESS_TARGET_DAYS.content) : { ...baseline.content, targetDays: FRESHNESS_TARGET_DAYS.content, evidenceType: "documentation-fallback" as const };
  const factualAudit = evidence?.factual_audit ? evidenceRecord(evidence.factual_audit, FRESHNESS_TARGET_DAYS.factualAudit) : { ...baseline.factualAudit, targetDays: FRESHNESS_TARGET_DAYS.factualAudit, evidenceType: "documentation-fallback" as const };
  const executionStatus = evidence?.execution_status ? evidenceRecord(evidence.execution_status, FRESHNESS_TARGET_DAYS.executionStatus) : { ...baseline.executionStatus, targetDays: FRESHNESS_TARGET_DAYS.executionStatus, evidenceType: "documentation-fallback" as const };
  const count = [evidence?.content, evidence?.factual_audit, evidence?.execution_status].filter(Boolean).length;
  const telemetryAvailable = count === 3;
  return {
    degraded: !telemetryAvailable || content.ageDays > FRESHNESS_TARGET_DAYS.content || factualAudit.ageDays > FRESHNESS_TARGET_DAYS.factualAudit || executionStatus.ageDays > FRESHNESS_TARGET_DAYS.executionStatus,
    telemetryAvailable,
    telemetryMode: count === 3 ? "durable" : count > 0 ? "hybrid" : "documentation-fallback",
    content, factualAudit, executionStatus,
  };
}
