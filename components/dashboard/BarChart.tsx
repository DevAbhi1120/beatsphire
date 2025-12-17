"use client";

import { ChartPoint } from "@/types/dashboard";

export default function BarChart({ data }: { data: ChartPoint[] }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
      <h3 className="text-sm text-gray-400 mb-2">Revenue</h3>
      <div className="space-y-2">
        {data.map((p) => (
          <div key={p.label} className="flex items-center gap-2">
            <span className="w-10 text-xs text-gray-400">{p.label}</span>
            <div
              className="bg-green-500 h-3 rounded"
              style={{ width: `${p.value / 400}px` }}
            />
            <span className="text-xs">${p.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
