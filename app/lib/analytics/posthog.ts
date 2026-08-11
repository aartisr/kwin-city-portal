'use client';

type PostHogCaptureProperties = Record<string, unknown>;

type PostHogLike = {
  init: (token: string, config: Record<string, unknown>) => void;
  capture: (event: string, properties?: PostHogCaptureProperties) => void;
  identify?: (distinctId: string, userProperties?: Record<string, unknown>) => void;
  set_config?: (config: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    posthog?: PostHogLike;
    __kwinPosthogInitialized?: boolean;
    __kwinPosthogDisabledNotified?: boolean;
  }
}

const DEFAULT_POSTHOG_HOST = 'https://us.i.posthog.com';

function normalizeHost(host: string): string {
  return host.replace(/\/$/, '');
}

function readPostHogConfig() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim() || '';
  const host = normalizeHost(process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || DEFAULT_POSTHOG_HOST);
  const enabled = process.env.NEXT_PUBLIC_POSTHOG_ENABLED === 'true' && key.length > 0;

  return {
    key,
    host,
    enabled,
  };
}

function injectPostHogSnippet(host: string) {
  // PostHog's lightweight queueing snippet keeps events safe until SDK is loaded.
  // Adapted from PostHog official bootstrap with strict guards for idempotency.
  type SnippetPostHog = Record<string, unknown> & {
    _i?: unknown[];
    __SV?: number;
    init?: (token: string, config: Record<string, unknown>) => void;
  };

  if (window.posthog && typeof window.posthog.init === 'function' && Array.isArray((window.posthog as unknown as SnippetPostHog)._i)) {
    return;
  }

  const posthog: SnippetPostHog = (window.posthog as unknown as SnippetPostHog | undefined) ?? {};
  window.posthog = posthog as unknown as PostHogLike;

  if ((posthog as { __SV?: number }).__SV) {
    return;
  }

  const queue: unknown[] = [];
  posthog._i = queue;

  const methods = [
    'capture',
    'identify',
    'alias',
    'group',
    'setPersonProperties',
    'setPersonPropertiesForFlags',
    'reset',
    'isFeatureEnabled',
    'reloadFeatureFlags',
    'onFeatureFlags',
    'set_config',
  ];

  const factory = (method: string) => {
    return (...args: unknown[]) => {
      queue.push([method, ...args]);
    };
  };

  for (const method of methods) {
    (posthog as Record<string, unknown>)[method] = factory(method);
  }

  posthog.init = (token: string, config: Record<string, unknown>) => {
    // PostHog's loader consumes `_i` as `[apiKey, config, instanceName?]`.
    // Do not prefix this tuple with `init`: doing so makes the loader treat the
    // API key string as its config object and crashes during initialization.
    queue.push([token, config]);

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `${host}/static/array.js`;

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  };

  posthog.__SV = 1;
}

export function initPostHog(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (window.__kwinPosthogInitialized) {
    return true;
  }

  const config = readPostHogConfig();
  if (!config.enabled) {
    if (process.env.NODE_ENV !== 'production' && !window.__kwinPosthogDisabledNotified) {
      window.__kwinPosthogDisabledNotified = true;
      console.info(
        '[PostHog] Disabled: set NEXT_PUBLIC_POSTHOG_ENABLED=true and provide NEXT_PUBLIC_POSTHOG_KEY to enable analytics.',
      );
    }
    return false;
  }

  try {
    injectPostHogSnippet(config.host);

    window.posthog?.init(config.key, {
      api_host: config.host,
      persistence: 'localStorage+cookie',
      autocapture: true,
      capture_pageview: false,
      capture_pageleave: true,
      loaded: () => {
        window.posthog?.set_config?.({
          sanitize_properties: true,
        });
      },
    });

    window.__kwinPosthogInitialized = true;
    return true;
  } catch {
    return false;
  }
}

export function capturePostHogEvent(event: string, properties?: PostHogCaptureProperties) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!window.__kwinPosthogInitialized || !window.posthog) {
    return;
  }

  try {
    window.posthog.capture(event, properties);
  } catch {
    // No-op by design. Analytics must never affect UX.
  }
}

export function identifyPostHogUser(distinctId: string, userProperties?: Record<string, unknown>) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!window.__kwinPosthogInitialized || !window.posthog?.identify) {
    return;
  }

  try {
    window.posthog.identify(distinctId, userProperties);
  } catch {
    // No-op by design. Analytics must never affect UX.
  }
}
