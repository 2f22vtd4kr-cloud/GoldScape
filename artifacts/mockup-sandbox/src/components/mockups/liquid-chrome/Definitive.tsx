import "./liquid-chrome.css";

export function Definitive() {
  return (
    <div className="min-h-screen bg-[#07090c] flex flex-col justify-center px-16 py-16 gap-14 relative overflow-hidden">

      {/* SVG filter — mercury warp for stat numbers only */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="def-warp" x="-4%" y="-8%" width="108%" height="116%">
            <feTurbulence type="turbulence" baseFrequency="0.016 0.022" numOctaves="3" seed="7" result="t">
              <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.026;0.016 0.022" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="t" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Ambient depth — very subtle */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(100,80,160,0.055) 0%, transparent 70%)"
      }} />

      {/* Label */}
      <div className="text-[11px] tracking-[0.3em] text-[#3a3a4a] uppercase font-['Space_Grotesk'] relative z-10">
        Definitive Set — Liquid Chrome v2
      </div>

      {/* HERO H1 — Hard specular chrome with iridescent animated shift */}
      <div className="relative z-10">
        <h1 className="font-['Oxanium'] text-[88px] leading-[0.98] font-light tracking-[-2px]" style={{ maxWidth: 860 }}>
          <span className="def-chrome-hero">Ваш капитал<br />заслуживает<br /></span>
          <span className="def-chrome-accent font-bold">свободы</span>
        </h1>
      </div>

      {/* Brand mark — platinum chrome + muted secondary */}
      <div className="relative z-10 flex items-center gap-8">
        <span className="font-['Oxanium'] text-[52px] font-bold tracking-[0.05em] def-chrome-hero uppercase">
          EstateofMind
        </span>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(180,160,220,0.25) 50%, transparent)" }} />
        <span className="font-['Space_Grotesk'] text-[13px] def-chrome-secondary tracking-[0.2em] uppercase leading-relaxed">
          Международная<br/>недвижимость
        </span>
      </div>

      {/* Section H2 — blue-steel secondary chrome */}
      <div className="relative z-10 flex flex-col gap-4">
        <h2 className="font-['Oxanium'] text-[44px] font-bold def-chrome-secondary uppercase tracking-[0.03em]">
          Как мы работаем
        </h2>
        <h3 className="font-['Oxanium'] text-[24px] def-chrome-tertiary uppercase tracking-[0.07em]">
          ОАЭ · Турция · Кипр · Грузия · Таиланд
        </h3>
      </div>

      {/* Stats — mercury warp + platinum gold warmth */}
      <div className="relative z-10 flex gap-16 items-end">
        {[
          { n: "847", label: "сделок" },
          { n: "₀%", label: "комиссии" },
          { n: "12", label: "стран" },
        ].map(({ n, label }) => (
          <div key={label}>
            <div
              className="font-['Oxanium'] text-[68px] font-bold def-chrome-stat leading-none"
              style={{ filter: "url(#def-warp)" }}
            >
              {n}
            </div>
            <div className="font-['Space_Grotesk'] text-[11px] tracking-[0.25em] text-[#404050] uppercase mt-2">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Body copy — no chrome, pure legibility */}
      <p className="relative z-10 font-['Space_Grotesk'] text-[16px] text-[#6a6a7c] leading-[1.75] max-w-[540px]">
        Инвестиции в зарубежную недвижимость с полным юридическим сопровождением
        и оформлением вида на жительство. Работаем прозрачно — без скрытых комиссий.
      </p>

      {/* Bottom iridescent rule */}
      <div className="relative z-10 h-px" style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(140,100,220,0.25) 25%, rgba(80,180,240,0.25) 55%, rgba(220,100,180,0.15) 80%, transparent 100%)"
      }} />
    </div>
  );
}
