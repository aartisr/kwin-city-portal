/**
 * Centralized Site Configuration
 * Single source of truth for navigation, routing, and site structure
 * Update this file to add pages, change navigation, or modify site structure
 */

export const SITE_CONFIG = {
  name: 'KWIN City',
  description: 'Knowledge, Wellbeing, Innovation City',
  url: 'https://kwin-city.com',
  locale: 'en_IN',
  xHandle: '@kwincity',
  socialLinks: {
    x: 'https://x.com/kwincity',
    facebook: 'https://www.facebook.com/kwincity',
    instagram: 'https://www.instagram.com/hellokwincityconnect',
  },
  // Canonical content refresh date used in sitemap, schema, and UI labels.
  lastUpdatedISO: '2026-04-24',
} as const;

/**
 * Primary Navigation Structure
 * Auto-generates header nav, breadcrumbs, and site maps
 * Modify here to change main navigation
 */
export const MAIN_NAVIGATION = [
  { label: 'About', href: '/about', icon: 'ℹ️' },
  { label: 'Region', href: '/why-north-bengaluru', icon: '📍' },
  { label: 'Timeline', href: '/timeline', icon: '📅' },
  { label: 'Sectors', href: '/sectors', icon: '🏭' },
  { label: 'Sustainability', href: '/sustainability', icon: '🌱' },
  { label: 'Data Insights', href: '/data-insights', icon: '📊' },
  { label: 'Trust', href: '/trust', icon: '🛡️' },
  { label: 'News Intel', href: '/news-intelligence', icon: '🗞️' },
  { label: 'Evidence', href: '/evidence', icon: '✓' },
  { label: 'Sources', href: '/sources', icon: '📚' },
] as const;

/**
 * Persona Navigation
 * Used in header dropdown - easily extensible
 */
export const PERSONAS = [
  {
    label: 'Investor',
    href: '/for/investor',
    icon: '📈',
    desc: 'Opportunity & risk briefing',
  },
  {
    label: 'Resident',
    href: '/for/resident',
    icon: '🏡',
    desc: 'Livability & community',
  },
  {
    label: 'Researcher',
    href: '/for/researcher',
    icon: '🔬',
    desc: 'Data & methodology',
  },
  {
    label: 'Journalist',
    href: '/for/journalist',
    icon: '📰',
    desc: 'Verified story angles',
  },
  {
    label: 'Curious Citizen',
    href: '/for/curious-citizens',
    icon: '🌏',
    desc: 'Plain-language explainer',
  },
] as const;

/**
 * Page Template Configuration
 * Maps routes to content files and component layouts
 * Enables generic page builder
 */
export const PAGE_CONFIG = {
  '/about': {
    contentFile: 'pages/about.json',
    template: 'standard',
    components: ['Hero', 'ContentBlock', 'Pillars'],
    title: 'About KWIN City',
  },
  '/why-north-bengaluru': {
    contentFile: 'pages/region.json',
    template: 'standard',
    components: ['Hero', 'RegionMap', 'ContentBlock'],
    title: 'Why North Bengaluru',
  },
  '/timeline': {
    contentFile: 'pages/timeline.json',
    template: 'timeline',
    components: ['Hero', 'TimelineView'],
    title: 'Development Timeline',
  },
  '/sectors': {
    contentFile: 'pages/sectors.json',
    template: 'cards',
    components: ['Hero', 'SectorGrid'],
    title: 'Industry Sectors',
  },
  '/sustainability': {
    contentFile: 'pages/sustainability.json',
    template: 'standard',
    components: ['Hero', 'SustainabilityMetrics', 'ContentBlock'],
    title: 'Sustainability',
  },
  '/data-insights': {
    contentFile: 'pages/data-insights.json',
    template: 'dashboard',
    components: ['Hero', 'DataVisualizations'],
    title: 'Data Insights',
  },
  '/evidence': {
    contentFile: 'pages/evidence.json',
    template: 'list',
    components: ['Hero', 'EvidenceList'],
    title: 'Evidence & Facts',
  },
  '/sources': {
    contentFile: 'pages/sources.json',
    template: 'standard',
    components: ['Hero', 'SourcesList'],
    title: 'Sources',
  },
} as const;

/**
 * Theme & Design System Configuration
 * Centralized for consistent styling and easy theme updates
 */
export const THEME = {
  colors: {
    primary: '#040714',
    accent: '#E8A020',
    accentLight: '#F5A623',
    success: '#10B981',
    teal: '#06B6D4',
    navy: '#0D1333',
  },
  fonts: {
    sans: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  spacing: {
    container: '1200px',
    gutter: '1.5rem',
  },
} as const;

/**
 * Performance Configuration
 */
export const PERF_CONFIG = {
  // Image optimization
  imageOptimization: true,
  imageQuality: 80,
  imageSizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  
  // Code splitting
  enableDynamicImports: true,
  chunkSize: 50, // KB
  
  // Caching
  staticRevalidate: 3600, // 1 hour
  imageRevalidate: 86400, // 24 hours
  
  // Font optimization
  fontDisplay: 'swap',
} as const;

/**
 * SEO Configuration
 */
export const SEO_CONFIG = {
  title: 'KWIN City | Knowledge, Wellbeing, Innovation | Bengaluru',
  description: 'KWIN City - A knowledge-driven, innovation-focused township in North Bengaluru with world-class infrastructure, research institutions, and sustainable development.',
  keywords: ['KWIN', 'Bengaluru', 'Innovation', 'Knowledge District', 'Doddaballapura'],
  author: 'Aarti S Ravikumar',
  creator: 'BAJA Associates',
  canonical: 'https://kwin-city.com',
  ogImage: '/opengraph-image',
  twitterHandle: SITE_CONFIG.xHandle,
} as const;

/**
 * Helper: Get nav item by href
 */
export function getNavItem(href: string) {
  return MAIN_NAVIGATION.find((item) => item.href === href);
}

/**
 * Helper: Get persona by href
 */
export function getPersona(href: string) {
  return PERSONAS.find((p) => p.href === href);
}

/**
 * Helper: Check if route is persona route
 */
export function isPersonaRoute(pathname: string): boolean {
  return pathname.startsWith('/for/');
}

/**
 * Helper: Get all routes for sitemap generation
 */
export function getAllRoutes(): string[] {
  return [
    '/',
    ...MAIN_NAVIGATION.map((item) => item.href),
    ...PERSONAS.map((p) => p.href),
  ];
}
