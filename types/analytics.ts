export interface FunnelStep {
  step: string;
  users: number;
}

export interface RetentionRow {
  cohort: string;
  day1: number;
  day7: number;
  day30: number;
}

export interface PlatformMetric {
  platform: "iOS" | "Android";
  users: number;
}
