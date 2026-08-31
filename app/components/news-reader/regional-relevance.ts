export type RegionalPriority = {
  score: number;
  reasons: string[];
};

type SignalGroup = {
  label: string;
  score: number;
  pattern: RegExp;
};

const PRIORITY_SIGNALS: SignalGroup[] = [
  {
    label: 'infrastructure and connectivity',
    score: 36,
    pattern:
      /\b(?:infrastructure|metro|rail(?:way)?|road|highway|expressway|corridor|airport|transit|mobility|logistics|power|energy|water|sewerage|utility|utilities|industrial\s+park|data\s+cent(?:er|re)|construction)\b/i,
  },
  {
    label: 'investment and economic development',
    score: 34,
    pattern:
      /\b(?:invest(?:ment|or|ing)?|capital|funding|fundraise|manufactur(?:e|ing)|factory|plant|facility|campus|technology\s+hub|jobs?|employment|economic\s+(?:growth|development)|industrial\s+development|fdi|crore|billion|million)\b/i,
  },
  {
    label: 'policy, planning, or regulation',
    score: 32,
    pattern:
      /\b(?:policy|policies|regulation|regulatory|approval|approved|cabinet|budget|master\s+plan|development\s+plan|land\s+use|zoning|notification|ordinance|bill|act|government\s+order|tender|public-private|ppp|kiadb|bmrda|bda|bbmp)\b/i,
  },
];

const REGIONAL_CONTEXT =
  /\b(?:bengaluru|bangalore|karnataka|doddaballapura|devanahalli|north\s+bengaluru|north\s+bangalore)\b/i;

/** Explainable domain priority. This boosts strategic coverage; it never hides other news. */
export function scoreRegionalPriority(
  title: string,
  body: string,
): RegionalPriority {
  const titleMatches = PRIORITY_SIGNALS.filter((signal) =>
    signal.pattern.test(title),
  );
  const bodyMatches = PRIORITY_SIGNALS.filter((signal) =>
    signal.pattern.test(body),
  );
  const matched = PRIORITY_SIGNALS.filter(
    (signal) => titleMatches.includes(signal) || bodyMatches.includes(signal),
  );
  const reasons = matched.map((signal) => signal.label);
  const titleScore = titleMatches.reduce(
    (total, signal) => total + signal.score,
    0,
  );
  const bodyOnlyScore = bodyMatches
    .filter((signal) => !titleMatches.includes(signal))
    .reduce((total, signal) => total + Math.round(signal.score * 0.55), 0);
  const contextBoost =
    REGIONAL_CONTEXT.test(`${title} ${body}`) && matched.length ? 8 : 0;

  return {
    score: Math.min(100, titleScore + bodyOnlyScore + contextBoost),
    reasons,
  };
}
