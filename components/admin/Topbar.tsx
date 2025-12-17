"use client";

import { deleteCookie } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  function logout() {
    deleteCookie("admin_session");
    deleteCookie("admin_2fa");
    deleteCookie("admin_role");
    router.push("/admin/login");
  }

  return (
    <header className="h-14 border-b border-neutral-800 flex justify-end px-6 items-center">
      <button onClick={logout} className="text-red-400 text-sm">
        Logout
      </button>
    </header>
  );
}
