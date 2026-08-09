# PostHog Integration (Plug and Play)

This project includes a resilient client-side PostHog integration that is:

- environment-gated (`off` by default)
- lazy-loaded during idle time
- App Router aware (tracks route transitions)
- failure-safe (analytics never blocks rendering)

## Files

- `app/lib/analytics/posthog.ts` - core adapter and helper APIs
- `app/components/PostHogInit.tsx` - initialization and pageview tracking
- `app/components/ClientEnhancements.tsx` - integration mount point

## Enable PostHog

Add these in `.env.local` (or Vercel project env vars):

```bash
NEXT_PUBLIC_POSTHOG_ENABLED=true
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## Optional regional host examples

- US cloud: `https://us.i.posthog.com`
- EU cloud: `https://eu.i.posthog.com`

## Usage in components

```tsx
'use client';

import { capturePostHogEvent, identifyPostHogUser } from '@/lib/analytics/posthog';

capturePostHogEvent('cta_clicked', {
  cta_name: 'home_primary_cta',
  section: 'hero',
});

identifyPostHogUser('user-123', {
  plan: 'enterprise',
  region: 'in',
});
```

## Design notes

- The SDK script is loaded only when enabled and only after initial page interactivity.
- Pageviews are emitted on route transitions via App Router hooks.
- If PostHog is unavailable or blocked, tracking calls are no-ops.
- This integration coexists with existing Vercel Analytics and Clarity setup.
