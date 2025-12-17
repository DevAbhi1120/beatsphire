"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRole } from "@/lib/auth";
import { ROLE_PERMISSIONS } from "@/lib/permissions";

export default function RequirePermission({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const role = getRole() as any;
    const allowed = ROLE_PERMISSIONS[role] || [];
    if (!allowed.includes(permission)) {
      router.replace("/admin/dashboard");
    }
  }, [permission, router]);

  return <>{children}</>;
}
