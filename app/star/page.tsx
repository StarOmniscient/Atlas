"use client";
import { useEffect, useRef, useState } from "react";
import { StarMap } from "@/components/backgrounds/starMap";
import {
  CelestialEffectManager,
  EffectManagerHandle,
} from "@/components/backgrounds/CelestialEffectManager";
import { StarCard } from "@/components/ui/StarCard";

export default function StarPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectManagerRef = useRef<EffectManagerHandle>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Also observe container size changes (e.g., sidebar toggle)
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  const [starsEnabled, setStarsEnabled] = useState(true);
  const [cometsEnabled, setCometsEnabled] = useState(true);

  return (
    <div ref={containerRef} className="w-full h-full">
      {dimensions.width > 0 && (
        <StarMap
          height={dimensions.height}
          width={dimensions.width}
          constellations={[]}
          numOfStars={50000}
          effects={
            <CelestialEffectManager
              ref={effectManagerRef}
              width={dimensions.width}
              height={dimensions.height}
              enableComets={true}
            />
          }
        >
          <div className="absolute pointer-events-none flex flex-col items-center text-center -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-widest opacity-90 mb-2">
              Akaryth
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-300 font-light tracking-[0.2em] uppercase mb-4">
              StarMap
            </h2>
          </div>
        </StarMap>
      )}
    </div>
  );
}
