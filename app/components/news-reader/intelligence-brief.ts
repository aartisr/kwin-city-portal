import type {
  EvidenceStatus,
  IntelligenceBrief,
  IntelligenceLens,
  ReaderCluster,
  ReaderItem,
} from './types';
import { getDomain } from './utils';

const UNAVAILABLE_SUMMARIES = new Set(['', 'Summary unavailable from this feed.']);

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function distinctPublisherCount(items: ReaderItem[]) {
  return new Set(items.map((item) => getDomain(item.originalLink || item.link)).filter(Boolean)).size;
}

function statusFor(items: ReaderItem[]): EvidenceStatus {
  if (items.some((item) => item.provenance === 'direct-institutional')) return 'confirmed-primary';
  if (distinctPublisherCount(items) > 1 && items.some((item) => item.provenance === 'direct-publisher')) return 'corroborated';
  if (items.some((item) => item.provenance === 'direct-publisher')) return 'publisher-reported';
  return 'discovery-only';
}

const STATUS_LABELS: Record<EvidenceStatus, string> = {
  'confirmed-primary': 'Primary evidence available',
  corroborated: 'Covered by multiple distinct publishers',
  'publisher-reported': 'Publisher-reported signal',
  'discovery-only': 'Discovery signal only',
};

function usableSummary(item: ReaderItem) {
  const summary = item.summary.trim();
  return !UNAVAILABLE_SUMMARIES.has(summary) && summary.toLowerCase() !== item.title.trim().toLowerCase()
    ? summary
    : '';
}

function buildUnknowns(item: ReaderItem, status: EvidenceStatus) {
  const unknowns: string[] = [];
  if (!usableSummary(item)) unknowns.push('The feed does not provide enough detail to verify the article beyond its headline.');
  if (!item.publishedAt) unknowns.push('The publisher did not provide a reliable publication timestamp.');
  if (status === 'discovery-only') unknowns.push('KWIN has not received this report through a direct publisher or institutional feed.');
  if (status !== 'confirmed-primary') unknowns.push('No primary document in this story cluster independently confirms the reported claim.');
  return unknowns;
}

function lensCopy(item: ReaderItem, status: EvidenceStatus): Record<IntelligenceLens, string> {
  const caution = status === 'confirmed-primary'
    ? 'A primary-source signal is present, but scope and implementation should still be checked.'
    : 'Treat this as a monitoring signal until primary evidence confirms scope and implementation.';
  const relevance = item.kwinRelevanceReasons?.[0] ?? 'This item matched KWIN’s monitored regional themes.';
  return {
    resident: `${relevance} ${caution}`,
    investor: `Use this as an early signal, not an investment conclusion. ${caution}`,
    government: `Review the named authority, policy instrument, funding and execution milestone before acting. ${caution}`,
    researcher: `The cluster preserves publisher, timestamp and provenance metadata for follow-up. ${caution}`,
  };
}

export function buildIntelligenceBrief(item: ReaderItem, cluster?: ReaderCluster, now = new Date()): IntelligenceBrief {
  const items = cluster?.items?.length ? cluster.items : [item];
  const publisherCount = distinctPublisherCount(items);
  const primaryCount = items.filter((entry) => entry.provenance === 'direct-institutional').length;
  const directPublisherCount = items.filter((entry) => entry.provenance === 'direct-publisher').length;
  const status = statusFor(items);
  const summary = usableSummary(item);
  const why = unique(item.kwinRelevanceReasons?.length ? item.kwinRelevanceReasons : cluster?.whyThisMatters ?? []);
  const known = [
    `KWIN observed ${items.length} report${items.length === 1 ? '' : 's'} from ${publisherCount} distinct publisher domain${publisherCount === 1 ? '' : 's'}.`,
    primaryCount ? `${primaryCount} report${primaryCount === 1 ? '' : 's'} came from a direct institutional feed.` : '',
    directPublisherCount ? `${directPublisherCount} report${directPublisherCount === 1 ? '' : 's'} came from a direct publisher feed.` : '',
    item.publishedAt ? `The selected report is dated ${new Date(item.publishedAt).toISOString()}.` : '',
  ];

  const timeline = [...items]
    .sort((a, b) => (new Date(a.publishedAt ?? 0).getTime() - new Date(b.publishedAt ?? 0).getTime()))
    .map((entry) => ({
      at: entry.publishedAt,
      label: entry.title,
      source: entry.source,
      provenance: entry.provenance,
    }));

  return {
    whatHappened: summary || `A monitored source published “${item.title}”. The feed supplied no independently usable article summary.`,
    whyItMatters: why.length ? why : ['This report appears in KWIN’s monitored intelligence feed.'],
    evidenceStatus: status,
    evidenceLabel: STATUS_LABELS[status],
    known: unique(known),
    unknown: buildUnknowns(item, status),
    timeline,
    lensCopy: lensCopy(item, status),
    questions: [
      {
        id: 'confirmed',
        question: 'Is this independently confirmed?',
        answer: status === 'confirmed-primary'
          ? 'A direct institutional source is present in this cluster. That confirms the source signal, but not every interpretation of it.'
          : `Not by primary evidence in this cluster. KWIN currently sees ${publisherCount} distinct publisher domain${publisherCount === 1 ? '' : 's'}.`,
      },
      {
        id: 'kwin',
        question: 'Why is this relevant to KWIN?',
        answer: why.length ? why.join(' ') : 'It matched the configured KWIN monitoring criteria; no stronger relevance explanation is available.',
      },
      {
        id: 'next',
        question: 'What should be verified next?',
        answer: status === 'confirmed-primary'
          ? 'Check the operative document, scope, funding, effective date and latest execution milestone.'
          : 'Look for an official order, agency publication, filing, tender, budget record or project-status update.',
      },
    ],
    generatedAt: now.toISOString(),
  };
}
