import './_group.css';
import './liquid-spill.css';

export default function QACta() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }} className="font-space-grotesk">
      <section id="cta" className="py-32 bg-[#080808] relative overflow-hidden">
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
    </div>
  );
}
