"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface StarBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StarBackground({ className, ...props }: StarBackgroundProps) {
  const [stars, setStars] = React.useState<
    Array<{
      top: string;
      left: string;
      width: string;
      height: string;
      animationDelay: string;
      animationDuration: string;
    }>
  >([]);

  React.useEffect(() => {
    const newStars = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div
      className={cn("absolute inset-0 z-0 pointer-events-none", className)}
      {...props}
    >
      <div className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-(--star-color,white) animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-(--gradient-from,rgba(99,102,241,0.05)) via-transparent to-(--gradient-to,rgba(168,85,247,0.05)) opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}
