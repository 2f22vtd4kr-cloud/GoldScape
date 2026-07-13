import React from "react";
import { Nav } from "./_shared/Nav";
import { Footer } from "./_shared/Footer";
import "./_group.css";

export function Home() {
  return (
    <div className="terrain-theme min-h-screen selection:bg-accent selection:text-black">
      <Nav />

      {/* Hero */}
      <section className="relative h-screen flex flex-col justify-end p-6 md:p-12 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/__mockup/images/hero.jpg"
            alt="Mountain"
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-start gap-4">
          <div className="w-full flex justify-between items-end border-b border-accent/40 pb-4 font-mono-data text-accent text-sm tracking-widest uppercase">
            <span>[MAX ELEVATION]</span>
            <span>DATA.SET // 01</span>
          </div>

          <h1 className="font-display text-[22vw] leading-[0.75] tracking-tighter text-white font-bold uppercase w-full">
            3042<span className="text-[6vw] text-accent align-top">M</span>
          </h1>

          <div className="w-full flex justify-between items-start mt-8">
            <p className="font-mono-data text-white/70 max-w-sm text-sm">
              Terrain mapped. Infrastructure initialized. The ultimate
              high-altitude luxury destination is emerging in the Caucasus.
            </p>
            <div className="font-mono-data text-accent border border-accent px-4 py-2 text-sm uppercase">
              EST. Q4 2027
            </div>
          </div>
        </div>
      </section>

      {/* Data Drama Block */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-y border-white/20">
        <div className="p-12 border-b md:border-b-0 md:border-r border-white/20 hover:bg-white/5 transition-colors group">
          <p className="font-mono-data text-accent mb-4 text-sm">
            [PISTE COUNT]
          </p>
          <h2 className="font-display text-8xl font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">
            47
          </h2>
          <p className="font-inter text-white/60 text-lg uppercase tracking-widest">
            Runs
          </p>
        </div>

        <div className="p-12 border-b md:border-b-0 md:border-r border-white/20 bg-accent group">
          <p className="font-mono-data text-black mb-4 text-sm font-bold">
            [ANNUAL SNOWFALL]
          </p>
          <h2 className="font-display text-8xl font-bold text-black mb-2 group-hover:scale-105 transition-transform origin-left">
            320
          </h2>
          <p className="font-inter text-black/80 text-lg uppercase tracking-widest font-semibold">
            Centimetres
          </p>
        </div>

        <div className="p-12 hover:bg-white/5 transition-colors group relative overflow-hidden">
          <img
            src="/__mockup/images/ski.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:opacity-40 transition-opacity"
          />
          <div className="relative z-10">
            <p className="font-mono-data text-accent mb-4 text-sm">
              [TERRAIN AREA]
            </p>
            <h2 className="font-display text-8xl font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">
              85
            </h2>
            <p className="font-inter text-white/60 text-lg uppercase tracking-widest">
              Kilometers
            </p>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-32 px-6 md:px-12 bg-black relative">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
          <img
            src="/__mockup/images/gallery-1.jpg"
            className="w-full h-full object-cover grayscale mix-blend-screen"
          />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="font-mono-data text-accent mb-12 text-sm border-l-2 border-accent pl-4">
            [PROJECT VISION]
            <br />
            // KAZBEGI, GEORGIA
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] uppercase">
            Where the
            <br />
            <span className="text-outline-accent">Caucasus</span>
            <br />
            meets the
            <br />
            future.
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="font-inter text-white/70 text-lg leading-relaxed">
              We are not just building a resort. We are engineering a
              high-altitude ecosystem. By combining raw, untamed terrain with
              precision architectural engineering, GORY establishes a new
              benchmark for alpine luxury.
            </p>

            <div className="flex flex-col gap-6 font-mono-data text-sm">
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="text-white/50">BASE ELEVATION</span>
                <span className="text-white">2100M</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="text-white/50">PEAK ELEVATION</span>
                <span className="text-white">3042M</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="text-white/50">LIFT SYSTEMS</span>
                <span className="text-white">DOPPELMAYR D-LINE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="h-[60vh] w-full relative">
        <img
          src="/__mockup/images/experiences.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/80 backdrop-blur-sm p-8 border border-accent text-center">
            <h3 className="font-display text-4xl text-white uppercase mb-2">
              Pre-Sales Active
            </h3>
            <p className="font-mono-data text-accent text-sm">
              SECURE YOUR POSITION AT THE PEAK
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
