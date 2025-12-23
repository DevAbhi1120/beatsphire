import RequirePermission from "@/components/admin/RequirePermission";

import StatCard from "@/components/dashboard/StatCard";
import GrowthChart from "@/components/dashboard/GrowthChart";
import BarChart from "@/components/dashboard/BarChart";
import Filters from "@/components/dashboard/Filters";
import MusicPulse from "@/components/dashboard/MusicPulse";
import SafetyQueue from "@/components/dashboard/SafetyQueue";
import CreatorRevenue from "@/components/dashboard/CreatorRevenue";
import PersonaProgress from "@/components/dashboard/PersonaProgress";

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
      <div className="mx-auto space-y-8  min-h-screen text-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              BeatSphire <span className="text-indigo-500">HQ</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              Monitoring the World’s First Music-Native Super-App.
            </p>
          </div>
          <Filters />
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Users"
            value={stats.totalUsers}
            trend="+8.2%"
          />
          <StatCard label="DAU" value={stats.dau} trend="+12.5%" />
          <StatCard label="MAU" value={stats.mau} trend="-2.4%" />
          <StatCard
            label="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            trend="+14.1%"
          />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <GrowthChart data={growth} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MusicPulse />
              <CreatorRevenue />
            </div>

            <BarChart data={revenue} />
          </div>

          {/* Right */}
          <div className="space-y-6">
            <SafetyQueue />

            {/* Persona Engagement */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-zinc-900 border border-indigo-500/20 rounded-2xl p-6">
              <h3 className="font-bold mb-4">Persona Engagement</h3>

              <div className="space-y-4">
                <PersonaProgress
                  label="Social (Instagram)"
                  value={85}
                  color="bg-pink-500"
                />
                <PersonaProgress
                  label="Dating (Tinder)"
                  value={62}
                  color="bg-rose-500"
                />
                <PersonaProgress
                  label="Creator (Patreon)"
                  value={24}
                  color="bg-indigo-500"
                />
                <PersonaProgress
                  label="Anonymous (Discord)"
                  value={41}
                  color="bg-zinc-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequirePermission>
  );
}
