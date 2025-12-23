"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleProps {
  enabled: boolean;
  onChange: (state: boolean) => void;
}

const Toggle = ({ enabled, onChange }: ToggleProps) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
        enabled ? "bg-indigo-600" : "bg-zinc-700"
      )}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-4 h-4 bg-white rounded-full shadow-lg"
      />
    </button>
  );
};

export default Toggle;
