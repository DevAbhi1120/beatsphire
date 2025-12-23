"use client";
import { motion } from "framer-motion";
import { Music2, Headphones, Radio } from "lucide-react";

const MOODS = [
  { name: "Energetic", count: "42k", color: "bg-yellow-400" },
  { name: "Melancholic", count: "12k", color: "bg-blue-400" },
  { name: "Chill", count: "89k", color: "bg-emerald-400" },
  { name: "Romantic", count: "65k", color: "bg-rose-400" },
];

export default function MusicPulse() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-white flex items-center gap-2">
            <Radio size={18} className="text-rose-500 animate-pulse" />
            Live Sonic Vibe
          </h3>
          <p className="text-xs text-zinc-500">Real-time mood distribution</p>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              className="w-7 h-7 rounded-full border-2 border-zinc-950"
              src={`https://i.pravatar.cc/100?img=${i + 10}`}
              alt="user"
            />
          ))}
          <div className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-[10px] font-bold">
            +12k
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MOODS.map((mood) => (
          <div
            key={mood.name}
            className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${mood.color}`} />
              <span className="text-xs font-medium text-zinc-300">
                {mood.name}
              </span>
            </div>
            <p className="text-lg font-bold text-white">{mood.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
