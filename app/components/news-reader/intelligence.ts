import type { ReaderCluster, ReaderItem, ReaderSortMode } from './types';
import { getDomain } from './utils';
import { scoreRegionalPriority } from './regional-relevance';

const STOP_WORDS = new Set(['a', 'an', 'and', 'are', 'at', 'be', 'by', 'for', 'from', 'in', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'with']);

function tokens(value: string) {
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((token) => token.length > 2 && !STOP_WORDS.has(token)),
  );
}

function overlap(a: Set<string>, b: Set<string>) {
  let shared = 0;
  for (const token of a) if (b.has(token)) shared += 1;
  return shared / Math.max(1, Math.min(a.size, b.size));
}

function sourceWeight(item: ReaderItem) {
  if (item.provenance === 'direct-institutional') return 70;
  if (item.provenance === 'direct-publisher') return 55;
  if (item.provenance === 'source-filtered-discovery') return 30;
  return 15;
}

export function scoreReaderItem(item: ReaderItem, now = Date.now()) {
  const published = item.publishedAt ? new Date(item.publishedAt).getTime() : 0;
  const ageHours = published ? Math.max(0, (now - published) / 3_600_000) : 168;
  const recency = Math.max(0, 30 - Math.min(30, ageHours / 8));
  const specificity = Math.min(12, tokens(`${item.title} ${item.summary}`).size / 2);
  return Math.round(sourceWeight(item) + recency + specificity);
}

export function explainReaderRank(item: ReaderItem, clusterSize = 1) {
  const reasons: string[] = [];
  if (item.provenance === 'direct-institutional') reasons.push('direct institutional publication');
  else if (item.provenance === 'direct-publisher') reasons.push('direct publisher feed');
  else if (item.provenance === 'source-filtered-discovery') reasons.push('source-filtered discovery signal');
  else reasons.push('contextual monitoring signal');
  if (item.publishedAt && Date.now() - new Date(item.publishedAt).getTime() < 86_400_000) reasons.push('published in the last 24 hours');
  if (clusterSize > 1) reasons.push(`${clusterSize} independent sources cover this story`);
  return reasons;
}

export function clusterReaderItems(items: ReaderItem[]): ReaderCluster[] {
  const clusters: Array<{ items: ReaderItem[]; tokens: Set<string> }> = [];
  for (const item of items) {
    const itemTokens = tokens(item.title);
    const target = clusters.find((cluster) => overlap(cluster.tokens, itemTokens) >= 0.62);
    if (target) {
      target.items.push(item);
      itemTokens.forEach((token) => target.tokens.add(token));
    } else {
      clusters.push({ items: [item], tokens: itemTokens });
    }
  }

  return clusters.map((cluster) => {
    const itemsByScore = [...cluster.items].sort((a, b) => scoreReaderItem(b) - scoreReaderItem(a));
    const representative = itemsByScore[0];
    const domains = new Set(cluster.items.map((item) => getDomain(item.originalLink || item.link)));
    const bestTier = cluster.items.some((item) => item.provenance === 'direct-institutional')
      ? 'institutional'
      : cluster.items.some((item) => item.provenance === 'direct-publisher')
        ? 'publisher'
        : 'discovery';
    return {
      id: `${representative.link}-${representative.title}`,
      title: representative.title,
      summary: representative.summary,
      representative,
      items: itemsByScore,
      sourceCount: domains.size,
      confidence: bestTier === 'institutional' ? 'high' : bestTier === 'publisher' ? 'medium' : 'contextual',
      whyThisMatters: explainReaderRank(representative, domains.size),
      score: scoreReaderItem(representative) + Math.min(15, Math.max(0, domains.size - 1) * 5),
    };
  });
}

export function sortReaderClusters(clusters: ReaderCluster[], sort: ReaderSortMode) {
  return [...clusters].sort((a, b) => {
    if (sort === 'source-breadth') return b.sourceCount - a.sourceCount || b.score - a.score;
    if (sort === 'newest') {
      const aTime = a.representative.publishedAt ? new Date(a.representative.publishedAt).getTime() : 0;
      const bTime = b.representative.publishedAt ? new Date(b.representative.publishedAt).getTime() : 0;
      return bTime - aTime;
    }
    return b.score - a.score;
  });
}

function publishedTime(item: ReaderItem): number {
  return item.publishedAt ? new Date(item.publishedAt).getTime() : 0;
}

/** KWIN coverage uses an explicit relevance rank, independent of workspace sort. */
export function rankKwinClusters(clusters: ReaderCluster[]): ReaderCluster[] {
  return clusters
    .map((cluster) => {
      const relevantItems = cluster.items
        .filter((item) => item.isKwinRelated)
        .sort((a, b) =>
          (b.kwinRelevanceScore ?? 0) - (a.kwinRelevanceScore ?? 0)
          || publishedTime(b) - publishedTime(a));
      const representative = relevantItems[0];
      if (!representative) return null;

      return {
        ...cluster,
        id: `${representative.link}-${representative.title}`,
        title: representative.title,
        summary: representative.summary,
        representative,
        items: [...relevantItems, ...cluster.items.filter((item) => !item.isKwinRelated)],
        whyThisMatters: representative.kwinRelevanceReasons?.length
          ? representative.kwinRelevanceReasons
          : cluster.whyThisMatters,
      } satisfies ReaderCluster;
    })
    .filter((cluster): cluster is ReaderCluster => cluster !== null)
    .sort((a, b) =>
      (b.representative.kwinRelevanceScore ?? 0) - (a.representative.kwinRelevanceScore ?? 0)
      || publishedTime(b.representative) - publishedTime(a.representative));
}

/** Strategic regional domains rank first; source confidence and recency break ties. */
export function rankRegionalClusters(clusters: ReaderCluster[]): ReaderCluster[] {
  return clusters
    .map((cluster) => {
      const priority = scoreRegionalPriority(cluster.title, cluster.summary);
      return {
        ...cluster,
        whyThisMatters: priority.reasons.length ? priority.reasons : cluster.whyThisMatters,
        score: cluster.score + priority.score,
      };
    })
    .sort((a, b) => b.score - a.score || publishedTime(b.representative) - publishedTime(a.representative));
}
