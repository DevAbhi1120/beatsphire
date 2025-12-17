import RequirePermission from "@/components/admin/RequirePermission";
import ReportsTable from "@/components/reports/ReportsTable";
import { getReports } from "@/services/mock/reports.service";

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <RequirePermission permission="reports">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Reports & Moderation</h1>
        <ReportsTable reports={reports} />
      </div>
    </RequirePermission>
  );
}
