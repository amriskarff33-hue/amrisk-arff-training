#!/usr/bin/env python3
"""
PHOTO REMOVAL SHEET — an unambiguous "take these out" list.

Why this file exists
--------------------
The first two sheets labelled every checkbox "use", meaning tick to publish.
They were read the other way round, and the selection never reached the operator
because it had to be copied out of a text box by hand. Both are design faults,
not user error. This sheet exists so neither can happen again:

  - the checkbox says REMOVE, in those words, on every card
  - the counter says how many are marked for removal, not "selected"
  - the whole sheet is scoped to what is actually shipped, so nothing can be
    marked that is not live

SCOPE, stated on the sheet itself and enforced by the script: this removes a
photograph from the PUBLISHED PLATFORM only — media/, js/photos.js,
js/lessons.js, sw.js. It never touches /Volumes/AM ARFF. The operator's original
file is never opened for writing and never deleted. Losing a photograph from a
paid course should be a one-command edit to a website, not an act performed on
somebody's only copy of their own archive.

    python3 deploy/photo-removal-sheet.py

Writes ~/Desktop/ARFF-PHOTO-REMOVAL.html, self-contained.
"""

import base64
import html
import os
import re
import shutil
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MEDIA = os.path.join(ROOT, "media")
THUMBS = "/tmp/arff-photos/thumbs"
DESK = os.path.expanduser("~/Desktop/ARFF-PHOTO-REMOVAL.html")

LESSON_TITLE = {}


def load_lesson_titles():
    p = os.path.join(ROOT, "js", "lessons.js")
    if not os.path.exists(p):
        return
    s = open(p, encoding="utf-8").read()
    for m in re.finditer(r"'((?:art|emm)\d+-m\d+)': \{\s*\n\s*title: '([^']+)'", s):
        LESSON_TITLE[m.group(1)] = m.group(2)


def shipped():
    """Every live photograph, mapped to the lesson that shows it."""
    if not os.path.isdir(MEDIA):
        sys.exit("no media/ directory — nothing is shipped yet")
    les = open(os.path.join(ROOT, "js", "lessons.js"), encoding="utf-8").read()
    KEY = re.compile(r"(?m)^([ ]*)'(art\d+-m\d+|emm\d+-m\d+)': \{$")
    marks = [(m.start(), m.group(2)) for m in KEY.finditer(les)]
    out = []
    for fn in sorted(os.listdir(MEDIA)):
        key = os.path.splitext(fn)[0]
        lesson = None
        for i, (st, k) in enumerate(marks):
            end = marks[i + 1][0] if i + 1 < len(marks) else len(les)
            if "{{photo:%s}}" % key in les[st:end]:
                lesson = k
                break
        out.append({"key": key, "file": fn, "lesson": lesson,
                    "bytes": os.path.getsize(os.path.join(MEDIA, fn))})
    return out


def build_thumb_index():
    """Map a shipped media key back to its inventory thumbnail.

    The media key is a slug of the source filename, so it cannot be matched
    against the thumbnail filenames, which are folder-derived. inventory.json
    holds both ends of the join.
    """
    inv = os.path.join(os.path.dirname(THUMBS.rstrip("/")), "inventory.json")
    idx = {}
    if not os.path.exists(inv):
        return idx
    import json
    for r in json.load(open(inv)):
        base = os.path.splitext(os.path.basename(r["path"]))[0]
        slug = re.sub(r"[^a-z0-9]+", "-", base.lower()).strip("-")[:44]
        if r.get("thumb"):
            idx[slug] = os.path.join(THUMBS, r["thumb"])
    return idx


THUMB_INDEX = {}


def thumb_for(key):
    return THUMB_INDEX.get(key)


def data_uri(path):
    if not path:
        return None
    try:
        with open(path, "rb") as f:
            return "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("ascii")
    except Exception:
        return None


def main():
    global THUMB_INDEX
    THUMB_INDEX = build_thumb_index()
    load_lesson_titles()
    rows = shipped()
    by_lesson = {}
    for r in rows:
        by_lesson.setdefault(r["lesson"] or "unplaced", []).append(r)

    secs = []
    for lesson in sorted(by_lesson):
        items = by_lesson[lesson]
        cards = []
        for i, r in enumerate(items, 1):
            uri = data_uri(thumb_for(r["key"]))
            pic = ('<img src="%s" alt="">' % uri) if uri else '<span class="nothumb">no preview</span>'
            cards.append(
                '<figure data-key="%s">'
                '<div class="pic">%s<span class="no">%d</span></div>'
                '<figcaption><code>%s</code></figcaption>'
                '<label><input type="checkbox" class="kill">'
                '<b>REMOVE from the platform</b></label>'
                '</figure>' % (html.escape(r["key"]), pic, i, html.escape(r["key"])))
        secs.append(
            "<section><h2>%s <small>%s &middot; %d photographs</small></h2>"
            '<div class="grid">%s</div></section>'
            % (html.escape(lesson),
               html.escape(LESSON_TITLE.get(lesson, "")),
               len(items), "".join(cards)))

    doc = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Remove photographs from the platform</title>
<style>
 :root{color-scheme:dark}
 body{margin:0;padding:24px 28px 100px;background:#051223;color:#E8EEF7;
      font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
 h1{font-size:24px;margin:0 0 6px}
 h2{font-size:16px;color:#E3B77E;margin:30px 0 8px;border-top:1px solid #243750;padding-top:16px}
 h2 small{color:#7C8CA8;font-weight:400;font-size:13px}
 .lead{color:#9FB2CC;max-width:82ch}
 .scope{border:2px solid #C2603F;background:rgba(194,96,63,.13);padding:15px 18px;
        border-radius:10px;max-width:92ch;margin:18px 0}
 .scope b{color:#E0A080}
 .scope .never{color:#E3B77E}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
 figure{margin:0;background:#0C1C39;border:1px solid #243750;border-radius:9px;overflow:hidden}
 figure.marked{border-color:#C2603F;box-shadow:0 0 0 2px rgba(194,96,63,.4)}
 .pic{position:relative;height:170px;background:#0A1526}
 .pic img{width:100%%;height:170px;object-fit:cover;display:block}
 .pic .no{position:absolute;top:0;left:0;background:#051223cc;color:#E3B77E;
        font:700 13px/1 var(--mono);padding:5px 9px;border-bottom-right-radius:7px}
 .nothumb{display:flex;height:170px;align-items:center;justify-content:center;color:#6B7A96;font-size:13px}
 figcaption{padding:8px 10px 2px}
 figcaption code{font:11.5px/1.5 ui-monospace,monospace;color:#9FB2CC;word-break:break-all}
 figure label{display:block;padding:8px 10px 11px;font-size:12.5px;color:#E0A080;cursor:pointer}
 figure label b{color:#F0B49A}
 figure input{width:16px;height:16px;vertical-align:-3px;margin-right:7px;accent-color:#C2603F}
 .bar{position:sticky;top:0;background:#051223f5;backdrop-filter:blur(8px);padding:13px 0;
      border-bottom:1px solid #243750;z-index:5;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
 button{background:#C2603F;color:#fff;border:0;border-radius:7px;padding:10px 17px;
        font-weight:700;font-size:14px;cursor:pointer}
 button.ghost{background:#243750;color:#E8EEF7}
 #n{color:#F0B49A;font-weight:700;font-size:15px}
 #out{background:#0C1C39;border:1px solid #243750;border-radius:7px;padding:10px;
      color:#9FB2CC;font:12px ui-monospace,monospace;flex:1;min-width:300px;
      max-height:190px;overflow:auto;white-space:pre-wrap;cursor:text}
 .hint{margin:8px 0 0;font-size:13px;min-height:1.3em}
</style></head><body>

<h1>Remove photographs from the platform</h1>
<p class="lead">%d photographs are currently published in the training platform. Tick any that should come
out. Every checkbox below says <b>REMOVE</b>. There is no "use" box on this page, because the previous
sheets had one and it was read the wrong way round.</p>

<div class="scope">
<p><b>What happens when you send this:</b> the photograph is deleted from the published platform &mdash;
the file in <code>media/</code>, its entry in <code>js/photos.js</code>, its placeholder in
<code>js/lessons.js</code> and its line in the service worker precache list. The site is rebuilt and
redeployed, and the validator confirms nothing dangles.</p>
<p class="never"><b>What does not happen:</b> nothing on <code>/Volumes/AM ARFF</code> is opened for writing,
renamed or deleted, ever. Your original file stays exactly where it is. If you want a photograph
gone from the platform, say so and only the platform changes.</p>
<p>Ticking one photograph twice is harmless. To clear everything, press <b>Clear all</b>.</p>
</div>

<div class="bar">
  <button class="ghost" onclick="clearAll()">Clear all</button>
  <button onclick="copyList()">Copy list</button>
  <span id="n">0 marked for removal</span>
  <div id="out">tick the photographs you want removed, then press <b>Copy list</b> and paste it into the chat</div>
</div>
<p class="hint" id="hint">&nbsp;</p>

%s

<script>
var b=[].slice.call(document.querySelectorAll('.kill'));
function t(){
  var s=b.filter(function(x){return x.checked;});
  b.forEach(function(x){ x.closest('figure').classList.toggle('marked', x.checked); });
  document.getElementById('n').textContent = s.length + ' marked for removal';
  document.getElementById('out').textContent = s.length
    ? s.map(function(x){return x.closest('figure').dataset.key;}).join('\\n')
    : '';
}
b.forEach(function(x){x.addEventListener('change',t);});
function clearAll(){ b.forEach(function(x){x.checked=false;}); t(); }
document.getElementById('out').addEventListener('click',function(){ this.select(); });

/* Selecting 19 lines by hand is where a selection gets lost. Copy it instead.
   The clipboard API needs a secure context, which file:// is not in most
   browsers, so fall back to selecting the text and telling the operator to
   press the keyboard shortcut. */
function say(msg, bad){
  var h=document.getElementById('hint');
  h.textContent=msg;
  h.style.color = bad ? '#E0A080' : '#8FBFA8';
}
function copyList(){
  var txt = document.getElementById('out').textContent.trim();
  if(!txt){ say('Nothing ticked yet.'); return; }
  var n = document.querySelectorAll('.kill:checked').length;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){
      say('Copied '+n+' key'+(n===1?'':'s')+' to the clipboard. Paste it into the chat.');
    }, function(){ selectFallback(txt, n); });
  } else {
    selectFallback(txt, n);
  }
}
function selectFallback(txt, n){
  var box = document.getElementById('out');
  var r = document.createRange(); r.selectNodeContents(box);
  var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
  say(n+' key'+(n===1?'':'s')+' selected. Press Command+C, then paste into the chat.', true);
}
t();
</script>
</body></html>""" % (len(rows), "".join(secs))

    open(DESK, "w", encoding="utf-8").write(doc)
    print("%d shipped photographs written to %s" % (len(rows), DESK))
    for lesson in sorted(by_lesson):
        print("   %-10s %d" % (lesson, len(by_lesson[lesson])))


if __name__ == "__main__":
    main()