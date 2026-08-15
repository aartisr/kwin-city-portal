// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { scoreRegionalPriority } from '../regional-relevance';

describe('regional priority scoring', () => {
  it('strongly scores headlines spanning the three strategic domains', () => {
    const result = scoreRegionalPriority(
      'Karnataka approves Bengaluru infrastructure investment policy',
      'The plan includes a new transit corridor.',
    );

    expect(result.score).toBe(100);
    expect(result.reasons).toHaveLength(3);
  });

  it('keeps general regional news available without a strategic boost', () => {
    const result = scoreRegionalPriority(
      'Bengaluru cultural festival returns this weekend',
      'Artists will perform across the city.',
    );

    expect(result).toEqual({ score: 0, reasons: [] });
  });

  it('weights a title match more strongly than a body-only mention', () => {
    const titleMatch = scoreRegionalPriority(
      'New Bengaluru metro corridor approved',
      'City update',
    );
    const bodyMatch = scoreRegionalPriority(
      'Bengaluru development update',
      'The metro corridor was approved.',
    );

    expect(titleMatch.score).toBeGreaterThan(bodyMatch.score);
  });
});
