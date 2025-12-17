import {
  FunnelStep,
  RetentionRow,
  PlatformMetric,
} from "@/types/analytics";

export async function getFunnel(): Promise<FunnelStep[]> {
  return [
    { step: "Signup", users: 100000 },
    { step: "Profile Completed", users: 72000 },
    { step: "First Match", users: 43000 },
    { step: "First Chat", users: 28000 },
    { step: "Music Played", users: 19000 },
  ];
}

export async function getRetention(): Promise<RetentionRow[]> {
  return [
    { cohort: "Jan 2024", day1: 62, day7: 38, day30: 19 },
    { cohort: "Feb 2024", day1: 65, day7: 41, day30: 22 },
    { cohort: "Mar 2024", day1: 68, day7: 45, day30: 26 },
  ];
}

export async function getPlatformSplit(): Promise<PlatformMetric[]> {
  return [
    { platform: "iOS", users: 58000 },
    { platform: "Android", users: 67000 },
  ];
}
