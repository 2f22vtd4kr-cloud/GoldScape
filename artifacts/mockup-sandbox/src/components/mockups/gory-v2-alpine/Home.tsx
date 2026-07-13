import React from 'react';
import './_group.css';
import Nav from './_shared/Nav';
import Footer from './_shared/Footer';

export function Home() {
  return (
    <div className="gory-v2-alpine flex flex-col">
      <Nav />
      
      <main className="flex-grow">
        {/* Header Hero Section */}
        <section className="px-6 md:px-12 pt-16 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-12">
            <div className="md:col-span-5 data-panel">
              <p className="text-sm-mono text-[var(--text-secondary)] mb-2">Location Identifier</p>
              <h1 className="font-serif text-3xl md:text-4xl text-[var(--text-primary)] leading-tight">
                N 42°39' / E 44°27'<br />
                Kazbegi, Greater Caucasus
              </h1>
            </div>
            <div className="md:col-span-7 md:text-right flex flex-col items-start md:items-end mt-8 md:mt-0">
              <p className="text-sm-mono text-[var(--text-secondary)] max-w-sm text-left md:text-right leading-relaxed border-l md:border-l-0 md:border-r border-[var(--border-color)] pl-4 md:pl-0 md:pr-4 py-2">
                An architectural approach to high-altitude luxury. 
                Defining the new standard for alpine exclusivity in Eurasia.
              </p>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto img-container aspect-[16/9] md:aspect-[21/9]">
            <img src="/__mockup/images/hero.jpg" alt="GORY Mountain Resort Landscape" />
          </div>
        </section>

        {/* Vision & Info Grid */}
        <section className="px-6 md:px-12 py-16 border-t border-[var(--border-color)]" id="vision">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            
            <div className="max-w-xl">
              <p className="text-sm-mono text-[var(--text-secondary)] mb-8">01 — Vision</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
                Where the Caucasus meets the future.
              </h2>
              <div className="space-y-6 text-lg font-light text-[var(--text-secondary)] leading-relaxed">
                <p>
                  GORY is conceived not merely as a resort, but as an architectural response to the imposing scale of the Greater Caucasus. Every structure is designed to observe the mountain, rather than conquer it.
                </p>
                <p>
                  Opening in Q4 2027, the property will offer an unprecedented combination of world-class terrain, minimalist design, and discreet luxury at an altitude of 3,042 meters.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
              <div className="bg-[var(--bg-color)] p-8 flex flex-col justify-between aspect-square">
                <span className="text-sm-mono text-[var(--text-secondary)]">Altitude</span>
                <span className="font-serif text-5xl md:text-6xl text-[var(--text-primary)]">3042<span className="text-2xl ml-1 text-[var(--text-secondary)]">m</span></span>
              </div>
              <div className="bg-[var(--bg-color)] p-8 flex flex-col justify-between aspect-square">
                <span className="text-sm-mono text-[var(--text-secondary)]">Terrain</span>
                <span className="font-serif text-5xl md:text-6xl text-[var(--text-primary)]">47<span className="font-sans text-sm uppercase tracking-widest block mt-2 text-[var(--text-secondary)]">Ski Runs</span></span>
              </div>
              <div className="bg-[var(--bg-color)] p-8 flex flex-col justify-between aspect-square">
                <span className="text-sm-mono text-[var(--text-secondary)]">Snowfall</span>
                <span className="font-serif text-5xl md:text-6xl text-[var(--text-primary)]">320<span className="text-2xl ml-1 text-[var(--text-secondary)]">cm</span></span>
              </div>
              <div className="bg-[var(--bg-color)] p-8 flex flex-col justify-between aspect-square">
                <span className="text-sm-mono text-[var(--text-secondary)]">Status</span>
                <span className="font-serif text-3xl md:text-4xl text-[var(--text-primary)] leading-tight">Opening<br />Q4 2027</span>
              </div>
            </div>
            
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="px-6 md:px-12 py-16 border-t border-[var(--border-color)]">
          <p className="text-sm-mono text-[var(--text-secondary)] mb-12">02 — The Landscape</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="img-container aspect-[3/4]">
              <img src="/__mockup/images/gallery-1.jpg" alt="Alpine texture 1" />
            </div>
            <div className="img-container aspect-[3/4] md:mt-12">
              <img src="/__mockup/images/gallery-2.jpg" alt="Alpine texture 2" />
            </div>
            <div className="img-container aspect-[3/4] md:mt-24">
              <img src="/__mockup/images/gallery-3.jpg" alt="Alpine texture 3" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}