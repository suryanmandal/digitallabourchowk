"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Users, Phone, MapPin, Calendar, CheckCircle2, Download, Search, Tag, MessageSquare } from "lucide-react";

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
    return (
      (lead.name || "").toLowerCase().includes(q) ||
      (lead.mobile || "").toLowerCase().includes(q) ||
      (lead.email || "").toLowerCase().includes(q) ||
      (lead.city || "").toLowerCase().includes(q) ||
      (lead.source || "").toLowerCase().includes(q) ||
      (lead.workers || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Real-Time CRM Records
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900">
              Customer Leads & Booking Requests
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm hover:bg-emerald-700 transition disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm hover:bg-slate-50 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0C59D4] text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>

        {/* Counter Metric */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Total Captured Leads
            </div>
            <div className="text-3xl font-black text-[#0C59D4]">{leads.length}</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Backend Storage
            </div>
            <div className="text-sm font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>leads.json + Webhook Ready</span>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Active Regions
            </div>
            <div className="text-sm font-bold text-slate-800 mt-1">Delhi NCR, UP, Haryana</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, phone, city or trade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0C59D4]/20 focus:border-[#0C59D4] transition"
            />
          </div>
          {search && (
            <div className="text-xs font-medium text-slate-500">
              Showing {filteredLeads.length} of {leads.length} results
            </div>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-100/80 text-slate-700 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">ID / Name</th>
                  <th className="py-4 px-6">Contact Info</th>
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
                      {leads.length === 0 ? "No leads captured yet. Submit any form on the website to test!" : "No leads match your search query."}
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead, i) => (
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
                        <a
                          href={`tel:${lead.mobile}`}
                          className="font-bold text-emerald-600 hover:underline flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>+91 {lead.mobile}</span>
                        </a>
                        {lead.email && (
                          <div className="text-xs text-slate-400">{lead.email}</div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          {lead.city}
                        </span>
                      </td>
                      <td className="py-4 px-6 max-w-xs">
                        <div className="space-y-1">
                          <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#0C59D4] font-bold text-xs inline-block">
                            {lead.workers}
                          </span>
                          {lead.message && (
                            <div className="text-xs text-slate-500 line-clamp-2 mt-1" title={lead.message}>
                              💬 {lead.message}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs font-semibold text-slate-600">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                          {lead.source || "Website"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-400">
                        {lead.timestamp}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
