/* Structural audit for every diagram.
   Run: node deploy/check-diagrams.js

   This checks what node can check: that every key draws, that nothing renders
   NaN or undefined, that each carries a <title> and an aria-label for screen
   readers, a viewBox, and a caption worth reading.

   It deliberately does NOT try to be a layout checker. Character-width
   estimation in node was tried at 0.55 and 0.62 em and produced 35 and 26
   false positives respectively against a real measured advance of about
   0.46 em — node cannot see the webfont. Exact geometry lives in
   deploy/geometry-audit.js, which runs in the page and measures real glyph
   boxes with getBBox(). Run both after any edit to js/diagrams.js.

   Last full audit, 2026-10-09: 21 diagrams, 0 structural, 0 geometry.
*/
'use strict';

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'js', 'diagrams.js');

const src = fs.readFileSync(SRC, 'utf8').replace("'use strict';", '');
const cut = src.indexOf('/* ---------------------------------------------------------------- render */');
const g = {};
new Function('globalThis', src.slice(0, cut) +
  '; globalThis.D = DIAGRAMS; globalThis.K = DIAGRAM_KEYS;')(g);
const DIAGRAMS = g.D;
const KEYS = g.K;

let problems = 0;
const fail = (key, msg) => { problems++; console.log('  ' + key + ': ' + msg); };

KEYS.forEach(key => {
  let svg;
  try {
    svg = DIAGRAMS[key].draw();
  } catch (e) {
    fail(key, 'draw() threw — ' + e.message);
    return;
  }
  if (/NaN|undefined/.test(svg)) fail(key, 'rendered NaN or undefined');
  if (!/<title>/.test(svg)) fail(key, 'no <title>');
  if (!/role="img"/.test(svg)) fail(key, 'no role="img"');
  if (!/aria-label="/.test(svg)) fail(key, 'no aria-label');
  if (!DIAGRAMS[key].caption || DIAGRAMS[key].caption.length < 80) fail(key, 'caption too thin to be useful');
  if (!/viewBox="0 0 \d+ \d+"/.test(svg)) fail(key, 'no viewBox');
});

console.log(KEYS.length + ' diagrams, ' + (problems || 'no') + ' structural problems.');
process.exit(problems ? 1 : 0);
