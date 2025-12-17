import { RetentionRow } from "@/types/analytics";

export default function RetentionTable({ rows }: { rows: RetentionRow[] }) {
  return (
    <div className="border border-neutral-800 rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-900">
          <tr>
            <th className="px-4 py-2">Cohort</th>
            <th className="px-4 py-2">Day 1</th>
            <th className="px-4 py-2">Day 7</th>
            <th className="px-4 py-2">Day 30</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.cohort} className="border-t border-neutral-800">
              <td className="px-4 py-2">{r.cohort}</td>
              <td className="px-4 py-2">{r.day1}%</td>
              <td className="px-4 py-2">{r.day7}%</td>
              <td className="px-4 py-2">{r.day30}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
