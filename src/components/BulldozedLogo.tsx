"use client";

import React from "react";
import {
  MASCOT_PATH_DATA,
  EYE_PATH_DATA,
  BULL_TEXT_PATH_DATA,
  DOZED_TEXT_PATH_DATA,
} from "./drawBulldozedLogoOnCanvas";

interface LogoProps {
  className?: string;
  variant?: "full" | "mascot" | "horizontal" | "wordmark";
  color?: string; // Default: "#fffbee" (Cream)
  textColor?: string;
  size?: number | string;
  glow?: boolean;
}

/**
 * Authentic Bulldozed Mascot Runner
 * - Aerodynamic bullet head facing left with almond eye
 * - 3 horizontal trailing speed crests
 * - Front arm pumped up & left
 * - Rear arm arched back & up
 * - Signature flared bell-bottom front leg with flat ground baseline
 * - Athletic high-kick hook rear leg
 */
export const BulldozedMascot: React.FC<{
  className?: string;
  color?: string;
  size?: number | string;
  eyeColor?: string;
}> = ({
  className = "",
  color = "#fffbee",
  size = 48,
  eyeColor = "#111111",
}) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, display: "inline-block" }}
    >
      <g>
        {/* Continuous Solid Mascot Silhouette */}
        <path
          fill={color}
          fillRule="evenodd"
          clipRule="evenodd"
          d={MASCOT_PATH_DATA}
          transform="scale(1.25) translate(-14, -10)"
        />

        {/* Eye Opening on Head */}
        <g transform="scale(1.25) translate(-14, -10)">
          <path d={EYE_PATH_DATA} fill={eyeColor} />
          {/* Pupil Dot */}
          <circle cx="64.5" cy="45" r="1.2" fill={color} />
        </g>
      </g>
    </svg>
  );
};

/**
 * Authentic Brutalist Stacked BULL DOZED Typography
 */
export const BulldozedWordmark: React.FC<{
  className?: string;
  color?: string;
  stacked?: boolean;
  size?: number | string;
}> = ({
  className = "",
  color = "#fffbee",
  stacked = true,
  size = "auto",
}) => {
  if (!stacked) {
    return (
      <span
        className={`font-display font-black tracking-tighter uppercase whitespace-nowrap select-none ${className}`}
        style={{ color }}
      >
        BULLDOZED
      </span>
    );
  }

  // Exact Stacked Vector BULL / DOZED perfectly fitted within 160x88
  return (
    <svg
      viewBox="0 0 160 88"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: "auto", display: "block" }}
    >
      {/* ROW 1: BULL */}
      <g id="row-bull">
        <path d={BULL_TEXT_PATH_DATA} />
      </g>

      {/* ROW 2: DOZED */}
      <g id="row-dozed">
        <path d={DOZED_TEXT_PATH_DATA} />
      </g>
    </svg>
  );
};

/**
 * Master Bulldozed Brand Logo Component
 * - "full": Mascot stacked directly above BULL DOZED (matches Image 1 & Image 3)
 * - "horizontal": Mascot icon beside BULLDOZED wordmark (for header navbar)
 * - "mascot": Only the runner character
 * - "wordmark": Only the typography
 */
export const BulldozedLogo: React.FC<LogoProps> = ({
  className = "",
  variant = "full",
  color = "#fffbee",
  textColor,
  size = 180,
  glow = false,
}) => {
  const actualTextColor = textColor || color;

  if (variant === "mascot") {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <BulldozedMascot color={color} size={size} />
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={`relative inline-block ${className}`}>
        <BulldozedWordmark color={actualTextColor} stacked={true} size={size} />
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div
        className={`inline-flex items-center gap-2.5 group select-none ${className}`}
      >
        <div className="shrink-0 transition-transform group-hover:scale-105">
          <BulldozedMascot
            color={color}
            size={typeof size === "number" ? Math.round(size * 0.28) : "32px"}
          />
        </div>
        <span
          className="font-display font-black tracking-tight uppercase transition-colors"
          style={{
            color: actualTextColor,
            fontSize: typeof size === "number" ? `${Math.round(size * 0.18)}px` : "1.25rem",
            letterSpacing: "-0.03em",
          }}
        >
          BULLDOZED
        </span>
      </div>
    );
  }

  // Full lockup: Mascot centered above stacked BULL DOZED (Image 1 & 3 layout)
  const numericSize = typeof size === "number" ? size : 200;
  const mascotHeight = Math.round(numericSize * 0.65);
  const textWidth = Math.round(numericSize * 0.85);

  return (
    <div
      className={`flex flex-col items-center justify-center select-none text-center ${
        glow ? "drop-shadow-[0_0_24px_rgba(239,255,0,0.35)]" : ""
      } ${className}`}
      style={{ width: numericSize }}
    >
      {/* 1. Mascot Runner Centered */}
      <div className="w-full flex items-center justify-center">
        <BulldozedMascot
          color={color}
          size={mascotHeight}
          eyeColor={color === "#111111" ? "#fffbee" : "#111111"}
        />
      </div>

      {/* 2. Stacked Typography BULL DOZED Directly Below */}
      <div className="mt-1 w-full flex items-center justify-center">
        <BulldozedWordmark
          color={actualTextColor}
          stacked={true}
          size={textWidth}
        />
      </div>
    </div>
  );
};
