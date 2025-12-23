"use client"; // IMPROVED: Ensure client for state

import { useState } from "react"; // NEW: For mobile menu
import AdminShell from "@/components/admin/AdminShell";
import QueryProvider from "@/components/providers/QueryProvider";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // NEW: Mobile state

  return (
    <QueryProvider>
      <AdminShell>{children}</AdminShell>
    </QueryProvider>
  );
}
