"use client";

import { setCookie } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function TwoFactor() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus next input
  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;

    setLoading(true);

    // Simulate Check
    await new Promise((r) => setTimeout(r, 1000));

    if (code === "123456") {
      setCookie("admin_2fa", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid Code"); // Ideally use the error state UI from login page
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
          <ShieldCheck className="w-8 h-8 text-green-500" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Two-Factor Authentication
        </h2>
        <p className="text-neutral-400 text-sm mb-8">
          We've sent a 6-digit verification code to <br />
          <span className="text-neutral-200 font-medium">
            admin@company.com
          </span>
        </p>

        <form onSubmit={verify}>
          <div className="flex justify-center gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-12 sm:w-12 sm:h-14 bg-neutral-950 border border-neutral-800 rounded-lg text-center text-xl font-bold text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            ))}
          </div>

          <button
            disabled={loading || otp.join("").length !== 6}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify & Login"}
          </button>
        </form>

        <p className="mt-6 text-xs text-neutral-500">
          Didn't receive code?{" "}
          <button className="text-indigo-400 hover:text-indigo-300 font-medium">
            Resend in 30s
          </button>
        </p>
      </motion.div>
    </div>
  );
}
