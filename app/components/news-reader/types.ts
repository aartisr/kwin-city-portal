import type { LocalizedValue, Locale } from '@/lib/i18n/messages';

export type ReaderItem = {
  title: string;
  link: string;
  summary: string;
  summarySource?: 'publisher-feed' | 'discovery-snippet' | 'unavailable';
  fullContent?: string;
  source: string;
  sourceFeedUrl: string;
  sourceTier: ReaderSourceTier;
  provenance: ReaderProvenance;
  isKwinRelated: boolean;
  kwinRelevanceScore?: number;
  kwinRelevanceReasons?: string[];
  originalLink?: string;
  authenticity: 'verified-feed' | 'discovery-feed' | 'unverified';
  publishedAt: string | null;
};

export type ReaderProvenance = 'direct-institutional' | 'direct-publisher' | 'source-filtered-discovery' | 'contextual-monitoring';
export type ReaderSortMode = 'significance' | 'newest' | 'source-breadth';

export type ReaderCluster = {
  id: string;
  title: string;
  summary: string;
  representative: ReaderItem;
  items: ReaderItem[];
  sourceCount: number;
  confidence: 'high' | 'medium' | 'contextual';
  whyThisMatters: string[];
  score: number;
};

export type IntelligenceLens = 'resident' | 'investor' | 'government' | 'researcher';

export type EvidenceStatus = 'confirmed-primary' | 'publisher-reported' | 'corroborated' | 'discovery-only';

export type IntelligenceBrief = {
  whatHappened: string;
  whyItMatters: string[];
  evidenceStatus: EvidenceStatus;
  evidenceLabel: string;
  known: string[];
  unknown: string[];
  timeline: Array<{ at: string | null; label: string; source: string; provenance: ReaderProvenance }>;
  lensCopy: Record<IntelligenceLens, string>;
  questions: Array<{ id: string; question: string; answer: string }>;
  generatedAt: string;
};

export type ReaderSourceTier = 'primary' | 'official' | 'contextual';

export type ReaderResponse = {
  opmlUrl: string;
  feedCount: number;
  itemCount: number;
  generatedAt: string;
  items: ReaderItem[];
  cache?: {
    hit: boolean;
    ttlMs: number;
  };
};

export type ReaderPreset = {
  id: string;
  name: string;
  opmlUrl: string;
  limit: number;
  topicQuery?: string;
  sourceMode?: 'all' | 'official' | 'primary';
  timeWindow?: TimeWindow;
  sort?: ReaderSortMode;
};

export type TimeWindow = 'all' | '24h' | '7d' | '30d';

export type ReaderStatsItem = {
  label: string;
  value: string;
};

export type ReaderText = (values: LocalizedValue<string>) => string;

export type ReaderLocale = Locale;
