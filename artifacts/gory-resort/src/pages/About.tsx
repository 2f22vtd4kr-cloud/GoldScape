import { useState } from 'react';
import { CheckCircle2, Mail, MessageCircle, Send, SendHorizonal } from 'lucide-react';
import { Layout } from '@/components/Layout';

const PROCESS_STEPS = [
  {
    num: '01',
    badge: '30 минут · Бесплатно',
    title: 'Консультация',
    desc: 'Рассказываем о доступных направлениях, объясняем юридические нюансы и помогаем сформировать бюджет. Без давления и скрытых целей.',
    items: ['Анализ вашей ситуации', 'Расчёт бюджета', 'Подбор страны'],
    image: '/chrome/blob-iridescent-1.png',
    reverse: false,
  },
  {
    num: '02',
    badge: '3–5 рабочих дней',
    title: 'Подбор объектов',
    desc: 'Формируем персонализированную подборку из нашего портфеля и баз партнёров (fäm Properties, H&S Real Estate и др.). Только объекты, прошедшие наш аудит.',
    items: ['Подборка под бюджет', 'Проверенные объекты', 'Виртуальные туры'],
    image: '/chrome/ring-chrome.png',
    reverse: true,
  },
  {
    num: '03',
    badge: '5–10 дней',
    title: 'Юридическое сопровождение',
    desc: 'Проверка права собственности, история объекта, налоговые последствия, структурирование сделки. Мы работаем с местными юристами в каждой стране.',
    items: ['Due diligence', 'Договор купли-продажи', 'Нотариальное заверение'],
    image: '/chrome/blob-iridescent-2.png',
    reverse: false,
  },
  {
    num: '04',
    badge: '2–5 дней',
    title: 'Закрытие сделки и ВНЖ',
    desc: 'Подписание, передача ключей, регистрация собственности. При необходимости — сопровождение в получении вида на жительство (ОАЭ, Кипр, Турция, Грузия).',
    items: ['Регистрация собственности', 'Программы ВНЖ', 'Постпродажный сервис'],
    image: '/chrome/drip-chrome.png',
    reverse: true,
  },
];

const DESTINATIONS = [
  {
    code: 'DXB',
    title: 'ОАЭ / Дубай',
    points: ['0% налог на доход и прирост капитала', 'Golden Visa от $545,000', 'Крупнейший рынок среди эмигрантов из России'],
    threshold: 'от $368,000',
    visa: 'ВНЖ: Golden Visa',
  },
  {
    code: 'IST',
    title: 'Турция / Стамбул и Анталья',
    points: ['Гражданство от $400,000 (ускоренный процесс)', 'Высокий спрос на аренду, доходность 5–8%', '№1 по покупкам среди россиян 50 месяцев подряд'],
    threshold: 'от $120,000',
    visa: 'ВНЖ: Ikamet + Гражданство',
  },
  {
    code: 'LCA',
    title: 'Кипр / Лимасол',
    points: ['Член ЕС — доступ к Шенгену', 'Non-dom режим: льготное налогообложение', 'Лимасол — финансовая столица Кипра'],
    threshold: 'от €180,000',
    visa: 'ВНЖ: EU Residency',
  },
  {
    code: 'TBS',
    title: 'Грузия / Тбилиси и Батуми',
    points: ['Территориальный налог: 0% на зарубежный доход', 'Самый доступный рынок для старта', 'Без виз для граждан РФ до 1 года'],
    threshold: 'от $60,000',
    visa: 'ВНЖ: Residence permit',
  },
  {
    code: 'HKT',
    title: 'Таиланд / Пхукет и Паттайя',
    points: ['Thailand Elite Visa — ВНЖ от $15,000', 'Высокий туристический рентный доход', 'Тёплый климат, развитая инфраструктура'],
    threshold: 'от $85,000',
    visa: 'ВНЖ: Elite Visa',
  },
  {
    code: 'BEG',
    title: 'Сербия / Белград',
    points: ['Безвизовый въезд, простая регистрация', 'Самая доступная недвижимость в Европе', 'Динамично растущий рынок (рост 12% за 2025)'],
    threshold: 'от €75,000',
    visa: 'ВНЖ: Boravišna dozvola',
  },
];

const FAQ = [
  {
    q: 'Как легально перевести деньги за рубеж для покупки недвижимости?',
    a: 'Основные механизмы: международный банковский перевод (SWIFT/SEPA) через банки-нерезиденты, покупка через юрлицо в нейтральной юрисдикции (Грузия, Армения, Сербия), оплата из уже открытых зарубежных счетов, а также легальные инструменты конвертации. Конкретный маршрут зависит от суммы, страны назначения и вашей ситуации с банком. Разбираем на первой консультации — бесплатно и без давления. Все рекомендации выдаёт наш юридический департамент письменно.',
  },
  {
    q: 'Нужно ли мне лично ехать для покупки?',
    a: 'Нет. Большинство сделок в ОАЭ, Грузии и Сербии закрываются дистанционно через нотариальную доверенность. На Кипре и в Турции часто требуется личное присутствие — мы организуем поездку под ключ.',
  },
  {
    q: 'Сколько стоят ваши услуги?',
    a: 'Для покупателя — бесплатно. Наше вознаграждение выплачивается агентством-продавцом из комиссии, принятой на рынке страны. Вы не переплачиваете.',
  },
  {
    q: 'Можно ли купить за криптовалюту?',
    a: 'В ОАЭ — да, ряд застройщиков принимает USDT/BTC напрямую. В других странах конвертация обязательна. Мы помогаем с безопасным обменом через лицензированные платформы.',
  },
];

export default function About() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      {/* PAGE HEADER */}
      <section className="relative pt-28 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle accent — absolutely-positioned wrapper so it never affects flow */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '520px', height: '520px', pointerEvents: 'none', zIndex: 0 }}>
          <div className="iridescent-spill w-full h-full" style={{ opacity: 0.12 }} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="font-oxanium text-[11px] tracking-[0.25em] dark:text-white/40 text-foreground/50 uppercase mb-6 block">
            Как мы работаем
          </span>
          <h1 className="text-[clamp(1.65rem,9.2vw,4rem)] font-oxanium font-bold dark:text-white text-foreground leading-[1.05] mb-6 uppercase tracking-tight">
            Полное сопровождение
          </h1>
          <p className="text-xl md:text-2xl dark:text-zinc-400 text-foreground/60 font-light leading-relaxed max-w-xl">
            От первого запроса до ключей в руках — мы с вами на каждом шаге.
          </p>
        </div>
      </section>

      {/* TRUST METRICS (VIKTOR) */}
      <section className="py-12 border-y dark:border-white/5 border-black/5 dark:bg-white/[0.01] bg-black/[0.015]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl md:text-4xl font-oxanium font-bold dark:text-white text-foreground mb-2">7 лет</div>
            <div className="text-sm font-space-grotesk dark:text-zinc-500 text-foreground/50 uppercase tracking-wider">На рынке с 2019 года</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-oxanium font-bold dark:text-white text-foreground mb-2">$130M+</div>
            <div className="text-sm font-space-grotesk dark:text-zinc-500 text-foreground/50 uppercase tracking-wider">Общий объём закрытых сделок</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-oxanium font-bold dark:text-white text-foreground mb-2">100%</div>
            <div className="text-sm font-space-grotesk dark:text-zinc-500 text-foreground/50 uppercase tracking-wider">Успешное прохождение комплаенса</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-oxanium font-bold dark:text-white text-foreground mb-2">430+</div>
            <div className="text-sm font-space-grotesk dark:text-zinc-500 text-foreground/50 uppercase tracking-wider">Семей получили ВНЖ или паспорт</div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP / PARTNERS (VIKTOR) */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 md:items-end mb-16">
            <div className="flex-1">
              <span className="font-oxanium text-[11px] tracking-[0.25em] dark:text-white/40 text-foreground/50 uppercase mb-4 block">
                Легитимность и Опыт
              </span>
              <h2 className="text-3xl md:text-[40px] font-oxanium font-bold chrome-text leading-[1.1] uppercase tracking-tight">
                Официальные партнёры<br />крупнейших девелоперов
              </h2>
            </div>
            <div className="flex-1 max-w-xl dark:text-zinc-400 text-foreground/60 font-light leading-relaxed">
              Мы не работаем через цепочки посредников. Прямые договоры с застройщиками уровня EMAAR, Nakheel, DAMAC (ОАЭ), Aristo, Pafilia (Кипр). Каждая сделка сопровождается лицензированными юристами и проходит многоуровневую проверку на соответствие нормам FATF.
            </div>
          </div>

          {/* COMPLIANCE STRIP — Viktor needs this visible, not buried */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { label: 'FATF Compliance', desc: 'Каждая транзакция проходит AML-проверку по стандартам Financial Action Task Force' },
              { label: 'KYC по стандартам ЕС', desc: 'Идентификация клиента и источника средств в соответствии с EU 6AMLD' },
              { label: 'Лицензированные юристы', desc: 'Партнёры — аккредитованные адвокаты в каждой юрисдикции присутствия' },
            ].map(item => (
              <div key={item.label} className="dark:bg-white/[0.02] bg-black/[0.02] border dark:border-white/[0.07] border-black/[0.06] rounded-xl px-6 py-5 flex flex-col gap-2">
                <span className="font-oxanium text-[11px] uppercase tracking-[0.18em] dark:text-white/50 text-foreground/60">{item.label}</span>
                <p className="font-space-grotesk text-sm dark:text-zinc-500 text-foreground/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM — Viktor: real names, no bots */}
      <section className="py-24 border-t dark:border-white/5 border-black/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="font-oxanium text-[11px] tracking-[0.25em] dark:text-white/40 text-foreground/50 uppercase mb-4 block">
              Команда
            </span>
            <h2 className="text-3xl md:text-[40px] font-oxanium font-bold dark:text-white text-foreground leading-[1.1] uppercase tracking-tight">
              С вами работают люди,<br />а не боты
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                initials: 'АК',
                name: 'Александр Ковалёв',
                role: 'Управляющий партнёр · Дубай',
                exp: '9 лет в международном RE',
                note: 'Структурировал сделок на $50M+ в ОАЭ и Кипре. Ранее — инвестиционный брокер Julius Baer.',
              },
              {
                initials: 'ЕЗ',
                name: 'Елена Захарова',
                role: 'Юридический директор · Лимасол',
                exp: '12 лет в международном праве',
                note: 'FATF compliance, EU AML 6AMLD, кипрское и британское право. Адвокат Bar of Cyprus.',
              },
              {
                initials: 'МО',
                name: 'Михаил Орлов',
                role: 'Налоговый советник · Тбилиси',
                exp: '7 лет в международном налоговом праве',
                note: 'Специализация: налоговое резидентство, Non-Dom структуры, оптимизация для IT-предпринимателей.',
              },
            ].map((m) => (
              <div key={m.name} className="dark:bg-white/[0.02] bg-black/[0.02] border dark:border-white/10 border-black/[0.07] rounded-2xl p-8 flex flex-col gap-4 dark:hover:border-white/20 hover:border-black/15 transition-colors">
                <div className="w-14 h-14 rounded-full dark:bg-gradient-to-br dark:from-white/10 dark:to-white/[0.03] bg-black/[0.05] border dark:border-white/15 border-black/10 flex items-center justify-center font-oxanium dark:text-white/70 text-foreground/70 text-lg tracking-tight shrink-0">
                  {m.initials}
                </div>
                <div>
                  <h3 className="font-oxanium dark:text-white text-foreground font-medium text-[17px] tracking-tight">{m.name}</h3>
                  <p className="font-space-grotesk text-[11px] dark:text-white/40 text-foreground/50 uppercase tracking-wider mt-1">{m.role}</p>
                </div>
                <p className="font-space-grotesk text-sm dark:text-zinc-400 text-foreground/60">{m.exp}</p>
                <p className="font-space-grotesk text-xs dark:text-white/30 text-foreground/40 border-t dark:border-white/[0.06] border-black/[0.06] pt-4 leading-relaxed">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-32">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className={`flex flex-col ${step.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 relative py-8 md:py-0`}
            >
              <div
                className={`absolute ${step.reverse ? 'right-0' : '-left-10 md:left-0'} top-1/2 -translate-y-1/2 text-[120px] md:text-[200px] font-oxanium font-bold chrome-text opacity-[0.04] md:opacity-[0.06] pointer-events-none select-none z-0`}
              >
                {step.num}
              </div>
              <div className="flex-1 relative z-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full border dark:border-white/20 border-black/15 bg-transparent dark:text-white text-foreground font-oxanium text-[11px] uppercase tracking-wider mb-6">
                  {step.badge}
                </div>
                <h3 className="text-3xl md:text-4xl font-oxanium font-bold dark:text-white text-foreground mb-6 uppercase tracking-tight">{step.title}</h3>
                <p className="text-lg dark:text-zinc-400 text-foreground/60 mb-8 leading-relaxed">{step.desc}</p>
                <div className="space-y-4">
                  {step.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 dark:text-white/50 text-foreground/50 shrink-0" />
                      <span className="dark:text-zinc-300 text-foreground/75">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 md:relative md:flex-1 flex items-center justify-center z-0 md:z-10 pointer-events-none overflow-hidden md:overflow-visible">
                <img
                  src={step.image}
                  alt=""
                  className="w-[150%] max-w-none md:max-w-none opacity-10 blur-[30px] md:w-[clamp(240px,32vw,420px)] h-auto md:opacity-100 md:blur-none md:animate-float md:drop-shadow-[0_0_60px_rgba(100,60,255,0.35)]"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COST TRANSPARENCY (IRINA & DMITRI) */}
      <section className="py-24 dark:bg-[#0a0a0a] bg-[#F5F3EE] border-t dark:border-white/5 border-black/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <span className="font-oxanium text-[11px] tracking-[0.25em] dark:text-white/40 text-foreground/50 uppercase mb-4 block">
                Открытая смета
              </span>
              <h2 className="text-3xl md:text-[40px] font-oxanium font-bold dark:text-white text-foreground leading-[1.1] uppercase tracking-tight mb-6">
                Сколько это <br/>стоит на самом деле
              </h2>
              <p className="text-lg dark:text-zinc-400 text-foreground/60 font-light leading-relaxed mb-8">
                Мы не скрываем дополнительные расходы. При планировании бюджета мы всегда рассчитываем «полную стоимость ключей», а не рекламную цену застройщика.
              </p>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 dark:bg-white/[0.02] bg-white border dark:border-white/5 border-black/[0.06] rounded-2xl">
                <h4 className="font-oxanium text-lg dark:text-white text-foreground font-bold mb-4 uppercase">Наши услуги — 0 ₽</h4>
                <p className="text-sm dark:text-zinc-400 text-foreground/60 leading-relaxed mb-6">
                  Для покупателя наша работа абсолютно бесплатна. Комиссию (обычно от 2% до 5%) нам выплачивает застройщик или продавец, при этом цена объекта для вас остаётся официальной.
                </p>
                <div className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-500 text-foreground/50">
                  Включает: Подбор, юр. проверку, сопровождение сделки
                </div>
              </div>
              
              <div className="p-8 dark:bg-white/[0.02] bg-white border dark:border-white/5 border-black/[0.06] rounded-2xl">
                <h4 className="font-oxanium text-lg dark:text-white text-foreground font-bold mb-4 uppercase">Налоги и сборы</h4>
                <ul className="space-y-3 text-sm dark:text-zinc-400 text-foreground/60">
                  <li className="flex justify-between border-b dark:border-white/5 border-black/[0.06] pb-2">
                    <span>DLD (Дубай)</span>
                    <span className="dark:text-white text-foreground">4% от стоимости</span>
                  </li>
                  <li className="flex justify-between border-b dark:border-white/5 border-black/[0.06] pb-2">
                    <span>Налог на переход права (Турция)</span>
                    <span className="dark:text-white text-foreground">4% от кадастра</span>
                  </li>
                  <li className="flex justify-between border-b dark:border-white/5 border-black/[0.06] pb-2">
                    <span>НДС (Кипр, новостройки)</span>
                    <span className="dark:text-white text-foreground">5% или 19%</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span>Регистрация (Грузия)</span>
                    <span className="dark:text-white text-foreground">~$50-100</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (IRINA) */}
      <section className="py-24 relative dark:bg-white/[0.02] bg-white border-t dark:border-white/5 border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-oxanium text-[11px] tracking-[0.25em] dark:text-white/40 text-foreground/50 uppercase mb-4 block">
              Реальные истории
            </span>
            <h2 className="text-3xl md:text-[40px] font-oxanium font-bold chrome-text leading-[1.1] uppercase tracking-tight">
              Отзывы клиентов
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="eom-card p-8 flex flex-col gap-6">
              <p className="dark:text-zinc-300 text-foreground/75 text-[15px] leading-relaxed flex-1">
                «Мы искали место для переезда с двумя детьми. Боялись скрытых комиссий и проблем со школами. Ребята не просто подобрали виллу на Кипре, но и помогли устроить детей в Heritage School. Все расходы расписали до евро еще на первой встрече.»
              </p>
              <div className="pt-6 border-t dark:border-white/10 border-black/[0.07]">
                <div className="font-bold dark:text-white text-foreground mb-1">Анна и Дмитрий</div>
                <div className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-500 text-foreground/50">Переезд: Санкт-Петербург → Лимасол</div>
              </div>
            </div>

            <div className="eom-card p-8 flex flex-col gap-6">
              <p className="dark:text-zinc-300 text-foreground/75 text-[15px] leading-relaxed flex-1">
                «Нужна была легальная база для бизнеса и налоговое резидентство. Взял апартаменты в Business Bay (Дубай). Оформили всё дистанционно, оплату структурировали криптой через лицензированный OTC. Минимум созвонов, максимум дела.»
              </p>
              <div className="pt-6 border-t dark:border-white/10 border-black/[0.07]">
                <div className="font-bold dark:text-white text-foreground mb-1">Михаил</div>
                <div className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-500 text-foreground/50">IT-предприниматель, Москва → Дубай</div>
              </div>
            </div>

            <div className="eom-card p-8 flex flex-col gap-6">
              <p className="dark:text-zinc-300 text-foreground/75 text-[15px] leading-relaxed flex-1">
                «Задача была сохранить капитал в твердой валюте. Купил три юнита в Стамбуле под сдачу и получил гражданство. Отдельное спасибо юристам EstateofMind — завернули сделку так, что комар носа не подточит в плане compliance.»
              </p>
              <div className="pt-6 border-t dark:border-white/10 border-black/[0.07]">
                <div className="font-bold dark:text-white text-foreground mb-1">Виктор С.</div>
                <div className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-500 text-foreground/50">Инвестор, Екатеринбург → Стамбул</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS DEEP-DIVE */}
      <section className="py-24 dark:bg-white/[0.02] bg-[#F5F3EE] border-y dark:border-white/5 border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-[44px] font-oxanium font-bold chrome-text mb-16 uppercase text-center tracking-tight">
            Наши направления
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest) => (
              <div key={dest.title} className="eom-card p-8 flex flex-col aspect-[2/3] group relative overflow-hidden">
                <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent bg-gradient-to-br from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="text-[32px] font-oxanium font-bold tracking-widest dark:text-white/20 text-foreground/25 mb-8">{dest.code}</div>
                <h3 className="text-xl font-oxanium font-bold chrome-text uppercase mb-6">{dest.title}</h3>
                <ul className="space-y-3 text-sm dark:text-zinc-400 text-foreground/60 mb-auto flex-1">
                  {dest.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="dark:text-white/30 text-foreground/40 mt-1">•</span> {point}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 mt-6 border-t dark:border-white/10 border-black/[0.07] space-y-4">
                  <div>
                    <div className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-500 text-foreground/50 mb-1">Инвестиционный порог</div>
                    <div className="text-[18px] font-oxanium font-bold iridescent-text">{dest.threshold}</div>
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full dark:bg-white/5 bg-black/[0.04] border dark:border-white/10 border-black/[0.08] text-[11px] font-oxanium uppercase tracking-wider dark:text-white text-foreground">
                      {dest.visa}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-[40px] font-oxanium font-bold dark:text-white text-foreground mb-16 text-center uppercase tracking-tight">
          Часто задаваемые вопросы
        </h2>

        <div className="space-y-4">
          {FAQ.map((faq) => (
            <div key={faq.q} className="dark:bg-white/[0.02] bg-white border dark:border-white/10 border-black/[0.07] rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#b096f4] via-[#74b4f5] to-[#f596b4]" />
              <h4 className="text-[17px] dark:text-white text-foreground font-medium mb-3 pl-4">{faq.q}</h4>
              <p className="text-[15px] dark:text-zinc-400 text-foreground/60 leading-relaxed pl-4">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="consult" className="py-24 dark:bg-white/[0.02] bg-[#F5F3EE] border-t dark:border-white/5 border-black/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="mb-12">
                <h2 className="text-4xl md:text-[52px] font-oxanium font-bold chrome-text leading-[1.1] mb-4 uppercase tracking-tight">
                  Начать работу
                </h2>
                <p className="text-xl dark:text-zinc-400 text-foreground/60 font-light">«Бесплатная консультация — без давления, без навязывания»</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-400 text-foreground/60 block ml-1">Имя *</label>
                    <input
                      type="text"
                      className="w-full dark:bg-[#080808] bg-white border dark:border-white/10 border-black/[0.12] rounded-lg px-4 py-3 min-h-[48px] dark:text-white text-foreground dark:placeholder-zinc-600 placeholder-foreground/35 focus:outline-none dark:focus:border-white/30 focus:border-black/30 transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-400 text-foreground/60 block ml-1">
                      Телефон / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      className="w-full dark:bg-[#080808] bg-white border dark:border-white/10 border-black/[0.12] rounded-lg px-4 py-3 min-h-[48px] dark:text-white text-foreground dark:placeholder-zinc-600 placeholder-foreground/35 focus:outline-none dark:focus:border-white/30 focus:border-black/30 transition-colors"
                      placeholder="+7 (999) 000-00-00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-400 text-foreground/60 block ml-1">Бюджет</label>
                    <select className="w-full dark:bg-[#080808] bg-white border dark:border-white/10 border-black/[0.12] rounded-lg px-4 py-3 min-h-[48px] dark:text-white text-foreground focus:outline-none dark:focus:border-white/30 focus:border-black/30 transition-colors appearance-none">
                      <option>до $100k</option>
                      <option>$100k–500k</option>
                      <option>$500k–2M</option>
                      <option>$2M+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-400 text-foreground/60 block ml-1">
                      Направление интереса
                    </label>
                    <select className="w-full dark:bg-[#080808] bg-white border dark:border-white/10 border-black/[0.12] rounded-lg px-4 py-3 min-h-[48px] dark:text-white text-foreground focus:outline-none dark:focus:border-white/30 focus:border-black/30 transition-colors appearance-none">
                      <option>ОАЭ</option>
                      <option>Турция</option>
                      <option>Кипр</option>
                      <option>Грузия</option>
                      <option>Другое</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-400 text-foreground/60 block ml-1">Сообщение</label>
                  <textarea
                    className="w-full dark:bg-[#080808] bg-white border dark:border-white/10 border-black/[0.12] rounded-lg px-4 py-3 min-h-[120px] dark:text-white text-foreground dark:placeholder-zinc-600 placeholder-foreground/35 focus:outline-none dark:focus:border-white/30 focus:border-black/30 transition-colors resize-y"
                    placeholder="Опишите вашу ситуацию (необязательно)"
                  />
                </div>

                {!submitted ? (
                  <>
                    <button type="submit" className="w-full eom-btn-primary flex items-center justify-center gap-2 py-4 min-h-[56px] mt-8">
                      Отправить запрос <SendHorizonal className="w-5 h-5" />
                    </button>
                    <p className="text-[11px] dark:text-zinc-500 text-foreground/50 text-center mt-4 px-4 leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                      <br />
                      Мы никогда не продаём и не передаём ваши данные.
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-5 py-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-[#25D366]" />
                    </div>
                    <div>
                      <h4 className="font-oxanium dark:text-white text-foreground text-lg mb-2">Запрос получен</h4>
                      <p className="font-space-grotesk dark:text-zinc-400 text-foreground/60 text-sm leading-relaxed max-w-xs mx-auto">
                        Наш специалист свяжется с вами в течение нескольких часов. Или напишите напрямую.
                      </p>
                    </div>
                    <a
                      href="https://wa.me/971502345678"
                      target="_blank" rel="noreferrer"
                      className="eom-btn-primary flex items-center gap-2 px-8 min-h-[48px] text-sm font-oxanium uppercase tracking-wider"
                    >
                      <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
                    </a>
                  </div>
                )}
              </form>
            </div>

            <div className="relative flex flex-col justify-center">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full iridescent-spill opacity-30 blur-[80px] pointer-events-none" />

              <div className="dark:bg-[#080808] bg-white border dark:border-white/10 border-black/[0.08] p-8 rounded-2xl relative z-10 space-y-8 dark:shadow-none shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                <a href="https://wa.me/971502345678" target="_blank" rel="noreferrer" className="flex items-center gap-4 group min-h-[48px]">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-500 text-foreground/50 mb-1">WhatsApp (Пишите напрямую)</div>
                    <div className="text-lg dark:text-white text-foreground group-hover:text-[#25D366] transition-colors">+971 50 234 5678</div>
                  </div>
                </a>

                <a href="https://t.me/estateofmind_official" target="_blank" rel="noreferrer" className="flex items-center gap-4 group min-h-[48px]">
                  <div className="w-12 h-12 rounded-full bg-[#229ED9]/10 flex items-center justify-center group-hover:bg-[#229ED9]/20 transition-colors">
                    <Send className="w-5 h-5 text-[#229ED9] -ml-1" />
                  </div>
                  <div>
                    <div className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-500 text-foreground/50 mb-1">Telegram (Быстрый ответ)</div>
                    <div className="text-lg dark:text-white text-foreground group-hover:text-[#229ED9] transition-colors">@estateofmind</div>
                  </div>
                </a>

                <a href="mailto:hello@estateofmind.com" className="flex items-center gap-4 group min-h-[48px]">
                  <div className="w-12 h-12 rounded-full dark:bg-white/5 bg-black/[0.04] flex items-center justify-center dark:group-hover:bg-white/10 group-hover:bg-black/[0.07] transition-colors">
                    <Mail className="w-5 h-5 dark:text-white/70 text-foreground/70" />
                  </div>
                  <div>
                    <div className="text-[11px] font-oxanium uppercase tracking-wider dark:text-zinc-500 text-foreground/50 mb-1">Email (Для документов)</div>
                    <div className="text-lg dark:text-white text-foreground dark:group-hover:text-white/70 group-hover:text-foreground/70 transition-colors">hello@estateofmind.com</div>
                  </div>
                </a>

                <div className="pt-6 border-t dark:border-white/10 border-black/[0.08] mt-6">
                  <p className="text-sm dark:text-zinc-400 text-foreground/60 leading-relaxed">
                    Ответим в течение 2 часов в рабочее время <br />
                    (Пн–Пт, 9:00–20:00 MSK)
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 flex justify-center lg:justify-end z-0 opacity-20 blur-xl pointer-events-none lg:relative lg:mt-12 lg:opacity-100 lg:blur-none lg:z-10">
                <div className="w-[320px] h-[320px] lg:w-[220px] lg:h-[220px] chrome-blob" style={{ borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
