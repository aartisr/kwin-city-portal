import type { RegulatoryResponse, RegulatoryStep } from '@/types/value-add';

type Persona = RegulatoryResponse['persona'];

const BASE_STEPS: RegulatoryStep[] = [
  {
    id: 'land-verification',
    title: 'Land and title verification',
    authority: 'KIADB / Local revenue records',
    estimatedDays: 10,
    requiredDocuments: ['Parcel identifier', 'Ownership chain', 'Land-use extract'],
  },
  {
    id: 'zoning-check',
    title: 'Zoning and allowable use check',
    authority: 'Planning authority',
    estimatedDays: 14,
    requiredDocuments: ['Site location map', 'Proposed use statement'],
  },
  {
    id: 'utility-feasibility',
    title: 'Utility and connectivity feasibility',
    authority: 'Utility departments / corridor agencies',
    estimatedDays: 12,
    requiredDocuments: ['Utility demand estimate', 'Site access note'],
  },
];

const PERSONA_APPENDIX: Record<Persona, RegulatoryStep[]> = {
  resident: [
    {
      id: 'resident-occupancy',
      title: 'Residential compliance checks',
      authority: 'Local civic authority',
      estimatedDays: 7,
      requiredDocuments: ['Address proof', 'Property details'],
    },
  ],
  investor: [
    {
      id: 'investor-entity',
      title: 'Entity and investment compliance',
      authority: 'State industry facilitation desk',
      estimatedDays: 18,
      requiredDocuments: ['Incorporation documents', 'Board authorization', 'Investment note'],
    },
  ],
  researcher: [
    {
      id: 'research-data-access',
      title: 'Data-use and publication protocol',
      authority: 'Dataset publisher and source policy owner',
      estimatedDays: 5,
      requiredDocuments: ['Research intent statement', 'Citation policy checklist'],
    },
  ],
  journalist: [
    {
      id: 'journalist-factcheck',
      title: 'Fact-check and evidence packet validation',
      authority: 'Source registry and public records',
      estimatedDays: 4,
      requiredDocuments: ['Claim list', 'Source verification sheet'],
    },
  ],
  citizen: [
    {
      id: 'citizen-grievance',
      title: 'Civic escalation and grievance path',
      authority: 'Local grievance portal',
      estimatedDays: 9,
      requiredDocuments: ['Issue summary', 'Location details'],
    },
  ],
};

export function getRegulatoryPlan(persona: Persona): {
  result: RegulatoryResponse;
  sourceIds: string[];
} {
  const steps = [...BASE_STEPS, ...PERSONA_APPENDIX[persona]];
  const estimatedTotalDays = steps.reduce((sum, step) => sum + step.estimatedDays, 0);

  return {
    result: {
      persona,
      steps,
      estimatedTotalDays,
    },
    sourceIds: ['kiadb', 'strr', 'brief'],
  };
}

export function normalizePersona(input: string | null): Persona {
  const value = (input ?? '').trim().toLowerCase();
  if (value === 'resident' || value === 'investor' || value === 'researcher' || value === 'journalist' || value === 'citizen') {
    return value;
  }

  return 'citizen';
}