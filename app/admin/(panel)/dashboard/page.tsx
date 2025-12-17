import RequirePermission from "@/components/admin/RequirePermission";
import StatCard from "@/components/dashboard/StatCard";
import LineChart from "@/components/dashboard/LineChart";
import BarChart from "@/components/dashboard/BarChart";
import Filters from "@/components/dashboard/Filters";
import {
  getDashboardStats,
  getUserGrowth,
  getRevenueData,
} from "@/services/mock/dashboard.service";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const growth = await getUserGrowth();
  const revenue = await getRevenueData();

  return (
    <RequirePermission permission="dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Filters />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={stats.totalUsers} />
          <StatCard label="DAU" value={stats.dau} />
          <StatCard label="MAU" value={stats.mau} />
          <StatCard label="Revenue" value={`$${stats.revenue}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LineChart data={growth} />
          <BarChart data={revenue} />
        </div>
      </div>
    </RequirePermission>
  );
}
