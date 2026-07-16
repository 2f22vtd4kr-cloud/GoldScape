/**
 * property-dna.ts
 *
 * Machine-readable "Visual DNA" for every listing.
 *
 * ─────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS
 * ─────────────────────────────────────────────────────────────────
 * Every image for a listing — exterior, section, floor plan, life
 * scene, bizarre scene — must look like it belongs to the SAME
 * building in the SAME location.  Without a shared anchor the AI
 * picks a different interpretation of "white Mediterranean apartment"
 * every time, producing scenes that feel like stock-photo collages.
 *
 * The fix: every prompt for listing N begins with the same verbatim
 * ANCHOR BLOCK produced by `buildAnchor(N)`.  Scene-specific text
 * comes after.  The anchor is never omitted, never paraphrased.
 *
 * ─────────────────────────────────────────────────────────────────
 * HOW TO GENERATE A SCENE
 * ─────────────────────────────────────────────────────────────────
 * 1. Get the anchor:
 *      const anchor = buildAnchor(18);
 *
 * 2. Write the scene-specific suffix (what is happening, camera,
 *    lighting mood, any objects added for life/bizarre scenes).
 *
 * 3. Concatenate:
 *      const prompt = anchor + '\n\n' + scenePrompt;
 *
 * 4. Always append the universal prohibitions:
 *      const prompt = anchor + '\n\n' + scenePrompt + '\n\n' + PROHIBITIONS;
 *
 * 5. Pass to generateImage with resolution: 'high'.
 *
 * ─────────────────────────────────────────────────────────────────
 * WHAT MAKES A GOOD ANCHOR
 * ─────────────────────────────────────────────────────────────────
 * The anchor describes five things with PRECISE, SPECIFIC language —
 * no adjectives that could be interpreted differently each run:
 *
 *   BUILDING    Exact facade: material, color, era, roof, window type,
 *               balcony rail type.  Include one or two details that are
 *               unique to this property (e.g. "corner pilaster", "blue
 *               shutters on the piano nobile").
 *
 *   SITE        What surrounds the building: rocky coastline / urban
 *               street / forested hillside, plus approximate distance to
 *               the water / road / landscape feature.
 *
 *   LANDMARK    The single most distinctive element visible outside every
 *               south/west-facing window.  Must be precise enough that
 *               the AI renders the same thing every time (e.g. NOT
 *               "mountains" — instead "steep bare limestone mountains,
 *               grey-white rock with sparse pine scrub, rising directly
 *               behind Perast village across the bay").
 *
 *   INTERIOR    Floor material, wall finish, ceiling height, window/door
 *               frame color.  This is what every interior scene shares.
 *
 *   PALETTE     5–7 specific color names that define the scene's gamut.
 *               Avoid generic names: "pearl white / Kotor-bay silver-blue
 *               / travertine beige" beats "white / blue / beige".
 *
 * ─────────────────────────────────────────────────────────────────
 * SCENE-TYPE CONVENTIONS
 * ─────────────────────────────────────────────────────────────────
 * exterior    Wide establishing shot of the full facade.  Camera at
 *             slight elevation (25–35°), showing at least two facade
 *             planes.  Surrounding site visible.  Same time-of-day as
 *             the exterior.lightingSetup.
 *
 * section     Dolls-house cutaway: roof lifted, front wall removed,
 *             all floors stacked and visible simultaneously.  45°
 *             isometric camera.  Same interior materials as anchor.
 *             The landmark must be visible through the rear windows.
 *
 * floorplan   Pure top-down isometric (60–70° elevation), roof removed.
 *             Same interior materials.  The site (water, rock, street)
 *             must be visible at the correct facade edge.  NO white/
 *             grey void background — site context stays visible.
 *
 * life_*      Interior or terrace scene.  Must show the correct floor,
 *             walls, window frames.  The landmark must be visible through
 *             the glass.  People are allowed in life scenes but optional.
 *             Keep furniture style consistent with the property's palette.
 *
 * bizarre     Isometric room cutaway (same as section camera).  Same
 *             interior materials as anchor.  Landmark visible through
 *             the correct window.  No dark/void background — the building
 *             sits in its real-world site context.
 */

export interface PropertyDNA {
  id: number;
  name: string;

  /** Verbatim paragraph prepended to every prompt for this listing. */
  anchor: {
    building: string;
    site: string;
    landmark: string;
    interior: string;
    palette: string;
  };

  /** Golden-hour lighting setup used for exterior + life-terrace scenes. */
  lightingSetup: string;

  /**
   * Per scene-type: a one-line camera/framing instruction appended after
   * the anchor block but before the scene-specific description.
   */
  cameraByType: Partial<Record<string, string>>;
}

/** Boilerplate appended to EVERY prompt. Never omit or paraphrase. */
export const PROHIBITIONS = [
  'NO text, labels, numbers, annotations, compass roses, or UI overlays baked into the image.',
  'NO human figures, silhouettes, or shadows of people (exception: life_* scenes where the brief explicitly adds people).',
  'NO hand-drawn, sketch, watercolor, or illustration rendering style.',
  'NO plain white, grey, or black void backgrounds — the building always sits in its real geographic context.',
  'Photorealistic 3D architectural render, ultra-high detail.',
].join(' ');

/**
 * Returns the full anchor block string for a given listing.
 * Paste this verbatim at the start of every scene prompt.
 */
export function buildAnchor(listingId: number): string {
  const dna = PROPERTY_DNA[listingId];
  if (!dna) throw new Error(`No DNA defined for listing ${listingId}`);
  const { anchor } = dna;
  return [
    `THE PROPERTY (${dna.name}):`,
    anchor.building,
    '',
    'THE SITE:',
    anchor.site,
    '',
    'THE LANDMARK — visible through every south/west-facing window and from every terrace:',
    anchor.landmark,
    '',
    'THE INTERIOR (all rooms share these materials):',
    anchor.interior,
    '',
    'PALETTE:',
    anchor.palette,
  ].join('\n');
}

/**
 * Builds a complete ready-to-use prompt for a given listing + scene type.
 * @param listingId  Property ID.
 * @param sceneType  e.g. 'exterior' | 'section' | 'floorplan' | 'life_bbq' | 'bizarre'
 * @param sceneDesc  Scene-specific description (what is happening, objects, mood).
 */
export function buildPrompt(
  listingId: number,
  sceneType: string,
  sceneDesc: string,
): string {
  const dna = PROPERTY_DNA[listingId];
  if (!dna) throw new Error(`No DNA defined for listing ${listingId}`);
  const camera = dna.cameraByType[sceneType] ?? dna.cameraByType['default'] ?? '';
  const parts = [
    buildAnchor(listingId),
    '',
    camera ? `CAMERA / FRAMING: ${camera}` : '',
    '',
    'SCENE:',
    sceneDesc,
    '',
    'RENDER RULES:',
    PROHIBITIONS,
  ].filter(Boolean);
  return parts.join('\n');
}

/* ══════════════════════════════════════════════════════════════════
   PROPERTY DNA RECORDS
   ══════════════════════════════════════════════════════════════════ */

export const PROPERTY_DNA: Record<number, PropertyDNA> = {

  /* ── 12 · Belgrade Savski Venac (Estitor) ──────────────────────── */
  12: {
    id: 12,
    name: 'Belgrade Savski Venac — Pre-war apartment, Estitor',
    anchor: {
      building: [
        'A 1930s Art Deco inter-war residential apartment building in Belgrade Savski Venac.',
        'Five-storey corner building clad in pale Belgrade-grey limestone ashlar.',
        'Classical facade with period ornamental cornices at each floor level, pilasters framing the corner bay,',
        'and tall narrow double-hung wooden sash windows (1.0 m wide × 2.2 m tall) with white-painted timber frames.',
        'The apartment occupies the second floor of this corner block.',
        'Roof: traditional slate mansard with copper-green gutters.',
        'Street level: stone-paved pavement, period street lamps, parked early-20th-century style cars.',
      ].join(' '),
      site: [
        'Savski Venac residential quarter, Belgrade, Serbia.',
        'Dense pre-war streetscape: similar limestone apartment blocks 4–6 floors, mature linden trees',
        'lining the avenue, occasional 19th-century iron balcony railings on neighbouring facades.',
        'The Kalemegdan fortress park tree canopy is visible above the rooftops to the north-east.',
      ].join(' '),
      landmark: [
        'The Kalemegdan fortress and park: ancient stone ramparts, a medieval round tower, and a dense',
        'green oak canopy visible above the city roofline to the north-east.',
        'Through the sash windows on the north-east aspect, the terracotta rooftops of the old fortress',
        'neighbourhood cascade downhill toward the Sava river, with the Belgrade Waterfront glass towers',
        'glinting on the far bank.',
      ].join(' '),
      interior: [
        'Restored honey-coloured chevron parquet floor (solid oak, 7 cm × 35 cm strips).',
        'Smooth white lime plaster walls with period-original plaster cornices (egg-and-dart profile) at',
        '3.0 m ceiling height. Ceiling: flat lime plaster, painted white.',
        'Window frames: white-painted wood. Interior doors: tall (2.4 m) panelled oak doors with brass hardware.',
        'Kitchen: stone countertops, cream shaker cabinetry.',
        'Bathroom: metro white tile, chrome fixtures, clawfoot cast-iron bath.',
      ].join(' '),
      palette: 'Warm honey parquet · Belgrade-grey limestone · ivory plaster · brass gold · Sava steel-blue (distant) · slate charcoal (roof)',
    },
    lightingSetup: 'Late-afternoon sun (16:00–17:00 Belgrade summer) from the south-west; warm 3800 K golden light raking across the limestone facade, casting long rectangular shadows from window mullions.',
    cameraByType: {
      exterior: 'Street-level perspective, camera at 25° elevation facing the corner of the building so two facade planes are visible. Building fills 70 % of frame. Street and linden trees in foreground.',
      section: '45° isometric cutaway, viewer faces the south-west corner. Front and right walls removed. All five floors visible stacked. Kalemegdan visible through the rear sash windows.',
      floorplan: '65° top-down isometric, roof slab removed. Interior fully exposed. Street and adjacent rooftops visible at correct edges. No white background.',
      life_remote_work: 'Interior wide shot from the far corner of the living room toward the north-east sash window. Laptop on a period writing desk, the Kalemegdan roofline visible through the glass.',
      bizarre: '45° isometric cutaway of the living room, same angle as section. Viewer faces south-west corner. The heist planning table occupies the centre of the room.',
      default: '45° isometric camera, slight elevation, three-quarter view showing two interior walls.',
    },
  },

  /* ── 18 · Dobrota, Kotor Bay (Sotheby's International Realty) ─── */
  18: {
    id: 18,
    name: 'Dobrota Waterfront — Modern apartment, Kotor Bay, Montenegro',
    anchor: {
      building: [
        'A contemporary three-floor waterfront residential building in Dobrota, Montenegro.',
        'Smooth white sand-render facade, flat concrete roof with thin overhanging slab edges.',
        'Dark anthracite aluminium window frames throughout.',
        'Each floor has a full-width terrace with frameless tempered-glass balcony railings.',
        'Terrace floors: large-format pale travertine tiles (60×120 cm, cream-beige).',
        'Ground floor sits directly above raw grey limestone rocks at the waterline.',
        'The building is three bays wide; the central bay slightly projects forward as a shallow volume.',
        'Neighbours on left: traditional Montenegrin stone house with terracotta pantile roof.',
      ].join(' '),
      site: [
        'Dobrota village, Kotor Bay, Montenegro — first-row waterfront position.',
        'The building footprint is separated from the Bay of Kotor water by only 4–6 m of raw limestone rock.',
        'Rocky shoreline with Mediterranean scrub (wild rosemary, sage, sparse stone-pine).',
        'To the left (east): the continuation of the Dobrota coastal road and traditional stone village houses.',
        'Behind the building (north): steep limestone mountain flank of Lovćen massif rising almost',
        'vertically — bare grey-white karstic rock with sparse dark-green Mediterranean pine.',
      ].join(' '),
      landmark: [
        'The Bay of Kotor: flat, deep ultramarine-blue water with subtle mirror reflections.',
        'Directly opposite across the bay (3.5 km): the tiny artificial island of Gospa od Škrpjela',
        '(Our Lady of the Rocks) — a small rocky mound with a single 17th-century Baroque church:',
        'terracotta-orange dome, white limestone bell tower, surrounded by a cluster of dark cypress trees.',
        'Behind the island: Perast village — a row of terracotta-roofed Venetian-era stone buildings on',
        'the far shore. Behind Perast: sheer bare limestone mountains rising 1500 m, grey-white rock face',
        'with thin horizontal vegetation bands.',
        'This landmark is ALWAYS visible through the south-facing floor-to-ceiling glass sliding doors.',
      ].join(' '),
      interior: [
        'Large-format pale cream travertine tile floors (60×120 cm) throughout all rooms including bathrooms.',
        'Walls: smooth white plaster, flat finish, no mouldings.',
        'Ceiling: flat white plaster, 2.85 m height, thin recessed LED strip at ceiling perimeter.',
        'All window and door frames: dark anthracite aluminium profiles (RAL 7016).',
        'South wall of living room: three full-height (floor-to-ceiling, 2.85 m) sliding glass panels',
        'opening onto the travertine terrace — these always frame the Bay-of-Kotor landmark view.',
        'Kitchen cabinetry: handleless warm natural oak veneer, white stone countertop.',
        'Bathroom: same travertine tile, wall-mounted matt white fixtures, rain shower with frameless glass screen.',
      ].join(' '),
      palette: 'Pearl white render · anthracite aluminium · pale cream travertine · Kotor-bay ultramarine-blue · warm natural oak · limestone grey · cypress dark-green',
    },
    lightingSetup: 'Mid-morning sun (09:30–11:00 local summer) from the south-east; cool-warm 5500 K natural light; the white facade is fully lit and bright, the bay shimmers with gentle highlights.',
    cameraByType: {
      exterior: 'Camera at 30° elevation, positioned in the bay (slight elevation above water level), facing north. Full three-floor facade visible. Rocky shoreline foreground. Gospa od Škrpjela island visible behind/beside building.',
      section: '45° isometric dolls-house cutaway. Roof lifted, south facade removed. All three floors stacked and visible simultaneously. The Bay of Kotor and Gospa od Škrpjela island visible through the rear (north-facing in cutaway = actual south facade) glass panels.',
      floorplan: '65° top-down isometric, roof removed. Travertine floor pattern and furniture visible. The bay water edge visible at the south side of the floorplan. No white or grey background — rock, water, and road context visible at all building edges.',
      life_bbq: 'Camera at 35° elevation, positioned above and to the east of the terrace, looking west. The full terrace is visible in foreground; the bay with Gospa od Škrpjela and Perast beyond fills the background. Time of day: dusk / blue-hour (21:00), warm terrace lighting, cool blue bay.',
      bizarre: '45° isometric cutaway of the living room, south wall removed so viewer looks in from the bay side. The Gospa od Škrpjela island is visible in the bay directly behind the room cutaway. Same travertine floor, white plaster walls, anthracite frames.',
      default: '45° isometric camera, three-quarter view, interior visible through removed south wall.',
    },
  },

  /* ── 19 · Sveti Stefan, Budva Riviera (Monteonline) ─────────────── */
  19: {
    id: 19,
    name: 'Sveti Stefan Hillside — Boutique apartment, Budva Riviera, Montenegro',
    anchor: {
      building: [
        'A boutique two-floor hillside residential building in Sveti Stefan, Montenegro.',
        'White smooth render exterior with natural limestone stone-cladding accent panels on the ground floor.',
        'Shallow-pitch terracotta pan-tile roof on the upper volume.',
        'Slim dark-bronze aluminium window frames.',
        'The west-facing facade has a single floor-to-ceiling frameless glass sliding door (2.4 m wide)',
        'opening onto a cantilevered limestone-tiled terrace with a slim stone parapet wall.',
        'Terraced hillside garden below: Mediterranean planting — lavender, rosemary, olive trees,',
        'natural limestone retaining walls stepping down to the coastal road.',
      ].join(' '),
      site: [
        'Sveti Stefan peninsula, Budva Riviera, Montenegro — elevated hillside position.',
        'The building sits on a terraced slope approximately 80 m above sea level.',
        'Immediately behind (east): the steep Adriatic hillside covered in pine forest.',
        'Below (west): the coastal road, a narrow strip of beach, and then the Adriatic Sea.',
        'To the south (visible in the distance): the Budva old-town peninsula silhouette.',
      ].join(' '),
      landmark: [
        'The Sveti Stefan island — the most recognisable landmark on the Montenegrin coast.',
        'A small rocky islet (250 m long) completely covered by a dense cluster of terracotta-roofed',
        'medieval stone houses, connected to the mainland by a narrow sand causeway.',
        'The island sits in turquoise-to-deep-blue Adriatic water 300 m offshore.',
        'The causeway beach has fine white sand.',
        'Beyond the island: open Adriatic horizon, occasionally with faint silhouettes of distant islands.',
        'This landmark is ALWAYS visible through the west-facing glass sliding door and terrace.',
      ].join(' '),
      interior: [
        'Light honey herringbone oak parquet floor (classic 45° herringbone, 7×35 cm strips) throughout living areas.',
        'Bathroom and kitchen: same pale limestone tile as terrace (40×40 cm, warm grey-beige).',
        'Walls: smooth white plaster, warm tone. Stone accent wall on one side of the living room:',
        'natural rough-cut local limestone blocks, cream-honey colour.',
        'Ceiling: flat white plaster, 2.75 m height, exposed dark-stained oak beam accent.',
        'Window/door frames: dark bronze aluminium.',
        'Kitchen: terracotta-toned linen-textured cabinetry, natural limestone countertop.',
        'Bathroom: wall-hung white ceramic fixtures, brass hardware, natural stone shelf niches.',
      ].join(' '),
      palette: 'Adriatic turquoise · white plaster · honey herringbone oak · warm limestone grey-beige · terracotta pan-tile · dark bronze aluminium · deep Adriatic ultramarine',
    },
    lightingSetup: 'Late afternoon (17:00–18:30 summer) from the west; warm golden 4200 K back-lighting on the building from the sea side; long warm shadows from the terrace parapet; the Sveti Stefan island glows amber in the golden-hour light.',
    cameraByType: {
      exterior: 'Camera at 25° elevation, positioned west (above the sea), facing east. Full west facade visible with the terrace and glass door. Sveti Stefan island in the foreground-left. Hillside behind the building.',
      section: '45° isometric dolls-house cutaway. East wall removed. Both floors stacked. Stone accent wall visible on the living room interior. Sveti Stefan island visible through the west-facing glass door.',
      floorplan: '65° top-down isometric, roof removed. Herringbone parquet floor pattern visible. Adriatic sea edge and causeway visible at the west side. No white background.',
      life_remote_work: 'Interior shot from the east corner of the living room looking west toward the glass sliding door. Compact desk setup with laptop. Sveti Stefan island filling the glass opening.',
      bizarre: '45° isometric cutaway of the bathroom, west wall removed. Sveti Stefan island visible through the bathroom window. Bengal tiger lying in the travertine wet-room shower tray, paw hanging over the edge.',
      default: '45° isometric camera, west wall removed, interior visible.',
    },
  },

  /* ── 20 · Belgrade Waterfront (Atrium Property Services) ─────────── */
  20: {
    id: 20,
    name: 'Belgrade Waterfront — High-rise corner apartment, BW Terraces',
    anchor: {
      building: [
        'A contemporary glass-and-steel residential tower in the Belgrade Waterfront (Beograd na Vodi) district.',
        'The specific apartment is on the 14th floor of a high-rise corner tower.',
        'Facade: floor-to-ceiling double-glazed curtain-wall glass panels in a grid of slim brushed-steel mullions.',
        'Corner treatment: the two facade planes meet at a glass corner column with no frame obstruction,',
        'creating a seamless 270° panoramic view from the corner living room.',
        'Balcony: a narrow full-width terrace on the west facade with a slim brushed-steel and glass railing.',
        'The tower base integrates with the Sava quayside promenade: landscaped waterfront boulevard,',
        'uniform linden-tree rows, high-quality granite paving.',
      ].join(' '),
      site: [
        'Belgrade Waterfront (Beograd na Vodi) quayside, right bank of the Sava river, Belgrade, Serbia.',
        'The tower stands on the redeveloped former railway yard, now a modern mixed-use district.',
        'Immediately west: the Sava river (wide, slow-moving, grey-green).',
        'South: the quayside promenade with linden trees, cafés, the distinctive BW shopping mall glass dome.',
        'North-east (14 floors up): the Kalemegdan fortress ramparts, park trees, and the Sava-Danube confluence.',
      ].join(' '),
      landmark: [
        'The Sava river and Kalemegdan fortress — visible simultaneously from the corner apartment.',
        'West view: the wide Sava river; on the far bank the low forested Ada Ciganlija island.',
        'North view: the ancient Kalemegdan fortress ramparts — honey-limestone Roman-era walls,',
        'a round medieval tower, and the dense oak-forest park canopy spreading behind the ramparts.',
        'Below: the Belgrade Waterfront quayside promenade with linden trees and terrace cafés.',
        'These views are ALWAYS visible through the west and north glass curtain-wall panels.',
      ].join(' '),
      interior: [
        'Wide-plank light natural oak engineered-wood floor (20 cm width, light matte finish) throughout.',
        'Walls: smooth white mineral render, flat finish.',
        'Ceiling: 3.0 m flat white, recessed LED downlights in a grid.',
        'Window/curtain-wall frames: slim brushed-steel / warm aluminium anodised (champagne).',
        'Kitchen: handleless gloss-white cabinetry, Calacatta marble-look island countertop, integrated appliances.',
        'Bathrooms: large-format Calacatta marble-look porcelain tile (wall + floor), brass hardware.',
        'Living room: the two glass curtain-wall facades frame Sava (west) and Kalemegdan (north) simultaneously.',
      ].join(' '),
      palette: 'Cool steel-blue Sava water · brushed champagne steel · light natural oak · Calacatta white-grey marble · warm brass · honey Kalemegdan limestone (distant) · deep forest green (Kalemegdan park)',
    },
    lightingSetup: 'Late afternoon (16:30–17:30) low sun from the west over the Sava; warm amber-gold 4000 K light streaming through the west curtain-wall; the river surface blazes with reflections; interior glows warm against the cool steel exterior.',
    cameraByType: {
      exterior: 'Camera at slight elevation (drone, 30°), positioned above the Sava river facing east. Full corner of the tower visible — west and north facades simultaneously. Quayside promenade in foreground, Kalemegdan in far background.',
      section: '45° isometric dolls-house cutaway. South and west walls removed. All visible floors (12–14) stacked. Sava river and Kalemegdan visible through the glass curtain-wall.',
      floorplan: '65° top-down isometric, ceiling removed. Light oak floor and furniture visible. Sava river visible at the west building edge. No white background.',
      life_matchday: 'Interior wide shot from the east wall of the corner living room. Large wall-mounted TV showing a UEFA Champions League match. Floor-to-ceiling glass fills the north and west walls — Sava and Kalemegdan glowing at twilight outside.',
      bizarre: '45° isometric cutaway of the living room corner, south and west walls removed. Tesla coil occupying the corner, electric arcs visible. Sava river and Kalemegdan visible through the glass.',
      default: '45° isometric camera, two glass walls visible, interior exposed.',
    },
  },
};
