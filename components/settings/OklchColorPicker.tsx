"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface OklchColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

// Utility to parse oklch string
// Format: oklch(L C H) or oklch(L C H / A)
// L: 0-1 (or 0%-100%), C: 0-0.4 (approx), H: 0-360
const parseOklch = (color: string) => {
  const match = color.match(
    /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i
  );
  if (!match) return { l: 1, c: 0, h: 0, a: 1 };

  let l = parseFloat(match[1]);
  if (match[1].endsWith("%")) l /= 100;

  const c = parseFloat(match[2]);
  const h = parseFloat(match[3]);

  let a = 1;
  if (match[4]) {
    a = parseFloat(match[4]);
    if (match[4].endsWith("%")) a /= 100;
  }

  return { l, c, h, a };
};

export function OklchColorPicker({
  color,
  onChange,
  className,
}: OklchColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalState, setInternalState] = useState({
    l: 1,
    c: 0,
    h: 0,
    a: 1,
  });

  // Sync internal state with external prop, but only when not dragging (handled by popover open intent mostly)
  // or on initial load. We re-parse whenever 'color' changes externally.
  useEffect(() => {
    if (color && color.startsWith("oklch")) {
      setInternalState(parseOklch(color));
    }
  }, [color]);

  const updateColor = (updates: Partial<typeof internalState>) => {
    const newState = { ...internalState, ...updates };
    setInternalState(newState);
    // Format: oklch(L C H) - usually standard for standard usage
    // Using 3 decimals for precision
    const l = Math.max(0, Math.min(1, newState.l)).toFixed(3);
    const c = Math.max(0, newState.c).toFixed(3);
    const h = Math.max(0, Math.min(360, newState.h)).toFixed(1);

    // We omit alpha if it is 1 for cleaner CSS
    const newColorString = `oklch(${l} ${c} ${h})`;
    onChange(newColorString);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "w-full h-8 rounded border shadow-sm cursor-pointer relative overflow-hidden group",
            className
          )}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                "conic-gradient(#eee 25%, white 0 50%, #eee 0 75%, white 0)",
              backgroundSize: "10px 10px",
            }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{ backgroundColor: color }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 z-[60]">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold text-muted-foreground">
                Lightness
              </Label>
              <span className="text-xs font-mono text-muted-foreground">
                {(internalState.l * 100).toFixed(0)}%
              </span>
            </div>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[internalState.l]}
              onValueChange={([val]) => updateColor({ l: val })}
              className="[&>span:first-child]:h-3 [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-black [&>span:first-child]:to-white"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold text-muted-foreground">
                Chroma
              </Label>
              <span className="text-xs font-mono text-muted-foreground">
                {internalState.c.toFixed(3)}
              </span>
            </div>
            <Slider
              min={0}
              max={0.4}
              step={0.001}
              value={[internalState.c]}
              onValueChange={([val]) => updateColor({ c: val })}
              className="[&>span:first-child]:h-3 [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-gray-300 [&>span:first-child]:to-[oklch(0.5_0.4_0)]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold text-muted-foreground">
                Hue
              </Label>
              <span className="text-xs font-mono text-muted-foreground">
                {internalState.h.toFixed(0)}°
              </span>
            </div>
            <Slider
              min={0}
              max={360}
              step={1}
              value={[internalState.h]}
              onValueChange={([val]) => updateColor({ h: val })}
              // Hue rainbow gradient
              className="[&>span:first-child]:h-3 [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-[oklch(0.5_0.4_0)] [&>span:first-child]:via-[oklch(0.5_0.4_180)] [&>span:first-child]:to-[oklch(0.5_0.4_360)]"
            />
          </div>

          <div className="pt-2">
            <Input
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="h-7 text-xs font-mono"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
