import { FeatureConfig } from "@/types/config";

export async function getFeatureConfigs(): Promise<FeatureConfig[]> {
  await new Promise(res => setTimeout(res, 400));

  return [
    {
      id: "f1",
      key: "NEW_MATCH_ALGO",
      description: "Enable new dating match algorithm",
      enabled: true,
      platform: "ALL",
    },
    {
      id: "f2",
      key: "MUSIC_DISCOVERY_V2",
      description: "New music discovery experience",
      enabled: false,
      platform: "iOS",
      minVersion: "2.3.0",
    },
    {
      id: "f3",
      key: "CHAT_MEDIA_SHARING",
      description: "Allow image & audio sharing in chat",
      enabled: true,
      platform: "ANDROID",
      minVersion: "3.1.0",
    },
  ];
}
