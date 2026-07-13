import React, { useEffect, useState } from 'react';
import './_group.css';
import Nav from './_shared/Nav';
import Footer from './_shared/Footer';

export function Stay() {
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
            <div className="gory-font-mono text-[var(--gory-accent)] tracking-widest mb-4">02 — THE SANCTUARY</div>
            <h1 className="gory-font-serif text-5xl md:text-8xl tracking-widest uppercase">Stay & Invest</h1>
          </div>
          <p className="text-[var(--gory-text-muted)] max-w-md font-light leading-relaxed">
            A masterclass in alpine brutalism, softened by warm oak, deep textures, and panoramic glass. Retreat into profound silence.
          </p>
        </div>

        <div className={`w-full aspect-[21/9] overflow-hidden ${mounted ? 'animate-letterbox' : 'opacity-0'}`}>
          <img src="/__mockup/images/stay.jpg" alt="The Lodge" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="gory-font-serif text-3xl tracking-widest uppercase">Accommodations</h2>
          <div className="flex-1 h-[1px] bg-[var(--gory-border)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-6 relative">
              <img src="/__mockup/images/gallery-1.jpg" alt="Mountain Suite" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
              <div className="absolute inset-0 border border-[var(--gory-border)] m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="gory-font-serif text-xl tracking-wide uppercase mb-2">Mountain Suite</h3>
            <p className="text-[var(--gory-text-muted)] font-light text-sm">65 sq.m. Private terrace. Floor-to-ceiling vistas.</p>
          </div>
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-6 relative">
              <img src="/__mockup/images/gallery-2.jpg" alt="Panorama Villa" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
              <div className="absolute inset-0 border border-[var(--gory-border)] m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="gory-font-serif text-xl tracking-wide uppercase mb-2">Panorama Villa</h3>
            <p className="text-[var(--gory-text-muted)] font-light text-sm">120 sq.m. Suspended fireplace. Ski-in/ski-out access.</p>
          </div>
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-6 relative">
              <img src="/__mockup/images/gallery-3.jpg" alt="The Residences" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
              <div className="absolute inset-0 border border-[var(--gory-border)] m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="gory-font-serif text-xl tracking-wide uppercase mb-2 text-[var(--gory-accent)]">The Residences</h3>
            <p className="text-[var(--gory-text-muted)] font-light text-sm">250+ sq.m. Private wellness suite. Ownership available.</p>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[var(--gory-surface)] gory-border-y">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="gory-font-mono text-[var(--gory-accent)] tracking-widest mb-4">OWNERSHIP</div>
            <h2 className="gory-font-serif text-4xl md:text-5xl leading-tight mb-8">
              A rare stake in the future of alpine exclusivity.
            </h2>
            <p className="text-[var(--gory-text-muted)] font-light leading-relaxed mb-8">
              GORY presents a limited pre-sales opportunity for visionary investors. Acquire one of fifty bespoke residences in the Caucasus' first ultra-luxury resort. Owners enjoy full estate management, guaranteed rental yields, and unfettered global access to GORY properties. Opening Q4 2027.
            </p>
            <div className="flex gap-4 mb-12">
              <div className="px-4 py-2 border border-[var(--gory-border)] text-sm font-mono tracking-widest">PHASE 1</div>
              <div className="px-4 py-2 bg-white text-black text-sm font-mono tracking-widest font-bold">INVITATION ONLY</div>
            </div>
          </div>
          
          <div className="bg-[#050505] p-10 gory-border-t border-[var(--gory-accent)]">
            <h3 className="gory-font-serif text-2xl tracking-wide uppercase mb-8">Register Interest</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block gory-font-mono text-xs uppercase tracking-widest text-[var(--gory-text-muted)] mb-2">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-[var(--gory-border)] p-2 text-white focus:outline-none focus:border-[var(--gory-accent)] transition-colors" placeholder="e.g. Jean-Pierre Blanc" />
              </div>
              <div>
                <label className="block gory-font-mono text-xs uppercase tracking-widest text-[var(--gory-text-muted)] mb-2">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-[var(--gory-border)] p-2 text-white focus:outline-none focus:border-[var(--gory-accent)] transition-colors" placeholder="email@domain.com" />
              </div>
              <div>
                <label className="block gory-font-mono text-xs uppercase tracking-widest text-[var(--gory-text-muted)] mb-2">Area of Interest</label>
                <select className="w-full bg-transparent border-b border-[var(--gory-border)] p-2 text-white focus:outline-none focus:border-[var(--gory-accent)] transition-colors appearance-none">
                  <option className="bg-[#0a0a0a]">Residences Investment</option>
                  <option className="bg-[#0a0a0a]">Lodge Booking</option>
                  <option className="bg-[#0a0a0a]">Heli-Skiing Access</option>
                </select>
              </div>
              <div>
                <label className="block gory-font-mono text-xs uppercase tracking-widest text-[var(--gory-text-muted)] mb-2">Message (Optional)</label>
                <textarea rows={3} className="w-full bg-transparent border-b border-[var(--gory-border)] p-2 text-white focus:outline-none focus:border-[var(--gory-accent)] transition-colors resize-none" placeholder="Details of your inquiry..."></textarea>
              </div>
              <button className="w-full bg-[var(--gory-accent)] text-black py-4 gory-font-mono text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors duration-300">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Stay;
