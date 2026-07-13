import { Shield, Globe, Zap, Bed, Bath, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Layout } from '@/components/Layout';

const DESTINATIONS = [
  { flag: '🇦🇪', country: 'ОАЭ',         city: 'Дубай',     price: '$380,000',  image: '/images/dest-dubai.jpg' },
  { flag: '🇹🇷', country: 'Турция',       city: 'Стамбул',   price: '$120,000',  image: null },
  { flag: '🇨🇾', country: 'Кипр',         city: 'Лимасол',   price: '€180,000',  image: '/images/dest-cyprus.jpg' },
  { flag: '🇬🇪', country: 'Грузия',       city: 'Батуми',    price: '$65,000',   image: '/images/dest-georgia.jpg' },
  { flag: '🇹🇭', country: 'Таиланд',      city: 'Пхукет',    price: '$95,000',   image: null },
  { flag: '🇵🇹', country: 'Португалия',   city: 'Лиссабон',  price: '€345,000',  image: null },
  { flag: '🇷🇸', country: 'Сербия',       city: 'Белград',   price: '€85,000',   image: null },
];

const FEATURED_PROPERTIES = [
  {
    image: '/images/prop-dubai.jpg',
    location: '🇦🇪 Дубай, ОАЭ',
    type: 'Апартаменты',
    price: '$2,400,000',
    district: 'Palm Jumeirah',
    beds: 3,
    baths: 2,
    area: '210м²',
  },
  {
    image: '/images/prop-cyprus.jpg',
    location: '🇨🇾 Лимасол, Кипр',
    type: 'Вилла',
    price: '€680,000',
    district: 'Панорамный вид на море',
    beds: 3,
    baths: 3,
    area: '240м²',
  },
  {
    image: '/images/prop-georgia.jpg',
    location: '🇬🇪 Батуми, Грузия',
    type: 'Апартаменты',
    price: '$95,000',
    district: 'Морской фронт',
    beds: 2,
    baths: 1,
    area: '72м²',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Консультация', desc: 'Анализ задач, бюджета и предпочтений. Подбор оптимальной юрисдикции.' },
  { num: '02', title: 'Подбор объектов', desc: 'Предоставляем шорт-лист из закрытой базы с расчётом доходности.' },
  { num: '03', title: 'Юридическое сопровождение', desc: 'Проверка застройщика или собственника, подготовка документов.' },
  { num: '04', title: 'Закрытие сделки', desc: 'Безопасный перевод средств, регистрация права собственности.' },
];

const TESTIMONIALS = [
  {
    initials: 'В.М.',
    name: 'Виктор М.',
    from: 'Москва → Дубай',
    date: 'Ноябрь 2025',
    text: 'За 11 дней закрыли сделку на апартаменты в Downtown Dubai. Документы, структура перевода средств, регистрация — без единой проблемы. Уровень сопровождения выше, чем у крупных инвестбанков.',
    deal: 'Апартаменты · Dubai · $340 000',
  },
  {
    initials: 'А.К.',
    name: 'Анна и Сергей К.',
    from: 'Санкт-Петербург → Кипр',
    date: 'Февраль 2026',
    text: 'Переезжали с тремя детьми. Нашли дом, помогли с ВНЖ, подсказали международные школы. Дети уже учатся в Лимасоле — мы даже не ожидали такой скорости.',
    deal: 'Вилла · Лимасол · €285 000',
  },
  {
    initials: 'Д.Л.',
    name: 'Дмитрий Л.',
    from: 'Екатеринбург → Батуми',
    date: 'Март 2026',
    text: 'Взял квартиру в Батуми под посуточную аренду. Доходность — 9,4% годовых. Команда сама рекомендовала управляющую компанию. Всё работает без моего участия.',
    deal: 'Апартаменты · Батуми · $78 000',
  },
];

const TRUST_STATS = [
  { value: '$130M+', label: 'Общая стоимость закрытых сделок' },
  { value: '847',    label: 'Семей нашли новый дом' },
  { value: '12',     label: 'Стран присутствия' },
  { value: '2019',   label: 'Год основания' },
];

const WHY_US = [
  {
    Icon: Shield,
    title: 'Юридическая чистота',
    desc: 'Каждый объект проходит полную проверку права собственности. Мы работаем с нотариусами и юристами в каждой стране.',
  },
  {
    Icon: Globe,
    title: 'Локальные партнёры',
    desc: 'fäm Properties (ОАЭ), H&S Real Estate (Кипр/Турция), Knight Frank (Португалия) и другие аккредитованные агентства.',
  },
  {
    Icon: Zap,
    title: 'Сделка за 14 дней',
    desc: 'От первого звонка до подписания договора — в среднем 14 рабочих дней. Сопровождение на каждом шаге.',
  },
];

export default function Home() {
  return (
    <Layout>

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative bg-black overflow-hidden">
        <div className="hero-grid" />

        {/* Chrome tendrils — top-right framing (desktop only) */}
        <img
          src="/chrome/liquid/chrome-tendrils.png"
          alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none hidden md:block"
          style={{
            top: '-4%', right: '-6%',
            width: 'clamp(340px, 44vw, 660px)',
            opacity: 0.6, mixBlendMode: 'screen', zIndex: 1,
          }}
        />

        <div className="container mx-auto px-6 pt-28 pb-0 lg:pt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 lg:items-center">

            {/* ── Text ── */}
            <div className="lg:col-span-7 flex flex-col items-start pb-8 lg:pb-24">
              <span className="font-oxanium text-[11px] tracking-[0.25em] text-white/40 mb-6 uppercase">
                Международная недвижимость
              </span>

              <h1 className="font-oxanium text-[clamp(2.8rem,10vw,5.5rem)] font-light leading-[1.05] chrome-text mb-6 tracking-tight section-reveal-heading">
                Ваш капитал <br />заслуживает <br />
                <span className="chrome-text-accent font-bold">свободы</span>
              </h1>

              <p className="font-space-grotesk text-lg text-white/55 max-w-lg mb-12 leading-relaxed">
                Инвестиции в зарубежную недвижимость — ОАЭ, Турция, Кипр, Грузия, Португалия
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/properties" className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider">
                  Подобрать объект
                </Link>
                <Link href="/about" className="eom-btn-ghost font-oxanium text-sm uppercase tracking-wider">
                  Бесплатная консультация
                </Link>
              </div>

              <div className="flex items-center gap-4 text-white/45 font-oxanium text-[13px] uppercase tracking-wider">
                <span>847 сделок</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>12 стран</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>₽0 комиссии для покупателя</span>
              </div>
            </div>

            {/* ── Visual ── */}
            <div className="lg:col-span-5 relative flex items-center justify-center
                            h-[360px] sm:h-[460px] lg:h-[680px] -mx-6 lg:mx-0">
              {/* Purple iridescent glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div style={{
                  width: 'min(440px, 90vw)', height: 'min(440px, 90vw)',
                  background: 'conic-gradient(from 0deg,#4a00e0,#8e2de2,#f000ff,#00c9ff,#92fe9d,#4a00e0)',
                  filter: 'blur(80px)', opacity: 0.24, borderRadius: '50%',
                }} />
              </div>

              {/* Main hero chrome blob — always visible */}
              <img
                src="/chrome/liquid/chrome-blob-twisted.png"
                alt="" aria-hidden="true"
                className="animate-float relative z-10 w-full max-w-[clamp(260px,55vw,500px)] lg:max-w-[500px]"
                style={{
                  height: 'auto', pointerEvents: 'none',
                  filter: 'drop-shadow(0 0 50px rgba(180,140,255,0.4)) drop-shadow(0 0 100px rgba(100,60,220,0.25))',
                }}
              />

              {/* Chrome starburst — bottom-right corner accent */}
              <img
                src="/chrome/liquid/chrome-starburst.png"
                alt="" aria-hidden="true"
                className="animate-float-small absolute z-20 hidden sm:block"
                style={{
                  width: 'clamp(64px, 9vw, 100px)',
                  bottom: '8%', right: '4%',
                  opacity: 0.92,
                  filter: 'drop-shadow(0 0 22px rgba(255,255,255,0.55)) drop-shadow(0 0 8px rgba(200,180,255,0.45))',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── DESTINATIONS ────────────────────────────────────────────────── */}
      <section id="countries" className="py-24 bg-[#080808] relative z-10">
        <div className="container mx-auto px-6 mb-12" data-reveal="up">
          <h2 className="font-oxanium text-3xl md:text-[32px] chrome-text mb-2 section-reveal-heading">
            Куда переезжают
          </h2>
          <p className="font-space-grotesk text-sm text-white/40">Топ-7 направлений 2026 года</p>
        </div>

        <div className="container mx-auto px-6">
          <div
            className="flex overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 xl:grid-cols-7 gap-4 snap-x hide-scrollbar"
            data-stagger
          >
            {DESTINATIONS.map((dest, i) => (
              <div
                key={i}
                className="dest-card min-w-[200px] lg:min-w-0 snap-start flex flex-col justify-between h-[180px] relative overflow-hidden"
                data-reveal="up"
                style={
                  dest.image
                    ? { backgroundImage: `url(${dest.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : {}
                }
              >
                {dest.image && <div className="absolute inset-0 bg-black/65 z-0" />}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dest.flag}</span>
                    <div>
                      <h3 className="font-oxanium text-white font-medium text-base">{dest.country}</h3>
                      <p className="font-space-grotesk text-white/50 text-xs">{dest.city}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-space-grotesk text-white/40 text-xs mb-1">от</p>
                    <p className="font-oxanium text-white text-lg tracking-wide">{dest.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOID WAVE — blue sky chrome section ─────────────────────────── */}
      <section className="void-wave-section relative overflow-hidden">
        {/* Sky background */}
        <img
          src="/chrome/liquid/sky-bg.jpg"
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Black fade from top — sky "emerges" from darkness */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '42%',
            background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
            zIndex: 1,
          }}
        />
        {/* Black fade from bottom — sky recedes back into darkness */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '42%',
            background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
            zIndex: 1,
          }}
        />
        {/* Left + right edge vignettes */}
        <div
          className="absolute inset-y-0 left-0 pointer-events-none hidden md:block"
          style={{
            width: '18%',
            background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)',
            zIndex: 1,
          }}
        />
        <div
          className="absolute inset-y-0 right-0 pointer-events-none hidden md:block"
          style={{
            width: '18%',
            background: 'linear-gradient(to left, rgba(0,0,0,0.6), transparent)',
            zIndex: 1,
          }}
        />

        {/* Chrome burst overlay — scattered around eye (desktop) */}
        <img
          src="/chrome/liquid/chrome-burst-overlay.png"
          alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none hidden sm:block"
          style={{
            width: 'clamp(300px, 50vw, 700px)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.65,
            zIndex: 2,
          }}
        />

        {/* Chrome tendrils — left edge bleed */}
        <img
          src="/chrome/liquid/chrome-tendrils.png"
          alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none hidden lg:block"
          style={{
            left: '-8%', top: '10%',
            width: 'clamp(200px, 28vw, 400px)',
            opacity: 0.7, mixBlendMode: 'screen',
            transform: 'scaleX(-1)',
            zIndex: 2,
          }}
        />
        {/* Chrome tendrils — right edge */}
        <img
          src="/chrome/liquid/chrome-tendrils.png"
          alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none hidden lg:block"
          style={{
            right: '-8%', bottom: '10%',
            width: 'clamp(200px, 28vw, 400px)',
            opacity: 0.7, mixBlendMode: 'screen',
            zIndex: 2,
          }}
        />

        {/* Chrome eye — centered hero of the section */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 md:py-48 pointer-events-none">
          <img
            src="/chrome/liquid/chrome-eye-v2.png"
            alt="" aria-hidden="true"
            className="animate-float mb-8 md:mb-10"
            style={{
              width: 'clamp(160px, 36vw, 340px)',
              filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.6)) drop-shadow(0 0 80px rgba(180,220,255,0.4))',
            }}
          />
          <p className="font-oxanium text-[clamp(0.65rem,1.5vw,0.85rem)] tracking-[0.3em] text-white/50 uppercase mb-4">
            Sky, signal and liquid chrome in collision
          </p>
          <h2 className="font-oxanium text-[clamp(2rem,7vw,5rem)] font-bold text-white leading-none tracking-tight" style={{ textShadow: '0 0 60px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.9)' }}>
            VOID<br />WAVE
          </h2>
        </div>
      </section>

      {/* ─── CHROME FACE — WHY US ────────────────────────────────────────── */}
      <section id="about" className="bg-black relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          {/* Chrome face image — full-bleed left panel */}
          <div className="relative overflow-hidden min-h-[360px] lg:min-h-0">
            <img
              src="/chrome/liquid/chrome-face-colorful.jpg"
              alt="Chrome metallic face"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Right fade to match text panel */}
            <div
              className="absolute inset-y-0 right-0 hidden lg:block pointer-events-none"
              style={{
                width: '30%',
                background: 'linear-gradient(to right, transparent, #000000)',
              }}
            />
            {/* Bottom fade on mobile */}
            <div
              className="absolute inset-x-0 bottom-0 lg:hidden pointer-events-none"
              style={{
                height: '30%',
                background: 'linear-gradient(to top, #000000, transparent)',
              }}
            />
            {/* Chrome starburst accent over the face image */}
            <img
              src="/chrome/liquid/chrome-starburst.png"
              alt="" aria-hidden="true"
              className="absolute pointer-events-none liquid-chrome-pulse hidden sm:block"
              style={{
                width: '80px',
                top: '12%', right: '8%',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.7))',
                zIndex: 2,
              }}
            />
          </div>

          {/* Why us content — right panel */}
          <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 lg:py-24 bg-black relative">
            {/* Subtle chrome ribbon top edge on desktop */}
            <img
              src="/chrome/liquid/chrome-ribbon.png"
              alt="" aria-hidden="true"
              className="absolute top-0 left-0 right-0 pointer-events-none hidden lg:block"
              style={{
                height: '3px', width: '100%',
                objectFit: 'cover',
                opacity: 0.5, mixBlendMode: 'screen',
              }}
            />

            <h2
              className="font-oxanium text-3xl md:text-[40px] text-white mb-4 section-reveal-heading"
              data-reveal="up"
            >
              Почему нас выбирают
            </h2>
            <p className="font-space-grotesk text-sm text-white/40 mb-12" data-reveal="up">
              Семь лет — сотни сделок — ноль скрытых комиссий
            </p>

            <div className="flex flex-col gap-10" data-stagger>
              {WHY_US.map(({ Icon, title, desc }, i) => (
                <div key={i} className="flex gap-5" data-reveal="up">
                  <div className="feature-icon-wrapper chrome-bg-gradient shadow-[0_0_20px_rgba(255,255,255,0.15)] shrink-0">
                    <Icon className="feature-icon-inner w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-oxanium text-[18px] text-white mb-2">{title}</h3>
                    <p className="font-space-grotesk text-[15px] text-white/50 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST METRICS ───────────────────────────────────────────────── */}
      <section className="bg-[#080808] relative overflow-hidden">
        <div className="iridescent-line" />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-white/10"
            data-stagger
          >
            {TRUST_STATS.map(({ value, label }, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center px-4${i >= 2 ? ' mt-8 md:mt-0' : ''}`}
                data-reveal="scale"
              >
                <span className="font-oxanium text-4xl md:text-[56px] chrome-text mb-2" data-counter>
                  {value}
                </span>
                <span className="font-space-grotesk text-[13px] text-white/40 uppercase tracking-wider max-w-[180px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="iridescent-line" />
      </section>

      {/* ─── PROCESS ─────────────────────────────────────────────────────── */}
      <section id="consult" className="py-24 md:py-32 bg-black relative overflow-hidden">
        {/* Chrome tendrils — right atmospheric accent */}
        <img
          src="/chrome/liquid/chrome-tendrils.png"
          alt="" aria-hidden="true"
          className="absolute right-0 top-0 pointer-events-none select-none hidden xl:block"
          style={{
            width: '340px', opacity: 0.2,
            mixBlendMode: 'screen',
            transform: 'scaleY(-1)',
          }}
        />

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">

          {/* Steps */}
          <div data-reveal="left">
            <h2 className="font-oxanium text-3xl md:text-[40px] text-white mb-16 section-reveal-heading">
              Как это работает
            </h2>

            <div className="flex flex-col gap-10 relative" data-stagger>
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="process-item relative flex gap-6 z-10" data-reveal="up">
                  <div className="process-line" />
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/20 flex items-center justify-center shrink-0 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)] relative z-10">
                    <span className="font-oxanium text-sm chrome-text">{step.num}</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-space-grotesk text-[18px] text-white mb-2">{step.title}</h4>
                    <p className="font-space-grotesk text-[14px] text-white/40 max-w-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA card with chrome eye ornament */}
          <div className="relative flex flex-col items-center justify-center py-12 lg:py-20" data-reveal="right">
            {/* Chrome eye — large atmospheric element behind card */}
            <img
              src="/chrome/liquid/chrome-eye-v2.png"
              alt="" aria-hidden="true"
              className="absolute pointer-events-none select-none animate-float"
              style={{
                width: 'clamp(200px, 30vw, 300px)',
                opacity: 0.12,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'drop-shadow(0 0 40px rgba(180,200,255,0.3))',
                zIndex: 0,
              }}
            />

            {/* CTA card */}
            <div className="relative z-10 text-center bg-black/60 backdrop-blur-2xl px-10 py-12 border border-white/12 rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] max-w-[340px] w-full">
              {/* Chrome eye as card top ornament */}
              <img
                src="/chrome/liquid/chrome-eye-v2.png"
                alt="" aria-hidden="true"
                className="absolute -top-7 left-1/2 -translate-x-1/2 liquid-chrome-pulse pointer-events-none"
                style={{
                  width: '56px',
                  filter: 'drop-shadow(0 0 14px rgba(255,255,255,0.7))',
                }}
              />
              <h3 className="font-oxanium text-[28px] chrome-text mt-2 mb-8 max-w-[260px] mx-auto leading-tight">
                Первая консультация бесплатно
              </h3>
              <Link href="/about" className="eom-btn-ghost w-full font-oxanium tracking-wide justify-center">
                Записаться
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ─────────────────────────────────────────── */}
      <section id="properties" className="py-24 bg-[#080808] relative">
        {/* Chrome ribbon top accent */}
        <img
          src="/chrome/liquid/chrome-ribbon.png"
          alt="" aria-hidden="true"
          className="absolute top-0 left-0 right-0 w-full pointer-events-none"
          style={{ height: '3px', objectFit: 'cover', opacity: 0.4, mixBlendMode: 'screen' }}
        />

        <div className="container mx-auto px-6">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
            data-reveal="up"
          >
            <h2 className="font-oxanium text-3xl md:text-[36px] text-white section-reveal-heading">
              Избранные объекты
            </h2>
            <Link
              href="/properties"
              className="font-space-grotesk text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
            >
              Смотреть все объекты
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-stagger>
            {FEATURED_PROPERTIES.map((prop, i) => (
              <Link
                key={i}
                href="/properties"
                className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-colors block"
                data-reveal="up"
              >
                <div className="aspect-[3/2] relative overflow-hidden bg-[#141414]">
                  <img
                    src={prop.image}
                    alt={prop.district}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-full font-space-grotesk">
                    {prop.location}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-space-grotesk">
                    {prop.type}
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-oxanium text-[28px] chrome-text mb-6">{prop.price}</p>
                  <p className="font-space-grotesk text-sm text-white/60 mb-6">{prop.district}</p>
                  <div className="flex items-center gap-6 text-sm text-white/40 font-space-grotesk border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4" />
                      <span>{prop.beds} спальни</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4" />
                      <span>{prop.baths} ванные</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{prop.area}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Chrome tendrils — very faint right side */}
        <img
          src="/chrome/liquid/chrome-tendrils.png"
          alt="" aria-hidden="true"
          className="absolute right-0 bottom-0 pointer-events-none select-none hidden xl:block"
          style={{
            width: '280px', opacity: 0.14,
            mixBlendMode: 'screen',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-16" data-reveal="up">
            <h2 className="font-oxanium text-3xl md:text-[40px] text-white section-reveal-heading">
              Клиенты говорят сами
            </h2>
            <p className="font-space-grotesk text-sm text-white/40 mt-2">Реальные истории — без маркетинга</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-stagger>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card" data-reveal="up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full chrome-bg-gradient flex items-center justify-center flex-shrink-0">
                    <span className="font-oxanium text-xs text-white font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-oxanium text-white text-sm">{t.name}</p>
                    <p className="font-space-grotesk text-xs text-white/40">
                      {t.from} · {t.date}
                    </p>
                  </div>
                </div>
                <p className="font-space-grotesk text-[15px] text-white/65 leading-relaxed mb-6">
                  «{t.text}»
                </p>
                <div className="pt-4 border-t border-white/5">
                  <p className="font-oxanium text-xs text-white/30 uppercase tracking-wider">{t.deal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}
