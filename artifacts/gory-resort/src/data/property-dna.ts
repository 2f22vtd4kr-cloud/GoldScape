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
      exterior: 'ENTIRE building visible from pavement to slate mansard roof — camera pulled back so nothing is cropped. Building fills maximum 55% of frame height. Street-level perspective, camera at 25° elevation facing the corner so two facade planes are visible. Street, linden trees, and neighbouring facades visible in foreground and sides.',
      section: 'ALL FIVE FLOORS visible from ground-floor pavement to attic ridge — none cropped. Pull camera back so the full stacked building fits within frame with a 15% margin at top and bottom. 45° isometric cutaway, viewer faces the south-west corner. Front and right walls removed. Kalemegdan visible through the rear sash windows.',
      floorplan: 'ENTIRE floor plan within frame — all four exterior walls visible, no rooms cropped at edges. 65° top-down isometric, roof slab removed. Interior fully exposed. Street and adjacent rooftops visible at correct edges. No white background.',
      life_remote_work: 'Interior wide shot from the far corner of the living room — full room visible, do not zoom into the desk or window. Laptop on a period writing desk, the Kalemegdan roofline visible through the glass.',
      bizarre: '45° isometric cutaway of the living room, same angle as section. ENTIRE room visible from floor to ceiling — all four walls in frame. Viewer faces south-west corner. Ocean\'s Eleven (2001) casino-heist planning: a large round table covered with architectural blueprints of the Bellagio vault, casino-chip stacks, hotel security badges, walkie-talkies, and a scaled model of the vault mechanism. The Kalemegdan fortress silhouette visible through the sash window behind the table.',
      default: '45° isometric camera, slight elevation, three-quarter view showing two interior walls. Full room visible, not zoomed in.',
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
      exterior: 'ENTIRE three-floor building visible from limestone rock base to flat concrete roof edge — camera pulled back so no floor or overhang is cropped. Building fills maximum 55% of frame height. Camera at 30° elevation, positioned above the bay facing north. Rocky shoreline foreground. Gospa od Škrpjela island visible behind/beside the building. Context visible on all sides.',
      section: 'ALL THREE FLOORS visible from rocky base to roof slab — none cropped. Pull camera back so the full stacked building fits in frame with 15% margin top and bottom. 45° isometric dolls-house cutaway. Roof lifted, south facade removed. All floors stacked and visible simultaneously. The Bay of Kotor and Gospa od Škrpjela island visible through the glass panels.',
      floorplan: 'ENTIRE building footprint within frame — all four exterior walls visible, no rooms cropped. 65° top-down isometric, roof removed. Travertine floor pattern and furniture visible. Bay water edge visible at the south side. No white or grey background — rock, water, and road context at all building edges.',
      life_bbq: 'Camera at 35° elevation above and to the east, looking west. FULL terrace visible — no edges cropped. The bay with Gospa od Škrpjela and Perast fills the background. Blue-hour (21:00), warm terrace lights, cool cobalt bay.',
      bizarre: '45° isometric cutaway of the living room, south wall removed so viewer looks in from the bay side. ENTIRE room visible from floor to ceiling — all four walls in frame. The Big Blue (Le Grand Bleu, 1988) freediving scene: Jacques Mayol\'s competition freediving equipment fills the travertine living room — a long carbon-fibre monofin leaned against the white plaster wall, a competition weight-belt on the coffee table, depth gauge and dive computer on the floor, two aluminium freediving fins crossed on the rug, a competition trophy on the shelf, a coiled dive rope and inflatable buoy beside the glass door. Gospa od Škrpjela island glowing in the bay through the glass panels.',
      default: '45° isometric camera, three-quarter view, interior visible through removed south wall. Full room visible, not zoomed in.',
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
      exterior: 'ENTIRE building visible from terraced garden base to terracotta roof ridge — camera pulled back so no floor or parapet is cropped. Building fills maximum 55% of frame height. Camera at 25° elevation, positioned west above the sea, facing east. Full west facade with terrace and glass door visible. Sveti Stefan island in the foreground-left. Pine-forested hillside behind the building. Site context visible on all sides.',
      section: 'BOTH FLOORS fully visible from foundation slab to ridge — none cropped. Pull camera back so the full two-floor stack fits in frame with 15% margin top and bottom. 45° isometric dolls-house cutaway. East wall removed. Stone accent wall and exposed oak beam visible on the living room interior. Sveti Stefan island visible through the west-facing glass door.',
      floorplan: 'ENTIRE floor plan within frame — all four exterior walls visible, no rooms cropped. 65° top-down isometric, roof removed. Herringbone parquet floor pattern visible. Adriatic sea edge and causeway visible at the west side. No white background.',
      life_remote_work: 'Interior wide shot from the east corner of the living room — entire room visible, do not crop the stone accent wall or the ceiling beam. Compact desk setup with laptop. Sveti Stefan island filling the glass opening.',
      bizarre: '45° isometric cutaway of the bathroom, west wall removed. ENTIRE bathroom visible from floor to ceiling — all four walls in frame. The Hangover (2009): Bengal tiger lying in the limestone wet-room shower tray, massive paw hanging over the edge. Sveti Stefan island visible through the bathroom window. Same herringbone parquet in hallway beyond bathroom door.',
      default: '45° isometric camera, west wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 1 · Dubai Marina (Bayut) ──────────────────────────────────────── */
  1: {
    id: 1,
    name: 'Dubai Marina — High-rise apartment, Marina Walk waterfront',
    anchor: {
      building: [
        'A contemporary 40-floor glass residential tower on Dubai Marina\'s eastern canal bank.',
        'Facade: full-height double-glazed curtain-wall panels in slim champagne-anodised aluminium mullions.',
        'Narrow curved balcony per unit on the west facade with a powder-coated steel and glass parapet.',
        'The tower base integrates with Marina Walk: a granite-paved promenade lined with date palms and restaurant terraces.',
        'Neighbouring towers: similar-height residential glass towers with illuminated crown details.',
      ].join(' '),
      site: [
        'Dubai Marina yacht canal district, Dubai, UAE.',
        'The tower stands directly on the canal bank — 8 m of granite quayside separate the lobby from the water.',
        'Opposite bank: a dense row of high-rise glass towers (JBR Jumeirah Beach Residence skyline).',
        'South: Dubai Marina Mall and yacht club basin.',
        'West: the Arabian Gulf glimpsed between tower gaps.',
      ].join(' '),
      landmark: [
        'The Dubai Marina canal: deep turquoise water packed with white superyachts and motor launches.',
        'The JBR towers skyline on the opposite bank — a wall of curved glass high-rises glittering in the sun.',
        'At night the canal reflects golden tower lights and moored yacht running lights.',
        'This view is ALWAYS visible through the west-facing curtain-wall glass and balcony.',
      ].join(' '),
      interior: [
        'Polished Carrara white marble floors throughout living areas (60×120 cm slabs, grey vein).',
        'Walls: smooth white gypsum plaster, flat finish.',
        'Ceiling: flat white gypsum, 2.8 m height, recessed LED downlights in a grid.',
        'All window and balcony door frames: slim champagne aluminium profiles.',
        'Open kitchen: white gloss handleless cabinetry, Calacatta marble countertop island.',
        'Master bath: floor-to-ceiling white porcelain tile, chrome rain shower.',
      ].join(' '),
      palette: 'Dubai-canal turquoise · champagne gold aluminium · Carrara marble white-grey · deep Arabian Gulf navy · JBR glass-tower silver · warm LED amber (night) · white plaster',
    },
    lightingSetup: 'Late afternoon sun (17:00–18:30 Dubai summer) from the west; warm 4200 K golden light; the canal surface blazes with reflections; tower glass turns amber-gold.',
    cameraByType: {
      exterior: 'ENTIRE tower visible from granite quayside base to illuminated roof crown — camera pulled far back so no floor is cropped. Building fills maximum 50% of frame height. Camera at 25° elevation, positioned above the canal water facing east. West facade fully lit. Marina Walk promenade and date palms in foreground, canal between camera and tower.',
      section: 'ALL VISIBLE FLOORS (3 representative levels stacked) fully visible — none cropped. 45° isometric dolls-house cutaway. West and south walls removed. Dubai Marina canal and JBR skyline visible through the curtain-wall panels. Pull camera back, 15% margin at top and bottom.',
      floorplan: 'ENTIRE apartment plan within frame — all perimeter walls visible, no rooms cropped. 65° top-down isometric, ceiling removed. Marble floor pattern and furniture visible. Canal water visible at west building edge. No white background.',
      life_marina_walk: 'Interior wide shot from the east wall of the living room — full room visible, balcony and canal in background. Late afternoon, warm golden light flooding through the west glass wall. Couple on the balcony with wine glasses, yachts below.',
      bizarre: '45° isometric cutaway of the living room, west wall removed so viewer looks in from the canal. ENTIRE room from floor to ceiling in frame. Heat (1995) diner scene transposed to the Dubai Marina apartment: two men in impeccable dark suits facing each other across a glass coffee table, espresso cups, two Glock 17s laid flat and visible, Dubai Marina canal blazing gold outside the glass. No faces legible.',
      default: '45° isometric camera, west wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 2 · Downtown Dubai (PropertyFinder) ───────────────────────────── */
  2: {
    id: 2,
    name: 'Downtown Dubai — 2BR apartment, Burj Khalifa view',
    anchor: {
      building: [
        'A 55-floor contemporary glass residential tower in Downtown Dubai\'s Opera District.',
        'Full curtain-wall glass facade with dark bronze anodised aluminium fins projecting from every alternate floor.',
        'The apartment occupies a high floor; two full-height floor-to-ceiling glass panels form the north-west corner.',
        'The tower base opens onto a marble-paved boulevard lined with specimen olive trees.',
      ].join(' '),
      site: [
        'Downtown Dubai Opera District, adjacent to the Dubai Fountain and Burj Lake.',
        'The Burj Khalifa stands 400 m to the north-west — its needle-tip visible directly above the apartment\'s parapet.',
        'Below: the Dubai Fountain jets and Burj Lake — a shallow ornamental lake 275 m across.',
        'South: Emaar Boulevard with palm-lined retail terraces.',
      ].join(' '),
      landmark: [
        'The Burj Khalifa (828 m): a tapering steel-and-glass spire that dominates the northern skyline, its tripartite facade catching sunrise gold on the east panels every morning.',
        'The Dubai Fountain: white water jets arc up to 150 m from the lake surface in choreographed plumes, visible directly below.',
        'At night the Burj Khalifa glows with LED crown animations; the fountain blazes white under stadium lights.',
        'This landmark is ALWAYS visible through the north-west corner glass panels.',
      ].join(' '),
      interior: [
        'Wide-plank light-honey engineered oak floor (20 cm width, satin finish) throughout.',
        'Walls: smooth warm white mineral render.',
        'Ceiling: 3.1 m flat white plaster, hidden LED cove at the perimeter.',
        'All frames: dark bronze anodised aluminium profiles.',
        'Kitchen: handleless gloss warm-grey cabinetry, Statuario marble island (2.4 m long), integrated Miele appliances.',
        'Master bath: floor-to-ceiling Arabescato marble tile, freestanding oval bath, brushed-gold fixtures.',
      ].join(' '),
      palette: 'Burj Khalifa steel-silver · Dubai-fountain white spray · honey engineered oak · Statuario marble cream-grey · dark bronze aluminium · warm LED cove-gold · deep Burj Lake navy-blue',
    },
    lightingSetup: 'Golden sunrise (06:30–07:30 Dubai) from the east; the Burj Khalifa east facade blazes gold; the Burj Lake reflects dawn pink and copper.',
    cameraByType: {
      exterior: 'ENTIRE tower from marble boulevard base to tapering roof — camera pulled far enough back so the crown is not cropped. Building fills maximum 50% of frame height. Camera at 30° elevation positioned south-east above the Burj Lake, facing north-west. Burj Khalifa partially visible to the left. Dubai Fountain lake in foreground.',
      section: 'FOUR REPRESENTATIVE FLOORS stacked and fully visible — none cropped. 45° dolls-house cutaway, north and west walls removed. Burj Khalifa needle visible through the corner glass. Pull camera back 15% margin top and bottom.',
      floorplan: 'ENTIRE 2BR plan within frame — all perimeter walls visible, no rooms cropped. 65° top-down isometric, ceiling removed. Oak floor and furniture visible. Burj Lake water visible at north-west building edge. No white background.',
      life_remote_work: 'Interior wide shot from the south-east corner of the living room — full room visible, both north and west glass walls in frame. Laptop on the Statuario marble dining table; Burj Khalifa in golden sunrise light fills the glass corner.',
      bizarre: '45° isometric cutaway of the living room, north and west glass walls removed. ENTIRE room from floor to ceiling in frame. Mission: Impossible — Ghost Protocol (2011) Burj Khalifa climb scene: climbing harness, magnetic gloves, and a Pelican case with field-op equipment laid out on the oak floor. A gecko-grip glove stuck to the glass wall. Burj Khalifa filling the glass frame outside.',
      default: '45° isometric camera, north-west glass corner removed, full room visible, not zoomed in.',
    },
  },

  /* ── 3 · Business Bay (DAMAC) ───────────────────────────────────────── */
  3: {
    id: 3,
    name: 'Business Bay — 2BR apartment, Dubai Water Canal view',
    anchor: {
      building: [
        'A 38-floor glass and dark-steel corporate-residential tower in Business Bay, Dubai.',
        'Facade: alternating bands of floor-to-ceiling clear glass and dark graphite-grey spandrel panels.',
        'The canal-facing (west) facade has a continuous projecting steel sun-shade blade on each floor.',
        'Lobby: triple-height glass atrium with dark granite reception desk.',
      ].join(' '),
      site: [
        'Business Bay, Dubai — central business district along the Dubai Water Canal.',
        'West: the Dubai Water Canal — a 3.2 km artificial waterway, 80 m wide, clear turquoise.',
        'North-east: the Downtown Dubai skyline with the Burj Khalifa tip visible 700 m away.',
        'South: DIFC Gate towers and Sheikh Zayed Road overpass.',
      ].join(' '),
      landmark: [
        'The Dubai Water Canal: a straight-cut turquoise waterway flanked by a landscaped canal walk with timber deck boardwalks and LED-lit palm trees.',
        'Across the canal to the west: a row of lower mixed-use buildings and the Sheikh Zayed Road flyover bridge — illuminated neon-blue at night.',
        'To the north: the Burj Khalifa needle punctuating the Downtown skyline.',
        'These views are ALWAYS visible through the west-facing floor-to-ceiling glass.',
      ].join(' '),
      interior: [
        'Grey polished porcelain tile floor throughout (80×80 cm, cool medium-grey).',
        'Walls: smooth white gypsum render, flat finish.',
        'Ceiling: 2.9 m flat white, recessed linear LED strips running north-south.',
        'All frames: dark graphite aluminium (RAL 7021).',
        'Kitchen: handleless dark-grey laminate cabinetry, large-format grey marble-look island (2.0 m).',
        'Concealed ceiling lighting niches running the full perimeter of the living room.',
        'Master bath: large-format dark charcoal porcelain tile, wall-mounted matt-white WC and basin, rain shower.',
      ].join(' '),
      palette: 'Canal turquoise · dark graphite aluminium · cool medium-grey porcelain · grey marble-look island · white plaster · LED neon-blue (night) · Burj-Khalifa silver (distant)',
    },
    lightingSetup: 'Mid-morning sun (10:00–11:30 Dubai) from the east; the west canal facade is in cool shadow; the canal water glints turquoise in reflected sky; the DIFC towers catch direct sun to the south.',
    cameraByType: {
      exterior: 'ENTIRE tower from granite base to roof plant — camera pulled back so roof is not cropped. Building fills maximum 50% of frame height. Camera at 28° elevation positioned above the Dubai Water Canal facing east. Canal in immediate foreground, canal walk boardwalk visible. Tower west facade and sun-shade blades fully visible.',
      section: 'THREE REPRESENTATIVE FLOORS stacked and fully visible. 45° dolls-house cutaway, west wall removed. Dubai Water Canal visible through the floor-to-ceiling glass. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE 2BR plan within frame — all perimeter walls visible. 65° top-down isometric, ceiling removed. Grey tile floor and furniture visible. Canal water at west building edge. No white background.',
      life_cowork: 'Interior wide shot from the east wall of the living room — full room visible. A coworking setup: two monitors on a long desk along the south wall, ergonomic chairs, noise-cancelling headphones. Dubai Water Canal glinting turquoise through the west glass wall.',
      bizarre: '45° isometric cutaway of the living room, west wall removed. ENTIRE room from floor to ceiling in frame. Wall Street (1987): Gordon Gekko\'s trading room transposed to the canal apartment — wall of six LED screens showing Bloomberg Terminal data (text not legible), a 1980s telephone console on the grey marble island, stacks of trading printouts on the grey tile floor. Canal and DIFC skyline visible outside the glass.',
      default: '45° isometric camera, west glass wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 15 · Palm Jumeirah (Knight Frank Dubai) ────────────────────────── */
  15: {
    id: 15,
    name: 'Palm Jumeirah — 3BR residence, frond waterfront, Dubai',
    anchor: {
      building: [
        'A 20-floor residential tower on a Palm Jumeirah frond, facing the Arabian Gulf to the west.',
        'Facade: smooth cielo bianco marble cladding panels on the lower podium, glass curtain-wall above.',
        'The 3BR residence occupies a full floor with a wrap-around terrace on the west, south, and north.',
        'Terrace: large-format travertine pavers, frameless glass balustrade.',
        'The building base integrates directly with a private beach: a 40 m strip of fine white sand and a private jetty.',
      ].join(' '),
      site: [
        'Palm Jumeirah artificial island, Dubai, UAE — western frond, facing the open Gulf.',
        'Directly west: the open Arabian Gulf — infinite blue horizon.',
        'South-west: the Burj Al Arab hotel silhouette on its own island (2.5 km).',
        'North: the trunk of the Palm, the Atlantis The Palm hotel pyramidal arches on the horizon.',
        'Below: private white-sand beach and jetty with moored tender craft.',
      ].join(' '),
      landmark: [
        'The Burj Al Arab hotel (321 m): a white sail-shaped structure on its own artificial island, rising from the Gulf 2.5 km to the south-west.',
        'At sunset the Burj Al Arab turns copper-gold against a crimson Gulf sky.',
        'Directly below: the private white-sand beach, turquoise shallows, and a private jetty with a Riva speedboat.',
        'This view is ALWAYS visible through the west-facing wrap-around terrace and full-height glass.',
      ].join(' '),
      interior: [
        'Cielo bianco marble floors throughout (60×120 cm slabs, soft cream with pale grey veining).',
        'Walls: smooth warm white stucco lucido finish, ultra-glossy.',
        'Ceiling: 3.0 m flat white with integrated LED coffers along the perimeter.',
        'All frames: dark wenge-stained timber profiles.',
        'Kitchen: Italian Arclinea cabinetry in dark wenge and stainless steel, Statuario marble worktops.',
        'Master bath: floor-to-ceiling Arabescato marble, freestanding bath, polished chrome fixtures.',
      ].join(' '),
      palette: 'Gulf turquoise-blue · Burj Al Arab white-sail · cielo bianco cream-marble · dark wenge · warm stucco lucido ivory · Arabescato marble white-grey · sunrise crimson-copper (horizon)',
    },
    lightingSetup: 'Sunset (18:30–19:30 Dubai) from the west over the Gulf; the Burj Al Arab silhouettes copper-red; the cielo bianco marble terrace glows warm amber; the Gulf surface blazes with reflected colour.',
    cameraByType: {
      exterior: 'ENTIRE tower from beach/jetty level to roof — camera far enough back so no floor cropped. Building fills maximum 50% of frame. Camera at 25° elevation above the Gulf water facing east. Private beach and jetty in foreground. Burj Al Arab visible to the lower-left on the Gulf horizon.',
      section: 'THREE REPRESENTATIVE UPPER FLOORS stacked and visible — none cropped. 45° dolls-house cutaway, west and south walls removed. Gulf, private beach, and Burj Al Arab visible through the glass. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE wraparound floor plan within frame — all perimeter walls and terrace edge visible. 65° top-down isometric, ceiling removed. Cielo bianco marble floors and furniture visible. Gulf water visible at west and south building edges. No white background.',
      life_beach: 'Wide shot from the west terrace looking back at the glass sliding doors — entire terrace and beach beyond visible. Morning, 08:00, the Gulf catching early gold light. Two teak sun loungers, a Private-island cooler, Burj Al Arab horizon to the south-west.',
      bizarre: '45° isometric cutaway of the master bedroom, west wall removed. ENTIRE room from floor to ceiling in frame. The Wolf of Wall Street (2013): a glass-top coffee table piled with rolled sheafs of $100 bills bound with rubber bands, a leather Hermès briefcase open on the cielo bianco floor, a magnum of Dom Pérignon mid-pour onto the marble beside it. The Gulf and Burj Al Arab silhouette outside the terrace glass.',
      default: '45° isometric camera, west wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 16 · Arabian Ranches Villa (Engel & Völkers Dubai) ─────────────── */
  16: {
    id: 16,
    name: 'Arabian Ranches — 4BR detached villa, golf course community',
    anchor: {
      building: [
        'A two-storey detached villa in Arabian Ranches gated golf community, Dubai.',
        'Facade: smooth white lime render with natural limestone band courses at each floor level.',
        'Pitched clay-tile roof in warm terracotta. Arched loggia at ground level across the front facade.',
        'Ground floor: arched stone-framed front door, loggia paving in tumbled limestone.',
        'The master bedroom occupies the full south upper floor with a full-width juliet balcony and view over the golf course.',
        'The rear of the villa: a private swimming pool (12 m × 5 m, turquoise) set in a landscaped garden with date palms and bougainvillea.',
        'Garage on north side: double-width arched opening to match the front loggia.',
      ].join(' '),
      site: [
        'Arabian Ranches gated golf community, Dubai, UAE — interior frond backing directly onto the golf fairway.',
        'Immediately south: the 18th fairway of the Arabian Ranches Golf Club — wide strip of vivid emerald-green grass bounded by desert scrub.',
        'East and west: similar two-storey white villas with terracotta roofs set within walled garden plots.',
        'North: the internal estate road with landscaped date palm median.',
      ].join(' '),
      landmark: [
        'The Arabian Ranches Golf Club fairway: a wide stripe of brilliant irrigated green bisecting the ochre desert scrub.',
        'The 18th hole flag and green visible at the south boundary of the property garden.',
        'Beyond the fairway: the Dubai desert skyline — flat sand horizon with occasional palm clusters.',
        'This view is ALWAYS visible from the rear garden, pool, and master bedroom juliet balcony.',
      ].join(' '),
      interior: [
        'Light limestone tile throughout ground floor (80×80 cm, warm cream-beige, tumbled-edge finish).',
        'Upper floors: wide-plank engineered parquet in pale honey oak (18 cm, brushed, matte).',
        'Walls: smooth warm white gypsum, flat finish.',
        'Ceiling: 3.2 m flat white plaster with traditional-style arabesque plaster medallion at the living room centre.',
        'All frames: white-painted timber.',
        'Kitchen: white Shaker-style cabinetry, Bianco Carrara marble worktop, terracotta mosaic splashback.',
        'Master bath: cream marble on walls and floor, freestanding bath, oil-rubbed bronze fixtures.',
      ].join(' '),
      palette: 'Golf-course emerald green · ivory limestone · honey engineered oak · terracotta roof clay · Bianco Carrara cream · desert ochre sand · pool turquoise · bougainvillea hot-pink (accent)',
    },
    lightingSetup: 'Mid-morning sun (09:30–11:00 Dubai) from the east; the white villa facade is fully lit; the pool sparkles turquoise; the golf fairway glows vivid green.',
    cameraByType: {
      exterior: 'ENTIRE villa from garden level to ridge of roof — camera pulled back to show both floors, the arched loggia, and the terracotta roof without cropping. Building fills 50% of frame. Camera at 20° elevation positioned on the golf fairway south of the villa, facing north. Pool and landscaped garden in foreground. Golf course and desert scrub visible on either side.',
      section: 'BOTH FLOORS (ground and upper) fully visible — none cropped. 45° isometric dolls-house cutaway, south and east walls removed. Golf course visible through the master bedroom south windows. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE villa ground floor plan within frame — all exterior walls and the pool patio edge visible. 65° top-down isometric, ceiling removed. Limestone tile and furniture visible. Garden, pool, and golf course visible at south edge. No white background.',
      life_garden: 'Wide shot from the south garden looking north toward the villa — entire rear facade, arched loggia, and pool visible. Late afternoon, family around the pool, date palms casting long shadows. Golf fairway visible behind the garden wall.',
      bizarre: '45° isometric cutaway of the master bedroom and en-suite, south and east walls removed. ENTIRE room from floor to ceiling in frame. American Beauty (1999): a bathtub in the en-suite overflowing with fresh red rose petals; a 1998-era teen bedroom boombox on the bedside table; a framed poster of the movie\'s original design half-hanging off the honey parquet wall; the golf course visible through the south juliet balcony glass in lush green morning light.',
      default: '45° isometric camera, south wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 4 · Beşiktaş Istanbul (Engel & Völkers) ───────────────────────── */
  4: {
    id: 4,
    name: 'Beşiktaş — 2BR Bosphorus-view apartment, Istanbul',
    anchor: {
      building: [
        'A contemporary eight-floor premium residential complex in Beşiktaş, Istanbul, directly overlooking the Bosphorus.',
        'Facade: light sand-coloured travertine cladding panels with deep horizontal window reveals.',
        'Large east-facing terraces with frosted glass balcony panels on every unit.',
        'The building\'s top two floors step back to form penthouse terraces.',
        'Ground floor: stone-paved porte-cochère with valet station and concierge booth.',
      ].join(' '),
      site: [
        'Beşiktaş district, European shore of Istanbul — first-row Bosphorus position.',
        'The building frontage sits 30 m from the Bosphorus waterway: a marble promenade between the building and the water.',
        'To the north: the Çırağan Palace hotel (Ottoman pavilion rooftline and gilded gates).',
        'To the south: the Dolmabahçe Palace clock tower visible 500 m along the coast road.',
      ].join(' '),
      landmark: [
        'The Bosphorus strait: a 1.5 km wide blue-grey waterway packed with container ships, tankers, and Bosphorus ferries crossing between Europe and Asia.',
        'Directly opposite on the Asian shore: the Üsküdar and Kadıköy hillsides — dense Ottoman-era neighbourhoods with terracotta rooftops and minarets rising up the hillside.',
        'The Bosphorus Bridge (First Bridge) is visible 3 km to the north, its arched cables lit in white at night.',
        'This view is ALWAYS visible through the east-facing floor-to-ceiling glass terraces.',
      ].join(' '),
      interior: [
        'European white-oak parquet floor throughout (chevron pattern, 6×35 cm strips, natural matte oil finish).',
        'Walls: smooth ivory white mineral plaster, slight warm undertone.',
        'Ceiling: 2.9 m flat white, concealed LED cove lighting at the east wall.',
        'All frames: matt dark bronze aluminium.',
        'Kitchen: Italian handleless cabinetry in warm greige lacquer, Calacatta Oro marble island.',
        'Master bath: Arabescato marble wall-to-wall tile (floor and walls), built-in marble bath, chrome rain shower.',
      ].join(' '),
      palette: 'Bosphorus blue-grey · Üsküdar terracotta-terracotta rooftops · ivory white mineral plaster · European oak natural · Calacatta Oro cream-gold marble · dark bronze aluminium · tanker hull grey-red (distant)',
    },
    lightingSetup: 'Sunset (19:00–20:00 Istanbul summer) from the west, over the European hills; the Bosphorus glows copper-gold; the Asian shore silhouettes against a violet sky; the apartment\'s east facade is in warm reflected glow.',
    cameraByType: {
      exterior: 'ENTIRE eight-floor building from the Bosphorus promenade to the penthouse setback — camera pulled back so no floor is cropped. Building fills 55% of frame height. Camera at 25° elevation, positioned above the Bosphorus water facing west. Marble promenade and moored Bosphorus ferry in foreground. Asian shore visible in background.',
      section: 'ALL EIGHT FLOORS stacked and visible — none cropped. 45° dolls-house cutaway, east facade removed. Bosphorus and Asian shore visible through the east terraces. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE 2BR plan within frame — all perimeter walls and terrace edge visible. 65° top-down isometric, ceiling removed. Oak chevron parquet and furniture visible. Bosphorus water visible at east building edge. No white background.',
      life_bosphorus: 'Interior wide shot from the west wall of the living room — full room visible, the east glass terrace and Bosphorus copper sunset in the background. Two people on the terrace with rakı glasses, tanker crossing on the strait.',
      bizarre: '45° isometric cutaway of the living room, east terrace wall removed. ENTIRE room from floor to ceiling in frame. Skyfall (2012) — James Bond\'s rooftop Istanbul chase scene brought indoors: two motorcycles parked on the European oak parquet floor, a bazaar merchant\'s rug knocked from the wall half-covering the Calacatta island, spent cartridge cases on the chevron parquet, a cracked sniper scope propped against the terrace glass. Bosphorus and Asian shore at sunset through the terrace.',
      default: '45° isometric camera, east terrace wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 5 · Antalya Lara (Antalya Homes) ──────────────────────────────── */
  5: {
    id: 5,
    name: 'Antalya Lara — 3BR resort complex apartment, Mediterranean coast',
    anchor: {
      building: [
        'A low-rise (6-floor) 5-star resort complex in Lara district, Antalya, Turkey, directly on the Mediterranean coast.',
        'Facade: smooth pale cream render with horizontal white-marble band courses between floors.',
        'Each apartment has a full-width enclosed glazed balcony running the entire south facade.',
        'Ground floor: a grand colonnaded portico in white marble opening onto the pool complex.',
        'The complex includes an Olympic-size outdoor pool, SPA pavilion, and beach club at the bottom of the garden.',
        'Roof: flat, with an infinity pool and bar visible at the west end of the building.',
      ].join(' '),
      site: [
        'Lara resort strip, Antalya, Turkey — seafront position on the Mediterranean gold coast.',
        'Immediately south: a landscaped tropical garden stepping down to the Mediterranean beach — white limestone pebbles and fine golden sand.',
        'West: the Lara resort strip — Titanic, Rixos, and Crystal hotel silhouettes.',
        'East: the Antalya city skyline and the Taurus Mountains backdrop.',
      ].join(' '),
      landmark: [
        'The Mediterranean Sea: deep royal-blue water meeting a sharp horizon, with cruise ships occasionally passing.',
        'The Taurus Mountains (Toroslar): a dramatic range of bare grey limestone peaks up to 2000 m, visible behind Antalya city to the east.',
        'At sunset the sea turns crimson and the mountain peaks glow violet.',
        'This view is ALWAYS visible through the south-facing glazed balcony.',
      ].join(' '),
      interior: [
        'Large-format cream travertine tile throughout (60×120 cm, honed finish).',
        'Walls: smooth cream-white stucco, warm tone.',
        'Ceiling: 2.8 m flat white, gold-toned recessed downlights.',
        'All frames: white PVC window profiles with dark gold handles.',
        'Enclosed glazed balcony: travertine tile, sun lounger, table with umbrella mount.',
        'Kitchen: cream glossy cabinetry, white quartz worktop.',
        'Master bath: cream marble tile, walk-in rain shower, Jacuzzi bath in the master en-suite.',
      ].join(' '),
      palette: 'Mediterranean royal-blue · Taurus Mountain limestone grey · cream travertine · gold warm light · resort emerald pool-green · white marble colonnade · sunset crimson-orange (horizon)',
    },
    lightingSetup: 'High noon (13:00 July) — fierce Mediterranean sun from directly above; the sea is intensely blue; the white marble colonnade casts deep short shadows; the pool shimmers turquoise.',
    cameraByType: {
      exterior: 'ENTIRE six-floor resort building from garden/pool terrace to flat roof with infinity pool — camera pulled back so no floor cropped. Building fills 55% of frame. Camera at 20° elevation, positioned above the Mediterranean beach south of the building, facing north. Beach, pool complex, and landscaped garden in foreground.',
      section: 'THREE REPRESENTATIVE FLOORS stacked and visible. 45° dolls-house cutaway, south facade removed. Mediterranean sea and Taurus Mountains visible through the balcony glass. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE 3BR plan and enclosed balcony within frame — all perimeter walls visible. 65° top-down isometric, ceiling removed. Travertine tile and furniture visible. Mediterranean sea visible at south building edge. No white background.',
      life_pool: 'Wide shot from the west terrace of the pool complex — the full Olympic pool, the colonnade, and the building facade behind. Afternoon golden light. Sunbathers on recliners, a waiter carrying drinks on a tray, the Mediterranean glittering in the background beyond the garden hedge.',
      bizarre: '45° isometric cutaway of the master bedroom, south balcony wall removed. ENTIRE room from floor to ceiling in frame. The Talented Mr. Ripley (1999): an alligator-leather travel trunk open on the travertine floor with forged Italian passports and press-clippings about a missing Princeton graduate spilling out; an Olivetti typewriter on the balcony table; a tailored Marinella tie draped over the sun lounger; the Mediterranean sea blazing blue outside.',
      default: '45° isometric camera, south balcony wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 6 · Limassol Germasogeia (Engel & Völkers Cyprus) ─────────────── */
  6: {
    id: 6,
    name: 'Germasogeia, Limassol — 2BR IT-district apartment, Cyprus',
    anchor: {
      building: [
        'A brand-new six-floor residential building in Germasogeia district, Limassol, Cyprus.',
        'Facade: smooth white render on the upper floors; natural split-face limestone cladding on the ground floor plinth.',
        'South facade: a staggered arrangement of deep-set rectangular balconies with frameless glass balustrades.',
        'Podium-level: a communal pool (15 m × 6 m, tile finish in Mediterranean blue) set in a landscaped terrace.',
        'Ground floor: underground garage entrance with a palm-lined driveway.',
      ].join(' '),
      site: [
        'Germasogeia district, Limassol, Cyprus — IT and expat hub, 5 minutes from the sea.',
        'Immediately surrounding: mature Mediterranean gardens with carob, olive, and eucalyptus trees.',
        'South-west: the Limassol coastal promenade (Molos) visible 1 km away, with the Mediterranean beyond.',
        'East: the Germasogeia river valley — a green gully between residential hillsides.',
      ].join(' '),
      landmark: [
        'The Mediterranean Sea: a deep violet-blue expanse at the horizon visible from the upper floors.',
        'The Limassol Marina: a cluster of white masts and sailboat hulls visible along the coast to the west.',
        'The Troodos Mountain range: a hazy blue-grey massif visible behind the city to the north.',
        'This view is ALWAYS visible from the south-facing balcony on upper floors.',
      ].join(' '),
      interior: [
        'Large-format warm-grey porcelain tile throughout (80×80 cm, matte, subtle stone texture).',
        'Walls: smooth warm white gypsum render.',
        'Ceiling: 2.85 m flat white plaster, recessed LED downlights.',
        'All frames: slim dark grey aluminium (anthracite).',
        'Kitchen: handleless light grey lacquer cabinetry, white quartz island countertop.',
        'Bathroom: large-format grey-beige stone-look porcelain tile, walk-in rain shower.',
      ].join(' '),
      palette: 'Mediterranean violet-blue · Limassol Marina mast-white · warm grey porcelain · white plaster · anthracite aluminium · Mediterranean pine green · carob bark brown · Troodos hazy-blue (distant)',
    },
    lightingSetup: 'Late morning (11:00–12:00 Cyprus summer) from the south; sharp Mediterranean light; the white building facade is fully lit; the pool shimmers turquoise; the sea glistens at the horizon.',
    cameraByType: {
      exterior: 'ENTIRE six-floor building from palm-lined driveway to roof parapet — camera pulled back so no floor cropped. Building fills 55% of frame. Camera at 25° elevation, positioned south above the Limassol coastal road, facing north. Landscaped pool terrace in foreground. Mediterranean sea horizon visible in background between buildings.',
      section: 'ALL SIX FLOORS stacked and visible — none cropped. 45° dolls-house cutaway, south facade removed. Mediterranean visible through the balcony glass. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE 2BR plan and balcony within frame — all perimeter walls visible. 65° top-down isometric, ceiling removed. Grey tile and furniture visible. No white background.',
      life_remote_work: 'Interior wide shot from the east wall of the living room — full room and south balcony in frame. A well-organised home-office setup: dual-monitor standing desk, mechanical keyboard, noise-cancelling headphones. The south balcony open, Mediterranean sea on the horizon, thyme-scented breeze. Late morning.',
      bizarre: '45° isometric cutaway of the living room, south wall removed. ENTIRE room from floor to ceiling in frame. The non-dom tax-haven scene: a banker\'s desk covered with OECD compliance folders and a Cayman Islands incorporation certificate; a BVI registered-agent stamp and inkpad on the white quartz island; a Post-it note reading "NON-DOM STATUS: Year 1/17" stuck to the monitor; an uncorked bottle of Commandaria (Cyprus sweet wine) on the coffee table. Mediterranean sea visible on the horizon through the balcony glass.',
      default: '45° isometric camera, south wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 7 · Paphos Koloni (Pafilia) ────────────────────────────────────── */
  7: {
    id: 7,
    name: 'Paphos Koloni — 2BR seafront apartment, Aphrodite's Bay, Cyprus',
    anchor: {
      building: [
        'A brand-new three-floor boutique apartment building on the Koloni headland, Paphos, Cyprus.',
        'Facade: white rendered upper walls; ground-floor plinth in rough-cut local honey limestone blocks.',
        'West facade: a continuous row of large glazed balconies (18 m² each) with white limestone tile terrace floors and a slim stone parapet wall.',
        'Building sits on a terraced limestone headland 12 m above sea level.',
        'Flat roof with a small communal rooftop terrace accessible via external stair.',
      ].join(' '),
      site: [
        'Koloni headland, Paphos Bay, Cyprus — elevated coastal position.',
        'Immediately west: the open Mediterranean/Paphos Bay, 12 m below the terrace.',
        'South-west (15 km visible on clear days): Petra tou Romiou (Aphrodite\'s Rock) — a solitary white limestone sea-stack rising from turquoise shallows.',
        'North: the Paphos harbour and lighthouse — a white stone tower visible from the rooftop.',
        'Around the building: Mediterranean scrub, wild thyme, carob trees on the rocky headland.',
      ].join(' '),
      landmark: [
        'Petra tou Romiou (Aphrodite\'s Rock): a dramatic solitary white limestone sea-stack (8 m tall) rising from the turquoise-blue Mediterranean 15 km to the south-west.',
        'The mythological birthplace of Aphrodite — the rock is unmistakable in silhouette against the open sea.',
        'Directly below: the rocky Koloni headland shoreline — flat limestone shelves meeting turquoise water.',
        'This landmark is ALWAYS visible from the west-facing terraces on clear days.',
      ].join(' '),
      interior: [
        'Natural Paphos limestone tile throughout (40×40 cm, warm grey-beige, antiqued finish).',
        'Walls: smooth warm white lime plaster, very slight texture.',
        'Ceiling: 2.8 m flat white plaster, simple downlights.',
        'All frames: dark bronze aluminium.',
        'Kitchen: white gloss handleless cabinetry, Bianco Marble island (2.0 m), stone countertop.',
        'Terrace (18 m²): same limestone tile, built-in white stone bench seating along the parapet.',
        'Bathroom: small limestone mosaic floor, walk-in shower, wall-mounted fixtures in brushed gold.',
      ].join(' '),
      palette: 'Mediterranean turquoise-blue · Aphrodite\'s Rock chalk white · warm grey-beige Paphos limestone · white lime plaster · dark bronze aluminium · wild thyme sage-green · sunset coral-orange (horizon)',
    },
    lightingSetup: 'Late afternoon (17:00–18:30 Cyprus summer) from the west; the Mediterranean turns deep gold and copper; Petra tou Romiou glows warm white-orange; the limestone facade is bathed in warm side light.',
    cameraByType: {
      exterior: 'ENTIRE three-floor building from rocky headland base to flat roof — camera pulled back so no floor cropped. Building fills 55% of frame. Camera at 20° elevation, positioned above the Paphos Bay water to the west, facing east. Headland limestone rocks and turquoise sea in foreground. Petra tou Romiou visible to the lower-left in the sea.',
      section: 'ALL THREE FLOORS fully visible — none cropped. 45° dolls-house cutaway, west terrace wall removed. Mediterranean sea and Petra tou Romiou visible through the terrace opening. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE 2BR plan and terrace within frame — all perimeter walls and terrace edge visible. 65° top-down isometric, ceiling removed. Limestone tile and furniture visible. Sea visible at west terrace edge. No white background.',
      life_terrace: 'Wide shot from inside the living room looking west through the open terrace sliding door — full living room and terrace visible. The west-facing terrace: two white stone chairs and a small table, sunset over the Mediterranean, Petra tou Romiou silhouetted gold on the horizon.',
      bizarre: '45° isometric cutaway of the living room-terrace, west parapet wall removed. ENTIRE room and terrace from floor to ceiling in frame. Botticelli\'s Birth of Venus reimagined: a giant clamshell replica prop (stage/film prop quality, 2 m wide, white resin) sitting on the white limestone terrace floor; two vintage film arc-lighting stands pointing at it; a Renaissance-era mirror leaning against the stone parapet. Petra tou Romiou sea-stack glowing copper in the background.',
      default: '45° isometric camera, west terrace wall removed, full room and terrace visible, not zoomed in.',
    },
  },

  /* ── 8 · Tbilisi Vake (Status Real Estate) ─────────────────────────── */
  8: {
    id: 8,
    name: 'Tbilisi Vake — Renovated Stalin-era 2BR apartment',
    anchor: {
      building: [
        'A 1950s Stalinist-era five-floor residential building in Vake district, Tbilisi, Georgia.',
        'Facade: pale buff-yellow ashlar plaster over brick, deeply articulated with rusticated base, classical pilasters, and a projecting cornice at roofline.',
        'The apartment is on the third floor of a corner unit with views north and west.',
        'Windows: tall double-hung European timber sash windows (0.9 m × 2.4 m) with white-painted timber frames — full renovation, not PVC.',
        'The building faces a chestnut-tree-lined courtyard on the north side.',
        'Wrought-iron decorative balcony railings on the north-facing balcony.',
      ].join(' '),
      site: [
        'Vake district, Tbilisi, Georgia — the city\'s most prestigious residential quarter.',
        'The building sits in a quiet chestnut-tree-lined street (shaded avenue) of similar Stalinist-era apartment blocks.',
        'North: the wooded Mtatsminda hillside (Holy Mountain, 770 m) rising steeply above the rooftops.',
        'East: Vake Park — a forested urban park with an early-Soviet-era fountain.',
      ].join(' '),
      landmark: [
        'Mount Mtatsminda (770 m): a heavily forested hillside rising directly north of the apartment — dark Georgian pine and broadleaf forest.',
        'The Mtatsminda TV tower and funicular upper station visible among the trees near the summit.',
        'The Georgian Orthodox Mamadaviti Church white dome peeks above the treeline.',
        'At night the TV tower is lit red-white and the funicular lights trace the hillside.',
        'This landmark is ALWAYS visible through the north-facing windows.',
      ].join(' '),
      interior: [
        'Wide-plank arched-profile oak parquet floor (wide arc-sawn boards, 12 cm × 50 cm, warm amber-honey, oiled finish).',
        'Walls: smooth white lime plaster with period-original plaster cornices (acanthus-leaf profile) at 3.4 m ceiling height.',
        'Ceiling: flat white lime plaster, a central oval plaster rosette directly above the living room, 3.4 m height.',
        'All windows: white-painted timber European sash profiles.',
        'Interior doors: tall (2.6 m) solid oak panelled doors with period brass lever handles.',
        'Kitchen: soft sage-green Shaker cabinetry, honed Nero Marquina marble countertop.',
        'Bathroom: warm grey zellige tile (hand-cut, irregular glaze), exposed raw brass pipe fixtures.',
      ].join(' '),
      palette: 'Mtatsminda forest deep-green · amber-honey arched oak parquet · buff-yellow Stalinist ashlar · white lime plaster · sage sage-green kitchen · Nero Marquina black-gold marble · warm brass',
    },
    lightingSetup: 'Late afternoon (16:00–17:30 Tbilisi summer) from the south-west; warm 3800 K amber light raking across the buff-yellow facade; the chestnut trees cast dappled shadow on the stone paving; Mtatsminda deep green in background.',
    cameraByType: {
      exterior: 'ENTIRE five-floor building from stone-paved pavement to decorative cornice — camera pulled back so cornice not cropped. Building fills 55% of frame. Camera at 25° elevation, facing the corner so two facade planes visible. Chestnut-tree avenue in foreground, wrought-iron railings and gate visible at ground level. Mtatsminda forest visible above the roofline.',
      section: 'ALL FIVE FLOORS stacked and visible — none cropped. 45° dolls-house cutaway, north and west walls removed. Mtatsminda hillside visible through the north sash windows. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE 2BR plan within frame — all perimeter walls visible, no rooms cropped. 65° top-down isometric, ceiling removed. Arched parquet floor pattern visible. Courtyard and chestnut trees visible at north building edge. No white background.',
      life_remote_work: 'Interior wide shot from the south corner of the living room — full room visible including cornices and plaster rosette overhead. A writing desk with a laptop near the north window; Mtatsminda visible through the white sash window frame. A glass of Georgian natural wine on the desk.',
      bizarre: '45° isometric cutaway of the living room, north and west walls removed. ENTIRE room from floor to ceiling — cornices, rosette, and full arched parquet visible. The Living Daylights (1987): a KGB surveillance station set up in the Stalinist interior — a 1980s reel-to-reel tape recorder on the writing desk, a Zenit-E 35mm camera with telephoto lens aimed through the sash window at Mtatsminda, a Soviet diplomatic pouch on the parquet floor, a Makharov pistol and silencer on the kitchen table.',
      default: '45° isometric camera, north wall removed, full room visible including cornices and rosette, not zoomed in.',
    },
  },

  /* ── 9 · Batumi Boulevard (Batumi Property Group) ───────────────────── */
  9: {
    id: 9,
    name: 'Batumi Boulevard — 1BR appart-hotel, Black Sea waterfront',
    anchor: {
      building: [
        'A 25-floor contemporary glass appart-hotel tower directly on Batumi Boulevard, Black Sea coast, Georgia.',
        'Facade: full curtain-wall glass with slim dark anthracite steel mullions, slightly convex plan to maximise sea views.',
        'Each unit has a full-width sea-facing balcony: glass railing, dark aluminium frame, deep enough for two chairs.',
        'Tower base: a glazed hotel-lobby colonnade with white granite paving, opening directly onto the Batumi Boulevard promenade.',
        'The Batumi Alphabet Tower (Anbani Tower) — a 130 m twisted steel-and-concrete structure — stands 200 m north along the boulevard.',
      ].join(' '),
      site: [
        'Batumi Boulevard (6 km promenade), Black Sea coast, Adjara, Georgia.',
        'Directly west: the Black Sea — deep grey-green in winter, dark sapphire blue in summer.',
        'Immediately below: the Batumi Boulevard promenade — a 12 m wide granite path with specimen plane trees, cycle lane, and vintage lamp posts.',
        'South: the historic Piazza square and 19th-century European-style Batumi old town.',
        'North: the Batumi Alphabet Tower twisting against the sky; beyond it the Sheraton and Hilton hotel towers.',
      ].join(' '),
      landmark: [
        'The Black Sea: an expansive horizon of deep blue-grey water — no visible opposite shore; long rolling swells.',
        'The Batumi Alphabet Tower (130 m): a spiralling chrome-steel structure with the Georgian alphabet (Mkhedruli script) letters winding up its exterior; lit in blue-white LEDs at night.',
        'The boulevard promenade below: a string of vintage globe-lanterns lit at dusk along the seaside walk.',
        'These views are ALWAYS visible through the west-facing glass balcony.',
      ].join(' '),
      interior: [
        'Narrow-plank light grey engineered oak floor (12 cm width, pale grey-white wash, matte).',
        'Walls: smooth white gypsum render, flat finish.',
        'Ceiling: 2.7 m flat white, LED strip under the balcony soffit.',
        'All frames: slim dark anthracite aluminium.',
        'The full-width balcony: two folding teak chairs and a narrow teak shelf running the balcony width.',
        'Kitchen: compact white Ikea-style cabinetry, white quartz countertop; hotel-style open plan.',
        'Bathroom: white large-format porcelain tile, chrome fixtures, rain shower.',
      ].join(' '),
      palette: 'Black Sea deep sapphire-blue · Alphabet Tower chrome-silver · pale grey-wash oak floor · white plaster · dark anthracite aluminium · globe-lantern warm amber (night) · Georgian plane tree green',
    },
    lightingSetup: 'Early morning (07:00 July) — the Black Sea is flat, deep sapphire; the Alphabet Tower catches the first gold of sunrise; the boulevard is quiet; the apartment interior is in warm morning glow.',
    cameraByType: {
      exterior: 'ENTIRE 25-floor tower from granite promenade to roof — camera far enough back so the roof is not cropped. Building fills 45% of frame. Camera at 20° elevation above the Black Sea facing east. Boulevard promenade and globe-lanterns in foreground. Alphabet Tower visible to the left.',
      section: 'THREE REPRESENTATIVE UPPER FLOORS stacked and visible — none cropped. 45° dolls-house cutaway, west balcony wall removed. Black Sea and Alphabet Tower visible through the curtain-wall. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE 1BR studio plan and balcony within frame — all perimeter walls visible. 65° top-down isometric, ceiling removed. Grey floor and furniture visible. Black Sea visible at west balcony edge. No white background.',
      life_balcony: 'Wide shot from inside the apartment looking west through the open balcony sliding door — full interior and balcony visible. Early morning: a single person on the balcony in a robe, holding a Georgian coffee bowl, Black Sea horizon in gold-blue dawn light, Alphabet Tower to the north.',
      bizarre: '45° isometric cutaway of the living room, west balcony wall removed. ENTIRE room from floor to ceiling in frame. Casino Royale (2006) Black Sea casino scene: a baize-covered card table set up in the studio apartment, six chairs with playing cards dealt, Casino Royale poker chips stacked in columns, a villain\'s golden pistol resting on the chips. Black Sea and Alphabet Tower visible outside the balcony glass at dusk.',
      default: '45° isometric camera, west balcony wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 10 · Phuket Rawai (Thailand Property) ─────────────────────────── */
  10: {
    id: 10,
    name: 'Phuket Rawai — 2BR luxury condo, Andaman Sea, south Phuket',
    anchor: {
      building: [
        'A five-floor boutique luxury condominium complex in Rawai, south Phuket, Thailand.',
        'Facade: dark terracotta-toned natural stone cladding panels (Romblon dark granite texture) alternating with rendered wall planes in warm off-white.',
        'Each unit has a full-width tropical terrace with natural stone tile flooring and a dark teak-slatted privacy screen at the side.',
        'Ground floor: a stepped pool complex — three infinity pools at different terrace levels, surrounded by tropical planting (pandanus, frangipani, sea almond).',
        'The top floor is a rooftop bar and chill-out terrace open to the sky.',
      ].join(' '),
      site: [
        'Rawai district, south Phuket, Thailand — elevated residential hilltop, 1.5 km from Nai Harn beach.',
        'The complex sits on a gentle slope with the Andaman Sea visible to the south-west from the upper floors.',
        'Surrounding: dense tropical vegetation — rubber trees, palms, banana plants.',
        'South: Nai Harn lake visible, and beyond it the Andaman Sea horizon.',
        'East: the Phuket highlands — jungle-covered rolling hills.',
      ].join(' '),
      landmark: [
        'The Andaman Sea: deep sapphire-blue tropical water, visible from upper floors as a glittering stripe between tree canopy and sky.',
        'Nai Harn beach and lake: a crescent of white sand and a calm freshwater lake — visible 1.5 km south as a green-and-white stripe.',
        'Small fishing longtail boats with coloured pom-pom decorations visible on the sea below.',
        'This view is ALWAYS visible from the upper-floor terraces and infinity pool.',
      ].join(' '),
      interior: [
        'Dark terracotta-toned natural stone tile floor throughout (60×60 cm, raw honed surface — similar to Romblon dark basalt).',
        'Walls: warm off-white rough plaster, slight sand texture.',
        'Ceiling: 2.9 m exposed dark-stained teak beam grid (structural beams, not decorative box beam).',
        'All frames: dark teak-stained timber.',
        'Rattan and natural fibre furniture throughout.',
        'Kitchen: dark lava stone countertop, rattan cabinetry with woven-panel fronts.',
        'Bathroom: same dark stone tile, outdoor tropical rain shower on a stone-paved external terrace alcove (enclosed but open to sky above).',
      ].join(' '),
      palette: 'Andaman Sea deep sapphire-blue · dark terracotta basalt stone · warm off-white plaster · dark teak beam · rattan honey · frangipani cream-yellow (accent) · tropical green canopy',
    },
    lightingSetup: 'Late afternoon (17:00–18:30 Thailand) — golden-hour sun from the west over the Andaman Sea; the infinity pools turn molten gold; the dark stone facade glows warm amber; the sea horizon blazes.',
    cameraByType: {
      exterior: 'ENTIRE five-floor complex from the pool terrace base to the rooftop bar — camera pulled back so no floor cropped. Building fills 50% of frame. Camera at 25° elevation, positioned above the Nai Harn hillside south of the complex, facing north. Infinity pools and tropical planting in foreground. Andaman Sea horizon visible in the background.',
      section: 'ALL FIVE FLOORS stacked and visible — none cropped. 45° dolls-house cutaway, south and west walls removed. Andaman Sea visible through the terrace opening. Dark teak beams across all floors. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE 2BR plan and terrace within frame — all perimeter walls visible. 65° top-down isometric, ceiling removed. Dark stone floor and rattan furniture visible. Andaman Sea visible at south terrace edge. No white background.',
      life_pool: 'Wide shot from the south edge of the top-level infinity pool looking north toward the building — full pool, tropical planting, and two floors of terraces visible. Golden hour light. One person floating in the pool, the Andaman Sea blazing gold on the horizon behind the camera.',
      bizarre: '45° isometric cutaway of the living room, south and west walls removed. ENTIRE room from floor to ceiling in frame. The Beach (2000): a hand-drawn map of "The Beach" on a banana leaf tacked to the plaster wall; a Lonely Planet Thailand 2000 edition on the rattan coffee table; a dripping snorkelling mask hanging from the dark teak beam; a sarong draped over the stone floor; the Andaman Sea at golden hour outside the terrace.',
      default: '45° isometric camera, south wall removed, full room visible, not zoomed in.',
    },
  },

  /* ── 11 · Koh Samui Chaweng Noi (Samui Luxury Homes) ───────────────── */
  11: {
    id: 11,
    name: 'Koh Samui Chaweng Noi — 3BR hillside villa, infinity pool, Gulf of Thailand',
    anchor: {
      building: [
        'A two-storey private hillside villa in Chaweng Noi, Koh Samui, Thailand.',
        'Facade: rough-plastered white exterior walls with natural rough-hewn local brown sandstone feature panels at the corners.',
        'Dark charcoal corrugated steel flat-pitch roof with wide overhanging eaves (1.0 m).',
        'Ground floor: an entirely open-plan living-dining pavilion facing west — no fixed west wall, only sliding teak-framed glass panels that fully retract.',
        'The west-facing infinity pool (10 m × 4 m): knife-edge overflow with a view to Chaweng Bay below.',
        'Dense frangipani planting and red-tinged bougainvillea at the pool perimeter.',
        'Upper floor (master): a single wide bedroom with a full-width west-facing jalousie window, and a separate open-air shower terrace at the south corner.',
      ].join(' '),
      site: [
        'Chaweng Noi hillside, Koh Samui, Gulf of Thailand — elevated 120 m above sea level.',
        'The villa sits on a terraced rocky hillside covered in tropical jungle: coconut palms, banana plants, tropical fig trees.',
        'Immediately below to the west: the Chaweng Bay — a deep crescent of turquoise water with a white-sand beach.',
        'South: the island of Koh Mat Sum (Pig Island) visible 2 km offshore.',
        'North: the Samui Airport apron and the northern peninsulas.',
      ].join(' '),
      landmark: [
        'Chaweng Bay: a crescent-shaped bay of vivid turquoise-to-deep-blue water, the beach strip visible as a white band at the water\'s edge.',
        'Koh Mat Sum (Pig Island): a small jungle-covered island 2 km offshore, dark green against the Gulf blue.',
        'The Gulf of Thailand horizon: open sea to the east of the bay, stretching to the horizon.',
        'At sunset the bay turns copper-gold and the island silhouettes purple.',
        'This view is ALWAYS visible through the west-facing open pavilion and from the infinity pool.',
      ].join(' '),
      interior: [
        'Rough-textured black basalt stone floor throughout ground floor (40×40 cm, honed raw surface).',
        'Upper floor: wide-plank teak floor (15 cm width, dark oil finish).',
        'Walls: rough white plaster on the east and north walls; the west wall fully retracts (teak-framed glass panels).',
        'Ceiling: exposed dark-stained rough-sawn teak structural beams (20 cm × 20 cm) — visible on both floors.',
        'Furniture: bleached raw-linen upholstery, natural rattan side tables, ceramic garden stools.',
        'Master bath: outdoor jungle rain shower on a teak deck; split-face basalt stone surround wall; open to the sky.',
        'Frangipani flowers scattered on the black basalt pool coping.',
      ].join(' '),
      palette: 'Gulf of Thailand turquoise-blue · dark charcoal corrugated steel roof · black basalt stone · dark teak wood · frangipani cream-yellow · bougainvillea hot-magenta · white plaster · Koh Mat Sum jungle-green',
    },
    lightingSetup: 'Sunset (18:30–19:30 Samui) from the west over the Gulf; the infinity pool mirrors the burning sky in copper and gold; the bay turns crimson; frangipani shadows lengthen on the basalt.',
    cameraByType: {
      exterior: 'ENTIRE villa from terraced garden base to charcoal steel roof eaves — camera pulled back so no floor cropped. Building fills 50% of frame. Camera at 20° elevation, positioned above Chaweng Bay facing east. Pool and jungle garden in foreground. Bay and Koh Mat Sum island visible in the background.',
      section: 'BOTH FLOORS (ground open pavilion + upper master) fully visible — none cropped. 45° dolls-house cutaway, west facade fully removed (the retractable glass panels). Chaweng Bay visible through the open west face. Exposed teak beams on both floors. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE villa ground floor plan — open pavilion and pool terrace within frame, all perimeter visible. 65° top-down isometric, ceiling removed. Basalt floor and furniture visible. Bay water visible at west edge. No white background.',
      life_infinity: 'Wide shot from the north terrace looking south-west — full infinity pool and west facade visible. Sunset over Chaweng Bay. One person at the pool edge, legs in the water, watching the bay turn copper. Frangipani petals on the pool coping.',
      bizarre: '45° isometric cutaway of the ground-floor open pavilion, west facade removed. ENTIRE room from floor to ceiling in frame. The Hangover Part II (2011) Thailand version: a full-grown Bengal tiger (CGI-quality render) lying on the black basalt stone floor of the living room, paw draped over the edge of the infinity pool, a gold Buddha statuette tipped on the rattan coffee table, playing cards scattered on the floor, a bowl of empty miniature champagne bottles. Chaweng Bay blazing copper through the open pavilion.',
      default: '45° isometric camera, west facade removed, full open pavilion visible including pool edge, not zoomed in.',
    },
  },

  /* ── 13 · Lisbon Campo de Ourique (Engel & Völkers) ────────────────── */
  13: {
    id: 13,
    name: 'Lisbon Campo de Ourique — Restored early-20c 2BR apartment',
    anchor: {
      building: [
        'An ornate early 20th-century (c.1910–1920) Pombalino-influenced residential building in Campo de Ourique, Lisbon.',
        'Facade: cream-rendered plaster over brick, with verde-esmeralda hand-painted azulejo (tile) panel dado at ground floor.',
        'Wrought-iron balcony railings with floral scroll detail on every floor.',
        'The apartment occupies the third floor of a five-floor corner building.',
        'Tall wooden double-hung sash windows (0.9 m × 2.5 m) with white-painted timber frames and narrow stone pediments.',
        'Copper-green mansard roof visible above the top cornice.',
      ].join(' '),
      site: [
        'Campo de Ourique district, Lisbon, Portugal — a quiet, hilly residential quarter.',
        'The building faces a cobblestone calçada street lined with plane trees and traditional blue-and-white tile-clad shop fronts.',
        'Directly north: the Jardim da Estrela and Basílica da Estrela — a large neoclassical church with twin towers and a central cupola.',
        'East: the Avenida Álvares Cabral — a wide boulevard with tram rails.',
      ].join(' '),
      landmark: [
        'Basílica da Estrela: a monumental neoclassical church (1796) with twin white limestone towers and a large central rose-window dome — visible 300 m to the north over the terracotta rooftops.',
        'Immediately around: the orange-terracotta tiled rooftops of the Campo de Ourique neighbourhood — a sea of curved clay pantiles stretching east toward the Tagus.',
        'The Tagus estuary is visible as a silver-blue stripe at the horizon on exceptionally clear days.',
        'This view is ALWAYS visible from the north-facing balcony and the third-floor windows.',
      ].join(' '),
      interior: [
        'Traditional herringbone parquet floor (solid pine, 6 cm × 35 cm strips, warm honey-gold, traditional red-wax finish).',
        'Walls: smooth bright white lime plaster with original plaster cornices (egg-and-dart profile) and a deep cove at 3.3 m ceiling height.',
        'Ceiling: flat white lime plaster with a central flower-basket plaster rosette.',
        'Cast-iron column-panel radiators (period-style, cream-painted) under all windows.',
        'All frames: white-painted timber sash profiles.',
        'Interior doors: tall (2.5 m) solid pine four-panel doors, painted white, with brass mortice handles.',
        'Kitchen: classic Portuguese cream Shaker cabinetry, honed basalt countertop, hand-painted azulejo splashback in blue-and-white pattern.',
        'Bathroom: white hexagonal tile floor, white subway tile walls, freestanding roll-top bath, exposed chrome pipe fixtures.',
      ].join(' '),
      palette: 'Estrela Basilica limestone white · honey-gold herringbone pine parquet · terracotta pan-tile roof-orange · verde-esmeralda azulejo (tile-panel green) · white lime plaster · Tagus silver-blue (distant) · cobblestone grey calçada',
    },
    lightingSetup: 'Late morning (11:00–12:30 Lisbon) from the south-east; warm Atlantic light; the cream facade is fully lit; the terracotta rooftops glow orange; the Estrela Basilica dome shines white.',
    cameraByType: {
      exterior: 'ENTIRE five-floor building from cobblestone pavement to copper mansard roof — camera pulled back so the roof ridge is not cropped. Building fills 55% of frame. Camera at 25° elevation facing the corner so two facade planes and the ornate azulejo dado visible. Estrela Basilica twin towers in the background to the upper right.',
      section: 'ALL FIVE FLOORS stacked and visible — none cropped. 45° dolls-house cutaway, north and east walls removed. Estrela Basilica dome and terracotta rooftops visible through the north sash windows. Period cornices and rosette visible on interior ceilings. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE 2BR plan within frame — all perimeter walls visible, no rooms cropped. 65° top-down isometric, ceiling removed. Herringbone parquet and furniture visible. Cobblestone street and rooftops visible at north building edge. No white background.',
      life_remote_work: 'Interior wide shot from the south corner of the living room — full room visible including plaster rosette and cornices. A writing setup: a 1920s-style writing desk with a modern laptop, a small ceramic jug of Portuguese marigolds, the north sash windows open, lace curtains billowing, Estrela Basilica dome visible beyond the rooftops.',
      bizarre: '45° isometric cutaway of the living room, north and east walls removed. ENTIRE room from floor to ceiling — cornices, rosette, and full herringbone parquet visible. Night Train to Lisbon (2013): a scattered manuscript on the herringbone floor — handwritten pages of Fernando Pessoa\'s heteronyms (Álvaro de Campos, Ricardo Reis) with underlined passages; a 1940s Remington typewriter on the desk; a half-drunk glass of vinho verde on the windowsill; a Portuguese train ticket to Porto and a worn Pessoa copy of "O Livro do Desassossego" open on the sofa. Estrela Basilica dome visible at night through the north window.',
      default: '45° isometric camera, north wall removed, full room visible including cornices and rosette, not zoomed in.',
    },
  },

  /* ── 14 · Algarve Vale do Lobo (Fine & Country) ────────────────────── */
  14: {
    id: 14,
    name: 'Vale do Lobo — 4BR Atlantic villa, Royal Golf Course, Algarve',
    anchor: {
      building: [
        'A two-storey detached luxury villa in Vale do Lobo resort, Algarve, Portugal.',
        'Facade: thick white lime-washed alvenaria walls, slightly irregular surface texture typical of authentic Algarvian construction.',
        'Traditional terracotta clay half-cylinder roof tiles (Roman pantile), mellow ochre colour with lichen patches.',
        'Ground floor: a wide shaded varandão (colonnaded veranda) running the full south facade in whitewashed render columns.',
        'Corner tower feature: a two-storey cylindrical tower with a conical terracotta cap on the south-west corner.',
        'The east facade has full-height sliding glass doors opening onto a covered terrace and infinity pool.',
        'Private infinity pool (14 m × 5 m, Portuguese blue azulejo tile interior) set in a landscaped garden with stone pines, rosemary hedges, and lavender borders.',
      ].join(' '),
      site: [
        'Vale do Lobo resort, Almancil municipality, Algarve, Portugal — gated luxury resort on the Atlantic coast.',
        'Immediately east of the villa: the 18th hole of the Vale do Lobo Royal Golf Course — 9 m tall golden sea-cliff edge dropping to a white-sand Atlantic beach.',
        'South (250 m): the Atlantic Ocean — direct ocean view over the Royal Golf fairway.',
        'North: the resort\'s pine forest — stone pines (Pinus pinea) with flat umbrella canopies.',
        'West: Vale do Lobo resort village centre — cobble-paved alley with terracotta pot-lined restaurant terraces.',
      ].join(' '),
      landmark: [
        'The Atlantic Ocean: a vast open-water horizon of dark navy-blue Atlantic, with occasional white-capped waves visible from the villa terrace.',
        'The Vale do Lobo sea-cliff: a golden-ochre sandstone cliff face (up to 10 m high) dropping to an unspoilt white-sand beach.',
        'The Royal Golf Course fairway: vivid emerald-green irrigated grass edged with straw-coloured rough, visible from the pool terrace and east windows.',
        'At sunset the Atlantic turns crimson and the sandstone cliffs glow copper.',
        'These views are ALWAYS visible from the south and east terraces and through the villa\'s east glass doors.',
      ].join(' '),
      interior: [
        'Traditional red-clay Alentejo terracotta hexagonal tile floor (traditional hand-made, 25 cm hex, warm brick-red, slightly uneven surface) on ground floor.',
        'Upper floor: wide-plank pale bleached oak (15 cm, white-washed, matte).',
        'Walls: thick lime-washed white render, slightly irregular, chalky texture.',
        'Ceiling: ground floor — whitewashed traditional Portuguese hand-painted azulejo panel frieze below the cornice.',
        'Upper ceilings: exposed pine collar-tie roof structure, whitewashed planks between the rafters.',
        'All frames: dark iron-stained timber (traditional Algarvian style).',
        'Kitchen: antique-white Shaker cabinetry, honed Estremoz Rosa marble worktop, blue-and-white azulejo panel splashback.',
        'Bathrooms: hand-painted azulejo tile walls (blue cobalt pattern on white), stone floors, freestanding bath.',
      ].join(' '),
      palette: 'Atlantic navy-blue · Royal Golf emerald green · white lime-wash chalk · terracotta hexagon brick-red · sandstone cliff golden-ochre · Estremoz marble pink-cream · dark iron timber · stone pine umbrella-green',
    },
    lightingSetup: 'Sunset (19:00–20:00 Algarve summer) from the west over the Atlantic; the sandstone cliffs blaze copper-gold; the villa\'s white walls turn warm amber; the Atlantic horizon is deep crimson.',
    cameraByType: {
      exterior: 'ENTIRE two-storey villa from garden level (pool and terracotta path) to conical tower tip — camera pulled back so the conical cap is not cropped. Building fills 50% of frame. Camera at 20° elevation, positioned above the Atlantic or golf fairway to the south-east, facing north-west. Pool terrace and golf fairway in foreground. Atlantic Ocean horizon to the right.',
      section: 'BOTH FLOORS (ground with terracotta tile and upper with bleached oak) fully visible — none cropped. 45° dolls-house cutaway, south and east walls removed. Atlantic and golf course visible through the east glass doors. Exposed pine roof structure visible on the upper floor. Pull camera back, 15% margin.',
      floorplan: 'ENTIRE villa ground floor plan — pool terrace and garden edge within frame, all perimeter visible. 65° top-down isometric, ceiling removed. Terracotta hexagonal tile and furniture visible. Atlantic sea and golf course visible at south and east edges. No white background.',
      life_garden: 'Wide shot from the south pool terrace looking north-east toward the villa — full villa south and east facades, colonnaded veranda, and pool visible. Late afternoon golden light. A family lunch on the veranda: a long wooden table set with Portuguese ceramics, a stone pine casting dappled shade. Royal Golf fairway and Atlantic horizon in the far background.',
      bizarre: '45° isometric cutaway of the living room, south and east walls removed. ENTIRE room from floor to ceiling in frame. Tinker Tailor Soldier Spy (2011): a cold-war debriefing set up in the white-washed Algarve living room — a green-baize card table with a single manila folder labelled "KARLA" in stencil, a cold cup of tea on a saucer, a framed photograph of a golf course turned face-down, a Walther PPK in a shoulder holster draped on the terracotta tile floor. Atlantic Ocean blazing copper through the east glass doors.',
      default: '45° isometric camera, south and east walls removed, full room visible, not zoomed in.',
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
      exterior: 'ENTIRE tower visible from quayside base to roof — camera pulled far enough back so no floor or mechanical plant is cropped. Building fills maximum 55% of frame height. Camera at 30° elevation, drone position above the Sava river facing east. Full corner of the tower visible — west and north facades simultaneously. Quayside promenade and linden trees in foreground, Kalemegdan in far background. Wide enough to see the tower top.',
      section: 'ALL VISIBLE FLOORS (12–14) fully stacked and visible — none cropped at top or bottom. Pull camera back so the full floor stack fits in frame with 15% margin. 45° isometric dolls-house cutaway. South and west walls removed. Sava river and Kalemegdan visible through the glass curtain-wall.',
      floorplan: 'ENTIRE apartment floor plan within frame — all rooms and curtain-wall perimeter visible, no rooms cropped. 65° top-down isometric, ceiling removed. Light oak floor and furniture visible. Sava river visible at the west building edge. No white background.',
      life_matchday: 'Interior wide shot from the east wall of the corner living room — full room visible, both curtain-wall facades in frame. Large wall-mounted TV showing a UEFA Champions League match. Floor-to-ceiling glass fills the north and west walls — Sava and Kalemegdan glowing at twilight outside.',
      bizarre: '45° isometric cutaway of the corner living room, south and west glass walls removed. ENTIRE room visible from floor to ceiling — full floor plan and both glass-wall edges in frame. American Psycho (2000) business-card scene: a large glass coffee table covered with business cards arranged in precise geometric rows (cards face-down, no text visible), a Sony Walkman on the table edge, a perfectly pressed Valentino suit jacket draped over the back of the Mies van der Rohe chair, a Mont Blanc pen on the armrest. Sava river and Kalemegdan visible through the glass.',
      default: '45° isometric camera, two glass walls visible, full room in frame, not zoomed in.',
    },
  },
};
