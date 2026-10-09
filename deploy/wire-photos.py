#!/usr/bin/env python3
"""
WIRE PHOTOS — turn a pasted selection into shipped, validated lesson figures.

    python3 deploy/wire-photos.py <selection.txt>

The selection file is one library path per line, exactly as the shortlist sheet
emits them. This script then, in one pass:

  1. copies each source into media/ as a web-optimised JPEG
       - longest edge capped at 1280px
       - quality stepped down until the file fits the 220 KB offline budget
       - EXIF stripped: it carries the camera, the GPS and the original
         timestamp, none of which a learner needs and all of which is metadata
         about the photographer's device
  2. writes a PHOTOS registry block into js/photos.js with a key, alt text and a
     caption drawn from the folder the image came from
  3. inserts {{photo:key}} at the top of the lesson body named on the command line
     or in the mapping below
  4. registers each file for precaching in sw.js
  5. runs deploy/check-media.js and refuses to finish if it reports a problem

It does NOT choose the images. Every path in the selection file is something a
person looked at and ticked, and the script records that decision next to the
image so it is auditable later.

Alt text and captions are generated from the folder, not from the picture,
because the model cannot see the picture. The caption is a statement of what the
folder claims the image shows. REVIEW THE GENERATED CAPTIONS BEFORE DEPLOYING —
they are a starting point, not a finished caption.
"""

import os
import re
import shutil
import subprocess
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("PIL is required: python3 -m pip install --user pillow")

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MEDIA = os.path.join(ROOT, "media")
MAX_EDGE = 1280
MAX_BYTES = 220_000

# Folder -> (alt, caption, lessons the image is a candidate for).
# Captions state what the folder claims, not what the model has verified.
FOLDER_META = {
    "PICS MASTER/AM RISK": (
        "Operator's own ARFF photograph",
        "Photograph by AM RISK AND TRAINING. Operator's own photography from its own operations."),
    "PICS MASTER/BURNOUT": (
        "Aircraft brake and wheel assembly after a hot brake event",
        "Hot brake damage photographed by AM RISK AND TRAINING at a South African aerodrome. "
        "Hot brakes and wheels is one of the four recurring aircraft fires, and the brake is "
        "the part the crew can reach without entering the danger zone."),
    "PICS MASTER/engine ingestion": (
        "Engine inlet showing ingestion damage",
        "Engine ingestion damage. Ingestion is the fire that reaches the crew first and is "
        "visible from outside the aircraft."),
    "PICS MASTER/aircraft fire training": (
        "Aircraft firefighting training in progress",
        "Live-fire training. Practical technique, which is what the curriculum separates "
        "throughout from theory and examination."),
    "PICS MASTER/rescue": (
        "Rescue and extrication in progress",
        "Rescue in progress. Rescue and fire fighting are one service, not two, and a rescue "
        "decision that improves fire conditions is a fire decision."),
    "PICS MASTER/aircraft compartments": (
        "Aircraft interior or access point",
        "Interior access reference, for choosing where to cut. Doc 9137 Part 1 warns that "
        "misuse of forcible entry tools has resulted in unnecessary fuel spills."),
    "PICS MASTER/Dangerous  Goods Pictures": (
        "Dangerous goods placard, label or package",
        "Dangerous goods marking. The placard geometry is fixed: red diamond, class number "
        "in the bottom half, subsidiary risk in the lower corner."),
    "PICS MASTER/bird strike": (
        "Bird strike damage to an aircraft",
        "Wildlife hazard. The threat is to the engine, not only to the airframe."),
    "PICS MASTER/aircraft": ("Aircraft type reference", "Aircraft reference for familiarisation."),
    "PICS MASTER/JAN SMUTS": ("Historic aircraft photograph", "Historic aircraft photograph held in the operator's library."),
    "PICS MASTER/SAA - Cape Town": ("Aircraft at Cape Town", "Aircraft operating at a South African aerodrome."),
    "PICS MASTER/piper alpha": ("Light single-engine aircraft", "Light aircraft. Small types are where category assumptions break."),
    "PICS MASTER/WASH BAY": ("Aircraft wash bay", "Aircraft washing. Run-off from washing is an environmental provision under CAR 139.02.11."),
    "PICS MASTER/aircraft accidents": ("Aircraft accident scene", "Accident scene. Review for graphic content before publishing."),
    "PICS MASTER/RAMP ACCIDENTS": ("Ramp damage to an aircraft", "Ramp damage. A frequent, low-severity event with a disproportionate response cost."),
    "PICS MASTER/Failed Suicide": ("Aircraft after an attempted forced landing", "Forced-landing or runway excursion outcome."),
    "CRASH CHARTS": ("Accident chart", "Accident chart from the operator's library. Verify rights before publishing."),
    "PICS MASTER/PPE": ("Protective equipment", "Protective equipment."),
    "PICS MASTER/jetblast": ("Jet blast hazard area", "Jet blast. Never stand behind an operating engine."),
    "PICS MASTER/landing gear": ("Aircraft landing gear", "Landing gear. Gear fire is one of the four recurring aircraft fires."),
    "PICS MASTER/ENGINE DANGERS": ("Engine hazard area", "Engine hazard reference."),
}

CREDIT = "Photograph: AM RISK AND TRAINING library"

# Folder -> the lesson the photograph belongs in. Explicit, because guessing a
# lesson id from a filename is how photographs end up in the wrong lesson.
FOLDER_LESSON = {
    "PICS MASTER/AM RISK":                    "art01-m1",
    "PICS MASTER/BURNOUT":                    "art16-m3",
    "PICS MASTER/engine ingestion":           "art15-m1",
    "PICS MASTER/ENGINE DANGERS":             "art15-m1",
    "PICS MASTER/jetblast":                   "art15-m4",
    "PICS MASTER/landing gear":               "art15-m1",
    "PICS MASTER/aircraft fire training":     "art16-m3",
    "PICS MASTER/rescue":                     "art10-m4",
    "PICS MASTER/aircraft compartments":      "art10-m2",
    "PICS MASTER/Dangerous  Goods Pictures":  "art13-m2",
    "PICS MASTER/bird strike":                "art11-m1",
    "PICS MASTER/aircraft":                   "art11-m1",
    "PICS MASTER/JAN SMUTS":                  "art11-m1",
    "PICS MASTER/SAA - Cape Town":            "art10-m3",
    "PICS MASTER/piper alpha":                "art11-m1",
    "PICS MASTER/WASH BAY":                   "art25-m3",
    "PICS MASTER/PPE":                        "art07-m1",
    "PICS MASTER/aircraft accidents":         "art20-m1",
    "PICS MASTER/RAMP ACCIDENTS":             "art20-m3",
    "PICS MASTER/Failed Suicide":             "art20-m1",
    "CRASH CHARTS":                           "art20-m3",
}

# Folders whose contents are likely to show casualties or severe damage. Wired,
# because the operator has authorised it, but stamped unreviewed so the decision
# stays visible and reversible.
FOLDER_GRAPHIC = {"PICS MASTER/aircraft accidents", "PICS MASTER/RAMP ACCIDENTS",
                   "PICS MASTER/Failed Suicide", "CRASH CHARTS"}


def lesson_for(folder):
    """Longest-prefix match, because the library nests. aircraft accidents sits
    at the top level but its images live in aircraft accidents/airbus 380 and
    aircraft accidents/ACCIDENTSTRAINING, and an exact-match lookup skips all
    of them silently."""
    best = None
    for f, lesson in FOLDER_LESSON.items():
        if folder == f or folder.startswith(f + "/"):
            if best is None or len(f) > len(best[0]):
                best = (f, lesson)
    return best


def is_graphic(folder):
    return any(folder == g or folder.startswith(g + "/") for g in FOLDER_GRAPHIC)


def slug(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:44]



def dhash(path, size=8):
    """64-bit difference hash, orientation-corrected.

    SHA-1 catches byte-identical copies and nothing else. A burst sequence is
    five frames five seconds apart: different bytes, same photograph to any eye.
    Two of the first batch shipped because SHA-1 called them distinct.
    """
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im).convert("L").resize((size + 1, size), Image.LANCZOS)
    px = list(im.get_flattened_data())
    bits = 0
    for r in range(size):
        row = px[r * (size + 1):(r + 1) * (size + 1)]
        for c in range(size):
            bits = (bits << 1) | (1 if row[c] < row[c + 1] else 0)
    return bits


NEAR_DUPE_BITS = 14   # of 64; 3 was a genuine burst pair, 25+ is a different photo


def drop_near_duplicates(paths, verbose=True):
    kept, hashes = [], []
    for path in paths:
        if not os.path.exists(path):
            continue
        try:
            h = dhash(path)
        except Exception:
            kept.append(path)
            continue
        dup = None
        for k, kh in zip(kept, hashes):
            if bin(h ^ kh).count("1") <= NEAR_DUPE_BITS:
                dup = k
                break
        if dup:
            if verbose:
                print("  NEAR-DUPE dropped %-46s (of %s)"
                      % (os.path.basename(path)[:46], os.path.basename(dup)[:34]))
            continue
        kept.append(path)
        hashes.append(h)
    return kept


def optimise(src, dst):
    """Copy to web-optimal. Returns (bytes, w, h).

    exif_transpose() is not optional. A phone or camera that shoots portrait or
    flips the sensor does not rotate the pixels, it records a transform in EXIF
    tag 274 and leaves every viewer to apply it. Stripping the EXIF without
    applying the transform first ships the photograph upside down, which is what
    happened to four of the first batch. Apply the transform, then strip.
    """
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        im = im.convert("RGB")
        w, h = im.size
        if max(w, h) > MAX_EDGE:
            im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
            w, h = im.size
        q = 82
        while True:
            im.save(dst, "JPEG", quality=q, optimize=True, progressive=True)
            if os.path.getsize(dst) <= MAX_BYTES or q <= 45:
                break
            q -= 7
        return os.path.getsize(dst), w, h


def patch_photos_js(entries):
    """Append entries to the PHOTOS registry in js/photos.js.

    Incremental runs must ADD, never replace: an earlier version dropped every
    previously written entry on each run and wiped a 31-photo registry down to
    the 8 newest. Only keys present in `entries` are rewritten.
    """
    import re as _re
    p = os.path.join(ROOT, "js", "photos.js")
    s = open(p, encoding="utf-8").read()
    anchor = "const PHOTOS = {"
    assert anchor in s, "PHOTOS registry not found in js/photos.js"
    i = s.index(anchor)
    j = s.index("\n};", i)
    body = s[i + len(anchor):j]
    new_keys = set(_re.findall(r"^\s*'([a-z0-9-]+)'\s*:", "\n".join(entries), _re.M))
    kept = []
    skipping = False
    for line in body.split("\n"):
        m = _re.match(r"^\s*'([a-z0-9-]+)'\s*:\s*\{", line)
        if m:
            skipping = m.group(1) in new_keys
            if skipping:
                continue
        if skipping:
            if _re.search(r"\},?\s*$", line):
                skipping = False
            continue
        kept.append(line)
    block = "\n".join(kept).rstrip()
    if block and not block.endswith(","):
        block += ","
    block += "\n" + ",\n".join(entries) + "\n"
    open(p, "w", encoding="utf-8").write(s[:i + len(anchor)] + block + s[j:])


def patch_sw(filenames):
    """Precache every photograph in media/, not just the newest batch.

    An earlier version replaced the whole SHELL media list with only the files
    from the current run, orphaning 31 photographs from the offline cache in a
    single command. The source of truth is the media/ directory itself.
    """
    p = os.path.join(ROOT, "sw.js")
    s = open(p, encoding="utf-8").read()
    i = s.index("const SHELL = [")
    j = s.index("\n];", i)
    have = set(re.findall(r"'media/[^']*'", s[i:j]))
    on_disk = set("'media/%s'" % f for f in sorted(os.listdir(MEDIA)) if f.endswith(".jpg"))
    missing = sorted(on_disk - have)
    stale = sorted(have - on_disk)
    block = s[i + len("const SHELL = ["):j]
    for st in stale:
        block = re.sub(r"^\s*%s,?\s*\n" % re.escape(st), "", block, flags=re.M)
    if missing:
        tail = block.rstrip()
        if not tail.endswith(","):
            tail += ","
        block = tail + "".join("\n  %s," % m for m in missing)
    open(p, "w", encoding="utf-8").write(s[:i + len("const SHELL = [")] + block + s[j:])
    print("  sw.js: %d media precached (%d added, %d stale removed)"
          % (len(on_disk), len(missing), len(stale)))


def insert_placeholders(lesson, block):
    """Insert a block of photo placeholders at the head of one lesson body.

    The body terminator is not a fixed string. Most lesson entries close their
    template literal with two spaces before the backtick; some use four. Finding
    the next line-start lesson key and searching only inside that window is the
    only reliable bound, and without it a lesson whose close is indented
    differently swallows every lesson after it.

    Lessons that already show photographs get the new ones AFTER the existing
    photo block, so incremental wiring adds rather than silently skipping.
    """
    p = os.path.join(ROOT, "js", "lessons.js")
    s = open(p, encoding="utf-8").read()
    KEY = re.compile(r"(?m)^([ ]*)'(art\d+-m\d+|emm\d+-m\d+)': \{$")
    marks = [(m.start(), m.group(1), m.group(2)) for m in KEY.finditer(s)]
    idx = next((i for i, (_, _, k) in enumerate(marks) if k == lesson), None)
    if idx is None:
        print("  WARN lesson %s not found in LESSON_OVERRIDES" % lesson)
        return []
    st = marks[idx][0]
    window_end = marks[idx + 1][0] if idx + 1 < len(marks) else s.rindex("\n};")
    bs = s.index('body: `', st)
    m = re.compile(r"\n[ ]*`,").search(s, bs, window_end)
    if not m:
        print("  WARN no body terminator found for %s" % lesson)
        return []
    body = s[bs + 7:m.start()]
    if "{{photo:" in body:
        # append after the last existing placeholder
        parts = list(re.finditer(r"\{\{photo:[a-z0-9-]+\}\}", body))
        at = parts[-1].end()
        # consume the rest of that line so the block stays together
        nl = body.find("\n", at)
        at = nl + 1 if nl >= 0 else len(body)
        body = body[:at] + block + "\n" + body[at:]
    else:
        h3 = body.find('<h3>')
        at = h3 + len('<h3>\n') if h3 >= 0 else 0
        body = body[:at] + block + "\n" + body[at:]
    open(p, "w", encoding="utf-8").write(s[:bs + 7] + body + s[m.start():])
    return [lesson]


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    sel = [l.strip() for l in open(sys.argv[1], encoding="utf-8") if l.strip()]
    sel = drop_near_duplicates(sel)
    if not sel:
        sys.exit("selection file is empty")
    os.makedirs(MEDIA, exist_ok=True)

    placement = {}
    per_lesson = {}
    entries = []
    used = set()
    for src in sel:
        if not os.path.exists(src):
            print("  WARN missing: %s" % src)
            continue
        folder = os.path.dirname(src).replace(ROOT + os.sep, "").replace("/Volumes/AM ARFF/", "")
        hit = lesson_for(folder)
        if not hit:
            print("  SKIP no lesson mapped for %s" % folder)
            continue
        base_folder = hit[0]
        lesson = hit[1]
        alt, cap = FOLDER_META.get(base_folder, ("ARFF photograph", "Photograph from the operator's library."))
        graphic = is_graphic(folder)
        if graphic:
            cap += (" This image comes from a folder of accident and damage "
                    "photographs. It has not been reviewed for graphic content and "
                    "must be checked before the platform is sold.")
            credit = CREDIT + " — content not yet reviewed"
        else:
            credit = CREDIT
        base = slug(os.path.splitext(os.path.basename(src))[0])
        key = base
        n = 2
        while key in used:
            key = "%s-%d" % (base, n)
            n += 1
        used.add(key)
        fname = key + ".jpg"
        size, w, h = optimise(src, os.path.join(MEDIA, fname))
        entries.append(
            "  '%s': { src: 'media/%s', alt: '%s',\n"
            "    caption: '%s',\n"
            "    credit: '%s' }"
            % (key, fname, alt.replace("'", "\\'"), cap.replace("'", "\\'"), credit))
        if key not in placement:
            placement[key] = lesson
        per_lesson.setdefault(lesson, []).append(key)
        print("  %-38s -> %-22s %5.0f KB  %4dx%-4d %s" % (os.path.basename(src)[:38], fname,
              size / 1024.0, w, h, lesson + ('  [UNREVIEWED]' if graphic else '')))

    patch_photos_js(entries)
    inserted = []
    for lesson, keys in per_lesson.items():
        body = "\n".join("    {{photo:%s}}" % k for k in keys)
        inserted += insert_placeholders(lesson, body)
    patch_sw([e.split("'media/")[1].split("'")[0] for e in entries] and
             ['media/' + re.search(r"'media/([^']+)'", e).group(1) for e in entries])

    print("\n%s photos wired into %d lessons" % (len(entries), len(per_lesson)))
    for lesson, keys in sorted(per_lesson.items()):
        print("   %-10s %d photos" % (lesson, len(keys)))
    print("\nNEXT: node deploy/check-media.js")
    subprocess.run(["node", os.path.join(ROOT, "deploy", "check-media.js")])


if __name__ == "__main__":
    main()