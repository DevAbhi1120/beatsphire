"use client";
import { motion } from "framer-motion";
import { ChartPoint } from "@/types/dashboard";

export default function GrowthChart({ data }: { data: ChartPoint[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <h3 className="font-semibold text-white mb-8">User Growth</h3>
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((p, i) => (
          <div
            key={p.label}
            className="flex-1 flex flex-col items-center gap-3 group"
          >
            <div className="relative w-full flex flex-col items-center">
              {/* Tooltip on Hover */}
              <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[10px] font-bold px-2 py-1 rounded pointer-events-none">
                {p.value}
              </div>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(p.value / maxValue) * 100}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="w-full max-w-[32px] bg-zinc-800 group-hover:bg-indigo-500 transition-colors rounded-t-md relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
              </motion.div>
            </div>
            <span className="text-[10px] text-zinc-500 font-medium uppercase">
              {p.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
