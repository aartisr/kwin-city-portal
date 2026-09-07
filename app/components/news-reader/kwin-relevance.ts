export type KwinRelevance = {
  isRelevant: boolean;
  score: number;
  reasons: string[];
};

const IDENTITY_SIGNALS = [
  {
    label: 'KWIN City named in headline',
    pattern: /\bkwin[\s-]+city\b/i,
    titleScore: 100,
    bodyScore: 70,
  },
  {
    label: 'Knowledge Wellbeing Innovation City named',
    pattern:
      /\bknowledge\s*,?\s*well(?:being|ness)\s*(?:and|&)\s*innovation(?:\s+city)?\b/i,
    titleScore: 98,
    bodyScore: 68,
  },
  {
    label: 'KHIR City legacy name identified',
    pattern: /\bkhir[\s-]+city\b/i,
    titleScore: 88,
    bodyScore: 60,
  },
  {
    label: 'KWIN named explicitly',
    pattern: /\bkwin\b/i,
    titleScore: 82,
    bodyScore: 52,
  },
  {
    label: 'Kannada KWIN City named',
    pattern: /ಕ್ವಿನ್\s*ಸಿಟಿ/i,
    titleScore: 96,
    bodyScore: 66,
  },
] as const;

const CONTEXT_SIGNALS = [
  { label: 'Doddaballapura context', pattern: /\bdoddaballapura\b/i, score: 6 },
  { label: 'KIADB context', pattern: /\bkiadb\b/i, score: 5 },
  {
    label: 'North Bengaluru context',
    pattern: /\bnorth(?:ern)?\s+bengaluru\b/i,
    score: 4,
  },
  { label: 'Karnataka context', pattern: /\bkarnataka\b/i, score: 2 },
] as const;

/**
 * Classifies an article from its own editorial text only. Feed titles, search
 * queries, and OPML group names are intentionally excluded because discovery
 * providers can return false positives for even tightly scoped queries.
 */
export function scoreKwinRelevance(title: string, body: string): KwinRelevance {
  const cleanTitle = title.normalize('NFKC');
  const cleanBody = body.normalize('NFKC');
  const identity = IDENTITY_SIGNALS.find(
    (signal) =>
      signal.pattern.test(cleanTitle) || signal.pattern.test(cleanBody),
  );

  if (!identity) return { isRelevant: false, score: 0, reasons: [] };

  const titleMatch = identity.pattern.test(cleanTitle);
  let score = titleMatch ? identity.titleScore : identity.bodyScore;
  const reasons = [
    titleMatch
      ? identity.label
      : identity.label.replace('headline', 'article text'),
  ];

  for (const context of CONTEXT_SIGNALS) {
    if (context.pattern.test(`${cleanTitle} ${cleanBody}`)) {
      score += context.score;
      reasons.push(context.label);
    }
  }

  return { isRelevant: true, score: Math.min(100, score), reasons };
}
