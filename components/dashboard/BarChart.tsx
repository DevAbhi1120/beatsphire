"use client";
import { motion } from "framer-motion";
import { ChartPoint } from "@/types/dashboard";

export default function BarChart({ data }: { data: ChartPoint[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-white">Monthly Revenue</h3>
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
          In USD
        </span>
      </div>

      <div className="space-y-4">
        {data.map((p, i) => (
          <div key={p.label} className="space-y-1 group">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
                {p.label}
              </span>
              <span className="text-zinc-500 font-mono">
                ${p.value.toLocaleString()}
              </span>
            </div>
            <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(p.value / maxValue) * 100}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
