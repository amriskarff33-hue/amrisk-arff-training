/* Checks that every registered photo exists on disk, is small enough to
   precache, and is reachable offline.
   Usage: node deploy/check-media.js
   Exit code 1 if anything is wrong, so it can gate a commit. */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

/* photos.js is pure data and pure string building — no DOM — so it can be
   evaluated whole in node. Slicing it at a marker comment was fragile: the
   banner at the top of the file also contains a dashed rule. */
let src = fs.readFileSync(path.join(root, 'js', 'photos.js'), 'utf8').replace(/'use strict';/, '');
new Function(src + '\n;globalThis.__P = { PHOTOS, PHOTO_KEYS, photosNotPrecached };')();
const { PHOTOS, PHOTO_KEYS, photosNotPrecached } = globalThis.__P;

let sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const sm = sw.match(/const SHELL = \[([\s\S]*?)\];/);
const SHELL = (sm ? sm[1] : '').split('\n')
  .map((l) => l.trim().replace(/^'/, '').replace(/',?$/, ''))
  .filter((l) => l && !l.startsWith('//'));

console.log('registered photos: ' + PHOTO_KEYS.length);
console.log('SHELL entries:     ' + SHELL.length);

if (!PHOTO_KEYS.length) {
  console.log('\nNo photos registered. That is a valid state — the platform works');
  console.log('without them. See the header of js/photos.js for how to add one, and');
  console.log('for why operator photographs are the recommended route.');
  process.exit(0);
}

let bad = 0;
const uncached = photosNotPrecached(SHELL);
if (uncached.length) {
  console.log('\nNOT PRECACHED — will fail with no connection:');
  uncached.forEach((k) => console.log('  ' + k + '  ->  ' + PHOTOS[k].src));
  bad++;
}

PHOTO_KEYS.forEach((k) => {
  const p = PHOTOS[k];
  const abs = path.join(root, p.src);
  if (!fs.existsSync(abs)) {
    console.log('\nMISSING FILE: ' + k + '  ->  ' + p.src);
    bad++;
    return;
  }
  const kb = Math.round(fs.statSync(abs).size / 1024);
  const flag = kb > 250 ? '  TOO LARGE' : '';
  console.log('\n' + k);
  console.log('  file    ' + p.src + '  (' + kb + ' KB)' + flag);
  console.log('  alt     ' + (p.alt ? 'present' : 'MISSING — needs describing'));
  console.log('  caption ' + (p.caption ? 'present (' + p.caption.length + ' chars)' : 'MISSING — a caption is the teaching'));
  console.log('  credit  ' + (p.credit ? 'present' : 'MISSING — required unless operator-photographed'));
  if (kb > 250) bad++;
  if (!p.alt || !p.caption || !p.credit) bad++;
});

process.exit(bad ? 1 : 0);
