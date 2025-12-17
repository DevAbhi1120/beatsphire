"use client";

export default function ReportActions({ reportId }: { reportId: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <button className="text-green-400 hover:underline">
        Resolve
      </button>
      <button className="text-gray-400 hover:underline">
        Dismiss
      </button>
      <button className="text-red-400 hover:underline">
        Escalate
      </button>
    </div>
  );
}
