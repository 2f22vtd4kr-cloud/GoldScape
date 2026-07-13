import React, { useEffect, useState } from 'react';
import Nav from './_shared/Nav';
import Footer from './_shared/Footer';
import './_group.css';

export function Gallery() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="gory-mockup">
      <Nav />
      
      {/* 1. Gallery header */}
      <section className="pt-40 pb-20 px-6 text-center mt-12 md:mt-0">
        <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-6 opacity-0 animate-fade-up">05 / GALLERY</div>
        <h1 className="gory-font-serif text-4xl md:text-6xl uppercase tracking-widest mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>The Terrain — Unedited.</h1>
        <p className="gory-font-mono text-[var(--gory-text-muted)] text-[10px] md:text-xs tracking-widest uppercase max-w-2xl mx-auto leading-loose opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          All photography: Greater Caucasus, Kazbegi district. Altitude 2,800m–3,042m.<br/>Pre-development season 2024–2026.
        </p>
      </section>

      {/* 2. Masonry-style editorial grid */}
      <section className="px-4 md:px-6 pb-24 md:pb-32 max-w-[1400px] mx-auto space-y-4 md:space-y-6">
        {/* Row 1: aerial panorama */}
        <div className="group relative w-full aspect-video md:aspect-[21/9] overflow-hidden opacity-0 animate-fade-up bg-[var(--gory-surface)]" style={{ animationDelay: '0.6s' }}>
          <img src="/__mockup/images/gallery-noir-1.jpg" alt="Aerial Panorama" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
            <p className="gory-font-mono text-[var(--gory-accent)] text-xs md:text-sm tracking-widest uppercase bg-black/80 px-6 py-4 border border-[var(--gory-accent)]/30 text-center">
              Looking South — 3,042m Summit Ridge
            </p>
          </div>
        </div>

        {/* Row 2: two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <div className="group relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/gallery-noir-4.jpg" alt="Alpenglow" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] md:text-xs tracking-widest uppercase">Alpenglow / 2,900m</p>
            </div>
          </div>
          <div className="group relative w-full aspect-[4/5] md:aspect-auto md:h-full overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/gallery-noir-2.jpg" alt="Skier" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] md:text-xs tracking-widest uppercase">Groomed Run / Test Season</p>
            </div>
          </div>
        </div>

        {/* Row 3: three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <div className="group relative w-full aspect-square overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/gallery-noir-5.jpg" alt="Powder" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] tracking-widest uppercase">Deep Powder Descent</p>
            </div>
          </div>
          <div className="group relative w-full aspect-square overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/gallery-noir-7.jpg" alt="Helicopter View" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] tracking-widest uppercase">Helicopter View / Geometric Shadows</p>
            </div>
          </div>
          <div className="group relative w-full aspect-square overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/gallery-noir-3.jpg" alt="Ridgelines" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] tracking-widest uppercase">Layered Ridgelines</p>
            </div>
          </div>
        </div>

        {/* Row 4: full width storm */}
        <div className="group relative w-full aspect-video md:aspect-[21/9] overflow-hidden opacity-0 animate-fade-up bg-[var(--gory-surface)]" style={{ animationDelay: '0.9s' }}>
          <img src="/__mockup/images/gallery-noir-8.jpg" alt="Storm Approaching" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
            <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] md:text-xs tracking-widest uppercase bg-black/80 px-6 py-4 border border-[var(--gory-accent)]/30 text-center">
              Winter Storm Season — 320cm Average Annual Snowfall
            </p>
          </div>
        </div>

        {/* Row 5: two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 opacity-0 animate-fade-up" style={{ animationDelay: '1.0s' }}>
          <div className="group relative w-full aspect-[4/3] overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/gallery-noir-6.jpg" alt="Luxury Lodge" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] md:text-xs tracking-widest uppercase">Luxury Lodge Exterior / Rendering</p>
            </div>
          </div>
          <div className="group relative w-full aspect-[4/3] overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/ski.jpg" alt="Slopes" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] md:text-xs tracking-widest uppercase">The Slopes / Groomed</p>
            </div>
          </div>
        </div>

        {/* Row 6: three columns from existing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 opacity-0 animate-fade-up" style={{ animationDelay: '1.1s' }}>
          <div className="group relative w-full aspect-square overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/gallery-1.jpg" alt="Gallery 1" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] tracking-widest uppercase">Summit Access / 2024</p>
            </div>
          </div>
          <div className="group relative w-full aspect-square overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/gallery-2.jpg" alt="Gallery 2" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] tracking-widest uppercase">Terrain Survey</p>
            </div>
          </div>
          <div className="group relative w-full aspect-square overflow-hidden bg-[var(--gory-surface)]">
            <img src="/__mockup/images/gallery-3.jpg" alt="Gallery 3" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] sepia-[.15] brightness-75 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <p className="gory-font-mono text-[var(--gory-accent)] text-[10px] tracking-widest uppercase">Base Camp Aerial</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Film strip section */}
      <section className="bg-[var(--gory-surface)] border-y border-[var(--gory-border)] py-16 md:py-24 overflow-hidden">
        <div className="px-6 mb-10 md:mb-16">
          <h2 className="gory-font-mono text-[var(--gory-accent)] tracking-widest uppercase text-xs">Terrain Archive — 2024–2026</h2>
        </div>
        
        <div className="flex gap-4 px-6 overflow-x-auto pb-8 snap-x" style={{ scrollbarWidth: 'none' }}>
          {[
            { src: '/__mockup/images/gallery-4.jpg', tag: 'BASE CAMP / 2,800M' },
            { src: '/__mockup/images/gallery-5.jpg', tag: 'SURVEY / Q1 2025' },
            { src: '/__mockup/images/experiences.jpg', tag: 'ALPINE DINING / RENDER' },
            { src: '/__mockup/images/stay.jpg', tag: 'SUITE INTERIOR / RENDER' },
            { src: '/__mockup/images/gallery-noir-7.jpg', tag: 'AERIAL RECON / 2024' }
          ].map((item, idx) => (
            <div key={idx} className="shrink-0 w-[85vw] md:w-[400px] snap-center">
              <div className="w-full aspect-[3/2] overflow-hidden mb-4 bg-black">
                <img src={item.src} alt={`Archive ${idx}`} className="w-full h-full object-cover sepia-[.2] brightness-75 hover:sepia-0 hover:brightness-100 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
              </div>
              <p className="gory-font-mono text-[var(--gory-text-muted)] text-[10px] tracking-widest uppercase border-l border-[var(--gory-accent)] pl-3">
                {item.tag}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Build timeline visual */}
      <section className="py-24 md:py-32 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-20 md:mb-24">
          <h2 className="gory-font-serif text-3xl md:text-4xl uppercase tracking-widest">Behind the Build</h2>
          <div className="w-12 h-[1px] bg-[var(--gory-accent)] mx-auto mt-8" />
        </div>

        <div className="space-y-12 md:space-y-16">
          {[
            { date: 'Q3 2024', desc: 'Initial terrain mapping and geological surveys completed for gondola foundations.' },
            { date: 'Q1 2025', desc: 'Breaking ground on Phase I base camp and access infrastructure.' },
            { date: 'Q4 2025', desc: 'First concrete poured for the primary vertical lodge structure.' },
            { date: 'Q2 2026', desc: 'Lift towers installed via heavy-lift helicopters across the upper ridge.' },
            { date: 'Q1 2027', desc: 'Interior fit-out begins for all fifty exclusive residences.' },
            { date: 'Q4 2027', desc: 'Grand Opening and inaugural descent.' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-16 items-start group">
              <div className="gory-font-mono text-4xl md:text-6xl font-bold text-white/5 select-none leading-none w-16 md:w-24 shrink-0 transition-colors group-hover:text-white/10">
                {(idx + 1).toString().padStart(2, '0')}
              </div>
              <div className="pt-2 md:pt-4 border-t border-[var(--gory-border)] flex-1 w-full group-hover:border-[var(--gory-accent)] transition-colors">
                <div className="gory-font-mono text-[var(--gory-accent)] text-[10px] md:text-xs tracking-widest mb-3">{item.date}</div>
                <div className="gory-font-serif text-lg md:text-xl text-[var(--gory-text-muted)] group-hover:text-white transition-colors">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Gallery;