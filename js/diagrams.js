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
   LEVEL DETERMINATION
   The category matrix as a lookup, with the worked reading that trips
   people up: the critical aircraft sets the category, and the width band
   is discrete.
   ========================================================================= */

function dLevelDetermination() {
  const W = 680, H = 500;
  let s = '';

  s += dgText(20, 22, 'Category determination — the lookup', 'dg-t--title');
  s += dgText(20, 42, 'Find the row for overall length, then the column for maximum fuselage width. The cell is the category.', 'dg-t--dim');

  // Matrix geometry: 7 width columns, 6 length rows.
  const gx = 168, gy = 66;
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
  s += dgText(stepX + 8, gy - 34, '6-7 m vs over 7 m —', 'dg-t--accent');
  s += dgText(stepX + 8, gy - 20, 'one step, big consequence', 'dg-t--accent');

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
  const W = 680, H = 620;

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
  s += `<rect x="20" y="${ly}" width="640" height="140" rx="14" class="dg-panel"/>`;
  const rows = [
    ['1', '§15.2(c)2 — a cleared path is maintained to permit rapid removal of the fuelling vehicle from the aircraft in an emergency'],
    ['2', '§15.2(c)1 — the fuelling vehicle is positioned so that accessibility to the aircraft by RFF vehicles is not interrupted'],
    ['3', '§15.2(c)3 — it does not obstruct evacuation from occupied portions of the aircraft in the event of a fire'],
    ['4', '§15.2(c)4 — vehicle engines are not under the wing.  §15.2(d) — other servicing vehicles are not driven or parked under wings'],
    ['5', '§15.2(e), (f) — no open flame or lighted open flame device within 15 m; lighters and matches not carried or used'],
    ['6', '§15.2(h) — abnormally heated undercarriage: the RFF service is called and fuelling does not take place until the heat dissipates']
  ];
  rows.forEach((r, i) => {
    const y = ly + 26 + i * 20;
    s += `<circle cx="42" cy="${y - 4}" r="10" class="dg-chip"/>`;
    s += dgText(42, y - 3.5, r[0], 'dg-t--chip', 'middle');
    s += dgText(62, y, r[1], 'dg-t--dim');
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
  const W = 680, H = 620;

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
  s += `<rect x="20" y="${ly}" width="640" height="140" rx="14" class="dg-panel"/>`;
  const rows = [
    ['1', 'Collection area \u2014 initial collection of the seriously injured from the debris. Custody transfers from RFF personnel to medical services here, though usually at the triage area. §9.5.1(a)'],
    ['2', 'Triage area \u2014 at least 90 m upwind of the accident site to avoid exposure to fire and smoke. More than one may be established. §9.5.1(b)'],
    ['3', 'Care area \u2014 one area subdivided into Immediate (I), Delayed (II) and Minor (III). Colour coded red, yellow, green; cones or flags may be used. §9.5.1(c)'],
    ['4', 'Transportation area \u2014 recording, dispatching and evacuation, sited between the care area and the egress road. §9.5.1(d)'],
    ['\u2191', 'Where movement is unavoidable: shortest distance possible, well away from firefighting operations, and upwind and uphill. §9.2.5']
  ];
  rows.forEach((r, i) => {
    const y = ly + 24 + i * 24;
    s += `<circle cx="42" cy="${y - 4}" r="10" class="dg-chip"/>`;
    s += dgText(42, y - 3.5, r[0], 'dg-t--chip', 'middle');
    s += dgText(62, y, r[1], 'dg-t--dim');
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
  const W = 680, H = 420;

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
    const y = 262 + Math.floor(i / 2) * 48;
    s += `<rect x="${x}" y="${y}" width="310" height="40" rx="8" class="dg-cell"/>`;
    s += dgText(x + 12, y + 17, d[0], 'dg-t--chip');
    s += dgText(x + 12, y + 32, d[1], 'dg-t--dim');
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
    s += dgText(x + 12, yy + 34, b[1].slice(0, 52), 'dg-t--dim');
    s += dgText(x + 12, yy + 47, b[1].slice(52), 'dg-t--dim');
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
