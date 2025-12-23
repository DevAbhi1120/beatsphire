"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  // Don't show on dashboard root
  if (pathname === "/admin/dashboard") return null;

  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-zinc-500 mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
      <Link
        href="/admin/dashboard"
        className="hover:text-zinc-200 transition-colors"
      >
        <Home size={14} />
      </Link>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;
        const label = path.charAt(0).toUpperCase() + path.slice(1);

        return (
          <div key={path} className="flex items-center">
            <ChevronRight size={12} className="mx-2 text-zinc-700" />
            {isLast ? (
              <span className="text-indigo-400 font-medium">{label}</span>
            ) : (
              <Link
                href={label == "Admin" ? "/admin/dashboard" : href}
                className="hover:text-zinc-200 transition-colors"
              >
                {label == "Admin" ? "Dashboard" : label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
