"use client";
import React from "react";
import { CreditCard, ArrowUpRight, CheckCircle2, Download } from "lucide-react";
import { Card, SettingsSection } from "@/components/UI/SettingsLayout";

const Billing = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Plan Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2 bg-gradient-to-br from-indigo-600/20 to-transparent border-indigo-500/30">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Current Plan
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">
                Enterprise Pro
              </h2>
              <p className="text-zinc-400 text-sm mt-2">
                Billed monthly. Next payment of $49.00 on Feb 2025.
              </p>
            </div>
            <div className="bg-indigo-500 text-white text-[10px] font-black px-2 py-1 rounded-md">
              ACTIVE
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg">
              Manage Subscription
            </button>
            <button className="text-white text-xs font-bold px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800">
              Change Plan
            </button>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div>
            <p className="text-zinc-500 text-xs font-medium">
              Usage This Month
            </p>
            <h3 className="text-xl font-bold text-white mt-1">1,284 / 5,000</h3>
            <p className="text-[10px] text-zinc-500 mt-1">API Requests</p>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-indigo-500 w-[25%]" />
          </div>
        </Card>
      </div>

      <SettingsSection
        title="Invoices"
        description="Download your past payment receipts."
      >
        <Card>
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium text-zinc-400">Date</th>
                <th className="px-6 py-4 font-medium text-zinc-400">Amount</th>
                <th className="px-6 py-4 font-medium text-zinc-400">Status</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-6 py-4 text-white">Jan {i}, 2025</td>
                  <td className="px-6 py-4 text-zinc-300">$49.00</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-emerald-500 text-xs">
                      <CheckCircle2 size={14} /> Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-zinc-500 hover:text-white">
                    <Download size={16} className="ml-auto cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </SettingsSection>
    </div>
  );
};

export default Billing;
