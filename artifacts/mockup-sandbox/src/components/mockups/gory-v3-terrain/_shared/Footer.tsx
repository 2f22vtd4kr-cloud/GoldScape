import React from "react";
import "../_group.css";

export function Footer() {
  return (
    <footer className="terrain-theme border-t border-white/20 py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 font-mono-data text-sm">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <h2 className="font-display text-4xl text-white font-bold tracking-tighter">
            GORY RESORT
          </h2>
          <div className="w-full h-px bg-white/20 my-4"></div>
          <div className="grid grid-cols-2 gap-8 text-white/60">
            <div>
              <p className="text-accent mb-2">[LOCATION]</p>
              <p>Kazbegi, Georgia</p>
              <p>Caucasus Mountains</p>
              <p>Elevation: 3042m</p>
            </div>
            <div>
              <p className="text-accent mb-2">[STATUS]</p>
              <p>Under Construction</p>
              <p>Opening Q4 2027</p>
              <p>Phase 1 Pre-sales Open</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-accent mb-2">[INDEX]</p>
          <a
            href="#"
            className="text-white hover:text-accent transition-colors"
          >
            Terrain Atlas
          </a>
          <a
            href="#"
            className="text-white hover:text-accent transition-colors"
          >
            Ski Experiences
          </a>
          <a
            href="#"
            className="text-white hover:text-accent transition-colors"
          >
            Accommodation
          </a>
          <a
            href="#"
            className="text-white hover:text-accent transition-colors"
          >
            Investment
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-accent mb-2">[COMMUNICATION]</p>
          <a
            href="#"
            className="text-white hover:text-accent transition-colors"
          >
            inquiries@gory.ge
          </a>
          <a
            href="#"
            className="text-white hover:text-accent transition-colors"
          >
            +995 32 2 000 000
          </a>
          <div className="mt-8">
            <p className="text-white/40 text-xs">
              © 2027 GORY MOUNTAIN RESORT.
              <br />
              ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
