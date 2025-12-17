import { Report } from "@/types/report";

export async function getReports(): Promise<Report[]> {
  await new Promise(res => setTimeout(res, 500));

  return [
    {
      id: "r1",
      type: "USER",
      reportedEntityId: "u3",
      reason: "Harassment",
      severity: "HIGH",
      status: "OPEN",
      createdAt: "2024-03-02",
    },
    {
      id: "r2",
      type: "CHAT",
      reportedEntityId: "c12",
      reason: "Spam messages",
      severity: "MEDIUM",
      status: "OPEN",
      createdAt: "2024-03-03",
    },
    {
      id: "r3",
      type: "POST",
      reportedEntityId: "p8",
      reason: "Inappropriate content",
      severity: "LOW",
      status: "RESOLVED",
      createdAt: "2024-03-01",
    },
  ];
}
