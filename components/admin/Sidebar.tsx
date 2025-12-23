"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  X,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  // { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
  searchQuery,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  searchQuery: string;
}) {
  const pathname = usePathname();

  // Filter items based on search from topbar
  const filteredItems = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-950  w-72">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 ">
        <div className="flex items-center gap-2 text-indigo-500">
          <div className="p-1 bg-indigo-500/10 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            AdminOS
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden ml-auto text-zinc-400"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto ">
        <p className="px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Menu
        </p>

        {filteredItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)} // Close on mobile click
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative",
                isActive
                  ? "text-white bg-indigo-600/10"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
              <item.icon
                size={18}
                className={cn(
                  isActive
                    ? "text-indigo-400"
                    : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {/* <div className="p-4 border-zinc-800">
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/10">
          <p className="text-xs font-medium text-indigo-300">Pro Plan Active</p>
          <p className="text-[10px] text-indigo-400/60 mt-0.5">
            Expires in 12 days
          </p>
        </div>
      </div> */}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - Static */}
      <aside className="hidden md:block w-72 h-full flex-shrink-0 z-10">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar - Drawer */}
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
              className="md:hidden fixed inset-y-0 left-0 z-50 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
