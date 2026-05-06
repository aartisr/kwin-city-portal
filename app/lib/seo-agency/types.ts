export type EvidenceStatus = 'verified' | 'contextual' | 'pending';

export type AgencyCadence = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'x';

export type KwinNewsSignal = {
  title: string;
  url: string;
  source: string;
  summary: string;
  publishedAt: string | null;
  relevanceScore: number;
  matchedTerms: string[];
  evidenceStatus: EvidenceStatus;
  recommendedAngle: string;
};

export type KwinAgencyTopic = {
  id: string;
  pillar: string;
  audience: string;
  route: string;
  searchIntent: string;
  hook: string;
  keywords: string[];
  evidenceStatus: EvidenceStatus;
};

export type SocialPostDraft = {
  platform: SocialPlatform;
  format: string;
  hook: string;
  body: string;
  hashtags: string[];
  link: string;
  mediaUrl?: string;
  altText?: string;
  utmCampaign: string;
  evidenceStatus: EvidenceStatus;
  approvalStatus: 'needs_review' | 'approved_by_rule';
  publishStatus: 'draft' | 'queued' | 'published' | 'skipped' | 'failed';
  platformPostId?: string;
  publishNote?: string;
};

export type DailyBrief = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  excerpt: string;
  angle: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  sharePrompt: string;
  internalLinks: Array<{ label: string; href: string }>;
  evidenceNotes: string[];
  articleOutline: Array<{ heading: string; body: string }>;
};

export type DailyArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type DailyArticleFaq = {
  question: string;
  answer: string;
};

export type DailyArticle = {
  slug: string;
  title: string;
  dek: string;
  canonicalUrl: string;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  heroKicker: string;
  evidenceStatus: EvidenceStatus;
  sourceSummary: string;
  keyTakeaways: string[];
  sections: DailyArticleSection[];
  faqs: DailyArticleFaq[];
  sourceLinks: Array<{ label: string; href: string }>;
  editorialChecklist: string[];
};

export type AgencySnapshot = {
  cadence: AgencyCadence;
  title: string;
  summary: string;
  focus: string[];
  contentAssets: string[];
  distributionActions: string[];
  metricsToWatch: string[];
};

export type PublishAttempt = {
  platform: SocialPlatform;
  status: 'skipped' | 'published' | 'failed';
  note: string;
  platformPostId?: string;
};

export type AgencyReadinessCheck = {
  id: string;
  label: string;
  status: 'ready' | 'blocked' | 'manual' | 'disabled';
  detail: string;
  missingEnv?: string[];
  optionalEnv?: string[];
};

export type KwinSeoAgencyRun = {
  id: string;
  runDate: string;
  generatedAt: string;
  agencyName: string;
  mission: string;
  topic: KwinAgencyTopic;
  dailyBrief: DailyBrief;
  dailyArticle: DailyArticle;
  newsSignals: KwinNewsSignal[];
  socialQueue: SocialPostDraft[];
  snapshots: AgencySnapshot[];
  publishAttempts: PublishAttempt[];
  publishingReadiness?: AgencyReadinessCheck[];
  healthChecks: Array<{ label: string; status: 'pass' | 'warn'; detail: string }>;
};
