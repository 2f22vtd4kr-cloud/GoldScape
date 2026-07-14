import { useEffect, useRef } from 'react';
import { Shield, Globe, Zap, Bed, Bath } from 'lucide-react';
import { Link } from 'wouter';
import { Layout } from '@/components/Layout';
import { ChromeShape } from '@/components/ChromeShape';

const DESTINATIONS = [
  { code: 'ae', country: 'ОАЭ',         city: 'Дубай',     price: 'от $380,000',  image: '/images/dest-dubai.jpg',    perk: '0% Налог, ВНЖ' },
  { code: 'tr', country: 'Турция',       city: 'Анталья',   price: 'от $115,000',  image: '/images/dest-turkey.jpg',   perk: 'ВНЖ при покупке' },
  { code: 'cy', country: 'Кипр',         city: 'Лимасол',   price: 'от €285,000',  image: '/images/dest-cyprus.jpg',   perk: 'ПМЖ за инвестиции' },
  { code: 'ge', country: 'Грузия',       city: 'Батуми',    price: 'от $65,000',   image: '/images/dest-georgia.jpg',  perk: 'ВНЖ для семьи' },
  { code: 'th', country: 'Таиланд',      city: 'Пхукет',    price: 'от $95,000',   image: '/images/dest-thailand.jpg', perk: 'Доходность до 10%' },
  { code: 'pt', country: 'Португалия',   city: 'Лиссабон',  price: 'от €345,000',  image: '/images/dest-portugal.jpg', perk: 'Золотая виза' },
  { code: 'rs', country: 'Сербия',       city: 'Белград',   price: 'от €85,000',   image: '/images/dest-serbia.jpg',   perk: 'ВНЖ' },
];

const FEATURED_PROPERTIES = [
  {
    id: 1,
    image: '/images/prop-dubai.jpg',
    location: 'Дубай, ОАЭ',
    type: 'Апартаменты',
    price: '$2,400,000',
    district: 'Palm Jumeirah',
    beds: 3,
    baths: 2,
    area: '210м²',
  },
  {
    // No exact catalogue match at this price point — links to the general catalogue, not a detail page.
    id: null,
    image: '/images/prop-antalya.jpg',
    location: 'Анталья, Турция',
    type: 'Квартира',
    price: '$115,000',
    district: 'Коньяалты',
    beds: 2,
    baths: 1,
    area: '85м²',
  },
  {
    id: 8,
    image: '/images/prop-cyprus.jpg',
    location: 'Пафос, Кипр',
    type: 'Вилла',
    price: '€680,000',
    district: 'Koloni · Вид на море',
    beds: 3,
    baths: 3,
    area: '240м²',
  },
  {
    id: 9,
    image: '/images/prop-georgia.jpg',
    location: 'Батуми, Грузия',
    type: 'Апартаменты',
    price: '$95,000',
    district: 'Морской фронт',
    beds: 2,
    baths: 1,
    area: '72м²',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Консультация', desc: 'Анализ задач, бюджета и предпочтений. Подбор безопасной юрисдикции и обсуждение ВНЖ.' },
  { num: '02', title: 'Подбор объектов', desc: 'Предоставляем шорт-лист из закрытой базы. Реальные цены и прозрачная экономика.' },
  { num: '03', title: 'Юридическая защита', desc: 'Проверка застройщика или собственника, легальный план перевода средств (Swift, крипто).' },
  { num: '04', title: 'Закрытие сделки', desc: 'Безопасный перевод, регистрация собственности и подача на ВНЖ для всей семьи.' },
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
    text: 'Переезжали с тремя детьми. Нашли дом, помогли с ВНЖ, подсказали международные школы. Прозрачная комиссия, никаких скрытых платежей. Дети уже учатся в Лимасоле.',
    deal: 'Вилла · Лимасол · €285 000',
  },
  {
    initials: 'Д.Л.',
    name: 'Дмитрий Л.',
    from: 'Екатеринбург → Батуми',
    date: 'Март 2026',
    text: 'Взял квартиру в Батуми. Ребята учли мои налоги, провели сделку онлайн за пару дней. Доходность — 9,4% годовых. Команда сама рекомендовала управляющую компанию.',
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
    desc: 'Каждый объект проходит полную проверку права собственности. Мы работаем с нотариусами и юристами в каждой стране. Легальный перевод средств.',
  },
  {
    Icon: Globe,
    title: 'Локальные партнёры',
    desc: 'fäm Properties (ОАЭ), H&S Real Estate (Кипр/Турция), Knight Frank (Португалия) и другие аккредитованные агентства.',
  },
  {
    Icon: Zap,
    title: 'Сделка за 14 дней',
    desc: 'От первого звонка до подписания договора — в среднем 14 рабочих дней. Сопровождение на каждом шаге. Прозрачные комиссии.',
  },
];

export default function Home() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = heroSectionRef.current;
    const glow = heroGlowRef.current;
    if (!section || !glow) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${relX * -16}px, ${relY * -12}px, 0)`;
      });
    };
    const reset = () => {
      glow.style.transform = '';
    };
    section.addEventListener('mousemove', handleMove);
    section.addEventListener('mouseleave', reset);
    return () => {
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseleave', reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Layout>

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section ref={heroSectionRef} className="relative dark:bg-black bg-white overflow-hidden">
        <div className="hero-grid" />

        <div className="absolute inset-0 lg:hidden pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="hero-glow-spill hero-glow-spill--mobile absolute"
            style={{ width: '150vw', height: '150vw', top: '-24%', right: '-40vw', opacity: 0.4 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, hsl(var(--background) / 0.35) 0%, hsl(var(--background) / 0.68) 55%, hsl(var(--background)) 100%)' }}
          />
        </div>

        <div className="container mx-auto px-6 pt-28 pb-12 lg:pt-20 lg:pb-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 lg:items-start">

            {/* ── Text ── */}
            <div className="lg:col-span-7 flex flex-col items-start pb-6 lg:pb-4">
              <span className="font-oxanium text-[11px] md:text-[12px] tracking-[0.2em] dark:text-white/40 text-foreground/45 mb-4 uppercase">
                Международная недвижимость
              </span>

              <h1 className="section-reveal-heading font-oxanium font-bold dark:text-white text-foreground uppercase leading-[1.05] tracking-tight mb-5 text-[clamp(2.2rem,6vw,4rem)] max-w-xl">
                Безопасная гавань для капитала
              </h1>

              <p className="font-space-grotesk text-[15px] md:text-lg dark:text-white/60 text-foreground/65 max-w-lg mb-8 leading-relaxed">
                Инвестиции в зарубежную недвижимость. Проверенные юрисдикции, ВНЖ для всей семьи и прозрачные сделки без скрытых комиссий. Легальный перевод средств — Swift, SEPA и другие механизмы.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 w-full sm:w-auto">
                <Link href="/properties" className="eom-btn-primary hero-cta-pill font-oxanium text-sm uppercase tracking-wider min-h-[48px] px-8 flex items-center justify-center text-center">
                  Подобрать объект
                </Link>
                <a href="https://wa.me/971502345678" target="_blank" rel="noreferrer" className="eom-btn-ghost hero-cta-pill font-oxanium text-sm uppercase tracking-wider min-h-[48px] px-8 flex items-center justify-center text-center">
                  Написать в WhatsApp
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 dark:text-white/50 text-foreground/55 font-oxanium text-[12px] uppercase tracking-wider">
                <div className="flex items-center gap-2"><Globe className="w-4 h-4 opacity-50"/> 7 стран</div>
                <div className="flex items-center gap-2"><Shield className="w-4 h-4 opacity-50"/> ₽0 комиссии</div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4 opacity-50"/> Легально</div>
              </div>
            </div>

            {/* ── Visual ── */}
            <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center h-[680px]">
              <div
                ref={heroGlowRef}
                className="hero-glow-spill"
                style={{ width: 'min(760px, 98%)', height: 'min(760px, 98%)' }}
              />

              <img
                src="/chrome/liquid/chrome-starburst.png"
                alt="" aria-hidden="true"
                className="animate-float-small absolute z-20"
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

        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '28%',
            background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.75) 45%, transparent 100%)',
            zIndex: 20,
          }}
        />
      </section>

      {/* ─── DESTINATIONS ────────────────────────────────────────────────── */}
      <section id="countries" className="py-24 dark:bg-[#080808] bg-[#F5F3EE] relative z-10 border-t dark:border-white/5 border-black/5">
        <div className="container mx-auto px-6 mb-12" data-reveal="up">
          <h2 className="font-oxanium text-3xl md:text-[32px] chrome-text tracking-tight mb-2 section-reveal-heading">
            Куда переезжают
          </h2>
          <p className="font-space-grotesk text-sm dark:text-white/40 text-foreground/50">Топ-7 направлений для инвестиций, релокации и ВНЖ</p>
        </div>

        <div className="container mx-auto px-6">
          <div
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3 md:gap-4"
            data-stagger
          >
            {DESTINATIONS.map((dest, i) => (
              <Link
                key={i}
                href={`/countries/${dest.code}`}
                className="dest-card min-h-[160px] flex flex-col justify-between relative overflow-hidden group border border-white/5 rounded-xl hover:border-white/20 transition-colors"
                data-reveal="up"
              >
                <div className="absolute inset-0 bg-black z-0">
                  {dest.image && (
                    <img src={dest.image} alt={dest.country} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                  <div className="mb-6">
                    <h3 className="font-oxanium text-white font-medium text-base tracking-tight">{dest.country}</h3>
                    <p className="font-space-grotesk text-white/60 text-[11px] uppercase tracking-wider">{dest.city}</p>
                  </div>
                  <div>
                    <p className="font-space-grotesk text-[#b090f0] text-[10px] mb-1 font-medium">{dest.perk}</p>
                    <p className="font-oxanium text-white text-sm tracking-wide">{dest.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR WHOM — use-case entry points (Irina + Viktor + Dmitri) ───── */}
      <section className="py-20 dark:bg-[#060606] bg-white border-t dark:border-white/5 border-black/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="mb-10" data-reveal="up">
            <h2 className="font-oxanium text-2xl md:text-[28px] dark:text-white text-foreground tracking-tight mb-2 section-reveal-heading">
              Для кого мы работаем
            </h2>
            <p className="font-space-grotesk text-sm dark:text-white/40 text-foreground/50">Три ситуации — одно надёжное агентство</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-stagger>
            <Link href="/countries/ae" className="group dark:bg-white/[0.02] bg-black/[0.02] border dark:border-white/[0.07] border-black/[0.06] rounded-2xl p-7 flex flex-col gap-4 dark:hover:border-white/20 hover:border-black/15 dark:hover:bg-white/[0.04] hover:bg-black/[0.035] transition-all" data-reveal="up">
              <div className="text-2xl">🏦</div>
              <h3 className="font-oxanium dark:text-white text-foreground text-[18px] tracking-tight">Сохранение капитала</h3>
              <p className="font-space-grotesk text-sm dark:text-white/50 text-foreground/60 leading-relaxed flex-1">
                Имеете ₽15–100M и хотите перевести в твёрдый актив. Легально, через SWIFT/SEPA и другие механизмы. Полный FATF-комплаенс.
              </p>
              <span className="font-oxanium text-[11px] uppercase tracking-wider dark:text-white/25 text-foreground/35 dark:group-hover:text-white/50 group-hover:text-foreground/70 transition-colors">ОАЭ и Кипр →</span>
            </Link>
            <Link href="/countries/cy" className="group dark:bg-white/[0.02] bg-black/[0.02] border dark:border-white/[0.07] border-black/[0.06] rounded-2xl p-7 flex flex-col gap-4 dark:hover:border-white/20 hover:border-black/15 dark:hover:bg-white/[0.04] hover:bg-black/[0.035] transition-all" data-reveal="up">
              <div className="text-2xl">👨‍👩‍👧</div>
              <h3 className="font-oxanium dark:text-white text-foreground text-[18px] tracking-tight">Переезд с семьёй</h3>
              <p className="font-space-grotesk text-sm dark:text-white/50 text-foreground/60 leading-relaxed flex-1">
                Планируете переезд с детьми. Нужны международные школы, безопасность и ВНЖ. Сопровождаем от выбора района до записи детей в школу.
              </p>
              <span className="font-oxanium text-[11px] uppercase tracking-wider dark:text-white/25 text-foreground/35 dark:group-hover:text-white/50 group-hover:text-foreground/70 transition-colors">Кипр и Турция →</span>
            </Link>
            <Link href="/tax" className="group dark:bg-white/[0.02] bg-black/[0.02] border dark:border-white/[0.07] border-black/[0.06] rounded-2xl p-7 flex flex-col gap-4 dark:hover:border-white/20 hover:border-black/15 dark:hover:bg-white/[0.04] hover:bg-black/[0.035] transition-all" data-reveal="up">
              <div className="text-2xl">💻</div>
              <h3 className="font-oxanium dark:text-white text-foreground text-[18px] tracking-tight">База для бизнеса</h3>
              <p className="font-space-grotesk text-sm dark:text-white/50 text-foreground/60 leading-relaxed flex-1">
                Нужна юрисдикция с нулевым налогом, счётом в банке и налоговым резидентством. Работаем с крипто-доходом и IT-бизнесом.
              </p>
              <span className="font-oxanium text-[11px] uppercase tracking-wider dark:text-white/25 text-foreground/35 dark:group-hover:text-white/50 group-hover:text-foreground/70 transition-colors">Налоговый гид →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ─────────────────────────────────────────── */}
      <section className="py-24 dark:bg-[#050505] bg-[#F5F3EE] relative z-10 border-t dark:border-white/5 border-black/5">
        <div className="container mx-auto px-6 mb-12" data-reveal="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-oxanium text-3xl md:text-[32px] dark:text-white text-foreground tracking-tight mb-2 section-reveal-heading">
                Актуальные объекты
              </h2>
              <p className="font-space-grotesk text-sm dark:text-white/40 text-foreground/50">Для инвестиций и релокации</p>
            </div>
            <Link href="/properties" className="eom-btn-ghost font-oxanium text-xs uppercase tracking-wider min-h-[48px] px-6 flex items-center justify-center">
              Все объекты
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-stagger>
            {FEATURED_PROPERTIES.map((prop, i) => (
              <Link key={i} href={prop.id ? `/properties/${prop.id}` : '/properties'} className="group relative dark:bg-[#111] bg-white border dark:border-white/5 border-black/[0.06] rounded-2xl overflow-hidden dark:hover:border-white/20 hover:border-black/15 transition-colors flex flex-col min-h-[48px]" data-reveal="up">
                <div className="aspect-[3/2] overflow-hidden relative bg-black">
                  <img src={prop.image} alt={prop.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 font-space-grotesk text-[10px] text-white uppercase tracking-widest">
                    {prop.location}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="font-oxanium text-xl dark:text-white text-foreground tracking-tight mb-1">{prop.price}</h3>
                    <p className="font-space-grotesk text-xs dark:text-white/50 text-foreground/55">{prop.type} · {prop.district}</p>
                  </div>
                  <div className="flex items-center gap-4 border-t dark:border-white/5 border-black/[0.06] pt-4 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 dark:text-white/40 text-foreground/40" />
                      <span className="font-space-grotesk text-xs dark:text-white/70 text-foreground/70">{prop.beds}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 dark:text-white/40 text-foreground/40" />
                      <span className="font-space-grotesk text-xs dark:text-white/70 text-foreground/70">{prop.baths}</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className="font-space-grotesk text-xs dark:text-white/40 text-foreground/45">{prop.area}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOID WAVE — liquid chrome trust section ─────────────────────── */}
      <section className="void-wave-section relative overflow-hidden">
        <div
          className="hero-glow-spill absolute pointer-events-none"
          style={{
            width: 'min(900px, 130vw)', height: 'min(900px, 130vw)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.4,
            zIndex: 0,
          }}
        />

        <img
          src="/chrome/liquid/chrome-tendrils.png"
          alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none hidden lg:block"
          style={{
            left: '-8%', top: '10%',
            width: 'clamp(200px, 28vw, 400px)',
            opacity: 0.5, mixBlendMode: 'screen',
            transform: 'scaleX(-1)',
            zIndex: 2,
          }}
        />
        <img
          src="/chrome/liquid/chrome-tendrils.png"
          alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none hidden lg:block"
          style={{
            right: '-8%', bottom: '10%',
            width: 'clamp(200px, 28vw, 400px)',
            opacity: 0.5, mixBlendMode: 'screen',
            zIndex: 2,
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-40">
          <img
            src="/chrome/liquid/chrome-blob-twisted.png"
            alt="" aria-hidden="true"
            className="animate-float mb-10 md:mb-12"
            style={{
              width: 'clamp(150px, 26vw, 260px)',
              filter: 'drop-shadow(0 0 40px rgba(200,180,255,0.35)) drop-shadow(0 0 80px rgba(120,140,255,0.2))',
            }}
          />

          <p className="font-oxanium text-[clamp(0.6rem,1.4vw,0.8rem)] tracking-[0.32em] dark:text-white/45 text-foreground/50 uppercase mb-5">
            Международная недвижимость
          </p>

          <h2 className="font-oxanium font-bold uppercase chrome-text leading-[1.05] tracking-tight text-[clamp(2rem,6vw,4rem)] mb-10">
            Свобода капитала
          </h2>

          <div className="flex flex-wrap justify-center gap-8 md:gap-14 mb-10">
            {[
              { val: '$130M+', label: 'сделок закрыто' },
              { val: '12',     label: 'стран' },
              { val: '847',    label: 'семей' },
            ].map(s => (
              <div key={s.val} className="text-center">
                <p
                  className="font-oxanium text-[clamp(1.5rem,4.5vw,2.6rem)] chrome-text leading-none tracking-tight"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
                >
                  {s.val}
                </p>
                <p className="font-space-grotesk text-[10px] dark:text-white/40 text-foreground/50 uppercase tracking-[0.22em] mt-1.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Link href="/properties" className="eom-btn-ghost font-oxanium text-sm uppercase tracking-wider min-h-[48px] inline-flex items-center justify-center px-8">
            Смотреть объекты
          </Link>
        </div>
      </section>

      {/* ─── DUBAI SKYLINE — WHY US ──────────────────────────────────────── */}
      <section id="about" className="dark:bg-black bg-white relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
            <div
              className="absolute inset-0 face-aurora-bg pointer-events-none"
              style={{ zIndex: 0 }}
            />
            <img
              src="/chrome/liquid/chrome-face-colorful.jpg"
              alt="Chrome face sculpture"
              className="absolute inset-0 w-full h-full object-cover object-center face-chrome-shimmer"
              style={{ zIndex: 1 }}
            />
            <div className="face-highlight-sweep" style={{ zIndex: 3 }} />
            <div
              className="absolute inset-y-0 right-0 hidden lg:block pointer-events-none"
              style={{
                width: '35%',
                background: 'linear-gradient(to right, transparent, hsl(var(--background)))',
                zIndex: 4,
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: '52%',
                background: 'linear-gradient(to top, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.55) 45%, transparent 100%)',
                zIndex: 4,
              }}
            />
            <img
              src="/chrome/liquid/chrome-starburst.png"
              alt="" aria-hidden="true"
              className="absolute pointer-events-none liquid-chrome-pulse hidden sm:block"
              style={{
                width: '72px',
                top: '10%', right: '10%',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.7))',
                zIndex: 5,
              }}
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start px-6 md:px-8 pb-7 md:pb-9" style={{ zIndex: 6 }}>
              <p className="font-oxanium text-[9px] tracking-[0.32em] dark:text-white/40 text-foreground/70 uppercase mb-4">
                Ваши инвестиции под защитой
              </p>
              <div className="flex gap-6 mb-5">
                {[
                  { val: '7+',  label: 'лет опыта' },
                  { val: '847', label: 'сделок' },
                  { val: '₽0',  label: 'комиссии' },
                ].map(s => (
                  <div key={s.val}>
                    <p className="font-oxanium text-[22px] chrome-text leading-none tracking-tight">{s.val}</p>
                    <p className="font-space-grotesk text-[9px] dark:text-white/45 text-foreground/70 uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="eom-btn-primary font-oxanium text-[12px] uppercase tracking-wider min-h-[48px] inline-flex items-center justify-center px-6">
                Бесплатная консультация
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 lg:py-24 dark:bg-black bg-white relative">
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
              className="font-oxanium text-3xl md:text-[40px] dark:text-white text-foreground mb-4 section-reveal-heading tracking-tight"
              data-reveal="up"
            >
              Почему нас выбирают
            </h2>
            <p className="font-space-grotesk text-sm dark:text-white/40 text-foreground/55 mb-12" data-reveal="up">
              Семь лет — сотни сделок — ноль скрытых комиссий
            </p>

            <div className="flex flex-col gap-10" data-stagger>
              {WHY_US.map(({ Icon, title, desc }, i) => (
                <div key={i} className="flex gap-5" data-reveal="up">
                  <div className="feature-icon-wrapper chrome-bg-gradient shadow-[0_0_20px_rgba(255,255,255,0.15)] shrink-0">
                    <Icon className="feature-icon-inner w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-oxanium text-[18px] dark:text-white text-foreground mb-2 tracking-tight">{title}</h3>
                    <p className="font-space-grotesk text-[15px] dark:text-white/50 text-foreground/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST METRICS ───────────────────────────────────────────────── */}
      <section className="dark:bg-[#080808] bg-[#F5F3EE] relative overflow-hidden">
        <div className="iridescent-line" />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x dark:divide-white/10 divide-black/10"
            data-stagger
          >
            {TRUST_STATS.map(({ value, label }, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center px-4${i >= 2 ? ' mt-8 md:mt-0' : ''}`}
                data-reveal="scale"
              >
                <span className="font-oxanium text-4xl md:text-[56px] chrome-text mb-2 tracking-tight" data-counter>
                  {value}
                </span>
                <span className="font-space-grotesk text-[13px] dark:text-white/40 text-foreground/50 uppercase tracking-wider max-w-[180px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="iridescent-line" />
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="py-24 dark:bg-[#050505] bg-white relative border-t dark:border-white/5 border-black/5">
        <div className="container mx-auto px-6 mb-12" data-reveal="up">
          <h2 className="font-oxanium text-3xl md:text-[32px] dark:text-white text-foreground mb-2 section-reveal-heading tracking-tight">
            Опыт клиентов
          </h2>
          <p className="font-space-grotesk text-sm dark:text-white/40 text-foreground/50">Реальные кейсы инвестиций и переездов</p>
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="dark:bg-white/5 bg-black/[0.025] border dark:border-white/10 border-black/[0.07] rounded-2xl p-8 flex flex-col justify-between dark:hover:border-white/20 hover:border-black/15 transition-colors">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full dark:bg-white/10 bg-black/[0.06] flex items-center justify-center font-oxanium dark:text-white/70 text-foreground/70 tracking-tight shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-oxanium dark:text-white text-foreground text-sm tracking-tight">{t.name}</p>
                      <p className="font-space-grotesk text-xs dark:text-white/40 text-foreground/50">{t.from} · {t.date}</p>
                    </div>
                  </div>
                  <p className="font-space-grotesk text-[14px] dark:text-white/70 text-foreground/75 leading-relaxed mb-6">
                    «{t.text}»
                  </p>
                </div>
                <div className="pt-4 border-t dark:border-white/10 border-black/[0.07]">
                  <p className="font-space-grotesk text-[11px] text-[#b090f0] uppercase tracking-wider">{t.deal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─────────────────────────────────────────────────────── */}
      <section id="consult" className="py-24 md:py-32 dark:bg-black bg-[#F5F3EE] relative overflow-hidden">
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

          <div data-reveal="left">
            <h2 className="font-oxanium text-3xl md:text-[40px] dark:text-white text-foreground mb-16 section-reveal-heading tracking-tight">
              Как это работает
            </h2>

            <div className="flex flex-col gap-10 relative" data-stagger>
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="process-item relative flex gap-5 z-10 items-start" data-reveal="up">
                  <div className="process-line" />
                  <img
                    src={`/chrome/liquid/chrome-num-${step.num}.png`}
                    alt={step.num}
                    className="w-14 h-14 shrink-0 object-contain relative z-10"
                    style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 18px rgba(200,180,255,0.55))' }}
                  />
                  <div className="pt-3">
                    <h4 className="font-space-grotesk text-[18px] dark:text-white text-foreground mb-2 tracking-tight">{step.title}</h4>
                    <p className="font-space-grotesk text-[14px] dark:text-white/40 text-foreground/55 max-w-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center py-12 lg:py-20" data-reveal="right">
            <div
              className="absolute pointer-events-none select-none animate-float"
              style={{
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.14,
                zIndex: 0,
              }}
            >
              <ChromeShape variant="blob" iridescent size={280} breathe={false} />
            </div>

            <div className="relative z-10 text-center dark:bg-black/60 bg-white/75 backdrop-blur-2xl px-10 py-12 border dark:border-white/12 border-black/10 rounded-3xl dark:shadow-[0_8px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] shadow-[0_8px_60px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] max-w-[340px] w-full">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <ChromeShape variant="orb" iridescent size={90} />
              </div>
              <h3 className="font-oxanium text-2xl dark:text-white text-foreground mb-4 tracking-tight">Бесплатный разбор</h3>
              <p className="font-space-grotesk text-sm dark:text-white/50 text-foreground/60 mb-8 leading-relaxed">
                Оставьте заявку — мы свяжемся с вами в течение часа и предложим 3 оптимальных решения под ваш капитал.
              </p>
              <Link
                href="/properties"
                className="eom-btn-primary font-oxanium text-[12px] uppercase tracking-wider w-full min-h-[48px] flex items-center justify-center"
              >
                Подобрать объект
              </Link>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
