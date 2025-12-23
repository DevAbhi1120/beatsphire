"use client";
import React, { useState } from "react";
import Section from "../UI/Section";
import Toggle from "../UI/Toggle";

const GeneralSettings = () => {
  // 1. State Management
  const [formData, setFormData] = useState({
    appName: "AdminOS Pro",
    supportEmail: "support@adminos.io",
    timezone: "(GMT -05:00) Eastern Time",
    language: "English (US)",
    maintenanceMode: false,
  });

  // 2. Generic Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (state: boolean) => {
    setFormData((prev) => ({ ...prev, maintenanceMode: state }));
  };

  return (
    <div className="space-y-8">
      {/* Application Identity */}
      <Section
        title="Application Identity"
        description="Basic branding for your dashboard."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              Application Name
            </label>
            <input
              type="text"
              name="appName"
              value={formData.appName}
              onChange={handleChange}
              placeholder="Enter app name"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all hover:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              Support Email
            </label>
            <input
              type="email"
              name="supportEmail"
              value={formData.supportEmail}
              onChange={handleChange}
              placeholder="support@example.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all hover:border-zinc-700"
            />
          </div>
        </div>
      </Section>

      {/* Localization */}
      <Section
        title="Localization"
        description="Set your preferred time and language."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              Timezone
            </label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:border-zinc-700 transition-all appearance-none"
            >
              <option>(GMT -05:00) Eastern Time</option>
              <option>(GMT +00:00) UTC</option>
              <option>(GMT +05:30) India Standard Time</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              Default Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:border-zinc-700 transition-all appearance-none"
            >
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </Section>

      {/* Maintenance Mode */}
      <Section
        title="Maintenance Mode"
        description="Temporarily disable public access."
      >
        <div
          className={`flex items-center justify-between p-5 border rounded-2xl mt-4 transition-all duration-300 ${
            formData.maintenanceMode
              ? "bg-orange-500/10 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
              : "bg-zinc-900/50 border-zinc-800"
          }`}
        >
          <div className="space-y-1">
            <p
              className={`font-semibold transition-colors ${
                formData.maintenanceMode ? "text-orange-500" : "text-white"
              }`}
            >
              {formData.maintenanceMode ? "System Offline" : "System Online"}
            </p>
            <p className="text-sm text-zinc-500 max-w-xs md:max-w-md">
              {formData.maintenanceMode
                ? "The application is currently hidden from the public. Only admins can log in."
                : "The application is currently live and accessible to all users."}
            </p>
          </div>
          <Toggle enabled={formData.maintenanceMode} onChange={handleToggle} />
        </div>
      </Section>
    </div>
  );
};

export default GeneralSettings;
