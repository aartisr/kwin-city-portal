import type { InvestmentRadarResponse, InvestmentSignal } from '@/types/value-add';

const SIGNALS: InvestmentSignal[] = [
  {
    id: 'toyota-bizintel-hub',
    organization: 'Toyota Kirloskar',
    category: 'manufacturing',
    stage: 'announced',
    footprintAcres: 300,
    note: 'Bizintel Hub commitment aligned to advanced mobility and digital manufacturing.',
  },
  {
    id: 'biotech-cluster',
    organization: 'North Bengaluru Biotech Consortium',
    category: 'biotech',
    stage: 'in-progress',
    footprintAcres: 110,
    note: 'Early-stage consortium assembly around life-science incubation demand.',
  },
  {
    id: 'skills-campus',
    organization: 'Applied Innovation Skills Campus',
    category: 'education',
    stage: 'announced',
    note: 'Proposed workforce readiness campus tied to local employment pipelines.',
  },
  {
    id: 'medtech-anchor',
    organization: 'MedTech Collaborative Network',
    category: 'healthcare',
    stage: 'in-progress',
    note: 'Health-tech operators evaluating phased entry for diagnostic and simulation labs.',
  },
];

export function getInvestmentRadar(category?: string): {
  result: InvestmentRadarResponse;
  sourceIds: string[];
} {
  const filtered = category
    ? SIGNALS.filter((signal) => signal.category === category)
    : SIGNALS;

  return {
    result: {
      asOf: new Date().toISOString(),
      totalSignals: filtered.length,
      signals: filtered,
    },
    sourceIds: ['brief', 'economicSurvey', 'kiadb'],
  };
}

export function normalizeInvestmentCategory(input: string | null): InvestmentSignal['category'] | undefined {
  const value = (input ?? '').trim().toLowerCase();
  if (value === 'manufacturing' || value === 'biotech' || value === 'education' || value === 'healthcare') {
    return value;
  }

  return undefined;
}
