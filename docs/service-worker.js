const OFFLINE_CACHE_VERSION = "2026-03-27-offline-v19";
const OFFLINE_CACHE_NAME = `japan-escape-itinerary-${OFFLINE_CACHE_VERSION}`;
const APP_SCOPE_URL = new URL("./", self.location);
const APP_SCOPE_PATH = APP_SCOPE_URL.pathname;
const APP_SHELL_PATHS = [
  "./",
  "./index.html",
  "./style.min.css",
  "./script.min.js",
  "./manifest.webmanifest",
  "./japan-escape-itinerary-offline.html",
  "./assets/data/budget-estimate-sources.json",
  "./assets/data/booking-transit-items.json",
  "./assets/data/transit-details.json",
  "./assets/route-map-preview.svg",
  "./assets/vendor/maplibre/maplibre-gl.css",
  "./assets/vendor/maplibre/maplibre-gl.js",
  "./assets/vendor/protomaps/basemaps.js",
  "./assets/vendor/protomaps/pmtiles.js",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];
const APP_SHELL_URLS = APP_SHELL_PATHS.map((assetPath) =>
  new URL(assetPath, self.location).toString()
);
const APP_SHELL_URL_SET = new Set(APP_SHELL_URLS);

function isAppOrigin(url) {
  return url.origin === self.location.origin && url.pathname.startsWith(APP_SCOPE_PATH);
}

function isCacheableResponse(response) {
  return Boolean(response && response.ok && (response.type === "basic" || response.type === "default"));
}

function matchesCachedAppAsset(url) {
  return (
    APP_SHELL_URL_SET.has(url.href) ||
    url.pathname === APP_SCOPE_PATH ||
    url.pathname === `${APP_SCOPE_PATH}index.html` ||
    url.pathname.startsWith(`${APP_SCOPE_PATH}assets/`)
  );
}

function isRangeRequest(request) {
  return request.headers.has("range");
}

function isPmtilesRequest(url) {
  return url.pathname.endsWith(".pmtiles");
}

async function addAssetsToCache(cache, urls) {
  await Promise.allSettled(
    urls.map(async (url) => {
      const request = new Request(url, { cache: "reload" });
      await cache.add(request);
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(OFFLINE_CACHE_NAME);
      await addAssetsToCache(cache, APP_SHELL_URLS);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName.startsWith("japan-escape-itinerary-") &&
              cacheName !== OFFLINE_CACHE_NAME
          )
          .map((cacheName) => caches.delete(cacheName))
      );
      await self.clients.claim();
    })()
  );
});

async function respondToNavigation(request) {
  const cache = await caches.open(OFFLINE_CACHE_NAME);

  try {
    const networkResponse = await fetch(request);
    if (isCacheableResponse(networkResponse)) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return (
      (await cache.match(request, { ignoreSearch: true })) ||
      (await cache.match(new URL("./index.html", self.location).toString())) ||
      (await cache.match(APP_SCOPE_URL.toString()))
    );
  }
}

async function respondToCachedAsset(request) {
  const cache = await caches.open(OFFLINE_CACHE_NAME);
  const cachedResponse = await cache.match(request, { ignoreSearch: true });
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (isCacheableResponse(networkResponse)) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return cachedResponse || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (!isAppOrigin(requestUrl)) {
    return;
  }

  if (isRangeRequest(event.request) || isPmtilesRequest(requestUrl)) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(respondToNavigation(event.request));
    return;
  }

  if (matchesCachedAppAsset(requestUrl)) {
    event.respondWith(respondToCachedAsset(event.request));
  }
});
