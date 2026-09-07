import crypto from 'crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createAlertSubscription,
  disableAlertSubscription,
} from '@/lib/server/data-layer/value-add-alerts';

const {
  mockGetSupabase,
  mockReadJsonFile,
  mockWriteJsonFile,
} = vi.hoisted(() => ({
  mockGetSupabase: vi.fn(),
  mockReadJsonFile: vi.fn(),
  mockWriteJsonFile: vi.fn(),
}));

vi.mock('@/lib/server/supabase-client', () => ({
  getSupabase: mockGetSupabase,
}));

vi.mock('@/lib/server/store', () => ({
  readJsonFile: mockReadJsonFile,
  writeJsonFile: mockWriteJsonFile,
}));

describe('server/data-layer value-add-alerts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('sub-1');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a subscription in Supabase when insert succeeds', async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });

    const response = await createAlertSubscription({
      email: 'reader@example.com',
      persona: 'investor',
      topics: ['risk', 'regulatory'],
      cadence: 'weekly',
      geofilters: ['north-bengaluru'],
    });

    expect(response).toEqual({ subscriptionId: 'sub-1', status: 'active' });
    expect(mockReadJsonFile).not.toHaveBeenCalled();
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to file storage when Supabase insert fails', async () => {
    const insert = vi.fn().mockResolvedValue({ error: { code: 'boom' } });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([]);

    const response = await createAlertSubscription({
      email: 'fallback@example.com',
      persona: 'researcher',
      topics: ['evidence'],
      cadence: 'daily',
    });

    expect(response).toEqual({ subscriptionId: 'sub-1', status: 'active' });
    expect(mockWriteJsonFile).toHaveBeenCalledWith(
      'value-add-alert-subscriptions.json',
      [expect.objectContaining({ id: 'sub-1', status: 'active', email: 'fallback@example.com' })],
    );
  });

  it('falls back to file storage when Supabase insert throws', async () => {
    const insert = vi.fn().mockRejectedValue(new Error('insert exploded'));
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([]);

    const response = await createAlertSubscription({
      email: 'throw@example.com',
      persona: 'resident',
      topics: ['timeline'],
      cadence: 'monthly',
    });

    expect(response).toEqual({ subscriptionId: 'sub-1', status: 'active' });
    expect(mockWriteJsonFile).toHaveBeenCalled();
  });

  it('disables an existing Supabase subscription', async () => {
    const single = vi.fn().mockResolvedValue({ data: { id: 'sub-1' }, error: null });
    const eqSelect = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq: eqSelect });
    const eqUpdate = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn().mockReturnValue({ eq: eqUpdate });
    const from = vi.fn().mockReturnValue({ select, update });
    mockGetSupabase.mockReturnValue({ from });

    const response = await disableAlertSubscription('sub-1');

    expect(response).toEqual({ subscriptionId: 'sub-1', status: 'inactive' });
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to file storage when Supabase update fails', async () => {
    const single = vi.fn().mockResolvedValue({ data: { id: 'sub-2' }, error: null });
    const eqSelect = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq: eqSelect });
    const eqUpdate = vi.fn().mockResolvedValue({ error: { code: 'update-failed' } });
    const update = vi.fn().mockReturnValue({ eq: eqUpdate });
    const from = vi.fn().mockReturnValue({ select, update });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'sub-2',
        email: 'reader@example.com',
        persona: 'resident',
        topics: ['timeline'],
        geofilters: [],
        cadence: 'weekly',
        status: 'active',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]);

    const response = await disableAlertSubscription('sub-2');

    expect(response).toEqual({ subscriptionId: 'sub-2', status: 'inactive' });
    expect(mockWriteJsonFile).toHaveBeenCalledWith(
      'value-add-alert-subscriptions.json',
      [expect.objectContaining({ id: 'sub-2', status: 'inactive' })],
    );
  });

  it('returns null when disable fallback cannot find a record', async () => {
    const single = vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } });
    const eqSelect = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq: eqSelect });
    const from = vi.fn().mockReturnValue({ select, update: vi.fn() });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([]);

    const response = await disableAlertSubscription('missing-sub');

    expect(response).toBeNull();
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back when Supabase disable fetch returns non-notfound error', async () => {
    const single = vi.fn().mockResolvedValue({ data: null, error: { code: 'permission-denied' } });
    const eqSelect = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq: eqSelect });
    const from = vi.fn().mockReturnValue({ select, update: vi.fn() });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'sub-x',
        email: 'x@example.com',
        persona: 'resident',
        topics: ['timeline'],
        geofilters: [],
        cadence: 'weekly',
        status: 'active',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]);

    const response = await disableAlertSubscription('sub-x');

    expect(response).toEqual({ subscriptionId: 'sub-x', status: 'inactive' });
    expect(mockWriteJsonFile).toHaveBeenCalled();
  });

  it('falls back when Supabase disable flow throws', async () => {
    const single = vi.fn().mockRejectedValue(new Error('select exploded'));
    const eqSelect = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq: eqSelect });
    const from = vi.fn().mockReturnValue({ select, update: vi.fn() });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'sub-throw',
        email: 'throw@example.com',
        persona: 'resident',
        topics: ['timeline'],
        geofilters: [],
        cadence: 'weekly',
        status: 'active',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]);

    const response = await disableAlertSubscription('sub-throw');

    expect(response).toEqual({ subscriptionId: 'sub-throw', status: 'inactive' });
    expect(mockWriteJsonFile).toHaveBeenCalled();
  });
});
