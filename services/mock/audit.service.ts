import { AuditLog } from "@/types/audit";

export async function getAuditLogs(): Promise<AuditLog[]> {
  await new Promise(res => setTimeout(res, 500));

  return [
    {
      id: "a1",
      adminEmail: "admin@example.com",
      action: "LOGIN",
      ipAddress: "192.168.1.10",
      createdAt: "2024-03-05 10:12",
    },
    {
      id: "a2",
      adminEmail: "admin@example.com",
      action: "USER_BAN",
      target: "u3",
      ipAddress: "192.168.1.10",
      createdAt: "2024-03-05 10:18",
    },
    {
      id: "a3",
      adminEmail: "moderator@example.com",
      action: "REPORT_RESOLVE",
      target: "r1",
      ipAddress: "192.168.1.22",
      createdAt: "2024-03-05 11:02",
    },
  ];
}
