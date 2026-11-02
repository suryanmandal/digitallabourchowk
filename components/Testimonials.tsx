"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Suresh Chauhan",
      role: "Civil Contractor, Greater Noida",
      text: "When 8 of my plaster masons did not turn up at my site in Sector 137, I booked through Digital Labour Chowk. Within 25 minutes, verified artisans reached the site and completed the work on schedule.",
      rating: 5,
      trades: "Masons & Helpers",
    },
    {
      name: "Vikram Malhotra",
      role: "Project Engineer, DLF Project",
      text: "The Aadhaar verification and standard local wage rates remove all the daily haggling that happens at physical labor chowks. Highly recommended for commercial builders.",
      rating: 5,
      trades: "Steel Rebar & Shuttering",
    },
    {
      name: "Mohan Lal Verma",
      role: "Certified Plumber & Electrician",
      text: "Earlier I had to wait 3 hours at the chowk every morning without knowing if I would get work. Now with Digital Labour Chowk, I get direct calls and daily payments with dignity.",
      rating: 5,
      trades: "Sanitary & Piping",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-[#0C59D4] uppercase tracking-wider bg-blue-100/70 px-3 py-1 rounded-full">
            Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Trusted by Thousands of Contractors & Workers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-100 mb-2" />
                <p className="text-sm text-slate-600 leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">{rev.name}</div>
                <div className="text-xs text-slate-500 font-medium">{rev.role}</div>
                <div className="mt-2 text-[11px] font-semibold text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded">
                  {rev.trades}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
