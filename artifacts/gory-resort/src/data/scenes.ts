/**
 * scenes.ts
 *
 * Scene image sets for each property listing.
 * 
 * Architecture:
 * - Each entry is keyed by listing id
 * - Scenes are ordered: architecture (exterior → section → floorplan) → life → bizarre
 * - The site/location map is injected dynamically from listing.locationMap.image in PropertyDetail
 * - Images live in /images/scenes/{slug}.jpg (public folder)
 * 
 * Consistency principle ("property DNA"):
 *   All scenes for a given listing were generated with the same DNA string describing the property's
 *   architecture, materials, palette, and distinctive features — ensuring visual coherence across
 *   exterior, cross-section, life, and bizarre images.
 */
import type { PropertyScene } from '@/components/PropertyScenesCarousel';

type SceneMap = Record<number, PropertyScene[]>;

export const PROPERTY_SCENES: SceneMap = {
  /* ── 1 · Palm Jumeirah, Dubai ──────────────────────────────────── */
  1: [
    { id: 'p1-exterior',  type: 'exterior',      category: 'architecture', label: 'Экстерьер',           sublabel: 'Башня на Пальме',          image: '/images/scenes/p1-exterior.jpg'  },
    { id: 'p1-section',   type: 'section',       category: 'architecture', label: 'Разрез',              sublabel: 'Горизонтальный срез, эт. 18', image: '/images/scenes/p1-section.jpg'   },
    { id: 'p1-floorplan', type: 'floorplan',     category: 'architecture', label: 'Планировка',          sublabel: 'Этаж 18',                  image: '/images/scenes/p1-floorplan.jpg' },
    { id: 'p1-bbq',       type: 'life_bbq',      category: 'life',         label: 'Барбекю на террасе',  sublabel: 'Вечер, залив внизу',       image: '/images/scenes/p1-bbq.jpg'      },
    { id: 'p1-matchday',  type: 'life_matchday', category: 'life',         label: 'Матч-день',           sublabel: 'Champions League, весь дом', image: '/images/scenes/p1-matchday.jpg' },
    { id: 'p1-bizarre',   type: 'bizarre',       category: 'bizarre',      label: 'Ocean\'s Eleven',     sublabel: 'Планирование операции',     image: '/images/scenes/p1-bizarre.jpg'  },
  ],

  /* ── 2 · Dubai Marina Studio ────────────────────────────────────── */
  2: [
    { id: 'p2-exterior', type: 'exterior',   category: 'architecture', label: 'Экстерьер',        sublabel: 'Башня у канала',        image: '/images/scenes/p2-exterior.jpg' },
    { id: 'p2-party',    type: 'life_party', category: 'life',         label: 'Вечеринка',        sublabel: 'Ночь, вся студия',      image: '/images/scenes/p2-party.jpg'    },
    { id: 'p2-bizarre',  type: 'bizarre',    category: 'bizarre',      label: 'Волк с Марины',    sublabel: 'Дирхамы и речь',        image: '/images/scenes/p2-bizarre.jpg'  },
  ],

  /* ── 3 · Downtown Dubai Penthouse ───────────────────────────────── */
  3: [
    { id: 'p3-exterior', type: 'exterior',      category: 'architecture', label: 'Экстерьер',        sublabel: 'Вид Burj Khalifa',      image: '/images/scenes/p3-exterior.jpg'  },
    { id: 'p3-section',  type: 'section',       category: 'architecture', label: 'Разрез дуплекса',  sublabel: 'Оба этажа',             image: '/images/scenes/p3-section.jpg'   },
    { id: 'p3-matchday', type: 'life_matchday', category: 'life',         label: 'Финал ЛЧ',         sublabel: 'Весь дуплекс в деле',   image: '/images/scenes/p3-matchday.jpg'  },
  ],

  /* ── 4 · Arabian Ranches Villa ──────────────────────────────────── */
  4: [
    { id: 'p4-exterior', type: 'exterior',  category: 'architecture', label: 'Экстерьер',        sublabel: 'Вилла и сад',           image: '/images/scenes/p4-exterior.jpg' },
    { id: 'p4-bbq',      type: 'life_bbq', category: 'life',         label: 'Барбекю в саду',   sublabel: 'Семейная суббота',       image: '/images/scenes/p4-bbq.jpg'      },
    { id: 'p4-bizarre',  type: 'bizarre',  category: 'bizarre',      label: 'Тигр в бассейне',  sublabel: 'The Hangover, Dubai',    image: '/images/scenes/p4-bizarre.jpg'  },
  ],

  /* ── 5 · Istanbul Beşiktaş ──────────────────────────────────────── */
  5: [
    { id: 'p5-exterior', type: 'exterior',    category: 'architecture', label: 'Экстерьер',        sublabel: 'Исторический фасад',      image: '/images/scenes/p5-exterior.jpg' },
    { id: 'p5-family',   type: 'life_family', category: 'life',         label: 'Семейное утро',    sublabel: 'Воскресный завтрак',      image: '/images/scenes/p5-family.jpg'   },
    { id: 'p5-bizarre',  type: 'bizarre',     category: 'bizarre',      label: 'Базар ковров',     sublabel: 'Прямо в гостиной',        image: '/images/scenes/p5-bizarre.jpg'  },
  ],

  /* ── 6 · Antalya Lara Beach ─────────────────────────────────────── */
  6: [
    { id: 'p6-exterior', type: 'exterior',  category: 'architecture', label: 'Экстерьер',        sublabel: 'Вилла у моря',          image: '/images/scenes/p6-exterior.jpg' },
    { id: 'p6-bbq',      type: 'life_bbq', category: 'life',         label: 'Вечеринка у бассейна', sublabel: 'Закат, 8 гостей',   image: '/images/scenes/p6-bbq.jpg'      },
    { id: 'p6-bizarre',  type: 'bizarre',  category: 'bizarre',      label: 'Прилетел на вертолёте', sublabel: 'Прямо в бассейн', image: '/images/scenes/p6-bizarre.jpg'  },
  ],

  /* ── 7 · Limassol Germasogeia ───────────────────────────────────── */
  7: [
    { id: 'p7-exterior', type: 'exterior', category: 'architecture', label: 'Экстерьер',        sublabel: 'Кипрский фасад',        image: '/images/scenes/p7-exterior.jpg' },
    { id: 'p7-life',     type: 'life_bbq', category: 'life',         label: 'Удалённая работа', sublabel: 'IT-команда с видом на море', image: '/images/scenes/p7-life.jpg' },
    { id: 'p7-bizarre',  type: 'bizarre',  category: 'bizarre',      label: 'Non-Dom ритуал',   sublabel: 'Налоговые консультанты', image: '/images/scenes/p7-bizarre.jpg'  },
  ],

  /* ── 8 · Paphos Koloni ──────────────────────────────────────────── */
  8: [
    { id: 'p8-exterior', type: 'exterior', category: 'architecture', label: 'Экстерьер',        sublabel: 'Вилла и сад, Пафос',    image: '/images/scenes/p8-exterior.jpg' },
    { id: 'p8-bizarre',  type: 'bizarre',  category: 'bizarre',      label: 'Сократ в гостевом домике', sublabel: 'Занятия философией', image: '/images/scenes/p8-bizarre.jpg' },
  ],

  /* ── 9 · Batumi Seafront ────────────────────────────────────────── */
  9: [
    { id: 'p9-exterior', type: 'exterior',   category: 'architecture', label: 'Экстерьер',        sublabel: 'Высотка у Чёрного моря', image: '/images/scenes/p9-exterior.jpg' },
    { id: 'p9-party',    type: 'life_party', category: 'life',         label: 'Новый год',        sublabel: 'Фейерверк над морем',    image: '/images/scenes/p9-party.jpg'    },
    { id: 'p9-bizarre',  type: 'bizarre',    category: 'bizarre',      label: 'Сувенирный киоск', sublabel: 'Прямо в гостиной',       image: '/images/scenes/p9-bizarre.jpg'  },
  ],

  /* ── 10 · Tbilisi Vake Penthouse ────────────────────────────────── */
  10: [
    { id: 'p10-exterior', type: 'exterior', category: 'architecture', label: 'Экстерьер',        sublabel: 'Пентхаус, Ваке',        image: '/images/scenes/p10-exterior.jpg' },
    { id: 'p10-bizarre',  type: 'bizarre',  category: 'bizarre',      label: 'Хор на террасе',   sublabel: 'Внезапно, 8 голосов',   image: '/images/scenes/p10-bizarre.jpg'  },
  ],

  /* ── 11 · Phuket Rawai ──────────────────────────────────────────── */
  11: [
    { id: 'p11-exterior', type: 'exterior',  category: 'architecture', label: 'Экстерьер',        sublabel: 'Тропическая вилла',     image: '/images/scenes/p11-exterior.jpg' },
    { id: 'p11-bbq',      type: 'life_bbq', category: 'life',         label: 'Тропическое барбекю', sublabel: 'Пять гостей у бассейна', image: '/images/scenes/p11-bbq.jpg'  },
    { id: 'p11-bizarre',  type: 'bizarre',   category: 'bizarre',      label: 'Слон в саду',      sublabel: 'Добродушный, непрошеный', image: '/images/scenes/p11-bizarre.jpg' },
  ],

  /* ── 12 · Belgrade Savski Venac ─────────────────────────────────── */
  12: [
    { id: 'p12-exterior', type: 'exterior', category: 'architecture', label: 'Экстерьер',        sublabel: 'Межвоенное здание',     image: '/images/scenes/p12-exterior.jpg' },
    { id: 'p12-bizarre',  type: 'bizarre',  category: 'bizarre',      label: 'Слава',            sublabel: '20 родственников, хаос', image: '/images/scenes/p12-bizarre.jpg' },
  ],

  /* ── 13 · Lisbon Campo de Ourique ───────────────────────────────── */
  13: [
    { id: 'p13-exterior', type: 'exterior', category: 'architecture', label: 'Экстерьер',        sublabel: 'Азулежу, Лиссабон',     image: '/images/scenes/p13-exterior.jpg' },
    { id: 'p13-bizarre',  type: 'bizarre',  category: 'bizarre',      label: 'Три дня фаду',     sublabel: 'Мелодрама нон-стоп',    image: '/images/scenes/p13-bizarre.jpg'  },
  ],

  /* ── 14 · Algarve Vale do Lobo ──────────────────────────────────── */
  14: [
    { id: 'p14-exterior', type: 'exterior',  category: 'architecture', label: 'Экстерьер',        sublabel: 'Вилла на гольф-курорте', image: '/images/scenes/p14-exterior.jpg' },
    { id: 'p14-bbq',      type: 'life_bbq', category: 'life',         label: 'После гольфа',     sublabel: 'Барбекю у Атлантики',   image: '/images/scenes/p14-bbq.jpg'      },
    { id: 'p14-bizarre',  type: 'bizarre',   category: 'bizarre',      label: 'Мяч в бассейне',   sublabel: 'Кедди по колено в воде', image: '/images/scenes/p14-bizarre.jpg'  },
  ],

  /* ── 15 · Koh Samui Chaweng Noi ─────────────────────────────────── */
  15: [
    { id: 'p15-exterior', type: 'exterior', category: 'architecture', label: 'Экстерьер',        sublabel: 'Вилла над заливом',     image: '/images/scenes/p15-exterior.jpg' },
    { id: 'p15-bizarre',  type: 'bizarre',  category: 'bizarre',      label: 'Кабаре на террасе', sublabel: 'Самуи, закат',          image: '/images/scenes/p15-bizarre.jpg' },
  ],

  /* ── 16 · Dubai Business Bay ────────────────────────────────────── */
  16: [
    { id: 'p16-exterior',  type: 'exterior',      category: 'architecture', label: 'Экстерьер',      sublabel: 'Вид на канал',          image: '/images/scenes/p16-exterior.jpg'  },
    { id: 'p16-matchday',  type: 'life_matchday', category: 'life',         label: 'Матч-день',      sublabel: 'DIFC коллеги, ЛЧ',      image: '/images/scenes/p16-matchday.jpg'  },
    { id: 'p16-bizarre',   type: 'bizarre',       category: 'bizarre',      label: 'Крипто-вар-рум', sublabel: '6 мониторов, луна',     image: '/images/scenes/p16-bizarre.jpg'   },
  ],

  /* ── 17 · Limassol Marina (new real listing) ────────────────────── */
  17: [
    { id: 'p17-exterior', type: 'exterior', category: 'architecture', label: 'Экстерьер',        sublabel: '35-этажная башня на набережной', image: '/images/scenes/p17-exterior.jpg' },
    { id: 'p17-life',     type: 'life_bbq', category: 'life',         label: 'Приёмка объекта',  sublabel: 'Шестой этаж, вид на марину', image: '/images/scenes/p17-life.jpg'    },
    { id: 'p17-bizarre',  type: 'bizarre',  category: 'bizarre',      label: 'Non-Dom ритуал №2', sublabel: 'Три бухгалтера и море',    image: '/images/scenes/p17-bizarre.jpg' },
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
    label: 'Расположение',
    sublabel: 'Изометрическая карта',
    image: siteMapImage,
  };
  const rest = PROPERTY_SCENES[id] ?? [];
  return [siteScene, ...rest];
}
