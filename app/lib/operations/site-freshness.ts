import { readFileSync } from "node:fs";
import { SITE_CONFIG } from "@/config/site.config";

const DAY_MS = 86_400_000;
const CONTENT_WARN_DAYS = 3;
const AUDIT_WARN_DAYS = 14;
const EXECUTION_WARN_DAYS = 14;
// These values mirror the checked-in operational records below. Vercel server
// functions do not reliably ship repository documentation files, so they keep
// the freshness signal available when those files are absent at runtime.
const FACTUAL_AUDIT_FALLBACK_DATE = "2026-08-09";
const EXECUTION_STATUS_FALLBACK_DATE = "2026-08-08";

type FreshnessRecord = {
  isoDate: string;
  ageDays: number;
};

export type SiteFreshnessStatus = {
  degraded: boolean;
  content: FreshnessRecord;
  factualAudit: FreshnessRecord;
  executionStatus: FreshnessRecord;
};

function parseDate(isoDate: string, source: string) {
  const timestamp = new Date(`${isoDate}T00:00:00Z`).getTime();
  if (Number.isNaN(timestamp)) {
    throw new Error(`Invalid YYYY-MM-DD date for ${source}: ${isoDate}`);
  }
  return timestamp;
}

function getAgeDays(timestamp: number) {
  return Math.max(0, Math.floor((Date.now() - timestamp) / DAY_MS));
}

function toFreshnessRecord(isoDate: string, source: string): FreshnessRecord {
  return {
    isoDate,
    ageDays: getAgeDays(parseDate(isoDate, source)),
  };
}

function readDatedField(
  path: string,
  matcher: RegExp,
  fallbackDate: string,
): FreshnessRecord {
  try {
    const content = readFileSync(path, "utf8");
    const match = content.match(matcher);
    if (!match) {
      throw new Error(`${path} must declare a YYYY-MM-DD date.`);
    }

    return toFreshnessRecord(match[1], path);
  } catch (error) {
    // Freshness telemetry must never turn a missing, untraced documentation
    // file in a serverless runtime into a site-wide rendering failure.
    console.warn(
      `Using embedded freshness baseline for ${path}: ${error instanceof Error ? error.message : String(error)}`,
    );
    return toFreshnessRecord(fallbackDate, `${path} fallback`);
  }
}

function newestContentDate(operationalRefreshAt?: string | null): string {
  if (!operationalRefreshAt) return SITE_CONFIG.lastUpdatedISO;
  const timestamp = new Date(operationalRefreshAt).getTime();
  if (Number.isNaN(timestamp)) return SITE_CONFIG.lastUpdatedISO;
  const operationalDate = new Date(timestamp).toISOString().slice(0, 10);
  return operationalDate > SITE_CONFIG.lastUpdatedISO
    ? operationalDate
    : SITE_CONFIG.lastUpdatedISO;
}

export function getSiteFreshnessStatus(
  operationalRefreshAt?: string | null,
): SiteFreshnessStatus {
  const contentDate = newestContentDate(operationalRefreshAt);
  const content = {
    isoDate: contentDate,
    ageDays: getAgeDays(parseDate(contentDate, "content freshness")),
  };
  const factualAudit = readDatedField(
    "docs/FACTUAL_CLAIM_AUDIT.md",
    /^Date:\s*(\d{4}-\d{2}-\d{2})$/m,
    FACTUAL_AUDIT_FALLBACK_DATE,
  );
  const executionStatus = readDatedField(
    "docs/KWIN_VALUE_ADD_EXECUTION_STATUS.md",
    /^-\s*Date:\s*(\d{4}-\d{2}-\d{2})$/m,
    EXECUTION_STATUS_FALLBACK_DATE,
  );

  const degraded =
    content.ageDays > CONTENT_WARN_DAYS ||
    factualAudit.ageDays > AUDIT_WARN_DAYS ||
    executionStatus.ageDays > EXECUTION_WARN_DAYS;

  return {
    degraded,
    content,
    factualAudit,
    executionStatus,
  };
}
