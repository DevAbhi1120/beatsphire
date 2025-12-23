"use client";
import React, { useState } from "react";
import { ShieldCheck, Smartphone, LogOut } from "lucide-react";
import {
  Card,
  SettingsSection,
  Input,
  Toggle,
} from "@/components/UI/SettingsLayout";

const Password = () => {
  const [twoFA, setTwoFA] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SettingsSection
        title="Change Password"
        description="Update your password regularly to keep your account secure."
      >
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400">
              Current Password
            </label>
            <Input type="password" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400">
                New Password
              </label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400">
                Confirm New Password
              </label>
              <Input type="password" />
            </div>
          </div>
          <button className="bg-white text-black text-sm font-bold px-4 py-2 rounded-lg mt-2">
            Update Password
          </button>
        </Card>
      </SettingsSection>

      <SettingsSection
        title="Security Layers"
        description="Manage your multi-factor authentication."
      >
        <Card className="p-4 flex items-center justify-between border-indigo-500/20 bg-indigo-500/5">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-zinc-500">
                Enable 2FA via Authenticator App
              </p>
            </div>
          </div>
          <Toggle enabled={twoFA} onChange={() => setTwoFA(!twoFA)} />
        </Card>
      </SettingsSection>
    </div>
  );
};

export default Password;
