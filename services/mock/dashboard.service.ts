import { DashboardStats, ChartPoint } from "@/types/dashboard";

export async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise(res => setTimeout(res, 500));
  return {
    totalUsers: 124530,
    dau: 18340,
    mau: 78210,
    revenue: 45230,
  };
}

export async function getUserGrowth(): Promise<ChartPoint[]> {
  return [
    { label: "Mon", value: 120 },
    { label: "Tue", value: 210 },
    { label: "Wed", value: 180 },
    { label: "Thu", value: 260 },
    { label: "Fri", value: 300 },
    { label: "Sat", value: 280 },
    { label: "Sun", value: 350 },
  ];
}

export async function getRevenueData(): Promise<ChartPoint[]> {
  return [
    { label: "Jan", value: 12000 },
    { label: "Feb", value: 18000 },
    { label: "Mar", value: 24000 },
    { label: "Apr", value: 32000 },
  ];
}
