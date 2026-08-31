export interface TimelinePhase {
  id: string;
  year: number;
  title: string;
  description: string;
  milestones: string[];
  status: 'completed' | 'in-progress' | 'planned';
  progress?: number;
}

export interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  keyPartners?: string[];
  color: string;
}

export interface InfrastructureItem {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'under-construction' | 'planned';
  capacity?: string;
  location?: string;
  certifications?: string[];
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  industryFocus: string[];
  expectedJobs: number;
  expectedInvestment: string;
}

export interface SourceCitation {
  title: string;
  url?: string;
  author?: string;
  date?: string;
  status: 'verified' | 'pending-verification' | 'unconfirmed';
}

export interface ContentBlock {
  id: string;
  title: string;
  content: string;
  citations: SourceCitation[];
  lastUpdated: string;
}

export interface SustainabilityMetric {
  name: string;
  target: string;
  current?: string;
  unit: string;
  deadline?: string;
}

export interface EvidenceSource {
  id: string;
  title: string;
  publisher: string;
  scope: string;
  url: string;
  status: 'contextual' | 'project-adjacent';
  summary: string;
  supports: string[];
  cannotProve: string[];
}

export interface SourceReference {
  id: string;
  label: string;
  title: string;
  publisher: string;
  url?: string;
  note: string;
  status: 'verified' | 'pending-verification' | 'contextual';
}

export interface ClaimMapping {
  id: string;
  section: string;
  claim: string;
  sourceIds: string[];
  status: 'verified' | 'pending-verification' | 'contextual';
}

export interface GeographicLocation {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: 'kwin-site' | 'airport' | 'landmark' | 'connectivity';
  description: string;
  distance?: string; // Distance from KWIN City
  sourceId?: string; // Reference to evidence source
}
