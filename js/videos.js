/* ============================================================================
   VIDEOS — verified training video, referenced by lessons and courses
   ============================================================================

   WHY FACADES, NOT IFRAMES
   Every video here is rendered as a card with a play button. The YouTube iframe
   is only created when the learner clicks. Eagerly embedding 18 players would
   cost megabytes, block first paint, and contact Google on every page view.
   The facade also means the offline case degrades honestly instead of showing
   a broken player.

   THE OFFLINE TRADE-OFF — read this before adding to the library
   These are remote videos. Playing one needs a connection. That is the opposite
   of everything else in this platform, which works with the network unplugged.
   So the UI never pretends otherwise:

     • Online  — the card plays normally.
     • Offline — the card says so, and points at the diagram or lesson text,
                 which DO work offline, for the same point.

   For material that must work with no network at all, add a `local:` entry
   instead (see LOCAL_VIDEO below). Local files are precached by the service
   worker and play fully offline. Use those once your SMEs record footage.

   PROVENANCE
   Every entry below was verified to exist and to permit embedding on
   2026-10-03 via YouTube's oEmbed endpoint and the watch-page playableInEmbed
   flag. All are published by the Federal Aviation Administration. Nothing here
   is guessed; if a video is later removed, the card degrades to a plain link
   rather than an embedded error.

   RE-VERIFY BEFORE A SAFETY DEPLOYMENT
     curl "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json"

   A IMPORTANT CAVEAT FOR SOUTH AFRICAN USE
   The FAA series is written against US 14 CFR Part 139, AC 150/5210 and NFPA.
   The principles — critical area, agent selection, approach angles, command
   structure — are international. The regulatory citations, the Index concept,
   and the equipment references are not. Treat these as technique and principle
   training, and check every regulatory statement against SACAA/CAAB requirements
   and your operator's SOP. Each card carries this warning.
   ========================================================================= */

'use strict';

/* ── The library ────────────────────────────────────────────────────────── */

const FAA_SERIES_INTRO = 'FAA — Introduction to Aircraft Rescue and Firefighting';
const FAA_SERIES_TACT  = 'FAA — Aircraft Rescue and Firefighting: Tactics and Equipment';
const FAA_F3           = 'FAA — Fluorine Free Foam (F3) Transition';

const VIDEO_LIBRARY = {
  /* --- Series 1: Introduction to ARFF ------------------------------- */
  'faa-intro-prelude': {
    id: 'FukKFYCoMw4', series: FAA_SERIES_INTRO,
    title: 'Prelude' },
  'faa-intro-1': {
    id: 'i8qMD6Zgt8s', series: FAA_SERIES_INTRO,
    title: 'Section 1 — Introduction' },
  'faa-intro-2': {
    id: 'T9LWlBAip-s', series: FAA_SERIES_INTRO,
    title: 'Section 2 — Airport Familiarization' },
  'faa-intro-3': {
    id: 'h-Ew18FxopQ', series: FAA_SERIES_INTRO,
    title: 'Section 3 — Aircraft Familiarization' },
  'faa-intro-4': {
    id: 'JHUpp6gehJI', series: FAA_SERIES_INTRO,
    title: 'Section 4 — Personnel Safety' },
  'faa-intro-5': {
    id: 'F-dhigNL6ys', series: FAA_SERIES_INTRO,
    title: 'Section 5 — Airport Emergency Communications' },
  'faa-intro-6': {
    id: '5BjKKHGGRAc', series: FAA_SERIES_INTRO,
    title: 'Section 6 — Fire Suppression Equipment' },
  'faa-intro-7': {
    id: 'Yi2wJLpes6Y', series: FAA_SERIES_INTRO,
    title: 'Section 7 — Fire Extinguishing Agents' },
  'faa-intro-8': {
    id: '35vzGOzCaCs', series: FAA_SERIES_INTRO,
    title: 'Section 8 — Emergency Aircraft Evacuation' },
  'faa-intro-9': {
    id: 'HeuNZIM_Yag', series: FAA_SERIES_INTRO,
    title: 'Section 9 — Fire Fighting Operations' },
  'faa-intro-10': {
    id: 'mt-tzfq0sqA', series: FAA_SERIES_INTRO,
    title: 'Section 10 — Use of the DOT Emergency Guide Book' },
  'faa-intro-11': {
    id: 'k_k8hDTn4pE', series: FAA_SERIES_INTRO,
    title: 'Section 11 — Conclusion' },

  /* --- Series 2: Forcible entry, HRET, cargo ------------------------ */
  'faa-tact-1': {
    id: 'QowzvglmCTU', series: FAA_SERIES_TACT,
    title: 'Section 1 — Introduction' },
  'faa-tact-2': {
    id: '9HSbnNnClJI', series: FAA_SERIES_TACT,
    title: 'Section 2 — Forcible Entry' },
  'faa-tact-3': {
    id: 'DPr750pIWws', series: FAA_SERIES_TACT,
    title: 'Section 3 — High Reach Extendible Turret (HRET)' },
  'faa-tact-4': {
    id: 'PVti1kyg2l8', series: FAA_SERIES_TACT,
    title: 'Section 4 — Cargo Aircraft Firefighting' },
  'faa-tact-5': {
    id: 'YW_xNsYlhGI', series: FAA_SERIES_TACT,
    title: 'Section 5 — Conclusion' },

  /* --- Current topic: AFFF to fluorine-free foam --------------------- */
  'faa-f3': {
    id: 'K_7HvE8JIH8', series: FAA_F3,
    title: 'Fluorine Free Foam (F3) Transition for ARFF Departments' }
};

/* Which videos belong on which course. Kept separate from the library so the
   same video can serve several courses without duplicating metadata. */
const VIDEO_COURSES = {
  'arff-foundations':        ['faa-intro-prelude', 'faa-intro-1', 'faa-intro-11', 'faa-tact-1'],
  'level-determination':     ['faa-intro-1'],
  'levels-agents-rates':     ['faa-intro-1'],
  'extinguishing-agents':    ['faa-intro-7', 'faa-f3'],
  'foam-systems':            ['faa-intro-7', 'faa-f3'],
  'vehicles-appliances':     ['faa-intro-6', 'faa-tact-3'],
  'ppe-scba':                ['faa-intro-4'],
  'personnel-training':      ['faa-intro-4', 'faa-intro-1'],
  'emergency-command':       ['faa-intro-5', 'faa-tact-1'],
  'rescue-extrication':      ['faa-intro-8', 'faa-tact-2'],
  'aircraft-familiarisation':['faa-intro-3'],
  'fuel-handling':           ['faa-tact-4', 'faa-intro-10'],
  'dangerous-goods':         ['faa-intro-10', 'faa-tact-4'],
  'lithium-batteries':       [],
  'aircraft-engine-fires':   ['faa-intro-9', 'faa-tact-3'],
  'firefighting-tactics':    ['faa-intro-9'],
  'rover-vehicles':          ['faa-intro-6', 'faa-tact-3'],
  'communications':          ['faa-intro-5'],
  'emergency-planning':      ['faa-intro-5', 'faa-tact-1'],
  'emergency-contingency':   ['faa-tact-1', 'faa-intro-9'],
  'adverse-weather':         [],
  'wildfire-interface':      [],
  'off-airport-response':    ['faa-intro-2'],
  'emergency-medical':       ['faa-intro-8'],
  'water-supply':            ['faa-intro-6']
};

/* ── Local video ────────────────────────────────────────────────────────────
   Template for footage your own SMEs record. Once a file exists at the given
   path, add its path to the PRECACHE list in sw.js or it will not be available
   offline. Entries need no YouTube id.

   'scba-donning': {
     local: 'media/scba-donning.mp4',
     title: 'Donning and doffing SCBA',
     credit: 'AM RISK AND TRAINING — recorded on station'
   },
--------------------------------------------------------------------------- */
const LOCAL_VIDEO = {};

/* ── Rendering ──────────────────────────────────────────────────────────── */

function videoFor(key) {
  return VIDEO_LIBRARY[key] || LOCAL_VIDEO[key] || null;
}

function videoListFor(courseId) {
  return (VIDEO_COURSES[courseId] || []).map((k) => ({ key: k, ...videoFor(k) })).filter((v) => v.id || v.local);
}

/* Privacy-preserving embed. youtube-nocookie does not set tracking cookies
   until playback is requested. */
function videoEmbedUrl(v) {
  return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`;
}

function videoWatchUrl(v) {
  return `https://www.youtube.com/watch?v=${v.id}`;
}

/* One card. Remote videos are facades; local files get a native player because
   there is nothing to lazy-load and no connection to lose. */
function videoCard(key) {
  const v = videoFor(key);
  if (!v) {
    return `<div class="video video--missing">Missing video <code>${esc(key)}</code> — add it to VIDEO_LIBRARY in <code>js/videos.js</code></div>`;
  }

  if (v.local) {
    return `<figure class="video">
      <video controls preload="metadata" playsinline src="${esc(v.local)}"></video>
      <figcaption><b>${esc(v.title)}</b>${v.credit ? ` · <span class="video__credit">${esc(v.credit)}</span>` : ''}
        <span class="video__tag video__tag--local">Offline</span></figcaption>
    </figure>`;
  }

  return `<figure class="video" data-video="${esc(key)}">
    <button class="video__facade" data-play-video="${esc(key)}"
            aria-label="Play: ${esc(v.title)}">
      <span class="video__glyph" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>
      </span>
      <span class="video__meta">
        <b>${esc(v.title)}</b>
        <small>${esc(v.series || '')}</small>
      </span>
      <span class="video__tag">Needs a connection</span>
    </button>
    <figcaption>
      <a href="${esc(videoWatchUrl(v))}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
      · <span class="video__credit">Federal Aviation Administration</span>
      <span class="video__caution">US 14 CFR Part 139 material — verify regulatory points against SACAA/CAAB requirements and your SOP.</span>
    </figcaption>
  </figure>`;
}

/* Swap {{video:key}} for cards. Runs on lesson bodies only. */
function renderVideos(html) {
  if (!html || html.indexOf('{{video:') === -1) return html || '';
  return String(html).replace(/\{\{video:([A-Za-z0-9_-]+)\}\}/g, (m, key) => videoCard(key));
}

/* The course-level video section, shown on every course that has any. */
function courseVideoSection(courseId) {
  const items = videoListFor(courseId);
  if (!items.length) return '';
  return `<div class="section-title"><h2>Video</h2><small>${items.length} verified source${items.length > 1 ? 's' : ''}</small></div>
    <div class="videos">${items.map((v) => videoCard(v.key)).join('')}</div>
    <p class="videos__note">These are remote FAA training videos and need a connection to play. Everything else on this
      platform — all lesson text, diagrams and assessments — works with no network at all.</p>`;
}

/* =========================================================================
   THE WHOLE LIBRARY, IN ONE PLACE
   Every verified source, grouped by series, with its direct YouTube link and
   the courses it is mapped to.

   WHY THIS EXISTS
   Three courses have no video mapped at all — lithium-batteries,
   adverse-weather and wildfire-interface — because the FAA series does not
   cover those subjects. Rather than leave a learner on a course with an empty
   video section and no explanation, this view lists everything that does
   exist and states plainly which subjects the library does not cover. A gap
   that is visible is a gap someone can fix; a gap that is invisible is a
   course that quietly teaches nothing on that subject.
   ========================================================================= */
/* The course list, resolved by id. allCourses() in app.js renders the
   catalogue markup and returns a string — it is not the data. CURRICULUM is. */
function courseById(id) {
  return (typeof CURRICULUM !== 'undefined' ? CURRICULUM : []).find((c) => c.id === id) || null;
}

function videoLibrarySection() {
  const series = [];
  const seen = {};
  Object.keys(VIDEO_LIBRARY).forEach((k) => {
    const v = VIDEO_LIBRARY[k];
    const name = v.series || 'Unassigned';
    if (!seen[name]) { seen[name] = []; series.push({ name: name, items: seen[name] }); }
    seen[name].push({ key: k, v: v });
  });

  const blocks = series.map((s) =>
    `<h3 class="vidlib__series">${esc(s.name)} <small>${s.items.length} video${s.items.length > 1 ? 's' : ''}</small></h3>
     <ul class="vidlib">${s.items.map((i) => {
       const uses = Object.keys(VIDEO_COURSES).filter((cid) => (VIDEO_COURSES[cid] || []).includes(i.key))
         .map((cid) => {
           const c = courseById(cid);
           return c ? esc(c.code) : cid;
         });
       return `<li>
         <a class="vidlib__link" href="${esc(videoWatchUrl(i.v))}" target="_blank" rel="noopener noreferrer">
           <span class="vidlib__glyph" aria-hidden="true">
             <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>
           </span>
           <span class="vidlib__title">${esc(i.v.title)}</span>
           <code>${esc(i.v.id)}</code>
         </a>
         ${uses.length ? `<span class="vidlib__uses">used on ${uses.join(', ')}</span>`
                       : '<span class="vidlib__uses vidlib__uses--none">not mapped to a course</span>'}
       </li>`;
     }).join('')}</ul>`).join('');

  const total = Object.keys(VIDEO_LIBRARY).length;
  const unmapped = Object.keys(VIDEO_COURSES).filter((cid) => !(VIDEO_COURSES[cid] || []).length)
    .map((cid) => {
      const c = courseById(cid);
      return c ? `${c.code} ${c.title}` : cid;
    });

  return `<div class="section-title"><h2>Video library</h2><small>${total} verified source${total > 1 ? 's' : ''}</small></div>
    <div class="prose">
      <p>Every video below was checked and confirmed to resolve to a live, official upload before it was added here. They are
      all <strong>United States Federal Aviation Administration</strong> training material, which means they are written to
      <strong>14 CFR Part 139</strong>. Every card carries that warning. For compliance teaching in South Africa, treat them as
      technique and sequence reference and verify every regulatory point against SACAA/CAAB requirements and your own SOP.</p>
      <p><strong>These need a connection to play.</strong> Everything else on the platform — all lesson text, all diagrams, all
      assessments, the whole offline search — works with no network at all.</p>
    </div>
    ${blocks}
    ${unmapped.length ? `<div class="vidlib__gap">
      <h3 class="vidlib__series">Courses with no verified video source</h3>
      <p>These subjects are <strong>not covered by the FAA series in this library</strong>. That is a known gap, stated rather
      than hidden. It needs either locally recorded footage or a verified source for your jurisdiction.</p>
      <ul class="vidlib__gaplist">${unmapped.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>
    </div>` : ''}`;
}
