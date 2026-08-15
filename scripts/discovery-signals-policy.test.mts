// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { verifyDiscoveryLayout } from './lib/discovery-signals-policy.mjs';

const valid = `
  verification: { google: GOOGLE_SITE_VERIFICATION },
  other: {
    "ai-policy": \`\${SITE_URL}/ai.txt\`,
    "llms-policy": \`\${SITE_URL}/llms.txt\`,
  }
`;

describe('discovery layout policy', () => {
  it('accepts semantic signals independent of quote style and whitespace', () => {
    expect(verifyDiscoveryLayout(valid).signals).toEqual(['llms-policy', 'ai-policy', 'google-verification']);
    expect(verifyDiscoveryLayout(valid.replaceAll('"', "'").replace('google:', 'google :')).status).toBe('healthy');
  });

  it.each([
    ['llms-policy', valid.replace('"llms-policy"', '"missing-llms"')],
    ['ai-policy', valid.replace('"ai-policy"', '"missing-ai"')],
    ['google-verification', valid.replace('GOOGLE_SITE_VERIFICATION', '"hard-coded-value"')],
  ])('fails closed when %s is absent', (signal, layout) => {
    expect(() => verifyDiscoveryLayout(layout)).toThrow(signal);
  });

  it('rejects an empty layout', () => {
    expect(() => verifyDiscoveryLayout('')).toThrow(/empty or unreadable/);
  });
});
