"use client";
import { motion } from "framer-motion";
import { DollarSign, Star, Users } from "lucide-react";

export default function CreatorRevenue() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <h3 className="font-bold text-white mb-6">Creator Economy</h3>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
              Global Payouts
            </p>
            <p className="text-3xl font-black text-white">$142,500</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-emerald-500 font-bold">+22% this week</p>
            <p className="text-[10px] text-zinc-600">from virtual gifts</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Tips", val: "40%", color: "bg-indigo-500" },
            { label: "Subs", val: "35%", color: "bg-violet-500" },
            { label: "Gifts", val: "25%", color: "bg-fuchsia-500" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${stat.color}`}
                  style={{ width: stat.val }}
                />
              </div>
              <p className="text-[9px] text-zinc-500 font-bold uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
