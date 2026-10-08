"use client";

import React from "react";
import { Zap } from "lucide-react";

export const MarqueeTicker: React.FC = () => {
  const items = [
    "50MG BUCCAL ABSORPTION",
    "ZERO SUGAR CRASH",
    "INSTANT KICK IN 5 MINS",
    "PURE ANHYDROUS CAFFEINE",
    "NO BITTER AFTERTASTE",
    "POCKET SIZED ENERGY",
    "CHEW THE SPEED",
    "BULLETPROOF FOCUS",
  ];

  return (
    <div className="relative w-full overflow-hidden py-2.5 bg-[#0e0e0e] border-y border-white/10 font-mono text-xs uppercase tracking-widest select-none z-20 text-white/70">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-6 gap-3">
            <span>{text}</span>
            <Zap className="w-3 h-3 text-[#efff00] fill-current shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
