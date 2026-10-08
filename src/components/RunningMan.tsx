"use client";

import React from "react";
import { BulldozedMascot } from "./BulldozedLogo";

interface RunningManProps {
  className?: string;
  variant?: "sprint" | "lightning" | "chewing" | "stamp" | "minimal";
  color?: string; // e.g. "currentColor" or "#efff00" or "#0087ce"
  size?: number | string;
}

/**
 * RunningMan mascot component - uses the authentic Bulldozed mascot runner
 */
export const RunningMan: React.FC<RunningManProps> = ({
  className = "",
  variant = "sprint",
  color = "#efff00",
  size = 48,
}) => {
  if (variant === "stamp") {
    return (
      <div
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full animate-[spin_20s_linear_infinite]"
          fill="none"
        >
          <path
            id="stamp-circle"
            d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            fill="none"
          />
          <text
            className="text-[10px] font-black tracking-[0.28em] uppercase"
            fill={color}
          >
            <textPath href="#stamp-circle" startOffset="0%">
              • BULLDOZED • 50MG INSTANT ENERGY • BUCCAL ABSORPTION
            </textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <BulldozedMascot color={color} size="60%" />
        </div>
      </div>
    );
  }

  // Default and variants: All use the authentic, proper Bulldozed runner silhouette
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <BulldozedMascot color={color} size={size} />
    </div>
  );
};
