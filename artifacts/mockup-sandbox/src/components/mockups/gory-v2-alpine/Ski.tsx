import React from 'react';
import './_group.css';
import Nav from './_shared/Nav';
import Footer from './_shared/Footer';

export function Ski() {
  return (
    <div className="gory-v2-alpine flex flex-col">
      <Nav />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-6 md:px-12 pt-12 pb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between border-b border-[var(--border-color)] pb-8 mb-8">
            <h1 className="font-serif text-5xl md:text-7xl">Ski Terrain</h1>
            <p className="text-sm-mono text-[var(--text-secondary)] text-right w-full md:w-auto">
              Elevation: 3042m<br/>
              Vertical Drop: 1200m
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-7 img-container aspect-square md:aspect-[4/3]">
              <img src="/__mockup/images/ski.jpg" alt="GORY Ski Terrain" />
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="data-panel mb-8">
                <h3 className="font-serif text-2xl mb-4">The Discipline of Descent</h3>
                <p className="font-light text-[var(--text-secondary)] leading-relaxed mb-6">
                  Carved out of the monumental faces of the Caucasus, our 47 meticulously maintained runs offer an uncompromising alpine experience. The terrain is structured, rigorous, and designed for those who appreciate the pure mechanics of skiing.
                </p>
                <div className="flex justify-between border-t border-[var(--border-color)] pt-4 text-sm-mono">
                  <span>Piste Length</span>
                  <span>65 km Total</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-[var(--border-color)]">
                  <span className="font-serif text-xl">Black Diamond</span>
                  <span className="text-sm-mono text-[var(--text-secondary)]">12 Runs (25%)</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-[var(--border-color)]">
                  <span className="font-serif text-xl">Red</span>
                  <span className="text-sm-mono text-[var(--text-secondary)]">20 Runs (43%)</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-[var(--border-color)]">
                  <span className="font-serif text-xl">Blue</span>
                  <span className="text-sm-mono text-[var(--text-secondary)]">15 Runs (32%)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiences Grid */}
        <section className="px-6 md:px-12 py-16 bg-white border-t border-[var(--border-color)]">
          <div className="mb-12 flex justify-between items-end">
            <h2 className="font-serif text-4xl">Experiences</h2>
            <p className="text-sm-mono text-[var(--text-secondary)] hidden md:block">Curated Alpine Programs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
            {[
              { title: "Heli-Skiing", desc: "Access untouched powder on remote Caucasus peaks via private helicopter.", id: "01" },
              { title: "Snow School", desc: "Technical instruction by certified international alpine professionals.", id: "02" },
              { title: "Spa & Wellness", desc: "Thermal recovery treatments designed specifically for high-altitude endurance.", id: "03" },
              { title: "Dining", desc: "Minimalist culinary experiences focusing on regional Georgian provenance.", id: "04" }
            ].map((exp) => (
              <div key={exp.id} className="bg-[var(--bg-color)] p-8 flex flex-col justify-between h-80 group hover:bg-white transition-colors">
                <div className="flex justify-between items-start text-sm-mono text-[var(--text-secondary)] mb-8">
                  <span>{exp.id}</span>
                  <div className="w-4 h-px bg-[var(--border-color)] group-hover:bg-[var(--text-primary)] transition-colors mt-2"></div>
                </div>
                <div>
                  <h4 className="font-serif text-2xl mb-4">{exp.title}</h4>
                  <p className="font-light text-[var(--text-secondary)] text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Context & Location */}
        <section className="px-6 md:px-12 py-16 border-t border-[var(--border-color)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h3 className="font-serif text-3xl mb-6">Approach</h3>
              <p className="font-light text-[var(--text-secondary)] leading-relaxed mb-8">
                The journey to GORY is a transition from the urban grid to the alpine expanse. Precise coordination ensures seamless arrivals.
              </p>
            </div>
            <div className="md:col-span-8 data-panel flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="flex-1">
                <h5 className="text-sm-mono mb-4 text-[var(--text-secondary)]">From Tbilisi (TBS)</h5>
                <ul className="space-y-4">
                  <li className="flex justify-between border-b border-[var(--border-color)] pb-2 font-light">
                    <span>By Helicopter</span>
                    <span className="font-serif">45 min</span>
                  </li>
                  <li className="flex justify-between border-b border-[var(--border-color)] pb-2 font-light">
                    <span>By Private Transfer</span>
                    <span className="font-serif">2.5 hrs</span>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block w-px bg-[var(--border-color)]"></div>
              <div className="flex-1">
                <h5 className="text-sm-mono mb-4 text-[var(--text-secondary)]">From Kutaisi (KUT)</h5>
                <ul className="space-y-4">
                  <li className="flex justify-between border-b border-[var(--border-color)] pb-2 font-light">
                    <span>By Helicopter</span>
                    <span className="font-serif">1 hr 15 min</span>
                  </li>
                  <li className="flex justify-between border-b border-[var(--border-color)] pb-2 font-light">
                    <span>By Private Transfer</span>
                    <span className="font-serif">4 hrs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}