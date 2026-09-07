// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { calculateFreshnessSlaScore } from '../freshness-score';

describe('freshness SLA score', () => {
  it('is 100 only when every rail is within its published target', () => {
    expect(calculateFreshnessSlaScore({
      contentAgeDays: 3,
      factualAuditAgeDays: 14,
      executionStatusAgeDays: 14,
    })).toBe(100);
  });

  it('uses the worst overdue rail instead of averaging degradation away', () => {
    expect(calculateFreshnessSlaScore({
      contentAgeDays: 6,
      factualAuditAgeDays: 15,
      executionStatusAgeDays: 7,
    })).toBe(50);
  });

  it('reports the current 0d, 6d, and 7d evidence as fully within SLA', () => {
    expect(calculateFreshnessSlaScore({
      contentAgeDays: 0,
      factualAuditAgeDays: 6,
      executionStatusAgeDays: 7,
    })).toBe(100);
  });
});
