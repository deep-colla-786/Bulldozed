"use client";

import React, { useState, useEffect } from "react";

interface EyeIconProps {
  className?: string;
  pupilColor?: string;
  irisColor?: string;
  outlineColor?: string;
  size?: number | string;
  interactive?: boolean;
}

export const EyeIcon: React.FC<EyeIconProps> = ({
  className = "",
  pupilColor = "#111111",
  irisColor = "#efff00",
  outlineColor = "currentColor",
  size = 40,
  interactive = false,
}) => {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 12;
      const y = ((e.clientY / innerHeight) - 0.5) * 8;
      setPupilPos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: typeof size === "number" ? size * 0.6 : size }}
    >
      {/* Outer Eye Shell */}
      <path
        d="M 5 30 Q 50 -10 95 30 Q 50 70 5 30 Z"
        fill="#fffbee"
        stroke={outlineColor}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Iris */}
      <g transform={`translate(${pupilPos.x}, ${pupilPos.y})`}>
        <circle cx="50" cy="30" r="18" fill={irisColor} stroke={outlineColor} strokeWidth="4" />
        {/* Pupil */}
        <circle cx="50" cy="30" r="9" fill={pupilColor} />
        {/* Specular Catchlight */}
        <circle cx="46" cy="26" r="3.5" fill="#ffffff" />
        {/* Energy Sparkle */}
        <path
          d="M 50 14 L 52 20 L 58 22 L 52 24 L 50 30 L 48 24 L 42 22 L 48 20 Z"
          fill="#efff00"
          opacity="0.8"
        />
      </g>
    </svg>
  );
};

// Repeating eye pattern wallpaper/overlay component
export const EyePatternBackground: React.FC<{
  opacity?: number;
  className?: string;
}> = ({ opacity = 0.07, className = "" }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="bulldozed-eye-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(20)"
          >
            {/* Eye shape in pattern */}
            <path
              d="M 10 40 Q 40 15 70 40 Q 40 65 10 40 Z"
              fill="none"
              stroke="#efff00"
              strokeWidth="2.5"
            />
            <circle cx="40" cy="40" r="10" fill="#0087ce" />
            <circle cx="40" cy="40" r="4.5" fill="#efff00" />
            
            {/* Small diagonal energy crosses */}
            <path
              d="M 5 5 L 11 11 M 11 5 L 5 11"
              stroke="#fffbee"
              strokeWidth="1.5"
            />
            <path
              d="M 68 68 L 74 74 M 74 68 L 68 74"
              stroke="#efff00"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bulldozed-eye-grid)" />
      </svg>
    </div>
  );
};
