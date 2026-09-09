import { track } from '@vercel/analytics/react';

type ClientError = {
  name?: string;
  message: string;
  source: 'error-boundary' | 'window-error' | 'unhandled-rejection';
};

const MAX_MESSAGE_LENGTH = 500;

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
  window.addEventListener('error', (event) => reportClientError(event.error ?? event.message, 'window-error'));
  window.addEventListener('unhandledrejection', (event) => reportClientError(event.reason, 'unhandled-rejection'));
}
