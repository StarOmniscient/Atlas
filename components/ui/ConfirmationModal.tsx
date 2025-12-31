"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StarBackground } from "@/components/ui/StarBackground";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmationModalProps) {
  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-6 overflow-hidden border bg-background p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl",
            variant === "destructive" ? "border-rose-500/20" : "border-zinc-800"
          )}
        >
          <StarBackground className="opacity-20" />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  variant === "destructive"
                    ? "bg-rose-500/10 text-rose-500"
                    : "bg-primary/10 text-primary"
                )}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <DialogPrimitive.Title className="text-xl font-bold tracking-tight">
                {title}
              </DialogPrimitive.Title>
            </div>

            <DialogPrimitive.Description className="text-zinc-400 text-sm leading-relaxed">
              {message}
            </DialogPrimitive.Description>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>
              <Button
                variant={variant === "destructive" ? "destructive" : "default"}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </Button>
            </div>
          </div>

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-20">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
