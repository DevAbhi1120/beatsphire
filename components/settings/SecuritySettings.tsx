"use client";
import React, { useState } from "react";
import Section from "../UI/Section";
import { Shield, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import CheckItem from "../UI/CheckItem";
import { motion } from "framer-motion";

const SecuritySettings = () => {
  // 1. State Management
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isSetupLoading, setIsSetupLoading] = useState(false);

  const [policy, setPolicy] = useState({
    requireSymbols: true,
    minLength: true,
    periodicReset: false,
  });

  // 2. Handlers
  const handleToggle2FA = () => {
    setIsSetupLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setIs2FAEnabled(!is2FAEnabled);
      setIsSetupLoading(false);
    }, 1200);
  };

  const updatePolicy = (key: keyof typeof policy) => {
    setPolicy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Two-Factor Authentication Section */}
      <Section
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your admin account using TOTP."
      >
        <div
          className={`mt-4 p-5 border rounded-2xl flex flex-col md:flex-row items-center gap-5 transition-all duration-300 ${
            is2FAEnabled
              ? "bg-emerald-500/5 border-emerald-500/20"
              : "bg-indigo-500/5 border-zinc-800"
          }`}
        >
          <div
            className={`p-3 rounded-xl transition-colors ${
              is2FAEnabled
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-indigo-500/10 text-indigo-400"
            }`}
          >
            {is2FAEnabled ? <ShieldCheck size={32} /> : <Shield size={32} />}
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-white font-semibold flex items-center justify-center md:justify-start gap-2">
              Protect your account
              {is2FAEnabled && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  Recommended
                </span>
              )}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Currently status:{" "}
              <span
                className={
                  is2FAEnabled
                    ? "text-emerald-500 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                {is2FAEnabled ? "Enabled" : "Disabled"}
              </span>
            </p>
          </div>

          <button
            disabled={isSetupLoading}
            onClick={handleToggle2FA}
            className={`min-w-[120px] flex items-center justify-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 ${
              is2FAEnabled
                ? "bg-zinc-800 text-white hover:bg-zinc-700"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            {isSetupLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : is2FAEnabled ? (
              "Disable 2FA"
            ) : (
              "Enable 2FA"
            )}
          </button>
        </div>
      </Section>

      {/* Password Policy Section */}
      <Section
        title="Password Policy"
        description="Define the requirements for all administrator passwords."
      >
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
            <CheckItem
              label="Require symbols (@#$)"
              checked={policy.requireSymbols}
              onCheckedChange={() => updatePolicy("requireSymbols")}
            />
            <CheckItem
              label="Minimum 12 characters"
              checked={policy.minLength}
              onCheckedChange={() => updatePolicy("minLength")}
            />
            <CheckItem
              label="Require periodic reset (90 days)"
              checked={policy.periodicReset}
              onCheckedChange={() => updatePolicy("periodicReset")}
            />
          </div>

          {/* Quick Info / Tips Card */}
          <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex flex-col justify-center">
            <div className="flex items-center gap-3 text-indigo-400 mb-2">
              <ShieldAlert size={18} />
              <span className="text-sm font-bold">Security Tip</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Enforcing strong password policies significantly reduces the risk
              of brute-force attacks. We recommend combining symbols and a high
              minimum character count.
            </p>
          </div>
        </div>
      </Section>

      {/* Internal State Debug (Hidden in production) */}
      <div className="mt-6 text-[10px] text-zinc-700 font-mono">
        Policy Hash: {btoa(JSON.stringify(policy)).slice(0, 16)}
      </div>
    </div>
  );
};

export default SecuritySettings;
