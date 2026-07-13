import React from 'react';
import { Nav } from './_shared/Nav';
import { Footer } from './_shared/Footer';
import './_group.css';

export function Ski() {
  return (
    <div className="terrain-theme min-h-screen bg-[#09090b]">
      <Nav />
      
      {/* Header */}
      <section className="pt-40 pb-24 px-6 md:px-12 border-b border-white/20 relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-20%] text-[40vw] font-display font-bold text-white/5 pointer-events-none select-none">
          SKI
        </div>
        <div className="max-w-6xl relative z-10">
          <h1 className="font-display text-6xl md:text-8xl text-white font-bold uppercase mb-8">
            The Mountain<br/>
            <span className="text-accent">As Data.</span>
          </h1>
          <p className="font-mono-data text-white/60 max-w-xl text-lg">
            [TERRAIN ANALYSIS] Precision-engineered runs. Untracked powder fields. World-class lift infrastructure.
          </p>
        </div>
      </section>

      {/* Cartographic Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b lg:border-b-0 lg:border-r border-white/20 p-6 md:p-12 flex flex-col justify-between min-h-[600px] relative">
          <div className="font-mono-data text-accent text-sm border-l-2 border-accent pl-4 mb-12">
            [RUN DISTRIBUTION]
          </div>
          
          <div className="space-y-8 relative z-10">
            <div className="group">
              <div className="flex justify-between font-mono-data text-sm text-white mb-2">
                <span>BEGINNER // GREEN</span>
                <span>20% (17KM)</span>
              </div>
              <div className="w-full h-2 bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[20%] bg-emerald-500 group-hover:scale-y-150 transition-transform origin-left"></div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex justify-between font-mono-data text-sm text-white mb-2">
                <span>INTERMEDIATE // BLUE</span>
                <span>45% (38KM)</span>
              </div>
              <div className="w-full h-2 bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[45%] bg-blue-500 group-hover:scale-y-150 transition-transform origin-left"></div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex justify-between font-mono-data text-sm text-white mb-2">
                <span>ADVANCED // RED</span>
                <span>25% (21KM)</span>
              </div>
              <div className="w-full h-2 bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[25%] bg-red-500 group-hover:scale-y-150 transition-transform origin-left"></div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex justify-between font-mono-data text-sm text-white mb-2">
                <span>EXPERT // BLACK</span>
                <span>10% (9KM)</span>
              </div>
              <div className="w-full h-2 bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[10%] bg-black border border-white/30 group-hover:scale-y-150 transition-transform origin-left"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 border border-white/20 p-6 bg-white/5 backdrop-blur-sm">
            <h3 className="font-display text-2xl text-white mb-2">HELI-SKI PROGRAM</h3>
            <p className="font-mono-data text-white/60 text-xs mb-4">ACCESS UNTRACKED TERRAIN &gt; 3500M</p>
            <button className="bg-accent text-black font-mono-data font-bold px-6 py-3 w-full hover:bg-white transition-colors uppercase text-sm">
              View Drop Zones
            </button>
          </div>
        </div>
        
        <div className="relative min-h-[600px] flex items-center justify-center p-12 bg-black">
          <img src="/__mockup/images/ski.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity" />
          <div className="relative z-10 w-full">
             <div className="font-display text-[15vw] lg:text-[10vw] text-white font-bold leading-none text-center mix-blend-overlay">
               320<span className="text-accent text-[5vw]">CM</span>
             </div>
             <p className="font-mono-data text-center text-white/80 mt-4 text-xl bg-black/50 py-2">ANNUAL SNOWFALL</p>
          </div>
        </div>
      </section>
      
      {/* Experiences Grid */}
      <section className="bg-white text-black py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end border-b border-black/20 pb-6 mb-12">
            <h2 className="font-display text-5xl font-bold uppercase">Experiences Grid</h2>
            <span className="font-mono-data text-sm text-black/60">[METRICS & LOGISTICS]</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-black p-8 hover:bg-black hover:text-white transition-colors group">
              <div className="font-mono-data text-xs mb-8 text-black/60 group-hover:text-accent">EXP // 01</div>
              <h3 className="font-display text-3xl font-bold mb-4">SNOW SCHOOL</h3>
              <p className="font-inter mb-8 opacity-80">Data-driven instruction protocols. Private guides equipped with biometric telemetry.</p>
              <div className="font-mono-data text-sm border-t border-current pt-4">
                RATIO: 1:1<br/>
                LEVELS: ALL
              </div>
            </div>
            
            <div className="border border-black bg-black text-white p-8 group">
              <div className="font-mono-data text-xs mb-8 text-accent">EXP // 02</div>
              <h3 className="font-display text-3xl font-bold mb-4">HELI-SKIING</h3>
              <p className="font-inter mb-8 text-white/80">Vertical descent maximization. A-Star B3e helicopters deploying from the summit pad.</p>
              <div className="font-mono-data text-sm border-t border-white/20 pt-4 text-accent">
                VERT: 10,000M+/DAY<br/>
                TERRAIN: GLACIATED
              </div>
            </div>
            
            <div className="border border-black p-8 hover:bg-black hover:text-white transition-colors group">
              <div className="font-mono-data text-xs mb-8 text-black/60 group-hover:text-accent">EXP // 03</div>
              <h3 className="font-display text-3xl font-bold mb-4">APRÈS-SKI & RECOVERY</h3>
              <p className="font-inter mb-8 opacity-80">Thermal baths fed by volcanic springs. Hyperbaric oxygen chambers. Clinical recovery.</p>
              <div className="font-mono-data text-sm border-t border-current pt-4">
                TEMP: 38°C<br/>
                ALT: 2100M BASE
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
