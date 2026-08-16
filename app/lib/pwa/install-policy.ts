export const PWA_INSTALL_STORAGE_KEYS = {
  installedAt: 'kwin-pwa-installed-at',
  dismissedUntil: 'kwin-pwa-install-dismissed-until',
  optedOut: 'kwin-pwa-install-opted-out',
  lastShownAt: 'kwin-pwa-install-last-shown-at',
  visitCount: 'kwin-pwa-install-visit-count',
  visitSession: 'kwin-pwa-install-visit-session',
  legacyDismissedAt: 'kwin-pwa-install-dismissed-at',
} as const;

export type InstallPromptState = {
  installedAt: number | null;
  dismissedUntil: number | null;
  optedOut: boolean;
  lastShownAt: number | null;
  visitCount: number;
};

function validTimestamp(value: string | null) {
  const parsed = Number(value);
  return value && Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function readInstallPromptState(storage: Pick<Storage, 'getItem'>, dismissalDays = 30): InstallPromptState {
  const visits = Number(storage.getItem(PWA_INSTALL_STORAGE_KEYS.visitCount));
  const explicitDismissal = validTimestamp(storage.getItem(PWA_INSTALL_STORAGE_KEYS.dismissedUntil));
  const legacyDismissedAt = validTimestamp(storage.getItem(PWA_INSTALL_STORAGE_KEYS.legacyDismissedAt));
  return {
    installedAt: validTimestamp(storage.getItem(PWA_INSTALL_STORAGE_KEYS.installedAt)),
    dismissedUntil: explicitDismissal ?? (legacyDismissedAt ? legacyDismissedAt + dismissalDays * 86_400_000 : null),
    optedOut: storage.getItem(PWA_INSTALL_STORAGE_KEYS.optedOut) === 'true',
    lastShownAt: validTimestamp(storage.getItem(PWA_INSTALL_STORAGE_KEYS.lastShownAt)),
    visitCount: Number.isFinite(visits) && visits > 0 ? Math.floor(visits) : 0,
  };
}

export function shouldOfferInstall({
  state,
  now,
  isStandalone,
  isIos,
  hasNativePrompt,
  minimumIosVisits,
  repeatOfferDays,
}: {
  state: InstallPromptState;
  now: number;
  isStandalone: boolean;
  isIos: boolean;
  hasNativePrompt: boolean;
  minimumIosVisits: number;
  repeatOfferDays: number;
}) {
  if (isStandalone || state.installedAt || state.optedOut) return false;
  if (state.dismissedUntil && state.dismissedUntil > now) return false;
  const repeatAfter = repeatOfferDays * 24 * 60 * 60 * 1000;
  if (state.lastShownAt && now - state.lastShownAt < repeatAfter) return false;
  if (hasNativePrompt) return true;
  return isIos && state.visitCount >= minimumIosVisits;
}

export function recordVisit(local: Storage, session: Storage) {
  if (session.getItem(PWA_INSTALL_STORAGE_KEYS.visitSession) === 'true') {
    return readInstallPromptState(local).visitCount;
  }
  const next = readInstallPromptState(local).visitCount + 1;
  local.setItem(PWA_INSTALL_STORAGE_KEYS.visitCount, String(next));
  session.setItem(PWA_INSTALL_STORAGE_KEYS.visitSession, 'true');
  return next;
}
