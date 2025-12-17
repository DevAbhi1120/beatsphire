import RequirePermission from "@/components/admin/RequirePermission";
import ConfigTable from "@/components/config/ConfigTable";
import { getFeatureConfigs } from "@/services/mock/config.service";

export default async function ConfigPage() {
  const configs = await getFeatureConfigs();

  return (
    <RequirePermission permission="config">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          Remote Config & Feature Flags
        </h1>

        <p className="text-sm text-gray-400">
          Control app behavior without publishing new app versions.
        </p>

        <ConfigTable configs={configs} />
      </div>
    </RequirePermission>
  );
}
