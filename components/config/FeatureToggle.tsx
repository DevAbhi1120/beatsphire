"use client";

export default function FeatureToggle({
  enabled,
}: {
  enabled: boolean;
}) {
  return (
    <span
      className={`px-3 py-1 rounded text-xs font-medium ${
        enabled
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      {enabled ? "ON" : "OFF"}
    </span>
  );
}
