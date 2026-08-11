import { readFileSync } from 'node:fs';
import { SITE_CONFIG } from '@/config/site.config';

const DAY_MS = 86_400_000;
const CONTENT_WARN_DAYS = 3;
const AUDIT_WARN_DAYS = 14;
const EXECUTION_WARN_DAYS = 14;

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
  return Math.floor((Date.now() - timestamp) / DAY_MS);
}

function readDatedField(path: string, matcher: RegExp): FreshnessRecord {
  const content = readFileSync(path, 'utf8');
  const match = content.match(matcher);
  if (!match) {
    throw new Error(`${path} must declare a YYYY-MM-DD date.`);
  }

  const isoDate = match[1];
  return {
    isoDate,
    ageDays: getAgeDays(parseDate(isoDate, path)),
  };
}

export function getSiteFreshnessStatus(): SiteFreshnessStatus {
  const content = {
    isoDate: SITE_CONFIG.lastUpdatedISO,
    ageDays: getAgeDays(parseDate(SITE_CONFIG.lastUpdatedISO, 'SITE_CONFIG.lastUpdatedISO')),
  };
  const factualAudit = readDatedField('docs/FACTUAL_CLAIM_AUDIT.md', /^Date:\s*(\d{4}-\d{2}-\d{2})$/m);
  const executionStatus = readDatedField('docs/KWIN_VALUE_ADD_EXECUTION_STATUS.md', /^-\s*Date:\s*(\d{4}-\d{2}-\d{2})$/m);

  const degraded = content.ageDays > CONTENT_WARN_DAYS
    || factualAudit.ageDays > AUDIT_WARN_DAYS
    || executionStatus.ageDays > EXECUTION_WARN_DAYS;

  return {
    degraded,
    content,
    factualAudit,
    executionStatus,
  };
}
