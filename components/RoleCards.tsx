"use client";

import React from "react";
import Link from "next/link";
import { Building2, HardHat, Users, CheckCircle2, ArrowRight } from "lucide-react";

export default function RoleCards() {
  const roles = [
    {
      title: "B2B Companies & Developers",
      badge: "Enterprise Workforce",
      icon: Building2,
      color: "from-blue-600 to-indigo-700",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
      description: "Scale your construction sites with pre-vetted subcontractor teams, safety-certified masons, and bulk manpower with full compliance.",
      features: [
        "Bulk daily workforce deployment (50+ to 500+ workers)",
        "Zero disruption guarantee & replacement within 2 hours",
        "GST compliant digital invoicing & wage records",
        "Multi-city project tracking on dedicated portal"
      ],
      ctaText: "Explore B2B Solutions",
      ctaHref: "/business"
    },
    {
      title: "Contractors & Builders",
      badge: "Fast Daily Dispatch",
      icon: HardHat,
      color: "from-amber-500 to-orange-600",
      accentBg: "bg-amber-50 text-amber-700 border-amber-200",
      description: "Never suffer idle site delays. Book reliable skilled tradesmen and helpers within 15 minutes right from your phone.",
      features: [
        "15-minute worker matching algorithm",
        "Aadhaar-verified laborers with verified experience",
        "Transparent, standard local chowk wage rates",
        "Direct call & WhatsApp dispatch coordination"
      ],
      ctaText: "Find Workers Now",
      ctaHref: "/business"
    },
    {
      title: "Blue-Collar Workers",
      badge: "Dignity & Fair Wages",
      icon: Users,
      color: "from-emerald-500 to-teal-700",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description: "Stop standing at roadside chowks in the heat. Create your verified digital worker profile and receive daily job calls directly.",
      features: [
        "100% Free registration — 0% commission deducted",
        "Direct wage payment daily from verified contractors",
        "Rozgar DLC Digital Identity Card with QR code",
        "Insurance assistance & safety gear programs"
      ],
      ctaText: "Worker Registration",
      ctaHref: "/worker"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0C59D4] text-xs font-bold uppercase tracking-wider">
            All-In-One Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Every Stakeholder in Construction
          </h2>
          <p className="text-base text-slate-600">
            Digital Labour Chowk unifies project owners, civil contractors, and skilled daily-wage artisans into one transparent, reliable marketplace.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className="flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${role.accentBg}`}>
                      {role.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0C59D4] transition-colors">
                    {role.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {role.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {role.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={role.ctaHref}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-[#0C59D4] text-white font-bold text-sm shadow-sm transition duration-200"
                >
                  <span>{role.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
