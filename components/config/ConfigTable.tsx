import { FeatureConfig } from "@/types/config";
import FeatureToggle from "./FeatureToggle";

export default function ConfigTable({
  configs,
}: {
  configs: FeatureConfig[];
}) {
  return (
    <div className="overflow-x-auto border border-neutral-800 rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-900">
          <tr>
            <th className="px-4 py-2 text-left">Key</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-center">Platform</th>
            <th className="px-4 py-2 text-center">Min Version</th>
            <th className="px-4 py-2 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {configs.map(c => (
            <tr key={c.id} className="border-t border-neutral-800">
              <td className="px-4 py-2 font-mono text-xs">{c.key}</td>
              <td className="px-4 py-2 text-gray-400">
                {c.description}
              </td>
              <td className="px-4 py-2 text-center">{c.platform}</td>
              <td className="px-4 py-2 text-center">
                {c.minVersion || "—"}
              </td>
              <td className="px-4 py-2 text-center">
                <FeatureToggle enabled={c.enabled} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
