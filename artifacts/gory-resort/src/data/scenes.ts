/**
 * scenes.ts
 *
 * Scene image sets for each real property listing.
 *
 * ─────────────────────────────────────────────────────────────────
 * GENERATING / REGENERATING IMAGES — READ THIS FIRST
 * ─────────────────────────────────────────────────────────────────
 * Every scene image MUST be generated using the DNA system defined in
 * `src/data/property-dna.ts`.  Do NOT write ad-hoc prompts.
 *
 *   import { buildPrompt } from '@/data/property-dna';
 *   const prompt = buildPrompt(listingId, sceneType, sceneSpecificDescription);
 *   // then pass prompt to generateImage({ prompt, resolution: 'high' })
 *
 * The full playbook (rationale, step-by-step, review checklist) is at:
 *   docs/IMAGE_GENERATION.md
 *
 * ─────────────────────────────────────────────────────────────────
 * Architecture:
 * - Each entry is keyed by listing id
 * - Scenes are ordered: architecture (exterior → section → floorplan) → life → bizarre
 * - The site/location map is injected dynamically from listing.locationMap.image in PropertyDetail
 * - Images live in /images/scenes/{slug}.jpg (public folder)
 *
 * Naming convention:
 *   - Slot 0 (site map): label = "Птичий полёт"
 *   - Floor plan: label = "Планировка" (single floor) or "Планировка · эт. N" (multi-floor)
 *   - Each scene type must have a unique, specific label — never generic "Архитектура"
 */
import type { PropertyScene } from '@/components/PropertyScenesCarousel';

type SceneMap = Record<number, PropertyScene[]>;

export const PROPERTY_SCENES: SceneMap = {
  /* ── 12 · Belgrade Savski Venac (Estitor) ───────────────────── */
  // DNA → see property-dna.ts entry 12
  12: [
    { id: 'p12-exterior',  type: 'exterior',        category: 'architecture', label: 'Экстерьер',        sublabel: 'Межвоенное здание',      image: '/images/scenes/p12-exterior.jpg'  },
    { id: 'p12-section',   type: 'section',         category: 'architecture', label: 'Разрез',           sublabel: 'Высокие потолки, 3м',    image: '/images/scenes/p12-section.jpg'   },
    { id: 'p12-floorplan', type: 'floorplan',       category: 'architecture', label: 'Планировка',       sublabel: '68 м², Savski Venac',    image: '/images/scenes/p12-floorplan.jpg' },
    { id: 'p12-remote',    type: 'life_remote_work', category: 'life',        label: 'Удалённая работа', sublabel: 'Вид на Калемегдан',      image: '/images/scenes/p12-remote.jpg'    },
    { id: 'p12-bizarre',   type: 'bizarre',         category: 'bizarre',      label: "✦ Ocean's Eleven", sublabel: 'Белладжио, план на столе', image: '/images/scenes/p12-bizarre.jpg'   },
  ],

  /* ── 20 · Belgrade Waterfront (Atrium Property Services) ────── */
  // DNA → see property-dna.ts entry 20
  20: [
    { id: 'p20-exterior',  type: 'exterior',      category: 'architecture', label: 'Экстерьер',          sublabel: 'Beograd na vodi, Сава',         image: '/images/scenes/p20-exterior.jpg'  },
    { id: 'p20-floorplan', type: 'floorplan',     category: 'architecture', label: 'Планировка',         sublabel: 'Угловой, 14 этаж, вид на реку', image: '/images/scenes/p20-floorplan.jpg' },
    { id: 'p20-section',   type: 'section',       category: 'architecture', label: 'Разрез',             sublabel: 'Крепость Калемегдан снаружи',   image: '/images/scenes/p20-section.jpg'   },
    { id: 'p20-matchday',  type: 'life_matchday', category: 'life',         label: 'Матч-день',          sublabel: 'ЛЧ, Сава внизу',               image: '/images/scenes/p20-matchday.jpg'  },
    { id: 'p20-bizarre',   type: 'bizarre',       category: 'bizarre',      label: '✦ Тесла дома',       sublabel: 'Катушка в гостиной, 1890-е',    image: '/images/scenes/p20-bizarre.jpg'   },
  ],

  /* ── 18 · Dobrota, Kotor Bay (Sotheby's International Realty Montenegro) ── */
  // DNA → see property-dna.ts entry 18  (proof-of-concept: first set generated with full DNA system)
  18: [
    { id: 'p18-exterior',  type: 'exterior',   category: 'architecture', label: 'Экстерьер',          sublabel: 'Первая линия, залив Котор',    image: '/images/scenes/p18-exterior.jpg'  },
    { id: 'p18-floorplan', type: 'floorplan',  category: 'architecture', label: 'Планировка',         sublabel: 'Терраса 12 м над заливом',     image: '/images/scenes/p18-floorplan.jpg' },
    { id: 'p18-section',   type: 'section',    category: 'architecture', label: 'Разрез',             sublabel: '3 спальни, залив снаружи',      image: '/images/scenes/p18-section.jpg'   },
    { id: 'p18-bbq',       type: 'life_bbq',   category: 'life',         label: 'Барбекю на террасе', sublabel: 'Вечер, залив Котор внизу',     image: '/images/scenes/p18-bbq.jpg'       },
    { id: 'p18-bizarre',   type: 'bizarre',    category: 'bizarre',      label: '✦ Балканский улов',  sublabel: 'Рыбацкая лодка в гостиной',    image: '/images/scenes/p18-bizarre.jpg'   },
  ],

  /* ── 19 · Sveti Stefan, Budva Riviera (Monteonline) ──────────── */
  // DNA → see property-dna.ts entry 19
  19: [
    { id: 'p19-exterior',  type: 'exterior',        category: 'architecture', label: 'Экстерьер',         sublabel: 'Вид на Свети-Стефан',          image: '/images/scenes/p19-exterior.jpg'  },
    { id: 'p19-floorplan', type: 'floorplan',        category: 'architecture', label: 'Планировка',        sublabel: '62 м² на склоне над морем',    image: '/images/scenes/p19-floorplan.jpg' },
    { id: 'p19-section',   type: 'section',          category: 'architecture', label: 'Разрез',            sublabel: 'Остров в окне',                image: '/images/scenes/p19-section.jpg'   },
    { id: 'p19-remote',    type: 'life_remote_work', category: 'life',         label: 'Удалённая работа',  sublabel: 'Утро, Адриатика за стеклом',   image: '/images/scenes/p19-remote.jpg'    },
    { id: 'p19-bizarre',   type: 'bizarre',          category: 'bizarre',      label: '✦ Похмелье',        sublabel: 'Тигр в ванной',                image: '/images/scenes/p19-bizarre.jpg'   },
  ],
};

/**
 * Get scenes for a listing, prepending the isometric site-map as scene #0.
 * siteMapImage is the imported module URL from listing.locationMap.image.
 */
export function getScenesForListing(id: number, siteMapImage: string, accent: string): PropertyScene[] {
  const siteScene: PropertyScene = {
    id: `site-${id}`,
    type: 'site',
    category: 'architecture',
    label: 'Птичий полёт',
    sublabel: 'Вид с высоты',
    image: siteMapImage,
  };
  const rest = PROPERTY_SCENES[id] ?? [];
  return [siteScene, ...rest];
}
