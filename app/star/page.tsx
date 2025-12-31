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
          onTriggerEffect={() => effectManagerRef.current?.triggerRandom()}
          constellations={[
            {
              name: "Astraeus",
              description:
                "Lorem ipsum dolor sit amet consectetur adipiscing elitLorem ipsum dolor sit amet consectetur adipiscing elitLorem ipsum dolor sit amet consectetur adipiscing elitLorem ipsum dolor sit amet consectetur adipiscing elitLorem ipsum dolor sit amet consectetur adipiscing elitLorem ipsum dolor sit amet consectetur adipiscing elitLorem ipsum dolor sit amet consectetur adipiscing elitLorem ipsum dolor sit amet consectetur adipiscing elit",
              links: {
                github: "https://github.com/StarOmniscient/Astraeus",
                site: "https://astraeus.runerra.org",
              },
              icon: "/astraeus_logo.png",
              stars: [
                // Custom pattern resembling a star or wind rose
                { ra: 28.0, dec: 15.0, magnitude: 2.5, name: "Astraeus Prime" }, // Center
                {
                  ra: 28.0,
                  dec: 25.0,
                  magnitude: 3.5,
                  name: "Boreas (North Wind)",
                },
                {
                  ra: 28.0,
                  dec: 5.0,
                  magnitude: 3.5,
                  name: "Notus (South Wind)",
                },
                {
                  ra: 29.0,
                  dec: 15.0,
                  magnitude: 3.5,
                  name: "Eurus (East Wind)",
                },
                {
                  ra: 27.0,
                  dec: 15.0,
                  magnitude: 3.5,
                  name: "Zephyrus (West Wind)",
                },
                {
                  ra: 28.7,
                  dec: 22.0,
                  magnitude: 4.5,
                  name: "Eosphorus (Dawn)",
                },
                { ra: 27.3, dec: 8.0, magnitude: 4.5, name: "Hesperus (Dusk)" },
              ],
              connections: [
                [0, 1], // Center -> North
                [0, 2], // Center -> South
                [0, 3], // Center -> East
                [0, 4], // Center -> West
                [1, 5], // North -> Dawn
                [2, 6], // South -> Dusk
                [3, 5], // East -> Dawn
                [4, 6], // West -> Dusk
              ],
            },
            {
              name: "Lynx",
              description: "The elusive feline of the northern sky",
              links: {
                github: "https://github.com/StarOmniscient/Lynx",
                site: "https://lynx.runerra.org",
              },
              icon: "/lynx_logo.png",
              stars: [
                { ra: 6.15, dec: 59.0, magnitude: 5.25, name: "2 Lyncis" },
                { ra: 6.95, dec: 58.42, magnitude: 4.35, name: "15 Lyncis" },
                { ra: 7.43, dec: 49.2, magnitude: 4.61, name: "21 Lyncis" },
                {
                  ra: 8.38,
                  dec: 43.19,
                  magnitude: 4.25,
                  name: "31 Lyncis (Alsciaukat)",
                },
                {
                  ra: 9.31,
                  dec: 36.8,
                  magnitude: 3.82,
                  name: "38 Lyncis (Maculata)",
                },
                {
                  ra: 9.01,
                  dec: 41.78,
                  magnitude: 3.96,
                  name: "10 Ursae Majoris",
                },
                { ra: 9.35, dec: 34.39, magnitude: 3.13, name: "Alpha Lyncis" },
              ],
              connections: [
                [0, 1], // 2 -> 15
                [1, 2], // 15 -> 21
                [2, 3], // 21 -> 31
                [3, 4], // 31 -> 38
                [4, 6], // 38 -> Alpha
                [4, 5], // 38 -> 10 UMa (Spur)
              ],
            },
          ]}
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
