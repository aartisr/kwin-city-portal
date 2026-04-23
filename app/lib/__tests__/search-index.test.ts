import { describe, expect, it } from 'vitest';
import { CATEGORY_COLORS, getPopularEntries, querySearchIndex } from '@/lib/search-index';

describe('search-index', () => {
  it('returns relevant results for common queries', () => {
    const results = querySearchIndex('kwin', 10);

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((entry) => entry.href === '/')).toBe(true);
  });

  it('respects requested limits', () => {
    const results = querySearchIndex('a', 5);
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it('exposes a stable curated popular list', () => {
    const popular = getPopularEntries();

    expect(popular.length).toBeGreaterThan(0);
    expect(popular.length).toBeLessThanOrEqual(8);
  });

  it('prioritizes exact title hits over weaker matches', () => {
    const results = querySearchIndex('About KWIN City', 5);

    expect(results[0]?.title).toBe('About KWIN City');
    expect(results[0]?.href).toBe('/about');
  });

  it('keeps category color tokens available for every rendered badge', () => {
    expect(CATEGORY_COLORS.Page).toContain('bg-');
    expect(CATEGORY_COLORS.Timeline).toContain('text-');
    expect(CATEGORY_COLORS.Data).toContain('border-');
  });
});
