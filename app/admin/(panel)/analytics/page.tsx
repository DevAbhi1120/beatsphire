import RequirePermission from "@/components/admin/RequirePermission";
import FunnelChart from "@/components/analytics/FunnelChart";
import RetentionTable from "@/components/analytics/RetentionTable";
import PlatformBreakdown from "@/components/analytics/PlatformBreakdown";
import {
  getFunnel,
  getRetention,
  getPlatformSplit,
} from "@/services/mock/analytics.service";

export default async function AnalyticsPage() {
  const funnel = await getFunnel();
  const retention = await getRetention();
  const platforms = await getPlatformSplit();

  return (
    <RequirePermission permission="analytics">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Advanced Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FunnelChart steps={funnel} />
          <PlatformBreakdown data={platforms} />
        </div>

        <RetentionTable rows={retention} />
      </div>
    </RequirePermission>
  );
}
