import { SITE_CONFIG } from '@/config/site.config';
import type { KwinAgencyTopic, KwinNewsSignal, SocialPlatform } from './types';

export const SEO_AGENCY_SITE_URL = SITE_CONFIG.url;
export const SEO_AGENCY_NAME = 'KWIN City SEO Agency';
export const SEO_AGENCY_TIME_ZONE = 'Asia/Kolkata';
export const SEO_AGENCY_ARTICLE_BASE_PATH = '/seo-agency/articles';
export const SEO_AGENCY_CRON_PATH = '/api/cron/kwin-seo-agency';
export const SEO_AGENCY_STORE_FILE = 'seo-agency-runs.json';
export const SEO_AGENCY_MAX_STORED_RUNS = 400;
export const SEO_AGENCY_MISSION =
  'Create source-linked KWIN City content every day that earns search trust, social saves, shares, and serious local discussion without unsupported hype.';

export const AGENCY_TOPICS: KwinAgencyTopic[] = [
  {
    id: 'start-here',
    pillar: 'KWIN City explainer',
    audience: 'curious citizens, journalists, new followers',
    route: '/about',
    searchIntent: 'What is KWIN City and why is North Bengaluru talking about it?',
    hook: 'What is KWIN City in plain English?',
    keywords: ['KWIN City', 'Knowledge Wellbeing Innovation City', 'North Bengaluru', 'Doddaballapura'],
    evidenceStatus: 'pending',
  },
  {
    id: 'north-bengaluru-location',
    pillar: 'North Bengaluru location intelligence',
    audience: 'investors, residents, regional planners',
    route: '/why-north-bengaluru',
    searchIntent: 'Why North Bengaluru and Doddaballapura matter for KWIN City',
    hook: 'Why does the KWIN City location story keep pointing north?',
    keywords: ['North Bengaluru', 'Doddaballapura', 'Bengaluru airport corridor', 'KWIN City location'],
    evidenceStatus: 'contextual',
  },
  {
    id: 'source-check',
    pillar: 'Evidence and source discipline',
    audience: 'journalists, researchers, policy watchers',
    route: '/sources',
    searchIntent: 'Which KWIN City claims are verified and which are still pending?',
    hook: 'Not every KWIN City claim has the same evidence status.',
    keywords: ['KWIN City sources', 'KWIN City evidence', 'KIADB', 'verified KWIN City claims'],
    evidenceStatus: 'verified',
  },
  {
    id: 'sector-spotlight',
    pillar: 'Sector opportunity map',
    audience: 'founders, students, investors, sector analysts',
    route: '/sectors',
    searchIntent: 'Which sectors are being associated with KWIN City?',
    hook: 'KWIN City is not one industry story. It is a sector-cluster story.',
    keywords: ['KWIN City sectors', 'semiconductor Bengaluru', 'aerospace Karnataka', 'health tech Bengaluru'],
    evidenceStatus: 'pending',
  },
  {
    id: 'wellbeing-sustainability',
    pillar: 'Wellbeing and sustainability context',
    audience: 'residents, urbanists, environmental researchers',
    route: '/sustainability',
    searchIntent: 'How should wellbeing, water, and sustainability be tracked around KWIN City?',
    hook: 'A knowledge city is only credible if wellbeing is measurable.',
    keywords: ['KWIN City sustainability', 'North Bengaluru water', 'wellbeing city', 'urban sustainability'],
    evidenceStatus: 'contextual',
  },
  {
    id: 'timeline-watch',
    pillar: 'Timeline and milestone tracking',
    audience: 'project followers, journalists, institutional readers',
    route: '/timeline',
    searchIntent: 'What changed in the KWIN City timeline?',
    hook: 'The fastest way to understand KWIN City is to separate milestones from promises.',
    keywords: ['KWIN City timeline', 'KWIN City milestones', 'KIADB approvals', 'KWIN City phase'],
    evidenceStatus: 'verified',
  },
  {
    id: 'faq-conversion',
    pillar: 'FAQ and conversion content',
    audience: 'residents, parents, students, businesses',
    route: '/faq',
    searchIntent: 'Common questions people ask before trusting KWIN City information',
    hook: 'The best KWIN City content starts with the questions people actually ask.',
    keywords: ['KWIN City FAQ', 'KWIN City questions', 'North Bengaluru development questions'],
    evidenceStatus: 'contextual',
  },
];

export const DEFAULT_SIGNALS: KwinNewsSignal[] = [
  {
    title: 'KWIN City source-led daily desk',
    url: `${SEO_AGENCY_SITE_URL}/news-intelligence`,
    source: 'KWIN City Portal',
    summary:
      'No fresh high-confidence external signal was required for this run, so the agency is publishing an evergreen source-led briefing from the portal knowledge base.',
    publishedAt: null,
    relevanceScore: 76,
    matchedTerms: ['KWIN City', 'North Bengaluru', 'sources'],
    evidenceStatus: 'verified',
    recommendedAngle: 'Use the portal source ledger as the anchor and avoid overstating project-specific claims.',
  },
];

export type SocialPlatformConfig = {
  platform: SocialPlatform;
  label: string;
  format: string;
  directPublish: boolean;
  requiresMedia: boolean;
  requiredEnv: string[];
  optionalEnv: string[];
  hashtags: string[];
  publishNote: string;
  captionLimit?: number;
  hashtagLimit?: number;
};

export const SOCIAL_PLATFORM_CONFIGS: Record<SocialPlatform, SocialPlatformConfig> = {
  instagram: {
    platform: 'instagram',
    label: 'Instagram',
    format: 'carousel caption',
    directPublish: true,
    requiresMedia: true,
    requiredEnv: ['INSTAGRAM_BUSINESS_ACCOUNT_ID', 'META_PAGE_ACCESS_TOKEN'],
    optionalEnv: ['SOCIAL_DEFAULT_IMAGE_URL'],
    hashtags: ['#KWINCity', '#NorthBengaluru', '#Doddaballapura', '#Bengaluru', '#UrbanDevelopment'],
    publishNote: 'Uses a generated square article image unless SOCIAL_DEFAULT_IMAGE_URL is set.',
    captionLimit: 2200,
    hashtagLimit: 30,
  },
  facebook: {
    platform: 'facebook',
    label: 'Facebook',
    format: 'link post',
    directPublish: true,
    requiresMedia: false,
    requiredEnv: ['META_PAGE_ID', 'META_PAGE_ACCESS_TOKEN'],
    optionalEnv: [],
    hashtags: ['#KWINCity', '#NorthBengaluru', '#Doddaballapura', '#Bengaluru'],
    publishNote: 'Publishes a Facebook Page link post through the Meta Graph API.',
  },
  linkedin: {
    platform: 'linkedin',
    label: 'LinkedIn',
    format: 'institutional briefing',
    directPublish: true,
    requiresMedia: false,
    requiredEnv: ['LINKEDIN_ACCESS_TOKEN', 'LINKEDIN_AUTHOR_URN'],
    optionalEnv: ['LINKEDIN_VERSION'],
    hashtags: ['#KWINCity', '#Bengaluru', '#InnovationDistrict', '#UrbanPlanning'],
    publishNote: 'Publishes a LinkedIn text post that links to the daily article.',
    captionLimit: 3000,
  },
  x: {
    platform: 'x',
    label: 'X',
    format: 'thread starter',
    directPublish: true,
    requiresMedia: false,
    requiredEnv: ['X_USER_ACCESS_TOKEN'],
    optionalEnv: [],
    hashtags: ['#KWINCity', '#Bengaluru'],
    publishNote: 'Publishes a text post through the X API.',
    captionLimit: 280,
  },
};

export const SOCIAL_PLATFORM_ORDER: SocialPlatform[] = ['instagram', 'facebook', 'linkedin', 'x'];

export function getKwinLocalDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SEO_AGENCY_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 72);
}

export function campaignDate(date: string): string {
  return date.replace(/-/g, '');
}

export function getArticlePath(slug: string): string {
  return `${SEO_AGENCY_ARTICLE_BASE_PATH}/${slug}`;
}

export function getInstagramImagePath(slug: string): string {
  return `${getArticlePath(slug)}/instagram-image`;
}

export function buildUtmLink(route: string, platform: string, date: string): string {
  const path = route.startsWith('/') ? route : `/${route}`;
  const params = new URLSearchParams({
    utm_source: platform,
    utm_medium: 'social',
    utm_campaign: `kwin_seo_agency_${campaignDate(date)}`,
  });
  return `${SEO_AGENCY_SITE_URL}${path}?${params.toString()}`;
}
