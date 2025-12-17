export type CampaignStatus = "DRAFT" | "SCHEDULED" | "SENT";

export interface NotificationCampaign {
  id: string;
  title: string;
  message: string;
  platform: "ALL" | "iOS" | "ANDROID";
  status: CampaignStatus;
  scheduledAt?: string;
}
