import RequirePermission from "@/components/admin/RequirePermission";
import NotificationManager from "@/components/notifications/NotificationManager";

export default async function NotificationsPage() {
  return (
    <RequirePermission permission="config">
      {/* Container is now w-full with no max-width restriction */}
      <div className="w-full space-y-8 p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Notifications & Campaigns
            </h1>
            <p className="text-zinc-400 mt-1">
              Monitor system activity and manage outbound communication.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition border border-zinc-700">
              Export Logs
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              Create Campaign
            </button>
          </div>
        </header>

        <NotificationManager />
      </div>
    </RequirePermission>
  );
}
