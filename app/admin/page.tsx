"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  TrendingUp,
  MessageCircle,
  Briefcase,
  ArrowUpRight,
  PlusCircle,
  RefreshCw,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  workers?: string;
  subject?: string;
  source?: string;
  timestamp: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "published" | "draft";
  date: string;
  views?: number;
}

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsRes, blogsRes] = await Promise.all([
        fetch("/api/leads").catch(() => null),
        fetch("/api/blogs").catch(() => null),
      ]);

      if (leadsRes && leadsRes.ok) {
        const leadsData = await leadsRes.json();
        if (leadsData.leads) setLeads(leadsData.leads);
      }

      if (blogsRes && blogsRes.ok) {
        const blogsData = await blogsRes.json();
        if (blogsData.blogs) setBlogs(blogsData.blogs);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Quick stats
  const totalLeads = leads.length;
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const recentLeads = leads.slice(0, 5);
  const recentBlogs = blogs.slice(0, 4);

  return (
    <div className="admin-content-inner">
      {/* Top Banner / Welcome Bar (DIV 1) */}
      <div className="admin-div-banner bg-gradient-to-r from-slate-900 via-[#0A1E3F] to-[#0C59D4] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-radial from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Digital Labour Chowk Central Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Platform Overview & Command Hub
            </h1>
            <p className="text-blue-100/80 text-sm max-w-2xl leading-relaxed">
              Monitor incoming customer leads, dispatch worker inquiries, manage industry blogs, and oversee company projects across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition backdrop-blur-md active:scale-95 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/admin/blogs?action=new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0C59D4] hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-lg transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Blog Post</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards (DIVS 2, 3, 4, 5) */}
      <div className="admin-div-kpi-grid">
        {/* Total Leads (DIV 2) */}
        <div className="admin-kpi-card bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Leads</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0C59D4] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalLeads}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              Active CRM
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Inquiries recorded from contact & projects
          </div>
          <Link
            href="/admin/leads"
            className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0C59D4] hover:text-blue-700"
          >
            <span>Open Leads CRM</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Total Blogs (DIV 3) */}
        <div className="admin-kpi-card bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Published Blogs</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{publishedBlogs}</span>
            <span className="text-xs text-slate-400 font-medium">/ {totalBlogs} total</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            SEO articles driving organic traffic
          </div>
          <Link
            href="/admin/blogs"
            className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 hover:text-emerald-700"
          >
            <span>Manage Blog Articles</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Company Projects (DIV 4) */}
        <div className="admin-kpi-card bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Jobs & Projects</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">Live</span>
            <span className="text-xs font-semibold text-emerald-600">jobs.dlc.org.in</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Active external recruitment & project portal
          </div>
          <a
            href="https://jobs.dlc.org.in/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            <span>Visit Projects Hub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* WhatsApp CRM Status (DIV 5) */}
        <div className="admin-kpi-card bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Outreach</span>
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">1-Click</span>
            <span className="text-xs font-semibold text-green-600">WhatsApp</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Instant client engagement with pre-filled chats
          </div>
          <Link
            href="/admin/leads"
            className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-green-600 hover:text-green-700"
          >
            <span>Engage Recent Leads</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid: Recent Leads & Recent Blogs (DIVS 6, 7) */}
      <div className="admin-div-dual-grid">
        
        {/* Recent Inquiries Card (DIV 6) */}
        <div className="admin-activity-card bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <h2 className="text-lg font-black text-slate-900">Latest Leads & Inquiries</h2>
              </div>
              <Link
                href="/admin/leads"
                className="text-xs font-bold text-[#0C59D4] hover:underline flex items-center gap-1"
              >
                <span>View All ({totalLeads})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-sm text-slate-400">Loading leads...</div>
            ) : recentLeads.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">No leads recorded yet.</div>
            ) : (
              <div className="divide-y divide-slate-100 mt-2">
                {recentLeads.map((lead) => {
                  const cleanPhone = lead.mobile.replace(/\D/g, "");
                  const waLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${lead.name}, thank you for reaching out to Digital Labour Chowk! We are following up regarding your request.`
                  )}`;

                  return (
                    <div key={lead.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 truncate">
                            {lead.name}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {lead.source || "Web"}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 font-mono">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {lead.mobile}
                          </span>
                          {lead.city && <span>• {lead.city}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition shadow-xs active:scale-95"
                          title="Message on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Real-time webhook sync enabled</span>
            <Link href="/admin/leads" className="font-bold text-[#0C59D4] hover:underline">
              Export to CSV →
            </Link>
          </div>
        </div>

        {/* Recent Blogs Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#0C59D4]" />
                <h2 className="text-lg font-black text-slate-900">Content & Blog Control</h2>
              </div>
              <Link
                href="/admin/blogs"
                className="text-xs font-bold text-[#0C59D4] hover:underline flex items-center gap-1"
              >
                <span>Manage All ({totalBlogs})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-sm text-slate-400">Loading blogs...</div>
            ) : recentBlogs.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">No blog articles yet.</div>
            ) : (
              <div className="divide-y divide-slate-100 mt-2">
                {recentBlogs.map((blog) => (
                  <div key={blog.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 truncate block">
                          {blog.title}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                        <span className="text-[11px] font-medium text-[#0C59D4] bg-blue-50 px-2 py-0.5 rounded">
                          {blog.category}
                        </span>
                        <span>{blog.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          blog.status === "published"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {blog.status}
                      </span>
                      <Link
                        href={`/admin/blogs?edit=${blog.id}`}
                        className="px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Syncs directly to public /blogs</span>
            <Link href="/admin/blogs?action=new" className="font-bold text-[#0C59D4] hover:underline">
              + Post New Article →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
