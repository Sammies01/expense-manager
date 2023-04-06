// console.log("Service worker");

const CACHE_NAME = `Expense-Manager-v2`;
const assets = ['/', '/index.html', '/dist/output.css', '/scripts.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log('Adding assets to cache:', assets);
      await cache.addAll(assets);
      console.log('Assets added to cache.');
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


// // Define cache versioning strategy
// const CACHE_NAME_PREFIX = 'Expense-Manager';
// const CACHE_VERSION = 'v2';
// const CACHE_NAME = `${CACHE_NAME_PREFIX}-${CACHE_VERSION}`;

// const assets = ['/', '/index.html', '/dist/output.css', '/scripts.js', '/icon/icon-512.png', '/icon/icon-1024.jpg', '/icon/icon-maskable-512.png', '/images/favicon.ico', 'input.css'];

// self.addEventListener('install', event => {
//   event.waitUntil(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);
//       await cache.addAll(assets);
//     })()
//   );
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     (async () => {
//       // Clean up old caches
//       const cacheKeys = await caches.keys();
//       const oldCaches = cacheKeys.filter(key => key.startsWith(CACHE_NAME_PREFIX) && key !== CACHE_NAME);
//       await Promise.all(oldCaches.map(cache => caches.delete(cache)));
//     })()
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);
//       const cachedResponse = await cache.match(event.request);
//       if (cachedResponse) {
//         return cachedResponse;
//       } else {
//         try {
//           const fetchResponse = await fetch(event.request);
//           // Clone and cache fetched response
//           cache.put(event.request, fetchResponse.clone());
//           return fetchResponse;
//         } catch (e) {
//           // Handle fetch failures
//           return new Response("You are offline.", { status: 503, statusText: "Service Unavailable" });
//         }
//       }
//     })()
//   );
// });
