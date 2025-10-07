const CACHE_NAME = 'price-lookup-cache-v1';
const STATIC_ASSETS = [
  '/index.html',
  '/index.css',
  '/manifest.json',
  '/Utils/Utils.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('Some static assets failed to cache', err);
      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

// Cache-first for static assets, network-first for API
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Handle API requests to /api/
  if (requestUrl.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone and store in cache
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // For navigation and static assets: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        // Optionally cache new requests
        return response;
      });
    })
  );
});