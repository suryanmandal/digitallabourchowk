"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Digital Labour Chowk"
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Digital Labour Chowk is India’s premier construction workforce platform connecting civil contractors, enterprise builders, and daily wage workers with verified digital identities and fair market wages.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Noida, Uttar Pradesh & Delhi NCR, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@digitallabourchowk.com" className="hover:text-white">
                  info@digitallabourchowk.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Toll-Free Helpline: 1800-123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/about-us" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/business" className="hover:text-white transition">Business & Developers</Link></li>
              <li><Link href="/worker" className="hover:text-white transition">Worker Jobs Portal</Link></li>
              <li><Link href="/projects" className="hover:text-white transition">Projects</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition">Blog & Construction News</Link></li>
            </ul>
          </div>

          {/* Stakeholders */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/onboarding" className="hover:text-white transition">Sign Up / Login</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact DLC Team</Link></li>
              <li><Link href="/for-collaboration" className="hover:text-white transition">Media & Partnerships</Link></li>
              <li><Link href="/admin/leads" className="hover:text-blue-400 transition font-bold">Admin Leads Dashboard</Link></li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.digitallabourchowk.worker"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white"
                >
                  <span>Worker App (Google Play)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.digitallabourchowk.business"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white"
                >
                  <span>Contractor App (Google Play)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Accreditations */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Trust & Compliance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering 100,000+ construction laborers with digital identity, daily wage transparency, and worker safety initiatives across India.
            </p>
            <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <span>✓ Recognized Startup India initiative</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Digital Labour Chowk. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
