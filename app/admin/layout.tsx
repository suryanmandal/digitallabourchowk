"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  ExternalLink,
  Globe,
  Menu,
  X,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Sparkles
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Leads & CRM",
      href: "/admin/leads",
      icon: Users,
      active: pathname === "/admin/leads",
    },
    {
      name: "Blog Management",
      href: "/admin/blogs",
      icon: FileText,
      active: pathname.startsWith("/admin/blogs"),
    },
  ];

  return (
    <div className="admin-page-wrapper">
      {/* Mobile Top App Bar */}
      <div className="admin-mobile-top-bar">
        <Link href="/admin" className="flex items-center gap-2.5">
          <img src="/favicon.png" alt="DLC Logo" className="w-8 h-8 rounded-lg bg-white p-1" />
          <div>
            <div className="text-sm font-black tracking-tight flex items-center gap-1.5">
              <span>Digital Labour Chowk</span>
              <span className="text-[10px] bg-[#0C59D4] text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Admin</span>
            </div>
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <aside
        className={`admin-desktop-sidebar ${
          mobileMenuOpen ? "!translate-x-0 !left-0" : "max-lg:-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Logo & Portal Identity */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link href="/admin" className="flex items-center gap-3">
              <img
                src="/favicon.png"
                alt="DLC Emblem"
                className="w-10 h-10 rounded-xl bg-white p-1.5 shadow-sm"
              />
              <div>
                <div className="font-extrabold text-base tracking-tight leading-tight flex items-center gap-1.5">
                  DLC Admin
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Command & Control Hub</div>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="mt-6 space-y-1.5">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Workspace Controls
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    item.active
                      ? "bg-[#0C59D4] text-white shadow-md shadow-blue-900/40"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${item.active ? "text-white" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.active && <ChevronRight className="w-4 h-4 text-blue-200" />}
                </Link>
              );
            })}
          </div>

          {/* Quick External Links Section */}
          <div className="mt-8 space-y-1.5 pt-6 border-t border-slate-800">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Company Portals
            </div>
            <a
              href="https://jobs.dlc.org.in/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Job Projects Hub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>View Public Site</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>
          </div>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 m-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0C59D4] to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">DLC Super Admin</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Online • Production Node
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Content Area */}
      <main className="admin-main-container">
        {children}
      </main>
    </div>
  );
}
