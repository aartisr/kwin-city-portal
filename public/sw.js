// KWIN City Service Worker
// Strategy: Cache-first for static assets, stale-while-revalidate for pages,
// network-first for API, offline fallback for navigation failures.

const CACHE_VERSION = 'kwin-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const IS_LOCALHOST =
  self.location.hostname === 'localhost' ||
  self.location.hostname === '127.0.0.1';

// Routes to precache on install
const PRECACHE_ROUTES = [
  '/',
  '/about',
  '/why-north-bengaluru',
  '/sectors',
  '/timeline',
  '/sustainability',
  '/data-insights',
  '/evidence',
  '/sources',
  '/news-intelligence',
  '/offline',
];

// ─────────────────────────────────────────────
// INSTALL — precache app shell
// ─────────────────────────────────────────────
self.addEventListener('install', (event) => {
  if (IS_LOCALHOST) {
    event.waitUntil(self.skipWaiting());
    return;
  }

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        // addAll is all-or-nothing; we use individual adds so a 404 doesn't abort
        return Promise.allSettled(
          PRECACHE_ROUTES.map((url) =>
            cache.add(new Request(url, { credentials: 'same-origin' })).catch(() => {})
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ─────────────────────────────────────────────
// ACTIVATE — purge old cache versions
// ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  if (IS_LOCALHOST) {
    event.waitUntil(
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .then(() => self.registration.unregister())
        .then(() => self.clients.matchAll({ type: 'window' }))
        .then((clients) => {
          clients.forEach((client) => client.navigate(client.url));
        })
    );
    return;
  }

  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ─────────────────────────────────────────────
// FETCH — routing strategies
// ─────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  if (IS_LOCALHOST) return;

  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // 1. Immutable Next.js static chunks → cache-first (permanent)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    return;
  }

  // 2. API routes → network only (no stale data)
  if (url.pathname.startsWith('/api/')) {
    return; // fall through, no interception
  }

  // 3. Images → cache-first with 30-day expiry
  if (
    request.destination === 'image' ||
    /\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/.test(url.pathname)
  ) {
    event.respondWith(cacheFirstWithExpiry(request, IMAGE_CACHE, 30 * 24 * 60 * 60));
    return;
  }

  // 4. Navigation (HTML pages) → stale-while-revalidate with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidateWithOfflineFallback(request));
    return;
  }

  // 5. Everything else → network first with cache fallback
  event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE));
});

// ─────────────────────────────────────────────
// STRATEGIES
// ─────────────────────────────────────────────

async function cacheFirstStrategy(request, cacheName) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Avoid unhandled promise rejections in fetch event handlers.
    const fallback = await caches.match(request, { ignoreSearch: true });
    return fallback || new Response('', { status: 503 });
  }
}

async function cacheFirstWithExpiry(request, cacheName, maxAgeSeconds) {
  const cached = await caches.match(request);
  if (cached) {
    const dateHeader = cached.headers.get('date');
    if (dateHeader) {
      const cachedAt = new Date(dateHeader).getTime();
      if (Date.now() - cachedAt < maxAgeSeconds * 1000) return cached;
    } else {
      // No date header — trust it
      return cached;
    }
  }
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return cached || new Response('', { status: 404 });
  }
}

async function staleWhileRevalidateWithOfflineFallback(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    // Return cached immediately, update in background
    fetchPromise; // fire-and-forget
    return cached;
  }

  // Nothing cached — wait for network
  const response = await fetchPromise;
  if (response) return response;

  // Fully offline
  const offlinePage = await caches.match('/offline');
  return offlinePage || new Response('You are offline. Please reconnect.', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' },
  });
}

async function networkFirstStrategy(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('', { status: 503 });
  }
}
