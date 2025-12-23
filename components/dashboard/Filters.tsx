"use client";
import { Calendar, Download, Filter } from "lucide-react";

export default function Filters() {
  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5">
        <Calendar size={14} className="text-zinc-500" />
        <select className="bg-transparent text-sm text-zinc-300 outline-none cursor-pointer">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors">
        <Filter size={18} />
      </button>

      <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
        <Download size={16} />
        <span className="hidden md:block">Export</span>
      </button>
    </div>
  );
}
