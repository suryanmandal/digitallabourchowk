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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length === 12 && val.startsWith("91")) {
      val = val.slice(2);
    } else if (val.length === 11 && val.startsWith("0")) {
      val = val.slice(1);
    }
    setPhone(val.slice(0, 10));
  };

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
            <form id="dlcOnboardingForm" onSubmit={handleSendOtp} noValidate className="space-y-4">
              <div>
                <label htmlFor="onboardingPhone" className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Mobile Number
                </label>
                <div className="dlc-phone-input-group">
                  <div className="dlc-phone-prefix">
                    <span className="text-base leading-none">🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    id="onboardingPhone"
                    name="phone"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter 10-digit number"
                    className="dlc-phone-input-field"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phone.length !== 10}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0C59D4] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Send OTP Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form id="dlcVerifyForm" onSubmit={handleVerify} noValidate className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="onboardingOtp" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Enter 4-Digit OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtp(""); }}
                    className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Change Number
                  </button>
                </div>
                <input
                  type="text"
                  id="onboardingOtp"
                  name="otp"
                  inputMode="numeric"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="• • • •"
                  className="dlc-otp-input-field"
                />
                <p className="text-[12px] text-slate-500 mt-2 text-center">
                  OTP sent to <strong>+91 {phone}</strong> (Use <strong>1234</strong> for testing)
                </p>
              </div>

              <button
                type="submit"
                disabled={otp.length < 4}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-98"
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
