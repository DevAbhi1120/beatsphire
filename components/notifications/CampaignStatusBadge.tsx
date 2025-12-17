import { CampaignStatus } from "@/types/notification";

const COLORS: Record<CampaignStatus, string> = {
  DRAFT: "bg-gray-600",
  SCHEDULED: "bg-yellow-600",
  SENT: "bg-green-600",
};

export default function CampaignStatusBadge({
  status,
}: {
  status: CampaignStatus;
}) {
  return (
    <span className={`px-2 py-1 text-xs rounded text-white ${COLORS[status]}`}>
      {status}
    </span>
  );
}
