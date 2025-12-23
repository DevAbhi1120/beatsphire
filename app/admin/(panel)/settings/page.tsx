"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Save,
  Trash2,
  Camera,
  Mail,
  Monitor,
  Smartphone,
  Loader,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSettings from "@/components/settings/ProfileSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import GeneralSettings from "@/components/settings/GeneralSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import Billing from "@/components/settings/Billing";
import Password from "@/components/settings/Password";

const TABS = [
  { id: "general", label: "General", icon: Globe },
  { id: "profile", label: "Profile", icon: User },
  { id: "password", label: "Password", icon: Lock },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  // { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            System Settings
          </h1>
          <p className="text-zinc-500 mt-1">
            Manage your application configuration and security preferences.
          </p>
        </div>
        <button
          onClick={() => {
            setIsSaving(true);
            setTimeout(() => setIsSaving(false), 2000);
          }}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          {isSaving ? (
            <motion.div
              animate={{ rotate: 22.5 }}
              transition={{ repeat: Infinity, ease: "linear" }}
            >
              <Loader size={18} />
            </motion.div>
          ) : (
            <Save size={18} />
          )}
          {isSaving ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-1 overflow-x-auto no-scrollbar border-b lg:border-b-0 lg:border-r border-zinc-800 pb-4 lg:pb-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "text-indigo-500 bg-indigo-600/10 "
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-zinc-900 rounded-xl -z-10"
                />
              )}
              <tab.icon
                size={18}
                className={activeTab === tab.id ? "text-indigo-500" : ""}
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={containerVars}
            className="space-y-8"
          >
            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "profile" && <ProfileSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "billing" && <Billing />}
            {activeTab === "password" && <Password />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* --- SUB-COMPONENTS --- */



