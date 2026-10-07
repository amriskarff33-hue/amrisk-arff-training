# media/

Photographs and locally recorded video referenced by lessons.

## Photographs

1. Put the file here, lower case, hyphens, e.g. `our-stdn-arff-vehicle.jpg`
2. Keep it **under 250 KB**. Precache cost is paid by every learner on every
   device, including the one in the hangar with no signal. Compress it.
3. Register it in `js/photos.js` with `alt`, `caption`, and `credit`
4. Place it in a lesson body with `{{photo:key}}`

`sw.js` adds every registered file to the precache list automatically, so step
4 is all you need for it to work offline. `node deploy/check-media.js` verifies
the whole chain.

## Licence — read this before adding a photograph

Only add images you have the right to ship inside a commercial training
product.

- **Your own photographs** of your vehicles, crews, aircraft and aerodrome are
  the recommended route. You hold the rights and they are accurate to your
  operation.
- Anything else needs a licence that permits commercial redistribution, or
  written permission. Record who holds the copyright and under what licence in
  the `credit` field.

Do not download images from the web and add them. Almost all of them are
licensed or copyrighted, and a training platform is a commercial
redistribution channel.

## Video

SME-recorded video goes here and is registered in `LOCAL_VIDEO` in
`js/videos.js`. Large binaries: `.mp4`, `.mov` and `.m4v` are in `.gitignore` —
add deliberately with `git add -f`, and check the size before you do. A 200 MB
video in the precache list is a 200 MB download on every device.
