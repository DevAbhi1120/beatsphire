"use client";

import { deleteCookie } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Menu,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Moon,
  Sun, // NEW: Theme icons
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes"; // NEW: Assume next-themes installed, or implement manually

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false); // NEW: Notifications state
  const [searchQuery, setSearchQuery] = useState(""); // NEW: Search state
  const searchRef = useRef<HTMLInputElement>(null); // NEW: For focus
  const { theme, setTheme } = useTheme(); // NEW: Theme hook

  function logout() {
    deleteCookie("admin_session");
    deleteCookie("admin_2fa");
    deleteCookie("admin_role");
    router.push("/admin/login");
  }

  // NEW: Cmd+K shortcut for search
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  // NEW: Propagate search to sidebar (you'll pass this down)
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    // Optional: If search > 3 chars, redirect to /admin/search?q=${q}
    if (q.length > 3) {
      router.push(`/admin/search?q=${encodeURIComponent(q)}`);
    }
  };

  // NEW: Mock notifications (replace with real fetch)
  const notifications = [
    {
      id: 1,
      title: "New user registered",
      time: "2 min ago",
      type: "success" as const,
    },
    {
      id: 2,
      title: "Report generated",
      time: "1 hr ago",
      type: "info" as const,
    },
    {
      id: 3,
      title: "System alert",
      time: "Yesterday",
      type: "warning" as const,
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Search - IMPROVED: Always visible, expands on focus */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div
          className={cn(
            "flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 focus-within:border-indigo-500/50 transition-all duration-200",
            "w-full md:w-64" // IMPROVED: Full width on mobile
          )}
        >
          <Search size={14} className="text-neutral-500 flex-shrink-0" />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-neutral-200 placeholder:text-neutral-600 flex-1 min-w-0"
            placeholder="Search dashboard... (⌘K)"
          />
        </div>
      </div>

      {/* Right: Actions - IMPROVED: More spacing */}
      <div className="flex items-center gap-4">
        {/* NEW: Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-neutral-950 animate-pulse"></span>
          </button>
          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl py-2 z-50 max-h-80 overflow-y-auto"
              >
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-4 py-3 border-b border-neutral-800 last:border-b-0 hover:bg-neutral-800/50"
                  >
                    <p className="text-sm font-medium text-white">
                      {notif.title}
                    </p>
                    <p className="text-xs text-neutral-500">{notif.time}</p>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <p className="px-4 py-3 text-sm text-neutral-500 text-center">
                    No notifications
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown - IMPROVED: Added theme toggle */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white font-bold text-xs">
                A
              </div>
            </div>
            <ChevronDown size={14} className="text-neutral-500" />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl py-1 z-50"
              >
                <div className="px-4 py-2 border-b border-neutral-800 mb-1">
                  <p className="text-sm font-medium text-white">
                    Administrator
                  </p>
                  <p className="text-xs text-neutral-500">admin@company.com</p>
                </div>

                <Link href="/admin/profile" className="block">
                  {" "}
                  {/* IMPROVED: Link instead of button */}
                  <button className="w-full text-left px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white flex items-center gap-2">
                    <User size={14} /> Profile
                  </button>
                </Link>
                <button className="w-full text-left px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white flex items-center gap-2">
                  <Settings size={14} /> Settings
                </button>

                {/* NEW: Theme Toggle */}
                <div className="h-px bg-neutral-800 my-1" />
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                >
                  <Moon
                    size={14}
                    className={cn(theme === "dark" ? "hidden" : "block")}
                  />
                  <Sun
                    size={14}
                    className={cn(theme !== "dark" ? "hidden" : "block")}
                  />
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>

                <div className="h-px bg-neutral-800 my-1" />

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                >
                  <LogOut size={14} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
