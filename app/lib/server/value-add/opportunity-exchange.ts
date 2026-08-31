import { createOpportunityLeadRecord, listOpportunityLeadRecords } from '@/lib/server/data-layer';
import type { OpportunityExchangeResponse, OpportunityLead, OpportunityRequest } from '@/types/value-add';

export async function createOpportunityLead(input: OpportunityRequest): Promise<OpportunityLead> {
  return createOpportunityLeadRecord(input);
}

export async function listOpportunityLeads(limit: number): Promise<OpportunityExchangeResponse> {
  const leads = await listOpportunityLeadRecords(limit);
  return { leads };
}

export function normalizeLeadLimit(input: string | null): number {
  const parsed = Number.parseInt(input ?? '', 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 20;
  }

  return Math.min(parsed, 100);
}

export function isValidOpportunityRole(value: string): value is OpportunityRequest['role'] {
  return (
    value === 'landowner' ||
    value === 'developer' ||
    value === 'investor' ||
    value === 'institution' ||
    value === 'operator'
  );
}
