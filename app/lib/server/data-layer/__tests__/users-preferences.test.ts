import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createUser, findUserByEmail, findUserById } from '@/lib/server/data-layer/users';
import { getPreferences, setPreferences } from '@/lib/server/data-layer/preferences';
import type { UserPreference, UserRecord } from '@/lib/server/models';

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

describe('server/data-layer users and preferences', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('maps Supabase user rows into app records', async () => {
    const single = vi.fn().mockResolvedValue({
      data: {
        id: 'user-1',
        name: 'Aarti',
        email: 'aarti@example.com',
        password_hash: 'hash',
        password_salt: 'salt',
        created_at: '2026-04-22T00:00:00.000Z',
      },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });

    const user = await findUserByEmail('aarti@example.com');

    expect(from).toHaveBeenCalledWith('users');
    expect(user).toEqual({
      id: 'user-1',
      name: 'Aarti',
      email: 'aarti@example.com',
      passwordHash: 'hash',
      passwordSalt: 'salt',
      createdAt: '2026-04-22T00:00:00.000Z',
    });
  });

  it('falls back to file storage when creating a user without Supabase', async () => {
    const user: UserRecord = {
      id: 'user-2',
      name: 'Ravi',
      email: 'ravi@example.com',
      passwordHash: 'hash',
      passwordSalt: 'salt',
      createdAt: '2026-04-22T00:00:00.000Z',
    };

    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([]);

    await createUser(user);

    expect(mockReadJsonFile).toHaveBeenCalledWith('users.json', []);
    expect(mockWriteJsonFile).toHaveBeenCalledWith('users.json', [user]);
  });

  it('falls back to file lookup when Supabase returns no matching user', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' },
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'user-3',
        name: 'Fallback Ravi',
        email: 'fallback@example.com',
        passwordHash: 'hash',
        passwordSalt: 'salt',
        createdAt: '2026-04-22T00:00:00.000Z',
      },
    ]);

    const user = await findUserByEmail('fallback@example.com');

    expect(user?.email).toBe('fallback@example.com');
  });

  it('falls back to file lookup when Supabase email lookup returns an unexpected error', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: { code: 'unexpected-error' },
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'user-3b',
        name: 'Logged Error User',
        email: 'logged@example.com',
        passwordHash: 'hash',
        passwordSalt: 'salt',
        createdAt: '2026-04-22T00:00:00.000Z',
      },
    ]);

    const user = await findUserByEmail('logged@example.com');

    expect(user?.name).toBe('Logged Error User');
  });

  it('finds users by id through fallback storage', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'user-4',
        name: 'ById User',
        email: 'id@example.com',
        passwordHash: 'hash',
        passwordSalt: 'salt',
        createdAt: '2026-04-22T00:00:00.000Z',
      },
    ]);

    const user = await findUserById('user-4');

    expect(user?.name).toBe('ById User');
  });

  it('maps Supabase id lookups when a row exists', async () => {
    const single = vi.fn().mockResolvedValue({
      data: {
        id: 'user-6',
        name: 'Lookup User',
        email: 'lookup@example.com',
        password_hash: 'hash',
        password_salt: 'salt',
        created_at: '2026-04-22T00:00:00.000Z',
      },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });

    const user = await findUserById('user-6');

    expect(user?.email).toBe('lookup@example.com');
  });

  it('falls back to file id lookup when Supabase returns an unexpected error', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: { code: 'unexpected-error' },
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'user-6b',
        name: 'Id Fallback User',
        email: 'id-fallback@example.com',
        passwordHash: 'hash',
        passwordSalt: 'salt',
        createdAt: '2026-04-22T00:00:00.000Z',
      },
    ]);

    const user = await findUserById('user-6b');

    expect(user?.email).toBe('id-fallback@example.com');
  });

  it('does not write fallback storage when Supabase user creation succeeds', async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });

    await createUser({
      id: 'user-5',
      name: 'Supabase User',
      email: 'supabase@example.com',
      passwordHash: 'hash',
      passwordSalt: 'salt',
      createdAt: '2026-04-22T00:00:00.000Z',
    });

    expect(mockReadJsonFile).not.toHaveBeenCalled();
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to file storage when Supabase createUser returns an error', async () => {
    const insert = vi.fn().mockResolvedValue({ error: new Error('insert failed') });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([]);

    await createUser({
      id: 'user-7',
      name: 'Fallback create',
      email: 'fallback-create@example.com',
      passwordHash: 'hash',
      passwordSalt: 'salt',
      createdAt: '2026-04-22T00:00:00.000Z',
    });

    expect(mockWriteJsonFile).toHaveBeenCalled();
  });

  it('maps Supabase preference rows into UI preferences', async () => {
    const single = vi.fn().mockResolvedValue({
      data: {
        email: 'aarti@example.com',
        persona: 'researcher',
        favorite_topics: ['evidence', 'timeline'],
        digest_frequency: 'monthly',
        email_updates: false,
      },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });

    const preferences = await getPreferences('aarti@example.com');

    expect(preferences).toEqual({
      persona: 'researcher',
      favoriteTopics: ['evidence', 'timeline'],
      digestFrequency: 'monthly',
      emailUpdates: false,
    });
  });

  it('maps missing Supabase favorite topics to an empty list', async () => {
    const single = vi.fn().mockResolvedValue({
      data: {
        email: 'empty-topics@example.com',
        persona: 'researcher',
        favorite_topics: null,
        digest_frequency: 'monthly',
        email_updates: true,
      },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });

    const preferences = await getPreferences('empty-topics@example.com');

    expect(preferences).toEqual({
      persona: 'researcher',
      favoriteTopics: [],
      digestFrequency: 'monthly',
      emailUpdates: true,
    });
  });

  it('persists preferences to fallback storage when Supabase is unavailable', async () => {
    const preferences: UserPreference = {
      persona: 'investor',
      favoriteTopics: ['timeline', 'sectors'],
      digestFrequency: 'weekly',
      emailUpdates: true,
    };

    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue({});

    await setPreferences('ravi@example.com', preferences);

    expect(mockWriteJsonFile).toHaveBeenCalledWith('preferences.json', {
      'ravi@example.com': preferences,
    });
  });

  it('returns fallback preferences when Supabase is unavailable', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue({
      'ravi@example.com': {
        persona: 'resident',
        favoriteTopics: ['timeline'],
        digestFrequency: 'weekly',
        emailUpdates: true,
      },
    });

    const preferences = await getPreferences('ravi@example.com');

    expect(preferences?.persona).toBe('resident');
  });

  it('falls back to file preferences when Supabase returns an unexpected read error', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: { code: 'unexpected-error' },
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue({
      'fallback@example.com': {
        persona: 'journalist',
        favoriteTopics: ['evidence'],
        digestFrequency: 'daily',
        emailUpdates: false,
      },
    });

    const preferences = await getPreferences('fallback@example.com');

    expect(preferences?.persona).toBe('journalist');
  });

  it('returns null when no fallback preferences exist', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue({});

    const preferences = await getPreferences('missing@example.com');

    expect(preferences).toBeNull();
  });

  it('updates existing Supabase preferences without touching fallback storage', async () => {
    const single = vi.fn().mockResolvedValue({
      data: { id: 'pref-1' },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const updateEq = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn().mockReturnValue({ eq: updateEq });
    const from = vi.fn(() => ({ select, update, insert: vi.fn() }));
    mockGetSupabase.mockReturnValue({ from });

    await setPreferences('aarti@example.com', {
      persona: 'journalist',
      favoriteTopics: ['evidence'],
      digestFrequency: 'daily',
      emailUpdates: false,
    });

    expect(update).toHaveBeenCalled();
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('inserts Supabase preferences when none exist yet', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' },
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn(() => ({ select, update: vi.fn(), insert }));
    mockGetSupabase.mockReturnValue({ from });

    await setPreferences('new@example.com', {
      persona: 'investor',
      favoriteTopics: ['sectors'],
      digestFrequency: 'monthly',
      emailUpdates: true,
    });

    expect(insert).toHaveBeenCalled();
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('still inserts Supabase preferences after an unexpected existence-check error', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: { code: 'unexpected-error' },
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn(() => ({ select, update: vi.fn(), insert }));
    mockGetSupabase.mockReturnValue({ from });

    await setPreferences('recover@example.com', {
      persona: 'investor',
      favoriteTopics: ['evidence'],
      digestFrequency: 'monthly',
      emailUpdates: true,
    });

    expect(insert).toHaveBeenCalled();
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to file storage when Supabase preference update fails', async () => {
    const single = vi.fn().mockResolvedValue({
      data: { id: 'pref-2' },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const updateEq = vi.fn().mockResolvedValue({ error: new Error('update failed') });
    const update = vi.fn().mockReturnValue({ eq: updateEq });
    const from = vi.fn(() => ({ select, update, insert: vi.fn() }));
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue({});

    const preferences: UserPreference = {
      persona: 'resident',
      favoriteTopics: ['timeline'],
      digestFrequency: 'weekly',
      emailUpdates: true,
    };

    await setPreferences('fallback-update@example.com', preferences);

    expect(mockWriteJsonFile).toHaveBeenCalledWith('preferences.json', {
      'fallback-update@example.com': preferences,
    });
  });

  it('falls back to file storage when Supabase preference insert fails', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' },
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const insert = vi.fn().mockResolvedValue({ error: new Error('insert failed') });
    const from = vi.fn(() => ({ select, update: vi.fn(), insert }));
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue({});

    const preferences: UserPreference = {
      persona: 'analyst',
      favoriteTopics: ['evidence'],
      digestFrequency: 'daily',
      emailUpdates: false,
    };

    await setPreferences('fallback-insert@example.com', preferences);

    expect(mockWriteJsonFile).toHaveBeenCalledWith('preferences.json', {
      'fallback-insert@example.com': preferences,
    });
  });
});
