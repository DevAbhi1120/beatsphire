"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  Menu,
  User,
  LogOut,
  Settings,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Ensure you have a cn utility or use template literals

// Dummy Notifications Data
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "New User Registered",
    desc: "Sarah Connor joined the team.",
    time: "Just now",
    type: "success",
  },
  {
    id: 2,
    title: "Server Overload",
    desc: "CPU usage reached 90%.",
    time: "10 min ago",
    type: "warning",
  },
  {
    id: 3,
    title: "Backup Completed",
    desc: "Daily backup finished successfully.",
    time: "1 hr ago",
    type: "info",
  },
];

interface TopbarProps {
  onMenuClick: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function Topbar({
  onMenuClick,
  searchQuery,
  setSearchQuery,
}: TopbarProps) {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotifOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear notifications
  const clearNotifications = () => setNotifications([]);

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8  bg-zinc-950/50 backdrop-blur-md sticky top-0 z-20">
      
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-zinc-400 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full max-w-md hidden md:flex items-center">
          <Search className="absolute left-3 text-zinc-500" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-200 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!isNotifOpen)}
            className="p-2 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all relative"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse ring-2 ring-zinc-950" />
            )}
          </button>

          <AnimatePresence>
            {isNotifOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setNotifOpen(false)}
                  ref={dropdownRef}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-0 mt-3 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-40 overflow-hidden ring-1 ring-black/5"
                >
                  <div className="p-3 border-b border-zinc-800 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white">
                      Notifications
                    </h3>
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 text-sm">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-3 border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors flex gap-3"
                        >
                          <div
                            className={cn(
                              "mt-1",
                              n.type === "success"
                                ? "text-green-500"
                                : n.type === "warning"
                                ? "text-amber-500"
                                : "text-blue-500"
                            )}
                          >
                            {n.type === "success" ? (
                              <CheckCircle2 size={16} />
                            ) : n.type === "warning" ? (
                              <AlertCircle size={16} />
                            ) : (
                              <Info size={16} />
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-zinc-200 font-medium">
                              {n.title}
                            </p>
                            <p className="text-xs text-zinc-500">{n.desc}</p>
                            <p className="text-[10px] text-zinc-600 mt-1">
                              {n.time}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-6 bg-zinc-800 mx-1" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-zinc-800 transition-all border border-transparent hover:border-zinc-700"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/20">
              AD
            </div>
            <ChevronDown size={14} className="text-zinc-500" />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setProfileOpen(false)}
                  ref={dropdownRef}
                />
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-40 p-1"
                >
                  <div className="px-3 py-2 mb-1 border-b border-zinc-800">
                    <p className="text-sm font-medium text-white">Admin User</p>
                    <p className="text-xs text-zinc-500">admin@example.com</p>
                  </div>
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1">
                    <LogOut size={16} /> Sign Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
