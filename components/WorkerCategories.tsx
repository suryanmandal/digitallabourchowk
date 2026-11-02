"use client";

import React from "react";
import Link from "next/link";
import { Wrench, Zap, Hammer, Paintbrush, Flame, Layers, Drill, HardHat } from "lucide-react";

export default function WorkerCategories() {
  const categories = [
    { name: "Masons / Rajmistri", hindi: "राजमिस्त्री", icon: Layers, count: "12,400+ Verified", rate: "₹900 - ₹1200 / day" },
    { name: "Electricians", hindi: "इलेक्ट्रीशियन", icon: Zap, count: "8,900+ Verified", rate: "₹850 - ₹1100 / day" },
    { name: "Plumbers", hindi: "प्लंबर", icon: Wrench, count: "7,300+ Verified", rate: "₹850 - ₹1100 / day" },
    { name: "Carpenters", hindi: "बढ़ई / कारपेंटर", icon: Hammer, count: "6,500+ Verified", rate: "₹950 - ₹1300 / day" },
    { name: "Painters", hindi: "पेंटर", icon: Paintbrush, count: "5,800+ Verified", rate: "₹800 - ₹1000 / day" },
    { name: "Welders & Fabricators", hindi: "वेल्डर", icon: Flame, count: "4,600+ Verified", rate: "₹950 - ₹1200 / day" },
    { name: "Bar Benders / Rebar", hindi: "सरिया कारीगर", icon: Drill, count: "6,100+ Verified", rate: "₹850 - ₹1100 / day" },
    { name: "Construction Helpers", hindi: "हेल्पर / बेलदार", icon: HardHat, count: "25,000+ Verified", rate: "₹550 - ₹750 / day" },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-[#0C59D4] uppercase tracking-wider bg-blue-100/70 px-3 py-1 rounded-full">
              Verified Skill Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Popular Daily Wage Trades
            </h2>
          </div>
          <Link
            href="/business"
            className="mt-4 md:mt-0 text-sm font-bold text-[#0C59D4] hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>View all 32+ construction trades</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0C59D4] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {cat.hindi}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    {cat.count}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {cat.rate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
