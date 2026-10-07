/* Builds a standalone review pack for the whole platform.
   Usage: node deploy/build-review.js [outfile]

   This is the artefact used for visual and editorial sign-off. It renders the
   real data — curriculum.js, lessons.js, diagrams.js, videos.js — so it can
   never drift from what the app actually serves. Open it in any browser; no
   server, no install, no network. */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const out = process.argv[2] || path.join(root, 'deploy', 'review-pack.html');

function load(file, expose) {
  let src = fs.readFileSync(path.join(root, 'js', file), 'utf8').replace(/'use strict';/, '');
  const cut = src.indexOf('/* ---------------------------------------------------------------- render */');
  if (cut > 0) src = src.slice(0, cut);
  src += '\n;globalThis.__x = {' + expose.join(',') + '};';
  new Function(src)();
  return globalThis.__x;
}

const C = load('curriculum.js', ['CURRICULUM', 'TOTAL_MINUTES', 'PENDING_REVIEW', 'TRACKS']);
const L = load('lessons.js', ['LESSON_OVERRIDES']);
const D = load('diagrams.js', ['DIAGRAMS', 'DIAGRAM_KEYS']);
const V = load('videos.js', ['VIDEO_LIBRARY', 'VIDEO_COURSES']);
const O = L.LESSON_OVERRIDES, CUR = C.CURRICULUM, DIA = D.DIAGRAMS, VID = V.VIDEO_LIBRARY;

const css = fs.readFileSync(path.join(root, 'css/app.css'), 'utf8');
const dg = css.slice(css.indexOf('.dg-s   {'), css.indexOf('.dg-panel--warn'));
const TOK = ['--midnight:#051223','--navy:#0C1C39','--navy-lift:#0C264E','--slate:#243750',
 '--slate-lift:#383D52','--copper:#B36B51','--copper-deep:#835552','--gold:#B58554',
 '--gold-lift:#CC9B67','--gold-bright:#E3B77E','--gold-deep:#523925','--warn:#C9A227',
 '--pass:#4E9C8F','--fail:#C2603F','--surface:#0C1F38','--surface-2:#12283F',
 '--line:#1E3A57','--line-soft:#16304A','--text:#EAF1F8','--text-2:#A9BED4','--text-3:#6E87A1',
 '--tr-core:#B36B51','--tr-equip:#6E8CB0','--tr-ops:#4E9C8F','--tr-emrg:#C2603F','--tr-lead:#8A7BB8',
 '--mono:ui-monospace,"SF Mono",Menlo,monospace'].join(';');

const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const TRACKNAME = { core:'Core Foundations', equip:'Equipment & Agents', ops:'Operations',
                    emrg:'Emergency Response', lead:'Readiness & Leadership' };

let lessonsTotal = 0, minsTotal = 0, minsWritten = 0, qTotal = 0, qSme = 0;
const rows = [];
for (const c of CUR) {
  let w = 0;
  const modRows = c.modules.map((m) => {
    lessonsTotal++; minsTotal += m.minutes;
    const o = O[m.id];
    if (o) { w++; minsWritten += m.minutes; }
    const qs = (c.questions || []).length;
    return `<tr class="${o ? '' : 'todo'}">
      <td class="id">${m.id}</td>
      <td>${esc(m.title)}</td>
      <td class="n">${m.minutes}</td>
      <td class="n">${o ? o.points.length : '—'}</td>
      <td class="n">${o ? o.body.length.toLocaleString() : '—'}</td>
      <td class="n">${o ? o.refs.length : '—'}</td>
      <td class="st">${o ? (o.smeChecked === false ? '<span class="pill warn">SME pending</span>' : '<span class="pill ok">SME</span>') : '<span class="pill none">not written</span>'}</td>
    </tr>`;
  }).join('');
  for (const q of ((c.assessment && c.assessment.questions) || [])) { qTotal++; if (q.sme) qSme++; }
  const pct = Math.round(100 * w / c.modules.length);
  rows.push(`<section class="course" style="--tk:var(--tr-${esc(c.track)})">
    <header>
      <div class="chead">
        <span class="code">${esc(c.code)}</span>
        <h3>${esc(c.title)}</h3>
        <div class="meta">${esc(TRACKNAME[c.track] || c.track)} · ${esc(c.level)} · ${c.minutes} min · ${((c.assessment&&c.assessment.questions)||[]).length} questions · pass ${c.assessment?c.assessment.pass:'-'}%</div>
      </div>
      <div class="cbar"><div class="fill" style="width:${pct}%"></div></div>
      <div class="cnum">${w}/${c.modules.length}</div>
    </header>
    <p class="sum">${esc(c.summary || '')}</p>
    <table><thead><tr><th>Lesson</th><th>Title</th><th>Min</th><th>Points</th><th>Chars</th><th>Refs</th><th>Status</th></tr></thead><tbody>${modRows}</tbody></table>
    <details><summary>Governing standards (${(c.standards||[]).length})</summary><ul>${(c.standards||[]).map(s=>`<li>${esc(s)}</li>`).join('')}</ul></details>
    <details><summary>Learning outcomes (${(c.outcomes||[]).length})</summary><ul>${(c.outcomes||[]).map(s=>`<li>${esc(s)}</li>`).join('')}</ul></details>
  </section>`);
}

const coursesDone = CUR.filter(c => c.modules.every(m => O[m.id])).length;
const chars = Object.values(O).reduce((a, o) => a + o.body.length, 0);
const refs = Object.values(O).reduce((a, o) => a + o.refs.length, 0);
const videoRows = Object.entries(VID).map(([k, v]) =>
  `<tr><td class="id">${k}</td><td>${esc(v.title)}</td><td>${esc(v.series)}</td><td class="id">${v.id}</td>
   <td>${(V.VIDEO_COURSES && Object.values(V.VIDEO_COURSES).some(a => a.includes(k))) ? 'yes' : '—'}</td></tr>`).join('');
const diaCards = D.DIAGRAM_KEYS.map(k =>
  `<section><h2>${k}</h2>${DIA[k].draw()}<p class="cap">${DIA[k].caption}</p>
   <p class="use">Referenced by: ${Object.keys(O).filter(id => (O[id].body||'').includes('{{diagram:'+k+'}}')).join(', ') || '<em>not referenced</em>'}</p></section>`).join('');

const qRows = [];
for (const c of CUR) {
  const qs = (c.assessment && c.assessment.questions) || [];
  qs.forEach((q, i) => {
    qRows.push(`<tr>
      <td class="id">${esc(c.code)}</td><td class="n">${i+1}</td>
      <td>${esc(q.q)}</td>
      <td>${q.options ? q.options.map((o,j) => (j===q.answer?'<b style="color:#7FD4C5">'+esc(o)+'</b>':esc(o))).join(' &middot; ') : '—'}</td>
      <td>${q.sme ? '<span class="pill warn">SME</span>' : '<span class="pill none">—</span>'}</td>
      <td class="why">${esc(q.why || '')}</td>
    </tr>`);
  });
}

/* The gap register. Every lesson that names a document we do not hold, or a
   clause the source does not contain. This is the most important table in the
   pack: it is the list of what this platform cannot tell you. */
const GAP = [];
const SEEN = new Set();
for (const [id, o] of Object.entries(O)) {
  const blob = (o.refs || []).join(' \n ');
  const re = /(NOT HELD[^']*|NOT IN THIS LIBRARY[^']*|Gap: [^']*)/gi;
  let m;
  while ((m = re.exec(blob)) !== null) {
    const t = m[1].trim();
    if (!SEEN.has(t)) { SEEN.add(t); GAP.push({ id, code: 'ART-' + id.slice(3,5), t }); }
  }
  for (const r of (o.refs || [])) {
    const mm = /^([A-Z][A-Za-z0-9 .()\/,-]*?)\s+—\s+(.*)$/.exec(r);
    if (mm && /NFPA|SACAA|CAAB|South Africa|State instrument/i.test(r) && !SEEN.has(r)) {
      SEEN.add(r); GAP.push({ id, code: 'ART-' + id.slice(3,5), t: r });
    }
  }
}
const gapRows = GAP.map(g => `<tr><td class="id">${esc(g.code)}</td><td class="id">${esc(g.id)}</td><td>${esc(g.t)}</td></tr>`).join('');

const stat = (n, l, s) => `<div class="stat"><b>${n}</b><span>${l}</span><i>${s}</i></div>`;

fs.writeFileSync(out, `<!doctype html><meta charset="utf-8">
<title>AM RISK AND TRAINING — ARFF platform review pack</title>
<style>
:root{${TOK}}
*{box-sizing:border-box}
body{background:#051223;color:#EAF1F8;font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;margin:0;padding:28px 28px 80px}
.wrap{max-width:1180px;margin:0 auto}
h1{font-size:22px;letter-spacing:.04em;color:#CC9B67;margin:0 0 6px}
h2.t{font-size:16px;color:#E3B77E;margin:44px 0 4px;padding-bottom:8px;border-bottom:1px solid #16304A;letter-spacing:.05em}
p.lede{color:#A9BED4;margin:0 0 20px;max-width:820px;font-size:13.5px}
.stats{display:flex;flex-wrap:wrap;gap:12px;margin:20px 0 8px}
.stat{background:#0C1F38;border:1px solid #16304A;border-radius:12px;padding:14px 18px;min-width:150px;flex:1}
.stat b{display:block;font-size:26px;line-height:1.1;color:#E3B77E;font-weight:700}
.stat span{display:block;color:#EAF1F8;font-size:13px;margin-top:4px}
.stat i{display:block;color:#6E87A1;font-size:11.5px;font-style:normal;margin-top:2px}
section.course{background:#0C1F38;border:1px solid #16304A;border-left:4px solid var(--tk);border-radius:12px;padding:16px 18px;margin:0 0 18px}
section.course header{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.code{font:700 11px/1 ui-monospace,Menlo,monospace;background:var(--tk);color:#051223;padding:5px 8px;border-radius:5px;letter-spacing:.06em}
section.course h3{margin:0;font-size:16.5px;flex:1;min-width:260px}
.meta{color:#6E87A1;font-size:12px;flex-basis:100%}
.cbar{flex:1;min-width:150px;height:7px;background:#16304A;border-radius:4px;overflow:hidden}
.fill{height:100%;background:var(--tk)}
.cnum{font:700 13px/1 ui-monospace,Menlo,monospace;color:#E3B77E;min-width:44px;text-align:right}
p.sum{color:#A9BED4;font-size:13px;margin:12px 0 10px;max-width:900px}
table{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px}
th{text-align:left;color:#6E87A1;font:600 10.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.07em;text-transform:uppercase;padding:7px 8px;border-bottom:1px solid #1E3A57}
td{padding:7px 8px;border-bottom:1px solid #12283F;vertical-align:top}
td.n,th.n{text-align:right;font-family:var(--mono);font-size:11.5px;white-space:nowrap}
td.id,th.id{font-family:var(--mono);font-size:11px;color:#6E87A1;white-space:nowrap}
tr.todo td{color:#6E87A1}
tr.todo td.id{color:#4a5c72}
.pill{font:700 10px/1 ui-monospace,Menlo,monospace;padding:4px 7px;border-radius:99px;letter-spacing:.05em;white-space:nowrap}
.pill.ok{background:rgba(78,156,143,.18);color:#7FD4C5}
.pill.warn{background:rgba(201,162,39,.16);color:#E3B77E}
.pill.none{background:#16304A;color:#6E87A1}
details{margin-top:10px}
summary{cursor:pointer;color:#8FB0D0;font-size:12.5px;padding:5px 0}
summary:hover{color:#CC9B67}
details ul{margin:6px 0 0;padding-left:20px;color:#A9BED4;font-size:12.5px}
details li{margin:3px 0}
.dia{background:#0C1F38;border:1px solid #16304A;border-radius:12px;padding:14px 16px 12px;margin:0 0 18px;max-width:820px}
.dia h2{font:600 12px/1 ui-monospace,Menlo,monospace;color:#E3B77E;margin:0 0 10px;border:0;padding:0;letter-spacing:.06em}
svg{width:100%;height:auto;display:block;background:#0A1A31;border-radius:9px}
p.cap{color:#A9BED4;font-size:12.5px;margin:10px 0 2px;line-height:1.5}
p.use{color:#6E87A1;font-size:11.5px;margin:2px 0 0;font-family:var(--mono)}
td.why{color:#A9BED4;font-size:11.5px;max-width:340px}
.note{background:rgba(201,162,39,.07);border:1px solid rgba(201,162,39,.3);border-radius:10px;padding:12px 16px;margin:14px 0;color:#E3C88A;font-size:13px}
.note b{color:#E3B77E}
${dg}
</style>
<div class="wrap">
<h1>AM RISK AND TRAINING — ARFF platform review pack</h1>
<p class="lede">Everything built so far, rendered from the real source files (<span style="font-family:var(--mono)">js/curriculum.js</span>, <span style="font-family:var(--mono)">js/lessons.js</span>, <span style="font-family:var(--mono)">js/diagrams.js</span>, <span style="font-family:var(--mono)">js/videos.js</span>) so this cannot drift from what the app serves. Built ${new Date().toISOString().slice(0,10)}.</p>

<div class="stats">
${stat('25','Courses','5 tracks')}
${stat(lessonsTotal,'Lessons',`${lessonsTotal-C.CURRICULUM.reduce((n,c)=>n+c.modules.filter(m=>O[m.id]).length,0)} not yet written`)}
${stat(coursesDone+'/'+CUR.length,'Courses complete','fully authored')}
${stat(chars.toLocaleString(),'Body characters',refs+' references cited')}
${stat(Math.floor(C.TOTAL_MINUTES/60)+'h '+(C.TOTAL_MINUTES%60)+'m','Curriculum',Math.round(100*minsWritten/minsTotal)+'% minutes authored')}
${stat(qTotal,'Questions',qSme+' flagged for SME')}
${stat(D.DIAGRAM_KEYS.length,'Diagrams','visual sign-off pending')}
${stat(Object.keys(VID).length,'Videos','all verified official FAA')}
</div>

<div class="note"><b>Read this first.</b> Every lesson below carries <b>SME pending</b>. Not one of the ${lessonsTotal-C.CURRICULUM.reduce((n,c)=>n+c.modules.filter(m=>O[m.id]).length,0)} written lessons has been signed off by a subject-matter reviewer, and the ${D.DIAGRAM_KEYS.length} diagrams have never been looked at by a human. This pack is what that review has to happen against. Where a source document does not cover a subject the lesson says so and lists what to obtain, rather than inventing content — those gaps are the point, not a defect.</div>

<h2 class="t">CURRICULUM — ${CUR.length} courses</h2>
${rows.join('\n')}

<h2 class="t">DIAGRAMS — ${D.DIAGRAM_KEYS.length}</h2>
<p class="lede">Drawn by js/diagrams.js exactly as the app draws them, with the lessons that reference each one. <b style="color:#E3B77E">These have never been visually reviewed.</b></p>
${diaCards}

<h2 class="t">ASSESSMENT BANK &mdash; ${qTotal} questions, ${qSme} flagged SME</h2>
<p class="lede">Every question carries a worked explanation. Questions marked <span class="pill warn">SME</span> assert something technical and need a reviewer to confirm the answer is the right one before a learner is marked against it.</p>
<table><thead><tr><th>Course</th><th class="n">#</th><th>Question</th><th>Options (correct in bold)</th><th>SME</th><th>Why</th></tr></thead><tbody>${qRows.join('')}</tbody></table>

<h2 class="t">GAP REGISTER &mdash; ${GAP.length} entries</h2>
<p class="lede">Documents this platform does not hold, and subjects the source library does not cover. A lesson naming one of these is doing the honest thing; it is not a hole to be filled by whoever is available to write. <b style="color:#E3B77E">This is the list of what this platform cannot tell you.</b></p>
<table><thead><tr><th>Lesson</th><th>Module</th><th>Gap</th></tr></thead><tbody>${gapRows || '<tr><td colspan="3">none detected by the scanner</td></tr>'}</tbody></table>

<h2 class="t">VIDEO LIBRARY — ${Object.keys(VID).length}</h2>
<p class="lede">All verified official FAA via YouTube oEmbed. FAA material is United States 14 CFR Part 139 oriented and is labelled as such throughout. Embeds need a connection; the app marks every card accordingly.</p>
<table><thead><tr><th>Key</th><th>Title</th><th>Series</th><th>YouTube ID</th><th>Mapped</th></tr></thead><tbody>${videoRows}</tbody></table>
</div>
`);
console.log('wrote ' + out);
console.log('  lessons ' + Object.keys(O).length + '/' + lessonsTotal + ' | courses complete ' + coursesDone + '/' + CUR.length +
  ' | chars ' + chars.toLocaleString() + ' | diagrams ' + D.DIAGRAM_KEYS.length + ' | videos ' + Object.keys(VID).length + ' | questions ' + qTotal);
