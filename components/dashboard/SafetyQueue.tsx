"use client";
import { ShieldAlert, CheckCircle, XCircle, UserCheck } from "lucide-react";

const QUEUE = [
  {
    id: 1,
    user: "Alex_Vibe",
    reason: "Deepfake Detection",
    confidence: "98%",
    time: "2m ago",
  },
  {
    id: 2,
    user: "DJ_Neon",
    reason: "Toxicity in Room #4",
    confidence: "84%",
    time: "5m ago",
  },
];

export default function SafetyQueue() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white flex items-center gap-2">
          <ShieldAlert size={18} className="text-amber-500" />
          AI Safety Queue
        </h3>
        <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full font-bold">
          4 PENDING
        </span>
      </div>

      <div className="space-y-3">
        {QUEUE.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                <UserCheck size={20} className="text-zinc-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{item.user}</p>
                <p className="text-[10px] text-zinc-500">
                  {item.reason} •{" "}
                  <span className="text-amber-500">
                    {item.confidence} match
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-emerald-500/10 text-emerald-500 transition-colors rounded-lg">
                <CheckCircle size={18} />
              </button>
              <button className="p-2 hover:bg-rose-500/10 text-rose-500 transition-colors rounded-lg">
                <XCircle size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
