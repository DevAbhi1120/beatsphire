"use client";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  DollarSign,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, any> = {
  "Total Users": Users,
  DAU: Activity,
  MAU: Target,
  Revenue: DollarSign,
};

export default function StatCard({
  label,
  value,
  trend = "+12.5%",
}: {
  label: string;
  value: string | number;
  trend?: string;
}) {
  const Icon = ICONS[label] || Activity;
  const isPositive = trend.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400">
          <Icon size={20} />
        </div>
        <span
          className={cn(
            "text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1",
            isPositive
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-rose-500/10 text-rose-500"
          )}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-zinc-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-white mt-1 tracking-tight">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </div>
    </motion.div>
  );
}
