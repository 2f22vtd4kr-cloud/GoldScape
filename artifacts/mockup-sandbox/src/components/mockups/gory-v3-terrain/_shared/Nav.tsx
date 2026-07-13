import React from "react";
import "../_group.css";

export function Nav() {
  return (
    <nav className="terrain-theme fixed top-0 left-0 right-0 z-50 mix-blend-difference px-6 py-6 border-b border-white/20">
      <div className="flex justify-between items-start font-mono-data text-sm tracking-widest uppercase">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-white text-xl">GORY</span>
          <span className="text-white/60 text-xs">
            Lat 42°39′27″N / Lon 44°38′43″E
          </span>
        </div>
        <div className="flex gap-8 text-white/80">
          <a href="#" className="hover:text-accent transition-colors">
            Atlas
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Ski
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Stay
          </a>
        </div>
        <div className="text-right flex flex-col gap-1 hidden md:flex">
          <span className="text-white">Alt. 3042m</span>
          <span className="text-accent">Opening Q4 2027</span>
        </div>
      </div>
    </nav>
  );
}
