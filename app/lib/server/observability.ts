type ApiRouteErrorPayload = {
  method: string;
  path: string;
  requestId: string;
  context?: Record<string, unknown>;
};

type ApmProvider = 'none' | 'sentry' | 'datadog';

type SentryLike = {
  captureException?: (error: Error, payload?: unknown) => void;
};

type DatadogLike = {
  captureException?: (error: Error, payload?: unknown) => void;
};

function resolveProvider(): ApmProvider {
  const raw = (process.env.KWIN_APM_PROVIDER || 'none').trim().toLowerCase();
  if (raw === 'sentry' || raw === 'datadog') {
    return raw;
  }
  return 'none';
}

function captureWithSentry(error: Error, payload: ApiRouteErrorPayload): void {
  const sentry = (globalThis as { Sentry?: SentryLike }).Sentry;
  if (!sentry?.captureException) {
    return;
  }

  sentry.captureException(error, {
    tags: {
      route: payload.path,
      method: payload.method,
    },
    extra: {
      requestId: payload.requestId,
      ...(payload.context || {}),
    },
  });
}

function captureWithDatadog(error: Error, payload: ApiRouteErrorPayload): void {
  const datadog = (globalThis as { DD_APM?: DatadogLike }).DD_APM;
  if (!datadog?.captureException) {
    return;
  }

  datadog.captureException(error, {
    route: payload.path,
    method: payload.method,
    requestId: payload.requestId,
    ...(payload.context || {}),
  });
}

/**
 * Optional APM bridge.
 * - Works as a no-op when no external APM SDK is configured.
 * - Preserves requestId correlation when an SDK is available.
 */
export function captureApiRouteException(error: Error, payload: ApiRouteErrorPayload): void {
  const provider = resolveProvider();
  if (provider === 'sentry') {
    captureWithSentry(error, payload);
    return;
  }

  if (provider === 'datadog') {
    captureWithDatadog(error, payload);
  }
}
