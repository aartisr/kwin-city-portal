import { track } from '@vercel/analytics/react';

type ClientError = {
  name?: string;
  message: string;
  source: 'error-boundary' | 'window-error' | 'unhandled-rejection';
};

const MAX_MESSAGE_LENGTH = 500;

// Filter out benign or external browser extension errors (e.g. MetaMask, phantom, third-party wallet injects)
const IGNORED_ERROR_PATTERNS = [
  /metamask/i,
  /ethereum/i,
  /web3/i,
  /phantom/i,
  /coinbase/i,
  /chrome-extension:\/\//i,
  /moz-extension:\/\//i,
  /safari-extension:\/\//i,
  /failed to connect to metamask/i,
  /user rejected the request/i,
  /ResizeObserver loop limit exceeded/i,
  /Script error\./i,
];

function shouldIgnoreError(message: string): boolean {
  return IGNORED_ERROR_PATTERNS.some((pattern) => pattern.test(message));
}

function sanitize(value: string): string {
  return value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
    .replace(/\+?\d[\d\s().-]{7,}\d/g, '[redacted-phone]')
    .slice(0, MAX_MESSAGE_LENGTH);
}

export function trackPortalEvent(name: string, properties: Record<string, string | number | boolean | null> = {}) {
  if (!import.meta.env.PROD) return;
  track(name, properties);
}

export function reportClientError(error: unknown, source: ClientError['source']) {
  const normalized = error instanceof Error
    ? { name: error.name, message: error.message }
    : { name: 'UnknownError', message: String(error) };

  // If the error comes from an external browser extension (like MetaMask) or noise, ignore it
  if (shouldIgnoreError(normalized.message)) {
    return;
  }

  const payload: ClientError = { ...normalized, message: sanitize(normalized.message), source };

  trackPortalEvent('client_error', { source, error_name: payload.name ?? 'UnknownError' });
  if (!import.meta.env.PROD) return;

  const body = JSON.stringify({ ...payload, path: window.location.pathname, occurredAt: new Date().toISOString() });
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/client-error', new Blob([body], { type: 'application/json' }));
    return;
  }
  void fetch('/api/client-error', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
}

export function registerGlobalErrorHandlers() {
  window.addEventListener('error', (event) => {
    const rawMsg = String(event.error?.message || event.message || '');
    if (shouldIgnoreError(rawMsg)) {
      return;
    }
    reportClientError(event.error ?? event.message, 'window-error');
  });

  window.addEventListener('unhandledrejection', (event) => {
    const rawMsg = String(event.reason?.message || event.reason || '');
    if (shouldIgnoreError(rawMsg)) {
      event.preventDefault(); // prevent logging extension noise to console
      return;
    }
    reportClientError(event.reason, 'unhandled-rejection');
  });
}
