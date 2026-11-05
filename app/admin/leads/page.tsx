"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Users,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  Download,
  Search,
  Tag,
  MessageSquare,
  MessageCircle,
  Filter,
  ArrowUpRight,
  Table2,
  ExternalLink
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  workers: string;
  count: string;
  company?: string;
  company_type?: string;
  subject?: string;
  message?: string;
  source?: string;
  timestamp: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const downloadCSV = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Name", "Mobile", "Email", "City", "Source", "Subject/Role", "Company", "Message", "Timestamp"];
    const rows = leads.map((l) => [
      `"${l.id || ""}"`,
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${l.mobile || ""}"`,
      `"${l.email || ""}"`,
      `"${l.city || ""}"`,
      `"${l.source || ""}"`,
      `"${(l.workers || l.subject || "").replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`,
      `"${l.timestamp || ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DLC_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchesSearch =
      (lead.name || "").toLowerCase().includes(q) ||
      (lead.mobile || "").toLowerCase().includes(q) ||
      (lead.email || "").toLowerCase().includes(q) ||
      (lead.city || "").toLowerCase().includes(q) ||
      (lead.source || "").toLowerCase().includes(q) ||
      (lead.workers || "").toLowerCase().includes(q) ||
      (lead.company || "").toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (sourceFilter === "all") return true;
    return (lead.source || "").toLowerCase().includes(sourceFilter.toLowerCase());
  });

  return (
    <div className="admin-content-inner">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Real-Time CRM Records
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Customer Leads & Booking Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Capture, organize, and follow up directly with inbound client inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://docs.google.com/spreadsheets/d/1xK1XkGM1iNrHPjqhWv7k0Eec3qERIMOO_StaCqcYw1Y/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-xs sm:text-sm font-bold shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Table2 className="w-4 h-4 text-emerald-600" />
            <span>Open Google Sheet</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
          <button
            onClick={downloadCSV}
            disabled={leads.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md hover:bg-emerald-700 transition disabled:opacity-50 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold shadow-xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Total Captured Leads
          </div>
          <div className="text-3xl font-black text-[#0C59D4]">{leads.length}</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Backend Persistence
          </div>
          <div className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 mt-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>leads.json + Webhook Enabled</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Direct CRM Outreach
          </div>
          <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-2">
            <MessageCircle className="w-4 h-4 text-green-500" />
            <span>1-Click WhatsApp Follow-up</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, phone, city, or trade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0C59D4]/20 focus:border-[#0C59D4] transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {["all", "contact", "project", "booking"].map((f) => (
            <button
              key={f}
              onClick={() => setSourceFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize ${
                sourceFilter === f
                  ? "bg-[#0C59D4] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f === "all" ? "All Leads" : f}
            </button>
          ))}
          {search && (
            <div className="text-xs font-medium text-slate-500 ml-2">
              Showing {filteredLeads.length} of {leads.length}
            </div>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50/80 text-slate-700 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6">ID / Name</th>
                <th className="py-4 px-6">Contact & Outreach</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Details / Role</th>
                <th className="py-4 px-6">Source</th>
                <th className="py-4 px-6">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    {leads.length === 0
                      ? "No leads captured yet. Submit any form on the website to test!"
                      : "No leads match your search query."}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, i) => {
                  const cleanPhone = lead.mobile.replace(/\D/g, "");
                  const waMessage = `Hello ${lead.name}, this is Digital Labour Chowk team following up on your request. How can we assist you with your workforce requirements?`;
                  const waLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(waMessage)}`;

                  return (
                    <tr key={lead.id || i} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{lead.id}</div>
                        {lead.company && (
                          <div className="text-[11px] font-semibold text-slate-600 mt-0.5">
                            🏢 {lead.company} {lead.company_type ? `(${lead.company_type})` : ""}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${lead.mobile}`}
                            className="font-bold text-slate-800 hover:text-[#0C59D4] flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>+91 {lead.mobile}</span>
                          </a>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500 hover:bg-green-600 text-white rounded-md text-[11px] font-bold shadow-2xs transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WA</span>
                          </a>
                        </div>
                        {lead.email && (
                          <div className="text-xs text-slate-400 mt-0.5">{lead.email}</div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          <span>{lead.city || "Not Specified"}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-800 text-xs">
                          {lead.workers || lead.subject || "General Inquiry"}
                        </div>
                        {lead.count && (
                          <div className="text-[11px] text-slate-500">
                            Required: <span className="font-bold text-slate-700">{lead.count} workers</span>
                          </div>
                        )}
                        {lead.message && (
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 italic">
                            "{lead.message}"
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0C59D4]">
                          <Tag className="w-3 h-3" />
                          <span>{lead.source || "Website"}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500 text-xs font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : "Just now"}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {lead.timestamp ? new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
