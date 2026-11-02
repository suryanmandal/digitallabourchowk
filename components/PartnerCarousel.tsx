"use client";

import React from "react";

const PARTNERS = [
  { name: "Larsen & Toubro", logo: "/images/lt.png" },
  { name: "Sobha", logo: "/images/sobha.png" },
  { name: "Godrej", logo: "/images/godrej.png" },
  { name: "BSES", logo: "/images/bses.png" },
  { name: "Kalpa-Taru", logo: "/images/kalpataru.png" },
];

export default function PartnerCarousel() {
  return (
    <section className="py-14 bg-slate-50/70 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <h2 className="text-base sm:text-lg font-bold text-slate-700">
          More than <span className="text-[#0C59D4]">50+ companies</span> trust{" "}
          <strong className="text-slate-900 font-extrabold">Digital Labour Chowk</strong> for their hiring needs
        </h2>
      </div>

      {/* Infinite scrolling partner track */}
      <div className="relative w-full overflow-hidden flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20 max-w-6xl mx-auto px-6">
          {PARTNERS.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm border border-slate-200/60 hover:shadow-md hover:border-blue-300 transition-all duration-200 group w-36 sm:w-44 h-20"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="max-h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
