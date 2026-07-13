import "./liquid-chrome.css";

export function LiquidMercury() {
  return (
    <div className="min-h-screen bg-[#080a0d] flex flex-col justify-center px-16 py-20 gap-16 overflow-hidden relative">

      {/* SVG filter definitions */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="liquid-warp" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.018 0.025"
              numOctaves="3"
              seed="5"
              result="turb"
            >
              <animate
                attributeName="baseFrequency"
                values="0.018 0.025; 0.022 0.03; 0.018 0.025"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="9"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feComposite in="displaced" in2="SourceGraphic" operator="atop" />
          </filter>

          <filter id="liquid-warp-subtle" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.012 0.018"
              numOctaves="2"
              seed="12"
              result="turb2"
            >
              <animate
                attributeName="baseFrequency"
                values="0.012 0.018; 0.016 0.022; 0.012 0.018"
                dur="12s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb2"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feComposite in="displaced" in2="SourceGraphic" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Label */}
      <div className="text-[11px] tracking-[0.3em] text-[#444] uppercase font-['Space_Grotesk']">
        Liquid Mercury — SVG Distortion
      </div>

      {/* Hero — heavy distortion */}
      <div style={{ filter: "url(#liquid-warp)" }}>
        <h1 className="font-['Oxanium'] text-[88px] leading-[1.0] font-light tracking-[-2px] mercury-text">
          Ваш капитал<br />
          заслуживает<br />
          <strong className="font-black">свободы</strong>
        </h1>
      </div>

      {/* Brand — subtle distortion */}
      <div style={{ filter: "url(#liquid-warp-subtle)" }}>
        <div className="flex items-baseline gap-10">
          <span className="font-['Oxanium'] text-[52px] font-bold tracking-[0.04em] mercury-text uppercase">
            EstateofMind
          </span>
        </div>
      </div>

      {/* Section heading */}
      <div style={{ filter: "url(#liquid-warp-subtle)" }}>
        <h2 className="font-['Oxanium'] text-[40px] font-bold mercury-text uppercase tracking-wide">
          Как мы работаем
        </h2>
      </div>

      {/* Stats — high contrast liquid */}
      <div className="flex gap-16 items-end">
        {["847", "₀%", "12"].map((n, i) => (
          <div key={i} style={{ filter: "url(#liquid-warp)" }}>
            <div className="font-['Oxanium'] text-[68px] font-black mercury-text leading-none">
              {n}
            </div>
            <div className="font-['Space_Grotesk'] text-[11px] tracking-[0.25em] text-[#444] uppercase mt-2">
              {["сделок", "комиссии", "стран"][i]}
            </div>
          </div>
        ))}
      </div>

      {/* Body copy */}
      <p className="font-['Space_Grotesk'] text-[16px] text-[#777] leading-[1.7] max-w-[540px]">
        Инвестиции в зарубежную недвижимость с полным юридическим сопровождением
        и оформлением вида на жительство.
      </p>
    </div>
  );
}
