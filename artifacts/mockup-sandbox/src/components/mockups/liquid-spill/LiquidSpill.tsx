import './_group.css';
import './liquid-spill.css';

/** Improved decorative chrome system — one large background shape per
 *  section, cropped pixel-perfectly from the Softulka "Wavy Chrome"
 *  reference sheet (no hand-authored SVG approximations). Each shape
 *  bleeds off a screen edge, sits at big scale behind the real content,
 *  and uses mix-blend-mode: screen so its black sheet-background
 *  disappears into the page — never presented as a standalone visual,
 *  always ambient decoration for the copy/UI in front of it. Same copy,
 *  layout and section structure as Current.tsx so the two compare
 *  side-by-side. */
export default function LiquidSpill() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }} className="font-space-grotesk">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[640px] flex items-center pt-20 overflow-hidden">
        <div className="hero-grid" />

        {/* One big pixel-perfect chrome shape, bleeding off the right edge
            behind the copy — background decoration, not a featured visual */}
        <img
          src="/__mockup/chrome/spill-sheet/hero.png"
          alt=""
          className="absolute z-0 pointer-events-none select-none hidden md:block"
          style={{
            width: 'min(680px, 52vw)',
            height: 'auto',
            top: '-4%',
            right: '-6%',
            mixBlendMode: 'screen',
            opacity: 0.92,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl flex flex-col items-start pt-10 lg:pt-0">
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
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section id="why-us" className="py-24 bg-[#0f0f0f] relative overflow-hidden">
        {/* One big shape, bleeding off the bottom-left corner behind the grid */}
        <img
          src="/__mockup/chrome/spill-sheet/whyus.png"
          alt=""
          className="absolute z-0 pointer-events-none select-none hidden lg:block"
          style={{
            width: 'min(560px, 42vw)',
            height: 'auto',
            bottom: '-8%',
            left: '-6%',
            mixBlendMode: 'screen',
            opacity: 0.75,
          }}
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
      <section id="cta" className="py-32 bg-[#080808] relative overflow-hidden">
        {/* One big shape, bleeding off the top-right corner behind the card */}
        <img
          src="/__mockup/chrome/spill-sheet/cta.png"
          alt=""
          className="absolute z-0 pointer-events-none select-none hidden md:block"
          style={{
            width: 'min(560px, 48vw)',
            height: 'auto',
            top: '4%',
            right: '4%',
            mixBlendMode: 'screen',
            opacity: 0.8,
          }}
        />

        <div className="container mx-auto px-6 flex items-center justify-center relative z-10">
          <div className="relative flex flex-col items-center justify-center py-20">
            <div className="relative z-20 text-center bg-black/48 backdrop-blur-2xl px-10 py-12 border border-white/12 rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(120,180,255,0.1)] max-w-[320px] w-full">
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
      <section id="testimonials" className="py-24 bg-[#080808] relative overflow-hidden">
        {/* One big shape, bleeding off the left edge behind the card */}
        <img
          src="/__mockup/chrome/spill-sheet/testimonials.png"
          alt=""
          className="absolute z-0 pointer-events-none select-none hidden lg:block"
          style={{
            width: 'min(540px, 42vw)',
            height: 'auto',
            top: '50%',
            left: '-4%',
            transform: 'translateY(-50%)',
            mixBlendMode: 'screen',
            opacity: 0.75,
          }}
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
