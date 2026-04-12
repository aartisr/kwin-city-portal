import { describe, expect, it } from 'vitest';
import { getPopularEntries, querySearchIndex } from '@/lib/search-index';

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
});
