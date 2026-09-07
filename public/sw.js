/* KWIN City PWA service worker.
 * Public documents are network-first, immutable assets are cache-first, and
 * private/API/RSC traffic is never cached. No third-party request is intercepted.
 */

const APP_PREFIX = "kwin-pwa";
const CACHE_VERSION = "v4";
const PRECACHE = `${APP_PREFIX}-${CACHE_VERSION}-precache`;
const PAGES = `${APP_PREFIX}-${CACHE_VERSION}-pages`;
const ASSETS = `${APP_PREFIX}-${CACHE_VERSION}-assets`;
const IMAGES = `${APP_PREFIX}-${CACHE_VERSION}-images`;
const OFFLINE_URL = "/offline";
const NETWORK_TIMEOUT_MS = 4_500;
const CACHE_LIMITS = { pages: 35, assets: 120, images: 80 };

const PRECACHE_URLS = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icon",
  "/apple-icon",
];

const NEVER_CACHE_PREFIXES = [
  "/api/",
  "/account",
  "/community",
  "/auth",
  "/admin",
];

self.addEventListener("install", (event) => {
  event.waitUntil(precacheAppShell());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(Promise.all([removeOldAppCaches(), self.clients.claim()]));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
  if (event.data?.type === "CLEAR_RUNTIME_CACHES") {
    event.waitUntil(Promise.all([caches.delete(PAGES), caches.delete(IMAGES)]));
  }
});

self.addEventListener("fetch", (event) => {
  if (!shouldHandle(event.request)) return;

  const request = event.request;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(navigationNetworkFirst(request));
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, ASSETS, CACHE_LIMITS.assets));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(cacheFirst(request, IMAGES, CACHE_LIMITS.images));
  }
});

function shouldHandle(request) {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  if (request.headers.has("range")) return false;
  if (request.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) {
    return false;
  }
  return !NEVER_CACHE_PREFIXES.some(
    (prefix) =>
      url.pathname === prefix.replace(/\/$/, "") ||
      url.pathname.startsWith(prefix),
  );
}

async function precacheAppShell() {
  const cache = await caches.open(PRECACHE);
  await Promise.allSettled(
    PRECACHE_URLS.map(async (url) => {
      const response = await fetch(new Request(url, { cache: "reload" }));
      if (url === OFFLINE_URL || isCacheablePageResponse(response)) {
        await cache.put(url, response);
      }
    }),
  );
}

async function navigationNetworkFirst(request) {
  try {
    const response = await fetchWithTimeout(request, NETWORK_TIMEOUT_MS);
    if (isCacheablePage(request, response)) {
      const cache = await caches.open(PAGES);
      await cache.put(request, response.clone());
      await enforceLimit(cache, CACHE_LIMITS.pages);
    }
    return response;
  } catch {
    const cache = await caches.open(PAGES);
    const cached = await cache.match(request);
    if (cached) return cached;
    return (
      (await caches.match(OFFLINE_URL)) ||
      new Response("Offline", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    );
  }
}

async function cacheFirst(request, cacheName, limit) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      await cache.put(request, response.clone());
      await enforceLimit(cache, limit);
    }
    return response;
  } catch {
    return new Response("Unavailable", { status: 503 });
  }
}

function fetchWithTimeout(request, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(request, { signal: controller.signal }).finally(() =>
    clearTimeout(timer),
  );
}

function isCacheable(response) {
  return response?.ok && (response.type === "basic" || response.type === "default");
}

function isCacheablePage(request, response) {
  if (!isCacheablePageResponse(response)) return false;
  if (response.headers.has("set-cookie")) return false;
  return !NEVER_CACHE_PREFIXES.some((prefix) =>
    new URL(request.url).pathname.startsWith(prefix),
  );
}

function isCacheablePageResponse(response) {
  if (!isCacheable(response)) return false;
  const cacheControl = response.headers.get("cache-control") || "";
  return !/no-store|private/i.test(cacheControl);
}

async function enforceLimit(cache, maxEntries) {
  const keys = await cache.keys();
  const excess = keys.length - maxEntries;
  if (excess > 0) {
    await Promise.all(keys.slice(0, excess).map((key) => cache.delete(key)));
  }
}

async function removeOldAppCaches() {
  const names = await caches.keys();
  const current = new Set([PRECACHE, PAGES, ASSETS, IMAGES]);
  await Promise.all(
    names
      .filter((name) => name.startsWith(`${APP_PREFIX}-`) && !current.has(name))
      .map((name) => caches.delete(name)),
  );
}
