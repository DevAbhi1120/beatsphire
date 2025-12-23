"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Breadcrumbs from "./Breadcrumbs";
import { motion } from "framer-motion";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    // FIX: h-screen and overflow-hidden prevents window scroll and fixes overflow issues
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        searchQuery={searchQuery}
      />

      {/* Main Layout Area */}
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* FIX: Main content area gets its own scrollbar */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth border-t md:border-l border-zinc-800 md:rounded-tl-2xl">
          <div className="max-w-7xl mx-auto space-y-6">
            <Breadcrumbs />

            {/* OPTIMIZATION: Removed 'exit' prop to eliminate tab switching delay */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="min-h-[calc(100vh-150px)]"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
