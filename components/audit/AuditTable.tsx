import { AuditLog } from "@/types/audit";

export default function AuditTable({ logs }: { logs: AuditLog[] }) {
  return (
    <div className="overflow-x-auto border border-neutral-800 rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-900">
          <tr>
            <th className="px-4 py-2 text-left">Admin</th>
            <th className="px-4 py-2 text-left">Action</th>
            <th className="px-4 py-2 text-left">Target</th>
            <th className="px-4 py-2 text-left">IP</th>
            <th className="px-4 py-2 text-left">Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map(log => (
            <tr key={log.id} className="border-t border-neutral-800">
              <td className="px-4 py-2">{log.adminEmail}</td>
              <td className="px-4 py-2 font-mono text-xs">
                {log.action}
              </td>
              <td className="px-4 py-2">
                {log.target || "—"}
              </td>
              <td className="px-4 py-2 text-gray-400">
                {log.ipAddress}
              </td>
              <td className="px-4 py-2 text-gray-400">
                {log.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
