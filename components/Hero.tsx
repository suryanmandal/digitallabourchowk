"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-blue-50/40 via-white to-white">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0C59D4] text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#0C59D4] animate-ping" />
              <span>INDIA'S TRUSTED CONSTRUCTION WORKFORCE PLATFORM</span>
            </div>

            {/* Big Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Hire Verified <br />
              <span className="text-slate-900">Construction Workforce,</span> <br />
              <span className="text-[#0C59D4]">Faster.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              <strong className="text-slate-900 font-semibold">Digital Labour Chowk</strong> connects workers, contractors, and companies on one trusted platform—making workforce discovery, hiring, and job opportunities faster and easier.
            </p>

            {/* 3 User-Category Action CTA Buttons */}
            <div className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* For Businesses */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-400 hover:shadow-md transition">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    For Businesses
                  </div>
                  <Link
                    href="/onboarding"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0C59D4] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    <span>Find Contractors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* For Contractors */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-400 hover:shadow-md transition">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    For Contractors
                  </div>
                  <Link
                    href="/business"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0C59D4] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    <span>Find Workers / Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* For Workers */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-400 hover:shadow-md transition">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    For Workers
                  </div>
                  <Link
                    href="/worker"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0C59D4] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    <span>Find Verified Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

            {/* Trust Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Aadhaar & Skill Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant Daily Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Transparent Daily Wages</span>
              </div>
            </div>

          </div>

          {/* Right Column: Exact High-Res Infographic Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <img
                src="/images/hero-infographic.png"
                alt="Digital Labour Chowk Platform - Workforce, Contractors, and Companies Connected"
                fetchPriority="high"
                width={1024}
                height={791}
                className="w-full h-auto object-contain drop-shadow-xl hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
