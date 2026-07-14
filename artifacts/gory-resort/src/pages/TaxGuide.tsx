import { Link } from 'wouter';
import { Layout } from '@/components/Layout';
import { ArrowRight, MessageCircle, Send, ShieldCheck } from 'lucide-react';

/* ── Tax data per country ───────────────────────────────────────────────── */
const TAX_COUNTRIES = [
  {
    flag: '🇦🇪',
    name: 'ОАЭ',
    code: 'ae',
    accentColor: '#e8a83a',
    headline: 'Нулевые личные налоги — абсолютный лидер',
    incomeTax:      '0%',
    capitalGains:   '0%',
    dividends:      '0%',
    corporateTax:   '9% (Free Zone: 0%)',
    buyTax:         '4% DLD при регистрации',
    vnj:            'Golden Visa от $545 000 (10 лет)',
    bestFor:        ['Инвесторы', 'IT-бизнес', 'Семьи', 'Крипто'],
    highlight:      'Единственная юрисдикция в топ-листе с полным 0% на доход, прирост капитала и дивиденды. Крипто-доходы также не облагаются налогом.',
    caution:        'НДС 5% на бытовые услуги. Высокий порог для Golden Visa.',
  },
  {
    flag: '🇬🇪',
    name: 'Грузия',
    code: 'ge',
    accentColor: '#3dad6a',
    headline: 'Территориальный налог — идеал для удалёнщиков',
    incomeTax:      '20% только на грузинские источники',
    capitalGains:   '5% при продаже недвижимости',
    dividends:      '5%',
    corporateTax:   '15% (ИП: 1% оборота)',
    buyTax:         '$50–100 регистрация',
    vnj:            'ВНЖ инвестора от $150 000 (с 1 марта 2026)',
    bestFor:        ['Фрилансеры', 'Цифровые кочевники', 'Стартапы'],
    highlight:      'Доходы из-за рубежа (зарплата от иностранного работодателя, SaaS, фриланс) не облагаются налогом по территориальному принципу.',
    caution:        'Порог ВНЖ повышен с $100 000 до $150 000 в 2026 году. Банковская инфраструктура развивается.',
  },
  {
    flag: '🇨🇾',
    name: 'Кипр',
    code: 'cy',
    accentColor: '#4a8fd4',
    headline: 'Non-Dom: 17 лет без налога на дивиденды',
    incomeTax:      '0–35% (прогрессивный)',
    capitalGains:   '0% на акции',
    dividends:      '0% для Non-Dom на 17 лет',
    corporateTax:   '12.5%',
    buyTax:         '0% трансфер на первичку; НДС 5%',
    vnj:            'Fast-Track ПМЖ от €300 000',
    bestFor:        ['IT-фаундеры', 'Инвесторы в акции', 'Семьи в ЕС'],
    highlight:      'Non-Domicile статус: 17 лет нулевого налога на дивиденды и проценты. Плюс полный доступ к банкингу ЕС и Шенгену.',
    caution:        'Необходимо проживать 183+ дней в году. Налог на заработную плату — до 35%.',
  },
  {
    flag: '🇹🇷',
    name: 'Турция',
    code: 'tr',
    accentColor: '#d45a3a',
    headline: 'Привлекательна паспортом, не налогами',
    incomeTax:      '15–40% (прогрессивный)',
    capitalGains:   '0% при удержании > 2 лет',
    dividends:      '10%',
    corporateTax:   '25%',
    buyTax:         '4% TAPU при покупке',
    vnj:            'ВНЖ от $200 000 / Гражданство от $400 000',
    bestFor:        ['Инвесторы в гражданство', 'Семьи'],
    highlight:      'Основная ценность — второй паспорт за 4-6 месяцев. 150+ стран без виз, включая Японию, Великобританию и Шенген.',
    caution:        'Высокая инфляция TRY. Налоговый режим не оптимален для IT-доходов.',
  },
  {
    flag: '🇵🇹',
    name: 'Португалия',
    code: 'pt',
    accentColor: '#c8982a',
    headline: 'NHR + паспорт ЕС через 5 лет',
    incomeTax:      '20% (NHR на иностранные доходы)',
    capitalGains:   '28% (0% при реинвестировании в пенсионные)',
    dividends:      '28%',
    corporateTax:   '21%',
    buyTax:         'IMT до 7.5% + гербовый сбор 0.8%',
    vnj:            'Golden Visa (фонды) от €500 000 / D7 / D8',
    bestFor:        ['Семьи', 'IT-специалисты', 'Будущие граждане ЕС'],
    highlight:      'Режим NHR: фиксированные 20% на зарубежный трудовой доход. Через 5 лет — паспорт ЕС со всеми правами.',
    caution:        'Строгий AML при вводе средств. Golden Visa больше не даёт доступ через недвижимость в Лиссабоне.',
  },
  {
    flag: '🇷🇸',
    name: 'Сербия',
    code: 'rs',
    accentColor: '#5a7dd4',
    headline: 'Самый простой вход в Европу',
    incomeTax:      '15% (flat)',
    capitalGains:   '15%',
    dividends:      '15%',
    corporateTax:   '15% (IT-льготы до 10%)',
    buyTax:         '2.5% вторичка / 10% НДС новостройка',
    vnj:            'Любая покупка жилья — ВНЖ за 30 дней',
    bestFor:        ['Стартап-команды', 'Семьи с бюджетом', 'IT-аутсорс'],
    highlight:      'Минимальный порог входа: нет минимальной суммы. Swift работает. Банки лояльны к россиянам. Самая доступная недвижимость в Европе.',
    caution:        'Не член ЕС. Сербский ВНЖ не даёт Шенген.',
  },
  {
    flag: '🇹🇭',
    name: 'Таиланд',
    code: 'th',
    accentColor: '#3aaa8a',
    headline: 'Территориальный налог + Elite Visa',
    incomeTax:      '5–35% только на тайские источники',
    capitalGains:   'Включён в подоходный налог',
    dividends:      '10%',
    corporateTax:   '20%',
    buyTax:         '1–2% при переходе права',
    vnj:            'Thailand Privilege Visa от $25 000 (5 лет)',
    bestFor:        ['Инвесторы в аренду', 'Зимовка', 'Семьи'],
    highlight:      'Иностранные доходы, ввезённые в Таиланд после уплаты налогов в стране-источнике, не облагаются тайским налогом.',
    caution:        'Иностранцы не могут владеть землёй (только Freehold-квартиры по квоте 49%).',
  },
];

/* ── Comparison summary row ─────────────────────────────────────────────── */
const QUICK_COMPARE = [
  { label: 'ОАЭ',        incomeTax: '0%',   CGT: '0%',  vnj: '$545K',  color: '#e8a83a' },
  { label: 'Грузия',     incomeTax: '0%*',  CGT: '5%',  vnj: '$100K',  color: '#3dad6a' },
  { label: 'Кипр',       incomeTax: '0%†',  CGT: '0%',  vnj: '€300K',  color: '#4a8fd4' },
  { label: 'Турция',     incomeTax: '15-40%', CGT: '0%‡', vnj: '$400K', color: '#d45a3a' },
  { label: 'Португалия', incomeTax: '20%§', CGT: '28%', vnj: '€500K',  color: '#c8982a' },
  { label: 'Сербия',     incomeTax: '15%',  CGT: '15%', vnj: 'Любая сумма', color: '#5a7dd4' },
  { label: 'Таиланд',    incomeTax: '0%*',  CGT: '—',   vnj: '$25K',   color: '#3aaa8a' },
];

/* ─────────────────────────────────────────────────────────────────────────── */
export default function TaxGuide() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative pt-28 md:pt-36 pb-16 overflow-hidden border-b border-white/5 bg-[#020202]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(35,30,55,0.5)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <nav className="flex items-center gap-2 text-[12px] font-space-grotesk text-white/30 mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors min-h-[40px] flex items-center">Главная</Link>
            <span>/</span>
            <span className="text-white/70">Налоговый гид</span>
          </nav>
          <span className="font-oxanium text-[11px] tracking-[0.25em] text-white/40 uppercase mb-4 block">
            Актуально · Июль 2026
          </span>
          <h1 className="font-oxanium font-bold text-white uppercase leading-[1.0] tracking-tight text-[clamp(2.2rem,6vw,4rem)] mb-6">
            Налоговый гид<br/>по 7 юрисдикциям
          </h1>
          <p className="font-space-grotesk text-lg text-white/50 max-w-2xl leading-relaxed">
            Сравнительный анализ налогов на доход, прирост капитала, дивиденды и покупку недвижимости. 
            Для инвесторов, IT-предпринимателей и семей.
          </p>
        </div>
      </section>

      {/* QUICK COMPARE TABLE */}
      <section className="py-16 bg-[#050505] border-b border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-oxanium text-[11px] tracking-[0.2em] text-white/30 uppercase mb-8">
            Краткое сравнение
          </h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left font-oxanium text-[10px] uppercase tracking-[0.15em] text-white/30 pb-4 pr-6">Страна</th>
                  <th className="text-right font-oxanium text-[10px] uppercase tracking-[0.15em] text-white/30 pb-4 px-4">Доход</th>
                  <th className="text-right font-oxanium text-[10px] uppercase tracking-[0.15em] text-white/30 pb-4 px-4">Капитал</th>
                  <th className="text-right font-oxanium text-[10px] uppercase tracking-[0.15em] text-white/30 pb-4 pl-4">ВНЖ от</th>
                </tr>
              </thead>
              <tbody>
                {QUICK_COMPARE.map((r, i) => (
                  <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: r.color }} />
                        <span className="font-oxanium text-white/80 text-[15px] tracking-tight">{r.label}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-oxanium text-white text-[15px]">{r.incomeTax}</td>
                    <td className="py-4 px-4 text-right font-oxanium text-white text-[15px]">{r.CGT}</td>
                    <td className="py-4 pl-4 text-right font-space-grotesk text-white/60 text-[13px]">{r.vnj}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-space-grotesk text-[11px] text-white/25 mt-6 leading-relaxed">
            * Территориальная система: иностранные доходы не облагаются при соблюдении условий.
            † Non-Dom: 0% на дивиденды и проценты на 17 лет.
            ‡ 0% при удержании объекта более 2 лет.
            § NHR режим: 20% фиксированный на зарубежный трудовой доход.
          </p>
        </div>
      </section>

      {/* COUNTRY CARDS — detailed breakdown */}
      <section className="py-20 bg-[#080808]">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col gap-8">
          <h2 className="font-oxanium text-[11px] tracking-[0.2em] text-white/30 uppercase">
            Подробно по каждой стране
          </h2>
          {TAX_COUNTRIES.map((c) => (
            <div key={c.code} className="border border-white/[0.07] rounded-2xl bg-[#0a0a0a] overflow-hidden hover:border-white/[0.15] transition-colors group">
              <div className="flex flex-col md:flex-row">
                {/* Left accent */}
                <div className="md:w-1 flex-shrink-0 h-1 md:h-auto" style={{ background: c.accentColor }} />
                <div className="p-7 md:p-8 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <h3 className="font-oxanium text-white text-[20px] font-medium tracking-tight">{c.name}</h3>
                        <p className="font-space-grotesk text-[13px]" style={{ color: c.accentColor }}>{c.headline}</p>
                      </div>
                    </div>
                    <Link
                      href={`/countries/${c.code}`}
                      className="shrink-0 font-oxanium text-[11px] uppercase tracking-wider text-white/30 hover:text-white/70 transition-colors flex items-center gap-1.5 min-h-[40px]"
                    >
                      Объекты <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Tax grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Налог на доход', val: c.incomeTax },
                      { label: 'Прирост капитала', val: c.capitalGains },
                      { label: 'Дивиденды', val: c.dividends },
                      { label: 'Корпоративный', val: c.corporateTax },
                    ].map(item => (
                      <div key={item.label} className="bg-white/[0.03] rounded-xl p-4">
                        <p className="font-oxanium text-[9px] uppercase tracking-[0.15em] text-white/30 mb-2">{item.label}</p>
                        <p className="font-oxanium text-white text-[15px] font-medium leading-tight">{item.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex gap-3">
                      <span className="font-oxanium text-[10px] uppercase tracking-wider text-white/30 shrink-0 pt-0.5 w-24">Налог при покупке</span>
                      <span className="font-space-grotesk text-[13px] text-white/60">{c.buyTax}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-oxanium text-[10px] uppercase tracking-wider text-white/30 shrink-0 pt-0.5 w-24">ВНЖ/паспорт</span>
                      <span className="font-space-grotesk text-[13px] text-white/60">{c.vnj}</span>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 mb-5">
                    <p className="font-space-grotesk text-[14px] text-white/70 leading-relaxed">{c.highlight}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-oxanium text-[10px] uppercase tracking-wider text-white/25">Подходит:</span>
                    {c.bestFor.map(tag => (
                      <span key={tag} className="font-space-grotesk text-[11px] px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/50">
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto font-space-grotesk text-[11px] text-white/25">⚠ {c.caution}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER + CTA */}
      <section className="py-20 bg-[#020202] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 mb-10">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
              <p className="font-space-grotesk text-[13px] text-white/40 leading-relaxed">
                Данный материал носит общеинформационный характер и не является индивидуальной налоговой или инвестиционной рекомендацией. 
                Налоговое законодательство меняется — актуальные данные на июль 2026. Перед принятием решения проконсультируйтесь с лицензированным налоговым советником.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-oxanium text-2xl md:text-[32px] text-white font-medium tracking-tight mb-4">
              Нужна персональная консультация?
            </h3>
            <p className="font-space-grotesk text-white/40 mb-8 max-w-xl mx-auto">
              Наш налоговый директор Михаил Орлов специализируется на международных структурах для IT-предпринимателей и инвесторов из России.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/971502345678?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%21%20%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B5%D1%82%20%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F"
                target="_blank" rel="noreferrer"
                className="eom-btn-primary font-oxanium text-[12px] uppercase tracking-wider min-h-[52px] px-10 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href="https://t.me/estateofmind_official"
                target="_blank" rel="noreferrer"
                className="eom-btn-ghost font-oxanium text-[12px] uppercase tracking-wider min-h-[52px] px-10 flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
