"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Card = ({ children, className }: any) => (
  <div
    className={cn(
      "bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden",
      className
    )}
  >
    {children}
  </div>
);

export const SettingsSection = ({ title, description, children }: any) => (
  <div className="space-y-4 mb-10">
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
    {children}
  </div>
);

export const Input = (props: any) => (
  <input
    {...props}
    className={cn(
      "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all",
      props.className
    )}
  />
);

export const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={cn(
      "w-11 h-6 rounded-full transition-colors relative flex items-center px-1",
      enabled ? "bg-indigo-600" : "bg-zinc-700"
    )}
  >
    <motion.div
      animate={{ x: enabled ? 20 : 0 }}
      className="w-4 h-4 bg-white rounded-full shadow-sm"
    />
  </button>
);
