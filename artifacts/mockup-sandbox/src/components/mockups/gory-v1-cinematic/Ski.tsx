import React, { useEffect, useState } from 'react';
import './_group.css';
import Nav from './_shared/Nav';
import Footer from './_shared/Footer';

export function Ski() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="gory-mockup">
      <Nav />
      
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
          <div>
            <div className="gory-font-mono text-[var(--gory-accent)] tracking-widest mb-4">01 — THE MOUNTAIN</div>
            <h1 className="gory-font-serif text-5xl md:text-8xl tracking-widest uppercase">Ski World</h1>
          </div>
          <p className="text-[var(--gory-text-muted)] max-w-md font-light leading-relaxed">
            Where unyielding peaks meet meticulous grooming. GORY offers a world-class skiing experience, rivaling the finest resorts of the Alps, set against the raw, cinematic backdrop of the Caucasus.
          </p>
        </div>

        <div className={`w-full aspect-video overflow-hidden ${mounted ? 'animate-letterbox' : 'opacity-0'}`}>
          <img src="/__mockup/images/ski.jpg" alt="Ski runs" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="py-20 bg-[var(--gory-surface)] gory-border-y">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[var(--gory-border)] text-center">
          <div>
            <div className="gory-font-serif text-4xl md:text-5xl text-[var(--gory-accent)] mb-2">3042m</div>
            <div className="gory-font-mono text-xs text-[var(--gory-text-muted)] tracking-widest uppercase">Peak Elevation</div>
          </div>
          <div>
            <div className="gory-font-serif text-4xl md:text-5xl text-[var(--gory-accent)] mb-2">47</div>
            <div className="gory-font-mono text-xs text-[var(--gory-text-muted)] tracking-widest uppercase">Pristine Runs</div>
          </div>
          <div>
            <div className="gory-font-serif text-4xl md:text-5xl text-[var(--gory-accent)] mb-2">320cm</div>
            <div className="gory-font-mono text-xs text-[var(--gory-text-muted)] tracking-widest uppercase">Annual Snowfall</div>
          </div>
          <div>
            <div className="gory-font-serif text-4xl md:text-5xl text-[var(--gory-accent)] mb-2">12</div>
            <div className="gory-font-mono text-xs text-[var(--gory-text-muted)] tracking-widest uppercase">Heated Lifts</div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="gory-font-serif text-3xl tracking-widest uppercase mb-12">Terrain<br/>Categories</h2>
            
            <div className="space-y-8 gory-border-t pt-8">
              <div className="flex items-start gap-6 group">
                <span className="gory-font-mono text-[var(--gory-accent)] text-lg">I</span>
                <div>
                  <h3 className="text-xl uppercase tracking-wider mb-2 group-hover:text-[var(--gory-accent)] transition-colors">The Summits (Expert)</h3>
                  <p className="text-[var(--gory-text-muted)] font-light text-sm leading-relaxed">
                    Unforgiving steeps and dramatic couloirs. 14 runs designed for the true alpine aficionado, offering heart-pounding vertical drops and untouched powder stashes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 group gory-border-t pt-8">
                <span className="gory-font-mono text-[var(--gory-accent)] text-lg">II</span>
                <div>
                  <h3 className="text-xl uppercase tracking-wider mb-2 group-hover:text-[var(--gory-accent)] transition-colors">The Plateaus (Intermediate)</h3>
                  <p className="text-[var(--gory-text-muted)] font-light text-sm leading-relaxed">
                    Wide, meticulously groomed corduroy arteries flowing gracefully down the mountain flanks. 21 red runs balancing speed and panoramic rhythm.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 group gory-border-t pt-8">
                <span className="gory-font-mono text-[var(--gory-accent)] text-lg">III</span>
                <div>
                  <h3 className="text-xl uppercase tracking-wider mb-2 group-hover:text-[var(--gory-accent)] transition-colors">The Valleys (Beginner)</h3>
                  <p className="text-[var(--gory-text-muted)] font-light text-sm leading-relaxed">
                    Gentle slopes nestled near the base lodge. 12 blue runs where technique is honed under the guidance of our world-class Snow School instructors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img src="/__mockup/images/experiences.jpg" alt="Heli Skiing" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="p-8 bg-[var(--gory-surface)] gory-border-l border-[var(--gory-accent)]">
              <h3 className="gory-font-serif text-2xl uppercase tracking-wide mb-3">Heli-Skiing Expeditions</h3>
              <p className="text-[var(--gory-text-muted)] font-light text-sm leading-relaxed mb-6">
                Chart the uncharted. Private AgustaWestland helicopters transport guests to untouched peaks for guided backcountry descents. A pursuit reserved for the audacious.
              </p>
              <a href="#" className="gory-font-mono text-xs uppercase tracking-widest text-[var(--gory-accent)] hover:text-white transition-colors flex items-center gap-2">
                Inquire Experience <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Ski;
