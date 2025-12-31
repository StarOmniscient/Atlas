"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertMessage {
  id: string;
  type: AlertType;
  title?: string;
  message: string;
  duration?: number;
}

interface AlertContextType {
  alerts: AlertMessage[];
  showAlert: (alert: Omit<AlertMessage, "id">) => void;
  dismissAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const showAlert = useCallback((alert: Omit<AlertMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newAlert = { ...alert, id };

    setAlerts((prev) => [...prev, newAlert]);

    if (alert.duration !== 0) {
      setTimeout(() => {
        dismissAlert(id);
      }, alert.duration || 5000);
    }
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, dismissAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
