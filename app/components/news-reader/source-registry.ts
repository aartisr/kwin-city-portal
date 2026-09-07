import type { ReaderProvenance, ReaderSourceTier } from './types';

export type ReaderSourceFeed = {
  xmlUrl: string;
  htmlUrl?: string;
  title: string;
  groupPath: string[];
};

type SourceTierRule = {
  tier: ReaderSourceTier;
  groupMatch: RegExp;
};

const SOURCE_TIER_RULES: SourceTierRule[] = [
  {
    tier: 'primary',
    groupMatch: /^(Bengaluru Local Desk Feeds|Direct Publisher Feeds)$/i,
  },
  {
    tier: 'official',
    groupMatch: /^(Official Government Discovery Queries \(Verify Original Link\)|Official Government, State & Central Original-Source Signals|Official Government, State & Central Institutional Signals)$/i,
  },
  {
    tier: 'contextual',
    groupMatch: /^(KWIN Critical Alerts|Publisher-Specific KWIN Filters|KWIN Precision Watch|Strategic Context Signals)$/i,
  },
];

const OFFICIAL_HOSTS = new Set([
  'gov.in',
  'nic.in',
  'rbi.org.in',
  'pib.gov.in',
]);

function decodeEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function getAttribute(block: string, attributeName: string): string {
  const match = block.match(new RegExp(`${attributeName}=(['"])(.*?)\\1`, 'i'));
  return match?.[2] ? decodeEntities(match[2]) : '';
}

function normalizeHostname(value: string): string {
  return value.toLowerCase().replace(/^www\./, '');
}

function getHostname(url: string): string {
  try {
    return normalizeHostname(new URL(url).hostname);
  } catch {
    return '';
  }
}

function isOfficialHostname(hostname: string): boolean {
  if (!hostname) {
    return false;
  }

  return hostname.endsWith('.gov.in') || hostname.endsWith('.nic.in') || OFFICIAL_HOSTS.has(hostname);
}

export function classifyReaderSourceTier(feed: ReaderSourceFeed): ReaderSourceTier {
  const hostname = getHostname(feed.xmlUrl) || getHostname(feed.htmlUrl ?? '');

  if (hostname === 'news.google.com') {
    return 'contextual';
  }

  for (const rule of SOURCE_TIER_RULES) {
    if (feed.groupPath.some((segment) => rule.groupMatch.test(segment))) {
      return rule.tier;
    }
  }

  if (isOfficialHostname(hostname)) {
    return 'official';
  }

  return 'contextual';
}

export function getReaderProvenance(feed: ReaderSourceFeed): ReaderProvenance {
  const hostname = getHostname(feed.xmlUrl);
  if (hostname === 'news.google.com') {
    return feed.groupPath.some((segment) => /Official Government/i.test(segment))
      ? 'source-filtered-discovery'
      : 'contextual-monitoring';
  }

  if (classifyReaderSourceTier(feed) === 'official') return 'direct-institutional';
  if (feed.groupPath.some((segment) => /Direct Publisher|Local Desk/i.test(segment))) return 'direct-publisher';
  return 'contextual-monitoring';
}

export function parseReaderFeedsFromOpml(opmlXml: string): ReaderSourceFeed[] {
  const bodyMatch = opmlXml.match(/<body[\s\S]*<\/body>/i);
  if (!bodyMatch) {
    return [];
  }

  const body = bodyMatch[0];
  const tokenPattern = /<outline\b[^>]*\/?>|<\/outline>/gi;
  const feedEntries: ReaderSourceFeed[] = [];
  const stack: Array<{ title: string }> = [];

  for (const token of body.match(tokenPattern) ?? []) {
    if (token.startsWith('</outline')) {
      stack.pop();
      continue;
    }

    const isSelfClosing = token.endsWith('/>');
    const text = getAttribute(token, 'text') || getAttribute(token, 'title');
    const xmlUrl = getAttribute(token, 'xmlUrl');
    const htmlUrl = getAttribute(token, 'htmlUrl');

    if (xmlUrl) {
      feedEntries.push({
        xmlUrl,
        htmlUrl: htmlUrl || undefined,
        title: text || xmlUrl,
        groupPath: stack.map((entry) => entry.title).filter(Boolean),
      });
      continue;
    }

    if (!isSelfClosing) {
      stack.push({ title: text });
    }
  }

  return feedEntries;
}
