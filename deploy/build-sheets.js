/* Builds a standalone diagram contact sheet from js/diagrams.js.
   Usage: node deploy/build-sheets.js [outfile]
   Open the result in a browser to review every diagram without installing
   the PWA. Used for visual sign-off, which cannot be done from the source. */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const out = process.argv[2] || path.join(root, 'deploy', 'diagram-sheet.html');

let src = fs.readFileSync(path.join(root, 'js/diagrams.js'), 'utf8').replace(/'use strict';/, '');
const cut = src.indexOf('/* ---------------------------------------------------------------- render */');
src = src.slice(0, cut) + '; globalThis.__D = DIAGRAMS; globalThis.__K = DIAGRAM_KEYS;';
new Function(src)();

const css = fs.readFileSync(path.join(root, 'css/app.css'), 'utf8');
const dg = css.slice(css.indexOf('.dg-s   {'), css.indexOf('.dg-panel--warn'));

const TOKENS = [
  '--midnight:#051223','--navy:#0C1C39','--navy-lift:#0C264E','--slate:#243750',
  '--slate-lift:#383D52','--copper:#B36B51','--copper-deep:#835552','--gold:#B58554',
  '--gold-lift:#CC9B67','--gold-bright:#E3B77E','--gold-deep:#523925','--warn:#C9A227',
  '--pass:#4E9C8F','--fail:#C2603F','--surface:#0C1F38','--line:#1E3A57',
  '--line-soft:#16304A','--text:#EAF1F8','--text-2:#A9BED4','--text-3:#6E87A1',
  '--mono:ui-monospace,"SF Mono",Menlo,monospace'
].join(';');

const cards = globalThis.__K.map((k) => {
  const d = globalThis.__D[k];
  return `<section><h2>${k}</h2>${d.draw()}<p class="cap">${d.caption}</p></section>`;
}).join('\n');

fs.writeFileSync(out, `<!doctype html><meta charset="utf-8">
<title>AM RISK AND TRAINING — ARFF diagram contact sheet</title>
<style>
:root{${TOKENS}}
body{background:#051223;color:#EAF1F8;font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;margin:0;padding:28px}
h1{font-size:20px;letter-spacing:.04em;color:#CC9B67;margin:0 0 4px}
p.lede{color:#A9BED4;margin:0 0 8px;font-size:13.5px;max-width:760px}
section{background:#0C1F38;border:1px solid #16304A;border-radius:14px;padding:16px 18px 12px;margin:0 0 22px;max-width:780px}
h2{font:600 12px/1 ui-monospace,Menlo,monospace;color:#E3B77E;margin:0 0 10px;letter-spacing:.06em}
svg{width:100%;height:auto;display:block;background:#0A1A31;border-radius:9px}
p.cap{color:#A9BED4;font-size:12.5px;margin:11px 0 2px;line-height:1.5}
${dg}
</style>
<h1>AM RISK AND TRAINING &mdash; ARFF diagram contact sheet</h1>
<p class="lede">All ${globalThis.__K.length} diagrams, drawn by js/diagrams.js exactly as the app draws them. These have never been visually reviewed &mdash; please check each one reads correctly. Built ${new Date().toISOString().slice(0,10)}.</p>
${cards}
`);
console.log('wrote ' + out + ' (' + fs.statSync(out).size + ' bytes, ' + globalThis.__K.length + ' diagrams)');
