# AM RISK AND TRAINING — Aviation & ARFF Training Platform

An offline-first training platform for aviation, airport rescue and fire fighting.
**25 courses, 107 lessons, 30 assessment questions** — running entirely on a device,
with the network unplugged.

> *Safer Skies · Stronger Tomorrow* — **Airports · People · Communities**

---

## Read this first — what is and isn't finished

The **platform is complete and working**: navigation, course catalogue, lesson
reader, assessments with explanations, progress tracking, offline caching,
installable as an app, and a portable training record.

The **course content is a scaffold.** What exists today:

| Built | Not built |
|-------|-----------|
| All 25 course structures | Lesson body text (87 of 107 written) |
| All learning outcomes | SME verification of the technical claims |
| All governing standards references | Questions beyond the 30 seeded |
| Eight technical diagrams | Video of your own crews and equipment |
| 18 verified FAA training videos | SME-reviewed local footage |
| Full assessment engine | Content review sign-off |

**Fully written courses (20 of 25):** ART-01 ARFF Foundations & the Regulatory
Framework, ART-02 Determining the Required ARFF Level, ART-03 Levels 1-10 Agents
Vehicles & Discharge Rates, ART-04 Extinguishing Agents, ART-05 Foam Systems
Chambers & Turbines, ART-08 RFF Personnel Training & Competency, ART-09 Emergency
Command & On-Scene Command, ART-15 Aircraft Engine APU & Fuel System Fires, ART-16
Firefighting Tactics & Agent Application, ART-18 Communications Alerting & ATC, and
ART-06 RFF Vehicles & Emergency Appliances, ART-07 PPE SCBA & Crew Fitness, ART-10 Aircraft Rescue Access & Extrication, ART-11 Aircraft Familiarisation
& Live Fire, ART-19 Aerodrome Emergency Planning & Full-Scale Exercise, ART-13 Dangerous Goods & Hazardous Cargo, ART-14 Lithium Battery Hazards &
Response, ART-20 Responding to the Unexpected, ART-23 Off-Airport & Remote Stand Response, and ART-12 Aviation Fuel, Refuelling & Spill Response.

**No unreviewed content is ever presented as fact.** Every lesson without written
body content renders a visible **"Lesson not yet written"** banner. Every assessment
in an unreviewed course renders an **"Assessment in draft"** banner. Questions that
assert something technical carry a `sme: true` flag and show a *"Pending SME
verification"* warning when answered.

This is deliberate. In a safety-critical training product, content that looks
finished but has not been reviewed is worse than content that is visibly
unfinished.

### About the national regulations quoted here

Lessons in ART-01, ART-02, ART-04, ART-08, ART-09, ART-15 and ART-18 quote **GCAA CAR Part XI — Aerodrome
Emergency Services, Facilities and Equipment** in detail: the two-minute response
time, the category-by-fuselage-width rule, the training needs analysis and
frequency analysis, the Structured Learning Programme, the Certificate of
Competence, and the four-year maximum reassessment interval.

That document is issued by the General Civil Aviation Authority of the **United
Arab Emirates**. It is used here as a worked example of how a State adopts ICAO
Annex 14 Chapter 9 into domestic law — because it is a clean, publicly available
illustration — and it is labelled as such everywhere it appears.

**It is not necessarily your law.** This platform does not know which State you
are in and will not guess. Before any of those figures is taught, taught to your
crew, or quoted to an inspector, find your own authority's instrument and confirm
its issue number and date. Lesson ART-01 m5 has a checklist for doing that.

---

## Running it

**It is already live:**

> **https://amriskarff33-hue.github.io/amrisk-arff-training/**

Open that on any phone or tablet and use "Add to Home Screen" — it installs as
an app and works with no connection. Requires HTTPS, which is why the live URL
matters; the local options below are for development.

Source of truth is `github.com/amriskarff33-hue/amrisk-arff-training` (branch
`main`, GitHub Pages from the repo root). Pushing is all the deployment there is.

**Double-click `index.html`.** It also works straight off the filesystem. The scripts
are deliberately classic (non-module) so `file://` is not blocked by CORS.

To serve it instead (needed for installability and offline caching):

```sh
cd "/Users/imac/Documents/Default Project/arff-training"
python3 -m http.server 8777
# open http://127.0.0.1:8777/index.html
```

The service worker is **not** registered on `localhost` — a stale-while-revalidate
worker will serve stale assets to whoever is developing it. It registers on any
real host, which is where offline actually matters.

### Installing as an app

Serve it over HTTP and use the browser's *Add to Home Screen* / *Install* action.
It installs standalone, offline, with the brand icon and the three shortcuts.

---

## Writing content

This is the part that matters, and it is meant to be done by a subject-matter
expert rather than a developer.

### Adding a lesson body

Open `js/lessons.js` and add an entry to `LESSON_OVERRIDES`, keyed by the module id:

```js
'art07-m2': {
  title: 'Donning, doffing and buddy checks',
  brief: 'One short paragraph on what this lesson is for.',
  points: [
    'A specific thing the responder must be able to do or know.',
    'Another — each should be checkable against the cited standard.'
  ],
  body: `
    <h3>Heading</h3>
    <p>Plain HTML only. <code>, <strong>, <ul>, <ol>, <table> all work.</p>
  `,
  refs: [
    'NFPA 6001 §5',
    'Manufacturer instructions, section 4'
  ],
  smeChecked: false      // flip to true only after a qualified reviewer signs off
},
```

Any module **without** an entry automatically renders a scaffold that names the
governing standard and lists what the lesson must cover. Nothing breaks, and the
gap is visible rather than hidden.

### Adding a diagram

Six technical diagrams ship with the platform, drawn from the published
requirements and captioned with their source clause:

| Key | Shows |
|-----|-------|
| `hot-brake-approach` | Correct fore/aft quarter approach vs the side-on approach in line with the axle (Doc 9137 §12.2.3) |
| `hot-brake-cooling` | Localised shock versus distributed fog, and why solid streams are a last resort (§12.2.4) |
| `critical-area` | Theoretical and practical critical area, 24 m upwind / 6 m downwind, with the formulas (§2.4.2–2.4.6) |
| `jet-blast-zones` | 10 m intake keep-out and the 500 m aft blast hazard (§12.2.11–12.2.12) |
| `vehicle-positioning` | Uphill and upwind, egress protection, turret coverage, leaving a way out (§12.3) |
| `water-quantity` | Q = Q1 + Q2, with a worked example and the most common calculation trap (§2.4.7–2.4.9) |

Drop one into any lesson body:

```
{{diagram:hot-brake-approach}}
```

To add your own, write a function returning SVG markup in `js/diagrams.js` and
register it in `DIAGRAMS`. Style with the `.dg-*` classes rather than inline
`fill`/`stroke` attributes, so the diagram re-themes correctly in day mode.

### Adding video

Videos render as a card with a play button. The player is only created when the
learner clicks, so a page with several videos costs nothing until it is used.

```
{{video:faa-intro-9}}
```

Every entry in `VIDEO_LIBRARY` was verified to exist and to permit embedding.
Re-verify before a safety deployment:

```sh
curl "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json"
```

**These 18 videos are all published by the FAA** and are written against US
14 CFR Part 139, AC 150/5210 and NFPA. The principles are international; the
regulatory citations, the ARFF Index concept and the equipment references are
not. Every card carries that warning. Treat them as technique and principle
training, and check regulatory statements against SACAA/CAAB requirements.

Courses pick up their videos automatically from `VIDEO_COURSES` — you do not
need to add a `{{video:}}` to a lesson to give a course a video section. All but
three courses currently have one; lithium batteries, adverse weather and
wildfire interface have no FAA equivalent.

### Recording your own video

`LOCAL_VIDEO` in `js/videos.js` is the template for footage your SMEs record on
station. These play with no connection at all, and are the only videos that will
work on a genuinely offline device:

```js
'scba-donning': {
  local: 'media/scba-donning.mp4',
  title: 'Donning and doffing SCBA',
  credit: 'AM RISK AND TRAINING — recorded on station'
}
```

Put the file in `media/`, then **add its path to the `PRECACHE` list in `sw.js`**
or it will not be available offline.

> Video is for technique you need to *see* — donning SCBA, working a foam
> attack, an extrication. Geometry and doctrine are better served by the
> diagrams, which are a few kilobytes instead of megabytes, stay sharp at any
> zoom, work with no network, and are searchable.

### Adding assessment questions

Questions live inside each course in `js/curriculum.js`:

```js
{
  q: 'Your question?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  answer: 1,                 // zero-based index
  why: 'Why the right answer is right — this is the teaching, show it.',
  sme: true                  // set when the answer asserts something technical
}
```

The `why` field is not optional in practice. A question that only reports a score
teaches nothing on the questions the learner got wrong.

### Marking a course as reviewed

In `js/curriculum.js`, change the course's `review` field:

```js
review: 'reviewed',     // was 'scaffold'
```

That removes the draft pill and the assessment draft banner. **Only do this when an
SME has actually verified the content against the current edition of the standard.**

### Shipping changes to learners

Bump the cache-buster in `index.html` on all six `<script>` tags and the
stylesheet (`?v=4` → `?v=5`), and bump `CACHE_VERSION` in `sw.js`. Without this,
returning learners keep running the old build from the service worker cache.

`CACHE_VERSION` is the one that matters — it names the cache itself, and the
`activate` handler deletes every other one. The `?v=` query is only there to
bypass the HTTP cache on GitHub Pages.

There is a one-line script so this is not a thing to remember:

```sh
./deploy/pages.sh "describe the change"
```

It checks syntax, bumps both cache-busters, commits, pushes, waits for Pages,
and confirms the CDN is serving the new build.

**One expected delay.** A learner whose service worker is already active sees
the *previous* build on their next load and the new one on the load after. That
is stale-while-revalidate working as intended — the worker returns the cached
copy immediately and refreshes it in the background. For this audience it is a
feature, not a bug: a lesson should never change halfway through a sitting.

### Checking that offline actually works

A service worker's console is invisible from the page, so a precache that fails
leaves you with an app that looks installed and is not. On every install the
worker writes its own audit into the cache:

```sh
# after loading the app once, with the cache name from sw.js
caches.open('amrisk-arff-v6').then(c => c.match('./precache-report.json'))
  .then(r => r.json()).then(console.log)
```

or paste `await (await caches.open('amrisk-arff-v6')).match('./precache-report.json').json()`
into the browser console. It reports how many files were expected, how many were
stored, which are missing, and the error message for any that failed. A healthy
install reports `missing: []` and `failures: {}`.

One trap worth knowing: the precache stores plain paths (`js/app.js`) while
`index.html` requests cache-busted ones (`js/app.js?v=4`), and Cache Storage
compares the whole URL including the query. `matchShell()` in `sw.js` falls back
to a path-only match for exactly this reason — without it, the precache is
decorative and the app only works online because the fetch handler happens to
stash the versioned URLs as it streams them.

To test properly, delete the versioned entries and reload:

```js
const c = await caches.open('amrisk-arff-v6');
for (const r of await c.keys()) if (new URL(r.url).search) await c.delete(r);
location.reload();
```

If the app still comes up, the precache is doing its job.

Note that removing the cache does **not** re-trigger the worker's `install`
handler, so a cache emptied underneath a live registration stays empty until
`CACHE_VERSION` changes. Delete the registration as well when testing a
genuinely cold install.

---

## The 25 courses

| # | Code | Course | Track |
|---|------|--------|-------|
| 1 | ART-01 | ARFF Foundations & the Regulatory Framework | Core Foundations |
| 2 | ART-02 | Determining the Required ARFF Level | Core Foundations |
| 3 | ART-03 | Levels 1–10: Agents, Vehicles & Discharge Rates | Core Foundations |
| 4 | ART-04 | Extinguishing Agents: Foam, Water and Dry Chemical | Equipment & Agents |
| 5 | ART-05 | Foam Systems, Chambers & Turbines | Equipment & Agents |
| 6 | ART-06 | RFF Vehicles & Emergency Appliances | Equipment & Agents |
| 7 | ART-07 | PPE, SCBA & Crew Fitness | Equipment & Agents |
| 8 | ART-08 | RFF Personnel Training & Competency | Core Foundations |
| 9 | ART-09 | Emergency Command & On-Scene Command | Emergency Response |
| 10 | ART-10 | Aircraft Rescue, Access & Extrication | Operations |
| 11 | ART-11 | Aircraft Familiarisation & Live Fire | Operations |
| 12 | ART-12 | Aviation Fuel, Refuelling & Spill Response | Operations |
| 13 | ART-13 | Dangerous Goods & Hazardous Cargo | Operations |
| 14 | ART-14 | Lithium Battery Hazards & Response | Operations |
| 15 | ART-15 | Aircraft Engine, APU & Fuel System Fires | Operations |
| 16 | ART-16 | Firefighting Tactics & Agent Application | Operations |
| 17 | ART-17 | Rover, Spot Fire & Follow-up Vehicles | Operations |
| 18 | ART-18 | Communications, Alerting & Air Traffic Coordination | Emergency Response |
| 19 | ART-19 | Aerodrome Emergency Planning & Full-Scale Exercise | Readiness & Leadership |
| 20 | ART-20 | Responding to the Unexpected | Emergency Response |
| 21 | ART-21 | RFF Operations in Adverse Weather | Operations |
| 22 | ART-22 | Wildfire Interface & Airfield Vegetation Fires | Operations |
| 23 | ART-23 | Off-Airport & Remote Stand Response | Emergency Response |
| 24 | ART-24 | Emergency Medical Response & Casualty Care | Emergency Response |
| 25 | ART-25 | Water Supply, Hydrants & Sustainability | Equipment & Agents |

---

## How it is built

No framework, no build step, no dependencies. Plain HTML, CSS and JavaScript.
Same deliberate approach as the marshalling signals app.

| File | What it holds |
|------|---------------|
| `index.html` | Shell: app bar, view container, tab bar |
| `css/app.css` | Everything visual. Brand tokens in `:root`; day/night via `html[data-theme]` |
| `js/curriculum.js` | **All 25 courses** — outcomes, modules, standards, assessments |
| `js/lessons.js` | `LESSON_OVERRIDES` — written lesson bodies, plus the scaffold generator |
| `js/diagrams.js` | Six technical SVG diagrams, captioned with their source clauses |
| `js/videos.js` | Verified FAA training videos, plus the local-file template |
| `js/store.js` | Progress, quiz history, export/import, local persistence |
| `js/app.js` | Router, views, quiz engine, offline index search |
| `sw.js` | Offline precache + stale-while-revalidate |
| `manifest.webmanifest` | PWA install metadata |
| `assets/` | Brand mark and icons |

### Design decisions worth knowing

- **Hash routing** so it behaves identically from a server and from `file://`.
- **One global scope, no ES modules** — modules are CORS-blocked over `file://`,
  and running from a bare double-click is a real deployment target here.
- **Course completion requires both** all lessons done *and* the assessment
  passed. Reading alone is not completing.
- **Quiz best score is a high-water mark.** A later worse attempt never erases a
  pass, because pass/fail is what gets recorded.
- **Completed modules are a union on import**, so merging two records never loses
  progress. Records are portable by design — USB stick to instructor.
- **The Coach is an offline index, not a model.** It searches the same curriculum
  data the rest of the app reads, so it works unplugged and cannot invent an
  answer. `answerFromIndex()` in `app.js` is the single seam where a real model
  would later plug in.

---

## Accuracy and sourcing

Course structure, learning outcomes and standard references were built against the
public framework of:

- **ICAO Annex 14 Vol I** — Aerodromes, Ch 9 (Rescue and Fire Fighting)
- **ICAO Doc 9137 Part 1** — Airport Services Manual, Rescue and Fire Fighting
- **ICAO Annex 16 Vol I** — Aircraft Categories; **Annex 19** — Safety Management
- **IATA DGR** and **ICAO Technical Instructions** — dangerous goods
- **NFPA 403, 405, 412, 414** — RFF services, training, foam systems, vehicles
- **NFPA 600/6001, 1561** — PPE, SCBA, personnel health and safety
- **IATA IGAMS / JIG** — fuel; **NFPA 30** — flammable liquids

**These documents are not reproduced here, and must not be.** ICAO Annexes are
saleable, copyrighted documents — they are not freely redistributable. The same
applies to NFPA standards and to the IATA regulations. This platform references
them and teaches around them; it does not reproduce them.

Anyone writing lesson content must do the same: teach the concept, cite the clause,
and never paste the standard text.

**This is a training aid, not an authoritative source.** Before relying on anything
here operationally, or quoting it in an assessment, verify against the current
official documents, your State's AIP and Civil Aviation Authority requirements, and
your operator's SOPs. Real practice varies between operators and States.

---

## Deploying on the NOMAD server

See [`deploy/nomad.md`](deploy/nomad.md) for serving this from your
`project-amriskoffline` fork, including the zero-code Supply Depot option.

[`deploy/nomad-ai.md`](deploy/nomad-ai.md) covers NOMAD's local AI assistant:
which of the ARFF source documents are worth loading into its knowledge base,
the hardware it actually requires, questions to test it against before anyone
else uses it, and the warning learners must see. It is a separate decision from
deploying this platform — the platform does not need it, and does not use it.
