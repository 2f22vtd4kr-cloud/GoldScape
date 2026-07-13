import React, { useEffect, useState } from 'react';
import './_group.css';
import Nav from './_shared/Nav';
import Footer from './_shared/Footer';

export function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="gory-mockup">
      <Nav />
      
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src="/__mockup/images/hero.jpg" 
            alt="GORY Mountain" 
            className={`w-full h-full object-cover opacity-60 ${mounted ? 'animate-letterbox' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/50" />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 className="gory-font-serif text-7xl md:text-[10rem] tracking-[0.2em] uppercase mb-4 ml-[0.2em] opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            Gory
          </h1>
          <p className="gory-font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-[var(--gory-accent)] opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            The Caucasus Reimagined • 3042m
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '1.2s' }}>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--gory-accent)] to-transparent" />
        </div>
      </section>

      {/* Vision */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-center">
        <div className="gory-font-mono text-sm tracking-widest text-[var(--gory-text-muted)] mb-12 flex justify-center items-center gap-6">
          <span className="w-12 h-[1px] bg-[var(--gory-border)]" />
          <span>OPENING Q4 2027</span>
          <span className="w-12 h-[1px] bg-[var(--gory-border)]" />
        </div>
        
        <h2 className="gory-font-serif text-3xl md:text-5xl leading-tight mb-12 max-w-4xl mx-auto">
          Where ancient peaks meet <span className="italic text-[var(--gory-accent)]">uncompromising luxury</span>. A new benchmark for alpine exclusivity in Kazbegi.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left gory-border-t pt-12 mt-12">
          <div>
            <div className="gory-font-mono text-[var(--gory-accent)] text-lg mb-4">01</div>
            <h3 className="gory-font-serif text-xl tracking-wide uppercase mb-3">Altitude</h3>
            <p className="text-[var(--gory-text-muted)] font-light leading-relaxed">
              Ascend to 3,042 meters. Breathe the rarefied air of the Greater Caucasus. Our private helipads offer seamless arrival from Tbilisi in under 30 minutes.
            </p>
          </div>
          <div>
            <div className="gory-font-mono text-[var(--gory-accent)] text-lg mb-4">02</div>
            <h3 className="gory-font-serif text-xl tracking-wide uppercase mb-3">Terrain</h3>
            <p className="text-[var(--gory-text-muted)] font-light leading-relaxed">
              Over 47 meticulously maintained runs spanning 120km, served by state-of-the-art gondolas with heated seating and panoramic glass.
            </p>
          </div>
          <div>
            <div className="gory-font-mono text-[var(--gory-accent)] text-lg mb-4">03</div>
            <h3 className="gory-font-serif text-xl tracking-wide uppercase mb-3">Sanctuary</h3>
            <p className="text-[var(--gory-text-muted)] font-light leading-relaxed">
              Fifty exclusive residences and a sixty-suite lodge designed to blend seamlessly into the dramatic alpine landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Teaser Row */}
      <section className="py-24">
        <div className="gory-border-y w-full">
          {/* Row 1 */}
          <a href="/__mockup/preview/gory-v1-cinematic/Ski" className="group block gory-border-b hover:bg-[var(--gory-surface)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-12 w-full md:w-auto">
                <span className="gory-font-mono text-[var(--gory-text-muted)] text-xl">01</span>
                <h2 className="gory-font-serif text-4xl md:text-6xl tracking-wider uppercase group-hover:text-[var(--gory-accent)] transition-colors duration-500">The Ski World</h2>
              </div>
              <div className="w-full md:w-1/3 aspect-[21/9] overflow-hidden">
                <img src="/__mockup/images/ski.jpg" alt="Ski" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
              </div>
            </div>
          </a>
          
          {/* Row 2 */}
          <a href="/__mockup/preview/gory-v1-cinematic/Stay" className="group block gory-border-b hover:bg-[var(--gory-surface)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-12 w-full md:w-auto">
                <span className="gory-font-mono text-[var(--gory-text-muted)] text-xl">02</span>
                <h2 className="gory-font-serif text-4xl md:text-6xl tracking-wider uppercase group-hover:text-[var(--gory-accent)] transition-colors duration-500">Stay & Invest</h2>
              </div>
              <div className="w-full md:w-1/3 aspect-[21/9] overflow-hidden">
                <img src="/__mockup/images/stay.jpg" alt="Stay" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
              </div>
            </div>
          </a>

          {/* Row 3 */}
          <a href="#" className="group block hover:bg-[var(--gory-surface)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-12 w-full md:w-auto">
                <span className="gory-font-mono text-[var(--gory-text-muted)] text-xl">03</span>
                <h2 className="gory-font-serif text-4xl md:text-6xl tracking-wider uppercase group-hover:text-[var(--gory-accent)] transition-colors duration-500">Experiences</h2>
              </div>
              <div className="w-full md:w-1/3 aspect-[21/9] overflow-hidden">
                <img src="/__mockup/images/experiences.jpg" alt="Experiences" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
              </div>
            </div>
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Home;
