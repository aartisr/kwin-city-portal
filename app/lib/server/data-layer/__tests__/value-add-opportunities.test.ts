import crypto from 'crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createOpportunityLeadRecord,
  listOpportunityLeadRecords,
} from '@/lib/server/data-layer/value-add-opportunities';

const {
  mockGetSupabaseAdmin,
  mockReadJsonFile,
  mockWriteJsonFile,
} = vi.hoisted(() => ({
  mockGetSupabaseAdmin: vi.fn(),
  mockReadJsonFile: vi.fn(),
  mockWriteJsonFile: vi.fn(),
}));

vi.mock('@/lib/server/supabase-client', () => ({
  getSupabaseAdmin: mockGetSupabaseAdmin,
}));

vi.mock('@/lib/server/store', () => ({
  readJsonFile: mockReadJsonFile,
  writeJsonFile: mockWriteJsonFile,
}));

describe('server/data-layer value-add-opportunities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-01T00:00:00.000Z'));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('lead-1');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('creates lead records in Supabase when insert succeeds', async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabaseAdmin.mockReturnValue({ from });

    const lead = await createOpportunityLeadRecord({
      name: 'Aarti',
      email: 'aarti@example.com',
      role: 'investor',
      requirement: 'Industrial parcel near airport',
      budgetBand: '10-50cr',
    });

    expect(lead).toEqual({
      id: 'lead-1',
      role: 'investor',
      requirement: 'Industrial parcel near airport',
      budgetBand: '10-50cr',
      createdAt: '2026-06-01T00:00:00.000Z',
      status: 'new',
    });
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to file storage when Supabase insert fails', async () => {
    const insert = vi.fn().mockResolvedValue({ error: { code: 'insert-failed' } });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabaseAdmin.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([]);

    const lead = await createOpportunityLeadRecord({
      name: 'Fallback',
      email: 'fallback@example.com',
      role: 'operator',
      requirement: 'Warehouse parcel',
    });

    expect(lead.id).toBe('lead-1');
    expect(mockWriteJsonFile).toHaveBeenCalledWith(
      'value-add-opportunity-leads.json',
      [expect.objectContaining({ id: 'lead-1', role: 'operator' })],
    );
  });

  it('falls back to file storage when Supabase insert throws', async () => {
    const insert = vi.fn().mockRejectedValue(new Error('insert exploded'));
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabaseAdmin.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([]);

    const lead = await createOpportunityLeadRecord({
      name: 'Throw',
      email: 'throw@example.com',
      role: 'developer',
      requirement: 'Highway-adjacent logistics zone',
    });

    expect(lead.id).toBe('lead-1');
    expect(mockWriteJsonFile).toHaveBeenCalled();
  });

  it('lists and maps Supabase rows using normalized limit', async () => {
    const limit = vi.fn().mockResolvedValue({
      data: [
        {
          id: 'lead-2',
          role: 'developer',
          requirement: 'Mixed-use zone',
          budget_band: null,
          created_at: '2026-05-31T12:00:00.000Z',
          status: 'new',
        },
      ],
      error: null,
    });
    const order = vi.fn().mockReturnValue({ limit });
    const select = vi.fn().mockReturnValue({ order });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabaseAdmin.mockReturnValue({ from });

    const leads = await listOpportunityLeadRecords(Number.NaN);

    expect(limit).toHaveBeenCalledWith(20);
    expect(leads).toEqual([
      {
        id: 'lead-2',
        role: 'developer',
        requirement: 'Mixed-use zone',
        budgetBand: undefined,
        createdAt: '2026-05-31T12:00:00.000Z',
        status: 'new',
      },
    ]);
  });

  it('falls back to sorted local leads when Supabase read errors', async () => {
    const limit = vi.fn().mockResolvedValue({ data: null, error: { code: 'read-failed' } });
    const order = vi.fn().mockReturnValue({ limit });
    const select = vi.fn().mockReturnValue({ order });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabaseAdmin.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'lead-old',
        role: 'investor',
        requirement: 'Old requirement',
        budgetBand: '5-10cr',
        createdAt: '2026-05-01T00:00:00.000Z',
        status: 'new',
      },
      {
        id: 'lead-new',
        role: 'operator',
        requirement: 'New requirement',
        budgetBand: '10-50cr',
        createdAt: '2026-05-20T00:00:00.000Z',
        status: 'new',
      },
    ]);

    const leads = await listOpportunityLeadRecords(1);

    expect(leads).toEqual([
      expect.objectContaining({ id: 'lead-new' }),
    ]);
  });

  it('caps requested limit to 100 for fallback reads', async () => {
    mockGetSupabaseAdmin.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue(
      Array.from({ length: 120 }, (_, index) => ({
        id: `lead-${index + 1}`,
        role: 'investor',
        requirement: `Requirement ${index + 1}`,
        createdAt: `2026-05-${String((index % 28) + 1).padStart(2, '0')}T00:00:00.000Z`,
        status: 'new',
      })),
    );

    const leads = await listOpportunityLeadRecords(999);

    expect(leads).toHaveLength(100);
  });

  it('falls back to local listing when Supabase list throws', async () => {
    const limit = vi.fn().mockRejectedValue(new Error('list exploded'));
    const order = vi.fn().mockReturnValue({ limit });
    const select = vi.fn().mockReturnValue({ order });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabaseAdmin.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'lead-fallback-1',
        role: 'investor',
        requirement: 'Lead one',
        createdAt: '2026-05-21T00:00:00.000Z',
        status: 'new',
      },
      {
        id: 'lead-fallback-2',
        role: 'developer',
        requirement: 'Lead two',
        createdAt: '2026-05-22T00:00:00.000Z',
        status: 'new',
      },
    ]);

    const leads = await listOpportunityLeadRecords(2);

    expect(leads.map((lead) => lead.id)).toEqual(['lead-fallback-2', 'lead-fallback-1']);
  });
});
