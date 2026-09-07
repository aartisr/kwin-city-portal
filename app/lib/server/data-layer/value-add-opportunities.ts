import crypto from 'crypto';
import { readJsonFile, writeJsonFile } from '../store';
import { getSupabaseAdmin } from '../supabase-client';
import type { OpportunityLead, OpportunityRequest } from '@/types/value-add';

const STORE_FILE = 'value-add-opportunity-leads.json';

type OpportunityLeadRow = {
  id: string;
  role: OpportunityLead['role'];
  requirement: string;
  budget_band: string | null;
  created_at: string;
  status: OpportunityLead['status'];
};

type SupabaseErrorLike = { code?: string } | null;

type OpportunityLeadsTableClient = {
  insert: (values: unknown[]) => Promise<{ error: SupabaseErrorLike }>;
  select: (columns: string) => {
    order: (column: string, options: { ascending: boolean }) => {
      limit: (count: number) => Promise<{ data: OpportunityLeadRow[] | null; error: SupabaseErrorLike }>;
    };
  };
};

type OpportunitiesSupabaseLooseClient = {
  from: (table: 'value_add_opportunity_leads') => OpportunityLeadsTableClient;
};

export async function createOpportunityLeadRecord(input: OpportunityRequest): Promise<OpportunityLead> {
  const lead: OpportunityLead = {
    id: crypto.randomUUID(),
    role: input.role,
    requirement: input.requirement,
    budgetBand: input.budgetBand,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  // Opportunity submissions contain private contact details. RLS intentionally
  // denies browser/anon access; the API is the sole writer and uses the
  // server-only service-role client after origin, rate-limit, and CSRF checks.
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const client = supabase as unknown as OpportunitiesSupabaseLooseClient;
      const payload = {
        id: lead.id,
        name: input.name,
        email: input.email,
        role: lead.role,
        requirement: lead.requirement,
        budget_band: lead.budgetBand ?? null,
        status: lead.status,
        created_at: lead.createdAt,
      };

      const { error } = await client.from('value_add_opportunity_leads').insert([payload]);
      if (!error) {
        return lead;
      }

      console.error('Supabase createOpportunityLeadRecord error:', error);
    } catch (error) {
      console.error('Supabase createOpportunityLeadRecord exception:', error);
    }
  }

  const leads = await readJsonFile<OpportunityLead[]>(STORE_FILE, []);
  leads.push(lead);
  await writeJsonFile(STORE_FILE, leads);
  return lead;
}

export async function listOpportunityLeadRecords(limit: number): Promise<OpportunityLead[]> {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 100) : 20;

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const client = supabase as unknown as OpportunitiesSupabaseLooseClient;
      const { data, error } = await client
        .from('value_add_opportunity_leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(normalizedLimit);

      if (!error && Array.isArray(data)) {
        return data.map((row) => ({
          id: row.id,
          role: row.role,
          requirement: row.requirement,
          budgetBand: row.budget_band ?? undefined,
          createdAt: row.created_at,
          status: row.status,
        }));
      }

      if (error) {
        console.error('Supabase listOpportunityLeadRecords error:', error);
      }
    } catch (error) {
      console.error('Supabase listOpportunityLeadRecords exception:', error);
    }
  }

  const leads = await readJsonFile<OpportunityLead[]>(STORE_FILE, []);
  return leads
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, normalizedLimit);
}
