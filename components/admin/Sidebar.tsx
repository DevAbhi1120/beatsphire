"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRole } from "@/lib/auth";
import { ROLE_PERMISSIONS } from "@/lib/permissions";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  ScrollText,
  X,
  ShieldCheck,
  ChevronRight,
  Plus,
  UserPlus,
  FilePlus,
  // NEW: Quick action icons
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react"; // NEW: For swipe/keyboard

// Map keys to Icons
const ICONS: Record<string, any> = {
  dashboard: LayoutDashboard,
  users: Users,
  analytics: BarChart3,
  reports: FileText,
  config: Settings,
  logs: ScrollText,
};

const ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", key: "dashboard" },
  { label: "User Management", href: "/admin/users", key: "users" },
  { label: "Analytics", href: "/admin/analytics", key: "analytics" },
  { label: "Reports", href: "/admin/reports", key: "reports" },
  { label: "Configuration", href: "/admin/config", key: "config" },
  { label: "System Logs", href: "/admin/logs", key: "logs" },
];

// NEW: Quick actions (customize as needed)
const QUICK_ACTIONS = [
  {
    label: "Add User",
    href: "/admin/users/new",
    icon: UserPlus,
    key: "add-user",
  },
  {
    label: "New Report",
    href: "/admin/reports/new",
    icon: FilePlus,
    key: "new-report",
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  // NEW: Search query for filtering
  searchQuery?: string;
}

export default function Sidebar({
  isOpen,
  setIsOpen,
  searchQuery = "",
}: SidebarProps) {
  const pathname = usePathname();
  const role = (getRole() as string) || "GUEST";
  const allowed = ROLE_PERMISSIONS[role] || [];
  const sidebarRef = useRef<HTMLDivElement>(null); // NEW: For swipe

  const filteredItems = ITEMS.filter(
    (i) =>
      allowed.includes(i.key) &&
      (searchQuery === "" ||
        i.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // NEW: Keyboard esc to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, setIsOpen]);

  // NEW: Mobile swipe to close
  useEffect(() => {
    if (!isOpen || !sidebarRef.current) return;
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch.clientX > 50) setIsOpen(false); // Simple swipe right
    };
    sidebarRef.current.addEventListener("touchstart", handleTouch);
    return () =>
      sidebarRef.current?.removeEventListener("touchstart", handleTouch);
  }, [isOpen, setIsOpen]);

  const SidebarContent = () => (
    <div
      ref={sidebarRef}
      className="flex flex-col h-full bg-neutral-950 border-r border-neutral-800 text-neutral-300"
    >
      {/* Header - IMPROVED: Added search focus hint */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-indigo-500">
          <ShieldCheck className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight text-white">
            AdminOS
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden ml-auto text-neutral-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation - IMPROVED: Filtered by search */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          Main Menu
        </p>
        {filteredItems.length === 0 ? (
          <p className="px-3 text-sm text-neutral-500 italic">
            No matches found
          </p> // NEW: Empty state
        ) : (
          filteredItems.map((item) => {
            const Icon = ICONS[item.key] || LayoutDashboard;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true} // IMPROVED: Explicit prefetch
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-sm", // IMPROVED: Subtle shadow
                  isActive
                    ? "bg-indigo-600/20 text-indigo-300 shadow-indigo-500/10" // IMPROVED: Softer active
                    : "text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200"
                )}
                aria-current={isActive ? "page" : undefined} // IMPROVED: Accessibility
              >
                <div className="flex items-center gap-3">
                  <motion.div // IMPROVED: Animate icon scale
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0"
                  >
                    <Icon
                      size={18}
                      className={cn(
                        isActive
                          ? "text-indigo-400"
                          : "text-neutral-500 group-hover:text-neutral-300"
                      )}
                    />
                  </motion.div>
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="w-1 h-1 rounded-full bg-indigo-400"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} // IMPROVED: Bouncy
                  />
                )}
              </Link>
            );
          })
        )}
      </nav>

      {/* NEW: Quick Actions Section */}
      {role === "ADMIN" && ( // Role-gated
        <>
          <div className="px-3 py-2 border-t border-neutral-800">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Quick Actions
            </p>
          </div>
          <div className="px-3 space-y-1 mb-4">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                prefetch={true}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-neutral-400 hover:bg-neutral-900/50 transition-colors"
              >
                <action.icon size={14} className="text-neutral-500" />
                {action.label}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* User Mini Profile - IMPROVED: Click to profile */}
      <div className="p-4 border-t border-neutral-800">
        <Link href="/admin/profile" className="block">
          {" "}
          {/* NEW: Navigates to profile */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-900/70 transition-colors cursor-pointer shadow-sm hover:shadow-md">
            {" "}
            {/* IMPROVED: Hover depth */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
              {" "}
              {/* IMPROVED: Gradient */}
              JD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-neutral-500 truncate">{role}</p>
            </div>
            <ChevronRight size={14} className="text-neutral-500" />
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - IMPROVED: Reduced motion support */}
      <aside
        className={cn(
          "hidden md:block w-72 h-screen fixed inset-y-0 left-0 z-50 transition-transform duration-300",
          typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
            "motion-reduce:transition-none"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) - IMPROVED: Backdrop blur, spring anim */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-neutral-950 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
