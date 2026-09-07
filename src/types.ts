export interface SubCriterion {
  id: string;
  name: string;
  score: number; // 1 to 10
  weight: number; // 0 to 1
  comment: string;
  status: 'passed' | 'warning' | 'needs_improvement';
}

export interface EvaluationCategory {
  id: string;
  title: string;
  shortTitle: string;
  score: number; // 1 to 10
  weight: number; // default weight in overall score
  icon: string;
  summary: string;
  verdict: string;
  strengths: string[];
  weaknesses: string[];
  keyEvidence: string;
  subCriteria: SubCriterion[];
}

export interface BenchmarkComparison {
  name: string;
  type: 'official_gov' | 'independent_portal' | 'commercial_aggregator';
  overallScore: number;
  transparency: number;
  uiUx: number;
  investorUtility: number;
  highlight: string;
}

export interface PersonaPreset {
  id: string;
  name: string;
  role: string;
  description: string;
  categoryWeights: Record<string, number>; // categoryId -> weight
}

export interface RoadmapItem {
  step: number;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  expectedScoreBump: number;
  description: string;
  actionableRecommendation: string;
}
