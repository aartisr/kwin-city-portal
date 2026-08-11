// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('initPostHog', () => {
  const originalEnabled = process.env.NEXT_PUBLIC_POSTHOG_ENABLED;
  const originalKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  beforeEach(() => {
    vi.resetModules();
    process.env.NEXT_PUBLIC_POSTHOG_ENABLED = 'true';
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test_key';

    const firstScript = { parentNode: { insertBefore: vi.fn() } };
    vi.stubGlobal('window', {});
    vi.stubGlobal('document', {
      createElement: vi.fn(() => ({})),
      getElementsByTagName: vi.fn(() => [firstScript]),
      head: { appendChild: vi.fn() },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    if (originalEnabled === undefined) delete process.env.NEXT_PUBLIC_POSTHOG_ENABLED;
    else process.env.NEXT_PUBLIC_POSTHOG_ENABLED = originalEnabled;
    if (originalKey === undefined) delete process.env.NEXT_PUBLIC_POSTHOG_KEY;
    else process.env.NEXT_PUBLIC_POSTHOG_KEY = originalKey;
  });

  it('uses PostHog’s [apiKey, config] initialization queue format', async () => {
    const { initPostHog } = await import('../posthog');

    expect(initPostHog()).toBe(true);

    const queuedInitializations = (window.posthog as unknown as { _i: unknown[][] })._i;
    expect(queuedInitializations).toHaveLength(1);
    expect(queuedInitializations[0]).toEqual([
      'phc_test_key',
      expect.objectContaining({ api_host: 'https://us.i.posthog.com' }),
    ]);
  });
});
