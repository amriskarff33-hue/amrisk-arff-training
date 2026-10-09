#!/usr/bin/env python3
"""
REMOVE PHOTOS FROM THE SHIPPED PLATFORM.

    python3 deploy/remove-photos.py key1 key2 key3 ...
    python3 deploy/remove-photos.py --file keys.txt

SCOPE
-----
Deletes a photograph from the published platform only, in all four places it
exists:

    media/<key>.jpg              the file
    js/photos.js                 the registry entry
    js/lessons.js                the {{photo:key}} placeholder
    sw.js                        the service worker precache line

It never opens anything under /Volumes/AM ARFF. The operator's original
photograph is not the platform's to delete, and a photograph leaving a paid
course must be a one-command edit to a website rather than an act performed on
somebody's only copy of their own archive.

WHY ALL FOUR, AND WHY IT MATTERS
--------------------------------
Leaving a stale line in sw.js is the dangerous one. cache.addAll() rejects the
entire batch if a single URL 404s, so a precache entry pointing at a deleted
file stops the service worker installing -- and with it goes the whole offline
platform. That is why this script refuses to leave any of the four behind, and
why it runs deploy/check-media.js before exiting.
"""

import os
import re
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def shipped_keys():
    media = os.path.join(ROOT, "media")
    if not os.path.isdir(media):
        sys.exit("no media/ directory")
    return sorted(os.path.splitext(f)[0] for f in os.listdir(media))


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    if args[0] == "--file":
        keys = [l.strip() for l in open(args[1], encoding="utf-8") if l.strip()]
    else:
        keys = args

    have = shipped_keys()
    known = [k for k in keys if k in have]
    unknown = [k for k in keys if k not in have]
    if unknown:
        print("NOT SHIPPED, ignoring: %s" % ", ".join(unknown))
    if not known:
        sys.exit("none of those keys are currently shipped")
    print("removing %d of %d shipped photographs" % (len(known), len(have)))

    kset = set(known)

    # ---- 1. media files ----
    for k in known:
        p = os.path.join(ROOT, "media", k + ".jpg")
        if os.path.exists(p):
            os.remove(p)
            print("  media/%s.jpg removed" % k)

    # ---- 2. js/photos.js registry entries ----
    p = os.path.join(ROOT, "js", "photos.js")
    s = open(p, encoding="utf-8").read()
    i = s.index("const PHOTOS = {")
    j = s.index("\n};", i)
    head, block, tail = s[:i + len("const PHOTOS = {")], s[i + len("const PHOTOS = {"):j], s[j:]
    out, dropped = [], 0
    skipping = False
    for line in block.split("\n"):
        m = re.match(r"^\s*'([a-z0-9-]+)':\s*\{", line)
        if m:
            skipping = m.group(1) in kset
            if skipping:
                dropped += 1
                continue
        if skipping:
            # entry body continues until the line that closes it
            if re.search(r"\},?\s*$", line):
                skipping = False
            continue
        out.append(line)
    block = "\n".join(out).rstrip()
    if block and not block.endswith(","):
        block += ","
    open(p, "w", encoding="utf-8").write(head + block + tail)
    print("  js/photos.js: %d registry entries removed" % dropped)
    if dropped != len(known):
        print("  WARNING expected %d removals, made %d" % (len(known), dropped))

    # ---- 3. js/lessons.js placeholders ----
    p = os.path.join(ROOT, "js", "lessons.js")
    s = open(p, encoding="utf-8").read()
    before = s.count("{{photo:")
    for k in known:
        s = re.sub(r"[ \t]*\{\{photo:%s\}\}[ \t]*\n?" % re.escape(k), "", s)
    after = s.count("{{photo:")
    open(p, "w", encoding="utf-8").write(s)
    print("  js/lessons.js: %d placeholders removed, %d remain" % (before - after, after))

    # ---- 4. sw.js precache lines ----
    p = os.path.join(ROOT, "js", "..", "sw.js")
    p = os.path.normpath(p)
    s = open(p, encoding="utf-8").read()
    before = len(re.findall(r"^\s*'media/[^']*',?\s*$", s, re.M))
    for k in known:
        s = re.sub(r"^\s*'media/%s\.jpg',?\s*\n" % re.escape(k), "", s, flags=re.M)
    after = len(re.findall(r"^\s*'media/[^']*',?\s*$", s, re.M))
    open(p, "w", encoding="utf-8").write(s)
    print("  sw.js: precache entries %d -> %d" % (before, after))

    # ---- validate ----
    for f in ("js/photos.js", "js/lessons.js", "sw.js"):
        r = subprocess.run(["node", "--check", os.path.join(ROOT, f)],
                           capture_output=True, text=True)
        if r.returncode:
            print("SYNTAX ERROR in %s\n%s" % (f, r.stderr[:400]))
            sys.exit(1)
    print("  js/photos.js, js/lessons.js, sw.js all parse")

    r = subprocess.run(["node", os.path.join(ROOT, "deploy", "check-media.js")],
                       capture_output=True, text=True)
    tailout = r.stdout.strip().split("\n")[-3:]
    print("  check-media.js exit %d" % r.returncode)
    for line in tailout:
        if line.strip():
            print("    " + line)
    sys.exit(r.returncode)


if __name__ == "__main__":
    main()