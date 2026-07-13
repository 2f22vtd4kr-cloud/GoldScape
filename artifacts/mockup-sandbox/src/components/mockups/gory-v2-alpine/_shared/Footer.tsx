import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-24 pb-12 px-6 md:px-12 text-sm-mono text-[var(--text-secondary)]">
      <div className="thin-line mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
        <div className="md:col-span-4">
          <h4 className="font-serif text-2xl mb-6 text-[var(--text-primary)] normal-case tracking-normal">GORY</h4>
          <p className="mb-2">Greater Caucasus Range</p>
          <p>Kazbegi, Georgia</p>
        </div>
        
        <div className="md:col-span-3">
          <p className="mb-2 text-[var(--text-primary)]">Coordinates</p>
          <p className="mb-1">N 42°39'</p>
          <p>E 44°27'</p>
        </div>

        <div className="md:col-span-2 flex flex-col gap-3">
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Journal</a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Investment</a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Press</a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Contact</a>
        </div>
        
        <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between h-full">
          <div className="data-panel text-left md:text-right w-full md:w-auto">
            <p className="mb-2 text-[var(--text-primary)]">Status</p>
            <p>Pre-Opening Q4 2027</p>
          </div>
          <p className="mt-8 md:mt-0 text-[10px]">© {new Date().getFullYear()} GORY RESORT. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}