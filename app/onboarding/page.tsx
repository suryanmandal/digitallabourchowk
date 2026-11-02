"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, HardHat, User, ArrowRight, ShieldCheck, Phone, Lock } from "lucide-react";

export default function OnboardingPage() {
  const [role, setRole] = useState<"contractor" | "worker" | "business">("contractor");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setOtpSent(true);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      setSuccess(true);
    }
  };

  return (
    <div className="py-16 bg-slate-50 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/images/logo.png"
                alt="Digital Labour Chowk"
                className="h-10 w-auto mx-auto object-contain"
              />
            </Link>
            <h1 className="text-2xl font-black text-slate-900">
              Welcome to Digital Labour Chowk
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Select your role to Sign Up or Login with Mobile OTP
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 mb-6">
            <button
              type="button"
              onClick={() => { setRole("contractor"); setOtpSent(false); setSuccess(false); }}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                role === "contractor" ? "bg-white text-[#0C59D4] shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>Contractor</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole("business"); setOtpSent(false); setSuccess(false); }}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                role === "business" ? "bg-white text-[#0C59D4] shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Enterprise</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole("worker"); setOtpSent(false); setSuccess(false); }}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                role === "worker" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Worker</span>
            </button>
          </div>

          {success ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Authentication Verified!</h3>
              <p className="text-xs text-slate-600">
                You have successfully signed in as <strong className="text-slate-900">{role.toUpperCase()}</strong>.
              </p>
              <Link
                href="/"
                className="inline-block mt-3 px-6 py-2.5 rounded-full bg-[#0C59D4] text-white font-bold text-xs shadow hover:bg-blue-700 transition"
              >
                Go to Dashboard / Homepage
              </Link>
            </div>
          ) : !otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-semibold">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 10-digit number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 text-sm font-medium focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phone.length !== 10}
                className="w-full py-3 px-4 rounded-xl bg-[#0C59D4] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>Send OTP Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Enter 4-Digit OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-[11px] font-bold text-blue-600 hover:underline"
                  >
                    Change Number
                  </button>
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold tracking-widest text-center focus:border-blue-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1 text-center">
                  OTP sent to +91 {phone} (Use 1234 for testing)
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Verify & Login</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
            By proceeding, you agree to our{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">Terms</Link> and{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">Privacy Policy</Link>.
          </div>

        </div>

      </div>
    </div>
  );
}
