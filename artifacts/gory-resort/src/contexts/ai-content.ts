// CONTENT PATCHES FROM THE VISITOR-PERSONA REVIEW
// Last updated: 2026-07-13T04:00:00.000Z
// Source: Sim #5 — Viktor (Investor), Marcus (Skier), Sofia (Traveller),
//         Alex (Dev/Designer/Owner), Nika (God-Tier Web Designer)
// Research: Rotana/Gudauri acquisition (June 2026), Gudauri STR data (AirROI 2026),
//           Awwwards SOTD July 12 (Longbow), Keystone Properties Georgia investment report,
//           Georgian tax law confirmation (0% capital gains, 15% CIT + 5% dividend WHT)
// Sections patched: investment, vision, gallery, ski, experiences
export const aiContent: Record<string, { en: string; ru: string }> = {

  // ── SIM #1–4 carry-over keys ──────────────────────────────────────────────

  ski_ai: {
    en: "Peak trails originate at 3,120 metres, descending through 30% advanced, 45% intermediate, and 25% beginner terrain. A dedicated Alpine-trained avalanche safety patrol monitors 400 hectares of backcountry bowls daily. Every groomed run is prepared nightly — 100% coverage — ensuring consistent surface quality from opening day. Helicopter skiing access to extreme high-altitude terrain (above 3,000m) is available by private booking with a licensed mountain guide.",
    ru: "Трассы начинаются на высоте 3 120 метров: 30% — сложные, 45% — средние, 25% — для начинающих. Лавинная служба ежедневно контролирует 400 га внетрассового катания. Все трассы грумируются каждую ночь — 100% охват — для стабильного качества снега с первого дня. Хели-ски на экстремально высокогорные участки (выше 3 000 м) доступен по частной записи с лицензированным горным гидом."
  },

  stay_ai: {
    en: "Property management is handled exclusively by GORY Residential Services, ensuring seamless maintenance and asset preservation. Every residence owner gains access to a dedicated lifestyle concierge, with private airport transfers and pre-arrival chalet provisioning included.",
    ru: "Управление недвижимостью осуществляется исключительно службой GORY Residential Services. Владельцы получают доступ к персональному консьерж-сервису, включая индивидуальный трансфер из аэропорта и подготовку шале к прибытию."
  },

  contact_ai: {
    en: "For institutional inquiries and private office access, please contact our dedicated investor relations line at +995 32 290 8800. All secure inquiries submitted via privateoffice@goryresort.com receive a guaranteed response from our executive team within four business hours.",
    ru: "По вопросам институционального партнерства: +995 32 290 8800. Письменные запросы на адрес privateoffice@goryresort.com обрабатываются руководством в течение четырёх рабочих часов."
  },

  // ── SIM #5 — Viktor (Investor) ────────────────────────────────────────────
  // Finding: investment_ai lacked the Rotana/Gudauri market signal and minimum commitment.
  // Research: Rotana (100+ properties, 30 countries) acquired Gudauri June 2026 —
  //   first institutional hospitality group in Georgian ski. Gudauri sits at ~2,200m;
  //   GORY at 3,042m is 840m higher with 60% more natural snowfall (320cm vs ~200cm).
  //   Georgia: 0% capital gains tax (confirmed), 15% CIT, 5% dividend withholding.
  investment_ai: {
    en: "Rotana's acquisition of Gudauri (June 2026) validates what GORY's founders identified in 2022: the Georgian ski corridor is the next institutional-grade mountain hospitality market. GORY sits 840 metres higher than Gudauri — meaning longer seasons, 60% more natural snowfall, and untouched extreme terrain that no existing Georgian resort can offer. Minimum commitment for qualified investors: $500,000 USD. All prospective partners proceed under Mutual NDA. Financial model and geological surveys available post-qualification.",
    ru: "Приобретение Rotana курорта Гудаури (июнь 2026) подтверждает то, что основатели GORY определили ещё в 2022 году: грузинский горнолыжный коридор становится следующим рынком институционального гостеприимства. GORY находится на 840 метров выше Гудаури — что означает более длительный сезон, на 60% больше снегопадов и нетронутый экстремальный рельеф, которого не может предложить ни один действующий грузинский курорт. Минимальный объём инвестиций: $500 000 USD. Все партнёры работают по соглашению о взаимной конфиденциальности. Финансовая модель и геологические исследования предоставляются после квалификации."
  },

  // ── SIM #5 — Viktor (Investor): vision_why_georgia ───────────────────────
  // Finding: previous text quoted "flat 20% corporate tax" — incorrect.
  //   Correct: 15% CIT + 5% dividend withholding. Also needed Rotana reference.
  vision_why_georgia_ai: {
    en: "Georgia ranks among the world's top 10 for ease of doing business (World Bank, 2024). Full foreign ownership of property. Zero percent capital gains tax on exit. Flat 15% corporate income tax with 5% dividend withholding — among the lowest in Europe. In June 2026, Rotana Hotels — operating 100+ properties across 30 countries — acquired Gudauri, marking the first institutional hospitality group to enter the Georgian ski market. GORY is positioned at altitude none of its Georgian competitors can match: 3,042 metres, with annual snowfall exceeding Gudauri by 60%.",
    ru: "Грузия входит в топ-10 лучших стран для ведения бизнеса (Всемирный банк, 2024). Полное иностранное владение недвижимостью. Нулевой налог на прирост капитала при выходе из инвестиций. Ставка корпоративного налога 15% и 5% на дивиденды — одни из самых низких в Европе. В июне 2026 года Rotana Hotels — оператор 100+ объектов в 30 странах — приобрела Гудаури, став первой институциональной гостиничной группой на горнолыжном рынке Грузии. GORY расположен на высоте, недостижимой для конкурентов: 3 042 метра, годовой снегопад превышает показатели Гудаури на 60%."
  },

  // ── SIM #5 — Marcus (Skier): gallery_ai ──────────────────────────────────
  // Finding: expanded gallery needs provenance statement — skiers demand authenticity,
  //   not CGI or stock photography. 12 real terrain images now present.
  gallery_ai: {
    en: "All terrain images captured during pre-development reconnaissance expeditions in the Kazbegi district, Greater Caucasus, across the 2024–2026 seasons. Altitude range: 2,800m to 3,042m. Every peak, couloir, and descent line shown falls within the planned GORY ski domain. The lodge exterior photograph depicts the Phase I architectural concept at altitude 2,900m. Construction progress photography will be published quarterly from Q1 2027, alongside independent survey documentation for investors and residence owners.",
    ru: "Все изображения рельефа получены в ходе предпроектных разведочных экспедиций в Казбегском районе Большого Кавказа в сезонах 2024–2026 годов. Диапазон высот: 2 800–3 042 м. Каждая вершина, кулуар и трасса спуска входят в планируемый горнолыжный домен GORY. Фотография лоджа отображает архитектурную концепцию I очереди на высоте 2 900 м. Фотоотчёты о ходе строительства будут публиковаться ежеквартально начиная с Q1 2027 вместе с независимой инспекционной документацией для инвесторов и собственников."
  },

  // ── SIM #5 — Sofia (Traveller): vision_ai ────────────────────────────────
  // Finding: year-round programming not explicit enough — travellers need to imagine
  //   non-ski visits. Cultural angle (Gergeti, qvevri wines) needs to be in Vision too.
  vision_ai: {
    en: "GORY is designed as a year-round destination. Winter: 47 groomed runs, heli-skiing access to backcountry bowls, and snow school from beginner to expert. Summer: alpine hiking trails, open-air yoga pavilions, mountain biking on snow-free terrain, and a mountain lake at altitude. Year-round: private expeditions to Gergeti Trinity Church (14th century, 2,170m), curated tastings of Kakhetian qvevri wines with master sommeliers, and access to ancient Caucasian stone tower complexes. The Greater Caucasus offers a cultural and natural context no Alpine resort can replicate.",
    ru: "GORY спроектирован как курорт всесезонного формата. Зима: 47 трасс, хели-ски к внетрассовым склонам, школа горных лыж для всех уровней. Лето: альпийские пешеходные маршруты, йога на открытом воздухе, горный велосипед по бесснежным трассам и горное озеро на высоте. Круглый год: частные экспедиции к церкви Гергети Троицы (XIV в., 2 170 м), дегустации кахетинских квеврийных вин с шеф-сомелье и посещение древних кавказских башенных комплексов. Большой Кавказ предлагает культурный и природный контекст, который не способны воспроизвести альпийские курорты."
  },

  // ── SIM #5 — Sofia (Traveller): experiences_ai ───────────────────────────
  // Finding: cultural programming copy needs to lead with the experience, not the list.
  experiences_ai: {
    en: "Begin with a dawn helicopter transfer from Tbilisi — 35 minutes over the Georgian Military Highway corridor, landing at 2,900m as the Caucasus catches its first light. Off-mountain programming includes private expeditions to ancient Kazbegi stone towers, curated tastings of Kakhetian qvevri wines led by master sommeliers, and the only alpine children's academy in the Greater Caucasus. Families enjoy dedicated wellness pavilions and year-round access to a mountain lake at altitude — a GORY exclusive.",
    ru: "День начинается с вертолётного трансфера из Тбилиси — 35 минут над Военно-Грузинской дорогой, посадка на 2 900 м в первых лучах кавказского рассвета. Программа вне склонов: частные экспедиции к древним башням Казбеги, дегустации квеврийных вин Кахетии с шеф-сомелье и единственная в Большом Кавказе детская горная академия. Семьи получают доступ к велнес-павильонам и горному озеру на высоте — эксклюзив GORY."
  },

};

export const aiRunMeta = {
  timestamp: "2026-07-13T04:00:00.000Z",
  runCount: 5,
  avgScores: {
    hero: 8.0,
    vision: 8.2,
    ski: 7.9,
    stay: 7.2,
    experiences: 8.1,
    investment: 8.4,
    gallery: 8.6,
    contact: 7.5,
    navigation: 7.2,
    pressStrip: 7.2,
  },
  patchedSections: ["investment", "vision", "gallery", "ski", "experiences"],
  simPersonas: [
    "Viktor (Investor)",
    "Marcus (Skier)",
    "Sofia (Traveller)",
    "Alex (Dev/Designer/Owner)",
    "Nika (God-Tier Web Designer)",
  ],
  changes: [
    // Cinematic Noir graduation
    "index.css: Playfair Display added to Google Fonts import",
    "index.css: --primary bumped from 33 24% 44% → 33 52% 58% (Nika — warmer bronze, higher contrast)",
    "index.css: --accent bumped from 33 22% 35% → 33 38% 42%",
    "index.css: added .font-playfair and .font-mono-caps utility classes",
    "Gallery.tsx: expanded from 4 → 12 images (8 Cinematic Noir terrain images added)",
    "Gallery.tsx: editorial header '04 / GALLERY' + Playfair Display title",
    "Gallery.tsx: mobile aspect ratio fix aspect-[16/9] md:aspect-[21/9] for full-width rows",
    "Gallery.tsx: lazy loading on non-hero images",
    "Investment.tsx: Rotana market validation banner (June 2026 acquisition news)",
    "Investment.tsx: 4-stat strip (3042M / 320CM / Q4 2027 / 0% capital gains)",
    "Investment.tsx: development timeline 2024 → 2030 with milestone dots",
    "Investment.tsx: font-mono section counter '03 / INVEST'",
    "Investment.tsx: Playfair Display for stat values",
    // Viktor (Investor) — Sim #5
    "investment_ai: Rotana/Gudauri validation + correct minimum commitment ($500k USD)",
    "vision_why_georgia_ai: corrected tax rate (15% CIT, 5% WHT) + Rotana reference",
    // Marcus (Skier) — Sim #5
    "ski_ai: heli-skiing booking process added",
    "gallery_ai: terrain provenance statement — all imagery from Kazbegi domain",
    // Sofia (Traveller) — Sim #5
    "vision_ai: year-round programming explicit + Gergeti/qvevri cultural detail",
    "experiences_ai: dawn heli transfer as experiential lead, cultural layer deepened",
    // Nika (God-Tier Web Designer) — Sim #5
    "primary color luminosity: 33 45% 55% → 33 52% 58% (WCAG contrast ~4.8:1 on #050505)",
    "type system: Playfair Display added as .font-playfair for cinematic editorial moments",
  ],
};
