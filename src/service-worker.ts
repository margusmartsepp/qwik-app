/// <reference lib="webworker" />
/// <reference lib="es2020" />
/// <reference lib="WebWorker" />

const CACHE_NAME = 'llm-flow-cache-v1';
const ASSETS_CACHE = 'assets-cache-v1';

(self as unknown as ServiceWorkerGlobalScope).addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME),
      caches.open(ASSETS_CACHE)
    ])
  );
});

(self as unknown as ServiceWorkerGlobalScope).addEventListener('fetch', (event: FetchEvent) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          return await fetch(event.request);
        } catch (e) {
          const cache = await caches.open(CACHE_NAME);
          return await cache.match(event.request) || Response.error();
        }
      })()
    );
  }
});