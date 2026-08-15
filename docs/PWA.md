# Progressive Web App Architecture

KWIN City ships as an installable Progressive Web App (PWA) without adding a
framework-specific service-worker dependency. The implementation is deliberately
small, auditable, and reusable across routes.

## Capabilities

- Installable on Chromium desktop and Android
- Add to Home Screen guidance for iPhone and iPad
- Standalone app display with branded icons and theme colors
- Network-first public navigation with a guaranteed offline fallback
- Cache-first immutable Next.js assets and same-origin images
- Visible online/offline status
- Controlled, one-click service-worker updates
- Bounded caches that cannot grow indefinitely
- No interception of third-party, API, private, range, or React Server Component requests

## Module Ownership

| Module                                  | Responsibility                                               |
| --------------------------------------- | ------------------------------------------------------------ |
| `app/lib/pwa/config.ts`                 | Brand, install, update, and shortcut configuration           |
| `app/manifest.ts`                       | Standards-compliant web app manifest                         |
| `public/sw.js`                          | Fetch policy, offline fallback, cache ownership, and updates |
| `app/components/PwaRegistration.tsx`    | Registration, update lifecycle, and connectivity UI          |
| `app/components/PwaInstallPrompt.tsx`   | Cross-platform install experience                            |
| `app/offline/page.tsx`                  | Accessible offline destination                               |
| `app/icon.tsx` and `app/apple-icon.tsx` | Generated application icons                                  |
| `scripts/verify-pwa.mjs`                | Repository-level PWA contract verification                   |

Brand or route changes should normally require edits only in
`app/lib/pwa/config.ts`. Provider-specific data and API behavior do not belong in
the PWA modules.

## Caching Policy

The service worker follows least-surprise rules:

1. `/api/*`, account, community, authentication, and administrative paths are
   never intercepted.
2. RSC requests, byte ranges, non-GET requests, and cross-origin resources are
   never intercepted.
3. Public document navigation is network-first with a bounded timeout. A page
   is saved only when its server cache policy permits it; cached content is used
   only if the network fails.
4. Responses marked `private` or `no-store`, or responses that set cookies, are
   never saved as public pages.
5. Fingerprinted Next.js assets and same-origin images are cache-first.
6. Only caches prefixed with `kwin-pwa-` can be removed by this service worker.
7. Page, image, and asset caches have explicit entry limits.

Fresh APIs and personalized data therefore remain governed by the application
and HTTP cache headers, not by offline caching.

## Update Lifecycle

The worker script is served with `must-revalidate` and registered using
`updateViaCache: 'none'`. The app checks for updates periodically. A new worker
waits until the user selects **Update**, then activates and reloads once after the
controller changes. This avoids silently mixing assets from different releases.

## Development

Service workers are disabled and unregistered in non-production Next.js builds
because persistent caches interfere with Hot Module Replacement. Localhost is a
secure PWA context, so the real lifecycle can be tested against a production
build locally:

```bash
npm run build
npm run start
```

Run the static contract and JavaScript syntax checks with:

```bash
npm run pwa:verify
```

## Production Verification

After deployment:

1. Confirm `/manifest.webmanifest` returns `application/manifest+json`.
2. Confirm `/sw.js` returns JavaScript with `Cache-Control: public, max-age=0, must-revalidate`.
3. Confirm `/icon` is 512×512 and `/apple-icon` is 180×180.
4. In Chrome DevTools → Application, confirm the manifest has no installability errors.
5. Install the app and confirm it starts at `/?source=pwa` in standalone mode.
6. Go offline and confirm a server-cacheable page or `/offline` appears.
7. Confirm `/api/*` requests do not appear in PWA caches.
8. Deploy a new worker version and verify that the in-app update notification appears.
9. Run Lighthouse PWA checks against the deployed HTTPS origin.

## Extending Safely

- Add shortcuts through `PWA_CONFIG.shortcuts`.
- Add a private route prefix to `NEVER_CACHE_PREFIXES` before shipping the route.
- Bump `CACHE_VERSION` whenever service-worker caching semantics materially change.
- Never cache mutation responses, authentication responses, or provider APIs.
- Prefer a new verification assertion when adding a new PWA contract.
