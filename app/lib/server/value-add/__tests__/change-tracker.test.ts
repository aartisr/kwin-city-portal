import { describe, expect, it } from 'vitest';
import { getChangeTimeline, normalizeLimit } from '@/lib/server/value-add/change-tracker';

describe('value-add/change-tracker', () => {
  it('normalizes limits to safe bounded values', () => {
    expect(normalizeLimit(null)).toBe(10);
    expect(normalizeLimit('0')).toBe(10);
    expect(normalizeLimit('200')).toBe(50);
    expect(normalizeLimit('7')).toBe(7);
  });

  it('returns bounded timeline events sorted by recency', () => {
    const { result, sourceIds } = getChangeTimeline(3);

    expect(result.total).toBe(3);
    expect(result.events).toHaveLength(3);
    expect(result.events[0].date >= result.events[1].date).toBe(true);
    expect(result.events[1].date >= result.events[2].date).toBe(true);
    expect(sourceIds).toEqual(['brief', 'kiadb']);
    expect(typeof result.asOf).toBe('string');
  });
});
