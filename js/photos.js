/* ============================================================================
   PHOTOS — photographic figures for ARFF lessons
   ============================================================================

   WHY THIS FILE EXISTS
   A diagram explains geometry. A photograph shows the thing. Neither replaces
   the other, and a course that only has diagrams teaches a shape rather than
   a subject. This file holds the plumbing for photographic figures so lesson
   authors can place one with {{photo:key}} exactly as they place a diagram.

   HOW A PHOTO GETS IN HERE — AND THE HONEST CONSTRAINT
   Nothing is bundled by default. An empty PHOTOS registry renders nothing and
   costs nothing. This is deliberate: the images that would be genuinely useful
   in an ARFF course are photographs of aircraft, accidents, vehicles and
   equipment, and almost all of those are either commercially licensed,
   copyrighted, or restricted in ways that matter for a commercial training
   product. Fetching them from the internet and shipping them inside a paid
   training platform is not something to do quietly — it is a licensing
   decision, and it belongs to you, not to the model.

   So there are two honest routes, and the second is the one that works:

   1. YOUR OWN PHOTOGRAPHY. Photographs of your own vehicles, your own crews,
      your own aircraft, your own aerodrome. You hold the rights, they are
      accurate to your operation, and they are the pictures your learners
      actually need to recognise. This is the recommended route and it is
      better training than any stock image could be.

   2. LICENSED OR PERMISSIONED SOURCES. Where a photograph is genuinely
      necessary — an aircraft type you do not operate, an accident you want to
      reference — obtain it with a licence that permits commercial training
      redistribution, record the licence and the credit line below, and keep
      the source note. Do not add one without them.

   OFFLINE BEHAVIOUR
   Every registered photo is added to the service worker precache list so it is
   available with no connection. That is the whole point: a training course
   that stops working when the aerodrome has no signal is useless at exactly
   the moment it is needed. Unregistered files are NOT precached and will 404
   offline, so a photo that matters must be registered here.

   HOW TO ADD ONE
   1. Put the file in media/ and name it in lower case with hyphens, e.g.
      media/our-stdn-arff-vehicle.jpg
   2. Keep it under about 250 KB. Precache cost is paid on every install by
      every learner, on every device, including the one in the hangar with no
      signal. Compress it.
   3. Register it below, with a caption that says what the learner is meant to
      be LOOKING AT, not just what the picture is of. A caption is teaching.
   4. Record credit and licence. Required for anything you did not photograph.
   5. Add the filename to SHELL in sw.js, or it will not work offline.
   6. Place it in a lesson body with {{photo:key}}.

   WHY THE PLACEHOLDER RENDERS A CALLOUT WHEN A KEY IS UNKNOWN
   A missing diagram degrades quietly. A missing photo that a lesson depends on
   should be visible during authoring so it gets fixed, and should never
   present as a broken image to a learner. Unknown keys therefore render a
   labelled note, not an <img> pointing at nothing.

   Copyright note
   Photographs supplied by the operator are the operator's own property.
   Nothing in this file reproduces any photograph.
   ========================================================================= */

'use strict';

/* --------------------------------------------------------------------------
   THE REGISTRY
   Replace the empty example below with real entries, or leave the object
   empty — the platform works exactly the same without any photos in it.

   Field guide:
     src      filename under media/. Must be added to SHELL in sw.js.
     alt      plain description, read aloud by a screen reader. Describe the
              content, not the caption.
     caption  what the learner should look at. This is the teaching content.
     credit   who holds the copyright, and the licence or permission.
     kind     'photo' by default; 'diagram' is reserved and unused here.
   -------------------------------------------------------------------------- */
const PHOTOS = {
  /* Example — delete or replace. Never ship this placeholder. */
  // 'example-vehicle': {
  //   alt: 'A heavy rescue vehicle parked on an apron with its high reach extendible turret raised.',
  //   caption: 'Look at the turret stowage position and the width of the vehicle over the apron marking. This is the footprint that has to fit through your gate — ICAO Doc 9137 Part 1 §5.6.1.',
  //   credit: 'AM RISK AND TRAINING. Operator photograph.'
  // },

  /* Add real entries below this line. */
  '57726252385-f5c2dcb1-3acb-4e25-8b5f-d547cef0': { src: 'media/57726252385-f5c2dcb1-3acb-4e25-8b5f-d547cef0.jpg', alt: 'Operator\'s own ARFF photograph',
    caption: 'Photograph by AM RISK AND TRAINING. Operator\'s own photography from its own operations.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '57855928595-c8e01ad1-0cb4-48c9-8f7c-69a28696': { src: 'media/57855928595-c8e01ad1-0cb4-48c9-8f7c-69a28696.jpg', alt: 'Operator\'s own ARFF photograph',
    caption: 'Photograph by AM RISK AND TRAINING. Operator\'s own photography from its own operations.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '20130920-113843': { src: 'media/20130920-113843.jpg', alt: 'Operator\'s own ARFF photograph',
    caption: 'Photograph by AM RISK AND TRAINING. Operator\'s own photography from its own operations.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'image': { src: 'media/image.jpg', alt: 'Aircraft interior or access point',
    caption: 'Interior access reference, for choosing where to cut. Doc 9137 Part 1 warns that misuse of forcible entry tools has resulted in unnecessary fuel spills.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'r117-9-galley-g1-drawing-monument': { src: 'media/r117-9-galley-g1-drawing-monument.jpg', alt: 'Aircraft interior or access point',
    caption: 'Interior access reference, for choosing where to cut. Doc 9137 Part 1 warns that misuse of forcible entry tools has resulted in unnecessary fuel spills.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '20150291281-04': { src: 'media/20150291281-04.jpg', alt: 'Aircraft interior or access point',
    caption: 'Interior access reference, for choosing where to cut. Doc 9137 Part 1 warns that misuse of forcible entry tools has resulted in unnecessary fuel spills.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'dsc00554': { src: 'media/dsc00554.jpg', alt: 'Rescue and extrication in progress',
    caption: 'Rescue in progress. Rescue and fire fighting are one service, not two, and a rescue decision that improves fire conditions is a fire decision.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'work-7': { src: 'media/work-7.jpg', alt: 'Rescue and extrication in progress',
    caption: 'Rescue in progress. Rescue and fire fighting are one service, not two, and a rescue decision that improves fire conditions is a fire decision.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'work-1': { src: 'media/work-1.jpg', alt: 'Rescue and extrication in progress',
    caption: 'Rescue in progress. Rescue and fire fighting are one service, not two, and a rescue decision that improves fire conditions is a fire decision.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'work-2': { src: 'media/work-2.jpg', alt: 'Rescue and extrication in progress',
    caption: 'Rescue in progress. Rescue and fire fighting are one service, not two, and a rescue decision that improves fire conditions is a fire decision.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'work-4': { src: 'media/work-4.jpg', alt: 'Rescue and extrication in progress',
    caption: 'Rescue in progress. Rescue and fire fighting are one service, not two, and a rescue decision that improves fire conditions is a fire decision.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'work-5': { src: 'media/work-5.jpg', alt: 'Rescue and extrication in progress',
    caption: 'Rescue in progress. Rescue and fire fighting are one service, not two, and a rescue decision that improves fire conditions is a fire decision.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '49f67e0f-02a8-4112-8bda-4dda28f94530': { src: 'media/49f67e0f-02a8-4112-8bda-4dda28f94530.jpg', alt: 'Historic aircraft photograph',
    caption: 'Historic aircraft photograph held in the operator\'s library.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '6e0fa816-6a92-44b6-af5c-4b2076feeebd': { src: 'media/6e0fa816-6a92-44b6-af5c-4b2076feeebd.jpg', alt: 'Historic aircraft photograph',
    caption: 'Historic aircraft photograph held in the operator\'s library.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'b88d3575-d44b-40b6-8f75-2fc77cff3bf5': { src: 'media/b88d3575-d44b-40b6-8f75-2fc77cff3bf5.jpg', alt: 'Historic aircraft photograph',
    caption: 'Historic aircraft photograph held in the operator\'s library.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'class-1-hazard-labels': { src: 'media/class-1-hazard-labels.jpg', alt: 'Dangerous goods placard, label or package',
    caption: 'Dangerous goods marking. The placard geometry is fixed: red diamond, class number in the bottom half, subsidiary risk in the lower corner.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'picture': { src: 'media/picture.jpg', alt: 'Dangerous goods placard, label or package',
    caption: 'Dangerous goods marking. The placard geometry is fixed: red diamond, class number in the bottom half, subsidiary risk in the lower corner.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'handling-labels': { src: 'media/handling-labels.jpg', alt: 'Dangerous goods placard, label or package',
    caption: 'Dangerous goods marking. The placard geometry is fixed: red diamond, class number in the bottom half, subsidiary risk in the lower corner.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'picture-002': { src: 'media/picture-002.jpg', alt: 'Dangerous goods placard, label or package',
    caption: 'Dangerous goods marking. The placard geometry is fixed: red diamond, class number in the bottom half, subsidiary risk in the lower corner.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'wchr-wet-cell-battery': { src: 'media/wchr-wet-cell-battery.jpg', alt: 'Dangerous goods placard, label or package',
    caption: 'Dangerous goods marking. The placard geometry is fixed: red diamond, class number in the bottom half, subsidiary risk in the lower corner.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'handling-label-danger': { src: 'media/handling-label-danger.jpg', alt: 'Dangerous goods placard, label or package',
    caption: 'Dangerous goods marking. The placard geometry is fixed: red diamond, class number in the bottom half, subsidiary risk in the lower corner.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'original': { src: 'media/original.jpg', alt: 'Aircraft firefighting training in progress',
    caption: 'Live-fire training. Practical technique, which is what the curriculum separates throughout from theory and examination.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '586099620-fire-department-wallpaper': { src: 'media/586099620-fire-department-wallpaper.jpg', alt: 'Aircraft firefighting training in progress',
    caption: 'Live-fire training. Practical technique, which is what the curriculum separates throughout from theory and examination.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '1-436-110-arff-3': { src: 'media/1-436-110-arff-3.jpg', alt: 'Aircraft firefighting training in progress',
    caption: 'Live-fire training. Practical technique, which is what the curriculum separates throughout from theory and examination.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'fire-fighters-3': { src: 'media/fire-fighters-3.jpg', alt: 'Aircraft firefighting training in progress',
    caption: 'Live-fire training. Practical technique, which is what the curriculum separates throughout from theory and examination.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'china-airlines-in-hangars-2': { src: 'media/china-airlines-in-hangars-2.jpg', alt: 'Aircraft accident scene',
    caption: 'Accident scene. Review for graphic content before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'china-airlines-in-hangars-4': { src: 'media/china-airlines-in-hangars-4.jpg', alt: 'Aircraft accident scene',
    caption: 'Accident scene. Review for graphic content before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'pic00019': { src: 'media/pic00019.jpg', alt: 'Aircraft accident scene',
    caption: 'Accident scene. Review for graphic content before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'china-airlines-crash3-2': { src: 'media/china-airlines-crash3-2.jpg', alt: 'Aircraft accident scene',
    caption: 'Accident scene. Review for graphic content before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'a380': { src: 'media/a380.jpg', alt: 'Aircraft accident scene',
    caption: 'Accident scene. Review for graphic content before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'china-airlines-in-hangars-5': { src: 'media/china-airlines-in-hangars-5.jpg', alt: 'Aircraft accident scene',
    caption: 'Accident scene. Review for graphic content before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'china-airlines-in-hangars-6': { src: 'media/china-airlines-in-hangars-6.jpg', alt: 'Aircraft accident scene',
    caption: 'Accident scene. Review for graphic content before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'china-airlines-in-hangars-8': { src: 'media/china-airlines-in-hangars-8.jpg', alt: 'Aircraft accident scene',
    caption: 'Accident scene. Review for graphic content before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'screenshot-2019-06-14-21-02-52': { src: 'media/screenshot-2019-06-14-21-02-52.jpg', alt: 'Accident chart',
    caption: 'Accident chart from the operator\'s library. Verify rights before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'screenshot-2019-06-14-21-03-24': { src: 'media/screenshot-2019-06-14-21-03-24.jpg', alt: 'Accident chart',
    caption: 'Accident chart from the operator\'s library. Verify rights before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'screenshot-2019-06-14-21-03-52': { src: 'media/screenshot-2019-06-14-21-03-52.jpg', alt: 'Accident chart',
    caption: 'Accident chart from the operator\'s library. Verify rights before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'screenshot-2019-06-14-21-04-15': { src: 'media/screenshot-2019-06-14-21-04-15.jpg', alt: 'Accident chart',
    caption: 'Accident chart from the operator\'s library. Verify rights before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'screenshot-2019-06-14-21-04-22': { src: 'media/screenshot-2019-06-14-21-04-22.jpg', alt: 'Accident chart',
    caption: 'Accident chart from the operator\'s library. Verify rights before publishing. This image comes from a folder of accident and damage photographs. It has not been reviewed for graphic content and must be checked before the platform is sold.',
    credit: 'Photograph: AM RISK AND TRAINING library — content not yet reviewed' },
  'img-1177-2': { src: 'media/img-1177-2.jpg', alt: 'Aircraft wash bay',
    caption: 'Aircraft washing. Run-off from washing is an environmental provision under CAR 139.02.11.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
};

/* Keys registered. Used by the offline check and by the review pack. */
const PHOTO_KEYS = Object.keys(PHOTOS);

/* Placeholder pattern shared with the lesson renderer. */
const PHOTO_RE = /\{\{photo:([A-Za-z0-9_-]+)\}\}/g;

/* One figure. Kept structurally identical to diagramBlock() so the two read
   as the same kind of object in the flow of a lesson. */
function photoBlock(key) {
  const p = PHOTOS[key];

  if (!p) {
    /* Visible during authoring, never presented as a broken image. */
    return '<figure class="fig fig--missing">' +
      '<div class="fig__missing" role="note">' +
      '<strong>Photo not registered: ' + key + '</strong>' +
      '<span>Add the file to <code>media/</code>, register it in ' +
      '<code>js/photos.js</code> with credit and licence, and add the ' +
      'filename to <code>SHELL</code> in <code>sw.js</code> so it works ' +
      'offline. Until then this lesson shows a note rather than a gap.</span>' +
      '</div></figure>';
  }

  return '<figure class="fig fig--photo">' +
    '<img src="' + p.src + '" alt="' + p.alt + '" loading="lazy" decoding="async">' +
    (p.caption ? '<figcaption>' + p.caption + '</figcaption>' : '') +
    (p.credit ? '<p class="fig__credit">' + p.credit + '</p>' : '') +
    '</figure>';
}

/* Replace every placeholder in a lesson body. Idempotent: if a body contains
   no placeholder the string is returned untouched, which keeps the hot path in
   the lesson renderer cheap. */
function renderPhotos(html) {
  if (!html || html.indexOf('{{photo:') === -1) return html || '';
  return String(html).replace(PHOTO_RE, (m, key) => photoBlock(key));
}

/* Count of photos that are registered but not precached by the service worker.
   Read by deploy/check-media.js — an uncached photo is a photo that fails the
   moment the learner loses signal, which is most of the time on an airfield. */
function photosNotPrecached(shellList) {
  const shell = Array.isArray(shellList) ? shellList : [];
  const norm = (s) => String(s).replace(/^\.\//, '');
  const have = new Set(shell.map(norm));
  return PHOTO_KEYS.filter((k) => {
    const p = PHOTOS[k];
    return p && p.src && !have.has(norm(p.src));
  });
}
