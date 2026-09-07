import { promises as fs } from 'fs';
import path from 'path';
import type { EvidenceStatus, KwinNewsSignal } from './types';

type FeedItem = {
  title: string;
  url: string;
  source: string;
  summary: string;
  publishedAt: string | null;
};

const MAX_FEEDS = 20;
const MAX_ITEMS_PER_FEED = 8;
const REQUEST_TIMEOUT_MS = 9000;

const RELEVANCE_TERMS: Array<{ term: string; weight: number }> = [
  { term: 'kwin city', weight: 40 },
  { term: 'knowledge wellbeing innovation city', weight: 40 },
  { term: 'kwin', weight: 32 },
  { term: 'doddaballapura', weight: 24 },
  { term: 'north bengaluru', weight: 22 },
  { term: 'kiadb', weight: 22 },
  { term: 'karnataka industrial areas development board', weight: 22 },
  { term: 'bengaluru airport', weight: 14 },
  { term: 'devanahalli', weight: 14 },
  { term: 'strr', weight: 14 },
  { term: 'satellite town ring road', weight: 14 },
  { term: 'semiconductor', weight: 12 },
  { term: 'aerospace', weight: 10 },
  { term: 'health tech', weight: 10 },
  { term: 'medical technology', weight: 10 },
  { term: 'innovation district', weight: 10 },
  { term: 'industrial township', weight: 10 },
  { term: 'urban development', weight: 8 },
  { term: 'karnataka', weight: 6 },
  { term: 'bengaluru', weight: 5 },
];

function decodeEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function stripHtml(input: string): string {
  return decodeEntities(input)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function summarize(input: string, maxLen = 320): string {
  const clean = stripHtml(input);
  if (!clean) return 'Open the original source for the full context.';
  if (clean.length <= maxLen) return clean;
  return `${clean.slice(0, maxLen).trimEnd()}...`;
}

function getTagValue(block: string, tags: string[]): string {
  for (const tag of tags) {
    const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
    if (match?.[1]) return decodeEntities(match[1]);
  }
  return '';
}

function getFeedTitle(feedXml: string, sourceUrl: string): string {
  const channelTitle = feedXml.match(/<channel[\s\S]*?<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const title = stripHtml(channelTitle ? decodeEntities(channelTitle) : getTagValue(feedXml, ['title']));
  if (title) return title;
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'External source';
  }
}

function getAtomLink(block: string): string {
  const alternate = block.match(/<link\b[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  if (alternate?.[1]) return decodeEntities(alternate[1]);
  const generic = block.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i);
  return generic?.[1] ? decodeEntities(generic[1]) : '';
}

function parseDateMaybe(input: string): string | null {
  if (!input) return null;
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function parseFeed(feedXml: string, sourceUrl: string): FeedItem[] {
  const source = getFeedTitle(feedXml, sourceUrl);
  const rssItems = feedXml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const atomEntries = feedXml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];
  const parsed: FeedItem[] = [];

  for (const item of rssItems.slice(0, MAX_ITEMS_PER_FEED)) {
    const title = stripHtml(getTagValue(item, ['title'])) || 'Untitled article';
    const url = decodeEntities(getTagValue(item, ['link']));
    const rawSummary = getTagValue(item, ['description', 'content:encoded', 'content']);
    if (!url) continue;
    parsed.push({
      title,
      url,
      source,
      summary: summarize(rawSummary || title),
      publishedAt: parseDateMaybe(getTagValue(item, ['pubDate', 'dc:date', 'published', 'updated'])),
    });
  }

  for (const entry of atomEntries.slice(0, MAX_ITEMS_PER_FEED)) {
    const title = stripHtml(getTagValue(entry, ['title'])) || 'Untitled article';
    const url = getAtomLink(entry);
    const rawSummary = getTagValue(entry, ['summary', 'content']);
    if (!url) continue;
    parsed.push({
      title,
      url,
      source,
      summary: summarize(rawSummary || title),
      publishedAt: parseDateMaybe(getTagValue(entry, ['published', 'updated'])),
    });
  }

  return parsed;
}

function extractOpmlFeedUrls(opmlXml: string): string[] {
  const matches = [...opmlXml.matchAll(/xmlUrl=["']([^"']+)["']/gi)];
  return [...new Set(matches.map((match) => decodeEntities(match[1])).filter(Boolean))].slice(0, MAX_FEEDS);
}

async function fetchTextWithTimeout(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'KWINSeoAgency/1.0 (+https://kwin-city.com)',
        Accept: 'application/rss+xml, application/atom+xml, text/xml, application/xml, text/plain;q=0.8, */*;q=0.5',
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Fetch failed for ${url}: ${response.status}`);
    }
    return response.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function loadDefaultOpml(): Promise<string> {
  const opmlPath = path.join(process.cwd(), 'public', 'feeds', 'kwin-city-news-feeds.opml');
  return fs.readFile(opmlPath, 'utf8');
}

function evidenceStatusFor(matchedTerms: string[]): EvidenceStatus {
  const normalized = matchedTerms.map((term) => term.toLowerCase());
  if (normalized.some((term) => term.includes('kiadb'))) {
    return 'contextual';
  }
  if (normalized.some((term) => term.includes('kwin'))) {
    return 'pending';
  }
  return 'contextual';
}

function recommendedAngleFor(matchedTerms: string[]): string {
  const normalized = matchedTerms.map((term) => term.toLowerCase());
  if (normalized.some((term) => term.includes('kwin'))) {
    return 'Lead with KWIN City relevance, then label what is verified, contextual, or still pending.';
  }
  if (normalized.some((term) => term.includes('doddaballapura') || term.includes('north bengaluru'))) {
    return 'Frame this as regional context for North Bengaluru rather than proof of a KWIN-specific milestone.';
  }
  if (normalized.some((term) => term.includes('semiconductor') || term.includes('aerospace'))) {
    return 'Use this as sector context and avoid implying a confirmed KWIN tenant or investment unless the source states it.';
  }
  return 'Use this as contextual intelligence and route readers to the portal evidence ledger for project-specific claims.';
}

export function scoreKwinRelevance(item: Pick<FeedItem, 'title' | 'summary' | 'source'>): {
  relevanceScore: number;
  matchedTerms: string[];
} {
  const haystack = `${item.title} ${item.summary} ${item.source}`.toLowerCase();
  let score = 0;
  const matchedTerms: string[] = [];

  for (const { term, weight } of RELEVANCE_TERMS) {
    if (haystack.includes(term)) {
      score += weight;
      matchedTerms.push(term);
    }
  }

  const sourceBoost = /google news|the hindu|deccan herald|times of india|new indian express/i.test(item.source) ? 4 : 0;
  const directKwinBoost = matchedTerms.some((term) => term.includes('kwin')) ? 18 : 0;
  const relevanceScore = Math.min(100, score + sourceBoost + directKwinBoost);

  return {
    relevanceScore,
    matchedTerms,
  };
}

export async function fetchKwinNewsSignals(): Promise<KwinNewsSignal[]> {
  const opmlXml = await loadDefaultOpml();
  const feedUrls = extractOpmlFeedUrls(opmlXml);
  const settled = await Promise.allSettled(
    feedUrls.map(async (feedUrl) => {
      const feedXml = await fetchTextWithTimeout(feedUrl);
      return parseFeed(feedXml, feedUrl);
    }),
  );

  const feedItems = settled.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));
  const deduped = new Map<string, FeedItem>();
  for (const item of feedItems) {
    const key = item.url || `${item.source}:${item.title}`;
    if (!deduped.has(key)) {
      deduped.set(key, item);
    }
  }

  return [...deduped.values()]
    .map((item) => {
      const { relevanceScore, matchedTerms } = scoreKwinRelevance(item);
      return {
        title: item.title,
        url: item.url,
        source: item.source,
        summary: item.summary,
        publishedAt: item.publishedAt,
        relevanceScore,
        matchedTerms,
        evidenceStatus: evidenceStatusFor(matchedTerms),
        recommendedAngle: recommendedAngleFor(matchedTerms),
      };
    })
    .filter((signal) => signal.relevanceScore >= 12)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 12);
}
