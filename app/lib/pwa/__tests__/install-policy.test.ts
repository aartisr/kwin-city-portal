import { describe, expect, it } from 'vitest';
import { shouldOfferInstall, type InstallPromptState } from '../install-policy';

const EMPTY: InstallPromptState = { installedAt: null, dismissedUntil: null, optedOut: false, lastShownAt: null, visitCount: 1 };
const NOW = Date.parse('2026-08-15T12:00:00Z');

function offer(state: InstallPromptState, overrides: Partial<Parameters<typeof shouldOfferInstall>[0]> = {}) {
  return shouldOfferInstall({
    state, now: NOW, isStandalone: false, isIos: false, hasNativePrompt: true,
    minimumIosVisits: 3, repeatOfferDays: 90, ...overrides,
  });
}

describe('PWA install prompt policy', () => {
  it('never prompts standalone, remembered-installed, or opted-out users', () => {
    expect(offer(EMPTY, { isStandalone: true })).toBe(false);
    expect(offer({ ...EMPTY, installedAt: NOW - 1 })).toBe(false);
    expect(offer({ ...EMPTY, optedOut: true })).toBe(false);
  });

  it('honors both dismissal and repeat-offer cooldowns', () => {
    expect(offer({ ...EMPTY, dismissedUntil: NOW + 1 })).toBe(false);
    expect(offer({ ...EMPTY, lastShownAt: NOW - 30 * 86_400_000 })).toBe(false);
    expect(offer({ ...EMPTY, lastShownAt: NOW - 91 * 86_400_000 })).toBe(true);
  });

  it('requires engagement before showing manual iOS instructions', () => {
    expect(offer({ ...EMPTY, visitCount: 2 }, { isIos: true, hasNativePrompt: false })).toBe(false);
    expect(offer({ ...EMPTY, visitCount: 3 }, { isIos: true, hasNativePrompt: false })).toBe(true);
  });

  it('does not invent manual-install eligibility for unsupported browsers', () => {
    expect(offer(EMPTY, { isIos: false, hasNativePrompt: false })).toBe(false);
  });
});
