import { NotificationCampaign } from "@/types/notification";

export async function getCampaigns(): Promise<NotificationCampaign[]> {
  return [
    {
      id: "n1",
      title: "New Matches Waiting 💘",
      message: "You have new matches waiting for you!",
      platform: "ALL",
      status: "SENT",
    },
    {
      id: "n2",
      title: "Discover New Music 🎵",
      message: "Check out trending playlists now",
      platform: "iOS",
      status: "SCHEDULED",
      scheduledAt: "2024-03-10 18:00",
    },
  ];
}
