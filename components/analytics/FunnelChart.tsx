import { FunnelStep } from "@/types/analytics";

export default function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Conversion Funnel</h3>

      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={s.step}>
            <div className="flex justify-between text-sm">
              <span>{s.step}</span>
              <span>{s.users.toLocaleString()}</span>
            </div>
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${100 - i * 12}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
