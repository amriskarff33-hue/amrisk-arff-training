#!/usr/bin/env python3
"""
RENAME DRIVE PHOTOS — descriptive, lesson-coded filenames on the operator drive.

    python3 deploy/rename-drive-photos.py --dry-run
    python3 deploy/rename-drive-photos.py --apply

WHAT IT DOES
------------
Renames every image in the 21 ARFF folders on /Volumes/AM ARFF to:

    {USE}-{subject}-{seq:03d}[-dupN].{ext}

USE is the lesson the photograph can serve (ART15-ENGINE) or the reason it
cannot (EXCLUDE-GRAPHIC). The point is findability: today the drive holds
files called 1.JPG, image.jpg and Screenshot_2019-06-14-21-03-58.PNG, and
finding a hot-brake photograph means opening folders at random.

WHAT IT DOES NOT DO
-------------------
- Never deletes anything. Exact duplicates are renamed with a -dupN suffix.
- Never touches non-image files, and never touches folders outside the 21.
- Never edits image content.
- Writes deploy/photo-rename-log.csv (old path, new path, decision, reason,
  dimensions, date) so any rename can be reversed exactly.

DECISIONS ARE IN THIS FILE, NOT IN THE MODEL'S HEAD
---------------------------------------------------
Every exclusion below comes from the full visual review of 2026-10-09: all 982
images seen as contact sheets, folder by folder. The reasons state what was
seen. Nothing is excluded for being merely small or merely dark unless stated;
size and brightness are recorded in the log for every file.
"""

import csv
import hashlib
import json
import os
import re
import sys

DRIVE = "/Volumes/AM ARFF"
LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "photo-rename-log.csv")

# folder -> default (use_code, subject, decision, reason)
FOLDERS = {
    "PICS MASTER/AM RISK": ("ART01-OPERATOR", "operator-crew", "USE",
        "Operator's own photography; crew, briefings, Rwanda ops"),
    "PICS MASTER/BURNOUT": ("ART16-TRAINING", "live-fire-night", "USE",
        "Night live-fire training event Jul-Nov 2018; hose teams and fire silhouettes"),
    "PICS MASTER/Dangerous  Goods Pictures": ("ART13-DG", "placard", "USE",
        "Individual DG placards and handling labels, class by class"),
    "PICS MASTER/ENGINE DANGERS": ("ART15-ENGINE", "engine-danger", "USE",
        "Engine danger-area reference"),
    "PICS MASTER/Failed Suicide": ("EXCLUDE-GRAPHIC", "road-trauma", "EXCLUDE",
        "Road-traffic fatalities, severe injuries and a corpse; not aviation, not usable"),
    "PICS MASTER/JAN SMUTS": ("ART11-HISTORIC", "sa-fire-service", "USE",
        "South African fire service history; crews and appliances"),
    "PICS MASTER/PPE": ("ART07-PPE", "turnout-layers", "USE",
        "Turnout gear layer diagram"),
    "PICS MASTER/RAMP ACCIDENTS": ("ART20-RAMP", "ramp-incident", "USE",
        "Ramp incidents incl. KLM tug series and SAA engine closeups"),
    "PICS MASTER/SAA - Cape Town": ("ART10-RECOVERY", "saa-bogged", "USE",
        "SAA airliner bogged off-pavement; recovery and stabilisation series"),
    "PICS MASTER/WASH BAY": ("ART25-WATER", "shelter-apron", "USE",
        "Aircraft shelter and apron drainage"),
    "PICS MASTER/aircraft": ("ART11-FLEET", "aircraft-ref", "USE",
        "Mixed web reference images; provenance unverified, check before wiring"),
    "PICS MASTER/aircraft accidents": ("ART20-CONTINGENCY", "accident", "USE",
        "Bulk press photographs; verify content and rights before wiring any single one"),
    "PICS MASTER/aircraft compartments": ("ART10-ACCESS", "interior-drawing", "USE",
        "Patent drawings and interior references for access planning"),
    "PICS MASTER/aircraft fire training": ("ART16-TRAINING", "training-stock", "USE",
        "Mixed training photography, largely foreign stock; check before wiring"),
    "PICS MASTER/bird strike": ("ART03-WILDLIFE", "birdstrike", "USE",
        "Bird strike damage; helicopter series shows blood and dead birds"),
    "PICS MASTER/engine ingestion": ("ART15-ENGINE", "ingestion", "USE",
        "Fan-blade ingestion closeups with bird remains; small files"),
    "PICS MASTER/jetblast": ("ART15-JETBLAST", "jetblast-test", "USE",
        "Jet blast test frames; the two files are identical"),
    "PICS MASTER/landing gear": ("ART10-GEAR", "gear-emergency", "USE",
        "Gear-up and gear-collapse web images; small files"),
    "PICS MASTER/piper alpha": ("EXCLUDE-OFFTOPIC", "oil-rig-fire", "EXCLUDE",
        "Piper Alpha offshore oil rig disaster; not aviation, not ARFF"),
    "PICS MASTER/rescue": ("ART10-EXTRICATION", "equity-exercise", "USE",
        "EQUITY night extrication exercise on a heavy vehicle"),
    "CRASH CHARTS": ("EXCLUDE-SCREENSHOT", "app-screenshot", "EXCLUDE",
        "Phone screenshots of a reference app; third-hand, not shippable"),
}

# exact filename -> (use_code, subject, decision, reason). Wins over the folder default.
OVERRIDES = {
    # AM RISK personal frames (upside-down selfies, car selfies)
    "20130821_204100 (1).jpg": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "20130821_204100.jpg": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "20130821_204105 (1).jpg": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "20130821_204105.jpg": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "20130821_204108 (1).jpg": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "20130821_204108.jpg": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "20130821_204114.jpg": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "20130821_204759 (1).jpg": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "20130821_204759.jpg": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "57726252385__F5C2DCB1-3ACB-4E25-8B5F-D547CEF0617B.JPG": ("EXCLUDE-PERSONAL", "car-selfie", "EXCLUDE", "Man driving a car; removed from the platform at operator request"),
    "57790738354__1B9C1CC5-08B0-4663-A01B-DA68AF0874D0.JPG": ("EXCLUDE-PERSONAL", "portrait", "EXCLUDE", "Personal portrait; removed from the platform at operator request"),
    # JAN SMUTS personal frames
    "5258e675-08e5-46ed-9d9a-cdbcdf524449.JPG": ("EXCLUDE-PERSONAL", "social", "EXCLUDE", "Two people with beers; personal"),
    "8cd08f9e-ee9c-4c34-9b54-9b00eaf3fcf1.JPG": ("EXCLUDE-PERSONAL", "wedding", "EXCLUDE", "Wedding group photograph; personal"),
    # BURNOUT spectator frames
    "DSCN1267.JPG": ("EXCLUDE-PERSONAL", "car-sunset", "EXCLUDE", "Car at sunset; spectator frame"),
    "DSCN1269.JPG": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "DSCN1270.JPG": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "DSCN1271.JPG": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "DSCN1272.JPG": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    "DSCN1281.JPG": ("EXCLUDE-PERSONAL", "selfie", "EXCLUDE", "Personal selfie frame"),
    # ENGINE DANGERS YouTube thumbnail
    "maxresdefault-3.jpg": ("EXCLUDE-OFFTOPIC", "youtube-thumb", "EXCLUDE", "YouTube thumbnail; removed from the platform"),
    # aircraft folder off-topic
    "F-18mid-air1.jpg": ("EXCLUDE-OFFTOPIC", "military", "EXCLUDE", "Military fast-jet image; not ARFF"),
    "JET1.jpg": ("EXCLUDE-OFFTOPIC", "crash-still", "EXCLUDE", "Crash still of unclear provenance; not wired"),
    "AIRCRAFT PARKING STAND APRON.JPG": ("EXCLUDE-OFFTOPIC", "stock-diagram", "EXCLUDE", "Stock apron diagram; removed from the platform"),
    "COCKPIT PHOTO.JPG": ("ART11-FLEET", "cockpit", "USE", "Flight deck reference for familiarisation"),
    # CRASH CHARTS manufacturer originals (not screenshots)
    "ARFC_A380 crash chart_001.png": ("ART10-REFERENCE", "a380-crash-chart", "USE", "Manufacturer emergency chart; verify rights before publishing"),
    "ARFC_A380 crash chart_002.png": ("ART10-REFERENCE", "a380-crash-chart", "USE", "Manufacturer emergency chart; verify rights before publishing"),
    "CH850CCC-MAST-R02-11NOV2010.jpg": ("ART10-REFERENCE", "ch850-chart", "USE", "Manufacturer emergency chart; verify rights before publishing"),
    "CH850CCCC-MAST-R02-11NOV2010.jpg": ("ART10-REFERENCE", "ch850-chart", "USE", "Manufacturer emergency chart; verify rights before publishing"),
    "CRJ200CCC-MAST-R02-11NOV2010.jpg": ("ART10-REFERENCE", "crj200-chart", "USE", "Manufacturer emergency chart; verify rights before publishing"),
    "CRJ200CCCc-MAST-R02-11NOV2010.jpg": ("ART10-REFERENCE", "crj200-chart", "USE", "Manufacturer emergency chart; verify rights before publishing"),
    "CRJ700CCC-MAST-R01-11NOV2010.jpg": ("ART10-REFERENCE", "crj700-chart", "USE", "Manufacturer emergency chart; verify rights before publishing"),
    "PC12-V12Rescue_020318.jpg": ("ART10-REFERENCE", "pc12-rescue", "USE", "Manufacturer rescue chart; verify rights before publishing"),
    "PC12-V2Rescue_020318.jpg": ("ART10-REFERENCE", "pc12-rescue", "USE", "Manufacturer rescue chart; verify rights before publishing"),
    "erj200.jpg": ("ART10-REFERENCE", "erj200-chart", "USE", "Manufacturer emergency chart; verify rights before publishing"),
    # RAMP ACCIDENTS engine closeups belong with engines
    "IMGA0175.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0176.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0177.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0178.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0179.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0180.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0181.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0182.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0183.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0184.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0185.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
    "IMGA0186.JPG": ("ART15-ENGINE", "saa-engine", "USE", "SAA engine closeup on the ramp"),
}

EXTS = (".jpg", ".jpeg", ".png", ".gif", ".tif", ".tiff")


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:40]


def main():
    apply = "--apply" in sys.argv
    inv = json.load(open("/tmp/arff-photos/inventory.json"))
    by_sha = {}
    for r in inv:
        by_sha.setdefault(r.get("sha1") or r["path"], []).append(r["path"])

    rows = []
    counters = {}
    dup_seen = {}
    for r in sorted(inv, key=lambda x: x["path"]):
        folder = r["folder"]
        if folder not in FOLDERS:
            continue
        name = os.path.basename(r["path"])
        if name in OVERRIDES:
            use, subject, decision, reason = OVERRIDES[name]
        else:
            use, subject, decision, reason = FOLDERS[folder]
            # DG placards carry their class in the filename already
            if folder == "PICS MASTER/Dangerous  Goods Pictures":
                subject = "dg-" + slug(os.path.splitext(name)[0])
        # dark frames are unusable whatever the folder says (except graphic/offtopic already excluded)
        if decision == "USE" and (r.get("brightness") is not None) and r["brightness"] < 14:
            decision = "EXCLUDE"
            use = "EXCLUDE-DARK"
            subject = "dark-frame"
            reason = "Near-black frame (mean luminance %s); nothing to teach" % r["brightness"]
            if folder == "PICS MASTER/Failed Suicide":
                use, subject = "EXCLUDE-GRAPHIC", "road-trauma"
                reason = "Road-traffic fatalities; not aviation, not usable"
            if folder == "PICS MASTER/piper alpha":
                use, subject = "EXCLUDE-OFFTOPIC", "oil-rig-fire"
                reason = "Piper Alpha offshore oil rig disaster; not aviation, not ARFF"
        key = (use, subject)
        counters[key] = counters.get(key, 0) + 1
        dup = ""
        sh = r.get("sha1") or r["path"]
        if sh in dup_seen:
            dup_seen[sh] += 1
            dup = "-dup%d" % dup_seen[sh]
        else:
            dup_seen[sh] = 1
        ext = os.path.splitext(name)[1].lower() or ".jpg"
        new = "%s-%s-%03d%s%s" % (use, subject, counters[key], dup, ext)
        rows.append({
            "old": r["path"], "new": os.path.join(os.path.dirname(r["path"]), new),
            "folder": folder, "use": use, "decision": decision, "reason": reason,
            "w": r.get("w"), "h": r.get("h"), "bytes": r.get("bytes"),
            "date": r.get("date"), "brightness": r.get("brightness"),
            "dup": "yes" if dup else "",
        })

    with open(LOG, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["old", "new", "folder", "use", "decision",
                                          "reason", "w", "h", "bytes", "date",
                                          "brightness", "dup"])
        w.writeheader()
        w.writerows(rows)

    from collections import Counter
    print("decisions:", dict(Counter(r["decision"] for r in rows)))
    print("use codes:", dict(Counter(r["use"] for r in rows)))
    print("log:", LOG, "(%d rows)" % len(rows))
    print("\nsample renames:")
    for r in rows[::max(1, len(rows) // 12)][:12]:
        print("  %-52s -> %s" % (os.path.basename(r["old"])[:52], os.path.basename(r["new"])))

    if not apply:
        print("\nDRY RUN. Re-run with --apply to rename on the drive.")
        return
    errors = 0
    for r in rows:
        if os.path.exists(r["new"]) and r["new"] != r["old"]:
            print("  COLLISION, skipping:", r["new"])
            errors += 1
            continue
        try:
            if r["new"] != r["old"]:
                os.rename(r["old"], r["new"])
        except Exception as e:
            print("  FAILED %s: %s" % (r["old"], e))
            errors += 1
    print("\nrenamed %d files, %d errors" % (len(rows) - errors, errors))


if __name__ == "__main__":
    main()