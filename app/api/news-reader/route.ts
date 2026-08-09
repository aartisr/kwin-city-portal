import { NextRequest, NextResponse } from 'next/server';
import {
  classifyReaderSourceTier,
  parseReaderFeedsFromOpml,
  type ReaderSourceFeed,
} from '@/components/news-reader/source-registry';

type FeedItem = {
  title: string;
  link: string;
  summary: string;
  fullContent: string;
  source: string;
  sourceFeedUrl: string;
  sourceTier: 'primary' | 'official' | 'contextual';
  publishedAt: string | null;
};

type FeedEntry = ReaderSourceFeed;

type TierBuckets = Record<FeedItem['sourceTier'], FeedItem[]>;

const TIER_ORDER: FeedItem['sourceTier'][] = ['contextual', 'official', 'primary'];
const TIER_TARGET_SHARES: Record<FeedItem['sourceTier'], number> = {
  contextual: 0.5,
  official: 0.3,
  primary: 0.2,
};

const DEFAULT_LIMIT = 36;
const MAX_LIMIT = 100;
const MAX_FEEDS = 20;
const REQUEST_TIMEOUT_MS = 9000;
const CACHE_TTL_MS = 3 * 60 * 1000;

type ReaderPayload = {
  opmlUrl: string;
  feedCount: number;
  itemCount: number;
  generatedAt: string;
  items: FeedItem[];
  cache: {
    hit: boolean;
    ttlMs: number;
  };
};

type CacheEntry = {
  expiresAt: number;
  payload: ReaderPayload;
};

const routeCache: Map<string, CacheEntry> = new Map();

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

function summarize(input: string, maxLen = 260): string {
  const clean = stripHtml(input);
  if (!clean) {
    return 'Summary unavailable. Open the original source to read the full article.';
  }
  if (clean.length <= maxLen) {
    return clean;
  }
  return `${clean.slice(0, maxLen).trimEnd()}...`;
}

function getTagValue(block: string, tags: string[]): string {
  for (const tag of tags) {
    const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
    if (match && match[1]) {
      return decodeEntities(match[1]);
    }
  }
  return '';
}

function getAtomLink(block: string): string {
  const alternate = block.match(/<link\b[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  if (alternate && alternate[1]) {
    return decodeEntities(alternate[1]);
  }
  const generic = block.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i);
  return generic?.[1] ? decodeEntities(generic[1]) : '';
}

function parseDateMaybe(input: string): string | null {
  if (!input) {
    return null;
  }
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) {
    return null;
  }
  return d.toISOString();
}

function compareByPublishedAtDesc(a: FeedItem, b: FeedItem): number {
  const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
  const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
  return bTime - aTime;
}

function buildTierTargets(limit: number): Record<FeedItem['sourceTier'], number> {
  const rawTargets = TIER_ORDER.map((tier) => {
    const exact = limit * TIER_TARGET_SHARES[tier];
    return {
      tier,
      floor: Math.floor(exact),
      remainder: exact - Math.floor(exact),
    };
  });

  const targets: Record<FeedItem['sourceTier'], number> = {
    contextual: rawTargets.find((entry) => entry.tier === 'contextual')?.floor ?? 0,
    official: rawTargets.find((entry) => entry.tier === 'official')?.floor ?? 0,
    primary: rawTargets.find((entry) => entry.tier === 'primary')?.floor ?? 0,
  };

  let assigned = targets.contextual + targets.official + targets.primary;
  const orderedRemainders = [...rawTargets].sort((a, b) => b.remainder - a.remainder || TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier));

  for (const entry of orderedRemainders) {
    if (assigned >= limit) {
      break;
    }
    targets[entry.tier] += 1;
    assigned += 1;
  }

  if (limit > 0 && targets.contextual === 0) {
    targets.contextual = 1;
    if (targets.primary > 0) {
      targets.primary -= 1;
    } else if (targets.official > 0) {
      targets.official -= 1;
    }
  }

  const total = targets.contextual + targets.official + targets.primary;
  if (total > limit) {
    let overflow = total - limit;
    for (const tier of ['primary', 'official', 'contextual'] as const) {
      while (overflow > 0 && targets[tier] > 0) {
        targets[tier] -= 1;
        overflow -= 1;
      }
    }
  }

  return targets;
}

function selectBalancedStories(items: FeedItem[], limit: number): FeedItem[] {
  const buckets: TierBuckets = {
    primary: [],
    official: [],
    contextual: [],
  };

  for (const item of items) {
    buckets[item.sourceTier].push(item);
  }

  for (const tier of TIER_ORDER) {
    buckets[tier].sort(compareByPublishedAtDesc);
  }

  const selected: FeedItem[] = [];
  const targets = buildTierTargets(limit);

  for (const tier of TIER_ORDER) {
    const take = Math.min(targets[tier], buckets[tier].length);
    selected.push(...buckets[tier].splice(0, take));
  }

  while (selected.length < limit) {
    let added = false;
    for (const tier of TIER_ORDER) {
      const item = buckets[tier].shift();
      if (item) {
        selected.push(item);
        added = true;
        if (selected.length >= limit) {
          break;
        }
      }
    }

    if (!added) {
      break;
    }
  }

  return selected.sort(compareByPublishedAtDesc);
}

function parseFeedItems(feedXml: string, feedEntry: FeedEntry, perFeedLimit: number): FeedItem[] {
  const source =
    stripHtml(getTagValue(feedXml, ['channel>title', 'title'])) ||
    new URL(feedEntry.xmlUrl).hostname.replace(/^www\./, '');

  const sourceTier = classifyReaderSourceTier(feedEntry);

  const rssItems = feedXml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const atomEntries = feedXml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];

  const parsed: FeedItem[] = [];

  for (const item of rssItems.slice(0, perFeedLimit)) {
    const title = stripHtml(getTagValue(item, ['title'])) || 'Untitled article';
    const link = decodeEntities(getTagValue(item, ['link']));
    const summaryText = getTagValue(item, ['description', 'content:encoded', 'content']);
    const published = parseDateMaybe(getTagValue(item, ['pubDate', 'dc:date', 'published', 'updated']));
    if (!link) {
      continue;
    }
    const fullText = stripHtml(summaryText);
    parsed.push({
      title,
      link,
      summary: summarize(summaryText),
      fullContent: fullText.length > 5000 ? `${fullText.slice(0, 5000)}…` : fullText,
      source,
      sourceFeedUrl: feedEntry.xmlUrl,
      sourceTier,
      publishedAt: published,
    });
  }

  for (const entry of atomEntries.slice(0, perFeedLimit)) {
    const title = stripHtml(getTagValue(entry, ['title'])) || 'Untitled article';
    const link = getAtomLink(entry);
    const summaryText = getTagValue(entry, ['summary', 'content']);
    const published = parseDateMaybe(getTagValue(entry, ['published', 'updated']));
    if (!link) {
      continue;
    }
    const fullText = stripHtml(summaryText);
    parsed.push({
      title,
      link,
      summary: summarize(summaryText),
      fullContent: fullText.length > 5000 ? `${fullText.slice(0, 5000)}…` : fullText,
      source,
      sourceFeedUrl: feedEntry.xmlUrl,
      sourceTier,
      publishedAt: published,
    });
  }

  return parsed;
}

function isLocalOrPrivateHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === 'localhost' || host === '::1') {
    return true;
  }
  if (/^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host)) {
    return true;
  }
  const match172 = host.match(/^172\.(\d{1,3})\./);
  if (match172) {
    const second = Number(match172[1]);
    if (second >= 16 && second <= 31) {
      return true;
    }
  }
  return false;
}

async function fetchTextWithTimeout(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'KWINNewsReader/1.0 (+https://kwin-city.com)',
        Accept: 'application/rss+xml, application/atom+xml, text/xml, application/xml, text/plain;q=0.8, */*;q=0.5',
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Fetch failed for ${url}: ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function resolveOpmlUrl(rawOpmlUrl: string, requestUrl: string): string {
  const requestOrigin = new URL(requestUrl);
  const resolved = new URL(rawOpmlUrl, `${requestOrigin.protocol}//${requestOrigin.host}`);
  if (!['http:', 'https:'].includes(resolved.protocol)) {
    throw new Error('Only HTTP(S) OPML URLs are allowed.');
  }

  // Same-origin OPML paths are safe and should work in local development.
  const isSameOriginHost = resolved.hostname.toLowerCase() === requestOrigin.hostname.toLowerCase();
  if (!isSameOriginHost && isLocalOrPrivateHost(resolved.hostname)) {
    throw new Error('Private network OPML URLs are not allowed.');
  }
  return resolved.toString();
}

export async function GET(request: NextRequest) {
  try {
    const opmlUrlRaw = request.nextUrl.searchParams.get('opmlUrl') ?? '/feeds/kwin-city-news-feeds.opml';
    const limitRaw = request.nextUrl.searchParams.get('limit') ?? `${DEFAULT_LIMIT}`;
    const limit = Math.min(Math.max(Number(limitRaw) || DEFAULT_LIMIT, 1), MAX_LIMIT);

    const opmlUrl = resolveOpmlUrl(opmlUrlRaw, request.url);
    const cacheKey = `${opmlUrl}::${limit}`;
    const now = Date.now();
    const cached = routeCache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
      return NextResponse.json({
        ...cached.payload,
        cache: {
          hit: true,
          ttlMs: Math.max(0, cached.expiresAt - now),
        },
      });
    }

    const opmlXml = await fetchTextWithTimeout(opmlUrl);
    const feedEntries = parseReaderFeedsFromOpml(opmlXml).slice(0, MAX_FEEDS);
    const feedUrls = feedEntries.map((entry) => entry.xmlUrl);

    if (feedUrls.length === 0) {
      return NextResponse.json(
        { error: 'No feed URLs found in the provided OPML file.' },
        { status: 400 }
      );
    }

    const perFeedLimit = Math.max(4, Math.ceil(limit / Math.min(feedUrls.length, 8)));
    const settled = await Promise.allSettled(
      feedEntries.map(async (feedEntry) => {
        const feedXml = await fetchTextWithTimeout(feedEntry.xmlUrl);
        return parseFeedItems(feedXml, feedEntry, perFeedLimit);
      })
    );

    const combined: FeedItem[] = [];
    for (const result of settled) {
      if (result.status === 'fulfilled') {
        combined.push(...result.value);
      }
    }

    const dedupedMap = new Map<string, FeedItem>();
    for (const item of combined) {
      const key = `${item.link}::${item.title}`;
      if (!dedupedMap.has(key)) {
        dedupedMap.set(key, item);
      }
    }

    const sorted = selectBalancedStories([...dedupedMap.values()], limit);

    const payload: ReaderPayload = {
      opmlUrl,
      feedCount: feedUrls.length,
      itemCount: sorted.length,
      generatedAt: new Date().toISOString(),
      items: sorted,
      cache: {
        hit: false,
        ttlMs: CACHE_TTL_MS,
      },
    };

    routeCache.set(cacheKey, {
      expiresAt: now + CACHE_TTL_MS,
      payload,
    });

    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load reader data.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
