const OFFLINE_CACHE_VERSION = "836d9c5ea2-2d8476cd59-99a408e563-f5a38cf4cd-c5940ea7b1-2505fd076d-93befc11bf-1e878db773-b71f05a930-bcde8dff98-9afc15ad27";
const CACHE_PREFIX = "japan-escape-itinerary-";
const APP_SHELL_CACHE_NAME = `${CACHE_PREFIX}shell-${OFFLINE_CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `${CACHE_PREFIX}runtime-${OFFLINE_CACHE_VERSION}`;
const APP_SCOPE_URL = new URL("./", self.location);
const APP_SCOPE_PATH = APP_SCOPE_URL.pathname;
const APP_SHELL_PATHS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/app/1yegabjjbjp01.1e878db773.jpg",
  "./assets/app/opening.b71f05a930.mp3",
  "./assets/app/page-background-loop.bcde8dff98.mp3",
  "./assets/app/transition.9afc15ad27.mp3",
  "./assets/app/style.836d9c5ea2.css",
  "./assets/app/script.99a408e563.js",
  "./assets/app/routeStyle.2d8476cd59.css",
  "./assets/app/routeContent.f5a38cf4cd.js",
  "./assets/app/budgetUi.c5940ea7b1.js",
  "./assets/app/budgetContent.2505fd076d.js",
  "./assets/app/essentialsContent.93befc11bf.js"
];
const NETWORK_FIRST_PATHS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./japan-escape-itinerary-offline.html"
];
const APP_SHELL_URLS = APP_SHELL_PATHS.map((assetPath) => new URL(assetPath, self.location).toString());
const NETWORK_FIRST_URLS = NETWORK_FIRST_PATHS.map((assetPath) =>
  new URL(assetPath, self.location).toString()
);
const APP_SHELL_URL_SET = new Set(APP_SHELL_URLS);
const NETWORK_FIRST_URL_SET = new Set(NETWORK_FIRST_URLS);
const STATIC_DESTINATIONS = new Set(["font", "image", "script", "style", "worker"]);

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

function isNetworkFirstAppAsset(url) {
  return (
    NETWORK_FIRST_URL_SET.has(url.href) ||
    url.pathname === APP_SCOPE_PATH ||
    url.pathname === `${APP_SCOPE_PATH}index.html`
  );
}

function isRangeRequest(request) {
  return request.headers.has("range");
}

function isStaticAssetRequest(request, url) {
  return (
    STATIC_DESTINATIONS.has(request.destination) ||
    url.pathname.startsWith(`${APP_SCOPE_PATH}assets/`)
  );
}

function shouldPersistInAppShell(url) {
  return APP_SHELL_URL_SET.has(url.href);
}

async function openResponseCache(url) {
  return caches.open(shouldPersistInAppShell(url) ? APP_SHELL_CACHE_NAME : RUNTIME_CACHE_NAME);
}

async function cacheResponse(request, response, url = new URL(request.url)) {
  if (!isCacheableResponse(response)) {
    return response;
  }

  const cache = await openResponseCache(url);
  await cache.put(request, response.clone());
  return response;
}

async function matchCachedResponse(request) {
  const matchOptions = { ignoreSearch: true };
  const appShellCache = await caches.open(APP_SHELL_CACHE_NAME);
  const appShellResponse = await appShellCache.match(request, matchOptions);
  if (appShellResponse) {
    return appShellResponse;
  }

  const runtimeCache = await caches.open(RUNTIME_CACHE_NAME);
  return runtimeCache.match(request, matchOptions);
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
      const cache = await caches.open(APP_SHELL_CACHE_NAME);
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
              cacheName.startsWith(CACHE_PREFIX) &&
              cacheName !== APP_SHELL_CACHE_NAME &&
              cacheName !== RUNTIME_CACHE_NAME
          )
          .map((cacheName) => caches.delete(cacheName))
      );
      await self.clients.claim();
    })()
  );
});

async function respondToNavigation(event) {
  const { request } = event;

  try {
    const networkRequest = new Request(request, { cache: "no-cache" });
    const networkResponse = await fetch(networkRequest);
    await cacheResponse(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    return (
      (await matchCachedResponse(request)) ||
      (await matchCachedResponse(new Request(new URL("./index.html", self.location).toString()))) ||
      (await matchCachedResponse(new Request(APP_SCOPE_URL.toString())))
    );
  }
}

async function fetchAndCache(request) {
  const requestUrl = new URL(request.url);
  const fetchRequest = shouldPersistInAppShell(requestUrl)
    ? new Request(request, { cache: "no-cache" })
    : request;
  const networkResponse = await fetch(fetchRequest);
  await cacheResponse(request, networkResponse.clone(), requestUrl);
  return networkResponse;
}

async function respondToCachedAsset(event) {
  const cachedResponse = await matchCachedResponse(event.request);
  if (cachedResponse) {
    event.waitUntil(
      fetchAndCache(event.request).catch(() => null)
    );
    return cachedResponse;
  }

  try {
    return await fetchAndCache(event.request);
  } catch (error) {
    return cachedResponse || Response.error();
  }
}

async function respondToNetworkFirstAsset(request) {
  const networkRequest = new Request(request, { cache: "no-cache" });

  try {
    const networkResponse = await fetch(networkRequest);
    await cacheResponse(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    return (await matchCachedResponse(request)) || Response.error();
  }
}

self.addEventListener("message", (event) => {
  const payload = event.data;
  if (!payload || payload.type !== "CACHE_URLS" || !Array.isArray(payload.urls)) {
    return;
  }

  event.waitUntil(
    Promise.allSettled(
      payload.urls.map(async (rawUrl) => {
        const nextUrl = new URL(rawUrl, self.location);
        if (
          !isAppOrigin(nextUrl) ||
          isNetworkFirstAppAsset(nextUrl) ||
          nextUrl.pathname === APP_SCOPE_PATH ||
          nextUrl.pathname === `${APP_SCOPE_PATH}index.html`
        ) {
          return;
        }

        const request = new Request(nextUrl.toString(), { cache: "reload" });
        const cachedResponse = await matchCachedResponse(request);
        if (cachedResponse) {
          return;
        }

        const networkResponse = await fetch(request);
        await cacheResponse(request, networkResponse.clone(), nextUrl);
      })
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (!isAppOrigin(requestUrl)) {
    return;
  }

  if (isRangeRequest(event.request)) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(respondToNavigation(event));
    return;
  }

  if (matchesCachedAppAsset(requestUrl)) {
    event.respondWith(
      isNetworkFirstAppAsset(requestUrl) || shouldPersistInAppShell(requestUrl)
        ? respondToNetworkFirstAsset(event.request)
        : isStaticAssetRequest(event.request, requestUrl)
          ? respondToCachedAsset(event)
          : respondToNetworkFirstAsset(event.request)
    );
  }
});
