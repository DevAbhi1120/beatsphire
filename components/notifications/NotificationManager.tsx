"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Megaphone,
  CheckCircle2,
  Info,
  AlertTriangle,
  Trash2,
  X,
  Zap,
} from "lucide-react";

// --- Types ---
type Notification = {
  id: string;
  title: string;
  message: string;
  type: "system" | "campaign" | "alert";
  status: "read" | "unread";
  timestamp: string;
};

// --- Dummy Data ---
const INITIAL_DATA: Notification[] = [
  {
    id: "1",
    title: "API Quota Reached",
    message: "Your system is at 90% of its monthly API limit.",
    type: "alert",
    status: "unread",
    timestamp: "Just now",
  },
  {
    id: "2",
    title: "Newsletter Sent",
    message: "August Weekly Newsletter was delivered to 12,402 users.",
    type: "campaign",
    status: "read",
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    title: "Security Patch",
    message: "System kernel updated to v2.4.1 successfully.",
    type: "system",
    status: "unread",
    timestamp: "5 hours ago",
  },
];

export default function NotificationManager() {
  const [notifications, setNotifications] =
    useState<Notification[]>(INITIAL_DATA);
  const [toasts, setToasts] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "campaign">("all");

  // Simulate a side popup (toast) appearing when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      addToast({
        id: Date.now().toString(),
        title: "Live Update",
        message: "A new user has just signed up from New York.",
        type: "system",
        status: "unread",
        timestamp: "Now",
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addToast = (notif: Notification) => {
    setToasts((prev) => [...prev, notif]);
    setNotifications((prev) => [notif, ...prev]);
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== notif.id));
    }, 5000);
  };

  const deleteNotif = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" } : n))
    );

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return n.status === "unread";
    if (filter === "campaign") return n.type === "campaign";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Unread"
          value={notifications.filter((n) => n.status === "unread").length}
          icon={<Bell className="text-blue-400" />}
        />
        <StatCard
          title="Active Campaigns"
          value="12"
          icon={<Megaphone className="text-purple-400" />}
        />
        <StatCard
          title="System Health"
          value="99.9%"
          icon={<Zap className="text-amber-400" />}
        />
      </div>

      {/* 2. Main List Area */}
      <div className="border border-zinc-800 rounded-xl bg-zinc-900/50 overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
          <div className="flex gap-2">
            {["all", "unread", "campaign"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition ${
                  filter === f
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              addToast({
                id: Math.random().toString(),
                title: "Manual Alert",
                message: "You triggered a test notification.",
                type: "alert",
                status: "unread",
                timestamp: "Now",
              })
            }
            className="text-xs text-blue-400 hover:text-blue-300 transition"
          >
            Trigger Test Toast
          </button>
        </div>

        <div className="divide-y divide-zinc-800">
          {filtered.map((n) => (
            <NotificationRow
              key={n.id}
              n={n}
              onRead={markRead}
              onDelete={deleteNotif}
            />
          ))}
        </div>
      </div>

      {/* 3. Side Popups (Toasts) Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 w-80">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-zinc-900 border border-zinc-700 shadow-2xl rounded-lg p-4 animate-in slide-in-from-right-full duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="bg-blue-500/10 p-2 rounded-full">
                  <Info className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{t.message}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((toast) => toast.id !== t.id))
                }
              >
                <X className="w-4 h-4 text-zinc-500 hover:text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-zinc-400 text-sm font-medium">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function NotificationRow({
  n,
  onRead,
  onDelete,
}: {
  n: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const Icon =
    n.type === "campaign"
      ? Megaphone
      : n.type === "alert"
      ? AlertTriangle
      : Info;

  return (
    <div
      className={`p-5 flex gap-4 transition group ${
        n.status === "unread" ? "bg-blue-500/5" : "hover:bg-zinc-800/30"
      }`}
    >
      <div
        className={`mt-1 p-2 h-fit w-fit rounded-lg ${
          n.status === "unread" ? "bg-blue-500/20" : "bg-zinc-800"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${
            n.status === "unread" ? "text-blue-400" : "text-zinc-500"
          }`}
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3
            className={`text-sm ${
              n.status === "unread"
                ? "text-white font-bold"
                : "text-zinc-400 font-medium"
            }`}
          >
            {n.title}
          </h3>
          <span className="text-xs text-zinc-600">{n.timestamp}</span>
        </div>
        <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
          {n.message}
        </p>
        <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {n.status === "unread" && (
            <button
              onClick={() => onRead(n.id)}
              className="text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              Mark Read
            </button>
          )}
          <button
            onClick={() => onDelete(n.id)}
            className="text-xs font-bold text-zinc-600 hover:text-red-400 flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
