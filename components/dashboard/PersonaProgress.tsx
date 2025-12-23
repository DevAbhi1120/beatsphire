"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  value: number;
  color: string;
}

export default function PersonaProgress({ label, value, color }: Props) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
        <span className="text-zinc-400">{label}</span>
        <span className="text-white">{value}%</span>
      </div>

      <div className="h-1.5 w-full bg-white/5 rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}
