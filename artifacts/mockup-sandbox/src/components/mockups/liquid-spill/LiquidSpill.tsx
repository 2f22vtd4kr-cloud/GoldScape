import './_group.css';
import './liquid-spill.css';
import { ChromeShapeSpill } from './ChromeShapeSpill';

/** Improved decorative chrome system — smoother, more liquid shapes plus
 *  a true oil-slick "gas spill" iridescent palette (blue → cyan → magenta
 *  → gold → violet) and a new multi-tendril splash variant, generated from
 *  the Softulka "3D Chrome Shapes" / "Wavy Chrome" reference packs. Same
 *  copy, layout and section structure as Current.tsx so the two can be
 *  compared side-by-side. */
export default function LiquidSpill() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }} className="font-space-grotesk">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[640px] flex items-center pt-20 overflow-hidden">
        <div className="hero-grid" />

        {/* Ambient gas-spill tendrils bleeding off the left edge behind copy */}
        <div className="absolute -left-24 top-1/3 opacity-25 pointer-events-none hidden lg:block" aria-hidden="true">
          <ChromeShapeSpill variant="spill" size={220} iridescent breathe float />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start pt-10 lg:pt-0">
            <span className="font-oxanium text-[11px] tracking-[0.25em] text-white/40 mb-6 uppercase">
              Международная недвижимость
            </span>
            <h1 className="font-oxanium text-5xl md:text-7xl lg:text-[72px] font-light leading-[1.05] chrome-text mb-6 tracking-tight section-reveal-heading">
              Ваш капитал <br /> заслуживает <br />
              <span className="chrome-text-accent font-bold">свободы</span>
            </h1>
            <p className="font-space-grotesk text-lg text-white/55 max-w-lg mb-12 leading-relaxed">
              Инвестиции в зарубежную недвижимость — ОАЭ, Турция, Кипр, Грузия, Португалия
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <a href="#" className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider">
                Подобрать объект
              </a>
              <a href="#" className="eom-btn-ghost font-oxanium text-sm uppercase tracking-wider">
                Бесплатная консультация
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[420px] lg:h-[560px] flex items-center justify-center mt-4 lg:mt-0">
            {/* Richer oil-slick ambient glow, replaces the flat purple conic glow */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div
                style={{
                  width: 'min(520px, 92vw)',
                  height: 'min(520px, 92vw)',
                  background: 'conic-gradient(from 0deg, #3a9ce0, #8be8ff, #ff8fce, #ffb347, #7a4fd0, #35c9c9, #3a9ce0)',
                  filter: 'blur(95px)',
                  opacity: 0.3,
                  borderRadius: '50%',
                }}
              />
            </div>

            {/* Main gas-spill hero splash — generated liquid chrome shape,
                replaces the flat single-blob raster with an organic
                multi-tendril splash frozen mid-drip */}
            <img
              src="/__mockup/chrome/chrome-spill-hero.png"
              alt=""
              className="animate-float relative z-10"
              style={{
                width: 'clamp(280px, 42vw, 520px)',
                height: 'auto',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 0 70px rgba(80,180,255,0.35)) drop-shadow(0 0 40px rgba(255,140,220,0.25))',
              }}
            />

            {/* Small drip trailing off the main splash toward the corner */}
            <img
              src="/__mockup/chrome/chrome-spill-small.png"
              alt=""
              className="animate-float-small absolute z-20 opacity-90 hidden sm:block"
              style={{ width: '96px', bottom: '10%', right: '2%', filter: 'drop-shadow(0 0 24px rgba(255,150,220,0.3))' }}
            />

            <ChromeShapeSpill
              variant="ring"
              size={54}
              breathe
              iridescent
              className="absolute z-20 opacity-70 hidden sm:block"
              style={{ top: '14%', left: '2%' }}
            />
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
        <div className="gas-spill-glow w-[560px] h-[560px] absolute -bottom-[280px] -left-[280px] opacity-30 z-0 pointer-events-none" />

        {/* Spike accent swapped for the new multi-tendril spill */}
        <ChromeShapeSpill
          variant="spill"
          size={90}
          breathe
          float
          iridescent
          className="absolute top-6 right-[6%] opacity-45 pointer-events-none hidden lg:block"
        />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-oxanium text-3xl md:text-[40px] text-white mb-16 section-reveal-heading">
            Почему нас выбирают
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Юридическая чистота', desc: 'Каждый объект проходит полную проверку права собственности.' },
              { title: 'Локальные партнёры', desc: 'fäm Properties (ОАЭ), H&S Real Estate (Кипр/Турция), Knight Frank.' },
              { title: 'Сделка за 14 дней', desc: 'От первого звонка до подписания договора — в среднем 14 дней.' },
            ].map(({ title, desc }, i) => (
              <div key={i} className="flex flex-col">
                <div className="feature-icon-wrapper chrome-bg-gradient shadow-[0_0_20px_rgba(120,200,255,0.2)]">
                  <div className="feature-icon-inner w-5 h-5 rounded-sm bg-current" />
                </div>
                <h3 className="font-oxanium text-[18px] text-white mb-4">{title}</h3>
                <p className="font-space-grotesk text-[15px] text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 bg-[#080808] relative overflow-hidden">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <div className="relative flex flex-col items-center justify-center py-20">
            <div className="gas-spill-glow w-[420px] h-[420px] absolute z-0 opacity-32 mix-blend-screen pointer-events-none" />
            <div className="gas-spill-blob w-[260px] h-[260px] absolute z-10 animate-float-small opacity-75 pointer-events-none" />

            {/* Drip leaking off the blob's edge — literal gas-spill detail */}
            <div
              className="gas-drip absolute z-10 pointer-events-none"
              style={{ width: '26px', height: '54px', bottom: '18%', left: '38%', transform: 'rotate(8deg)' }}
            />

            <ChromeShapeSpill
              variant="spill"
              size={58}
              breathe
              iridescent
              className="absolute z-20 opacity-85 hidden md:block"
              style={{ top: '8%', right: '-6%' }}
            />

            <div className="relative z-20 text-center bg-black/48 backdrop-blur-2xl px-10 py-12 border border-white/12 rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(120,180,255,0.1)] max-w-[320px] w-full">
              <ChromeShapeSpill
                variant="orb"
                size={36}
                breathe
                iridescent
                className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-90"
              />
              <h3 className="font-oxanium text-[28px] chrome-text mt-2 mb-8 max-w-[250px] mx-auto leading-tight">
                Первая консультация бесплатно
              </h3>
              <a href="#" className="eom-btn-ghost w-full font-oxanium tracking-wide justify-center">
                Записаться
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials strip ─── */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
        <ChromeShapeSpill
          variant="spill"
          size={110}
          breathe
          iridescent
          float
          className="absolute bottom-8 left-[3%] opacity-35 pointer-events-none hidden lg:block"
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="testimonial-card max-w-md" style={{ borderColor: 'rgba(140,200,255,0.12)' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full chrome-bg-gradient flex items-center justify-center flex-shrink-0">
                <span className="font-oxanium text-xs text-white font-bold">В.М.</span>
              </div>
              <div>
                <p className="font-oxanium text-white text-sm">Виктор М.</p>
                <p className="font-space-grotesk text-xs text-white/40">Москва → Дубай</p>
              </div>
            </div>
            <p className="font-space-grotesk text-[15px] text-white/65 leading-relaxed">
              «За 11 дней закрыли сделку на апартаменты в Downtown Dubai.»
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
