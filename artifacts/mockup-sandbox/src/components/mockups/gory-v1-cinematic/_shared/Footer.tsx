import React from 'react';
import '../_group.css';

export default function Footer() {
  return (
    <footer className="gory-border-t py-12 px-6 mt-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="gory-font-serif text-3xl tracking-widest uppercase mb-4">Gory</h2>
          <p className="gory-text-muted max-w-sm font-light">
            An unprecedented elevation of luxury in the Caucasus. Opening Q4 2027.
          </p>
          <div className="mt-8 gory-font-mono text-xs text-[var(--gory-text-muted)] tracking-widest">
            <p>42°39'45"N 44°38'14"E</p>
            <p>ELEVATION 3042M</p>
          </div>
        </div>
        <div>
          <h3 className="gory-font-mono text-xs uppercase tracking-widest text-[var(--gory-accent)] mb-4">Explore</h3>
          <ul className="space-y-3 text-sm tracking-wide text-[var(--gory-text-muted)] uppercase">
            <li><a href="/__mockup/preview/gory-v1-cinematic/Ski" className="hover:text-white transition-colors">The Ski World</a></li>
            <li><a href="/__mockup/preview/gory-v1-cinematic/Stay" className="hover:text-white transition-colors">Residences & Suites</a></li>
            <li><a href="/__mockup/preview/gory-v1-cinematic/Stay" className="hover:text-white transition-colors">Investment</a></li>
          </ul>
        </div>
        <div>
          <h3 className="gory-font-mono text-xs uppercase tracking-widest text-[var(--gory-accent)] mb-4">Inquiries</h3>
          <ul className="space-y-3 text-sm tracking-wide text-[var(--gory-text-muted)]">
            <li><a href="mailto:pre-opening@gory.ge" className="hover:text-white transition-colors">pre-opening@gory.ge</a></li>
            <li><a href="tel:+995322000000" className="hover:text-white transition-colors">+995 322 00 00 00</a></li>
            <li className="mt-6 uppercase">Kazbegi Region<br/>Georgia</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 gory-border-t flex flex-col md:flex-row justify-between items-center text-xs gory-font-mono text-[var(--gory-text-muted)] uppercase tracking-widest">
        <p>© 2027 GORY RESORT. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
