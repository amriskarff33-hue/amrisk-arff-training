#!/usr/bin/env python3
"""
PHOTO SHORTLIST — cut 823 unique candidates down to a reviewable set.

Why
---
The full intake sheet has 823 unique images after hash deduplication. That is
too many to review well, and reviewing badly is worse than not reviewing: a
photograph of an aircraft accident is graphic or not depending on what is in it,
and that call belongs to a person who can see it. This script does not make that
call. It only makes the queue shorter and better ordered, so the person who can
see them spends their attention on the ones worth looking at.

Ranking is metadata only — resolution, aspect, file size, capture date, folder.
No attempt is made to guess what is in the picture, and none should be added.
Where the script cannot know, it says so in the sheet.

    python3 deploy/photo-shortlist.py /tmp/arff-photos [per-lesson]

Writes ARFF-PHOTO-SHORTLIST.html and shortlist.json next to the inventory.
"""

import base64
import collections
import json
import os
import sys
from html import escape

# lesson -> (folder, why this folder serves it, how many to shortlist)
TARGETS = [
    ("ART-15 m2 · Hot brakes and wheels", "PICS MASTER/BURNOUT",
     "GPS-stamped set from one aerodrome, 2018-2019. Operator's own photography, so rights are most likely theirs."),
    ("ART-15 m1 · Engine fires", "PICS MASTER/engine ingestion",
     "Engine ingestion and ingestion damage. The only ingestion folder in the library."),
    ("ART-15 m1 · Engine fires", "PICS MASTER/ENGINE DANGERS", ""),
    ("ART-15 m1 · Jet blast", "PICS MASTER/jetblast", ""),
    ("ART-16 · Firefighting tactics", "PICS MASTER/aircraft fire training",
     "Live-fire and training photographs. Practical technique, not theory."),
    ("ART-07 · PPE and SCBA", "PICS MASTER/PPE", ""),
    ("ART-10 · Rescue and extrication", "PICS MASTER/rescue", ""),
    ("ART-10 · Rescue and extrication", "PICS MASTER/aircraft compartments",
     "Interior and access-point reference. Useful for the airframe access lesson."),
    ("ART-13 · Dangerous goods", "PICS MASTER/Dangerous  Goods Pictures",
     "Placards, labels, packaging and load configurations."),
    ("ART-03 · Wildlife hazard", "PICS MASTER/bird strike", ""),
    ("ART-11 · Aircraft familiarisation", "PICS MASTER/aircraft", ""),
    ("ART-11 · Aircraft familiarisation", "PICS MASTER/JAN SMUTS", ""),
    ("ART-11 · Aircraft familiarisation", "PICS MASTER/SAA - Cape Town", ""),
    ("ART-11 · Aircraft familiarisation", "PICS MASTER/piper alpha",
     "Small aircraft, useful against the wide-body assumption."),
    ("ART-11 · Landing gear", "PICS MASTER/landing gear", ""),
    ("ART-25 · Water supply", "PICS MASTER/WASH BAY", ""),
    ("ART-01 · Operator practice", "PICS MASTER/AM RISK",
     "The operator's own images. Safest rights position and the most credible."),
]

# Folders whose contents are likely to show casualties. Never auto-ticked, and
# kept at the bottom of the queue.
GRAPHIC = ("PICS MASTER/aircraft accidents", "PICS MASTER/RAMP ACCIDENTS",
           "PICS MASTER/Failed Suicide", "CRASH CHARTS")

# 1000px on the long edge, not 1600. A lesson figure is read on a phone, where
# 1000px is roughly twice the viewport, so anything larger is bytes spent offline
# for no visible gain. Measured across the 823 unique candidates: 351 are under
# 800px and a further 61 sit between 800 and 1000, which is why several folders
# return nothing at all.
THUMBS = ''

MAX_EDGE = 1000
BAD_ASPECT = (0.35, 3.0)  # outside this it is a crop or a scan artefact


def usable(r):
    if r.get("dup_of") or not r["ok"]:
        return False
    w, h = r.get("w", 0), r.get("h", 0)
    if not w or not h:
        return False
    if max(w, h) < MAX_EDGE:
        return False
    ar = w / float(h)
    return BAD_ASPECT[0] <= ar <= BAD_ASPECT[1]


def score(r, folder):
    s = 0.0
    w, h = r["w"], r["h"]
    s += min(max(w, h), 4000) / 4000.0 * 3          # detail
    if not r.get("needs_resize"):
        s += 1                                        # ships as-is, no conversion
    if r.get("date"):
        s += 0.5                                       # provenance is useful in a caption
    if r.get("lat") is not None:
        s += 0.5
    if folder in ("PICS MASTER/AM RISK", "PICS MASTER/BURNOUT"):
        s += 2.5                                       # operator's own photography
    ar = w / float(h)
    if 1.2 <= ar <= 1.9:                               # natural photographic aspect
        s += 0.6
    return s


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    inv_dir = sys.argv[1]
    global THUMBS
    THUMBS = os.path.join(inv_dir, 'thumbs')
    per = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    inv = json.load(open(os.path.join(inv_dir, "inventory.json")))

    by_folder = collections.defaultdict(list)
    for r in inv:
        by_folder[r["folder"]].append(r)

    chosen = collections.defaultdict(list)
    for lesson, folder, why in TARGETS:
        rows = [r for r in by_folder.get(folder, []) if usable(r)]
        rows.sort(key=lambda r: -score(r, folder))
        # spread the picks across capture dates so one shoot does not fill a slot
        picked, seen_dates = [], collections.Counter()
        for r in rows:
            d = (r.get("date") or "")[:7]
            if seen_dates[d] >= 2:
                continue
            seen_dates[d] += 1
            picked.append(r)
            if len(picked) >= per:
                break
        for r in rows:
            if len(picked) >= per:
                break
            if r not in picked:
                picked.append(r)
        chosen[lesson].append((folder, why, picked))

    # Graphic folders last, and clearly marked.
    graphic_rows = []
    for f in GRAPHIC:
        rows = [r for r in by_folder.get(f, []) if usable(r)]
        rows.sort(key=lambda r: -score(r, f))
        if rows:
            graphic_rows.append((f, rows[:per]))

    json.dump({k: [(f, w, [r["path"] for r in p]) for f, w, p in v] for k, v in chosen.items()},
              open(os.path.join(inv_dir, "shortlist.json"), "w"), indent=1)

    write_sheet(chosen, graphic_rows, len([r for r in inv if r["ok"] and not r.get("dup_of")]))
    print("%d lessons shortlisted, %d candidates"
          % (len(chosen), sum(len(p) for v in chosen.values() for _, _, p in v)))
    print("wrote %s/ARFF-PHOTO-SHORTLIST.html" % inv_dir)
    import shutil
    shutil.copy(os.path.join(inv_dir, "ARFF-PHOTO-SHORTLIST.html"),
                os.path.expanduser("~/Desktop/ARFF-PHOTO-SHORTLIST.html"))
    print("copied to ~/Desktop/ARFF-PHOTO-SHORTLIST.html")


def data_uri(thumb_path):
    """Inline the thumbnail as a data URI.

    The sheet has to survive being copied to the Desktop, which is where it
    actually gets looked at. A relative src="thumbs/x.jpg" resolves against the
    Desktop and every photograph comes up blank, which is exactly what happened.
    Inlining costs about a third more bytes and makes the file portable.
    """
    if not thumb_path:
        return None
    try:
        with open(thumb_path, "rb") as f:
            return "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("ascii")
    except Exception:
        return None


def cell(r):
    meta = ["%dx%d" % (r["w"], r["h"]), "%.0f KB" % (r["bytes"] / 1024.0)]
    if r.get("date"):
        meta.append(escape(r["date"][:10]))
    if r.get("lat") is not None:
        meta.append("GPS %.3f,%.3f" % (r["lat"], r["lon"]))
    meta.append("fits" if not r.get("needs_resize") else "resize")
    uri = data_uri(os.path.join(THUMBS, r["thumb"])) if r.get("thumb") else None
    thumb = '<img src="%s" alt="%s" loading="lazy">' % (uri, escape(r["name"])) if uri else \
            '<span class="nothumb">no thumbnail</span>'
    return ('<figure data-path="%s"><div class="pic">%s</div>'
            '<figcaption><span class="fn">%s</span><span class="m">%s</span></figcaption>'
            '<label><input type="checkbox" class="pick"> use</label></figure>'
            % (escape(r["path"]), thumb, escape(r["name"][:34]), " · ".join(meta)))


def write_sheet(chosen, graphic_rows, unique_total):
    secs = []
    for lesson, blocks in chosen.items():
        inner = []
        for folder, why, picked in blocks:
            if not picked:
                continue
            w = '<p class="why">%s</p>' % escape(why) if why else ""
            inner.append('<h4>%s <small>%d</small></h4>%s<div class="grid">%s</div>'
                         % (escape(folder), len(picked), w, "".join(cell(r) for r in picked)))
        if inner:
            secs.append("<section><h2>%s</h2>%s</section>" % (escape(lesson), "".join(inner)))

    gsecs = []
    for folder, rows in graphic_rows:
        gsecs.append("<section><h2>%s <small>%d shown of %d usable</small></h2>"
                     '<p class="warn">Likely to show casualties or severe damage. Look at every one before ticking. '
                     'If the correct image is one you shot, that is almost always the better answer.</p>'
                     '<div class="grid">%s</div></section>'
                     % (escape(folder), len(rows), len(rows), "".join(cell(r) for r in rows)))

    doc = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>ARFF photo shortlist</title>
<style>
 :root{color-scheme:dark}
 body{margin:0;padding:24px 28px 90px;background:#051223;color:#E8EEF7;
      font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
 h1{font-size:23px;margin:0 0 4px}
 h2{font-size:16px;color:#E3B77E;margin:30px 0 6px;border-top:1px solid #243750;padding-top:16px}
 h2 small{color:#7C8CA8;font-weight:400;font-size:13px}
 h4{font-size:14px;color:#CC9B67;margin:16px 0 2px;font-weight:600}
 h4 small{color:#7C8CA8;font-weight:400}
 .lead{color:#9FB2CC;max-width:80ch;margin:0 0 14px}
 .why{color:#7C8CA8;font-size:12.5px;margin:0 0 8px;max-width:80ch}
 .warn{color:#C2603F;font-size:13px;margin:0 0 10px;max-width:80ch}
 .rights{border:1px solid #B36B51;background:rgba(179,107,81,.13);padding:13px 16px;
         border-radius:9px;max-width:88ch;margin:16px 0}
 .rights b{color:#CC9B67}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:11px}
 figure{margin:0;background:#0C1C39;border:1px solid #243750;border-radius:8px;overflow:hidden}
 .pic{height:150px;background:#0A1526}
 .pic img{width:100%%;height:150px;object-fit:cover;display:block}
 figcaption{padding:7px 9px 3px;font-size:12px}
 .fn{display:block;word-break:break-all;color:var(--text,#E8EEF7)}
 .m{color:#8FA3C0;font-size:11px}
 figure label{padding:3px 9px 8px;font-size:12px;color:#B58554;cursor:pointer}
 .bar{position:sticky;top:0;background:#051223f2;backdrop-filter:blur(8px);padding:11px 0;
      border-bottom:1px solid #243750;z-index:5;display:flex;gap:11px;align-items:center;flex-wrap:wrap}
 button{background:#B58554;color:#051223;border:0;border-radius:7px;padding:9px 15px;
        font-weight:700;font-size:14px;cursor:pointer}
 button.ghost{background:#243750;color:#E8EEF7}
 #n{color:#E3B77E;font-weight:700}
 #out{background:#0C1C39;border:1px solid #243750;border-radius:7px;padding:9px;
      color:#9FB2CC;font:11.5px ui-monospace,monospace;flex:1;min-width:280px;
      max-height:170px;overflow:auto;white-space:pre-wrap}
</style></head><body>
<h1>ARFF photo shortlist</h1>
<p class="lead">%d unique images in the library, reduced to the ones most likely to teach something, ordered by lesson.
Ranking is metadata only — resolution, aspect, size, capture date, and whether the folder is your own photography.
<strong>Nothing here has been judged for content.</strong> The model cannot see images; you can. That judgement is the
one thing this sheet cannot do for you.</p>

<div class="rights"><b>Rights.</b> Every image is unticked and unconfirmed. Tick only what you may publish. Where a
subject exists in your own photography &mdash; the AM RISK and BURNOUT folders are yours &mdash; that is the safer
answer, and it is the more credible one to a South African learner.</div>

<div class="bar">
 <button onclick="pick(true)">Select all shown</button>
 <button class="ghost" onclick="pick(false)">Clear</button>
 <span id="n">0 selected</span>
 <div id="out">selection appears here — paste it back to me</div>
</div>
%s
<h2 style="margin-top:44px">Likely graphic — review last</h2>
%s

<script>
var b=[].slice.call(document.querySelectorAll('.pick'));
function t(){var s=b.filter(function(x){return x.checked;});
 document.getElementById('n').textContent=s.length+' selected';
 document.getElementById('out').textContent=s.length?s.map(function(x){
   return x.closest('figure').dataset.path;}).join('\\n'):'';}
b.forEach(function(x){x.addEventListener('change',t);});
function pick(v){b.forEach(function(x){x.checked=v;});t();}
t();
</script>
</body></html>""" % (unique_total, "".join(secs), "".join(gsecs))

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ARFF-PHOTO-SHORTLIST.html")
    open(os.path.join(os.environ.get("ARFF_PHOTO_DIR", "/tmp/arff-photos"), "ARFF-PHOTO-SHORTLIST.html"), "w").write(doc)


if __name__ == "__main__":
    main()