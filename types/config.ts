export type Platform = "ALL" | "iOS" | "ANDROID";

export interface FeatureConfig {
  id: string;
  key: string;
  description: string;
  enabled: boolean;
  platform: Platform;
  minVersion?: string;
}
