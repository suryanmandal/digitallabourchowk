"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Users, Phone, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  workers: string;
  count: string;
  timestamp: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

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
              <span>JSON / MERN DB Ready</span>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Active Regions
            </div>
            <div className="text-sm font-bold text-slate-800 mt-1">Delhi NCR, UP, Haryana</div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-100/80 text-slate-700 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">ID / Name</th>
                  <th className="py-4 px-6">Phone Number</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Trades Needed</th>
                  <th className="py-4 px-6">Team Size</th>
                  <th className="py-4 px-6">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No leads captured yet. Submit the worker booking form on the home page to test!
                    </td>
                  </tr>
                ) : (
                  leads.map((lead, i) => (
                    <tr key={lead.id || i} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{lead.id}</div>
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
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#0C59D4] font-bold text-xs inline-block">
                          {lead.workers}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs font-semibold text-slate-600">
                        {lead.count}
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
