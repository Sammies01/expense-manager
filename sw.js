// console.log("Service worker");

// Define cache versioning strategy
const CACHE_NAME_PREFIX = 'Expense-Manager';
const CACHE_VERSION = 'v2';
const CACHE_NAME = `${CACHE_NAME_PREFIX}-${CACHE_VERSION}`;

const assets = ['/', '/index.html', '/dist/output.css', '/scripts.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(assets);
    })()
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheKeys = await caches.keys();
      const oldCaches = cacheKeys.filter(key => key.startsWith(CACHE_NAME_PREFIX) && key !== CACHE_NAME);
      await Promise.all(oldCaches.map(cache => caches.delete(cache)));
    })()
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        try {
          const fetchResponse = await fetch(event.request);
          // Clone and cache fetched response
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // Handle fetch failures
          return new Response("You are offline.", { status: 503, statusText: "Service Unavailable" });
        }
      }
    })()
  );
});
