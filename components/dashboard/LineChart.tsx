"use client";

import { ChartPoint } from "@/types/dashboard";

export default function LineChart({ data }: { data: ChartPoint[] }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
      <h3 className="text-sm text-gray-400 mb-2">User Growth</h3>
      <div className="flex items-end gap-2 h-32">
        {data.map((p) => (
          <div key={p.label} className="flex-1 text-center">
            <div
              className="bg-blue-500 rounded"
              style={{ height: `${p.value / 4}px` }}
            />
            <span className="text-xs text-gray-500">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
