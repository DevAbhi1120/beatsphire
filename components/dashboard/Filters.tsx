"use client";

export default function Filters() {
  return (
    <div className="flex gap-3">
      <select className="bg-neutral-900 border border-neutral-800 px-3 py-2 rounded text-sm">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 90 days</option>
      </select>

      <select className="bg-neutral-900 border border-neutral-800 px-3 py-2 rounded text-sm">
        <option>All Platforms</option>
        <option>iOS</option>
        <option>Android</option>
      </select>
    </div>
  );
}
