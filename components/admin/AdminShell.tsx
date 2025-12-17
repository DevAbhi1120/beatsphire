"use client";

import { Suspense, lazy, useState } from "react"; // FIXED: Added useState
import { motion } from "framer-motion"; // IMPROVED: Page transitions
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic"; // NEW: Lazy load heavy components if needed
import Link from "next/link"; // FIXED: Missing import for Link
import { ChevronRight } from "lucide-react"; // FIXED: Assuming Lucide icons; install if needed: npm i lucide-react
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
// REMOVED: import { Breadcrumbs } from "./Breadcrumbs"; // FIXED: Duplicate definition; using inline instead

// NEW: Simple Breadcrumbs component (inline to avoid separate file for now)
function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const crumbs = paths.map((path, i) => ({
    label: path.charAt(0).toUpperCase() + path.slice(1),
    href: `/${paths.slice(0, i + 1).join("/")}`,
  }));

  if (paths.length === 0) return null; // FIXED: Avoid empty breadcrumbs

  return (
    <nav className="flex mb-4 text-sm text-neutral-400" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <div key={i} className="flex items-center">
          <Link href={crumb.href} className="hover:text-neutral-200">
            {crumb.label}
          </Link>
          {i < crumbs.length - 1 && (
            <ChevronRight size={12} className="mx-1 flex-shrink-0" />
          )}
        </div>
      ))}
    </nav>
  );
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState(""); // NEW: Lift search state

  // IMPROVED: Animate page on route change
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      <Sidebar isOpen={false} setIsOpen={() => {}} searchQuery={searchQuery} />{" "}
      {/* Pass search */}
      <div className="flex flex-col flex-1">
        <Topbar
          onMenuClick={() => {}}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />{" "}
        {/* NEW: Pass search props */}
        <main className="p-6 flex-1 overflow-y-auto">
          {/* NEW: Breadcrumbs */}
          {pathname !== "/admin/dashboard" && <Breadcrumbs />}
          {/* IMPROVED: Suspense + Motion for seamless transitions */}
          <Suspense
            fallback={
              <div className="animate-pulse h-4 bg-neutral-800 rounded w-32" />
            }
          >
            {" "}
            {/* Skeleton fallback */}
            <motion.div
              key={pathname} // Re-animates on route change
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }} // Fast fade/slide
              className="space-y-6"
            >
              {children}
            </motion.div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}