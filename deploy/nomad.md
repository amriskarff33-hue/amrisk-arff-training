# Deploying the training platform on Project NOMAD

Your fork is `amriskarff33-hue/project-amriskoffline` (already forked from
`Crosstalk-Solutions/project-nomad`). NOMAD is an offline-first server for a
Debian/Ubuntu host, and the training platform is a static site — so there are
three ways to put them together, in increasing order of integration.

Pick **Option A** unless you specifically want the platform inside the Command
Center's own UI. A is a few minutes and needs no code changes.

---

## Option A — Supply Depot custom app (recommended, zero code)

NOMAD's Supply Depot can run any Docker container as a managed app. Serve this
folder with nginx and it appears in the Depot with an **Open** button, Logs,
Stats, Updates and health checks, exactly like a built-in tool.

### 1. Put the platform on the NOMAD host

```sh
# on the NOMAD host
sudo mkdir -p /opt/project-nomad/storage/arff-training
cd /opt/project-nomad/storage/arff-training

# copy the arff-training folder here, e.g.
sudo cp -r /path/to/arff-training/* /opt/project-nomad/storage/arff-training/
```

### 2. Add it as a custom app

In the Command Center: **Supply Depot → Add a custom app**

| Field | Value |
|-------|-------|
| Name | Aviation & ARFF Training |
| Image | `nginx:1.27-alpine` |
| Port mapping | host `8090` → container `80` |
| Volume bind | `/opt/project-nomad/storage/arff-training` → `/usr/share/nginx/html` (read-only) |

### 3. nginx needs correct MIME types and no caching on the shell

Create `nginx.conf` beside the app and bind it over
`/etc/nginx/conf.d/default.conf`:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # The service worker must never be served stale, or learners pin an old build.
    location = /sw.js {
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # Everything else can be cached, but revalidate so updates land.
    location ~* \.(js|css|png|svg|webmanifest)$ {
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The app is then at `http://YOUR-NOMAD:8090/`. Over the LAN, any tablet or laptop
on the station Wi-Fi can reach it.

### Why this is the right default

- No changes to the NOMAD codebase, so **updating NOMAD does not conflict**.
- Content updates are a file copy plus `sudo docker restart nomad_nginx`, no
  rebuild of the Command Center image.
- Each learner device installs it once and then runs with no network at all.
- Progress stays on each device; learners export a JSON record for the instructor.

---

## Option B — Bundle it into the fork

If you want the platform versioned with your NOMAD fork, add it to the repo and
serve it from the Command Center's static root.

### 1. Add the folder

```sh
git clone https://github.com/amriskarff33-hue/project-amriskoffline.git
cd project-amriskoffline
cp -r "/Users/imac/Documents/Default Project/arff-training" admin/public/training
```

`admin/public/` is the Command Center's static root, so it lands at
`http://YOUR-NOMAD:8080/training/`.

### 2. Make the service worker scope work

A service worker can only control paths **below** its own directory. At
`/training/sw.js` its default scope is `/training/`, which is exactly right — no
change needed. Just do **not** move `sw.js` to the site root.

### 3. Add a tile to the Command Center home

In `admin/app/controllers/home_controller.ts`, add the tile to the array the home
page reads, pointing at `/training/`. Follow an existing tile's shape — each is
just a label, an href, an icon key from `admin/constants/link_tile_icons.ts` and
a colour from `link_tile_colors.ts`.

### 4. Rebuild

```sh
cd admin && npm ci && npm run build
cd .. && docker build -t arff-nomad .
```

### 5. Add it to Easy Setup

`admin/app/controllers/easy_setup_controller.ts` drives the first-run wizard.
Add the app to the education step's `services` array so a new station gets the
training platform during setup rather than having to find it later.

---

## Option C — Add it as a dedicated Supply Depot catalogue entry

Belt and braces if you want it in the curated catalogue rather than as a manual
custom app. The catalogue is the `services` table, seeded from
`admin/database/seeders/service_seeder.ts`. Add a row following the Kolibri entry
(`SERVICE_NAMES.KOLIBRI_GEN2`), with `container_image: 'nginx:1.27-alpine'`, a
bind mounting your content folder, and a friendly name of *Aviation & ARFF
Training*.

This ships to every station that installs that NOMAD build. Only do it once the
content is real — do not ship a catalogue entry that points learners at draft
lessons.

---

## Syncing content updates to deployed stations

Content lives in four files. Updating it does not require touching the platform:

```
js/curriculum.js    course structure, outcomes, assessments
js/lessons.js       written lesson bodies
css/app.css         styling and brand tokens
assets/             logo and icons
```

### After every content change

1. Bump the cache-buster in `index.html` — all four `<script>` tags and the
   stylesheet, `?v=1` → `?v=2`.
2. Bump `CACHE_VERSION` in `sw.js`.

Both are required. Without the first, learners' browsers reuse cached scripts.
Without the second, the service worker keeps serving its precached copy and the
update never reaches anyone.

Then push and redeploy the files. For Option A:

```sh
scp -r arff-training/* user@nomad:/opt/project-nomad/storage/arff-training/
ssh user@nomad 'sudo docker restart nomad_nginx'
```

---

## Multi-device and multi-learner at a station

- Each learner trains on their own device, with their own record.
- **Export** from the Progress tab gives a single dated JSON file.
- The instructor collects those files and **Import**s them into a roster machine
  to build a cohort view. Imports merge: a lesson completed anywhere stays
  complete, and a pass is never lost.
- Kolibri, already in NOMAD, is the better choice if you need managed accounts,
  classroom assignment and a teacher-side view. Use this platform for ARFF
  content and Kolibri for broader coursework.

---

## A note on licensing before you publish

NOMAD itself is Apache 2.0. **Course content is a separate question.** ICAO
Annexes, NFPA standards, IATA DGR and IGAMS are all saleable, copyrighted
documents and are not freely redistributable. This platform references and cites
them without reproducing them, which is the right posture — keep it that way.

Also note that NOMAD's own Creator Pack licence prohibits bundling Creator Pack
content with a fork. Build your own content packs; don't redistribute theirs.

Check with your own legal counsel before publishing commercially.
