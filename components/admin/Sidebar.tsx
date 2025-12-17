"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRole } from "@/lib/auth";
import { ROLE_PERMISSIONS } from "@/lib/permissions";

const ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", key: "dashboard" },
  { label: "Users", href: "/admin/users", key: "users" },
  { label: "Analytics", href: "/admin/analytics", key: "analytics" },
  { label: "Reports", href: "/admin/reports", key: "reports" },
  { label: "Config", href: "/admin/config", key: "config" },
  { label: "Logs", href: "/admin/logs", key: "logs" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const role = getRole() as any;
  const allowed = ROLE_PERMISSIONS[role] || [];

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800">
      <div className="p-6 font-bold">Admin Panel</div>
      <nav className="px-3 space-y-1">
        {ITEMS.filter(i => allowed.includes(i.key)).map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded text-sm ${
              pathname === item.href
                ? "bg-neutral-800 text-white"
                : "text-gray-400 hover:bg-neutral-800"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
