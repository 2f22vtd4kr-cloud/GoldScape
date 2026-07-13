import "./liquid-chrome.css";

export function MirrorGlass() {
  return (
    <div className="min-h-screen bg-[#07090c] flex flex-col justify-center px-16 py-20 gap-14 relative">

      {/* Ambient iridescent glow — far background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 900,
          height: 600,
          background: "radial-gradient(ellipse, rgba(120,80,200,0.07) 0%, rgba(60,160,200,0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Label */}
      <div className="text-[11px] tracking-[0.3em] text-[#444] uppercase font-['Space_Grotesk'] relative z-10">
        Mirror Glass — Iridescent Shift
      </div>

      {/* Hero phrase — large iridescent chrome */}
      <div className="relative z-10">
        <h1 className="font-['Oxanium'] text-[84px] leading-[1.0] font-light tracking-[-2px] glass-text" style={{ maxWidth: 800 }}>
          Ваш капитал<br />
          заслуживает<br />
          <span className="glass-text-accent font-bold">свободы</span>
        </h1>
      </div>

      {/* Brand mark */}
      <div className="relative z-10 flex items-center gap-8">
        <span className="font-['Oxanium'] text-[52px] font-bold tracking-[0.06em] glass-text uppercase">
          EstateofMind
        </span>
        <div className="glass-divider w-px h-12" />
        <span className="font-['Space_Grotesk'] text-[13px] glass-text-subtle tracking-[0.2em] uppercase">
          Международная<br />недвижимость
        </span>
      </div>

      {/* Section headings */}
      <div className="relative z-10 flex flex-col gap-5">
        <h2 className="font-['Oxanium'] text-[42px] font-bold glass-text uppercase tracking-[0.04em]">
          Как мы работаем
        </h2>
        <h3 className="font-['Oxanium'] text-[26px] glass-text-mid uppercase tracking-[0.06em]">
          ОАЭ · Турция · Кипр · Грузия · Таиланд
        </h3>
      </div>

      {/* Stats */}
      <div className="relative z-10 flex gap-14 items-end">
        {[
          { num: "847", label: "сделок" },
          { num: "₀%", label: "комиссии" },
          { num: "12", label: "стран" },
        ].map((s) => (
          <div key={s.label}>
            <div className="font-['Oxanium'] text-[68px] font-bold glass-text leading-none">{s.num}</div>
            <div className="font-['Space_Grotesk'] text-[11px] tracking-[0.25em] text-[#4a4a5a] uppercase mt-2">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Body copy */}
      <p className="relative z-10 font-['Space_Grotesk'] text-[16px] text-[#6a6a7a] leading-[1.7] max-w-[540px]">
        Инвестиции в зарубежную недвижимость с полным юридическим сопровождением
        и оформлением вида на жительство. Работаем прозрачно — без скрытых комиссий.
      </p>

      {/* Bottom iridescent rule */}
      <div className="relative z-10 h-[1px] w-full" style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(160,120,255,0.3) 20%, rgba(80,200,255,0.3) 50%, rgba(255,100,200,0.2) 80%, transparent 100%)"
      }} />
    </div>
  );
}
