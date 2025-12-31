"use client";

import { useAlert } from "@/context/AlertContext";
import { Alert } from "@/components/ui/Alert";
import React from "react";

export function AlertContainer() {
  const { alerts, dismissAlert } = useAlert();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3 sm:bottom-10 sm:right-10">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => dismissAlert(alert.id)}
        />
      ))}
    </div>
  );
}
