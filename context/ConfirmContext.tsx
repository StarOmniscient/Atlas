"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

interface ConfirmContextType {
  confirmBase: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "",
    message: "",
  });

  const resolver = useRef<((value: boolean) => void) | null>(null);

  const confirmBase = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (resolver.current) resolver.current(false);
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    if (resolver.current) resolver.current(true);
  }, []);

  return (
    <ConfirmContext.Provider value={{ confirmBase }}>
      {children}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        {...options}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (context === undefined) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }

  // Wrap the base confirm to make it easier to use
  const confirm = useCallback(
    (options: ConfirmOptions) => context.confirmBase(options),
    [context]
  );

  return confirm;
}
