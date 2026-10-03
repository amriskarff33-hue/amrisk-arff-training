/* =========================================================================
   AM RISK AND TRAINING — Aviation & ARFF Training Platform
   SERVICE WORKER
   -------------------------------------------------------------------------
   The whole point of this platform is that it works with the network
   unplugged. Strategy:

     - Precached at install: the app shell, all scripts, all styles, the brand
       assets. After the first load the platform never needs the network again.
     - Navigations: cache-first on the shell, so the app opens instantly and
       offline. A cached-first approach is correct here because the content is
       versioned with the cache, not fetched live.
     - Course content: cache-first, refreshed in the background (stale-while-
       revalidate) so an updated course reaches a learner who is online without
       ever blocking them offline.

   Bump CACHE_VERSION to ship new content. The old cache is dropped on activate.
   ========================================================================= */

const CACHE_VERSION = 'amrisk-arff-v4';

const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'js/curriculum.js',
  'js/lessons.js',
  'js/store.js',
  'js/app.js',
  'assets/logo.svg',
  'assets/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    // addAll is atomic — one bad path would leave the learner with no offline
    // app at all, so failures are logged per-file and tolerated instead.
    await Promise.all(SHELL.map(async (url) => {
      try {
        await cache.add(new Request(url, { cache: 'reload' }));
      } catch (err) {
        console.warn('[sw] precache failed:', url, err);
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only GET is cacheable, and never touch a cross-origin request — a worker
  // that proxies third-party traffic is a liability, not a feature.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations always resolve to the cached shell.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_VERSION);
      const cached = await cache.match('index.html');
      if (cached) {
        // Refresh in the background; never block the learner on the network.
        event.waitUntil((async () => {
          try {
            const fresh = await fetch(request);
            if (fresh.ok) await cache.put('index.html', fresh);
          } catch { /* offline — the cached shell stands */ }
        })());
        return cached;
      }
      try {
        return await fetch(request);
      } catch {
        return new Response('<h1>Offline</h1><p>The training platform is not cached yet. Connect once to install it.</p>',
          { status: 503, headers: { 'Content-Type': 'text/html' } });
      }
    })());
    return;
  }

  // Everything else: stale-while-revalidate.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(request);

    const network = fetch(request).then((res) => {
      if (res && res.ok && res.type === 'basic') cache.put(request, res.clone());
      return res;
    }).catch(() => null);

    if (cached) {
      event.waitUntil(network);
      return cached;
    }

    const res = await network;
    return res || new Response('', { status: 504 });
  })());
});

// Lets the app ask the browser to update a waiting worker after a deploy.
self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});
