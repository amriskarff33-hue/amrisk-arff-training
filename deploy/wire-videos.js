/* Inserts {{video:key}} placeholders into lesson bodies.
   Placement rule: immediately before the closing SME action blockquote, so the
   video sits at the end of the teaching and the action stays last.

   Each mapping below is matched to the VIDEO TITLE, not to a course id:
     faa-intro-1  Introduction            faa-intro-2  Airport Familiarization
     faa-intro-3  Aircraft Familiarization faa-intro-4  Personnel Safety
     faa-intro-5  Emergency Comms         faa-intro-6  Fire Suppression Equip
     faa-intro-7  Extinguishing Agents    faa-intro-8  Aircraft Evacuation
     faa-intro-9  Fire Fighting Ops      faa-intro-10 DOT Emergency Guide Book
     faa-intro-11 Conclusion             faa-tact-1   Tactics Introduction
     faa-tact-2   Forcible Entry          faa-tact-3   HRET
     faa-tact-4   Cargo Firefighting      faa-tact-5   Tactics Conclusion
     faa-f3       Fluorine Free Foam

   Idempotent: a key already present in a lesson is not inserted again.
   Usage: node deploy/wire-videos.js [--dry] */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const file = path.join(root, 'js', 'lessons.js');
const dry = process.argv.includes('--dry');

const MAP = {
  'art01-m1': ['faa-intro-prelude', 'faa-intro-1'],
  'art01-m5': ['faa-intro-11'],
  'art02-m1': ['faa-intro-1'],
  'art03-m3': ['faa-intro-7'],
  'art04-m1': ['faa-intro-7'],
  'art04-m5': ['faa-f3'],
  'art05-m1': ['faa-tact-3'],
  'art05-m2': ['faa-tact-3'],
  'art06-m1': ['faa-intro-6', 'faa-tact-3'],
  'art06-m3': ['faa-intro-6'],
  'art07-m1': ['faa-intro-4'],
  'art07-m2': ['faa-intro-4'],
  'art08-m1': ['faa-intro-4'],
  'art09-m1': ['faa-intro-5', 'faa-tact-1'],
  'art09-m3': ['faa-intro-5'],
  'art10-m2': ['faa-tact-2'],
  'art10-m4': ['faa-intro-8', 'faa-tact-2'],
  'art11-m1': ['faa-intro-2'],
  'art11-m2': ['faa-intro-3'],
  'art12-m3': ['faa-tact-4'],
  'art13-m1': ['faa-intro-10'],
  'art13-m2': ['faa-intro-10'],
  'art14-m3': ['faa-f3'],
  'art15-m1': ['faa-intro-9'],
  'art15-m3': ['faa-intro-9'],
  'art16-m1': ['faa-intro-9', 'faa-tact-1'],
  'art16-m2': ['faa-tact-3'],
  'art17-m3': ['faa-intro-6', 'faa-tact-3'],
  'art18-m1': ['faa-intro-5'],
  'art18-m3': ['faa-intro-5'],
  'art19-m1': ['faa-intro-5', 'faa-tact-1'],
  'art20-m1': ['faa-tact-1'],
  'art20-m3': ['faa-tact-1', 'faa-intro-9'],
  'art21-m2': ['faa-intro-2'],
  'art23-m1': ['faa-tact-5'],
  'art24-m1': ['faa-intro-8'],
  'art25-m1': ['faa-intro-6'],
  'art25-m3': ['faa-f3']
};

/* Video titles from js/videos.js, so a caption can be written per placement
   rather than a generic block. */
const TITLES = {
  'faa-intro-prelude': 'Prelude', 'faa-intro-1': 'Section 1 — Introduction',
  'faa-intro-2': 'Section 2 — Airport Familiarization', 'faa-intro-3': 'Section 3 — Aircraft Familiarization',
  'faa-intro-4': 'Section 4 — Personnel Safety', 'faa-intro-5': 'Section 5 — Airport Emergency Communications',
  'faa-intro-6': 'Section 6 — Fire Suppression Equipment', 'faa-intro-7': 'Section 7 — Fire Extinguishing Agents',
  'faa-intro-8': 'Section 8 — Emergency Aircraft Evacuation', 'faa-intro-9': 'Section 9 — Fire Fighting Operations',
  'faa-intro-10': 'Section 10 — Use of the DOT Emergency Guide Book', 'faa-intro-11': 'Section 11 — Conclusion',
  'faa-tact-1': 'Section 1 — Introduction', 'faa-tact-2': 'Section 2 — Forcible Entry',
  'faa-tact-3': 'Section 3 — High Reach Extendible Turret (HRET)',
  'faa-tact-4': 'Section 4 — Cargo Aircraft Firefighting', 'faa-tact-5': 'Section 5 — Conclusion',
  'faa-f3': 'Fluorine Free Foam (F3) Transition for ARFF Departments'
};

let src = fs.readFileSync(file, 'utf8');
let added = 0, skipped = 0, missing = [];

for (const [lesson, keys] of Object.entries(MAP)) {
  const head = src.indexOf("'" + lesson + "': {");
  if (head < 0) { missing.push(lesson + ' (not in lessons.js)'); continue; }

  const bodyStart = src.indexOf('body: `', head);
  const bodyEnd = src.indexOf('\n  `,', bodyStart);
  if (bodyStart < 0 || bodyEnd < 0) { missing.push(lesson + ' (body not found)'); continue; }

  let body = src.slice(bodyStart + 7, bodyEnd);

  // The SME action blockquote must stay last in the lesson.
  const bq = body.lastIndexOf('    <blockquote>');
  if (bq < 0) { missing.push(lesson + ' (no blockquote)'); continue; }

  const newKeys = keys.filter((k) => body.indexOf('{{video:' + k + '}}') === -1);
  if (!newKeys.length) { skipped++; continue; }

  const block = '\n    <div class="section-title"><h2>Video</h2><small>Official FAA source — needs a connection</small></div>\n' +
    newKeys.map((k) => '    <p class="vidsrc">Related official video: <b>' + TITLES[k] + '</b> — United States 14 CFR Part 139 material. Verify every regulatory point against SACAA/CAAB requirements and your own SOP.</p>\n    {{video:' + k + '}}').join('\n') +
    '\n\n';

  body = body.slice(0, bq) + block + body.slice(bq);
  src = src.slice(0, bodyStart + 7) + body + src.slice(bodyEnd);
  added += newKeys.length;
}

const keys = new Set();
src.replace(/\{\{video:([a-z0-9-]+)\}\}/g, (m, k) => { keys.add(k); return m; });
const lib = new Set(
  fs.readFileSync(path.join(root, 'js', 'videos.js'), 'utf8')
    .split('const VIDEO_COURSES')[0].match(/^  '([a-z0-9-]+)': \{$/gm)
    .map((l) => l.match(/'([a-z0-9-]+)'/)[1]));
const bad = [...keys].filter((k) => !lib.has(k));

console.log('placeholders inserted: ' + added + '  (lessons already had video: ' + skipped + ')');
console.log('distinct video keys now used in lessons: ' + keys.size + ' of ' + lib.size);
console.log('unknown keys: ' + (bad.length ? bad.join(', ') : 'none'));
if (missing.length) console.log('PROBLEMS: ' + missing.join('; '));
if (bad.length) process.exit(1);
if (!dry) { fs.writeFileSync(file, src); console.log('written to js/lessons.js'); }
else console.log('dry run — nothing written');
