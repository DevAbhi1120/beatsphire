import RequirePermission from "@/components/admin/RequirePermission";
import AuditTable from "@/components/audit/AuditTable";
import { getAuditLogs } from "@/services/mock/audit.service";

export default async function LogsPage() {
  const logs = await getAuditLogs();

  return (
    <RequirePermission permission="logs">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          Audit Logs
        </h1>

        <p className="text-sm text-gray-400">
          All sensitive admin actions are recorded here.
        </p>

        <AuditTable logs={logs} />
      </div>
    </RequirePermission>
  );
}
