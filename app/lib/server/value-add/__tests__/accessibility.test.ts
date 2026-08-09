import { describe, expect, it } from 'vitest';
import { calculateAccessibility } from '@/lib/server/value-add/accessibility';

describe('value-add/accessibility', () => {
  it('returns projected and delta minutes when projection is enabled', () => {
    const { result, sourceIds } = calculateAccessibility({
      origin: 'KWIN City',
      destination: 'Bengaluru International Airport',
      mode: 'road',
      includeProjected: true,
    });

    expect(result.estimatedMinutes).toBeGreaterThan(0);
    expect(result.projectedMinutes).toBeDefined();
    expect(result.deltaMinutes).toBeGreaterThan(0);
    expect(sourceIds).toContain('strr');
  });

  it('omits projected fields when projection is disabled', () => {
    const { result } = calculateAccessibility({
      origin: 'KWIN City',
      mode: 'transit',
      includeProjected: false,
    });

    expect(result.projectedMinutes).toBeUndefined();
    expect(result.deltaMinutes).toBeUndefined();
    expect(result.assumptions.length).toBeGreaterThan(0);
  });
});
