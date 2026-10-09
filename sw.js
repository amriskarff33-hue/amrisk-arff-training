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

const CACHE_VERSION = 'amrisk-arff-v48';

const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'js/curriculum.js',
  'js/lessons.js',
  'js/store.js',
  'js/diagrams.js',
  'js/photos.js',
  'js/videos.js',
  'js/standards.js',
  'js/app.js',
  'assets/logo.svg',
  'assets/logo.png',
  'assets/icon.svg',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/icon-180.png',
  'media/57855928595-c8e01ad1-0cb4-48c9-8f7c-69a28696.jpg',
  'media/20130920-113843.jpg',
  'media/image.jpg',
  'media/r117-9-galley-g1-drawing-monument.jpg',
  'media/20150291281-04.jpg',
  'media/dsc00554.jpg',
  'media/work-1.jpg',
  'media/work-2.jpg',
  'media/work-4.jpg',
  'media/work-5.jpg',
  'media/49f67e0f-02a8-4112-8bda-4dda28f94530.jpg',
  'media/6e0fa816-6a92-44b6-af5c-4b2076feeebd.jpg',
  'media/b88d3575-d44b-40b6-8f75-2fc77cff3bf5.jpg',
  'media/class-1-hazard-labels.jpg',
  'media/picture.jpg',
  'media/handling-labels.jpg',
  'media/picture-002.jpg',
  'media/wchr-wet-cell-battery.jpg',
  'media/handling-label-danger.jpg',
  'media/original.jpg',
  'media/1-436-110-arff-3.jpg',
  'media/fire-fighters-3.jpg',
  'media/china-airlines-in-hangars-2.jpg',
  'media/pic00019.jpg',
  'media/china-airlines-crash3-2.jpg',
  'media/a380.jpg',
  'media/china-airlines-in-hangars-5.jpg',
  'media/china-airlines-in-hangars-8.jpg',
  'media/screenshot-2019-06-14-21-04-15.jpg',
  'media/screenshot-2019-06-14-21-04-22.jpg',
  'media/img-1177-2.jpg',
  'media/art10-recovery-saa-bogged-009.jpg',
  'media/art10-recovery-saa-bogged-012.jpg',
  'media/art10-recovery-saa-bogged-018.jpg',
  'media/art13-dg-dg-class-1-1-001.jpg',
  'media/art13-dg-dg-class-7-radio-active-iii-001.jpg',
  'media/art15-engine-engine-danger-001.jpg',
  'media/art16-training-live-fire-night-033.jpg',
];

/* Photographs registered in js/photos.js are appended to the precache list
   automatically, so an author who follows the three steps in that file does
   not have to remember to edit this array. A photo that is registered but not
   precached would render on a good connection and fail in the hangar, which
   is the worst possible failure for this material — so it is worth doing
   automatically. LOCAL_VIDEO entries are treated the same way. */
if (typeof PHOTOS === 'object') {
  Object.keys(PHOTOS).forEach(function (k) {
    const src = PHOTOS[k] && PHOTOS[k].src;
    if (src && SHELL.indexOf(src) === -1) SHELL.push(src);
  });
}
if (typeof LOCAL_VIDEO === 'object') {
  Object.keys(LOCAL_VIDEO).forEach(function (k) {
    const v = LOCAL_VIDEO[k];
    const src = typeof v === 'string' ? v : (v && v.src);
    if (src && SHELL.indexOf(src) === -1) SHELL.push(src);
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    // addAll is atomic — one bad path would leave the learner with no offline
    // app at all, so failures are recorded per-file and tolerated instead.
    const failures = {};
    await Promise.all(SHELL.map(async (url) => {
      try {
        await cache.add(new Request(url, { cache: 'reload' }));
      } catch (err) {
        failures[url] = err && err.message ? err.message : String(err);
        console.warn('[sw] precache failed:', url, err);
      }
    }));
    await self.skipWaiting();
    await writePrecacheReport(failures);
  })());
});

/**
 * Record what the precache actually managed to store.
 *
 * A service worker's console is not visible from the page, so a precache that
 * silently fails leaves a learner with an app that looks installed and is not.
 * The report is written to its own cache entry, which the app can read on the
 * Progress screen or from the browser console when offline behaviour is in
 * question. Bumping CACHE_VERSION drops it with the rest of the old cache.
 */
async function writePrecacheReport(failures) {
  try {
    const cache = await caches.open(CACHE_VERSION);
    const stored = await cache.keys();
    const paths = stored.map((r) => new URL(r.url).pathname);
    const missing = SHELL.filter((url) => {
      const path = new URL(url, self.location.href).pathname;
      return !paths.includes(path);
    });
    await cache.put(
      new Request('./precache-report.json'),
      new Response(
        JSON.stringify(
          {
            version: CACHE_VERSION,
            expected: SHELL.length,
            stored: stored.length,
            missing,
            failures: failures || {},
            at: new Date().toISOString()
          },
          null,
          2
        ),
        { headers: { 'Content-Type': 'application/json' } }
      )
    );
  } catch (err) {
    console.warn('[sw] could not write precache report', err);
  }
}

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

/**
 * Match a request against the cache, tolerating cache-buster query strings.
 *
 * index.html loads scripts as `js/app.js?v=4`, but SHELL precaches the plain
 * path `js/app.js`. Cache Storage compares the full URL including the query,
 * so an exact match alone misses every precached asset and the shell only
 * appears to work because the runtime fetch happened to stash the versioned
 * URL while the network was still up. On a device that loses connectivity the
 * moment it installs, that fallback is not there — and the app loads blank.
 *
 * Every resource here is uniquely identified by its path; no two files share
 * a path with a meaningful difference in query, so falling back to a
 * path-only match is safe here and is what makes the precache authoritative.
 */
async function matchShell(cache, request) {
  const exact = await cache.match(request);
  if (exact) return exact;

  const url = new URL(request.url);
  return (await cache.match(url.pathname)) || (await cache.match(request, { ignoreSearch: true }));
}

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
    const cached = await matchShell(cache, request);

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
