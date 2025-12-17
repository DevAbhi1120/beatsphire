import { NotificationCampaign } from "@/types/notification";
import CampaignStatusBadge from "./CampaignStatusBadge";

export default function CampaignTable({
  campaigns,
}: {
  campaigns: NotificationCampaign[];
}) {
  return (
    <div className="border border-neutral-800 rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-900">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Platform</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Scheduled</th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map(c => (
            <tr key={c.id} className="border-t border-neutral-800">
              <td className="px-4 py-2">{c.title}</td>
              <td className="px-4 py-2 text-center">{c.platform}</td>
              <td className="px-4 py-2 text-center">
                <CampaignStatusBadge status={c.status} />
              </td>
              <td className="px-4 py-2 text-center">
                {c.scheduledAt || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
