import { describe, expect, it } from 'vitest';
import { getUpdateBySlug, getUpdateEntries, getUpdatePath, getUpdateUrl } from '@/lib/updates/content';

describe('updates/content', () => {
  it('returns entries in descending date order', () => {
    const entries = getUpdateEntries();
    const dates = entries.map((entry) => new Date(entry.date).getTime());

    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  it('builds stable canonical paths and URLs', () => {
    expect(getUpdatePath('update-2024-12-kiadb-approvals')).toBe('/updates/update-2024-12-kiadb-approvals');
    expect(getUpdateUrl('update-2024-12-kiadb-approvals')).toBe(
      'https://kwin-city.com/updates/update-2024-12-kiadb-approvals',
    );
  });

  it('finds an update by slug and returns null for unknown entries', () => {
    expect(getUpdateBySlug('update-2024-12-kiadb-approvals')?.title).toContain('KIADB approvals');
    expect(getUpdateBySlug('missing-update')).toBeNull();
  });
});
