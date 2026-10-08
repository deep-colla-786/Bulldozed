"use client";

import React, { useState, useEffect } from "react";
import { RunningMan } from "./RunningMan";
import { sounds } from "./SoundEffects";
import { ShoppingBag, Zap, ChevronUp } from "lucide-react";

interface FloatingBuyBarProps {
  activeFlavorId: "mint" | "berry" | "lime";
  onFlavorChange: (id: "mint" | "berry" | "lime") => void;
  onAddToCart: (id: "mint" | "berry" | "lime") => void;
}

export const FloatingBuyBar: React.FC<FloatingBuyBarProps> = ({
  activeFlavorId,
  onFlavorChange,
  onAddToCart,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const experienceEl = document.getElementById("experience-3d");
      const stashEl = document.getElementById("stash");

      if (!experienceEl) {
        setVisible(scrollY > 500);
        return;
      }

      const expRect = experienceEl.getBoundingClientRect();
      const inExperience = expRect.top <= 100 && expRect.bottom >= 200;

      // Also hide if already in the purchase section
      const inStash = stashEl ? stashEl.getBoundingClientRect().top < 300 : false;

      // Show if scrolled past 600px and NOT currently in the 3D sticky area or Stash purchase section
      if (scrollY > 500 && !inExperience && !inStash) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const flavors = [
    { id: "mint" as const, name: "Mint", color: "#0087ce" },
    { id: "berry" as const, name: "Berry", color: "#ff007a" },
    { id: "lime" as const, name: "Lime", color: "#10ff70" },
  ];

  return (
    <aside
      aria-label="Quick order toolbar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-35 w-[92%] max-w-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="p-2 sm:p-2.5 rounded-2xl bg-[#141414]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex items-center justify-between gap-2">
        {/* Brand Chip */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-1 shrink-0">
          <div className="p-1 rounded-lg bg-[#efff00] text-black">
            <RunningMan variant="sprint" color="#111111" size={14} />
          </div>
          <span className="font-display font-black text-xs sm:text-sm tracking-tight uppercase text-white hidden xs:inline">
            50MG
          </span>
        </div>

        {/* Mini Flavor Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
          {flavors.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                sounds.playClick();
                onFlavorChange(f.id);
              }}
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                activeFlavorId === f.id
                  ? "bg-[#fffbee] text-black shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: f.color }}
              />
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* Quick Add CTA */}
        <button
          onClick={() => {
            sounds.playPop();
            onAddToCart(activeFlavorId);
          }}
          className="px-3 sm:px-4 py-2 rounded-xl bg-[#efff00] hover:bg-[#d6e600] text-black font-display font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-md shadow-[#efff00]/25 shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>STASH $4.99</span>
        </button>
      </div>
    </aside>
  );
};
