"use client";
import React from "react";
import { Camera, Mail, Globe, Github, Twitter } from "lucide-react";
import { Card, SettingsSection, Input } from "@/components/UI/SettingsLayout";

const ProfileSettings = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsSection
        title="Public Profile"
        description="This information will be displayed publicly."
      >
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-2xl bg-zinc-800 border-2 border-dashed border-zinc-700 flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="avatar"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                <Camera className="text-white" size={20} />
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">
                  Full Name
                </label>
                <Input placeholder="John Doe" defaultValue="Admin User" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">
                  Username
                </label>
                <Input placeholder="@username" defaultValue="admin_os" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-medium text-zinc-400">Bio</label>
                <textarea
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection
        title="Social Profiles"
        description="Connect your accounts for better visibility."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 flex items-center gap-4">
            <Github size={20} className="text-zinc-400" />
            <Input
              className="border-none bg-transparent p-0 focus:ring-0"
              placeholder="github.com/username"
            />
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <Twitter size={20} className="text-zinc-400" />
            <Input
              className="border-none bg-transparent p-0 focus:ring-0"
              placeholder="twitter.com/username"
            />
          </Card>
        </div>
      </SettingsSection>
    </div>
  );
};

export default ProfileSettings;
