#!/usr/bin/env python3
"""
COMMONS CANDIDATES — a review sheet of licence-clear photographs.

Why online at all
-----------------
The operator's own library has no usable engine or ARFF photography. The engine
folders contain 450x300 and 800x600 press photographs of a China Airlines
ingestion, duplicated under two filenames, plus two identical jetblast files at
520x306. Nothing there is shippable: too small for a lesson figure, and press
photography rather than the operator's own.

Why Wikimedia Commons and not a web search
------------------------------------------
A general web search returns images that are almost all copyrighted, and putting
those into a paid commercial training course is the licensing risk this project
has avoided throughout. Wikimedia Commons carries explicit licence metadata, and
the US federal photographs there are public domain outright: a US Navy or US
Marines photograph is a work of the US Government and may be republished without
permission or attribution. That is a materially different proposition from a
news photograph, and it is why this script filters on the licence field rather
than on a search engine.

The trade the operator should weigh: these are foreign-service photographs. They
are technically excellent and legally clean, but they are not South African, and
a learner may notice. The operator's own photography remains the best answer
wherever the subject exists to be shot.

    python3 deploy/commons-sheet.py [candidates.json]

Writes ~/Desktop/ARFF-COMMONS-CANDIDATES.html, self-contained.
"""

import base64
import html
import io
import json
import os
import re
import sys
import urllib.parse
import urllib.request

DESK = os.path.expanduser("~/Desktop/ARFF-COMMONS-CANDIDATES.html")
UA = {"User-Agent": "ARFF-training-inventory/1.0 (operator review)"}

# Subjects worth a lesson figure. Anything not matching one of these is dropped:
# the Commons search for aircraft terms returns a lot of scanned 1940s manuals
# and unrelated technical papers, which are photographs of nothing.
SUBJECTS = [
    ("ART-15 · Engine fires", ["aircraft rescue and fire fighting", "aircraft firefighting",
                               "aircraft engine firewall", "aircraft fire"]),
    ("ART-16 · Tactics and training", ["firefighting training aircraft", "aircraft firefighting training"]),
    ("ART-08 · Training and drills", ["airport rescue training", "rescue fire fighting training"]),
    ("ART-15 · Hot brakes", ["hot pit refuel", "hot-pit refueling"]),
]

BAD = re.compile(r"\.pdf$|\(IA\s|^\s*TM\s|\btechnical manual\b|pavement response|"
                 r"^\s*The\s+.*\ba\s+review\b|bibliograph|annual report", re.I)


def relevant(title):
    t = title.lower()
    if BAD.search(t):
        return False
    if t.endswith(".pdf"):
        return False
    for _lesson, needles in SUBJECTS:
        if any(n in t for n in needles):
            return True
    return False


def api(params, timeout=40):
    """Call the Commons API. Wikimedia asks for a descriptive User-Agent, so
    send one that identifies the tool rather than a bare script name."""
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    return json.loads(fetch(url, timeout=timeout).decode("utf-8"))


def fetch(url, timeout=45):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=timeout).read()


def thumb_urls(titles, width=320):
    """Ask the API for the thumbnail URL of each file.

    Constructing a Commons thumbnail path by hand does not work. The modern form
    rejects any width outside a published list, the legacy thumb.php endpoint
    returns 404, and the original path is already percent-encoded so re-encoding
    it breaks the URL again. The API will hand back a working thumburl if asked
    with iiurlwidth, and that is the only reliable route.
    """
    out = {}
    titles = list(titles)
    for i in range(0, len(titles), 25):
        batch = titles[i:i + 25]
        try:
            d = api({"action": "query", "format": "json",
                     "titles": "|".join(batch),
                     "prop": "imageinfo", "iiprop": "url|size",
                     "iiurlwidth": str(width)})
        except Exception as e:
            print("  thumb query failed: %s" % e)
            continue
        for pid, page in (d.get("query", {}).get("pages", {}) or {}).items():
            ii = (page.get("imageinfo") or [{}])[0]
            if ii.get("thumburl"):
                out[page.get("title", "")] = ii["thumburl"]
    return out


def main():
    cands = json.load(open(sys.argv[1] if len(sys.argv) > 1
                           else "/private/var/folders/rc/61fhcvbn4dqc6dtmx8t3t6680000gn/T/opencode/commons_candidates.json"))
    picked = []
    for title, v in cands.items():
        if not relevant(title):
            continue
        for lesson, needles in SUBJECTS:
            if any(n in title.lower() for n in needles):
                v = dict(v, lesson=lesson)
                break
        else:
            continue
        picked.append((title, v))
    picked.sort(key=lambda tv: (tv[1]["lesson"], -max(tv[1]["w"], tv[1]["h"])))

    print("fetching %d candidate thumbnails..." % len(picked))
    thumbs = thumb_urls([t for t, _v in picked])
    print("  api returned %d thumbnail urls" % len(thumbs))
    cards, done = [], 0
    for title, v in picked:
        raw = None
        tu = thumbs.get(title)
        if tu:
            try:
                raw = fetch(tu)
            except Exception:
                raw = None
        uri = ""
        if raw:
            try:
                im = Image.open(io.BytesIO(raw))
                buf = io.BytesIO()
                im.convert("RGB").save(buf, "JPEG", quality=74, optimize=True)
                uri = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("ascii")
            except Exception:
                uri = ""
        cards.append(
            '<figure data-title="%s" data-url="%s">'
            '<div class="pic">%s</div>'
            '<figcaption><b>%s</b><span class="lic">%s</span>'
            '<span class="dim">%d&times;%d</span>'
            '<span class="by">%s</span></figcaption>'
            '<label><input type="checkbox" class="pick"> USE THIS</label></figure>'
            % (html.escape(title), html.escape(v["url"]),
               ('<img src="%s" alt="">' % uri) if uri else '<span class="none">no preview</span>',
               html.escape(title.replace("File:", "")[:52]), html.escape(v["lic"]),
               v["w"], v["h"], html.escape(re.sub(r"<[^>]+>", "", v["artist"])[:44])))
        done += 1
        if done % 8 == 0:
            print("  %d/%d" % (done, len(picked)))

    secs = []
    for lesson, _n in SUBJECTS:
        rows = [c for c, v in picked if v["lesson"] == lesson]
        if not rows:
            continue
        cards_i = [cards[i] for i, (t, v) in enumerate(picked) if v["lesson"] == lesson]
        secs.append("<section><h2>%s <small>%d candidates</small></h2>"
                    '<div class="grid">%s</div></section>'
                    % (html.escape(lesson), len(rows), "".join(cards_i)))

    doc = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Licence-clear candidates — Wikimedia Commons</title>
<style>
 :root{color-scheme:dark}
 body{margin:0;padding:24px 28px 100px;background:#051223;color:#E8EEF7;
      font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
 h1{font-size:24px;margin:0 0 6px}
 h2{font-size:16px;color:#E3B77E;margin:30px 0 8px;border-top:1px solid #243750;padding-top:16px}
 h2 small{color:#7C8CA8;font-weight:400;font-size:13px}
 .lead{color:#9FB2CC;max-width:82ch}
 .legal{border:2px solid #4E9C8F;background:rgba(78,156,143,.12);padding:15px 18px;
        border-radius:10px;max-width:92ch;margin:18px 0}
 .legal b{color:#7FC0B2}
 .warn{border-color:#B36B51;background:rgba(179,107,81,.12)}
 .warn b{color:#CC9B67}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
 figure{margin:0;background:#0C1C39;border:1px solid #243750;border-radius:9px;overflow:hidden}
 figure.marked{border-color:#B58554;box-shadow:0 0 0 2px rgba(181,133,84,.45)}
 .pic{height:180px;background:#0A1526}
 .pic img{width:100%%;height:180px;object-fit:cover;display:block}
 .none{display:flex;height:180px;align-items:center;justify-content:center;color:#6B7A96;font-size:13px}
 figcaption{padding:8px 10px 2px;font-size:12px}
 figcaption b{display:block;color:#E8EEF7;word-break:break-word;line-height:1.35}
 .lic{display:inline-block;margin-top:5px;font:700 10.5px/1.6 var(--mono);
      letter-spacing:.05em;color:#7FC0B2;border:1px solid rgba(78,156,143,.5);
      border-radius:4px;padding:0 6px}
 .dim{display:block;color:#8FA3C0;font:11px/1.6 var(--mono);margin-top:4px}
 .by{display:block;color:#7C8CA8;font-size:11px;margin-top:2px}
 figure label{display:block;padding:8px 10px 11px;font-size:12.5px;color:#B58554;cursor:pointer}
 figure input{width:16px;height:16px;vertical-align:-3px;margin-right:7px;accent-color:#B58554}
 .bar{position:sticky;top:0;background:#051223f5;backdrop-filter:blur(8px);padding:13px 0;
      border-bottom:1px solid #243750;z-index:5;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
 button{background:#B58554;color:#051223;border:0;border-radius:7px;padding:10px 17px;
        font-weight:700;font-size:14px;cursor:pointer}
 button.ghost{background:#243750;color:#E8EEF7}
 #n{color:#E3B77E;font-weight:700}
 #out{background:#0C1C39;border:1px solid #243750;border-radius:7px;padding:10px;
      color:#9FB2CC;font:12px ui-monospace,monospace;flex:1;min-width:300px;
      max-height:180px;overflow:auto;white-space:pre-wrap;cursor:text}
 .hint{margin:8px 0 0;font-size:13px;min-height:1.3em}
</style></head><body>

<h1>Licence-clear candidates</h1>
<p class="lead">%d photographs from Wikimedia Commons, filtered to those large enough to teach from and
whose licence is public domain or CC. Tick the ones you want and press <b>Copy list</b>.</p>

<div class="legal">
<p><b>Licence.</b> Almost everything below is a US federal photograph &mdash; US Navy, US Marines, US Air
Force. Works of the US Government are public domain and may be republished without permission.
These are the only online images that carry no licensing question at all.</p>
<p><b>Why not a normal web search.</b> A general image search returns work that is copyrighted and
attributed to nobody. Putting that into a paid commercial course is the risk this project has avoided
throughout. Commons carries the licence in machine-readable form, which is why this is filtered on
the licence field and not on a search engine.</p>
</div>

<div class="legal warn">
<p><b>The trade-off, plainly.</b> These are foreign-service photographs. They are technically excellent
and legally clean, but they are not South African, and a learner will notice. Wherever a subject
exists to be shot on your own aerodrome, your own photography is the better answer &mdash; more
credible, and no licence conversation needed.</p>
<p class="warn"><b>And a photograph still cannot teach the geometry.</b> No photograph shows a 500 metre
jet blast danger zone. The turbine engine diagram should stay, because §12.2.12 is a distance and a
photograph is not a distance. What a photograph adds is scale and reality. The answer is both.</p>
</div>

<div class="bar">
  <button class="ghost" onclick="clearAll()">Clear all</button>
  <button onclick="copyList()">Copy list</button>
  <span id="n">0 selected</span>
  <div id="out">tick the ones you want, then press Copy list and paste into the chat</div>
</div>
<p class="hint" id="hint">&nbsp;</p>

%s

<script>
var b=[].slice.call(document.querySelectorAll('.pick'));
function t(){
  var s=b.filter(function(x){return x.checked;});
  b.forEach(function(x){ x.closest('figure').classList.toggle('marked', x.checked); });
  document.getElementById('n').textContent = s.length + ' selected';
  document.getElementById('out').textContent = s.length
    ? s.map(function(x){
        var f=x.closest('figure');
        return f.dataset.title.replace(/^File:/,'')+' || '+f.dataset.url;}).join('\\n')
    : '';
}
b.forEach(function(x){x.addEventListener('change',t);});
function clearAll(){ b.forEach(function(x){x.checked=false;}); t(); }
function say(m,c){ var h=document.getElementById('hint'); h.textContent=m; h.style.color=c; }
function copyList(){
  var txt=document.getElementById('out').textContent.trim();
  if(!txt){ say('Nothing ticked yet.','#E0A080'); return; }
  var n=b.filter(function(x){return x.checked;}).length;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){
      say('Copied '+n+' file name'+(n===1?'':'s')+' and URLs. Paste into the chat.','#8FBFA8');
    },function(){ fb(txt,n); });
  } else fb(txt,n);
}
function fb(txt,n){
  var box=document.getElementById('out'); var r=document.createRange();
  r.selectNodeContents(box); var sel=window.getSelection();
  sel.removeAllRanges(); sel.addRange(r);
  say(n+' selected. Press Command+C, then paste into the chat.','#E0A080');
}
t();
</script>
</body></html>""" % (len(picked), "".join(secs))

    open(DESK, "w", encoding="utf-8").write(doc)
    print("\n%d candidates written to %s" % (len(picked), DESK))


if __name__ == "__main__":
    from PIL import Image
    main()