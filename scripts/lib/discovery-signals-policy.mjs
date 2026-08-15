const REQUIRED_LAYOUT_SIGNALS = Object.freeze([
  { id: 'llms-policy', pattern: /["']llms-policy["']\s*:\s*`\$\{SITE_URL\}\/llms\.txt`/ },
  { id: 'ai-policy', pattern: /["']ai-policy["']\s*:\s*`\$\{SITE_URL\}\/ai\.txt`/ },
  { id: 'google-verification', pattern: /google\s*:\s*GOOGLE_SITE_VERIFICATION/ },
]);

export function verifyDiscoveryLayout(layout) {
  if (typeof layout !== 'string' || !layout.trim()) throw new Error('app/layout.tsx is empty or unreadable.');
  for (const signal of REQUIRED_LAYOUT_SIGNALS) {
    if (!signal.pattern.test(layout)) throw new Error(`app/layout.tsx is missing required discovery signal: ${signal.id}`);
  }
  return { status: 'healthy', signals: REQUIRED_LAYOUT_SIGNALS.map(({ id }) => id) };
}
