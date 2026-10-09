#!/usr/bin/env python3
"""
PHOTO INTAKE — build a selection sheet from a photo library.

Why this exists
---------------
The platform can render photographs (js/photos.js, `{{photo:key}}`), but the
model cannot look at images. Choosing which photographs teach an ARFF lesson
therefore cannot be automated here, and it should not be: a photograph of an
accident is graphic or not depending on what is in it, and that judgement is a
person's. So this script does the mechanical part — reads dimensions, file size,
EXIF capture date, camera and GPS from every candidate, generates a thumbnail,
and lays them out as a browsable sheet with a checkbox. The reviewer picks.

It also refuses to guess about rights. Every image is stamped RIGHTS UNCONFIRMED
and the sheet carries the notice that nothing may be shipped until the operator
confirms in writing that they hold the licence. Photographs of aircraft accidents
are commercially licensed or copyrighted almost without exception; that is the
operator's decision to make and their liability to carry, not a default to assume.

Usage
-----
    python3 deploy/photo-inventory.py <library-root> <out-dir> [--max-per-folder N]

Folders scanned are an explicit list. A 924 GB volume is not walked blindly.

    python3 deploy/photo-inventory.py "/Volumes/AM ARFF" /tmp/arff-photos

Writes <out-dir>/inventory.json and <out-dir>/ARFF-PHOTO-INTAKE.html, and
copies the finished sheet to ~/Desktop.
"""

import json
import os
import shutil
import sys
import time
from html import escape

try:
    from PIL import Image, ExifTags
except ImportError:
    sys.exit("PIL is required: python3 -m pip install --user pillow")

# ARFF-relevant folders on the operator's library, with the lesson stream each
# one feeds. "graphic" marks folders whose contents are likely to show casualties
# — the reviewer must look before anything from them is used.
FOLDERS = [
    ("PICS MASTER/AM RISK",                  "operator own photography",              False),
    ("PICS MASTER/aircraft fire training",   "ART-16 tactics, ART-08 drills",         False),
    ("PICS MASTER/engine ingestion",         "ART-15 engine fires",                   False),
    ("PICS MASTER/ENGINE DANGERS",           "ART-15 engine fires",                   False),
    ("PICS MASTER/landing gear",             "ART-11 familiarisation",                False),
    ("PICS MASTER/aircraft compartments",    "ART-10 rescue, ART-11 cabin",           False),
    ("PICS MASTER/PPE",                      "ART-07 PPE and SCBA",                   False),
    ("PICS MASTER/rescue",                   "ART-10 rescue and extrication",         False),
    ("PICS MASTER/Dangerous  Goods Pictures","ART-13 dangerous goods",                False),
    ("PICS MASTER/bird strike",              "ART-03 wildlife hazard",                False),
    ("PICS MASTER/RAMP ACCIDENTS",           "ART-20 contingency",                    True),
    ("PICS MASTER/aircraft accidents",       "ART-20 contingency",                    True),
    ("PICS MASTER/Failed Suicide",           "ART-20 contingency",                    True),
    ("PICS MASTER/piper alpha",              "ART-11 aircraft familiarisation",       False),
    ("PICS MASTER/BURNOUT",                  "ART-15 hot brakes, ART-16 positioning", False),
    ("PICS MASTER/SAA - Cape Town",          "ART-11 aircraft familiarisation",       False),
    ("PICS MASTER/JAN SMUTS",                "ART-11 aircraft familiarisation",       False),
    ("PICS MASTER/aircraft",                 "ART-11 aircraft familiarisation",       False),
    ("PICS MASTER/WASH BAY",                 "ART-25 water supply",                   False),
    ("PICS MASTER/jetblast",                 "ART-15 jet blast",                      False),
    ("CRASH CHARTS",                         "ART-20 contingency",                    True),
]

EXTS = (".jpg", ".jpeg", ".png", ".gif", ".tif", ".tiff")
THUMB_MAX = 300
WEB_MAX_BYTES = 220_000          # the PWA budget enforced by deploy/check-media.js
WEB_MAX_EDGE = 1280


def gps_from_exif(exif):
    """Return (lat, lon) as signed decimals, or (None, None)."""
    try:
        gps = exif.get_ifd(0x8825)
    except Exception:
        return None, None
    if not gps:
        return None, None

    def to_deg(v):
        if not v:
            return None
        d, m, s = [float(x) for x in v]
        return d + m / 60.0 + s / 3600.0

    try:
        lat = to_deg(gps.get(2))
        lon = to_deg(gps.get(4))
        if lat is None or lon is None:
            return None, None
        if gps.get(1) in ("S", "W"):
            lat, lon = -lat, -lon
        return round(lat, 5), round(lon, 5)
    except Exception:
        return None, None


def first(exif, tag):
    v = exif.get(tag)
    return v.strip() if isinstance(v, str) and v.strip() else None


def probe(path):
    """Read metadata and make a thumbnail. Never raises."""
    rec = {
        "path": path, "name": os.path.basename(path),
        "bytes": os.path.getsize(path), "ok": False,
    }
    try:
        with Image.open(path) as im:
            rec["w"], rec["h"] = im.size
            ex = im.getexif()
            if ex:
                rec["date"] = first(ex, 36867) or first(ex, 306)
                rec["camera"] = " ".join(
                    x for x in (first(ex, 271), first(ex, 272)) if x) or None
                lat, lon = gps_from_exif(ex)
                rec["lat"], rec["lon"] = lat, lon
            rec["ok"] = True
    except Exception as e:
        rec["error"] = str(e)[:80]
        return rec, None

    # Web-ready flag: does this file already fit the PWA budget, or need a copy?
    longest = max(rec["w"], rec["h"])
    rec["needs_resize"] = rec["bytes"] > WEB_MAX_BYTES or longest > WEB_MAX_EDGE
    return rec, rec["path"]


def make_thumb(path, thumb_dir, stem):
    """Thumbnails use JPEG draft() so the original is read at reduced scale.
       On a slow external volume that is the difference between minutes and
       hours for a thousand files."""
    out = os.path.join(thumb_dir, stem + ".jpg")
    try:
        with Image.open(path) as im:
            try:
                im.draft("RGB", (THUMB_MAX, THUMB_MAX))
            except Exception:
                pass
            im = im.convert("RGB")
            im.thumbnail((THUMB_MAX, THUMB_MAX))
            im.save(out, "JPEG", quality=72, optimize=True)
        return out
    except Exception:
        return None


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    root = sys.argv[1]
    out_dir = sys.argv[2]
    max_per = 400

    args = sys.argv[3:]
    if "--max-per-folder" in args:
        max_per = int(args[args.index("--max-per-folder") + 1])

    thumb_dir = os.path.join(out_dir, "thumbs")
    os.makedirs(thumb_dir, exist_ok=True)

    inventory = []
    t0 = time.time()
    for rel, feeds, graphic in FOLDERS:
        d = os.path.join(root, rel)
        if not os.path.isdir(d):
            print("skip (missing): %s" % rel)
            continue
        found = []
        for dirpath, _dirs, files in os.walk(d):
            for f in files:
                if f.lower().endswith(EXTS):
                    found.append(os.path.join(dirpath, f))
        found.sort()
        if len(found) > max_per:
            print("cap: %s has %d, taking %d" % (rel, len(found), max_per))
            found = found[:max_per]

        for i, path in enumerate(found):
            rec, _ = probe(path)
            rec["folder"] = rel
            rec["feeds"] = feeds
            rec["graphic_likely"] = graphic
            rec["rights"] = "UNCONFIRMED"
            stem = rec["folder"].replace("/", "_").replace(" ", "") + "__%04d" % i
            thumb = make_thumb(path, thumb_dir, stem)
            rec["thumb"] = os.path.basename(thumb) if thumb else None
            inventory.append(rec)
        print("  %-42s %4d images  (%.0fs)" % (rel, len(found), time.time() - t0))

    with open(os.path.join(out_dir, "inventory.json"), "w") as f:
        json.dump(inventory, f, indent=1)

    write_sheet(inventory, out_dir)
    shutil.copy(os.path.join(out_dir, "ARFF-PHOTO-INTAKE.html"),
                os.path.expanduser("~/Desktop/ARFF-PHOTO-INTAKE.html"))

    ok = sum(1 for r in inventory if r["ok"])
    print("\n%d images, %d readable, %d thumbnails"
          % (len(inventory), ok, sum(1 for r in inventory if r["thumb"])))
    print("wrote %s/ARFF-PHOTO-INTAKE.html and ~/Desktop/ARFF-PHOTO-INTAKE.html"
          % out_dir)


def write_sheet(inv, out_dir):
    by_folder = {}
    for r in inv:
        by_folder.setdefault(r["folder"], []).append(r)

    def cell(r):
        if not r["ok"]:
            return ('<figure class="bad"><div class="noimg">unreadable</div>'
                    '<figcaption>%s</figcaption></figure>' % escape(r["name"]))
        meta = []
        meta.append("%d&times;%d" % (r["w"], r["h"]))
        meta.append("%.1f MB" % (r["bytes"] / 1e6))
        if r.get("date"):
            meta.append(escape(r["date"][:10]))
        if r.get("lat") is not None:
            meta.append("%.3f, %.3f" % (r["lat"], r["lon"]))
        if r.get("camera"):
            meta.append(escape(r["camera"][:26]))
        meta.append("resize needed" if r.get("needs_resize") else "fits as-is")
        thumb = ('<img src="thumbs/%s" alt="%s" loading="lazy">'
                 % (r["thumb"], escape(r["name"]))) if r["thumb"] else ""
        cls = "fig" + (" graphic" if r["graphic_likely"] else "")
        return (
            '<figure class="%s" data-folder="%s" data-name="%s">%s'
            '<figcaption><strong>%s</strong><br><span class="m">%s</span></figcaption>'
            '<label><input type="checkbox" class="pick"> use</label></figure>'
            % (cls, escape(r["folder"]), escape(r["name"]), thumb,
               escape(r["name"][:44]), " &middot; ".join(meta)))

    sections = []
    for folder, rows in by_folder.items():
        graphic = any(r["graphic_likely"] for r in rows)
        note = ('<p class="warn">Likely to show casualties. Look before you tick.</p>'
                if graphic else "")
        sections.append(
            "<h2>%s <small>%d images</small></h2>%s<p class=\"feeds\">Feeds: %s</p>"
            "<div class=\"grid\">%s</div>"
            % (escape(folder), len(rows), note,
               escape(rows[0]["feeds"]),
               "".join(cell(r) for r in rows)))

    total = len(inv)
    doc = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>ARFF photo intake &mdash; %d images</title>
<style>
 :root{color-scheme:dark}
 body{margin:0;padding:28px 32px 80px;background:#051223;color:#E8EEF7;
      font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
 h1{font-size:24px;margin:0 0 6px}
 h2{font-size:17px;margin:34px 0 4px;color:#E3B77E;border-top:1px solid #243750;padding-top:18px}
 h2 small{color:#7C8CA8;font-weight:400}
 .lead{color:#9FB2CC;max-width:78ch}
 .rights{border:1px solid #B36B51;background:rgba(179,107,81,.13);padding:14px 18px;
         border-radius:10px;margin:18px 0 6px;max-width:88ch}
 .rights b{color:#CC9B67}
 .warn{color:#C2603F;margin:6px 0 0}
 .feeds{color:#7C8CA8;margin:2px 0 12px;font-size:13px}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
 figure{margin:0;background:#0C1C39;border:1px solid #243750;border-radius:9px;
        overflow:hidden;display:flex;flex-direction:column}
 figure.graphic{border-color:#6B3B2E}
 figure img{width:100%%;height:170px;object-fit:cover;display:block;background:#0A1526}
 figure.bad .noimg{height:170px;display:flex;align-items:center;justify-content:center;
        color:#6B7A96;font-size:13px}
 figcaption{padding:8px 10px 4px;font-size:12px;word-break:break-word}
 figcaption .m{color:#8FA3C0;font-size:11px}
 figure label{padding:4px 10px 9px;font-size:12px;color:#B58554;cursor:pointer}
 .bar{position:sticky;top:0;background:#051223ee;backdrop-filter:blur(8px);
      padding:12px 0;border-bottom:1px solid #243750;z-index:5;display:flex;
      gap:12px;align-items:center;flex-wrap:wrap}
 button{background:#B58554;color:#051223;border:0;border-radius:7px;padding:9px 16px;
        font-weight:700;font-size:14px;cursor:pointer}
 button.ghost{background:#243750;color:#E8EEF7}
 #out{background:#0C1C39;border:1px solid #243750;border-radius:7px;padding:9px;
      color:#9FB2CC;font:12px ui-monospace,monospace;max-height:150px;overflow:auto;
      flex:1;min-width:260px;white-space:pre-wrap}
 .count{color:#E3B77E;font-weight:700}
</style></head><body>
<h1>ARFF photo intake</h1>
<p class="lead">%d images from the operator's library, with dimensions, capture date,
camera and GPS where the file carries them. <b>Rights are unconfirmed on every one
of these.</b> Nothing ships until the operator confirms in writing that they hold
the licence for the specific image.</p>

<div class="rights"><b>Before ticking anything:</b> tick only what you may publish.
Photographs of aircraft accidents are commercially licensed or copyrighted almost
without exception. Where the correct image is one you shot yourself, that is
almost always the answer &mdash; and the <code>PICS MASTER/AM RISK</code> folder
is your own.</div>

<div class="bar">
  <button onclick="pick(true)">Select all shown</button>
  <button class="ghost" onclick="pick(false)">Clear</button>
  <button class="ghost" onclick="onlyGraphic()">Show likely-graphic only</button>
  <button class="ghost" onclick="onlyResize()">Show resize-needed only</button>
  <span class="count" id="n">0 selected</span>
  <div id="out">selection appears here &mdash; copy it back to me</div>
</div>
%s

<script>
var boxes=[].slice.call(document.querySelectorAll('.pick'));
function tally(){var s=boxes.filter(function(b){return b.checked;});
  document.getElementById('n').textContent=s.length+' selected';
  document.getElementById('out').textContent=s.length?s.map(function(b){
    var f=b.closest('figure');
    return f.dataset.folder+' :: '+f.dataset.name;}).join('\\n'):'';}
boxes.forEach(function(b){b.addEventListener('change',tally);});
function pick(v){boxes.forEach(function(b){
  if(v&&b.closest('figure').classList.contains('bad'))return;
  b.checked=v;});tally();}
function onlyGraphic(){document.querySelectorAll('.grid figure').forEach(function(f){
  f.style.display=f.classList.contains('graphic')?'':'none';});}
function onlyResize(){document.querySelectorAll('.grid figure').forEach(function(f){
  f.style.display=f.querySelector('.m').textContent.indexOf('resize')>0?'':'none';});}
tally();
</script>
</body></html>""" % (total, total, "".join(sections))

    with open(os.path.join(out_dir, "ARFF-PHOTO-INTAKE.html"), "w") as f:
        f.write(doc)


if __name__ == "__main__":
    main()