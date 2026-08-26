export type ValueAddStatus = 'success' | 'partial' | 'error';

export type ValueAddTrustStatus = 'verified' | 'pending-verification' | 'contextual';

export interface ValueAddEvidenceItem {
  sourceId: string;
  label: string;
  title: string;
  url?: string;
  lastUpdated?: string;
  trustStatus: ValueAddTrustStatus;
}

export interface ValueAddWarning {
  code: string;
  message: string;
}

export interface ValueAddEnvelope<T> {
  requestId: string;
  status: ValueAddStatus;
  data: T;
  evidence: ValueAddEvidenceItem[];
  warnings: ValueAddWarning[];
}

export interface RiskQuery {
  parcelId?: string;
  areaName?: string;
  latitude?: number;
  longitude?: number;
}

export type RiskBand = 'low' | 'medium' | 'high';

export interface RiskAssessment {
  riskBand: RiskBand;
  score: number;
  summary: string;
  matchedSignals: string[];
  recommendations: string[];
}

export interface AccessibilityQuery {
  origin: string;
  destination?: string;
  mode: 'road' | 'transit' | 'air';
  includeProjected?: boolean;
}

export interface AccessibilityResult {
  estimatedMinutes: number;
  projectedMinutes?: number;
  deltaMinutes?: number;
  assumptions: string[];
}

export interface RegulatoryStep {
  id: string;
  title: string;
  authority: string;
  estimatedDays: number;
  requiredDocuments: string[];
}

export interface RegulatoryResponse {
  persona: 'resident' | 'investor' | 'researcher' | 'journalist' | 'citizen';
  steps: RegulatoryStep[];
  estimatedTotalDays: number;
}

export interface ChangeEvent {
  id: string;
  category: string;
  title: string;
  date: string;
  summary: string;
  sourceIds: string[];
}

export interface ChangeTrackerResponse {
  asOf: string;
  total: number;
  events: ChangeEvent[];
}

export interface SpatialLayer {
  id: string;
  title: string;
  category: 'transport' | 'zoning' | 'utilities' | 'anchor';
  phase: 'phase-1' | 'phase-2' | 'phase-3';
  status: 'available' | 'planned';
  description: string;
  provenance?: {
    sourceName: string;
    sourceUrl: string;
    access: 'downloadable-documents' | 'api' | 'internal-model';
    note?: string;
    originalSources?: Array<{
      label: string;
      url: string;
    }>;
    downloads?: Array<{
      label: string;
      url: string;
      format: string;
    }>;
  };
}

export interface FutureProjectSource {
  label: string;
  url: string;
  type: 'mirror' | 'original';
}

export interface FutureProjectReference {
  id: string;
  title: string;
  phase: 'phase-1' | 'phase-2' | 'phase-3';
  category: SpatialLayer['category'];
  status: SpatialLayer['status'];
  summary: string;
  lastSourceCheckAt: string;
  openAllOriginalLinksUrl?: string;
  sources: FutureProjectSource[];
}

export interface SpatialExplorerResponse {
  phase: 'phase-1' | 'phase-2' | 'phase-3';
  layers: SpatialLayer[];
  highlights: string[];
  futureProjects: FutureProjectReference[];
}

export interface SatelliteSnapshot {
  id: string;
  month: string;
  progressScore: number;
  note: string;
}

export interface SatelliteTrackerResponse {
  asOf: string;
  snapshots: SatelliteSnapshot[];
}

export interface ValuationPoint {
  period: string;
  marketRatePerSqFt: number;
  guidanceRatePerSqFt: number;
}

export interface ValuationIndexResponse {
  zone: string;
  trend: 'up' | 'down' | 'stable';
  points: ValuationPoint[];
  commentary: string[];
}

export interface InvestmentSignal {
  id: string;
  organization: string;
  category: 'manufacturing' | 'biotech' | 'education' | 'healthcare';
  stage: 'announced' | 'in-progress' | 'operational';
  footprintAcres?: number;
  note: string;
}

export interface InvestmentRadarResponse {
  asOf: string;
  totalSignals: number;
  signals: InvestmentSignal[];
}

export interface OpportunityRequest {
  name: string;
  email: string;
  role: 'landowner' | 'developer' | 'investor' | 'institution' | 'operator';
  requirement: string;
  budgetBand?: string;
}

export interface OpportunityLead {
  id: string;
  role: OpportunityRequest['role'];
  requirement: string;
  budgetBand?: string;
  createdAt: string;
  status: 'new' | 'screening' | 'matched';
}

export interface OpportunityExchangeResponse {
  leads: OpportunityLead[];
}

export interface GazetteNewsItem {
  id: string;
  title: string;
  category: 'gazette' | 'policy' | 'infrastructure';
  publishedAt: string;
  summary: string;
  sourceId: string;
}

export interface GazetteNewsResponse {
  asOf: string;
  total: number;
  items: GazetteNewsItem[];
}

export interface OpenDataset {
  id: string;
  name: string;
  format: 'geojson' | 'csv' | 'json';
  coverage: string;
  updatedAt: string;
}

export interface OpenDataResponse {
  datasets: OpenDataset[];
}

export interface ValueSignal {
  id: string;
  category: 'connectivity' | 'economic' | 'infrastructure';
  title: string;
  direction: 'up' | 'down' | 'stable';
  note: string;
}

export type ExportType = 'csv' | 'geojson' | 'json';

export interface ExportJobRequest {
  exportType: ExportType;
  filters?: Record<string, string | number | boolean>;
}

export interface ExportJob {
  id: string;
  status: 'queued' | 'ready';
  exportType: ExportType;
  fileUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface AlertSubscription {
  email: string;
  persona: 'resident' | 'investor' | 'researcher' | 'journalist' | 'citizen';
  topics: string[];
  geofilters?: string[];
  cadence: 'daily' | 'weekly' | 'monthly';
}

export interface AlertSubscriptionResponse {
  subscriptionId: string;
  status: 'active' | 'inactive';
}
