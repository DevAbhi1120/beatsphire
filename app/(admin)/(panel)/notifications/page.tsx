import RequirePermission from "@/components/admin/RequirePermission";
import CampaignForm from "@/components/notifications/CampaignForm";
import CampaignTable from "@/components/notifications/CampaignTable";
import { getCampaigns } from "@/services/mock/notifications.service";

export default async function NotificationsPage() {
  const campaigns = await getCampaigns();

  return (
    <RequirePermission permission="config">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Notifications & Campaigns</h1>

        <CampaignForm />
        <CampaignTable campaigns={campaigns} />
      </div>
    </RequirePermission>
  );
}
