import './_group.css';
import './liquid-spill.css';

export default function QATestimonials() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }} className="font-space-grotesk">
      <section id="testimonials" className="py-24 bg-[#080808] relative overflow-hidden">
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
