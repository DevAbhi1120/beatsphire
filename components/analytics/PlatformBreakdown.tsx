import { PlatformMetric } from "@/types/analytics";

export default function PlatformBreakdown({
  data,
}: {
  data: PlatformMetric[];
}) {
  const total = data.reduce((s, d) => s + d.users, 0);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Platform Split</h3>

      {data.map(d => (
        <div key={d.platform} className="mb-2">
          <div className="flex justify-between text-sm">
            <span>{d.platform}</span>
            <span>{Math.round((d.users / total) * 100)}%</span>
          </div>
          <div
            className="h-2 bg-green-600 rounded"
            style={{ width: `${(d.users / total) * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}
