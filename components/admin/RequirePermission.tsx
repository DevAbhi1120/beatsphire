"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRole } from "@/lib/auth";
import { ROLE_PERMISSIONS } from "@/lib/permissions";
import { ErrorBoundary } from "react-error-boundary"; // NEW: Install react-error-boundary if needed

// NEW: Fallback error UI
function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="p-6 text-center text-red-400">
      <h2 className="text-lg font-semibold">Access Denied</h2>
      <p className="mt-2">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-500 rounded"
      >
        Retry
      </button>
    </div>
  );
}

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
      router.replace("/admin/dashboard?denied=true"); // IMPROVED: Query param for flash message
    }
  }, [permission, router]);

  return (
    <ErrorBoundary // NEW: Wrap for robustness
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
