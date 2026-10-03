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
function dgArrow(x1, y1, x2, y2, cls, w) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const len = 10;
  const spread = 0.44;
  const hx = x2 - len * Math.cos(a - spread);
  const hy = y2 - len * Math.sin(a - spread);
  const tx = x2 - len * Math.cos(a + spread);
  const ty = y2 - len * Math.sin(a + spread);
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" stroke-width="${w || 2.4}"/>` +
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
  s += dgText(258, 250, 'EXPLOSIVE', 'dg-t--danger');
  s += dgText(258, 266, 'FAILURE', 'dg-t--danger');
  s += dgText(258, 290, 'steam flash', 'dg-t--dim');
  s += dgText(258, 304, 'shatters the', 'dg-t--dim');
  s += dgText(258, 318, 'wheel', 'dg-t--dim');

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
  s += dgText(cx - fusL / 2 - 10, cy - fusW / 2 - 34, 'whole length is protected', 'dg-t--dim', 'end');

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
  const W = 680, H = 360;
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
  s += dgText(nose + 103, cy - 108, '10 m minimum', 'dg-t--danger', 'middle');
  s += dgText(nose + 103, cy - 92, 'front &amp; side intake', 'dg-t--danger', 'middle');

  // Dimension bar for the 500 m.
  s += dgAxis(tail + 40, cy + 150, W - 24, cy + 150);
  s += `<line x1="${tail + 40}" y1="${cy + 140}" x2="${tail + 40}" y2="${cy + 160}" class="dg-dimline"/>`;
  s += `<line x1="${W - 24}" y1="${cy + 140}" x2="${W - 24}" y2="${cy + 160}" class="dg-dimline"/>`;
  s += dgText((tail + 40 + W - 24) / 2, cy + 170, '500 m — §12.2.12', 'dg-t--danger', 'middle');

  // Forward clearance dimension.
  s += dgAxis(nose + 103, cy - 58, nose + 103, cy - 116);
  s += dgText(nose + 112, cy - 92, '10 m — §12.2.11', 'dg-t--danger');

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
  const W = 680, H = 500;
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
  s += `<rect x="20" y="466" width="640" height="26" rx="13" class="dg-panel"/>`;
  s += dgText(32, 483, 'Do not drive through smoke · do not drive over wreckage · do not block emergency vehicle entry or exit', 'dg-t--warn');

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
    dgText(30, 110, 'AT — theoretical, from aircraft L and W', 'dg-t--dim') +
    dgText(30, 136, 'See the critical area diagram', 'dg-t--dim'), 'accent');

  // Step 2 — the rate and time.
  s += box(240, 46, 200, 132, '2 · Rate × time',
    dgText(250, 66, 'Q1 = A × R × T', 'dg-t--mono') +
    dgText(250, 90, 'R — rate of application (L/min/m²)', 'dg-t--dim') +
    dgText(250, 110, 'T — time of application (min)', 'dg-t--dim') +
    dgText(250, 136, 'Both come from Annex 14', 'dg-t--dim'), 'accent');

  // Step 3 — the sustainment term.
  s += box(460, 46, 200, 132, '3 · Then sustain',
    dgText(470, 66, 'Q = Q1 + Q2', 'dg-t--mono') +
    dgText(470, 90, 'Q2 — hold control, then extinguish', 'dg-t--dim') +
    dgText(470, 110, 'Not calculated — read from', 'dg-t--dim') +
    dgText(470, 124, 'the Annex 14 graph', 'dg-t--dim') +
    dgText(470, 146, '≈0% at cat 1 → ≈190% at cat 10', 'dg-t--warn'), 'warn');

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
    caption: '<b>Water quantity.</b> Total water is Q1 + Q2, where Q1 = A × R × T controls the fire in the practical critical area and Q2 sustains control and finishes the job. Q2 cannot be calculated exactly and is read from the Annex 14 graph — §2.4.7 to §2.4.9. Verify every figure against the current edition before operational use.' }
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
