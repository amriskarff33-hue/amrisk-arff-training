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
  '57855928595-c8e01ad1-0cb4-48c9-8f7c-69a28696': { src: 'media/57855928595-c8e01ad1-0cb4-48c9-8f7c-69a28696.jpg', alt: 'ARFF crew in red coveralls and helmets gathered around a crew member reading from a document indoors',
    caption: 'Crew in full station wear during a briefing. The service is a crew before it is a vehicle: briefings, documents and closed questions are where incidents are decided, long before the alarm.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '20130920-113843': { src: 'media/20130920-113843.jpg', alt: 'Black-and-white 1966 group portrait of the Jan Smuts airport fire brigade in uniform',
    caption: 'Fire staff at Jan Smuts Airport, March 1966. The service you are joining is older than the aircraft you will protect — and the accountability in this photograph is the same accountability in your lesson on roles.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'image': { src: 'media/image.jpg', alt: 'Patent line drawing of an aircraft lavatory monument with numbered parts',
    caption: 'Patent drawing of a lavatory monument, every part numbered. Interiors are systems packed into monuments: know what a unit contains before you force it.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'r117-9-galley-g1-drawing-monument': { src: 'media/r117-9-galley-g1-drawing-monument.jpg', alt: 'Photograph of an aircraft galley monument beside an exploded patent drawing of the same unit',
    caption: 'A galley monument, photographed and drawn exploded. Access points are chosen against the real unit, not the empty airframe around it.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '20150291281-04': { src: 'media/20150291281-04.jpg', alt: 'Patent line drawings showing an aircraft fuselage structure in side, top and perspective views',
    caption: 'Patent structural drawings of a fuselage. Read them for where the structure is, not the skin: structure is what will resist your tools, and the drawing tells you before you cut.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'dsc00554': { src: 'media/dsc00554.jpg', alt: 'Responder in helmet and goggles cutting into the cab of a truck during an extrication exercise at dusk',
    caption: 'Cutting into a cab at dusk. Stabilise first, then cut: the tool is the last thing that moves, not the first.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'work-1': { src: 'media/work-1.jpg', alt: 'Two responders in high-visibility gear beside a red heavy rescue truck marked EQUITY on an airfield apron',
    caption: 'Heavy rescue on the apron with crew deployed. Size the vehicle against the gate it has to pass — footprint first, capability second.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'work-2': { src: 'media/work-2.jpg', alt: 'Responder cutting a vehicle at night throwing a shower of sparks, with a colleague observing',
    caption: 'Night cutting with spark throw. Sparks at night are visible; in daylight they are not — the hazard does not change with the light.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'work-4': { src: 'media/work-4.jpg', alt: 'Open cab of a red rescue truck at night with hydraulic lines connected',
    caption: 'Cab opened and hydraulics connected at night. Hoses, lines and rams are the rescue after the rescue: rig them before you need them.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'work-5': { src: 'media/work-5.jpg', alt: 'Front of a red ARFF truck at night with its amber light bar lit',
    caption: 'Appliance staged at night with warning lights running. Conspicuity is part of the positioning decision, not decoration on it.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '49f67e0f-02a8-4112-8bda-4dda28f94530': { src: 'media/49f67e0f-02a8-4112-8bda-4dda28f94530.jpg', alt: 'Historic black-and-white photograph of a Department of Transport fire tender, a converted Land Rover',
    caption: 'A historic Department of Transport fire tender. Capability has changed beyond recognition; the duty it carried has not.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '6e0fa816-6a92-44b6-af5c-4b2076feeebd': { src: 'media/6e0fa816-6a92-44b6-af5c-4b2076feeebd.jpg', alt: 'Two uniformed officers standing in front of an Airports Company South Africa R1 rescue and fire fighting vehicle',
    caption: 'Crew with an ACSA R1 major foam tender. Your fleet mix is the list of what you can actually put on the ground in two minutes.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'b88d3575-d44b-40b6-8f75-2fc77cff3bf5': { src: 'media/b88d3575-d44b-40b6-8f75-2fc77cff3bf5.jpg', alt: 'Historic black-and-white photograph of a Department of Transport rescue van',
    caption: 'A historic rescue van. Read it against the R1 in the next photograph: same service, different century of equipment.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'class-1-hazard-labels': { src: 'media/class-1-hazard-labels.jpg', alt: 'Chart of Class 1 explosives hazard labels showing divisions 1.4, 1.5 and 1.6 as orange diamonds',
    caption: 'Class 1 explosives divisions on the label chart. Explosives are subdivided by behaviour, not just presence — read the division, not only the diamond.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'picture': { src: 'media/picture.jpg', alt: 'Chart of mixed dangerous goods hazard labels including explosives, flammable solids, oxidizers and miscellaneous classes',
    caption: 'The mixed hazard label chart. Shape first, then class number, then subsidiary risk in the lower corner — in that order, every time.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'handling-labels': { src: 'media/handling-labels.jpg', alt: 'Sheet of handling labels: cryogenic liquid, magnetized material, wheelchair, DANGER do-not-load, and orientation arrows',
    caption: 'Handling labels, not hazard labels. These give instructions rather than warnings — cryogenic, magnetized, orientation, and the DANGER label that keeps cargo off passenger aircraft.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'picture-002': { src: 'media/picture-002.jpg', alt: 'Chart of hazard labels including flammable, radioactive, corrosive and miscellaneous classes with handling labels below',
    caption: 'Hazard classes with handling labels beneath. The two systems answer different questions: what it is, and what to do with it.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'wchr-wet-cell-battery': { src: 'media/wchr-wet-cell-battery.jpg', alt: 'Close-up of wheelchair and wheelchair wet-battery handling labels with attached and separated variants',
    caption: 'Wheelchair and wet-battery handling labels, attached and separated variants. Small labels carry the same authority as large placards.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'handling-label-danger': { src: 'media/handling-label-danger.jpg', alt: 'Close-up of the orange and black DANGER label showing cargo that must not be loaded in passenger aircraft',
    caption: 'The DANGER label: do not load in passenger aircraft. One label, one prohibition, no interpretation required.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'original': { src: 'media/original.jpg', alt: 'Yellow ARFF vehicle driving on an unpaved track through grassland',
    caption: 'A major tender off pavement. Quickest is not shortest, and off-pavement capability is what makes the quickest route possible.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  '1-436-110-arff-3': { src: 'media/1-436-110-arff-3.jpg', alt: 'Firefighters in protective gear advancing a hose line toward a burning aircraft fuselage during training',
    caption: 'Hose team advancing on a burning fuselage in training. Technique is footwork and water placement before it is equipment.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'fire-fighters-3': { src: 'media/fire-fighters-3.jpg', alt: 'Three firefighters in aluminised proximity suits advancing together toward flames, seen from behind',
    caption: 'Entry team in proximity suits advancing on fire. Proximity suits buy approach distance, not immunity — the withdrawal decision stays with the crew.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'china-airlines-in-hangars-2': { src: 'media/china-airlines-in-hangars-2.jpg', alt: 'Burnt-out aircraft fuselage in a hangar with staging and investigation equipment around it',
    caption: 'The same aircraft in the hangar afterwards. Post-fire, the wreck is evidence and a classroom: read the burn pattern before anything is moved.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'pic00019': { src: 'media/pic00019.jpg', alt: 'Red ARFF vehicle with its cab door open discharging a turret stream during a demonstration',
    caption: 'A major tender discharging through the roof turret with crew in the cab. Turret flow is the capability the category table is buying — know your discharge rate before the alarm.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'china-airlines-crash3-2': { src: 'media/china-airlines-crash3-2.jpg', alt: 'Passenger aircraft engulfed in fire and black smoke on an airport apron',
    caption: 'China Airlines Flight 120 burning after landing at Naha in 2007. Everyone aboard evacuated; the photograph shows what a survivable fire still looks like from the outside.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'a380': { src: 'media/a380.jpg', alt: 'Airbus A380 on a runway, the largest passenger type in the category table',
    caption: 'The A380: category 10, the top of the table. Fleet familiarisation starts with the largest type on your aerodrome, because it sets the category for everything.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'china-airlines-in-hangars-5': { src: 'media/china-airlines-in-hangars-5.jpg', alt: 'Wide view of a fire-damaged airliner in a maintenance hangar with work platforms alongside',
    caption: 'Wide view of the fire-damaged airliner under cover. Preservation of evidence starts the moment the fire is out.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'china-airlines-in-hangars-8': { src: 'media/china-airlines-in-hangars-8.jpg', alt: 'Close view of fire damage to an airliner fuselage side with window frames burned out',
    caption: 'Close view of fuselage burn-through. Fire writes its own incident report on the skin — learn to read it.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'screenshot-2019-06-14-21-04-15': { src: 'media/screenshot-2019-06-14-21-04-15.jpg', alt: 'Diagram of hot brake and damaged tyre safety areas showing approach paths and the hazard zone',
    caption: 'Hot brake and damaged tyre safety areas: approach from fore or aft, never in line with the axle. Photographed from a reference display — the geometry matches §12.2.3, which the diagram in this lesson draws to scale.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'screenshot-2019-06-14-21-04-22': { src: 'media/screenshot-2019-06-14-21-04-22.jpg', alt: 'Diagram marking the hazard area, rim hazard zones and approach paths around a hot wheel',
    caption: 'Rim hazard and approach paths around a hot wheel. The axle line is the place never to stand; the diagram shows where to stand instead.',
    credit: 'Photograph: AM RISK AND TRAINING library' },
  'img-1177-2': { src: 'media/img-1177-2.jpg', alt: 'Open aircraft shelter with marked apron and drainage channel in front',
    caption: 'An open shelter with marked apron and drainage. Run-off from washing, foam and fuel goes where the drainage sends it — know where yours sends it before the incident.',
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
