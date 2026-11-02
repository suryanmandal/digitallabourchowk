"use client";

import React from "react";
import { ClipboardList, UserCheck, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: ClipboardList,
      title: "Share Your Site Requirement",
      desc: "Specify the number of workers, required trade skills (Mason, Carpenter, Helper, etc.), site location, and reporting shift timings."
    },
    {
      num: "02",
      icon: UserCheck,
      title: "15-Min Instant Smart Match",
      desc: "Our automated dispatch engine matches background-checked and skill-verified workers available within a 5-10 km radius of your site."
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Direct Site Reporting & Fair Pay",
      desc: "Workers report directly to your site supervisor on time. Check digital Aadhaar QR badges, verify daily work, and pay transparent standard chowk wages."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#0C59D4] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Digital Labour Chowk Works
          </h2>
          <p className="text-base text-slate-600">
            From emergency worker requirements to scheduled multi-month construction projects.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-slate-50/80 p-8 rounded-3xl border border-slate-200/80 hover:bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#0C59D4] text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-[#0C59D4] transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
