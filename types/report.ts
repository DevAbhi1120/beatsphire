export type ReportType = "USER" | "POST" | "CHAT";
export type ReportStatus = "OPEN" | "RESOLVED" | "DISMISSED";
export type ReportSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface Report {
  id: string;
  type: ReportType;
  reportedEntityId: string;
  reason: string;
  severity: ReportSeverity;
  status: ReportStatus;
  createdAt: string;
}
