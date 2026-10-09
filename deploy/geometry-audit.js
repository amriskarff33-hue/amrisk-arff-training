/* ============================================================================
   GEOMETRY AUDIT — RUNS IN THE PAGE, NOT IN NODE
   ============================================================================
   Why this file exists
   --------------------
   A diagram can parse, render, carry a title and a caption, and still be
   visibly broken: text running off the canvas edge, which the SVG clips
   silently, or text spilling out of the panel it belongs to, which just looks
   wrong. `node --check` cannot see either. Neither can node at all, because the
   diagrams are set in a webfont whose glyph advances node has no access to.

   Character-width estimation in node was tried and abandoned. At 0.55 em it
   reported 26 problems; at 0.62 em it reported 35; the real measured average
   advance in the shipped font is about 0.46 em. Every one of those was a false
   positive. A checker that cries wolf gets ignored, so this file measures real
   glyph boxes with getBBox() in a browser, where the font is actually resolved.

   What it checks
   --------------
   1. CANVAS   every <text> box stays inside the viewBox. Failure = clipped text.
   2. PANEL    every <text> box stays inside the smallest panel that contains
               its start point. Failure = text sitting outside its own box.
   3. OVERLAP  no two <text> boxes from different panels overlap each other.
               Failure = words printed on top of words.

   How to run it
   -------------
   Serve the app root over http (file:// will not load the script cleanly):

       cd arff-training && python3 -m http.server 8931

   Open http://localhost:8931/ in a browser, then run this in the console:

       fetch('/deploy/geometry-audit.js').then(r=>r.text()).then(eval)

   Or drive it from a headless runner by loading the same URL. It writes the
   full report to window.__arffGeometryReport and prints a summary.

   Every finding is a defect worth fixing before deploy. Do not deploy a
   diagram change without a clean pass on both this and check-diagrams.js.
   ========================================================================= */

(function () {
  'use strict';

  var SRC = '/js/diagrams.js';
  var PANEL_SLACK = 4;      /* px a text box may sit proud of a panel before it counts */
  var OVERLAP_X = 1;        /* px of horizontal intersection between two text boxes */
  var OVERLAP_Y = 2;        /* px of vertical intersection between two text boxes */

  function load() {
    return fetch(SRC + '?audit=' + Date.now())
      .then(function (r) { return r.text(); })
      .then(function (src) {
        src = src.replace("'use strict';", '');
        var cut = src.indexOf('/* ---------------------------------------------------------------- render */');
        if (cut < 0) throw new Error('render marker not found in diagrams.js');
        return new Function(src.slice(0, cut) + '; return DIAGRAMS;')();
      });
  }

  /* Rects the audit is allowed to treat as panels. Anything inside a <g> with
     a transform is excluded: its coordinates are local to that group and the
     browser reports them untransformed, so comparing them against page-space
     panels produces nonsense. This was a real false-positive source. */
  function panelRects(el) {
    var out = [];
    Array.prototype.forEach.call(el.querySelectorAll('rect'), function (r) {
      if (r.closest('g[transform]')) return;
      var x = r.getAttribute('x');
      var y = r.getAttribute('y');
      if (x === null || y === null) return;
      if (+x < 0 || +y < 0) return;
      out.push({
        x: +x, y: +y,
        w: +r.getAttribute('width'), h: +r.getAttribute('height'),
        el: r
      });
    });
    return out;
  }

  function textBoxes(el) {
    var out = [];
    Array.prototype.forEach.call(el.querySelectorAll('text'), function (tx) {
      if (!tx.textContent.length) return;
      var b = tx.getBBox();
      out.push({ b: b, text: tx.textContent, el: tx });
    });
    return out;
  }

  /* The panel a piece of text belongs to: the smallest rect that contains the
     start of its bounding box on both axes. Ties on area are broken by taking
     the first in document order only when areas are equal AND both fully
     contain the start — requiring the start to be within the rect's own
     horizontal span is what stops a left-hand neighbour being mistaken for
     the host panel. */
  function hostPanel(box, panels) {
    var host = null;
    panels.forEach(function (p) {
      var inX = box.x >= p.x - 1 && box.x <= p.x + p.w - 1;
      var inY = box.y >= p.y - 1 && box.y + box.height <= p.y + p.h + 1;
      if (!inX || !inY) return;
      if (!host || p.w * p.h < host.w * host.h) host = p;
    });
    return host;
  }

  /* Vertical tolerance is looser than horizontal on purpose. A getBBox() on a
     line of text includes ascender and descender whitespace, so two wrapped
     lines set 12px apart at an 11.5px size report ~2px of box intersection
     even though no glyphs touch. Anything more than that is a real collision
     and is what the check is for. */
  function overlap(a, b) {
    var x = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
    var y = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
    return (x > OVERLAP_X && y > OVERLAP_Y) ? Math.round(x) + 'x' + Math.round(y) : null;
  }

  function auditOne(D, key, host) {
    host.innerHTML = D[key].draw();
    var el = host.querySelector('svg');
    el.setAttribute('width', '2400');
    el.setAttribute('height', '1600');

    var vb = el.getAttribute('viewBox').split(/\s+/);
    var vw = +vb[2], vh = +vb[3];
    var panels = panelRects(el);
    var boxes = textBoxes(el);
    var notes = [];

    boxes.forEach(function (t) {
      var b = t.b;
      if (b.x < 2) {
        notes.push('CANVAS-LEFT ' + Math.round(2 - b.x) + 'px "' + t.text.slice(0, 34) + '"');
        return;
      }
      var over = Math.round(b.x + b.width - (vw - 2));
      if (over > 0) {
        notes.push('CANVAS-RIGHT +' + over + 'px "' + t.text.slice(0, 34) + '"');
        return;
      }
      if (b.y < 2 || b.y + b.height > vh - 2) {
        notes.push('CANVAS-VERTICAL "' + t.text.slice(0, 34) + '"');
        return;
      }
      var host_ = hostPanel(b, panels);
      if (host_) {
        var spill = Math.round(b.x + b.width - (host_.x + host_.w));
        if (spill > PANEL_SLACK) {
          notes.push('PANEL +' + spill + 'px "' + t.text.slice(0, 34) + '"');
        }
      }
    });

    /* Text on text. Only compare boxes whose start points sit in different
       panels, otherwise two lines in the same wrapped paragraph can touch
       legitimately without being a defect. */
    for (var i = 0; i < boxes.length; i++) {
      for (var j = i + 1; j < boxes.length; j++) {
        var pa = hostPanel(boxes[i].b, panels);
        var pb = hostPanel(boxes[j].b, panels);
        if (pa && pb && pa.el === pb.el) continue;
        var hit = overlap(boxes[i].b, boxes[j].b);
        if (hit) {
          notes.push('OVERLAP ' + hit + ' "' + boxes[i].text.slice(0, 22) +
            '" / "' + boxes[j].text.slice(0, 22) + '"');
        }
      }
    }

    return { key: key, size: vw + 'x' + vh, notes: notes };
  }

  function run() {
    var host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-99999px;top:0;width:2400px;';
    document.body.appendChild(host);

    return load().then(function (D) {
      var report = [];
      var canvasBad = 0, panelBad = 0, overlapBad = 0;
      Object.keys(D).forEach(function (key) {
        var r = auditOne(D, key, host);
        report.push(r);
        r.notes.forEach(function (n) {
          if (n.indexOf('CANVAS') === 0) canvasBad++;
          else if (n.indexOf('PANEL') === 0) panelBad++;
          else if (n.indexOf('OVERLAP') === 0) overlapBad++;
        });
      });
      host.remove();

      var lines = report.filter(function (r) { return r.notes.length; })
        .map(function (r) { return r.key + ' (' + r.size + ')\n    ' + r.notes.join('\n    '); });
      var out = 'GEOMETRY AUDIT — ' + report.length + ' diagrams, canvas ' + canvasBad +
        ', panel ' + panelBad + ', overlap ' + overlapBad + '\n' +
        (lines.length ? lines.join('\n') : 'CLEAN');
      window.__arffGeometryReport = { report: report, canvas: canvasBad, panel: panelBad, overlap: overlapBad };
      console.log(out);
      return out;
    });
  }

  window.arffGeometryAudit = run;
  if (typeof module !== 'undefined') module.exports = run;
})();