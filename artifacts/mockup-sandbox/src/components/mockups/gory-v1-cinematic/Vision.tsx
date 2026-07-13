import React, { useEffect, useState } from 'react';
import Nav from './_shared/Nav';
import Footer from './_shared/Footer';
import './_group.css';

export function Vision() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="gory-mockup">
      <Nav />
      
      {/* 1. Full-bleed opener */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src="/__mockup/images/gallery-noir-3.jpg" 
            alt="High altitude viewpoint" 
            className={`w-full h-full object-cover opacity-60 ${mounted ? 'animate-letterbox' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--gory-bg)] via-black/40 to-black/80" />
        </div>
        
        {/* Section counter */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <span className="gory-font-mono text-[20vw] font-bold text-white/5 select-none leading-none">01</span>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-6xl mx-auto mt-20 md:mt-0">
          <h1 className="gory-font-serif text-4xl md:text-6xl lg:text-[6rem] leading-[1.1] tracking-wide uppercase opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            Where the Caucasus<br />
            <span className="text-[var(--gory-accent)] italic font-light lowercase text-5xl md:text-7xl lg:text-[7rem]">meets the future</span>
          </h1>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '1.2s' }}>
          <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--gory-accent)] to-transparent" />
        </div>
      </section>

      {/* 2. The Concept */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          <div className="lg:col-span-8">
            <h2 className="gory-font-serif text-3xl md:text-4xl lg:text-5xl leading-snug tracking-wide text-[var(--gory-text)] opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              GORY is not another ski resort. It is an act of architecture against the sky — a precision instrument designed to place guests at 3,042 metres above the ordinary. On the southern face of the Greater Caucasus, where the mountains do not invite — they demand. Opening Q4 2027.
            </h2>
          </div>
          
          <div className="lg:col-span-3 lg:col-start-10 flex flex-col gap-8 gory-border-l pl-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-2">ELEVATION</div>
              <div className="gory-font-serif text-2xl">3,042m</div>
            </div>
            <div>
              <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-2">COORDINATES</div>
              <div className="gory-font-serif text-xl tracking-wider">N42°39' E44°27'</div>
            </div>
            <div>
              <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-2">LOCATION</div>
              <div className="gory-font-serif text-xl">Kazbegi, Georgia</div>
            </div>
            <div>
              <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-2">TERRAIN</div>
              <div className="gory-font-serif text-xl">47 Ski Runs</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Setting */}
      <section className="relative min-h-[80vh] w-full flex items-center">
        <div className="absolute inset-0 z-0 bg-black">
          <img src="/__mockup/images/gallery-noir-4.jpg" alt="Alpenglow on peaks" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="bg-[var(--gory-surface)]/80 backdrop-blur-md p-10 md:p-16 max-w-2xl border-l-2 border-[var(--gory-accent)]">
            <h3 className="gory-font-serif text-2xl md:text-3xl mb-8 uppercase tracking-widest leading-relaxed">The Greater Caucasus</h3>
            <p className="text-[var(--gory-text-muted)] leading-relaxed mb-6 font-light text-lg">
              One of the world's last great wilderness ranges. Older than the Alps. Taller than the Pyrenees. Untouched at the summit.
            </p>
            <p className="text-[var(--gory-text-muted)] leading-relaxed mb-6 font-light text-lg">
              A UNESCO World Heritage corridor. Adjacent to Gergeti Trinity Church, Georgia's most iconic monument.
            </p>
            <div className="mt-8 pt-8 gory-border-t">
              <span className="gory-font-mono text-xs text-[var(--gory-accent)] uppercase tracking-widest block mb-2">Access</span>
              <span className="gory-font-sans text-sm tracking-wide text-white/80">2.5 hours from Tbilisi Shota Rustaveli International Airport.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Year-round grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="gory-font-serif text-3xl md:text-4xl uppercase tracking-widest">A Year-Round Ascendancy</h2>
          <div className="w-12 h-[1px] bg-[var(--gory-accent)] mx-auto mt-8" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Winter */}
          <div className="bg-[var(--gory-surface)] p-8 border-t-[1px] border-[var(--gory-accent)] hover:-translate-y-2 transition-transform duration-500">
            <div className="gory-font-serif text-3xl mb-8 italic text-[var(--gory-accent)] lowercase">winter</div>
            <ul className="space-y-4 gory-font-sans text-[var(--gory-text-muted)] font-light text-sm">
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> 320cm annual snowfall</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> 47 Groomed pistes</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Heli-skiing operations</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Alpine touring</li>
            </ul>
          </div>
          
          {/* Spring */}
          <div className="bg-[var(--gory-surface)] p-8 border-t-[1px] border-[var(--gory-accent)] hover:-translate-y-2 transition-transform duration-500 md:delay-100">
            <div className="gory-font-serif text-3xl mb-8 italic text-[var(--gory-accent)] lowercase">spring</div>
            <ul className="space-y-4 gory-font-sans text-[var(--gory-text-muted)] font-light text-sm">
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Late-season glacier skiing</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> High-altitude wellness</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Culinary festivals</li>
            </ul>
          </div>
          
          {/* Summer */}
          <div className="bg-[var(--gory-surface)] p-8 border-t-[1px] border-[var(--gory-accent)] hover:-translate-y-2 transition-transform duration-500 lg:delay-200">
            <div className="gory-font-serif text-3xl mb-8 italic text-[var(--gory-accent)] lowercase">summer</div>
            <ul className="space-y-4 gory-font-sans text-[var(--gory-text-muted)] font-light text-sm">
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Downhill mountain biking</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Guided alpine summits</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Paragliding</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Equestrian trails</li>
            </ul>
          </div>
          
          {/* Autumn */}
          <div className="bg-[var(--gory-surface)] p-8 border-t-[1px] border-[var(--gory-accent)] hover:-translate-y-2 transition-transform duration-500 lg:delay-300">
            <div className="gory-font-serif text-3xl mb-8 italic text-[var(--gory-accent)] lowercase">autumn</div>
            <ul className="space-y-4 gory-font-sans text-[var(--gory-text-muted)] font-light text-sm">
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Vineyard harvest tours</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Wilderness retreats</li>
              <li className="flex items-center gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full"></span> Early summit snows</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Architecture & Concept panel */}
      <section className="bg-[var(--gory-surface)] py-32 px-6 text-center border-y border-[var(--gory-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="gory-font-mono text-xs tracking-widest text-[var(--gory-accent)] mb-8 uppercase">Architecture & Design</div>
          <h2 className="gory-font-serif text-2xl md:text-4xl leading-relaxed font-light mb-12">
            The development is conceived as a vertical village — organic clusters of accommodation cascading down the mountain's southern face, connected by a spine of gondola infrastructure.
          </h2>
          <p className="gory-font-mono text-sm tracking-[0.3em] uppercase text-white/50">Every unit faces the peak.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Vision;