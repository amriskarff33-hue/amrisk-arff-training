/* ============================================================================
   DIAGRAMS — technical illustrations for ARFF lessons
   ============================================================================

   WHY THIS FILE EXISTS
   A procedure like "approach a hot brake at a fore/aft angle" is unusable from
   prose alone. Read it as text and nobody can picture where they should stand.
   These diagrams carry that geometry.

   HOW TO USE (for authors)
   Put {{diagram:key}} anywhere in a lesson body and it is replaced with the
   figure. Keys are listed in DIAGRAM_KEYS at the bottom of this file.

   Sources
   Every diagram cites the document and clause it was drawn from, in the
   caption. Geometry and figures are taken from the documents, not from memory.
   Where a figure is a simplification it says so in the caption.

   HOW THEY RENDER
   Pure inline SVG using CSS classes (no inline fill/stroke attributes), so
   every diagram re-themes correctly in day and night mode from the tokens in
   css/app.css. Viewport-scaled via viewBox — no JavaScript measuring.

   Copyright note
   These are original drawings of published requirements. They do not
   reproduce the wording or artwork of any standard.
   ========================================================================= */

'use strict';

/* ---------------------------------------------------------------- helpers */

/* Arrows are drawn by hand rather than with SVG <marker> so that several
   diagrams can appear on one page without id collisions. */
function dgArrow(x1, y1, x2, y2, cls, w, dash) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const len = 10;
  const spread = 0.44;
  const hx = x2 - len * Math.cos(a - spread);
  const hy = y2 - len * Math.sin(a - spread);
  const tx = x2 - len * Math.cos(a + spread);
  const ty = y2 - len * Math.sin(a + spread);
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" stroke-width="${w || 2.4}"` +
         (dash ? ` stroke-dasharray="${dash}"` : '') + `/>` +
         `<path d="M${hx.toFixed(1)},${hy.toFixed(1)} L${x2},${y2} L${tx.toFixed(1)},${ty.toFixed(1)} Z" class="dg-head"/>`;
}

/* A dashed centreline, used for axes and dimension lines. */
function dgAxis(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="dg-axis" stroke-width="1.6"/>`;
}

/* Text is the one thing that must not scale with the diagram, so it is placed
   with dominant-baseline middle and a fixed user-unit size. */
function dgText(x, y, t, cls, anchor) {
  return `<text x="${x}" y="${y}" class="dg-t ${cls || ''}"${anchor ? ` text-anchor="${anchor}"` : ''}>${t}</text>`;
}

function dgSvg(w, h, title, body) {
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}" preserveAspectRatio="xMidYMid meet">` +
         `<title>${title}</title>${body}</svg>`;
}

/* Rounded label chip, so callouts read as annotations and not as UI. */
function dgChip(x, y, w, h, label, cls) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" class="dg-chip ${cls || ''}"/>` +
         dgText(x + w / 2, y + h / 2 + 0.5, label, 'dg-t--chip', 'middle');
}

/* Diagram labels are placed by hand, so a long sentence has to be broken to a
   fixed character count at the only point available: the call site. 30
   characters is what fits inside a 196-unit cell at the .dg-t--dim size, with
   margin for the widest word. */
function dgWrap(t, n) {
  const out = [];
  let cur = '';
  String(t).split(' ').forEach(w => {
    if (!cur) { cur = w; return; }
    if ((cur + ' ' + w).length <= n) cur += ' ' + w;
    else { out.push(cur); cur = w; }
  });
  if (cur) out.push(cur);
  return out;
}

/* Wrapped paragraph. Returns the markup; callers that need to know where the
   last line ended ask dgWrap for the count. */
function dgPara(x, y, text, cls, n, lh) {
  let s = '', cy = y;
  dgWrap(text, n || 30).forEach(l => { s += dgText(x, cy, l, cls); cy += lh || 12; });
  return s;
}

/* =========================================================================
   1. HOT BRAKE — APPROACH ANGLE
   Doc 9137 Part 1 §12.2.3: approach the wheels "in a fore or aft direction
   angle and never from the side in line with the axle". The 45 degrees shown
   is the geometric reading of "a fore or aft direction angle", not a quoted
   figure — the manual does not specify degrees.
   ========================================================================= */
function dHotBrakeApproach() {
  const W = 680, H = 470;
  const cx = 340, cy = 246;               // wheel centre

  let s = '';

  // Lateral rupture hazard — why the side-on approach is the dangerous one.
  s += `<path d="M${cx - 58},${cy - 17} L44,${cy - 108} L44,${cy + 108} L${cx - 58},${cy + 17} Z" class="dg-hazard"/>`;
  s += `<path d="M${cx + 58},${cy - 17} L${W - 44},${cy - 108} L${W - 44},${cy + 108} L${cx + 58},${cy + 17} Z" class="dg-hazard"/>`;
  s += dgText(72, cy, 'rupture', 'dg-t--danger');
  s += dgText(72, cy + 17, 'hazard', 'dg-t--danger');
  s += dgText(W - 72, cy, 'rupture', 'dg-t--danger', 'end');
  s += dgText(W - 72, cy + 17, 'hazard', 'dg-t--danger', 'end');

  // Aircraft fore/aft reference — nose to the top of the frame.
  s += dgArrow(cx, 26, cx, 74, 'dg-dim');
  s += dgText(cx + 12, 48, 'FORWARD', 'dg-t--dim');
  s += dgArrow(cx, H - 26, cx, H - 78, 'dg-dim');
  s += dgText(cx + 12, H - 44, 'AFT', 'dg-t--dim');

  // The wheel and its axle.
  s += `<rect x="${cx - 62}" y="${cy - 19}" width="124" height="38" rx="9" class="dg-tyre"/>`;
  s += `<rect x="${cx - 30}" y="${cy - 30}" width="60" height="60" rx="10" class="dg-brake"/>`;
  s += dgAxis(cx - 92, cy, cx + 92, cy);
  s += dgText(cx + 98, cy - 8, 'axle', 'dg-t--dim');
  s += dgText(cx + 98, cy + 9, 'line', 'dg-t--dim');

  // CORRECT — fore quarter, and aft quarter, each offset ~45 degrees.
  s += dgArrow(150, 92, cx - 52, cy - 44, 'dg-good', 3);
  s += dgArrow(530, 402, cx + 52, cy + 44, 'dg-good', 3);
  s += dgChip(70, 56, 172, 30, 'APPROACH — FORE QUARTER', 'dg-chip--ok');
  s += dgChip(438, 386, 178, 30, 'APPROACH — AFT QUARTER', 'dg-chip--ok');

  // WRONG — side on, in line with the axle.
  s += dgArrow(112, cy, cx - 68, cy, 'dg-bad', 3);
  s += dgChip(70, cy - 48, 176, 30, 'NEVER — SIDE ON', 'dg-chip--danger');

  // The 45 degree reading, called out.
  s += `<path d="M${cx - 34},${cy - 34} A48,48 0 0 1 ${cx - 68},${cy}" class="dg-arc"/>`;
  s += dgText(cx - 84, cy - 34, '≈45°', 'dg-t--accent');

  // Brake is the heat source — agent goes here.
  s += dgArrow(cx + 128, cy - 78, cx + 34, cy - 30, 'dg-accent');
  s += dgText(cx + 132, cy - 84, 'put agent on the BRAKE,', 'dg-t--accent');
  s += dgText(cx + 132, cy - 68, 'not the tyre', 'dg-t--accent');

  s += dgText(20, 22, 'Hot brakes and wheel fires — approach geometry', 'dg-t--title');
  s += dgText(20, H - 8, 'Top view', 'dg-t--dim');

  return dgSvg(W, H, 'Top view of an aircraft wheel showing correct fore and aft quarter approach angles and the incorrect side-on approach in line with the axle.', s);
}

/* =========================================================================
   2. HOT BRAKE — HOW IT IS COOLED
   Doc 9137 Part 1 §12.2.4: too rapid cooling, "especially if localized", may
   cause explosive failure of the wheel. Solid streams are a last resort.
   Water fog or an indirect solid stream is used. Dry chemical is effective but
   not recommended on this type of fire.
   ========================================================================= */
function dHotBrakeCooling() {
  const W = 680, H = 430;
  let s = '';

  s += dgText(20, 22, 'Cooling a hot wheel — localised shock versus distributed fog', 'dg-t--title');

  const panel = (x, label, tone) => {
    let p = `<rect x="${x}" y="44" width="306" height="330" rx="14" class="dg-panel"/>`;
    p += dgText(x + 153, 70, label, 'dg-t--head', 'middle');
    p += `<rect x="${x}" y="44" width="306" height="330" rx="14" class="dg-panel__edge dg-panel__edge--${tone}"/>`;
    return p;
  };

  // ---- LEFT: what goes wrong.
  s += panel(20, 'Direct solid stream — localised', 'danger');

  // Wheel section with a hard cold patch on one edge.
  s += `<circle cx="152" cy="196" r="66" class="dg-tyre"/>`;
  s += `<circle cx="152" cy="196" r="30" class="dg-brake"/>`;
  s += `<path d="M152,130 A66,66 0 0 1 152,262 Z" class="dg-cold"/>`;
  s += dgText(196, 160, 'cold', 'dg-t--danger');
  s += dgText(196, 176, 'patch', 'dg-t--danger');
  s += dgText(196, 200, 'rest hot', 'dg-t--dim');

  // The jet and the shock front.
  s += dgArrow(286, 116, 218, 152, 'dg-bad', 2.6);
  s += dgArrow(286, 122, 240, 168, 'dg-bad', 1.6);
  s += `<path d="M196,140 A60,60 0 0 1 214,180" class="dg-arc dg-arc--danger"/>`;

  // Failure.
  s += `<path d="M240,236 l14,26 l-10,4 l12,24 l-30,-18 l10,-5 l-14,-20 z" class="dg-burst"/>`;
  s += dgText(252, 250, 'EXPLOSIVE', 'dg-t--danger');
  s += dgText(252, 266, 'FAILURE', 'dg-t--danger');
  s += dgText(252, 290, 'steam flash', 'dg-t--dim');
  s += dgText(252, 304, 'shatters the', 'dg-t--dim');
  s += dgText(252, 318, 'wheel', 'dg-t--dim');

  s += dgChip(44, 340, 258, 26, 'Last resort only — §12.2.4', 'dg-chip--danger');

  // ---- RIGHT: what to do instead.
  s += panel(354, 'Water fog — distributed', 'ok');

  // The same wheel, evenly cooled.
  s += `<circle cx="506" cy="196" r="66" class="dg-tyre"/>`;
  s += `<circle cx="506" cy="196" r="30" class="dg-brake"/>`;
  s += `<circle cx="506" cy="196" r="66" class="dg-cool"/>`;

  // Fog cone.
  s += `<path d="M640,116 L572,152 L572,240 L640,276 Z" class="dg-fog"/>`;
  for (let i = 0; i < 5; i++) {
    s += dgArrow(634, 124 + i * 34, 574, 154 + i * 22, 'dg-fogline', 1.5);
  }

  s += dgText(556, 158, 'even', 'dg-t--good');
  s += dgText(556, 174, 'cooling', 'dg-t--good');
  s += dgText(556, 200, 'no cold', 'dg-t--dim');
  s += dgText(556, 214, 'patch', 'dg-t--dim');

  s += dgText(506, 296, 'Indirect solid stream', 'dg-t--ok', 'middle');
  s += dgText(506, 314, 'is equally acceptable', 'dg-t--ok', 'middle');

  s += dgChip(378, 340, 258, 26, 'Preferred — §12.2.4', 'dg-chip--ok');

  // ---- The agent decision, across the foot of the figure.
  s += dgText(20, 400, 'Dry chemical is effective but is NOT recommended on this type of fire — §12.2.4', 'dg-t--warn');
  s += dgText(20, 418, 'Hot brakes alone may need no agent at all: let them self-cool, but never risk needless exposure.', 'dg-t--dim');

  return dgSvg(W, H, 'Section view comparing a direct solid stream causing localised explosive failure of a hot wheel with water fog giving even cooling.', s);
}

/* =========================================================================
   3. CRITICAL AREA
   Doc 9137 Part 1 §2.4.2–2.4.6. The theoretical critical area is a rectangle
   whose length is the overall aircraft length. For an aircraft of 24 m or
   more it reaches 24 m upwind and 6 m downwind; for smaller aircraft 6 m each
   side. The practical critical area is about two thirds of it.
   ========================================================================= */
function dCriticalArea() {
  const W = 680, H = 520;
  let s = '';

  s += dgText(20, 22, 'The critical area — plan view', 'dg-t--title');

  const cx = 400, cy = 250;
  const fusL = 210, fusW = 34;            // fuselage footprint
  const up = 128, down = 32;              // 24 m upwind, 6 m downwind
  const caL = fusL + up + down;

  // Practical critical area (the area you actually have to hold).
  s += `<rect x="${cx - caL / 2}" y="${cy - fusW / 2 - 4}" width="${caL}" height="${fusW + 8}" rx="6" class="dg-practical"/>`;

  // Theoretical critical area envelope.
  s += `<rect x="${cx - caL / 2}" y="${cy - fusW / 2 - up}" width="${caL}" height="${fusW + up + down}" rx="8" class="dg-theory"/>`;

  // Wind.
  s += dgArrow(34, cy, 122, cy, 'dg-accent', 2.8);
  s += dgText(34, cy - 14, 'wind', 'dg-t--accent');

  // The aircraft.
  s += `<rect x="${cx - fusL / 2}" y="${cy - fusW / 2}" width="${fusL}" height="${fusW}" rx="${fusW / 2}" class="dg-tyre"/>`;
  s += `<path d="M${cx - fusL / 2 + 12},${cy} L${cx - fusL / 2 + 4},${cy - 9} L${cx - fusL / 2 + 4},${cy + 9} Z" class="dg-solid"/>`;
  s += dgText(cx, cy - fusW / 2 - 20, 'FUSELAGE', 'dg-t--dim', 'middle');
  s += dgText(cx, cy + fusW / 2 + 20, 'W', 'dg-t--accent', 'middle');

  // Dimensions: W across, L along.
  s += dgAxis(cx - fusL / 2 - 26, cy - fusW / 2, cx - fusL / 2 - 26, cy + fusW / 2);
  s += dgText(cx - fusL / 2 - 34, cy, 'W', 'dg-t--accent', 'end');
  s += dgAxis(cx - fusL / 2, cy + fusW / 2 + 44, cx + fusL / 2, cy + fusW / 2 + 44);
  s += dgText(cx, cy + fusW / 2 + 64, 'L — overall aircraft length', 'dg-t--accent', 'middle');

  // Upwind / downwind callouts.
  s += `<line x1="${cx - caL / 2}" y1="${cy - fusW / 2 - up}" x2="${cx - caL / 2}" y2="${cy}" class="dg-dimline"/>`;
  s += dgText(cx - caL / 2 - 10, cy - up / 2 - fusW / 4, '24 m', 'dg-t--accent', 'end');
  s += dgText(cx - caL / 2 - 10, cy - up / 2 - fusW / 4 + 17, 'upwind', 'dg-t--dim', 'end');

  s += `<line x1="${cx + caL / 2}" y1="${cy + fusW / 2}" x2="${cx + caL / 2}" y2="${cy + fusW / 2 + down}" class="dg-dimline"/>`;
  s += dgText(cx + caL / 2 + 10, cy + down / 2 + fusW / 4 - 6, '6 m', 'dg-t--accent');
  s += dgText(cx + caL / 2 + 10, cy + down / 2 + fusW / 4 + 11, 'downwind', 'dg-t--dim');

  // Tail extremity note.
  s += `<line x1="${cx - fusL / 2}" y1="${cy - fusW / 2 - 22}" x2="${cx - fusL / 2}" y2="${cy + fusW / 2 + 22}" class="dg-dimline"/>`;
  /* Below the fuselage, not beside the upwind callout: the two used to print
     on top of each other. */
  s += dgText(cx - fusL / 2 - 10, cy + fusW / 2 + 34, 'whole length is protected', 'dg-t--dim', 'end');

  // Formula panel.
  const fy = 400;
  s += `<rect x="20" y="${fy}" width="640" height="102" rx="12" class="dg-panel"/>`;
  s += dgText(36, fy + 24, 'Theoretical critical area — §2.4.5', 'dg-t--head');
  s += dgText(36, fy + 48, 'L &lt; 12 m:  AT = L × (12 + W)', 'dg-t--mono');
  s += dgText(36, fy + 66, '12 ≤ L &lt; 18:  AT = L × (14 + W)     18 ≤ L &lt; 24:  AT = L × (17 + W)', 'dg-t--mono');
  s += dgText(36, fy + 84, 'L ≥ 24 m:  AT = L × (30 + W)          Practical critical area:  Ap = 0.667 × AT', 'dg-t--mono');

  return dgSvg(W, H, 'Plan view of an aircraft within the theoretical and practical critical areas, showing 24 metres upwind and 6 metres downwind.', s);
}

/* =========================================================================
   4. JET BLAST AND INTAKE KEEP-OUT
   Doc 9137 Part 1 §12.2.11 and §12.2.12: stay at least 10 m from the front
   and side intake of a turbine engine to avoid being ingested, and remain up
   to 500 m from the rear depending on aircraft size.
   ========================================================================= */
function dJetBlast() {
  const W = 680, H = 400;
  let s = '';

  s += dgText(20, 22, 'Turbine engine — danger zones', 'dg-t--title');

  const cy = 168;
  const nose = 62, tail = 400;

  // Rear blast hazard.
  s += `<path d="M${tail},${cy - 40} L${W - 20},${cy - 116} L${W - 20},${cy + 116} L${tail},${cy + 40} Z" class="dg-hazard"/>`;
  s += dgText(W - 34, cy - 62, 'up to 500 m', 'dg-t--danger', 'end');
  s += dgText(W - 34, cy - 46, 'JET BLAST', 'dg-t--danger', 'end');
  s += dgText(W - 34, cy - 30, '— scale with aircraft size', 'dg-t--danger', 'end');

  // Fuselage and nacelle.
  s += `<path d="M${nose},${cy} Q${nose + 46},${cy - 26} ${nose + 96},${cy - 26} L${tail},${cy - 26} ` +
       `Q${tail + 34},${cy - 12} ${tail + 34},${cy} Q${tail + 34},${cy + 12} ${tail},${cy + 26} ` +
       `L${nose + 96},${cy + 26} Q${nose + 46},${cy + 26} ${nose},${cy} Z" class="dg-tyre"/>`;
  s += `<path d="M${nose + 74},${cy - 44} L${nose + 132},${cy - 44} L${nose + 120},${cy - 26} L${nose + 86},${cy - 26} Z" class="dg-solid"/>`;
  s += dgText(nose + 103, cy - 36, 'INTAKE', 'dg-t--ink', 'middle');

  // Intake keep-out — a 10 m radius around the front intake.
  s += `<circle cx="${nose + 103}" cy="${cy - 35}" r="58" class="dg-keepout"/>`;
  s += dgText(nose + 103, cy - 108, '10 m minimum — §12.2.11', 'dg-t--danger', 'middle');
  s += dgText(nose + 103, cy - 92, 'front &amp; side intake', 'dg-t--danger', 'middle');

  // Dimension bar for the 500 m.
  s += dgAxis(tail + 40, cy + 150, W - 24, cy + 150);
  s += `<line x1="${tail + 40}" y1="${cy + 140}" x2="${tail + 40}" y2="${cy + 160}" class="dg-dimline"/>`;
  s += `<line x1="${W - 24}" y1="${cy + 140}" x2="${W - 24}" y2="${cy + 160}" class="dg-dimline"/>`;
  s += dgText((tail + 40 + W - 24) / 2, cy + 170, '500 m — §12.2.12', 'dg-t--danger', 'middle');

  // Forward clearance dimension.
  s += dgAxis(nose + 103, cy - 58, nose + 103, cy - 116);

  s += dgText(20, H - 40, 'Never stand behind an operating engine, and never cross the intake plane.', 'dg-t--warn');
  s += dgText(20, H - 22, 'Distances are for an aircraft at rest or running; treat a live engine as a hard exclusion zone.', 'dg-t--dim');

  return dgSvg(W, H, 'Side view of a turbine-engined aircraft showing the 10 metre intake keep-out and the jet blast hazard extending up to 500 metres aft.', s);
}

/* =========================================================================
   5. VEHICLE POSITIONING AT A CRASH SITE
   Doc 9137 Part 1 §12.3: position uphill and upwind; protect occupant egress;
   do not block emergency vehicle entry or exit; leave the ability to
   reposition for reflash. First-arriving crews often set the route for
   everyone behind them.
   ========================================================================= */
function dVehiclePositioning() {
  const W = 680, H = 522;
  let s = '';

  s += dgText(20, 22, 'Positioning apparatus at the scene', 'dg-t--title');

  // Ground and slope.
  s += `<path d="M20,404 L300,352 L660,368 L660,420 L20,420 Z" class="dg-ground"/>`;
  for (let i = 0; i < 5; i++) {
    s += dgArrow(74 + i * 34, 400 - i * 1.5, 74 + i * 34, 388 - i * 1.5, 'dg-dim', 1.4);
  }
  s += dgChip(26, 432, 150, 28, 'SLOPE — GO UPHILL', 'dg-chip--ok');

  // Fire and fuel pool.
  s += `<ellipse cx="330" cy="368" rx="132" ry="26" class="dg-hazard"/>`;
  s += dgText(330, 372, 'fuel pool / vapour — collects low and downwind', 'dg-t--danger', 'middle');
  s += `<path d="M300,352 q12,-30 24,0 q10,-34 22,0 q12,-26 22,0 q10,-30 20,0" class="dg-flame"/>`;

  // Wind.
  s += dgArrow(38, 214, 214, 214, 'dg-accent', 2.8);
  s += dgText(38, 200, 'wind', 'dg-t--accent');
  s += dgChip(30, 148, 122, 28, 'STAY UPWIND', 'dg-chip--ok');

  // The aircraft.
  s += `<rect x="392" y="288" width="238" height="52" rx="26" class="dg-tyre"/>`;
  s += `<path d="M392,314 l-22,-14 l0,28 z" class="dg-solid"/>`;
  s += dgText(511, 278, 'AIRCRAFT', 'dg-t--dim', 'middle');

  // Egress arrows — away from the fire, and what must be protected.
  s += dgArrow(452, 292, 452, 214, 'dg-good', 2.6);
  s += dgArrow(540, 292, 540, 214, 'dg-good', 2.6);
  s += dgChip(410, 176, 172, 28, 'PROTECT THIS EGRESS', 'dg-chip--ok');

  // RFF vehicle, upwind and uphill, turret covering the fuselage side.
  s += `<g transform="translate(150,236)">` +
       `<rect x="-62" y="-34" width="124" height="68" rx="10" class="dg-vehicle"/>` +
       `<rect x="-46" y="-16" width="52" height="34" rx="6" class="dg-solid"/>` +
       `<circle cx="-16" cy="4" r="13" class="dg-solid"/>` +
       dgArrow(6, -12, 96, -46, 'dg-accent', 2.2) +
       `<path d="M6,-12 A100,100 0 0 1 78,58 L6,4 Z" class="dg-turret"/>` +
       `<circle cx="-40" cy="34" r="12" class="dg-wheel"/><circle cx="34" cy="34" r="12" class="dg-wheel"/>` +
       `<circle cx="-40" cy="-34" r="12" class="dg-wheel"/><circle cx="34" cy="-34" r="12" class="dg-wheel"/>` +
       `</g>`;
  s += dgChip(72, 306, 160, 28, 'TURRET COVERS THE SIDE', 'dg-chip--ok');

  // Repositioning arrow — must be able to get away for a reflash.
  s += dgArrow(96, 210, 34, 168, 'dg-dim');
  s += dgText(96, 200, 'leave a way out', 'dg-t--dim');
  s += dgText(96, 216, 'for a reflash', 'dg-t--dim');

  // Do-not list.
  s += `<rect x="20" y="460" width="640" height="46" rx="13" class="dg-panel"/>`;
  s += dgText(32, 476, 'Do not drive through smoke · do not drive over wreckage · do not block emergency vehicle', 'dg-t--warn');
  s += dgText(32, 494, 'entry or exit. Every one of those is a second vehicle arriving to the same fire.', 'dg-t--warn');

  return dgSvg(W, H, 'Plan view of a crash site showing an RFF vehicle positioned uphill and upwind with its turret covering the fuselage while protecting the egress route.', s);
}

/* =========================================================================
   6. WATER QUANTITY
   Doc 9137 Part 1 §2.4.7–2.4.9: Q = Q1 + Q2, where Q1 = A × R × T controls the
   fire in the practical critical area and Q2 sustains control and finishes the
   job. Q2 cannot be calculated exactly and is read from the graph.
   ========================================================================= */
function dWaterQuantity() {
  const W = 680, H = 470;
  let s = '';

  s += dgText(20, 22, 'Working out the water you need', 'dg-t--title');

  const box = (x, y, w, h, title, lines, tone) => {
    let b = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" class="dg-panel"/>`;
    b += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" class="dg-panel__edge dg-panel__edge--${tone || 'accent'}"/>`;
    b += dgText(x + w / 2, y + 26, title, 'dg-t--head', 'middle');
    b += lines;
    return b;
  };

  // Step 1 — the area.
  s += box(20, 46, 200, 132, '1 · The area',
    dgText(30, 66, 'Ap = 0.667 × AT', 'dg-t--mono') +
    dgText(30, 90, 'Ap — practical critical area (m²)', 'dg-t--dim') +
    dgText(30, 112, 'AT — theoretical, from', 'dg-t--dim') +
    dgText(30, 126, 'aircraft L and W', 'dg-t--dim') +
    dgText(30, 150, 'See the critical area diagram', 'dg-t--dim'), 'accent');

  // Step 2 — the rate and time.
  s += box(240, 46, 200, 132, '2 · Rate × time',
    dgText(250, 66, 'Q1 = A × R × T', 'dg-t--mono') +
    dgText(250, 90, 'R — rate of application (L/min/m²)', 'dg-t--dim') +
    dgText(250, 110, 'T — time of application (min)', 'dg-t--dim') +
    dgText(250, 136, 'Both come from Annex 14', 'dg-t--dim'), 'accent');

  // Step 3 — the sustainment term.
  s += box(460, 46, 200, 132, '3 · Then sustain',
    dgText(470, 66, 'Q = Q1 + Q2', 'dg-t--mono') +
    dgText(470, 90, 'Q2 — hold control,', 'dg-t--dim') +
    dgText(470, 104, 'then extinguish', 'dg-t--dim') +
    dgText(470, 126, 'Not calculated — read', 'dg-t--dim') +
    dgText(470, 140, 'from the Annex 14 graph', 'dg-t--dim') +
    dgText(470, 160, '≈0% at cat 1 →', 'dg-t--warn') +
    dgText(470, 174, '≈190% at cat 10', 'dg-t--warn'), 'warn');

  // Connectors.
  s += dgArrow(224, 112, 236, 112, 'dg-accent');
  s += dgArrow(444, 112, 456, 112, 'dg-accent');

  // Worked example, clearly marked as an illustration of the method.
  s += `<rect x="20" y="204" width="640" height="152" rx="14" class="dg-panel"/>`;
  s += dgText(36, 230, 'Worked example — the method, not an authority', 'dg-t--head');
  s += dgText(36, 254, 'Twin-jet narrow body:  L = 37.6 m   W = 3.9 m', 'dg-t--mono');
  s += dgText(36, 274, 'AT = 37.6 × (30 + 3.9) = 1275 m²', 'dg-t--mono');
  s += dgText(36, 294, 'Ap = 0.667 × 1275 = 850 m²', 'dg-t--mono');
  s += dgText(36, 314, 'Q1 = 850 × R × 1 min', 'dg-t--mono');
  s += dgText(36, 340, 'Add Q2 from the current Annex 14 graph for your category before you commit to a figure.', 'dg-t--warn');

  // The trap.
  s += `<rect x="20" y="378" width="640" height="70" rx="14" class="dg-panel dg-panel--warn"/>`;
  s += `<rect x="20" y="378" width="640" height="70" rx="14" class="dg-panel__edge dg-panel__edge--warn"/>`;
  s += dgText(36, 404, 'The trap', 'dg-t--head');
  s += dgText(36, 426, 'Q1 alone is not your water requirement. Calculating only the control term is the single', 'dg-t--warn');
  s += dgText(36, 444, 'most common way an RFF service ends up short. Always state the total, Q1 + Q2.', 'dg-t--warn');

  return dgSvg(W, H, 'Flow diagram showing total water equals Q1 plus Q2, with Q1 calculated as area times rate times time, and a worked example.', s);
}

/* =========================================================================
   LEVEL DETERMINATION
   The category matrix as a lookup, with the worked reading that trips
   people up: the critical aircraft sets the category, and the width band
   is discrete.
   ========================================================================= */

function dLevelDetermination() {
  const W = 680, H = 500;
  const vw = W;
  let s = '';

  s += dgText(20, 22, 'Category determination — the lookup', 'dg-t--title');
  s += dgText(20, 42, 'Find the row for overall length, then the column for maximum fuselage width. The cell is the category.', 'dg-t--dim');

  // Matrix geometry: 7 width columns, 6 length rows.
  const gx = 168, gy = 108;
  const cw = 62, ch = 34;
  const widths  = ['up to 2', '2–3', '3–4', '4–5', '5–6', '6–7', 'over 7'];
  const lengths = ['under 9 m', '9 – 12 m', '12 – 18 m', '18 – 24 m', '24 – 39 m', 'over 39 m'];

  // Category matrix. Values are the Doc 9137 Table 2-1 / Annex 14 Table 9-1
  // intersections, read as bands. Each cell is the aerodrome category that
  // applies to an aircraft in that length and width band.
  const cats = [
    ['1',  '1',  '2',  '2',  '2',  '3',  '3'],
    ['2',  '2',  '3',  '3',  '3',  '4',  '4'],
    ['3',  '3',  '4',  '4',  '5',  '5',  '6'],
    ['4',  '4',  '5',  '5',  '6',  '6',  '7'],
    ['5',  '5',  '6',  '6',  '7',  '7',  '8'],
    ['6',  '6',  '7',  '8',  '8',  '9',  '9']
  ];

  // Column headers — the width bands, wrapped.
  widths.forEach((w, i) => {
    const cx = gx + i * cw + cw / 2;
    s += dgText(cx, gy - 10, w.replace('–', '–'), 'dg-t--dim', 'middle');
  });
  s += dgText(gx + (widths.length * cw) / 2, gy - 30, 'MAXIMUM FUSELAGE WIDTH (m)', 'dg-t--head', 'middle');

  // Row headers — the length bands.
  lengths.forEach((l, r) => {
    const ry = gy + r * ch + ch / 2;
    s += dgText(gx - 12, ry, l, 'dg-t--dim', 'end');
  });
  s += dgText(20, gy + (lengths.length * ch) / 2, 'OVERALL LENGTH', 'dg-t--head');

  // Cells.
  cats.forEach((row, r) => {
    row.forEach((v, i) => {
      const x = gx + i * cw, y = gy + r * ch;
      s += `<rect x="${x + 1}" y="${y + 1}" width="${cw - 2}" height="${ch - 2}" rx="4" class="dg-cell"/>`;
      s += dgText(x + cw / 2, y + ch / 2, v, 'dg-t--ink', 'middle');
    });
  });

  // The step-function callout: the 6-7 and over-7 boundary is where the
  // misreads happen, so show it as a hard edge.
  const stepX = gx + 6 * cw;
  s += `<line x1="${stepX}" y1="${gy - 22}" x2="${stepX}" y2="${gy + lengths.length * ch + 6}" class="dg-dimline"/>`;
  /* Right-anchored: at this size a start-anchored run at stepX + 8 runs off
     the canvas, and it also collides with the column header above it. */
  s += dgText(20, 58, '6-7 m vs over 7 m —', 'dg-t--accent');
  s += dgText(20, 74, 'one step, big consequence', 'dg-t--accent');

  // Worked reading, marked as the method and not an authority for any
  // particular aerodrome.
  const wy = gy + lengths.length * ch + 30;
  s += `<rect x="20" y="${wy}" width="640" height="128" rx="14" class="dg-panel"/>`;
  s += dgText(36, wy + 24, 'Worked reading', 'dg-t--head');
  s += dgText(36, wy + 48, 'Aircraft: overall length 63.7 m, maximum fuselage width 6.2 m', 'dg-t--mono');
  s += dgText(36, wy + 68, 'Row: over 39 m.  Column: 6–7 m.  Intersection: category 9.', 'dg-t--mono');
  s += dgText(36, wy + 90, 'One aircraft sets the category for the aerodrome. The rest of the', 'dg-t--warn');
  s += dgText(36, wy + 108, 'schedule does not average into it — §2.1.2.', 'dg-t--warn');

  return dgSvg(W, H, 'Category determination matrix crossing overall aircraft length against maximum fuselage width, with a worked example reading of category 9.', s);
}

/* =========================================================================
   8. FUELLING STAND — PROHIBITED AND REQUIRED POSITIONS
   Doc 9137 Part 1 §15.2: the fuelling vehicle is positioned so RFF access is
   not interrupted, a cleared path is kept for rapid removal, and evacuation
   from occupied portions is not obstructed; engines are not under the wing;
   other servicing vehicles are not driven or parked under wings; open flames
   are prohibited within 15 m. That is a plan-view geometry problem, so it is
   drawn here rather than described in prose.
   The 15 m is quoted from §15.2(e). The circle is drawn to make it legible
   on a 680-unit-wide canvas and is NOT to scale.
   ========================================================================= */
function dFuellingStand() {
  const W = 680, H = 684;

  /* A numbered badge, so the drawing stays uncluttered and the wording lives
     in one legend instead of in leader lines across the artwork. */
  const badge = (x, y, n) =>
    `<circle cx="${x}" cy="${y}" r="12" class="dg-chip"/>` +
    dgText(x, y + 0.5, String(n), 'dg-t--chip', 'middle');

  let s = '';
  s += dgText(20, 22, 'Fuelling stand — prohibited and required positions', 'dg-t--title');
  s += dgText(20, 42, 'Doc 9137 Part 1 §15.2. Plan view, nose to the right. Not to scale.', 'dg-t--dim');

  // Apron.
  s += `<rect x="20" y="58" width="640" height="396" rx="10" class="dg-ground"/>`;

  // Under-wing keep-out, drawn under the wing so the shape still reads.
  s += `<rect x="290" y="78" width="108" height="148" rx="10" class="dg-keepout"/>`;
  s += `<rect x="290" y="270" width="108" height="148" rx="10" class="dg-keepout"/>`;

  // The 15 m exclusion circle, centred on the fuelling operation. Reaches the
  // aft fuselage on purpose: the zone is bigger than most people picture.
  s += `<circle cx="176" cy="160" r="94" class="dg-keepout"/>`;
  s += dgText(176, 78, '15 m', 'dg-t--danger', 'middle');

  // Aircraft.
  s += `<rect x="248" y="220" width="206" height="56" rx="28" class="dg-solid"/>`;
  s += `<path d="M454,248 l24,-13 l0,26 z" class="dg-solid"/>`;
  s += `<path d="M262,224 L226,178 L250,178 L268,224 Z" class="dg-solid"/>`;
  s += `<path d="M262,272 L226,318 L250,318 L268,272 Z" class="dg-solid"/>`;
  s += `<path d="M352,220 L300,86 L338,86 L324,220 Z" class="dg-solid"/>`;
  s += `<path d="M352,276 L300,410 L338,410 L324,276 Z" class="dg-solid"/>`;

  // Engines, crossed out.
  s += `<rect x="356" y="132" width="60" height="22" rx="11" class="dg-tyre"/>`;
  s += `<rect x="356" y="342" width="60" height="22" rx="11" class="dg-tyre"/>`;
  s += `<path d="M359,134 L413,152 M413,134 L359,152" class="dg-bad" stroke-width="2.8" fill="none"/>`;
  s += `<path d="M359,344 L413,362 M413,344 L359,362" class="dg-bad" stroke-width="2.8" fill="none"/>`;

  // Main gear — the undercarriage §15.2(h) is about.
  s += `<rect x="314" y="276" width="12" height="16" rx="4" class="dg-tyre"/>`;

  // Fuelling vehicle, inside the zone.
  s += `<rect x="128" y="136" width="92" height="48" rx="7" class="dg-vehicle"/>`;
  s += dgText(174, 128, 'FUELLING VEHICLE', 'dg-t--head', 'middle');

  // Cleared path for rapid removal, leaving the zone.
  s += dgArrow(78, 160, 126, 160, 'dg-good', 2.8);
  s += badge(58, 160, 1);

  // RFF access — not interrupted.
  s += dgText(504, 84, 'RFF ACCESS', 'dg-t--accent');
  s += badge(486, 106, 2);
  s += dgArrow(504, 106, 656, 106, 'dg-accent', 3);

  // Egress from occupied portions, not obstructed.
  s += dgArrow(404, 224, 470, 200, 'dg-good', 2.6);
  s += dgArrow(404, 276, 470, 300, 'dg-good', 2.6);
  s += badge(486, 250, 3);
  s += dgText(506, 254, 'EGRESS', 'dg-t--good');

  // Badges for the zone, the wing and the undercarriage.
  s += badge(110, 226, 5);
  s += badge(280, 394, 4);
  s += badge(348, 292, 6);

  // Leader for the aircraft label.
  s += dgAxis(496, 206, 458, 238);
  s += dgText(502, 202, 'AIRCRAFT', 'dg-t--dim');

  // Legend. The wording is the standard's, cited per row.
  const ly = 468;
  s += `<rect x="20" y="${ly}" width="640" height="196" rx="14" class="dg-panel"/>`;
  const rows = [
    ['1', '§15.2(c)2 — a cleared path is maintained to permit rapid removal of the fuelling vehicle from the aircraft in an emergency'],
    ['2', '§15.2(c)1 — the fuelling vehicle is positioned so that accessibility to the aircraft by RFF vehicles is not interrupted'],
    ['3', '§15.2(c)3 — it does not obstruct evacuation from occupied portions of the aircraft in the event of a fire'],
    ['4', '§15.2(c)4 — vehicle engines are not under the wing.  §15.2(d) — other servicing vehicles are not driven or parked under wings'],
    ['5', '§15.2(e), (f) — no open flame or lighted open flame device within 15 m; lighters and matches not carried or used'],
    ['6', '§15.2(h) — abnormally heated undercarriage: the RFF service is called and fuelling does not take place until the heat dissipates']
  ];
  rows.forEach((r, i) => {
    const y = ly + 26 + i * 30;
    s += `<circle cx="42" cy="${y - 4}" r="10" class="dg-chip"/>`;
    s += dgText(42, y - 3.5, r[0], 'dg-t--chip', 'middle');
    s += dgPara(62, y - 6, r[1], 'dg-t--dim', 94, 13);
  });

  return dgSvg(W, H, 'Plan view of an aircraft stand during fuelling, showing the 15 metre no-open-flame zone centred on the fuelling vehicle, the under-wing keep-out with engines crossed out, the cleared path for rapid removal, the unobstructed RFF access route and the egress arrows from occupied portions of the aircraft.', s);
}

/* =========================================================================
   9. CASUALTY FLOW — COLLECTION TO TRANSPORTATION
   Doc 9137 Part 7 §9.5.1: the injured should pass through four areas which
   should be carefully located and easily identified — collection, triage,
   care and transportation. The triage area "should be located at least 90 m
   upwind of the accident site to avoid possible exposure to fire and smoke".
   §9.2.5 adds the two other placement rules: shortest distance possible, and
   "well away from fire fighting operations, and upwind and uphill".
   The 90 m is quoted. The drawn distances are schematic and not to scale.
   ========================================================================= */
function dCasualtyFlow() {
  const W = 680, H = 674;

  const badge = (x, y, n) =>
    `<circle cx="${x}" cy="${y}" r="12" class="dg-chip"/>` +
    dgText(x, y + 0.5, String(n), 'dg-t--chip', 'middle');

  let s = '';
  s += dgText(20, 22, 'Casualty flow — collection to transport', 'dg-t--title');
  s += dgText(20, 42, 'Doc 9137 Part 7 §9.5.1 and §9.2.5. Plan view. Distances schematic — not to scale.', 'dg-t--dim');

  s += `<rect x="20" y="58" width="640" height="400" rx="10" class="dg-ground"/>`;

  // Wind sets the upwind direction; uphill is the other axis.
  s += dgArrow(38, 96, 176, 96, 'dg-accent', 2.8);
  s += dgText(38, 82, 'WIND', 'dg-t--accent');
  s += dgText(186, 100, 'upwind \u2192', 'dg-t--dim');
  s += dgArrow(56, 430, 56, 330, 'dg-dim', 2.4);
  s += dgText(64, 336, 'UPHILL', 'dg-t--dim');

  // The accident site: downwind and downhill of everything else.
  s += `<ellipse cx="146" cy="404" rx="66" ry="26" class="dg-hazard"/>`;
  s += `<rect x="112" y="372" width="76" height="16" rx="8" class="dg-solid"/>`;
  s += `<path d="M132,372 q6,-20 12,0 q6,-24 12,0 q6,-18 12,0 q6,-22 12,0" class="dg-flame"/>`;
  s += dgText(146, 442, 'ACCIDENT SITE', 'dg-t--danger', 'middle');

  // 1. Collection — at the debris.
  s += `<rect x="112" y="300" width="122" height="46" rx="9" class="dg-cell"/>`;
  s += badge(126, 314, 1);
  s += dgText(146, 326, 'COLLECTION', 'dg-t--chip', 'middle');

  // 2. Triage — at least 90 m upwind, and uphill.
  s += dgAxis(214, 300, 268, 300);
  s += dgText(241, 292, '\u2265 90 m', 'dg-t--accent', 'middle');
  s += `<rect x="268" y="236" width="128" height="52" rx="9" class="dg-cell"/>`;
  s += badge(282, 250, 2);
  s += dgText(306, 264, 'TRIAGE', 'dg-t--chip', 'middle');

  // 3. Care area, subdivided by priority. Colours are §9.5.1(c) and match §9.3.2 tags.
  s += dgArrow(398, 260, 428, 258, 'dg-good', 2.4);
  s += `<rect x="428" y="176" width="118" height="40" rx="8" class="dg-tag-red"/>`;
  s += dgText(437, 200, 'I  IMMEDIATE', 'dg-t--chip');
  s += `<rect x="428" y="220" width="118" height="40" rx="8" class="dg-tag-yellow"/>`;
  s += dgText(437, 244, 'II  DELAYED', 'dg-t--chip');
  s += `<rect x="428" y="264" width="118" height="40" rx="8" class="dg-tag-green"/>`;
  s += dgText(437, 288, 'III  MINOR', 'dg-t--chip');
  s += badge(414, 240, 3);

  // 4. Transportation — between the care area and the egress road.
  s += dgArrow(548, 240, 578, 240, 'dg-good', 2.4);
  s += `<rect x="578" y="216" width="70" height="48" rx="9" class="dg-cell"/>`;
  s += dgText(613, 244, 'TRANSPORT', 'dg-t--chip', 'middle');
  s += badge(566, 240, 4);
  s += `<line x1="654" y1="196" x2="654" y2="286" class="dg-dimline" stroke-width="2.4"/>`;
  s += dgText(646, 186, 'EGRESS ROAD', 'dg-t--dim', 'end');

  // Legend.
  const ly = 470;
  s += `<rect x="20" y="${ly}" width="640" height="184" rx="14" class="dg-panel"/>`;
  const rows = [
    ['1', 'Collection area \u2014 initial collection of the seriously injured from the debris. Custody transfers from RFF personnel to medical services here, though usually at the triage area. §9.5.1(a)'],
    ['2', 'Triage area \u2014 at least 90 m upwind of the accident site to avoid exposure to fire and smoke. More than one may be established. §9.5.1(b)'],
    ['3', 'Care area \u2014 one area subdivided into Immediate (I), Delayed (II) and Minor (III). Colour coded red, yellow, green; cones or flags may be used. §9.5.1(c)'],
    ['4', 'Transportation area \u2014 recording, dispatching and evacuation, sited between the care area and the egress road. §9.5.1(d)'],
    ['\u2191', 'Where movement is unavoidable: shortest distance possible, well away from firefighting operations, and upwind and uphill. §9.2.5']
  ];
  rows.forEach((r, i) => {
    const y = ly + 24 + i * 34;
    s += `<circle cx="42" cy="${y - 4}" r="10" class="dg-chip"/>`;
    s += dgText(42, y - 3.5, r[0], 'dg-t--chip', 'middle');
    s += dgPara(62, y - 6, r[1], 'dg-t--dim', 94, 13);
  });

  return dgSvg(W, H, 'Plan view of casualty flow from an aircraft accident site through four areas — collection, triage at least 90 metres upwind, a care area subdivided into three priority sub-areas, and a transportation area beside the egress road — with the wind and uphill directions marked.', s);
}

/* ============================================================================
   10. DOCUMENT HIERARCHY — WHICH DOCUMENT WINS
   Doc 9137 Part 1 Chapter 1 and Annex 14 Volume I. The relationship between
   an ICAO standard, an ICAO guidance manual, a State regulation and an
   operator SOP is a hierarchy, and hierarchies are geometry. Drawn as a
   stack because that is exactly how it behaves on a conflict.
   ========================================================================= */
function dDocumentHierarchy() {
  const W = 680, H = 470;

  const tier = (y, h, cls, title, sub, cite) => {
    let s = '';
    s += `<rect x="120" y="${y}" width="440" height="${h}" rx="10" class="${cls}"/>`;
    s += dgText(340, y + h / 2 - 8, title, 'dg-t--head', 'middle');
    s += dgText(340, y + h / 2 + 12, sub, 'dg-t--dim', 'middle');
    if (cite) s += dgText(340, y + h + 15, cite, 'dg-t--dim', 'middle');
    return s;
  };

  let s = '';
  s += dgText(20, 22, 'Which document wins', 'dg-t--title');
  s += dgText(20, 42, 'On a conflict, resolve downward. A lower tier can be more demanding — never less.', 'dg-t--dim');

  // Tier 1 — the standard.
  s += tier(62, 54, 'dg-theory', 'ICAO STANDARD', 'Annex 14 Volume I — Aerodromes', 'NORMATIVE. Adopted by States.');
  // Tier 2 — the manual.
  s += tier(146, 54, 'dg-cell', 'ICAO GUIDANCE', 'Doc 9137 Part 1 — Airport Services Manual', 'Explains the standard. Not law.');
  // Tier 3 — the State.
  s += tier(230, 54, 'dg-hazard', 'STATE REGULATION', 'SACAA / CAAB adopted requirements', 'BINDING on you. This is what you comply with.');
  // Tier 4 — the SOP.
  s += tier(314, 54, 'dg-cell', 'OPERATOR SOP', 'Your service procedure', 'BINDING on your crews. Must meet or exceed above.');

  // The rule that makes it a hierarchy.
  s += dgArrow(596, 116, 596, 116, 'dg-dim', 1);
  s += `<line x1="600" y1="118" x2="600" y2="360" class="dg-accent" stroke-width="2.6"/>`;
  s += dgArrow(600, 356, 600, 372, 'dg-accent', 2.6);
  s += dgText(612, 200, 'resolve', 'dg-t--accent');
  s += dgText(612, 216, 'downward', 'dg-t--accent');

  // The two traps.
  s += `<rect x="20" y="388" width="310" height="66" rx="10" class="dg-panel"/>`;
  s += dgText(34, 408, 'A more detailed lower tier', 'dg-t--warn');
  s += dgText(34, 425, 'may add requirements. It can never', 'dg-t--dim');
  s += dgText(34, 439, 'reduce one above it.', 'dg-t--dim');

  s += `<rect x="350" y="388" width="310" height="66" rx="10" class="dg-panel"/>`;
  s += dgText(364, 408, 'Guidance is not optional', 'dg-t--warn');
  s += dgText(364, 425, 'where it explains how to meet a', 'dg-t--dim');
  s += dgText(364, 439, 'standard — and you depart from it,', 'dg-t--dim');
  s += dgText(364, 452, 'you need a reason on the day.', 'dg-t--dim');

  return dgSvg(W, H, 'A four tier stack showing the relationship between ICAO Annex 14 as a standard, Doc 9137 as guidance, State adopted regulations and operator standard operating procedures, with conflicts resolved downward.', s);
}

/* ============================================================================
   11. ALERT CHAIN — WHO TELLS WHOM
   Annex 14 §9.2.39 and §9.2.40 require a discrete communication system linking
   the tower to the fire station and an alerting system for personnel.
   §9.2.37 and §9.2.38 cover the fire station itself. The chain from the
   initial report to a rolling appliance is the thing that has to work in
   ninety seconds, so it is drawn as a chain with its timings.
   ========================================================================= */
function dAlertChain() {
  const W = 680, H = 458;

  const node = (x, y, w, h, label, sub, cls) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" class="${cls || 'dg-cell'}"/>` +
    dgText(x + w / 2, y + h / 2 - (sub ? 9 : 0), label, 'dg-t--chip', 'middle') +
    (sub ? dgText(x + w / 2, y + h / 2 + 11, sub, 'dg-t--dim', 'middle') : '');

  let s = '';
  s += dgText(20, 22, 'The alert chain', 'dg-t--title');
  s += dgText(20, 42, 'Annex 14 §9.2.39 communication system · §9.2.40 alerting system. The clock starts at the initial call.', 'dg-t--dim');

  s += node(20, 78, 118, 54, 'Aircraft', 'initial report', 'dg-hazard');
  s += dgArrow(142, 105, 178, 105, 'dg-accent', 2.6);

  s += node(182, 78, 126, 54, 'ATC / tower', 'raises the alarm');
  s += dgArrow(312, 105, 348, 105, 'dg-accent', 2.6);

  s += node(352, 78, 126, 54, 'Fire station', 'crew mustered');
  s += dgArrow(482, 105, 518, 105, 'dg-good', 2.8);

  s += node(522, 78, 138, 54, 'Appliance rolling', 'response clock', 'dg-theory');

  // The measurable objective underneath.
  s += `<rect x="182" y="164" width="296" height="52" rx="10" class="dg-panel"/>`;
  s += dgText(330, 184, 'Response time objective', 'dg-t--head', 'middle');
  s += dgText(330, 204, '2 min target · 3 min ceiling · in position to apply foam at 50% of the Table 2-3 rate', 'dg-t--warn', 'middle');

  // What the chain depends on.
  s += dgText(20, 250, 'What the chain depends on', 'dg-t--head');
  const deps = [
    ['Discrete system', 'Tower to station to vehicle — Annex 14 §9.2.39. Not a personal mobile phone.'],
    ['Alerting system', 'Operable from station, other stations and the tower — §9.2.40.'],
    ['Correct location', 'The aircraft position. A good chain to the wrong place is no chain.'],
    ['Grid map', 'Carried on the vehicle. Where the water is, the gates, the hazards.'],
    ['Access route', 'Open, and passable by your largest vehicle in the conditions.'],
    ['Rehearsed', 'The chain is exercised, not assumed. A live test is the only test.']
  ];
  deps.forEach((d, i) => {
    const x = 20 + (i % 2) * 330;
    const y = 262 + Math.floor(i / 2) * 62;
    s += `<rect x="${x}" y="${y}" width="310" height="54" rx="8" class="dg-cell"/>`;
    s += dgText(x + 12, y + 16, d[0], 'dg-t--chip');
    s += dgPara(x + 12, y + 33, d[1], 'dg-t--dim', 44, 13);
  });

  return dgSvg(W, H, 'A left to right chain from aircraft initial report through air traffic control, the fire station and the responding appliance, with the two minute response time objective shown beneath and the six dependencies of the chain listed.', s);
}

/* ============================================================================
   12. HAZARD PLACARD — THE DIAMOND GEOMETRY
   ICAO Doc 9137 Part 1 Chapter 12 and Annex 18. A placard is not a label
   you read, it is a fixed geometry: a red diamond, a class number in the
   bottom half and a subsidiary risk in the lower corner. Drawn at true
   proportions because the shape is half of what it means.
   ========================================================================= */
function dDgPlacard() {
  const W = 680, H = 470;

  let s = '';
  s += dgText(20, 22, 'The hazard placard — reading the geometry', 'dg-t--title');
  s += dgText(20, 42, 'A red diamond, a class number, and a subsidiary risk where there is more than one.', 'dg-t--dim');

  // The diamond, drawn square on a point so proportions are honest.
  const cx = 196, cy = 176, h = 118, w = 118;
  const half = w / 2;
  s += `<path d="M${cx},${cy - h} L${cx + half},${cy} L${cx},${cy + h} L${cx - half},${cy} Z" class="dg-hazard"/>`;
  s += `<path d="M${cx},${cy - h} L${cx + half},${cy} L${cx},${cy + h} L${cx - half},${cy} Z" class="dg-bad" stroke-width="2"/>`;
  // Class number in the bottom half.
  s += dgText(cx, cy + 56, '3', 'dg-t--title', 'middle');
  // Subsidiary risk, lower corner.
  s += dgText(cx + 30, cy + 34, '6', 'dg-t--title', 'middle');
  s += dgAxis(cx, cy, cx, cy + h - 4);
  s += dgAxis(cx - half, cy, cx + half, cy);

  // Annotation to the diamond.
  s += dgArrow(268, 122, 322, 108, 'dg-dim', 2);
  s += dgText(328, 104, 'Red diamond', 'dg-t--head');
  s += dgText(328, 120, 'Square on a point. The shape', 'dg-t--dim');
  s += dgText(328, 134, 'is a recognition cue before', 'dg-t--dim');
  s += dgText(328, 148, 'the number is read.', 'dg-t--dim');

  s += dgArrow(224, 232, 300, 262, 'dg-dim', 2);
  s += dgText(306, 266, 'Class number', 'dg-t--head');
  s += dgText(306, 282, 'Bottom half. 3 = flammable', 'dg-t--dim');
  s += dgText(306, 296, 'liquid. The number is', 'dg-t--dim');
  s += dgText(306, 310, 'the hazard class.', 'dg-t--dim');

  s += dgArrow(226, 210, 336, 348, 'dg-dim', 2);
  s += dgText(342, 352, 'Subsidiary risk', 'dg-t--head');
  s += dgText(342, 368, 'Lower corner. 6 = toxic.', 'dg-t--dim');
  s += dgText(342, 382, 'Shown only where a second', 'dg-t--dim');
  s += dgText(342, 396, 'hazard applies. Read it', 'dg-t--dim');
  s += dgText(342, 410, 'before the class number.', 'dg-t--dim');

  // The reading order.
  s += `<rect x="20" y="330" width="150" height="112" rx="10" class="dg-panel"/>`;
  s += dgText(95, 352, 'Read in order', 'dg-t--head', 'middle');
  const order = ['Shape', 'Subsidiary', 'Class'];
  order.forEach((o, i) => {
    s += `<circle cx="42" cy="${374 + i * 20}" r="8" class="dg-chip"/>`;
    s += dgText(42, 374 + i * 20 + 0.5, String(i + 1), 'dg-t--chip', 'middle');
    s += dgText(58, 378 + i * 20, o, 'dg-t--dim');
  });

  return dgSvg(W, H, 'A hazard placard diamond drawn at true proportions showing the red diamond shape, the class number 3 for flammable liquids in the bottom half, and a subsidiary risk 6 for toxic in the lower corner, with the three step reading order alongside.', s);
}

/* ============================================================================
   13. BONDING AND EARTHING — WHAT THE CIRCUIT IS
   Doc 9137 Part 1 §15.2(b) requires bonding and/or grounding in accordance
   with §15.4, which is not reproduced in Part 1. That gap is why this figure
   carries a caption saying it shows the arrangement the clause requires and
   not the procedure, which must come from the fuel supplier and NFPA 407.
   Drawn as a circuit so the two things being joined are unambiguous.
   ========================================================================= */
function dBondingCircuit() {
  const W = 680, H = 440;

  let s = '';
  s += dgText(20, 22, 'Bonding and earthing — the arrangement', 'dg-t--title');
  s += dgText(20, 42, '§15.2(b) requires it in accordance with §15.4. §15.4 is not in Part 1 — the method is not shown here.', 'dg-t--dim');

  // The aircraft as the object being bonded.
  s += `<rect x="60" y="150" width="200" height="70" rx="14" class="dg-solid"/>`;
  s += dgText(160, 190, 'AIRCRAFT', 'dg-t--head', 'middle');
  s += dgText(160, 208, 'chassis / structure', 'dg-t--dim', 'middle');

  // Bond point on the aircraft.
  s += `<circle cx="260" cy="185" r="9" class="dg-vehicle"/>`;
  s += dgText(284, 182, 'BOND POINT', 'dg-t--chip');
  s += dgText(284, 198, 'attached to structure,', 'dg-t--dim');
  s += dgText(284, 212, 'not to a moving part', 'dg-t--dim');

  // The cable.
  s += `<path d="M269,185 C330,185 340,120 404,120" class="dg-good" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  s += dgText(322, 112, 'BONDING CABLE', 'dg-t--chip', 'middle');
  s += dgText(322, 100, 'the equipotential path', 'dg-t--dim', 'middle');

  // The dispenser.
  s += `<rect x="408" y="88" width="150" height="64" rx="10" class="dg-cell"/>`;
  s += dgText(483, 114, 'FUELLING VEHICLE', 'dg-t--chip', 'middle');
  s += dgText(483, 132, 'dispenser body', 'dg-t--dim', 'middle');

  // The separate earth path — this is the distinction the lesson turns on.
  s += `<path d="M160,220 L160,300" class="dg-accent" stroke-width="3.4" fill="none"/>`;
  s += dgText(176, 262, 'EARTH PATH', 'dg-t--chip');
  s += dgText(176, 278, 'vehicle to earth point', 'dg-t--dim');
  s += dgText(176, 292, 'where the supply provides one', 'dg-t--dim');

  // Earth symbol.
  s += `<path d="M136,300 L184,300 M142,308 L178,308 M148,316 L172,316 M154,324 L166,324" class="dg-accent" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  s += dgText(196, 312, 'EARTH', 'dg-t--chip');

  // What the two are for.
  s += `<rect x="20" y="330" width="628" height="94" rx="10" class="dg-panel"/>`;
  s += dgText(36, 352, 'Why they are not interchangeable', 'dg-t--head');
  s += dgText(36, 372, 'Bonding equalises potential between the aircraft and the vehicle so a difference cannot', 'dg-t--dim');
  s += dgText(36, 388, 'discharge through the fuel path. Earthing removes charge to earth. A service that treats', 'dg-t--dim');
  s += dgText(36, 404, 'them as one action will get one of them wrong. Which equipment, where, and in what', 'dg-t--dim');
  s += dgText(36, 418, 'order is §15.4\u2019s content — and §15.4 is not in Part 1.', 'dg-t--warn');

  return dgSvg(W, H, 'A schematic showing the aircraft bonded to the fuelling vehicle by a bonding cable between a bond point on the airframe and the dispenser body, with a separate earthing path from the aircraft to an earth point, and a note that bonding and earthing are not interchangeable.', s);
}

/* ============================================================================
   14. GATE AND ROUTE CHECK — THE FAILURE CHAIN
   UAE GCAA CAR Part XI Appendix 3 1.8 requires hydrants to be assessed with
   two or more open from the same main. Doc 9137 Part 1 §3.2.5 requires the
   gate and road to be inspected and physically tested, and §3.2.6 keys in
   the vehicle. The refill is a chain, and the chain is only as strong as its
   weakest link. Drawn as a chain so a walk-through follows it.
   ========================================================================= */
function dRefillChain() {
  const W = 680, H = 430;

  const link = (x, y, w, h, n, label, sub, danger) => {
    let s = '';
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" class="${danger ? 'dg-hazard' : 'dg-cell'}"/>`;
    s += `<circle cx="${x + 16}" cy="${y + 14}" r="10" class="dg-chip"/>`;
    s += dgText(x + 16, y + 14.5, String(n), 'dg-t--chip', 'middle');
    s += dgText(x + 12, y + 38, label, 'dg-t--chip');
    sub.forEach((t, i) => s += dgText(x + 12, y + 56 + i * 14, t, 'dg-t--dim'));
    return s;
  };

  let s = '';
  s += dgText(20, 22, 'The refill chain', 'dg-t--title');
  s += dgText(20, 42, 'Full supply, no reach. Every link is a way the whole thing fails.', 'dg-t--dim');

  const y = 74, h = 96;
  s += link(20, y, 124, h, 1, 'MAIN', ['can it carry', 'the load?'], false);
  s += dgArrow(148, y + h / 2, 168, y + h / 2, 'dg-dim', 2.2);
  s += link(172, y, 124, h, 2, 'HYDRANT', ['flow AND', 'pressure'], false);
  s += dgArrow(300, y + h / 2, 320, y + h / 2, 'dg-dim', 2.2);
  s += link(324, y, 124, h, 3, 'OUTLET', ['hose and', 'coupling'], false);
  s += dgArrow(452, y + h / 2, 472, y + h / 2, 'dg-dim', 2.2);
  s += link(476, y, 184, h, 4, 'VEHICLE', ['pump, tank,', 'and the driver'], false);

  // The weak-link row.
  s += dgText(20, 200, 'Where it breaks in practice', 'dg-t--head');
  const breaks = [
    ['Single-hydrant test', 'Proves the hydrant. Not the main. Two or more open is the real case.'],
    ['Pressure at the riser', 'The number that matters is at the vehicle inlet, under load.'],
    ['Road not passable', 'Seasonal. Snow, water, soft ground — expected conditions, not ideal ones.'],
    ['Gate never opened', 'Not tested is not available. §3.2.5 physical tests.'],
    ['Key in a cabinet', '§3.2.6 puts the key in the vehicle. A locked gate is a supply failure.'],
    ['Clearance unknown', 'Vertical clearance for the largest vehicle, on the whole route.']
  ];
  breaks.forEach((b, i) => {
    const x = 20 + (i % 2) * 330;
    const yy = 214 + Math.floor(i / 2) * 62;
    s += `<rect x="${x}" y="${yy}" width="310" height="54" rx="8" class="dg-hazard"/>`;
    s += dgText(x + 12, yy + 19, b[0], 'dg-t--danger');
    s += dgText(x + 12, yy + 34, b[1].slice(0, 44), 'dg-t--dim');
    s += dgText(x + 12, yy + 47, b[1].slice(44), 'dg-t--dim');
  });

  return dgSvg(W, H, 'A four link chain from water main to hydrant to outlet to vehicle, with six common failure points listed beneath including single hydrant testing, pressure measured at the riser, untraversable roads, gates that have never been opened, keys not carried in the vehicle, and unknown vertical clearance.', s);
}

/* ============================================================================
   15. AIRFRAME ACCESS — WHERE YOU CUT
   Doc 9137 Part 1 §12.1.11 warns that misuse of forcible entry tools has in
   a number of cases resulted in unnecessary fuel spills increasing the fire
   hazard. That makes the choice of access point a fire-safety decision, not
   only a rescue one, and it is a geometry problem. Schematic plan and side
   view of a fuselage showing where the service points are and why each one
   is chosen.
   ========================================================================= */
function dAirframeAccess() {
  const W = 680, H = 500;

  let s = '';
  s += dgText(20, 22, 'Airframe access — choosing the point', 'dg-t--title');
  s += dgText(20, 42, 'A rescue decision that is also a fire decision. §12.1.11 — misuse of tools has caused fuel spills.', 'dg-t--dim');

  // Plan view of a fuselage.
  const y0 = 86;
  s += `<rect x="60" y="${y0}" width="500" height="74" rx="37" class="dg-solid"/>`;
  s += `<path d="M560,${y0 + 20} l30,17 l0,0 l-30,17 z" class="dg-solid"/>`;
  // Tail.
  s += `<path d="M92,${y0 + 18} L56,${y0 - 4} L80,${y0 + 2} L80,${y0 + 20} Z" class="dg-solid"/>`;
  s += `<path d="M92,${y0 + 56} L56,${y0 + 78} L80,${y0 + 72} L80,${y0 + 54} Z" class="dg-solid"/>`;

  // Service points.
  const pts = [
    [180, 'AFT CABIN DOOR', 'first, before the fire', 'ok'],
    [300, 'GALLEY / LAVATORY', 'access, not casualty', 'ok'],
    [420, 'CARGO HOLD', 'follow-up, not first', 'warn'],
    [530, 'COCKPIT', 'last, and only if needed', 'warn']
  ];
  pts.forEach((p) => {
    s += `<circle cx="${p[0]}" cy="${y0 + 37}" r="7" class="dg-vehicle"/>`;
  });

  // Leader lines down to labels.
  pts.forEach((p, i) => {
    const lx = 40 + i * 156;
    s += dgAxis(p[0], y0 + 74, p[0], y0 + 92);
    s += dgAxis(p[0], y0 + 92, lx + 50, y0 + 92);
    s += dgAxis(lx + 50, y0 + 92, lx + 50, y0 + 112);
    s += `<rect x="${lx}" y="${y0 + 112}" width="140" height="58" rx="9" class="dg-cell"/>`;
    s += dgText(lx + 10, y0 + 130, p[1], 'dg-t--chip');
    s += dgText(lx + 10, y0 + 148, p[2].slice(0, 26), 'dg-t--dim');
    s += dgText(lx + 10, y0 + 162, p[2].slice(26), 'dg-t--dim');
  });

  // The rule.
  s += `<rect x="20" y="292" width="640" height="86" rx="10" class="dg-hazard"/>`;
  s += dgText(36, 314, 'The two rules that make this a fire decision', 'dg-t--danger');
  s += dgText(36, 334, '1.  Rescue should be accomplished through regular doors and hatches wherever possible — §12.1.11.', 'dg-t--ink');
  s += dgText(36, 350, '2.  Misuse of forcible entry tools has in a number of cases resulted in unnecessary fuel spills,', 'dg-t--ink');
  s += dgText(36, 364, '     increasing the fire hazard. A cut in the wrong place converts a survivable accident into an', 'dg-t--dim');
  s += dgText(36, 376, '     unsurvivable one, in the most exposed phase of the operation. — §12.1.11 note', 'dg-t--dim');

  // Keep clear of these.
  s += `<rect x="20" y="392" width="310" height="92" rx="10" class="dg-panel"/>`;
  s += dgText(34, 412, 'Do not cut here', 'dg-t--danger');
  s += dgText(34, 430, 'Fuel tanks and their immediately', 'dg-t--dim');
  s += dgText(34, 444, 'adjacent structure. Engine and', 'dg-t--dim');
  s += dgText(34, 458, 'APU intakes or exhausts. Hydraulic', 'dg-t--dim');
  s += dgText(34, 472, 'and fuel lines running through.', 'dg-t--dim');

  s += `<rect x="350" y="392" width="310" height="92" rx="10" class="dg-panel"/>`;
  s += dgText(364, 412, 'Also remember', 'dg-t--head');
  s += dgText(364, 430, 'Entry should not be attempted by', 'dg-t--dim');
  s += dgText(364, 444, 'any route in use by occupants', 'dg-t--dim');
  s += dgText(364, 458, 'escaping. §12.3.1. And crews must', 'dg-t--dim');
  s += dgText(364, 472, 'be trained in forcible entry. §12.1.11.', 'dg-t--dim');

  return dgSvg(W, H, 'A schematic side view of an aircraft fuselage marking four access points — aft cabin door, galley and lavatory, cargo hold and cockpit — with their order of priority, and two panels noting where not to cut and the two standard rules.', s);
}


/* ============================================================================
   16. FOAM BLANKET ON A FUEL POOL — SEQUENCE AND GEOMETRY
   Doc 9137 Part 1 §12.1.9 requires ignition sources to be eliminated *while*
   the spill is neutralised or covered with foam, and §8.1.1 sets the three
   properties a blanket must have: flow freely over the fuel surface, resist
   disruption by wind or heat or flame, and reseal ruptures. §8.1's FFFP film
   spreads across fuel not covered by foam and is self-sealing.

   This is drawn because "lay the blanket" is a sequence and an edge, and both
   are invisible in prose. The 30 per cent of small-pour coverage and the
   three-step sequence are from the manual; the pool geometry is schematic.
   ========================================================================= */
function dSpillBlanket() {
  const W = 680, H = 610;

  let s = '';
  s += dgText(20, 22, 'Blanketing a fuel pool', 'dg-t--title');
  s += dgText(20, 42, '§12.1.9 eliminate ignition sources while covering · §8.1.1 flow freely, resist, reseal', 'dg-t--dim');

  /* ---- The pool, plan view. Irregular because pools are. ---- */
  s += `<path d="M60,150 C120,120 250,132 300,120 C380,102 470,126 520,110 C580,94 620,120 626,164
         C636,214 600,246 610,268 C624,300 570,320 520,310 C450,296 380,330 300,318
         C230,308 170,332 110,312 C52,292 34,258 48,222 C60,190 44,172 60,150 Z" class="dg-hazard"/>`;

  // Airflow over the pool — the reason wind direction decides where you start.
  s += dgArrow(70, 88, 250, 88, 'dg-accent', 2.8);
  s += dgText(70, 74, 'WIND', 'dg-t--accent');
  s += dgArrow(560, 88, 380, 88, 'dg-accent', 2.8);
  s += dgChip(276, 100, 156, 26, 'START UPWIND — §8.1.1', 'dg-chip');

  /* ---- Applied blanket: the upwind third is down first. ---- */
  s += `<path d="M60,150 C120,120 180,132 210,128 L214,318 C170,332 130,318 110,312 C52,292 34,258 48,222 C60,190 44,172 60,150 Z" class="dg-fog"/>`;
  s += dgText(120, 232, 'BLANKET', 'dg-t--warn', 'middle');
  s += dgText(120, 250, 'APPLIED', 'dg-t--warn', 'middle');

  /* ---- The film reaches further than the blanket. §8.1 FFFP. ---- */
  s += `<path d="M210,128 C260,124 300,132 340,124 L344,316 C296,320 250,320 214,318 Z" class="dg-fogline"/>`;
  s += dgText(278, 350, 'FFFP FILM', 'dg-t--accent', 'middle');
  s += dgText(278, 366, 'reaches fuel no blanket has', 'dg-t--dim', 'middle');
  s += dgText(278, 380, 'covered — self-sealing', 'dg-t--dim', 'middle');

  /* ---- Downwind, still exposed. The last and hardest part. ---- */
  s += `<path d="M520,116 C570,102 614,120 624,164 C634,212 600,246 610,268 C622,296 576,316 528,308 Z" class="dg-keepout"/>`;
  s += dgText(578, 214, 'EXPOSED', 'dg-t--danger', 'middle');
  s += dgText(578, 230, 'FUEL', 'dg-t--danger', 'middle');

  /* ---- Crew position: upwind, never downwind. ---- */
  s += `<circle cx="196" cy="104" r="15" class="dg-vehicle"/>`;
  s += dgText(196, 108, 'C', 'dg-t--chip', 'middle');
  s += dgArrow(196, 122, 186, 138, 'dg-good', 2.2);

  /* ---- Ignition sources being eliminated at the same time. §12.1.9 ---- */
  s += `<rect x="20" y="404" width="628" height="60" rx="10" class="dg-hazard"/>`;
  s += dgText(36, 424, 'Not a sequence — a simultaneity', 'dg-t--danger');
  s += dgText(36, 442, '§12.1.9: eliminate as many ignition sources as possible *while* the spill is neutralised', 'dg-t--ink');
  s += dgText(36, 458, 'or covered. Done in series, the fuel is unprotected while you look for the ignition source.', 'dg-t--dim');

  /* ---- The three properties, and what each one fails on. ---- */
  s += dgText(20, 490, 'Three properties — §8.1.1', 'dg-t--head');
  const props = [
    ['Flows freely', 'if it will not spread it does not blanket. That is why the practical area is 2/3 of theoretical'],
    ['Resists disruption', 'a blanket that breaks lets vapour and air meet again. Wind and vehicle movement both break it'],
    ['Reseals', 'self-sealing is the difference between a transient disturbance and losing control entirely']
  ];
  props.forEach((p, i) => {
    const x = 20 + i * 214;
    s += `<rect x="${x}" y="500" width="200" height="94" rx="8" class="dg-cell"/>`;
    s += dgText(x + 10, 518, p[0], 'dg-t--chip');
    s += dgPara(x + 10, 536, p[1], 'dg-t--dim', 29, 13);
  });

  return dgSvg(W, H, 'Plan view of an irregular fuel pool with the applied foam blanket on the upwind third, the film forming foam reaching further, exposed fuel still downwind, and the three required blanket properties listed with what each one fails on.', s);
}

/* ============================================================================
   17. EXTINGUISHING AGENT SELECTION — DECISION PATH
   Doc 9137 Part 1 Chapter 8 classifies the agents and ART-04 m2 turns that
   into a selection problem. A selection problem is a decision tree, and a
   decision tree is far clearer drawn than read. Every branch resolves to a
   named agent and a cited clause.
   ========================================================================= */
function dAgentSelection() {
  const W = 680, H = 580;

  const box = (x, y, w, h, label, sub, cls) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" class="${cls || 'dg-cell'}"/>` +
    dgText(x + w / 2, sub ? y + h / 2 - 10 : y + h / 2, label, 'dg-t--chip', 'middle') +
    (sub ? dgText(x + w / 2, y + h / 2 + 10, sub, 'dg-t--dim', 'middle') : '');

  let s = '';
  s += dgText(20, 22, 'Which agent', 'dg-t--title');
  s += dgText(20, 42, 'Start at the fire, not at the shelf. §2.3 principal agent · §2.4 complementary.', 'dg-t--dim');

  s += box(20, 66, 150, 54, 'The fire', 'class A/B/C/D or AFFF', 'dg-hazard');

  s += dgArrow(174, 84, 216, 84, 'dg-dim', 2.2);
  s += box(220, 66, 132, 54, 'Liquid fuel', 'Jet A, kerosene');
  s += dgArrow(356, 84, 398, 84, 'dg-dim', 2.2);
  s += box(402, 66, 258, 54, 'FFFP foam', '§8.1(d) — fluid, film forming', 'dg-fog');

  s += dgArrow(292, 124, 292, 158, 'dg-dim', 2.2);
  s += box(20, 162, 150, 54, 'Solid combustibles', 'Class A');
  s += dgArrow(174, 180, 216, 180, 'dg-dim', 2.2);
  s += box(220, 162, 132, 54, 'Water fog', '§12.2.2 cooling');
  s += dgArrow(356, 180, 398, 180, 'dg-dim', 2.2);
  s += box(402, 162, 258, 54, 'Water fog + foam on fuel', 'water cools, foam excludes the vapour', 'dg-fog');

  s += dgArrow(292, 220, 292, 254, 'dg-dim', 2.2);
  s += box(20, 258, 150, 54, 'Live electrical', 'Class C');
  s += dgArrow(174, 276, 216, 276, 'dg-dim', 2.2);
  s += box(220, 258, 132, 54, 'De-energise first', 'then the same agent');
  s += dgArrow(356, 276, 398, 276, 'dg-dim', 2.2);
  s += box(402, 258, 258, 54, 'Water fog, once dead', 'BC dry chemical is also rated for Class C', 'dg-fog');

  s += dgArrow(292, 316, 292, 350, 'dg-dim', 2.2);
  s += box(20, 354, 150, 54, 'Flammable metal', 'Class D');
  s += dgArrow(174, 372, 216, 372, 'dg-dim', 2.2);
  s += box(220, 354, 132, 54, 'Specialised agent', '§8.2.3', 'dg-hazard');
  s += dgArrow(356, 372, 398, 372, 'dg-dim', 2.2);
  s += box(402, 354, 258, 54, 'Not the powder you carry', 'conventional agents are not for Class D', 'dg-hazard');

  // The complementary agent, always present.
  s += `<rect x="20" y="432" width="640" height="62" rx="10" class="dg-cell"/>`;
  s += dgText(36, 452, 'Alongside all of it: the complementary agent', 'dg-t--head');
  s += dgText(36, 470, 'Dry chemical powder — §2.4. Knockdown, and §8.2.4 for inaccessible locations and running', 'dg-t--dim');
  s += dgText(36, 486, 'fuel fires where foams are largely ineffective. No post-control stability. §12.3.4. Corrosive.', 'dg-t--dim');

  // The two warnings that change the choice.
  s += `<rect x="20" y="506" width="310" height="58" rx="10" class="dg-hazard"/>`;
  s += dgText(34, 524, 'Performance level is not a preference', 'dg-t--danger');
  s += dgText(34, 540, '§2.3 / Annex 14 §9.2.9 —', 'dg-t--dim');
  s += dgText(34, 554, 'A, B or C as the category requires.', 'dg-t--dim');

  s += `<rect x="350" y="506" width="310" height="58" rx="10" class="dg-hazard"/>`;
  s += dgText(364, 524, 'Fluorine-free changes the equipment', 'dg-t--danger');
  s += dgText(364, 540, '§5.7.16 — expansion 6-10 not 8-12,', 'dg-t--dim');
  s += dgText(364, 554, 'drainage over 3 min, not over 5. §8.1(e).', 'dg-t--dim');

  return dgSvg(W, H, 'A decision tree starting from the class of fire and resolving to a named agent for each of liquid fuel, solid combustibles, live electrical and flammable metal, with the complementary dry chemical agent and two warnings about performance level and fluorine-free equipment settings.', s);
}

/* ============================================================================
   18. TASK AND RESOURCE ANALYSIS — THE SIX PHASES
   CAP 1150 (UK CAA Information Paper 04, January 2014) is the one source in
   this library that sets out a defensible way to justify a staffing number. It
   is a method illustration, not a binding requirement, and is labelled as such.
   Phases 1 to 4 are inputs, Phase 5 is the combination, and Phase 6 is the only
   place the analysis is actually carried out. That ordering is the teaching
   point: you cannot run a tabletop without having scored your worst case first.
   ========================================================================= */
function dTraPhases() {
  const W = 700, H = 706;

  const PH = [
    ['1', 'Aims and tasks',
     'The aims and objectives of the RFF services must be clear as to the required tasks that personnel are expected to carry out.',
     'Not exhaustive. Find them all.'],
    ['2', 'Accident types',
     'Identify representative realistic and feasible accidents that may occur at the airport. All incidents should involve fire.',
     'From statistics and local data.'],
    ['3', 'Aircraft types',
     'Identify the types of aircraft commonly in use. Type and configuration bear directly on the resources required.',
     'Configuration, not just type.'],
    ['4', 'Locations',
     'Every airport is unique in configuration, movements, infrastructure and boundary. Score the credible worst-case locations.',
     'Record the rationale for each.'],
    ['5', 'The scenario',
     'Correlate the accident types, the aircraft and the locations into one complete accident scenario ready for analysis.',
     'One scenario, ready to analyse.'],
    ['6', 'Tabletop analysis',
     'Run the scenarios as tabletop exercises or simulations, with experienced supervisors and firefighters.',
     'Minimum at any one time, in sequence.']
  ];

  const COLX = [20, 252, 484], BW = 196, ROWY = [66, 256], BH = 180;
  let s = '';
  s += dgText(20, 22, 'Task and resource analysis: six phases', 'dg-t--title');
  s += dgText(20, 42, 'CAP 1150 — a method for justifying a number, not a requirement for one.', 'dg-t--dim');

  PH.forEach((p, i) => {
    const x = COLX[i % 3], y = ROWY[Math.floor(i / 3)];
    s += `<rect x="${x}" y="${y}" width="${BW}" height="${BH}" rx="10" class="dg-cell"/>`;
    s += `<circle cx="${x + 24}" cy="${y + 26}" r="14" class="dg-chip"/>`;
    s += dgText(x + 24, y + 26.5, p[0], 'dg-t--chip', 'middle');
    s += dgText(x + 46, y + 26, p[1], 'dg-t--head');
    const body = dgWrap(p[2], 26);
    body.forEach((l, n) => { s += dgText(x + 12, y + 56 + n * 12, l, 'dg-t--dim'); });
    const rule = y + 56 + body.length * 12 + 4;
    s += `<line x1="${x + 12}" y1="${rule}" x2="${x + BW - 12}" y2="${rule}" class="dg-dimline"/>`;
    s += dgPara(x + 12, rule + 16, p[3], 'dg-t--accent', 26, 12);
    if (i % 3 < 2) s += dgArrow(x + BW + 4, y + 26, x + BW + 28, y + 26, 'dg-accent', 1.8);
  });

  s += dgText(20, 462, 'Sequential, and the order is the argument', 'dg-t--head');
  s += dgText(20, 480, 'Phases 1 to 4 are inputs. Phase 5 combines them into one scenario. Phase 6 is where the analysis is', 'dg-t--dim');
  s += dgText(20, 494, 'carried out — a tabletop run without a scored worst-case location and a named aircraft is not evidence.', 'dg-t--dim');

  s += dgText(20, 514, 'What Phase 6 must record', 'dg-t--head');
  const REC = [
    'Receipt of message and dispatch of the RFF response',
    'Time — from the initial receipt of the call onwards',
    'List of assessed tasks, functions and priorities achieved',
    'Resources — personnel, vehicles and equipment — per task',
    'Comments, to enable team members to record findings',
    'Identified pinch points'
  ];
  REC.forEach((r, i) => {
    const x = COLX[i % 3], y = 528 + Math.floor(i / 3) * 56;
    s += `<rect x="${x}" y="${y}" width="${BW}" height="52" rx="8" class="dg-cell"/>`;
    s += `<circle cx="${x + 16}" cy="${y + 18}" r="3.5" class="dg-arc"/>`;
    s += dgPara(x + 26, y + 18, r, 'dg-t--dim', 25, 12);
  });

  s += `<rect x="20" y="648" width="660" height="48" rx="8" class="dg-panel dg-panel--warn"/>`;
  s += dgText(36, 666, 'A UK CAA Information Paper — a method illustration, not a binding requirement. Your', 'dg-t--warn');
  s += dgText(36, 684, 'regulator sets the category, and therefore the floor the analysis has to justify.', 'dg-t--dim');

  return dgSvg(W, H, 'The six phases of a task and resource analysis: aims and tasks, representative accidents, aircraft types, locations, the combined scenario, and tabletop analysis, followed by the six items the analysis must record.', s);
}

/* ============================================================================
   19. QUICKEST IS NOT SHORTEST
   Doc 9137 Part 1 §13.3.5.2 is a single sentence that overturns the instinct to
   take the straight line: vehicles approach "by the quickest route
   commensurate with safety, although this might not necessarily be the shortest
   distance to the incident site". The two routes below are drawn to the same
   scale. The paved one is longer and arrives first.
   ========================================================================= */
function dQuickestRoute() {
  const W = 700, H = 598;
  let s = '';
  s += dgText(20, 22, 'Quickest is not shortest', 'dg-t--title');
  s += dgText(20, 42, '§13.3.5.2 — the rule that overturns the instinct to take the direct line across the grass.', 'dg-t--dim');

  s += `<rect x="20" y="60" width="660" height="300" rx="10" class="dg-panel"/>`;
  s += `<rect x="36" y="76" width="628" height="268" rx="6" class="dg-ground"/>`;

  // Pavement: runway plus two taxiways, so the dog-leg is a real route.
  s += `<rect x="36" y="210" width="628" height="30" class="dg-solid"/>`;
  s += dgAxis(44, 225, 656, 225);
  s += `<rect x="120" y="110" width="26" height="190" class="dg-solid"/>`;
  s += `<rect x="430" y="110" width="26" height="190" class="dg-solid"/>`;

  s += dgText(155, 192, 'QUICKEST — §13.3.5.2', 'dg-t--good');
  s += dgText(360, 192, 'RUNWAY', 'dg-t--dim', 'middle');
  s += dgText(300, 322, 'SHORTEST — AND NOT THE QUICKEST', 'dg-t--bad');

  // The route instinct takes: straight across unimproved ground.
  s += dgArrow(136, 296, 586, 104, 'dg-bad', 2.4, '8 5');
  // The route §13.3.5.2 tells you to take.
  s += dgArrow(92, 296, 131, 296, 'dg-good', 3);
  s += dgArrow(133, 294, 133, 228, 'dg-good', 3);
  s += dgArrow(135, 225, 429, 225, 'dg-good', 3);
  s += dgArrow(443, 223, 443, 122, 'dg-good', 3);
  s += dgArrow(445, 120, 578, 112, 'dg-good', 3);

  s += `<rect x="52" y="292" width="72" height="34" rx="6" class="dg-cell"/>`;
  s += dgText(88, 309, 'RFF', 'dg-t--chip', 'middle');
  s += `<circle cx="600" cy="110" r="22" class="dg-hazard"/>`;
  s += dgText(600, 110.5, 'INC', 'dg-t--chip', 'middle');

  s += dgText(20, 378, 'Both routes are drawn to the same scale. The green one is longer on the ground. The difference in time is', 'dg-t--dim');
  s += dgText(20, 392, 'yours to measure on your own aerodrome — the manual sets the rule, not the number.', 'dg-t--dim');

  const CELL = [
    ['§13.3.5.3 Chart', 'An airfield chart showing all taxiways, runways, holding points and vehicle routes marked with their designations, plus written instructions for breakdown or disorientation.'],
    ['§13.3.5.4 Kit', 'Surface movement radar, infrared vision systems, taxiway centreline lighting, vehicle positioning equipment and other navigation aids that enhance response in low visibility.'],
    ['§13.3.5.5 / .6', 'Once low visibility operations are initiated it may be necessary to restrict vehicles in the manoeuvring area, and personnel must know which areas become impassable.']
  ];
  CELL.forEach((c, i) => {
    const x = 20 + i * 232;
    s += `<rect x="${x}" y="412" width="212" height="118" rx="10" class="dg-cell"/>`;
    s += dgText(x + 12, 432, c[0], 'dg-t--head');
    s += dgPara(x + 12, 456, c[1], 'dg-t--dim', 30, 12);
  });

  s += `<rect x="20" y="542" width="660" height="48" rx="8" class="dg-hazard"/>`;
  s += dgText(36, 562, 'Knowledge of the topography for all weather conditions is what makes this work — grid', 'dg-t--danger');
  s += dgText(36, 580, 'maps and careful selection of routes are what turn the rule into a response time.', 'dg-t--dim');

  return dgSvg(W, H, 'A plan view of an aerodrome showing a longer paved dog-leg route in green as the quickest route and a shorter diagonal route across unimproved ground in red as the shortest but not quickest, with the chart, equipment and low visibility requirements listed below.', s);
}

/* ============================================================================
   20. LITHIUM-ION THERMAL RUNAWAY — FOUR WAYS IN
   Doc 9137 Part 1 §12.2.19.2 to §12.2.19.4. What matters here is that the
   entry route determines whether you can influence it: two of the four are
   things that happen to the aircraft, two are things you can act on before it
   does. The section note — installed batteries, not cargo — is on the panel at
   the foot because it is the first thing an SME will check.
   ========================================================================= */
function dLithiumRunaway() {
  const W = 700, H = 640;
  let s = '';
  s += dgText(20, 22, 'Thermal runaway: four ways in', 'dg-t--title');
  s += dgText(20, 42, '§12.2.19.2 to §12.2.19.4 — what causes it, what it produces, and what you must have in place first.', 'dg-t--dim');

  const ROUTE = [
    ['a', 'external overheating from fire in another aircraft system'],
    ['b', 'short-circuiting, internal within the cells or external'],
    ['c', 'damage caused during an aircraft accident'],
    ['d', 'manufacturing defect within the battery']
  ];
  const CX = [20, 186, 352, 518], RW = 162;
  ROUTE.forEach((r, i) => {
    const x = CX[i];
    s += `<rect x="${x}" y="64" width="${RW}" height="76" rx="9" class="dg-cell"/>`;
    s += dgText(x + 12, 84, r[0] + ')', 'dg-t--chip');
    s += dgPara(x + 12, 104, r[1], 'dg-t--dim', 25, 12);
    s += dgArrow(x + RW / 2, 140, x + RW / 2, 160, 'dg-accent', 1.8);
  });

  s += dgText(24, 160, 'four routes in', 'dg-t--accent');
  s += `<line x1="101" y1="160" x2="599" y2="160" class="dg-accent" stroke-width="1.8"/>`;
  s += dgArrow(350, 162, 350, 196, 'dg-accent', 2.2);

  s += `<rect x="240" y="200" width="220" height="68" rx="10" class="dg-cell"/>`;
  s += dgText(350, 226, 'Li-ion battery', 'dg-t--head', 'middle');
  s += dgText(350, 246, 'numerous cells, overheated', 'dg-t--dim', 'middle');

  const OUT = ['gas', 'smoke', 'spillage of flammable electrolytes'];
  const OX = [26, 248, 470];
  OUT.forEach((o, i) => {
    s += dgArrow(350, 270, OX[i] + 102, 288, 'dg-bad', 2);
    s += dgChip(OX[i], 292, 204, 34, o, 'dg-tag-yellow');
  });

  s += `<rect x="20" y="348" width="660" height="84" rx="10" class="dg-panel dg-panel--warn"/>`;
  s += dgText(36, 368, '§12.2.19.4(c) — the sign that matters is venting', 'dg-t--warn');
  s += dgText(36, 388, 'RFFS and ground operations personnel must be able to recognise signs of battery failure', 'dg-t--dim');
  s += dgText(36, 402, 'reaction, that is venting — the earliest thing you can see, and the trigger for everything the', 'dg-t--dim');
  s += dgText(36, 416, 'section then requires of you.', 'dg-t--dim');

  s += dgText(20, 448, 'What §12.2.19.4 requires of the RFFS unit where these aircraft operate', 'dg-t--head');
  const ACT = [
    ['a', 'trained to recognise the types and the location'],
    ['b', 'containment and venting ports identified'],
    ['c', 'able to recognise venting'],
    ['d', 'tactics to contain the event'],
    ['e', 'training, agents and equipment']
  ];
  ACT.forEach((a, i) => {
    const x = 20 + i * 134;
    s += `<rect x="${x}" y="462" width="126" height="88" rx="9" class="dg-cell"/>`;
    s += dgText(x + 10, 482, a[0] + ')', 'dg-t--chip');
    s += dgPara(x + 10, 504, a[1], 'dg-t--dim', 19, 12);
  });

  s += `<rect x="20" y="564" width="660" height="66" rx="8" class="dg-hazard"/>`;
  s += dgText(36, 584, 'The scope limit, before anything else — §12.2.19 note:', 'dg-t--danger');
  s += dgText(36, 602, 'This is for lithium-ion batteries installed by the manufacturer as part of the', 'dg-t--dim');
  s += dgText(36, 618, 'aviation system, and not for Li-ion batteries being carried as cargo.', 'dg-t--dim');

  return dgSvg(W, H, 'Four routes into lithium-ion thermal runaway feeding a battery and producing gas, smoke and flammable electrolyte, with the venting sign and the five actions the rescue and firefighting service must have in place, and the installed-battery scope limit.', s);
}

/* ============================================================================
   21. MUTUAL AID — WHO ARRIVES, AND WHEN
   Doc 9137 Part 7 §3.14.1 is the reason this is a diagram and not a paragraph:
   the binding moment in a mutual aid arrangement is not the agreement, it is
   crossing the perimeter, because that is where command changes hands. §3.4.6
   is why the rendezvous point exists — mutual aid vehicles often cannot reach
   the site directly, and §3.14.2 is why the phone numbers are a monthly task.
   ========================================================================= */
function dMutualAid() {
  const W = 700, H = 642;
  let s = '';
  s += dgText(20, 22, 'Mutual aid: the two things that actually fail', 'dg-t--title');
  s += dgText(20, 42, 'Part 7 §3.14.1, §3.4.6 and §3.14.2 — command at the perimeter, and a rendezvous point that works.', 'dg-t--dim');

  // The perimeter, and the command change across it.
  s += `<rect x="20" y="64" width="320" height="132" rx="10" class="dg-panel"/>`;
  s += dgText(36, 86, 'On-airport', 'dg-t--head');
  s += dgText(36, 110, 'In an on-airport incident the airport', 'dg-t--dim');
  s += dgText(36, 124, 'authority will normally be in command.', 'dg-t--dim');

  s += `<rect x="360" y="64" width="320" height="132" rx="10" class="dg-hazard"/>`;
  s += dgText(376, 86, 'Off-airport', 'dg-t--danger');
  s += dgText(376, 110, 'The agency in command is the agency', 'dg-t--dim');
  s += dgText(376, 122, 'agreed in the mutual aid emergency', 'dg-t--dim');
  s += dgText(376, 134, 'agreement pre-arranged with the', 'dg-t--dim');
  s += dgText(376, 146, 'surrounding community.', 'dg-t--dim');

  s += dgArrow(240, 206, 240, 228, 'dg-accent', 2.2);
  s += dgArrow(460, 206, 460, 228, 'dg-bad', 2.2);
  s += `<line x1="20" y1="228" x2="680" y2="228" class="dg-axis" stroke-width="2"/>`;
  s += dgChip(238, 238, 224, 28, 'THE PERIMETER IS THE HANDOVER', 'dg-chip');

  s += `<rect x="20" y="282" width="320" height="160" rx="10" class="dg-cell"/>`;
  s += dgText(36, 304, '§3.14.1 Written, not assumed', 'dg-t--head');
  s += dgPara(36, 326, 'Local rescue and fire fighting, security, law enforcement and medical services may be inadequate to handle the situation. Written mutual aid programmes are strongly recommended to ensure a prompt response from elsewhere, coordinated by the airport authority and the agencies involved and implemented by the airport authority.', 'dg-t--dim', 42, 12);

  s += `<rect x="360" y="282" width="320" height="160" rx="10" class="dg-cell"/>`;
  s += dgText(376, 304, '§3.4.6 Why a rendezvous point exists', 'dg-t--head');
  s += dgPara(376, 326, 'Mutual aid vehicles may not be able to proceed directly to the site. Units meet at a designated rendezvous point, which can also serve as a staging area. This helps to eliminate traffic jams and confusion, and personnel controlling it should consider vehicle suitability for adverse terrain and prevent obstruction of the access route by disabled vehicles.', 'dg-t--dim', 42, 12);

  s += `<rect x="20" y="456" width="660" height="76" rx="10" class="dg-panel dg-panel--warn"/>`;
  s += dgText(36, 476, '§3.14.2 The part that rots quietly', 'dg-t--warn');
  s += dgText(36, 498, 'All mutual aid agreements shall be reviewed or revised annually.', 'dg-t--dim');
  s += dgText(36, 510, 'Telephone and personnel contacts shall be reviewed and updated monthly.', 'dg-t--dim');
  s += dgText(36, 522, 'An agreement carrying last year\'s contact numbers is not an agreement.', 'dg-t--dim');

  s += `<rect x="20" y="546" width="660" height="76" rx="10" class="dg-hazard"/>`;
  s += dgText(36, 568, '§3.15 — a military installation on or near the airport requires a mutual aid agreement', 'dg-t--danger');
  s += dgText(36, 590, 'integrating its personnel within the command, communication and co-ordination functions', 'dg-t--dim');
  s += dgText(36, 604, 'of the emergency plan.', 'dg-t--dim');

  return dgSvg(W, H, 'Mutual aid: the command change across the aerodrome perimeter, the written agreement required, the rendezvous point and its purpose, and the annual and monthly review requirements.', s);
}

/* =========================================================================
   REGISTRY
   ========================================================================= */

const DIAGRAMS = {
  'hot-brake-approach':   { draw: dHotBrakeApproach,
    caption: '<b>Approach geometry for hot brakes and wheel fires.</b> Approach the wheel from the fore or aft quarter and never from the side in line with the axle — ICAO Doc 9137 Part 1 §12.2.3. The ≈45° shown is the geometric reading of &ldquo;a fore or aft direction angle&rdquo;; the manual does not state a figure in degrees.' },
  'hot-brake-cooling':    { draw: dHotBrakeCooling,
    caption: '<b>How a hot wheel is cooled.</b> Too rapid cooling, especially if localised, may cause explosive failure of the wheel; solid streams are a last resort. Water fog or an indirect solid stream is used. Dry chemical is effective but not recommended on this type of fire — §12.2.4.' },
  'critical-area':        { draw: dCriticalArea,
    caption: '<b>The critical area.</b> A rectangle one dimension of which is the overall aircraft length. For aircraft of 24 m or more it reaches 24 m upwind and 6 m downwind; below that, 6 m each side, with a transition between 12 m and 24 m. The practical area is about two thirds of the theoretical — §2.4.2 to §2.4.6.' },
  'jet-blast-zones':      { draw: dJetBlast,
    caption: '<b>Turbine engine danger zones.</b> Stay at least 10 m from the front and side intake to avoid being ingested, and remain up to 500 m from the rear depending on aircraft size — §12.2.11 and §12.2.12.' },
  'vehicle-positioning':  { draw: dVehiclePositioning,
    caption: '<b>Positioning at the scene.</b> Position uphill and upwind to stay out of fuel and vapour, protect occupant egress routes, do not block emergency vehicle entry or exit, and stay able to reposition for a reflash. First-arriving crews often set the route for everyone behind them — §12.3.' },
  'water-quantity':       { draw: dWaterQuantity,
    caption: '<b>Water quantity.</b> Total water is Q1 + Q2, where Q1 = A × R × T controls the fire in the practical critical area and Q2 sustains control and finishes the job. Q2 cannot be calculated exactly and is read from the Annex 14 graph — §2.4.7 to §2.4.9. Verify every figure against the current edition before operational use.' },
  'level-determination':  { draw: dLevelDetermination,
    caption: '<b>Category determination.</b> The aerodrome category is determined from the overall length of the longest aeroplane normally using the aerodrome and its maximum fuselage width — ICAO Doc 9137 Part 1 §2.1.2, Annex 14 Table 9-1 note. The matrix shown is a schematic of the lookup; confirm every cell against Table 2-1 and Table 2-3 in the current edition and against your own State&rsquo;s adopted requirements before operational use.' },
  'fuelling-stand':      { draw: dFuellingStand,
    caption: '<b>Fuelling stand geometry.</b> Positioning requirements while fuelling is in progress — ICAO Doc 9137 Part 1 §15.2. The 15 m figure is quoted from §15.2(e); the circle is drawn large enough to read on the page and is <b>not to scale</b>. Bonding and grounding under §15.2(b) are referred to §15.4, which is not reproduced in Part 1 — see lesson ART-12 m3.' },
  'casualty-flow':      { draw: dCasualtyFlow,
    caption: '<b>Casualty flow.</b> The injured pass through four areas — collection, triage, care and transportation. The triage area should be located <b>at least 90 m upwind</b> of the accident site to avoid exposure to fire and smoke, and where movement is unavoidable casualties should go the shortest distance possible, well away from firefighting operations, upwind and uphill — ICAO Doc 9137 Part 7 §9.5.1 and §9.2.5. Care sub-area colours match the casualty identification tags of §9.3.2. Distances other than the 90 m are schematic.' },
  'document-hierarchy':  { draw: dDocumentHierarchy,
    caption: '<b>Which document wins.</b> Conflicts resolve downward: ICAO Annex 14 is a standard and is adopted by States; Doc 9137 is guidance and explains it; the State&rsquo;s adopted regulation is what you comply with; an operator SOP is binding on your crews and must meet or exceed everything above it. A more detailed lower tier may add requirements but can never reduce one above it.' },
  'alert-chain':         { draw: dAlertChain,
    caption: '<b>The alert chain.</b> From the initial report to a rolling appliance, with the response time objective underneath and the six things the chain depends on. Annex 14 §9.2.39 requires a discrete communication system linking the fire station, other stations and the tower; §9.2.40 requires an alerting system. The clock starts at the initial call and is measured to the point of being in position to apply foam at 50 per cent of the Table 2-3 rate — Doc 9137 Part 1 §2.7.1.' },
  'dg-placard':          { draw: dDgPlacard,
    caption: '<b>Reading a hazard placard.</b> A red diamond square on a point, the class number in the bottom half, and a subsidiary risk in the lower corner where a second hazard applies. The shape is a recognition cue before the number is read. Read subsidiary before class. ICAO Annex 18 — Safe Transport of Dangerous Goods by Air; see also Doc 9137 Part 1 Chapter 12.' },
  'bonding-circuit':     { draw: dBondingCircuit,
    caption: '<b>Bonding and earthing are not the same action.</b> Bonding equalises potential between the aircraft and the fuelling vehicle; earthing removes charge to earth. §15.2(b) requires bonding and/or grounding in accordance with §15.4 — <b>and §15.4 is not reproduced in Doc 9137 Part 1.</b> This figure shows the arrangement the clause requires, not the procedure. The method must come from the fuel supplier&rsquo;s operator procedure under §15.1 and from NFPA 407.' },
  'refill-chain':        { draw: dRefillChain,
    caption: '<b>The refill chain.</b> Main, hydrant, outlet, vehicle — and the six places it fails in practice. UAE GCAA CAR Part XI Appendix 3 1.8 requires hydrant supplies to be assessed for flow and pressure with two or more hydrants open to simulate multi-refill operations from the same main, because a single-hydrant test proves the hydrant rather than the main. Worked example of adoption mechanics, not a South African requirement. §3.2.5 and §3.2.6 cover the gate and the key.' },
  'airframe-access':     { draw: dAirframeAccess,
    caption: '<b>Choosing an access point.</b> A rescue decision that is also a fire decision. §12.1.11 states that rescue should be accomplished through regular doors and hatches wherever possible, and its note records that misuse of forcible entry tools has in a number of cases resulted in unnecessary fuel spills increasing the fire hazard. §12.3.1 adds that entry should not be attempted by any route in use by escaping occupants. Schematic only — confirm every mark against the aircraft type in your own fleet.' }
  ,
  'spill-blanket':       { draw: dSpillBlanket,
    caption: '<b>Blanketing a fuel pool.</b> Start upwind and work down — §8.1.1 requires a foam to flow freely over the fuel surface, resist disruption from wind or heat or flame, and reseal ruptures. Film forming foam reaches fuel no blanket has covered and is self-sealing §8.1, so it extends the covered area but does not replace the blanket, which must still cover the fuel surface to ensure extinction. §12.1.9 requires ignition sources to be eliminated <em>while</em> the spill is being covered, not before. Pool outline is schematic.' },
  'agent-selection':     { draw: dAgentSelection,
    caption: '<b>Which agent.</b> Start at the class of fire rather than at the shelf. Liquid fuel takes FFFP foam §8.1(d); solid combustibles take water fog for cooling and quenching §12.2.2; live electrical must be de-energised before any agent; flammable metal needs a specialised agent §8.2.3 that is not the powder you carry. The complementary agent is dry chemical powder alongside all of them §2.4 — knockdown only, no post-control stability §12.3.4, and corrosive §8.2.5. Performance level A, B or C is required by category §2.3 and Annex 14 §9.2.9 and is not a preference, and a fluorine-free foam must still meet it while requiring different expansion and drainage settings §5.7.16, §8.1(e).' }
  ,
  'tra-phases':          { draw: dTraPhases,
    caption: '<b>The six phases of a task and resource analysis.</b> Phase 1 fixes the aims and the task list, not exhaustive, all of which must be identified before moving on. Phase 2 selects representative realistic and feasible accidents from statistical analysis of previous accidents and data from international, national and local sources, and all incidents should involve fire so as to represent a feasible worst-case scenario requiring an RFFS response. Phase 3 identifies the aircraft types commonly in use, because type and configuration bear directly on the resources required. Phase 4 is the phase most aerodromes skip: every airport is unique, and a facilitator working with experienced personnel must score credible worst-case locations by additional response time and record the rationale for each. Phase 5 correlates accident type, aircraft and location into one complete scenario. Phase 6 is where the analysis happens, in a series of tabletop exercises or simulations, identifying in real time and in sequential order the minimum number of RFF personnel required at any one time. CAP 1150 is a UK CAA Information Paper and a method illustration, not a binding requirement; your regulator sets the category, and therefore the floor.' },
  'quickest-route':      { draw: dQuickestRoute,
    caption: '<b>Quickest is not shortest.</b> §13.3.5.2 requires vehicles to approach any aircraft accident or incident by the quickest route commensurate with safety, although this might not necessarily be the shortest distance to the incident site, because traversing unimproved areas can take longer than travelling a greater distance on paved surfaces. Both routes above are drawn to the same scale, and the green one is longer. Thorough knowledge by RFFS personnel of the topography of the aerodrome and its immediate vicinity for all weather conditions is paramount, and the use of grid maps and careful selection of routes is essential for success in meeting the response objectives. §13.3.5.3 requires an airfield chart clearly showing all taxiways, runways, holding points and vehicle routes marked with their appropriate designation, accompanied by written instructions detailing the action a driver should take on breakdown or if unsure of position. §13.3.5.4 points to surface movement radar, infrared vision systems, taxiway centreline lighting, vehicle positioning equipment and other navigation aids. §13.3.5.5 notes that once low visibility operations are initiated it may be necessary to restrict vehicle operation in the manoeuvring area, and §13.3.5.6 requires personnel to be made aware of areas that may become impassable. The time difference between the two routes is yours to measure; the manual sets the rule, not the number.' },
  'lithium-runaway':     { draw: dLithiumRunaway,
    caption: '<b>Four ways into thermal runaway.</b> §12.2.19.3 lists them: external overheating caused by exposure to fire in other aircraft systems, short-circuiting either internally within the battery cells or externally, damage caused during an aircraft accident, and manufacturing defects within the battery. §12.2.19.2 states the consequence: each Li-ion battery contains numerous cells which, if they become overheated, a process known as thermal runaway, could lead to the emission of gas, smoke and the spillage of flammable electrolytes. §12.2.19.4(c) makes venting the sign that matters, and §12.2.19.4(a) to (e) are what must be in place beforehand — knowing which aircraft types carry these batteries and where within the airframe, identifying existing battery containment and venting ports, being able to recognise signs of battery failure reaction, developing tactics to contain the battery failure event, and considering additional training with suitable extinguishing agents and equipment. §12.2.19.5 directs you to the aircraft manufacturer guidance for specific types. The section note governs scope: this is for lithium-ion batteries installed by the aircraft manufacturer as part of the aviation system, and not for Li-ion batteries being carried as cargo.' },
  'mutual-aid':          { draw: dMutualAid,
    caption: '<b>Mutual aid fails in two places.</b> First, at the perimeter: in an on-airport aircraft accident or incident the airport authority will normally be in command, whereas in an off-airport incident the agency in command is the agency agreed upon in the mutual aid emergency agreement pre-arranged with the surrounding community, and this should not affect the immediate response by airport personnel. Second, on arrival: §3.4.6 states that in many cases it may not be possible or practicable for vehicles of mutual aid fire departments and ambulances to proceed directly to the accident or incident site, so the plan must include procedures for meeting at a designated rendezvous point, which can also serve as a staging area where responding units are held until needed. This helps to eliminate traffic jams and confusion, and personnel controlling the rendezvous point should consider the suitability of vehicles for adverse terrain conditions and prevent obstruction of the access route by disabled vehicles. §3.14.1 requires written mutual aid programmes where local rescue and fire fighting, security, law enforcement and medical services are inadequate, normally co-ordinated by the airport authority as well as the agencies involved and implemented by the airport authority. §3.14.2 is the requirement that rots quietly: all mutual aid agreements shall be reviewed or revised annually, and telephone and personnel contacts reviewed and updated monthly. §3.15 requires a mutual aid agreement integrating military personnel into the command, communication and co-ordination functions of the emergency plan where a military installation is located on or near the airport.' }

};

const DIAGRAM_KEYS = Object.keys(DIAGRAMS);

/* ---------------------------------------------------------------- render */

/* Returns the figure markup for a key. A missing key degrades to a visible
   marker rather than silently dropping the reference, so an authoring typo
   cannot quietly remove a safety illustration. */
function diagramBlock(key) {
  const d = DIAGRAMS[key];
  if (!d) {
    return `<div class="diagram diagram--missing">Missing diagram <code>${esc(key)}</code> — add it to DIAGRAMS in <code>js/diagrams.js</code></div>`;
  }
  return `<figure class="diagram">${d.draw()}` +
         `<figcaption>${d.caption}</figcaption></figure>`;
}

/* Swaps {{diagram:key}} placeholders for figures. Runs on the lesson body only,
   so no other part of the UI can inject markup. */
function renderDiagrams(html) {
  if (!html || html.indexOf('{{diagram:') === -1) return html || '';
  return String(html).replace(/\{\{diagram:([A-Za-z0-9_-]+)\}\}/g, (m, key) => diagramBlock(key));
}
