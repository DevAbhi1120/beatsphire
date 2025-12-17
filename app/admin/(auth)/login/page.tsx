"use client";

import { useRouter } from "next/navigation";
import { setCookie, setRole } from "@/lib/auth";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({ email: "", password: "" });

  const validate = () => {
    if (!formData.email.includes("@"))
      return "Please enter a valid email address.";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters.";
    return null;
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Simulate API Call
      await new Promise((r) => setTimeout(r, 1500));

      // Success Logic
      setCookie("admin_session", "pending_2fa"); // Don't fully log in yet
      setRole("SUPER_ADMIN"); // This should usually come from the backend
      router.push("/admin/two-factor");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl p-8 z-10"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-neutral-400 text-sm">
            Sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <Mail
                className="absolute left-3 top-3.5 text-neutral-500 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <input
                placeholder="Email Address"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-neutral-600"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-3 top-3.5 text-neutral-500 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <input
                placeholder="Password"
                type="password"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-neutral-600"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <a
              href="#"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In"
            )}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
