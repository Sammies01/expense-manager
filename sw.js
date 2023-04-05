// console.log("Service worker");


const CACHE_NAME = `Expense-Manager-v2`;
const assets = ['/', '/index.html', '/dist/output.css', '/scripts.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(assets);
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
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          return new Response("You are offline.", { status: 503, statusText: "Service Unavailable" });
        }
      }
    })()
  );
});
