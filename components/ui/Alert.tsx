"use client";

import { cn } from "@/lib/utils";
import { AlertType } from "@/context/AlertContext";
import { StarBackground } from "@/components/ui/StarBackground";
import {
  X,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import React from "react";

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose: () => void;
}

const icons = {
  info: <Info className="h-5 w-5 text-blue-400" />,
  success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-400" />,
  error: <AlertCircle className="h-5 w-5 text-rose-400" />,
};

const variants = {
  info: "border-blue-500/30 bg-blue-500/5",
  success: "border-emerald-500/30 bg-emerald-500/5",
  warning: "border-amber-500/30 bg-amber-500/5",
  error: "border-rose-500/30 bg-rose-500/5",
};

export function Alert({ type, title, message, onClose }: AlertProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-4 backdrop-blur-2xl transition-all duration-300 animate-in slide-in-from-right-full fade-in",
        variants[type]
      )}
    >
      <StarBackground className="opacity-10" />

      <div className="relative z-10 flex gap-3">
        <div className="shrink-0">{icons[type]}</div>

        <div className="flex-1 space-y-1">
          {title && (
            <h4 className="text-sm font-semibold leading-none tracking-tight text-white">
              {title}
            </h4>
          )}
          <div className="text-sm text-zinc-400">{message}</div>
        </div>

        <button
          onClick={onClose}
          className="shrink-0 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 hover:bg-white/5"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>

      {/* Progress bar for auto-dismiss (optional visual) */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-current opacity-20 animate-out fade-out"
        style={{ width: "100%" }}
      />
    </div>
  );
}
