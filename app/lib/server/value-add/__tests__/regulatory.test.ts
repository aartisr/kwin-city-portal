import { describe, expect, it } from 'vitest';
import { getRegulatoryPlan, normalizePersona } from '@/lib/server/value-add/regulatory';

describe('value-add/regulatory', () => {
  it('builds persona-specific regulatory steps and total duration', () => {
    const { result, sourceIds } = getRegulatoryPlan('investor');

    expect(result.persona).toBe('investor');
    expect(result.steps).toHaveLength(4);
    expect(result.estimatedTotalDays).toBe(54);
    expect(sourceIds).toEqual(['kiadb', 'strr', 'brief']);
  });

  it('normalizes persona input and falls back to citizen', () => {
    expect(normalizePersona(' Resident ')).toBe('resident');
    expect(normalizePersona('unknown')).toBe('citizen');
    expect(normalizePersona(null)).toBe('citizen');
  });
});
