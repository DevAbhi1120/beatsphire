import { ReportStatus } from "@/types/report";

const COLORS: Record<ReportStatus, string> = {
  OPEN: "bg-red-600",
  RESOLVED: "bg-green-600",
  DISMISSED: "bg-gray-600",
};

export default function ReportStatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span className={`px-2 py-1 rounded text-xs text-white ${COLORS[status]}`}>
      {status}
    </span>
  );
}
