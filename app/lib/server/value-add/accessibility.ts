import type { AccessibilityQuery, AccessibilityResult } from '@/types/value-add';

const BASE_MINUTES_BY_MODE: Record<AccessibilityQuery['mode'], number> = {
  road: 48,
  transit: 64,
  air: 28,
};

export function calculateAccessibility(query: AccessibilityQuery): {
  result: AccessibilityResult;
  sourceIds: string[];
} {
  const mode = query.mode;
  const base = BASE_MINUTES_BY_MODE[mode];

  const destinationBias = query.destination?.toLowerCase().includes('airport') ? -9 : 0;
  const estimatedMinutes = Math.max(8, base + destinationBias);
  const projectedMinutes = query.includeProjected ? Math.max(6, estimatedMinutes - 7) : undefined;
  const deltaMinutes = projectedMinutes != null ? estimatedMinutes - projectedMinutes : undefined;

  return {
    result: {
      estimatedMinutes,
      projectedMinutes,
      deltaMinutes,
      assumptions: [
        'Travel estimates are model-based directional ranges, not live traffic predictions.',
        'Projected time assumes corridor upgrades reach planned service levels.',
      ],
    },
    sourceIds: ['aviation', 'strr', 'irr'],
  };
}