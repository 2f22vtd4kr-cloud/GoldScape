import React from "react";
import { Nav } from "./_shared/Nav";
import { Footer } from "./_shared/Footer";
import "./_group.css";

export function Stay() {
  return (
    <div className="terrain-theme min-h-screen bg-black">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="font-mono-data text-accent text-sm border-l-2 border-accent pl-4 mb-8">
          [ACCOMMODATION CATALOGUE]
        </div>
        <h1 className="font-display text-5xl md:text-7xl text-white font-bold uppercase mb-8 max-w-4xl">
          Engineered for <br />
          <span className="text-outline-accent">Recovery</span>.
        </h1>
      </section>

      {/* Catalogue */}
      <section className="px-6 md:px-12 pb-24 border-b border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
          {/* Room Type 1 */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 group border border-white/10 hover:border-accent/50 transition-colors bg-white/5">
            <div className="h-[40vh] md:h-[60vh] overflow-hidden">
              <img
                src="/__mockup/images/stay.jpg"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="font-display text-4xl text-white font-bold uppercase">
                    Summit Villa
                  </h2>
                  <span className="font-mono-data bg-accent text-black px-3 py-1 text-xs font-bold">
                    TYPE A
                  </span>
                </div>
                <p className="font-inter text-white/70 text-lg mb-8">
                  Cantilevered structures suspended over the Kazbegi valley.
                  Floor-to-ceiling smart glass, private thermal plunge pools,
                  and direct ski-in/ski-out access via private elevator.
                </p>
                <div className="grid grid-cols-2 gap-4 font-mono-data text-sm text-white/50 mb-12">
                  <div className="border-l border-white/20 pl-4">
                    <span className="text-accent block text-xs">AREA</span>
                    <span className="text-white text-lg">240 SQ M</span>
                  </div>
                  <div className="border-l border-white/20 pl-4">
                    <span className="text-accent block text-xs">CAPACITY</span>
                    <span className="text-white text-lg">6 PAX</span>
                  </div>
                  <div className="border-l border-white/20 pl-4">
                    <span className="text-accent block text-xs">VIEW</span>
                    <span className="text-white text-lg">SOUTH/VALLEY</span>
                  </div>
                  <div className="border-l border-white/20 pl-4">
                    <span className="text-accent block text-xs">ALTITUDE</span>
                    <span className="text-white text-lg">2250M</span>
                  </div>
                </div>
              </div>
              <button className="border border-accent text-accent font-mono-data py-4 uppercase hover:bg-accent hover:text-black transition-colors w-full md:w-1/2">
                Inquire Status
              </button>
            </div>
          </div>

          {/* Room Type 2 */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 group border border-white/10 hover:border-white/40 transition-colors">
            <div className="p-8 md:p-12 flex flex-col justify-between order-2 md:order-1">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="font-display text-4xl text-white font-bold uppercase">
                    Alpine Loft
                  </h2>
                  <span className="font-mono-data border border-white/30 text-white px-3 py-1 text-xs">
                    TYPE B
                  </span>
                </div>
                <p className="font-inter text-white/70 text-lg mb-8">
                  Industrial brutalism meets alpine comfort. Exposed concrete,
                  raw timber, and stark geometric layouts maximize spatial
                  efficiency without compromising luxury.
                </p>
                <div className="grid grid-cols-2 gap-4 font-mono-data text-sm text-white/50 mb-12">
                  <div className="border-l border-white/20 pl-4">
                    <span className="text-white/40 block text-xs">AREA</span>
                    <span className="text-white text-lg">110 SQ M</span>
                  </div>
                  <div className="border-l border-white/20 pl-4">
                    <span className="text-white/40 block text-xs">
                      CAPACITY
                    </span>
                    <span className="text-white text-lg">2-4 PAX</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[40vh] md:h-[50vh] overflow-hidden order-1 md:order-2">
              <img
                src="/__mockup/images/gallery-3.jpg"
                className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investment/Pre-Sales */}
      <section className="bg-accent text-black grid grid-cols-1 md:grid-cols-2">
        <div className="p-12 md:p-24 flex flex-col justify-center">
          <div className="font-mono-data text-sm border-l-2 border-black pl-4 mb-8 font-bold">
            [INVESTMENT OPPORTUNITY]
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold uppercase leading-none mb-8">
            Limited
            <br />
            Pre-Sales
            <br />
            Open.
          </h2>
          <p className="font-inter font-medium text-xl mb-12">
            Acquire a stake in the Caucasus' premier high-altitude resort. Phase
            1 inventory is strictly limited to 24 units.
          </p>
          <div className="font-mono-data text-sm space-y-4">
            <div className="flex justify-between border-b border-black/20 pb-2">
              <span>PROJECTED YIELD</span>
              <span className="font-bold text-lg">8.5% PA</span>
            </div>
            <div className="flex justify-between border-b border-black/20 pb-2">
              <span>CAPITAL APPRECIATION</span>
              <span className="font-bold text-lg">12% YOY</span>
            </div>
            <div className="flex justify-between border-b border-black/20 pb-2">
              <span>UNITS REMAINING</span>
              <span className="font-bold text-lg">07</span>
            </div>
          </div>
        </div>

        <div className="bg-[#09090b] text-white p-12 md:p-24 flex flex-col justify-center border-l border-white/20">
          <h3 className="font-display text-3xl font-bold uppercase mb-8">
            Initiate Contact
          </h3>
          <form className="space-y-6 font-mono-data text-sm">
            <div>
              <label className="block text-accent mb-2">
                IDENTIFICATION [NAME]
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/30 p-2 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="ENTER NAME"
              />
            </div>
            <div>
              <label className="block text-accent mb-2">CONTACT [EMAIL]</label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/30 p-2 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="ENTER EMAIL"
              />
            </div>
            <div>
              <label className="block text-accent mb-2">CAPITAL RANGE</label>
              <select className="w-full bg-transparent border-b border-white/30 p-2 text-white/50 focus:outline-none focus:border-accent transition-colors appearance-none">
                <option value="1">€500K - €1M</option>
                <option value="2">€1M - €2.5M</option>
                <option value="3">€2.5M+</option>
              </select>
            </div>
            <button
              type="button"
              className="w-full bg-white text-black font-bold py-4 mt-8 hover:bg-accent transition-colors uppercase"
            >
              Submit Query
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
