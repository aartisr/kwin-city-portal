import type { RiskAssessment, RiskQuery, ValueAddWarning } from '@/types/value-add';

function clampScore(value: number) {
  return Math.max(0, Math.min(99, Math.round(value)));
}

export function evaluateRisk(query: RiskQuery): {
  assessment: RiskAssessment;
  sourceIds: string[];
  warnings: ValueAddWarning[];
} {
  const warnings: ValueAddWarning[] = [];
  const matchedSignals: string[] = [];
  const sourceIds = new Set<string>(['kiadb', 'strr']);

  let score = 20;

  const parcelId = query.parcelId?.trim().toLowerCase();
  const areaName = query.areaName?.trim().toLowerCase();

  if (parcelId) {
    matchedSignals.push('parcel-id-submitted');
  }

  if (!parcelId && !areaName && (query.latitude == null || query.longitude == null)) {
    warnings.push({
      code: 'INSUFFICIENT_INPUT',
      message: 'Submit parcel, area, or map coordinates for a higher-confidence assessment.',
    });
  }

  if (parcelId?.includes('lake') || areaName?.includes('lake')) {
    score += 35;
    matchedSignals.push('waterbody-proximity');
    sourceIds.add('lakes');
    sourceIds.add('rainfall');
  }

  if (parcelId?.includes('flood') || areaName?.includes('flood')) {
    score += 25;
    matchedSignals.push('flood-exposure-keyword');
    sourceIds.add('groundwater');
  }

  if (areaName?.includes('airport') || areaName?.includes('aero')) {
    score += 12;
    matchedSignals.push('airport-influence-zone');
    sourceIds.add('aviation');
  }

  if (areaName?.includes('industrial') || areaName?.includes('manufacturing')) {
    score += 18;
    matchedSignals.push('industrial-compliance-zone');
    sourceIds.add('economicSurvey');
  }

  if (query.latitude != null && query.longitude != null) {
    matchedSignals.push('coordinate-submitted');
    const withinNorthBengaluruBand = query.latitude >= 13.0 && query.latitude <= 13.35 && query.longitude >= 77.45 && query.longitude <= 77.8;
    if (withinNorthBengaluruBand) {
      score += 8;
      matchedSignals.push('north-bengaluru-corridor-band');
    }
  }

  const finalScore = clampScore(score);
  const riskBand = finalScore >= 70 ? 'high' : finalScore >= 40 ? 'medium' : 'low';
  const summary =
    riskBand === 'high'
      ? 'High risk band: verify zoning, water, and corridor constraints before proceeding.'
      : riskBand === 'medium'
        ? 'Medium risk band: perform targeted due diligence on approvals and infrastructure dependencies.'
        : 'Low risk band: no critical red flags detected from submitted indicators, but confirm with primary records.';

  const recommendations = [
    'Validate parcel and land-use classification with KIADB records.',
    'Review corridor and transport dependencies before financial commitment.',
    'Cross-check hydrology constraints against lake and groundwater context data.',
  ];

  return {
    assessment: {
      riskBand,
      score: finalScore,
      summary,
      matchedSignals,
      recommendations,
    },
    sourceIds: Array.from(sourceIds),
    warnings,
  };
}