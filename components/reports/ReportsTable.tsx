import { Report } from "@/types/report";
import ReportStatusBadge from "./ReportStatusBadge";
import ReportActions from "./ReportActions";

export default function ReportsTable({ reports }: { reports: Report[] }) {
  return (
    <div className="overflow-x-auto border border-neutral-800 rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-900">
          <tr>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Reason</th>
            <th className="px-4 py-2">Severity</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reports.map(r => (
            <tr key={r.id} className="border-t border-neutral-800">
              <td className="px-4 py-2 text-center">{r.type}</td>
              <td className="px-4 py-2">{r.reason}</td>
              <td className="px-4 py-2 text-center">{r.severity}</td>
              <td className="px-4 py-2 text-center">
                <ReportStatusBadge status={r.status} />
              </td>
              <td className="px-4 py-2 text-center">{r.createdAt}</td>
              <td className="px-4 py-2 text-center">
                <ReportActions reportId={r.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
