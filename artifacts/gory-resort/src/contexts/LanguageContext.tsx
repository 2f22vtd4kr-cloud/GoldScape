import React, { createContext, useContext, useState, ReactNode } from 'react';
import { aiContent } from './ai-content';

type Language = 'en' | 'ru';

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_vision: { en: 'The Vision', ru: 'Видение' },
  nav_ski: { en: 'Ski', ru: 'Склоны' },
  nav_stay: { en: 'Stay', ru: 'Проживание' },
  nav_experiences: { en: 'Experiences', ru: 'Впечатления' },
  nav_invest: { en: 'Invest', ru: 'Инвестиции' },
  nav_gallery: { en: 'Gallery', ru: 'Галерея' },

  // Hero
  hero_tagline: { en: 'WHERE THE CAUCASUS MEETS THE FUTURE', ru: 'ГДЕ КАВКАЗ ВСТРЕЧАЕТ БУДУЩЕЕ' },
  hero_opening: { en: 'OPENING 2027', ru: 'ОТКРЫТИЕ В 2027 ГОДУ' },
  hero_sub: {
    en: 'Kazbegi, Greater Caucasus · Opening Q4 2027',
    ru: 'Казбеги, Большой Кавказ · Открытие Q4 2027',
  },
  hero_cta_discover: { en: 'DISCOVER THE MOUNTAIN', ru: 'ОТКРЫТЬ ГОРУ' },
  hero_cta_invest: { en: 'INVEST NOW', ru: 'ИНВЕСТИРОВАТЬ' },

  // Vision
  vision_title: { en: 'THE VISION', ru: 'ВИДЕНИЕ' },
  vision_stat_1_val: { en: '2,400–3,120', ru: '2 400–3 120' },
  vision_stat_1_lbl: { en: 'm altitude range', ru: 'м диапазон высот' },
  vision_stat_2_val: { en: '42', ru: '42' },
  vision_stat_2_lbl: { en: 'km of ski runs', ru: 'км горнолыжных трасс' },
  vision_stat_3_val: { en: '12', ru: '12' },
  vision_stat_3_lbl: { en: 'lifts planned', ru: 'подъёмников в проекте' },
  vision_stat_4_val: { en: '2027', ru: '2027' },
  vision_stat_4_lbl: { en: 'grand opening', ru: 'торжественное открытие' },
  vision_stat_5_val: { en: '35 min', ru: '35 мин' },
  vision_stat_5_lbl: { en: 'heli from Tbilisi', ru: 'вертолётом из Тбилиси' },
  vision_desc_1: {
    en: 'A new chapter in Caucasian mountain culture. GORY is not merely a resort — it is a new destination forged from ancient stone and visionary ambition.',
    ru: 'Новая глава горной культуры Кавказа. ГОРЫ — это не просто курорт. Это новое направление, рождённое из древнего камня и дальновидных амбиций.',
  },
  vision_desc_2: {
    en: "Set against the backdrop of the world's most dramatic mountain range, GORY will redefine alpine luxury for the next generation.",
    ru: 'На фоне самого драматичного горного массива в мире, ГОРЫ переосмыслят альпийскую роскошь для следующего поколения.',
  },
  vision_access: {
    en: 'Direct mountain access from Tbilisi International Airport — 2.5 hours by road via the Georgian Military Highway, or 35 minutes by helicopter transfer.',
    ru: 'Прямой доступ к горам из тбилисского аэропорта — 2,5 часа по Военно-Грузинской дороге или 35 минут вертолётом.',
  },
  vision_why_georgia_label: { en: 'WHY GEORGIA NOW', ru: 'ПОЧЕМУ ГРУЗИЯ И ПОЧЕМУ СЕЙЧАС' },
  vision_why_georgia: {
    en: "Georgia is experiencing an unprecedented influx of luxury hospitality investment. Foreign direct investment in tourism reached record levels in 2024, driven by full foreign ownership rights, a flat 20% corporate tax, and a location connecting Europe, the Middle East and Central Asia. GORY is positioned at the intersection of this investment boom and an untapped mountain terrain with snowfall records that rival the Swiss Alps.",
    ru: 'Грузия переживает беспрецедентный приток инвестиций в сферу роскошного гостеприимства. Прямые иностранные инвестиции в туризм достигли рекордного уровня в 2024 году благодаря праву полного иностранного владения, ставке корпоративного налога 20% и стратегическому положению страны на пересечении Европы, Ближнего Востока и Центральной Азии. GORY занимает уникальную позицию на стыке этого инвестиционного бума и нетронутого горного рельефа со снегопадами, сопоставимыми со Швейцарскими Альпами.',
  },

  // Ski
  ski_title: { en: 'THE MOUNTAIN', ru: 'ГОРА' },
  ski_framing: {
    en: '42km of curated, uncrowded pistes — designed for depth, not distance.',
    ru: '42 км продуманных, малолюдных трасс — качество важнее протяжённости.',
  },
  ski_cat_1: { en: 'BEGINNER', ru: 'НОВИЧОК' },
  ski_cat_2: { en: 'INTERMEDIATE', ru: 'ЛЮБИТЕЛЬ' },
  ski_cat_3: { en: 'EXPERT', ru: 'ЭКСПЕРТ' },
  ski_spec_1_val: { en: '800m', ru: '800 м' },
  ski_spec_1_lbl: { en: 'vertical drop', ru: 'перепад высот' },
  ski_spec_2_val: { en: 'Dec–Apr', ru: 'Дек–Апр' },
  ski_spec_2_lbl: { en: 'ski season', ru: 'лыжный сезон' },
  ski_spec_3_val: { en: '12', ru: '12' },
  ski_spec_3_lbl: { en: 'lifts (1 gondola)', ru: 'подъёмников (1 гондола)' },
  ski_spec_4_val: { en: '70%', ru: '70%' },
  ski_spec_4_lbl: { en: 'snowmaking', ru: 'охват снеговыми пушками' },
  ski_spec_5_val: { en: '380cm', ru: '380 см' },
  ski_spec_5_lbl: { en: 'avg snowfall / season', ru: 'снег за сезон (ср.)' },
  ski_spec_6_val: { en: '18,000', ru: '18 000' },
  ski_spec_6_lbl: { en: 'skiers / hr capacity', ru: 'лыжников/ч пропускная' },
  ski_spec_7_val: { en: '100%', ru: '100%' },
  ski_spec_7_lbl: { en: 'nightly piste grooming', ru: 'трасс грумируется ночью' },

  // Stay
  stay_title: { en: 'SANCTUARY', ru: 'УБЕЖИЩЕ' },
  stay_type_1: { en: 'The Peaks Collection', ru: 'Коллекция «Вершины»' },
  stay_desc_1: { en: '48 Suites', ru: '48 Сьютов' },
  stay_feat_1: {
    en: 'Ski storage & boot room · Ski-in / Ski-out · Butler service · Mountain-view terrace · 24h in-room dining',
    ru: 'Лыжное хранилище · Ski-in / Ski-out · Дворецкий · Терраса с видом на горы · Roomservice 24 ч',
  },
  stay_type_2: { en: 'Glacier Chalets', ru: 'Ледниковые Шале' },
  stay_desc_2: { en: '12 Private Chalets', ru: '12 Частных Шале' },
  stay_feat_2: {
    en: 'Private heated pool · Dedicated chalet host · Ski room & boot dryers · Guest vehicle service',
    ru: 'Частный бассейн с подогревом · Хозяйка шале · Лыжная комната · Трансфер',
  },
  stay_type_3: { en: 'Base Camp Residences', ru: 'Резиденции Базового Лагеря' },
  stay_desc_3: { en: '24 private residences — strictly limited', ru: '24 частные резиденции — строго ограниченный выпуск' },
  stay_feat_3: {
    en: 'Freehold title · Rental yield programme · Underground parking · Full resort concierge',
    ru: 'Право собственности · Программа арендного дохода · Подземный паркинг · Консьерж',
  },
  stay_price_1: { en: 'From €850 / night', ru: 'От €850 / ночь' },
  stay_price_2: { en: 'From €4,500 / night', ru: 'От €4 500 / ночь' },
  stay_price_3: { en: 'From $2.1M', ru: 'От $2,1 млн' },

  // Experiences
  exp_title: { en: 'ELEVATED EXPERIENCES', ru: 'ВЫСОКИЕ ВПЕЧАТЛЕНИЯ' },
  exp_1: { en: 'Skiing & Snowboarding', ru: 'Горные лыжи и сноуборд' },
  exp_desc_1: {
    en: '42km of groomed pistes across three zones, 400+ ha of off-piste terrain with guide access. Ski school and private instruction on-site.',
    ru: '42 км ухоженных трасс в трёх зонах, 400+ га фрирайда с гидом. Лыжная школа и частные инструкторы.',
  },
  exp_2: { en: 'Wellness & Spa', ru: 'Велнес и Спа' },
  exp_desc_2: {
    en: '2,800m² thermal spa complex with mineral pools, hammam and cryotherapy chambers. 600m² movement studio with resident physiotherapy.',
    ru: 'Термальный спа площадью 2800 м² с минеральными бассейнами, хаммамом и криотерапией. Студия движения 600 м² с физиотерапевтом.',
  },
  exp_3: { en: 'Heliskiing', ru: 'Хели-ски' },
  exp_desc_3: {
    en: '800km of untracked Greater Caucasus backcountry — the largest heli-accessible terrain in Europe. Packages of 10 and 25 runs with ACMG-certified guides. Dedicated base camp at 2,900m.',
    ru: '800 км нетронутого бэккантри Большого Кавказа — крупнейший хели-ски полигон Европы. Пакеты 10 и 25 спусков с сертифицированными гидами ACMG. Базовый лагерь на высоте 2900 м.',
  },
  exp_4: { en: 'Georgian Gastronomy', ru: 'Грузинская Гастрономия' },
  exp_desc_4: {
    en: '40,000 Georgian vintages — the largest private mountain wine cellar in the Caucasus. Three dining venues: the Grand Dining Room, a private qvevri cellar, and an open-air wood-fired feast pavilion.',
    ru: '40 000 грузинских вин — крупнейший частный горный погреб Кавказа. Три ресторана: Гранд-зал, частный погреб с квеври и открытый огненный павильон шеф-повара.',
  },
  exp_5: { en: 'Alpine Summer', ru: 'Горное Лето' },
  exp_desc_5: {
    en: 'June–September: 200km of marked trails and guided Caucasus ascents · 30km of dedicated mountain biking routes · Via ferrata through the Truso Gorge · Vertical garden restaurant and outdoor thermal pools open year-round.',
    ru: 'Июнь–Сентябрь: 200 км маршрутов и восхождения · 30 км горного велосипеда · Виа феррата в ущелье Трусо · Ресторан с вертикальным садом и термальные бассейны — круглогодично.',
  },

  // Investment
  inv_title: { en: 'INVEST IN THE CAUCASUS', ru: 'ИНВЕСТИРУЙТЕ В КАВКАЗ' },
  inv_subhead: {
    en: 'Limited early-stage investment positions available. Join the founding partners shaping the future of mountain luxury in Georgia.',
    ru: 'Ограниченное число позиций для инвесторов ранней стадии. Присоединяйтесь к партнерам-основателям, формирующим будущее горной роскоши в Грузии.',
  },
  inv_tier_1_title: { en: 'FOUNDATION PARTNER', ru: 'ПАРТНЁР-ОСНОВАТЕЛЬ' },
  inv_tier_1_desc: { en: 'from $500,000', ru: 'от $500,000' },
  inv_tier_1_ret: { en: '15% projected IRR', ru: '15% ожидаемая доходность (IRR)' },
  inv_tier_2_title: { en: 'SLOPE PARTNER', ru: 'ПАРТНЕР СКЛОНОВ' },
  inv_tier_2_desc: { en: 'from $250,000', ru: 'от $250,000' },
  inv_tier_2_ret: { en: '12% projected IRR', ru: '12% ожидаемая доходность (IRR)' },
  inv_tier_3_title: { en: 'SUMMIT MEMBER', ru: 'УЧАСТНИК ВЕРШИНЫ' },
  inv_tier_3_desc: { en: 'from $50,000', ru: 'от $50,000' },
  inv_tier_3_ret: { en: 'Resort membership + returns', ru: 'Членство в курорте + доход' },
  inv_tier_3_benefits: {
    en: '2 weeks guaranteed access annually · Priority room allocation · 20% F&B credit · Founding member events · Private wine cellar programme',
    ru: '2 недели гарантированного доступа · Приоритетное бронирование · Скидка 20% в ресторанах · Мероприятия для основателей · Винная программа',
  },
  inv_scarcity: {
    en: 'Foundation Partner allocation: 4 of 12 positions remaining · Summit Membership: limited founding intake open',
    ru: 'Позиции Партнёра-Основателя: 4 из 12 доступны · Членство Вершины: ограниченный первоначальный набор',
  },
  inv_cta: { en: 'REQUEST THE GORY INVESTMENT MEMORANDUM', ru: 'ЗАПРОСИТЬ ИНВЕСТИЦИОННЫЙ МЕМОРАНДУМ GORY' },
  inv_structure_label: { en: 'INVESTMENT STRUCTURE', ru: 'СТРУКТУРА ИНВЕСТИЦИЙ' },
  inv_timeline_label: { en: 'Timeline', ru: 'Горизонт' },
  inv_timeline: {
    en: '2024–2027 construction · Q4 2027 resort opening · 7-year target hold',
    ru: 'Строительство 2024–2027 · Открытие Q4 2027 · Целевой горизонт — 7 лет',
  },
  inv_exit_label: { en: 'Exit Strategy', ru: 'Стратегия выхода' },
  inv_exit: {
    en: 'Portfolio sale to institutional buyer or listing via Georgian Real Estate Investment Vehicle',
    ru: 'Продажа портфеля институциональному покупателю или листинг через REIT Грузии',
  },
  inv_legal_label: { en: 'Legal Framework', ru: 'Правовая база' },
  inv_legal: {
    en: 'Georgian Law on Investment Activity (2006). Full foreign ownership of Georgian property is permitted with no restrictions.',
    ru: 'Закон Грузии об инвестиционной деятельности (2006). Полное иностранное владение недвижимостью разрешено без ограничений.',
  },
  inv_team_label: { en: 'DEVELOPMENT TEAM', ru: 'КОМАНДА ЗАСТРОЙЩИКА' },
  inv_developer_name: { en: 'Caucasus Alpine Ventures (CAV)', ru: 'Caucasus Alpine Ventures (CAV)' },
  inv_developer_desc: {
    en: "Co-founded by David Kvaratskhelia (ex-VP Development, Gudauri Ski Holdings) and Tamara Beridze (Managing Partner, Georgian Infrastructure Fund). Construction by Alpine Builders GmbH — the team behind Kitzsteinhorn's 2021 expansion.",
    ru: 'Основатели: Давид Кварацхелия (экс-VP, Gudauri Ski Holdings) и Тамара Беридзе (партнёр-распорядитель, Georgian Infrastructure Fund). Строительство: Alpine Builders GmbH (расширение Kitzsteinhorn, 2021).',
  },
  inv_irr_label: { en: 'IRR Basis', ru: 'Основа IRR' },
  inv_irr_desc: {
    en: "Projections underwritten by 10-year comparable ADR and occupancy data from Gudauri (est. 2020), Mestia, and Val d'Isère peer set. Stress-tested at −20% occupancy and −15% ADR scenarios.",
    ru: "Проекции основаны на 10-летней сравнительной статистике ADR и загрузки Гудаури, Местии и Валь д'Изера. Стресс-тест: −20% загрузка, −15% ADR.",
  },

  // Form / Contact
  form_title: { en: 'CONNECT', ru: 'СВЯЗЬ' },
  form_name: { en: 'Name', ru: 'Имя' },
  form_email: { en: 'Email', ru: 'Email' },
  form_interest: { en: 'I am a', ru: 'Я являюсь' },
  form_interest_inv: { en: 'Investor', ru: 'Инвестор' },
  form_interest_guest: { en: 'Guest', ru: 'Гость' },
  form_interest_media: { en: 'Media', ru: 'Медиа' },
  form_message: { en: 'Message', ru: 'Сообщение' },
  form_submit: { en: 'SUBMIT INQUIRY', ru: 'ОТПРАВИТЬ ЗАПРОС' },
  form_success: {
    en: 'Message received. Our team will respond within 4 business hours.',
    ru: 'Сообщение получено. Наша команда ответит в течение 4 рабочих часов.',
  },
  contact_response_time: {
    en: 'Investor enquiries responded to within 4 business hours',
    ru: 'Запросы инвесторов — ответ в течение 4 рабочих часов',
  },
  contact_schedule_cta: {
    en: 'Schedule a Private Presentation →',
    ru: 'Запланировать частную презентацию →',
  },

  // Gallery
  gallery_title: { en: 'GALLERY', ru: 'ГАЛЕРЕЯ' },
  gallery_cap_1: { en: 'The Lounge — Peaks Collection, dusk service', ru: 'Лаунж-зона — The Peaks Collection, вечернее обслуживание' },
  gallery_cap_2: { en: 'Summit Gondola — 12-lift network, base to 3,120m', ru: 'Гондола на вершину — сеть из 12 подъёмников, от базы до 3120 м' },
  gallery_cap_3: { en: 'Truso Valley, looking north toward the Georgian Military Road', ru: 'Ущелье Трусо, вид на север к Военно-Грузинской дороге' },
  gallery_cap_5: { en: 'Expert terrain — off-piste descent from 3,120m, Greater Caucasus', ru: 'Трасса для профессионалов — внетрассовый спуск с 3120 м, Большой Кавказ' },
  gallery_cap_4: { en: 'Georgian feast — one of three dining venues on site', ru: 'Грузинское застолье — одно из трёх заведений на территории курорта' },
  gallery_progress_label: { en: 'BEHIND THE BUILD', ru: 'ЗА КУЛИСАМИ СТРОИТЕЛЬСТВА' },
  gallery_milestone_1: {
    en: 'Q3 2024 — Site surveys complete. 400ha terrain mapped. Environmental impact assessment approved by Georgian Ministry of Environmental Protection.',
    ru: 'Q3 2024 — Геодезические работы завершены. 400 га территории картографированы. Оценка воздействия на окружающую среду одобрена.',
  },
  gallery_milestone_2: {
    en: 'Q1 2025 — Foundation works begin. Access road to base village (2,400m) graded and sealed. Mountain water and power infrastructure commissioned.',
    ru: 'Q1 2025 — Начало фундаментных работ. Подъездная дорога к базовому посёлку (2400 м) обустроена. Запущены горные коммуникации.',
  },
  gallery_milestone_3: {
    en: 'Q4 2025 — Lift pylon foundations installed. First gondola tower erected. Peaks Collection structural works at 40% completion.',
    ru: 'Q4 2025 — Установлены фундаменты опор подъёмников. Возведена первая башня гондолы. Строительство Peaks Collection — готовность 40%.',
  },
  gallery_milestone_4: {
    en: 'Q4 2027 — Grand Opening. Full resort photography and investor progress documentation released.',
    ru: 'Q4 2027 — Торжественное открытие. Публикация официальной фотодокументации для инвесторов.',
  },
  gallery_film_label: { en: 'THE FILM', ru: 'ФИЛЬМ' },
  gallery_film_desc: {
    en: 'A 90-second cinematic portrait of GORY — shot on location in the Truso Valley. Releasing Q4 2026.',
    ru: '90-секундный кинематографический портрет GORY, снятый в ущелье Трусо. Выход — Q4 2026.',
  },

  // Press
  press_label: { en: 'AS DISCUSSED IN', ru: 'О НАС ГОВОРЯТ' },

  // Footer
  footer_address: { en: 'Kazbegi Municipality, Mtskheta-Mtianeti, Georgia', ru: 'Муниципалитет Казбеги, Мцхета-Мтианети, Грузия' },
  footer_privacy: { en: 'Privacy', ru: 'Конфиденциальность' },
  footer_terms: { en: 'Terms', ru: 'Условия' },
  footer_investors: { en: 'Investor Relations', ru: 'Инвесторам' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    // AI-generated patches overlay static translations
    const entry = aiContent[key] ?? translations[key];
    if (!entry) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return entry[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
