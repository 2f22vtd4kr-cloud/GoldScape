import './_group.css';
import './liquid-spill.css';

export default function QAWhyUs() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }} className="font-space-grotesk">
      <section id="why-us" className="py-24 bg-[#0f0f0f] relative overflow-hidden">
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
    </div>
  );
}
