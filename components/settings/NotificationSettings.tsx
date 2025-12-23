"use client";
import React, { useState } from "react";
import { Card, SettingsSection, Toggle } from "@/components/UI/SettingsLayout";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    security: true,
    updates: false,
    mentions: true,
    marketing: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SettingsSection
        title="Email Preferences"
        description="Choose what we send to your inbox."
      >
        <Card className="divide-y divide-zinc-800">
          {[
            {
              id: "security",
              title: "Security Alerts",
              desc: "Get notified about new logins and security changes.",
            },
            {
              id: "updates",
              title: "Product Updates",
              desc: "News about new features and releases.",
            },
            {
              id: "mentions",
              title: "Mentions & Comments",
              desc: "When someone tags you in a project.",
            },
            {
              id: "marketing",
              title: "Marketing & Promo",
              desc: "Offers and discounts for pro plans.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-zinc-500">{item.desc}</p>
              </div>
              <Toggle
                enabled={settings[item.id as keyof typeof settings]}
                onChange={() => toggle(item.id as any)}
              />
            </div>
          ))}
        </Card>
      </SettingsSection>
    </div>
  );
};

export default NotificationSettings;
