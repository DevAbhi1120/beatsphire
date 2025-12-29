"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  ShieldCheck,
  PanelLeftOpen,
  PanelLeftClose,
  ChevronRight,
  User,
  Cog,
  Heart,
  ChevronDown,
  Lock,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  { label: "Dating Management", href: "/admin/dating_management", icon: Heart },
  { label: "Profile", href: "/admin/profile", icon: User ,},
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Cog,
    // subMenu: [
    //   { label: "Profile Edit", href: "/admin/settings/profile", icon: Lock },
    //   { label: "Password", href: "/admin/settings/password", icon: UserCog },
    // ],
  },
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const matchingItem = NAV_ITEMS.find((item) =>
      item.subMenu?.some((sub) => pathname === sub.href)
    );
    if (matchingItem) {
      setOpenSubmenu(matchingItem.label);
    } else {
      setOpenSubmenu(null);
    }
  }, [pathname]);

  const filteredItems = NAV_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subMenu &&
        item.subMenu.some((sub) =>
          sub.label.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  // Animation Variants
  const sidebarVariants = {
    open: {
      width: 288,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      width: 80,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const textVariants = {
    open: {
      opacity: 1,
      x: 0,
      display: "block",
      transition: { delay: 0.1, duration: 0.2 },
    },
    closed: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.1 },
      transitionEnd: { display: "none" }, // Hides element after fade out to prevent layout shift
    },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, x: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 5,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
  };

  return (
    <>
      {/* Desktop / Tablet Sidebar */}
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={cn(
          "hidden md:flex h-full bg-zinc-950 flex-col  z-20 relative",
          !isOpen && "items-center"
        )}
      >
        <div className="h-20 flex items-center justify-between w-full px-4 mb-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex-shrink-0 text-zinc-400 hover:text-white transition-colors"
            >
              <div className="p-2 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 rounded-xl border border-indigo-500/20 text-indigo-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </button>

            <motion.div
              variants={textVariants}
              className="font-bold text-xl text-white tracking-tight whitespace-nowrap"
            >
              AdminOS
            </motion.div>
          </div>

          {/* Toggle Button (Only visible when open) */}
          {isOpen == true && (
            <motion.button
              variants={{
                open: { opacity: 1, scale: 1 },
                closed: { opacity: 0, scale: 0 },
              }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <PanelLeftClose size={20} />
            </motion.button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 w-full px-3 space-y-2">
          {filteredItems.map((item) => {
            const hasSubmenu = !!item.subMenu;
            const isActive =
              pathname === item.href ||
              (item.subMenu &&
                item.subMenu.some((sub) => pathname === sub.href));
            const isSubOpen = openSubmenu === item.label;

            return (
              <div
                key={item.href}
                className="relative w-full"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center w-full p-3 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-indigo-600/10 text-indigo-400"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
                    !isOpen && "justify-center px-0" // Center icon when closed
                  )}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-indigo-500 rounded-r-full"
                    />
                  )}

                  <item.icon
                    size={22}
                    className={cn(
                      "flex-shrink-0 transition-transform duration-300",
                      isActive ? "text-indigo-400" : "text-zinc-500",
                      // Add a subtle bounce to icon on hover
                      hoveredItem === item.label && "scale-110"
                    )}
                  />

                  {/* Text Label with Framer Motion */}
                  <motion.span
                    variants={textVariants}
                    className="ml-3 whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>

                  {/* Indicators */}
                  {isOpen &&
                    (hasSubmenu ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpenSubmenu((prev) =>
                            prev === item.label ? null : item.label
                          );
                        }}
                        className="ml-auto p-1 transition-colors"
                      >
                        <ChevronDown
                          size={14}
                          className={cn(
                            "transition-transform duration-300",
                            isSubOpen
                              ? "rotate-180 text-indigo-400"
                              : "text-zinc-400"
                          )}
                        />
                      </button>
                    ) : isActive ? (
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-auto"
                      >
                        <ChevronRight
                          size={14}
                          className="text-indigo-400/50"
                        />
                      </motion.div>
                    ) : null)}
                </Link>

                {/* Submenu */}
                <AnimatePresence>
                  {isOpen && hasSubmenu && isSubOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="ml-5 pl-3 space-y-2 py-2 border-l border-zinc-800"
                    >
                      {item.subMenu.map((subItem) => {
                        const subActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-2 w-full p-2 rounded-lg text-sm font-medium transition-all duration-200",
                              subActive
                                ? "bg-indigo-600/10 text-indigo-400"
                                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                            )}
                          >
                            <subItem.icon
                              size={16}
                              className={cn(
                                "flex-shrink-0",
                                subActive ? "text-indigo-400" : "text-zinc-500"
                              )}
                            />
                            {subItem.label}
                            {subActive && (
                              <ChevronRight
                                size={12}
                                className="ml-auto text-indigo-400/50"
                              />
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Modern Capsule Tooltip (Only when closed) */}
                <AnimatePresence>
                  {!isOpen && hoveredItem === item.label && (
                    <motion.div
                      variants={tooltipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-full top-1/4 ml-4 z-50 flex items-center gap-2"
                    >
                      {/* Little Triangle pointing left */}
                      <div className="absolute -left-1 w-2 h-2 bg-zinc-900 rotate-45 border-l border-b border-zinc-800" />

                      {/* Capsule Content */}
                      <div className="relative bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-zinc-100 text-xs font-semibold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                        {item.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Toggle Button for Closed State (Bottom or integrated into flow) */}
        {!isOpen && (
          <div className="p-4 w-full flex justify-center border-t border-zinc-900 mt-auto">
            <button
              onClick={() => setIsOpen(true)}
              className="text-zinc-500 hover:text-white transition"
            >
              <PanelLeftOpen size={20} />
            </button>
          </div>
        )}
      </motion.aside>

      {/* Mobile Drawer (Kept mostly logic-same but visually updated) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              className="md:hidden fixed inset-y-0 left-0 z-50 bg-zinc-950 border-r border-zinc-900 w-72 p-4"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Mobile Content Mirror */}
              <div className="flex items-center gap-3 mb-8 px-2">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-lg font-bold text-white">AdminOS</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto text-zinc-500"
                >
                  <PanelLeftClose />
                </button>
              </div>

              <div className="space-y-1">
                {filteredItems.map((item) => {
                  const hasSubmenu = !!item.subMenu;
                  const isActive =
                    pathname === item.href ||
                    (item.subMenu &&
                      item.subMenu.some((sub) => pathname === sub.href));
                  const isSubOpen = openSubmenu === item.label;

                  if (!hasSubmenu) {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition",
                          isActive && "bg-indigo-600/10 text-indigo-400"
                        )}
                      >
                        <item.icon size={20} />
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <div key={item.href} className="space-y-1">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition",
                          isActive && "bg-indigo-600/10 text-indigo-400"
                        )}
                      >
                        <item.icon size={20} />
                        {item.label}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenSubmenu((prev) =>
                              prev === item.label ? null : item.label
                            );
                          }}
                          className="ml-auto p-1"
                        >
                          <ChevronDown
                            size={16}
                            className={cn(
                              "transition-transform duration-300",
                              isSubOpen
                                ? "rotate-180 text-indigo-400"
                                : "text-zinc-400"
                            )}
                          />
                        </button>
                      </Link>
                      <AnimatePresence>
                        {isSubOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-6 space-y-1 overflow-hidden"
                          >
                            {item.subMenu.map((subItem) => {
                              const subActive = pathname === subItem.href;
                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    subActive
                                      ? "bg-indigo-600/10 text-indigo-400"
                                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                                  )}
                                >
                                  <subItem.icon
                                    size={16}
                                    className={cn(
                                      "flex-shrink-0",
                                      subActive
                                        ? "text-indigo-400"
                                        : "text-zinc-500"
                                    )}
                                  />
                                  {subItem.label}
                                  {subActive && (
                                    <ChevronRight
                                      size={12}
                                      className="ml-auto text-indigo-400/50"
                                    />
                                  )}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
