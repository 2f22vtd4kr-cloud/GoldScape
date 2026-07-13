import React, { useEffect, useState } from 'react';
import Nav from './_shared/Nav';
import Footer from './_shared/Footer';
import './_group.css';

export function Investment() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="gory-mockup">
      <Nav />
      
      {/* 1. Market Header */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 w-full flex items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src="/__mockup/images/investment.jpg" 
            alt="Investment overview" 
            className={`w-full h-full object-cover opacity-40 mix-blend-luminosity ${mounted ? 'animate-letterbox' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--gory-bg)] via-[var(--gory-bg)]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto mt-16 md:mt-0">
          <div className="gory-font-mono text-[var(--gory-accent)] tracking-[0.3em] uppercase text-xs mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            The Thesis
          </div>
          <h1 className="gory-font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-wide uppercase mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            The Market Just Confirmed<br/>What We Knew
          </h1>
          <p className="gory-font-sans font-light text-base md:text-lg text-[var(--gory-text-muted)] max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
            Rotana Hotels — operator of 100+ properties — acquired Gudauri, Georgia, July 2026. The first institutional hospitality group to enter the Georgian ski market. GORY was already building.
          </p>
        </div>
      </section>

      {/* 2. Stat strip */}
      <section className="border-y border-[var(--gory-border)] bg-[var(--gory-surface)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[var(--gory-border)]">
          <div className="flex-1 p-8 text-center hover:bg-[var(--gory-bg)] transition-colors">
            <div className="gory-font-serif text-3xl md:text-4xl text-[var(--gory-accent)] mb-3">3042M</div>
            <div className="gory-font-mono text-[10px] uppercase text-[var(--gory-text-muted)] tracking-wider">Highest ski resort in the Greater Caucasus</div>
          </div>
          <div className="flex-1 p-8 text-center hover:bg-[var(--gory-bg)] transition-colors">
            <div className="gory-font-serif text-3xl md:text-4xl text-[var(--gory-accent)] mb-3">320CM</div>
            <div className="gory-font-mono text-[10px] uppercase text-[var(--gory-text-muted)] tracking-wider">Annual natural snowfall. 60% more than Gudauri.</div>
          </div>
          <div className="flex-1 p-8 text-center hover:bg-[var(--gory-bg)] transition-colors">
            <div className="gory-font-serif text-3xl md:text-4xl text-[var(--gory-accent)] mb-3">Q4 2027</div>
            <div className="gory-font-mono text-[10px] uppercase text-[var(--gory-text-muted)] tracking-wider">Phase I opening. Pre-sales now open.</div>
          </div>
          <div className="flex-1 p-8 text-center hover:bg-[var(--gory-bg)] transition-colors">
            <div className="gory-font-serif text-3xl md:text-4xl text-[var(--gory-accent)] mb-3">0%</div>
            <div className="gory-font-mono text-[10px] uppercase text-[var(--gory-text-muted)] tracking-wider">Capital gains tax, Georgia.</div>
          </div>
        </div>
      </section>

      {/* 3. Market opportunity */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="gory-font-serif text-3xl md:text-4xl mb-8 uppercase tracking-wide">An Emerging Safe Haven</h2>
            <div className="space-y-6 text-[var(--gory-text-muted)] font-light leading-relaxed text-sm md:text-base">
              <p>
                The Georgian ski market is experiencing double-digit tourism growth year-over-year. The recent acquisition of Gudauri by Emirates hospitality group Rotana validates the asset class at an international institutional level.
              </p>
              <p>
                Georgia offers an unparalleled investment climate: zero capital gains tax on property, a low 15% corporate tax rate, and consistent top-ranking placement by the World Bank for ease of doing business. The stable, USD-pegged Lari and rapidly growing direct flight routes solidify its position.
              </p>
              <p>
                While Gudauri sits at 2,200m, GORY commands 3,042m. This 800-metre altitude advantage guarantees longer seasons, significantly more natural snowfall, and access to extreme terrain variety that lower resorts simply cannot offer.
              </p>
            </div>
          </div>
          
          <div className="bg-[var(--gory-surface)] p-6 md:p-8 border border-[var(--gory-border)] rounded-sm">
            <h3 className="gory-font-mono text-xs tracking-widest uppercase mb-8 text-[var(--gory-accent)] border-b border-[var(--gory-border)] pb-4">Market Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="gory-font-mono text-[10px] uppercase tracking-wider text-[var(--gory-text-muted)] border-b border-[var(--gory-border)]">
                    <th className="py-4 font-normal">Metric</th>
                    <th className="py-4 font-normal text-[var(--gory-accent)]">GORY</th>
                    <th className="py-4 font-normal">Gudauri</th>
                    <th className="py-4 font-normal">Alps (Avg)</th>
                  </tr>
                </thead>
                <tbody className="gory-font-sans font-light text-sm divide-y divide-[var(--gory-border)]">
                  <tr>
                    <td className="py-4 text-[var(--gory-text-muted)]">Altitude</td>
                    <td className="py-4 text-white">3,042m</td>
                    <td className="py-4">2,200m</td>
                    <td className="py-4">1,800m</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-[var(--gory-text-muted)]">Snowfall</td>
                    <td className="py-4 text-white">320cm</td>
                    <td className="py-4">~200cm</td>
                    <td className="py-4">Varies widely</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-[var(--gory-text-muted)]">Cap Gains Tax</td>
                    <td className="py-4 text-white">0%</td>
                    <td className="py-4">0%</td>
                    <td className="py-4">25-45%</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-[var(--gory-text-muted)]">Market</td>
                    <td className="py-4 text-white">Emerging</td>
                    <td className="py-4">Maturing</td>
                    <td className="py-4">Saturated</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-[var(--gory-text-muted)]">Pricing</td>
                    <td className="py-4 text-white">Pre-opening</td>
                    <td className="py-4">Market</td>
                    <td className="py-4">Premium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Three investment tiers */}
      <section className="py-24 md:py-32 bg-[var(--gory-surface)] border-y border-[var(--gory-border)] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="gory-font-serif text-3xl md:text-5xl uppercase tracking-widest mb-6">Investment Tiers</h2>
            <p className="gory-font-mono text-xs text-[var(--gory-text-muted)] tracking-widest">PRE-SALES OPEN NOW FOR Q4 2027</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="group bg-[var(--gory-bg)] border border-[var(--gory-border)] hover:border-[var(--gory-accent)] transition-colors duration-500 flex flex-col">
              <div className="p-8 border-b border-[var(--gory-border)] group-hover:border-[var(--gory-accent)] transition-colors duration-500">
                <h3 className="gory-font-serif text-xl uppercase tracking-wider mb-2">Foundation Partner</h3>
                <div className="gory-font-mono text-[var(--gory-accent)] text-sm tracking-widest mt-4">FROM €150,000</div>
              </div>
              <div className="p-8 flex-1">
                <ul className="space-y-4 gory-font-sans font-light text-[var(--gory-text-muted)] text-sm">
                  <li className="flex items-start gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full mt-2 shrink-0"></span> Earliest access and best available pricing</li>
                  <li className="flex items-start gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full mt-2 shrink-0"></span> Priority unit selection</li>
                  <li className="flex items-start gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full mt-2 shrink-0"></span> Q4 2024 entry window</li>
                </ul>
              </div>
            </div>
            
            {/* Tier 2 */}
            <div className="group bg-[var(--gory-bg)] border border-[var(--gory-accent)] flex flex-col relative transform lg:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gory-accent)] text-black gory-font-mono text-[10px] uppercase px-4 py-1 font-bold tracking-widest">
                Most Popular
              </div>
              <div className="p-8 border-b border-[var(--gory-accent)] transition-colors duration-500 bg-[var(--gory-surface)]">
                <h3 className="gory-font-serif text-xl uppercase tracking-wider mb-2">Alpine Investor</h3>
                <div className="gory-font-mono text-[var(--gory-accent)] text-sm tracking-widest mt-4">FROM €250,000</div>
              </div>
              <div className="p-8 flex-1">
                <ul className="space-y-4 gory-font-sans font-light text-[var(--gory-text-muted)] text-sm">
                  <li className="flex items-start gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full mt-2 shrink-0"></span> Standard pre-opening pricing</li>
                  <li className="flex items-start gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full mt-2 shrink-0"></span> Unit selection from remaining inventory</li>
                  <li className="flex items-start gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full mt-2 shrink-0"></span> Flexible owner usage</li>
                </ul>
              </div>
            </div>
            
            {/* Tier 3 */}
            <div className="group bg-[var(--gory-bg)] border border-[var(--gory-border)] hover:border-[var(--gory-accent)] transition-colors duration-500 flex flex-col">
              <div className="p-8 border-b border-[var(--gory-border)] group-hover:border-[var(--gory-accent)] transition-colors duration-500">
                <h3 className="gory-font-serif text-xl uppercase tracking-wider mb-2">Summit Member</h3>
                <div className="gory-font-mono text-[var(--gory-accent)] text-sm tracking-widest mt-4">FROM €500,000</div>
              </div>
              <div className="p-8 flex-1">
                <ul className="space-y-4 gory-font-sans font-light text-[var(--gory-text-muted)] text-sm">
                  <li className="flex items-start gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full mt-2 shrink-0"></span> Club membership model</li>
                  <li className="flex items-start gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full mt-2 shrink-0"></span> Shared equity in resort F&B and experiences</li>
                  <li className="flex items-start gap-3"><span className="w-1 h-1 bg-[var(--gory-accent)] rounded-full mt-2 shrink-0"></span> Unlimited access to ski facilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Development timeline */}
      <section className="py-24 md:py-32 px-6 max-w-4xl mx-auto">
        <h2 className="gory-font-serif text-2xl md:text-3xl uppercase tracking-widest text-center mb-16 md:mb-24">The Timeline</h2>
        
        <div className="relative border-l border-[var(--gory-border)] ml-4 md:mx-auto space-y-12 pb-8">
          <div className="relative pl-8 md:pl-12">
            <div className="absolute w-2 h-2 bg-[var(--gory-accent)] rounded-full -left-[4.5px] top-1" />
            <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-3">2024</div>
            <div className="gory-font-serif text-xl mb-2">Land secured & planning approved</div>
          </div>
          
          <div className="relative pl-8 md:pl-12">
            <div className="absolute w-2 h-2 bg-transparent border border-[var(--gory-accent)] rounded-full -left-[4.5px] top-1" />
            <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-3">2025</div>
            <div className="gory-font-serif text-xl mb-2">Infrastructure & gondola construction begins</div>
          </div>
          
          <div className="relative pl-8 md:pl-12">
            <div className="absolute w-2 h-2 bg-transparent border border-[var(--gory-accent)] rounded-full -left-[4.5px] top-1" />
            <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-3">2026</div>
            <div className="gory-font-serif text-xl mb-2">Vertical build Phase I</div>
          </div>
          
          <div className="relative pl-8 md:pl-12">
            <div className="absolute w-2 h-2 bg-transparent border border-[var(--gory-accent)] rounded-full -left-[4.5px] top-1" />
            <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-3">Q4 2027</div>
            <div className="gory-font-serif text-xl mb-2">Grand Opening</div>
          </div>
          
          <div className="relative pl-8 md:pl-12">
            <div className="absolute w-2 h-2 bg-transparent border border-[var(--gory-accent)] rounded-full -left-[4.5px] top-1" />
            <div className="gory-font-mono text-[var(--gory-accent)] text-xs tracking-widest mb-3">2028–2030</div>
            <div className="gory-font-serif text-xl mb-2">Phase II & III expansion</div>
          </div>
        </div>
      </section>

      {/* 6. Legal & structure panel & 7. CTA */}
      <section className="bg-[var(--gory-surface)] border-t border-[var(--gory-border)] py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="gory-font-serif text-2xl md:text-3xl uppercase tracking-widest mb-10">Request an Investment Memorandum</h2>
          
          <form className="flex flex-col gap-6 mb-12 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="FULL NAME" className="bg-[var(--gory-bg)] border border-[var(--gory-border)] p-4 gory-font-mono text-xs focus:outline-none focus:border-[var(--gory-accent)] transition-colors placeholder:text-[var(--gory-text-muted)] text-white w-full" />
              <input type="email" placeholder="EMAIL ADDRESS" className="bg-[var(--gory-bg)] border border-[var(--gory-border)] p-4 gory-font-mono text-xs focus:outline-none focus:border-[var(--gory-accent)] transition-colors placeholder:text-[var(--gory-text-muted)] text-white w-full" />
            </div>
            <select className="bg-[var(--gory-bg)] border border-[var(--gory-border)] p-4 gory-font-mono text-xs focus:outline-none focus:border-[var(--gory-accent)] transition-colors text-[var(--gory-text-muted)] appearance-none w-full cursor-pointer">
              <option value="">SELECT INTEREST TIER</option>
              <option value="foundation">Foundation Partner (from €150k)</option>
              <option value="alpine">Alpine Investor (from €250k)</option>
              <option value="summit">Summit Member (from €500k)</option>
            </select>
            <button type="submit" className="bg-transparent border border-[var(--gory-accent)] text-[var(--gory-accent)] hover:bg-[var(--gory-accent)] hover:text-black transition-colors duration-300 p-4 gory-font-mono text-xs tracking-widest uppercase mt-4 cursor-pointer">
              Submit Request
            </button>
          </form>
          
          <div className="text-[var(--gory-text-muted)] text-xs font-light space-y-4 text-center border-t border-[var(--gory-border)] pt-12">
            <p>All inquiries handled under strict NDA. Minimum qualifying investment: €150,000.</p>
            <p className="uppercase gory-font-mono tracking-wider pt-4 text-[10px] leading-relaxed opacity-50">
              Registered: Georgia • Entity: Caucasus Alpine Ventures LLC • Legal framework: Georgian Investment Law<br/>
              Escrow: held in Georgian national bank until construction milestone • Independent audit: quarterly.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Investment;