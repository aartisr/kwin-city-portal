import type { ValuationIndexResponse, ValuationPoint } from '@/types/value-add';

const ZONE_POINTS: Record<string, ValuationPoint[]> = {
  doddaballapur: [
    { period: '2024-Q3', marketRatePerSqFt: 1850, guidanceRatePerSqFt: 1425 },
    { period: '2024-Q4', marketRatePerSqFt: 1940, guidanceRatePerSqFt: 1470 },
    { period: '2025-Q1', marketRatePerSqFt: 2080, guidanceRatePerSqFt: 1540 },
    { period: '2025-Q2', marketRatePerSqFt: 2190, guidanceRatePerSqFt: 1610 },
  ],
  nelamangala: [
    { period: '2024-Q3', marketRatePerSqFt: 1710, guidanceRatePerSqFt: 1360 },
    { period: '2024-Q4', marketRatePerSqFt: 1805, guidanceRatePerSqFt: 1410 },
    { period: '2025-Q1', marketRatePerSqFt: 1915, guidanceRatePerSqFt: 1490 },
    { period: '2025-Q2', marketRatePerSqFt: 2020, guidanceRatePerSqFt: 1560 },
  ],
  dobbaspet: [
    { period: '2024-Q3', marketRatePerSqFt: 1650, guidanceRatePerSqFt: 1320 },
    { period: '2024-Q4', marketRatePerSqFt: 1740, guidanceRatePerSqFt: 1380 },
    { period: '2025-Q1', marketRatePerSqFt: 1860, guidanceRatePerSqFt: 1460 },
    { period: '2025-Q2', marketRatePerSqFt: 1970, guidanceRatePerSqFt: 1520 },
  ],
};

export function normalizeZone(input: string | null): string {
  const value = (input ?? '').trim().toLowerCase();
  if (value in ZONE_POINTS) {
    return value;
  }

  return 'doddaballapur';
}

export function getValuationIndex(zone: string): {
  result: ValuationIndexResponse;
  sourceIds: string[];
} {
  const points = ZONE_POINTS[zone] ?? ZONE_POINTS.doddaballapur;
  const first = points[0];
  const last = points[points.length - 1];
  const trend: ValuationIndexResponse['trend'] =
    last.marketRatePerSqFt > first.marketRatePerSqFt ? 'up' : last.marketRatePerSqFt < first.marketRatePerSqFt ? 'down' : 'stable';

  return {
    result: {
      zone,
      trend,
      points,
      commentary: [
        'Market rates reflect directional corridor signals and are not transaction guarantees.',
        'Guidance values are official baselines and can lag fast-moving market sentiment.',
      ],
    },
    sourceIds: ['economicSurvey', 'kiadb', 'brief'],
  };
}
