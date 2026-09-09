export type DistrictCategory = 'knowledge' | 'health' | 'innovation' | 'research';
export type ToolCategory = 
  | 'spatial' 
  | 'valuation' 
  | 'regulatory' 
  | 'risk' 
  | 'opportunity' 
  | 'data-studio' 
  | 'accessibility' 
  | 'satellite' 
  | 'news' 
  | 'evidence' 
  | 'evaluation'
  | 'social';

export interface District {
  id: string;
  name: string;
  category: DistrictCategory;
  tagline: string;
  acreage: number;
  description: string;
  focusAreas: string[];
  keyAnchors: string[];
  projectedJobs: number;
  expectedInvestment: string;
  color: string;
  iconName: string;
}

export interface TimelinePhase {
  id: string;
  phase: string;
  yearRange: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
  description: string;
  milestones: string[];
  targetAcreage: number;
}

export interface EvidenceSource {
  id: string;
  title: string;
  publisher: string;
  scope: string;
  url: string;
  status: 'verified' | 'project-adjacent' | 'contextual' | 'unconfirmed';
  summary: string;
  supports: string[];
  cannotProve: string[];
  lastAudited: string;
  hash?: string;
}

export interface ClaimMapping {
  id: string;
  claim: string;
  category: 'Land & Scale' | 'Investment' | 'Employment' | 'Sustainability' | 'Infrastructure';
  officialStatus: 'verified' | 'in-progress' | 'proposed';
  verifiedSource: string;
  sourceUrl: string;
  analysis: string;
}

export interface SpatialLayer {
  id: string;
  title: string;
  category: 'transport' | 'zoning' | 'utilities' | 'anchor';
  phase: 'phase-1' | 'phase-2' | 'phase-3';
  status: 'available' | 'planned';
  description: string;
  zone: string;
  coordinates: { x: number; y: number; width: number; height: number };
  provenance: {
    sourceName: string;
    sourceUrl: string;
    downloads?: Array<{ label: string; url: string; format: string }>;
  };
}

export interface ValuationDataPoint {
  year: string;
  marketRate: number; // ₹ per sq.ft
  guidanceRate: number; // ₹ per sq.ft
  projectedGrowth: number;
}

export interface ValuationZone {
  id: string;
  name: string;
  corridor: string;
  currentRate: number;
  fiveYearCAGR: number;
  tenYearProjected: number;
  historicalData: ValuationDataPoint[];
  driverSummary: string;
}

export interface RegulatoryStep {
  id: string;
  stepNumber: number;
  title: string;
  authority: string;
  timelineDays: number;
  requiredDocuments: string[];
  onlinePortalUrl: string;
  category: string;
}

export interface RiskFactor {
  id: string;
  category: 'Hydrological' | 'Land Title' | 'Environmental' | 'Execution' | 'Power/Grid';
  title: string;
  severity: 'low' | 'moderate' | 'high';
  score: number; // 0 to 100
  mitigation: string;
  status: string;
}

export interface OpportunityListing {
  id: string;
  title: string;
  type: 'PPP Tender' | 'Academic Joint Venture' | 'Industrial Allotment' | 'Incubator Slot' | 'Clinical Trial Hub';
  district: string;
  allotmentSize: string;
  incentives: string[];
  deadline: string;
  status: 'open' | 'under_review' | 'awarded';
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  publisher: string;
  category: 'Official Gazette' | 'Infrastructure' | 'Policy' | 'Investment' | 'Global Partnerships';
  summary: string;
  credibilityScore: number; // 0 - 100
  factCheckStatus: 'Verified Primary' | 'Official State Release' | 'Industry Reporting';
  sourceUrl: string;
  readTime: string;
}

export interface SatelliteMilestone {
  date: string;
  quarter: string;
  title: string;
  sensor: string;
  earthworkCompletion: number;
  roadGradingProgress: number;
  environmentalBufferStatus: string;
  imageUrl?: string;
  highlights: string[];
}

export interface EvidenceVerification {
  id: string;
  category: string;
  claim: string;
  verdict: 'VERIFIED_OFFICIAL' | 'IN_PROGRESS' | 'CLARIFIED_CONTEXT';
  statutorySource: string;
  sourceUrl: string;
  evidenceNotes: string;
  sha256Digest: string;
}

export type CategoryType = 
  | "Knowledge" 
  | "Wellbeing" 
  | "Innovation" 
  | "Transit & Infrastructure" 
  | "Land & Environment";

export type CommentType = 
  | "seeking_verification" 
  | "adding_evidence" 
  | "citizen_perspective" 
  | "planner_update";

export interface Evidence {
  id: string;
  sourceName: string;
  type: 'official_document' | 'court_filing' | 'news_report' | 'academic_study' | 'satellite_imagery';
  description: string;
  url?: string;
  verifiedAt: string;
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  type: CommentType;
  content: string;
  createdAt: string;
  upvotes: number;
  citationTitle?: string;
  citationUrl?: string;
}

export interface Thread {
  id: string;
  title: string;
  category: CategoryType;
  author: string;
  role: string;
  content: string;
  createdAt: string;
  upvotes: number;
  evidenceScore: number;
  comments: Comment[];
  isPinned?: boolean;
}

export interface Claim {
  id: string;
  statement: string;
  status: 'confirmed' | 'proposed' | 'debated';
  category: CategoryType;
  description: string;
  upvotes: number;
  evidenceList: Evidence[];
  unverifiedClaims?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

