"use client";
import React from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CheckItemProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const CheckItem = ({ label, checked, onCheckedChange }: CheckItemProps) => {
  return (
    <div
      className="flex items-center gap-3 cursor-pointer group select-none"
      onClick={() => onCheckedChange(!checked)}
    >
      <div
        className={cn(
          "w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center",
          checked
            ? "bg-indigo-500 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
            : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"
        )}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Check className="text-white" size={14} strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span
        className={cn(
          "text-sm transition-colors",
          checked ? "text-zinc-200" : "text-zinc-500 group-hover:text-zinc-400"
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default CheckItem;
