import React from 'react';
import './_group.css';
import Nav from './_shared/Nav';
import Footer from './_shared/Footer';

export function Stay() {
  return (
    <div className="gory-v2-alpine flex flex-col">
      <Nav />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="px-6 md:px-12 py-16 border-b border-[var(--border-color)]">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl mb-8">Accommodation</h1>
            <p className="font-light text-xl text-[var(--text-secondary)] leading-relaxed">
              Shelter refined to its most elegant essentials. Our suites offer panoramic isolation, framing the Caucasus through rigorous architectural geometries.
            </p>
          </div>
        </section>

        {/* Rooms Catalogue Grid */}
        <section className="px-6 md:px-12 py-16">
          <div className="space-y-16 md:space-y-32">
            
            {/* Room Type 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="md:col-span-7 img-container aspect-[4/3] order-2 md:order-1">
                <img src="/__mockup/images/stay.jpg" alt="Alpine Suite" />
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="data-panel bg-white -ml-0 md:-ml-16 relative z-10">
                  <p className="text-sm-mono text-[var(--text-secondary)] mb-4">Category 01</p>
                  <h3 className="font-serif text-4xl mb-4">Alpine Suite</h3>
                  <p className="font-light text-[var(--text-secondary)] mb-8 leading-relaxed">
                    A 65 sqm sanctuary characterized by pale timber, monolithic stone basins, and floor-to-ceiling glass revealing the Kazbegi massif. Complete environmental control ensures absolute comfort at 3,042m.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm-mono pt-6 border-t border-[var(--border-color)]">
                    <div>
                      <span className="block text-[var(--text-secondary)] mb-1">Space</span>
                      <span>65 SQM</span>
                    </div>
                    <div>
                      <span className="block text-[var(--text-secondary)] mb-1">Occupancy</span>
                      <span>2 Adults</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Type 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="md:col-span-5">
                <div className="data-panel bg-white -mr-0 md:-mr-16 relative z-10">
                  <p className="text-sm-mono text-[var(--text-secondary)] mb-4">Category 02</p>
                  <h3 className="font-serif text-4xl mb-4">Summit Penthouse</h3>
                  <p className="font-light text-[var(--text-secondary)] mb-8 leading-relaxed">
                    The pinnacle of the property. 140 sqm of expansive living space featuring a private thermal bath on an open-air terrace, dedicated staff quarters, and 270-degree mountain views.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm-mono pt-6 border-t border-[var(--border-color)]">
                    <div>
                      <span className="block text-[var(--text-secondary)] mb-1">Space</span>
                      <span>140 SQM</span>
                    </div>
                    <div>
                      <span className="block text-[var(--text-secondary)] mb-1">Occupancy</span>
                      <span>4 Adults</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 img-container aspect-[4/3]">
                <img src="/__mockup/images/gallery-4.jpg" alt="Summit Penthouse" />
              </div>
            </div>

          </div>
        </section>

        {/* Investment & Contact */}
        <section className="border-t border-[var(--border-color)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Investment */}
            <div className="px-6 md:px-12 py-16 md:border-r border-[var(--border-color)]">
              <div className="img-container aspect-video mb-8">
                <img src="/__mockup/images/investment.jpg" alt="Investment Opportunity" />
              </div>
              <h3 className="font-serif text-3xl mb-4">Investment Opportunity</h3>
              <p className="font-light text-[var(--text-secondary)] mb-8 leading-relaxed">
                A limited number of private residences are available for off-plan acquisition. GORY represents a singular asset class in the rapidly developing Eurasian luxury hospitality sector.
              </p>
              <a href="#" className="inline-block text-sm-mono border-b border-[var(--text-primary)] pb-1 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors">
                Request Investor Brief
              </a>
            </div>

            {/* Contact Form */}
            <div className="px-6 md:px-12 py-16 bg-white flex flex-col justify-center">
              <h3 className="font-serif text-3xl mb-8">Pre-Opening Registration</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm-mono text-[var(--text-secondary)] mb-2" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-transparent border-b border-[var(--border-color)] py-2 font-serif text-xl focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm-mono text-[var(--text-secondary)] mb-2" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-transparent border-b border-[var(--border-color)] py-2 font-serif text-xl focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="pt-4">
                  <button type="button" className="data-panel w-full text-sm-mono hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] transition-colors uppercase tracking-widest py-4">
                    Register Interest
                  </button>
                </div>
              </form>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}