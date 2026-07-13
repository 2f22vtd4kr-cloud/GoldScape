import "./liquid-chrome.css";

export function ChromeClassic() {
  return (
    <div className="min-h-screen bg-[#090b0e] flex flex-col justify-center px-16 py-20 gap-16">
      {/* Label */}
      <div className="text-[11px] tracking-[0.3em] text-[#555] uppercase font-['Space_Grotesk']">
        Chrome Classic — Polished Metal
      </div>

      {/* Hero phrase */}
      <div>
        <h1
          className="font-['Oxanium'] text-[80px] leading-[1.0] font-light tracking-[-1px] chrome-classic-text"
          style={{ maxWidth: 820 }}
        >
          Ваш капитал<br />
          заслуживает<br />
          <em className="not-italic font-bold">свободы</em>
        </h1>
      </div>

      {/* Brand name at scale */}
      <div className="flex items-baseline gap-12">
        <span className="font-['Oxanium'] text-[56px] font-bold tracking-[0.04em] chrome-classic-text uppercase">
          EstateofMind
        </span>
        <span className="font-['Space_Grotesk'] text-[18px] chrome-classic-subtle tracking-[0.18em] uppercase">
          Международная недвижимость
        </span>
      </div>

      {/* Section headings */}
      <div className="flex flex-col gap-6">
        <h2 className="font-['Oxanium'] text-[44px] font-bold chrome-classic-text uppercase tracking-wide">
          Как мы работаем
        </h2>
        <h3 className="font-['Oxanium'] text-[28px] font-bold chrome-classic-text uppercase tracking-wide">
          ОАЭ · Турция · Кипр · Грузия · Таиланд
        </h3>
      </div>

      {/* Price / stat display */}
      <div className="flex gap-16 items-end">
        <div>
          <div className="font-['Oxanium'] text-[72px] font-bold chrome-classic-text leading-none">847</div>
          <div className="font-['Space_Grotesk'] text-[12px] tracking-[0.25em] text-[#555] uppercase mt-2">сделок</div>
        </div>
        <div>
          <div className="font-['Oxanium'] text-[72px] font-bold chrome-classic-text leading-none">₀%</div>
          <div className="font-['Space_Grotesk'] text-[12px] tracking-[0.25em] text-[#555] uppercase mt-2">комиссии</div>
        </div>
        <div>
          <div className="font-['Oxanium'] text-[72px] font-bold chrome-classic-text leading-none">12</div>
          <div className="font-['Space_Grotesk'] text-[12px] tracking-[0.25em] text-[#555] uppercase mt-2">стран</div>
        </div>
      </div>

      {/* Body copy in context */}
      <p className="font-['Space_Grotesk'] text-[16px] text-[#8a8a8a] leading-[1.7] max-w-[560px]">
        Инвестиции в зарубежную недвижимость с полным юридическим сопровождением
        и оформлением вида на жительство. Работаем прозрачно — без скрытых комиссий.
      </p>
    </div>
  );
}
