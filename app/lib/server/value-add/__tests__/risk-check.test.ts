import { describe, expect, it } from 'vitest';
import { evaluateRisk } from '@/lib/server/value-add/risk-check';

describe('value-add/risk-check', () => {
  it('returns partial status signals when input is missing', () => {
    const { assessment, warnings } = evaluateRisk({});

    expect(assessment.score).toBeGreaterThanOrEqual(0);
    expect(assessment.riskBand).toBe('low');
    expect(warnings.length).toBeGreaterThan(0);
  });

  it('increases risk score for waterbody and flood keywords', () => {
    const { assessment, sourceIds } = evaluateRisk({
      parcelId: 'SITE-LAKE-001',
      areaName: 'flood-prone industrial pocket',
      latitude: 13.2,
      longitude: 77.6,
    });

    expect(assessment.score).toBeGreaterThanOrEqual(70);
    expect(assessment.riskBand).toBe('high');
    expect(sourceIds).toContain('lakes');
    expect(sourceIds).toContain('groundwater');
  });
});
