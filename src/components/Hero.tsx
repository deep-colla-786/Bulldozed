"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RunningMan } from "./RunningMan";
import { BulldozedMascot } from "./BulldozedLogo";
import { sounds } from "./SoundEffects";
import { Zap, ArrowDown, Sparkles, Check, ShoppingBag } from "lucide-react";

interface HeroProps {
  onExplore3D: () => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore3D, onOpenCart }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveredTitle, setIsHoveredTitle] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 20;
      const ny = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[95vh] w-full flex flex-col justify-between pt-28 sm:pt-32 pb-12 overflow-hidden bg-[#0a0a0a]">
      {/* Subtle, clean architectural grid lines */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-40" />

      {/* Elegant atmospheric depth glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#efff00]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Status Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex items-center justify-between text-xs font-mono">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#efff00] animate-ping" />
          <span className="text-white/80 uppercase tracking-widest text-[11px]">
            BUCCAL CAFFEINE GUM // 50MG
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[11px] font-mono tracking-wider text-white/50 uppercase">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#efff00]" /> 5-Min Capillary Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#0087ce]" /> Zero Sugar / Zero Crash
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#efff00]" /> Pocket Form Factor
          </span>
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 my-auto py-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-[#efff00]/10 border border-[#efff00]/20 text-[11px] font-mono tracking-[0.2em] uppercase text-[#efff00]">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>INSTANT BIOAVAILABLE ENERGY</span>
          </div>

          {/* Authentic Brand Mascot Herald */}
          <div
            className="my-2 cursor-pointer group flex flex-col items-center"
            onClick={() => {
              sounds.playZap();
            }}
          >
            <div className="p-3 sm:p-4 rounded-3xl bg-[#141414] border border-white/10 group-hover:border-[#efff00]/50 transition-all shadow-2xl group-hover:shadow-[0_0_35px_rgba(239,255,0,0.25)] group-hover:scale-105">
              <BulldozedMascot color="#efff00" size={64} />
            </div>
          </div>

          {/* Clean, Massive Statement Wordmark - Full Brand Name Always 100% Visible */}
          <div
            className="relative select-none cursor-pointer group my-2 w-full flex items-center justify-center"
            onMouseEnter={() => {
              setIsHoveredTitle(true);
              sounds.playZap();
            }}
            onMouseLeave={() => setIsHoveredTitle(false)}
          >
            <h1 className="text-[clamp(2.4rem,8.2vw,7.2rem)] leading-none font-black font-display tracking-tight uppercase text-white transition-colors duration-300 group-hover:text-[#efff00] text-center whitespace-nowrap">
              BULLDOZED
            </h1>
          </div>

          {/* Core Manifesto Statement */}
          <div className="mt-4 sm:mt-5 max-w-3xl px-2">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight uppercase leading-tight text-[#fffbee]">
              &ldquo;WE AREN&apos;T REALLY SELLING CAFFEINE.{" "}
              <span className="text-[#efff00] underline decoration-[#efff00]/40 underline-offset-4 sm:underline-offset-8">
                WE ARE SELLING ENERGY.
              </span>
              &rdquo;
            </h2>

            <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-xs sm:text-sm md:text-base text-white/60 font-sans leading-relaxed">
              No bloated 500ml liquids. No 45-minute digestion wait. Bulldozed delivers 50mg of pure
              natural caffeine directly through your mouth lining in 5 minutes flat.
            </p>
          </div>

          {/* Clean Interactive Mascot Pill */}
          <motion.div
            style={{ x: mousePos.x, y: mousePos.y }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="mt-6 flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#141414] border border-white/10 backdrop-blur-md cursor-pointer hover:border-[#efff00]/40 transition-colors"
            onClick={() => sounds.playZap()}
          >
            <BulldozedMascot color="#efff00" size={28} />
            <div className="text-left font-mono">
              <div className="text-[10px] text-white/40 uppercase tracking-widest">OFFICIAL PROPULSION MASCOT</div>
              <div className="text-xs font-bold text-white tracking-wider">RUNNING-MAN ENGINE ACTIVE</div>
            </div>
          </motion.div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => {
                sounds.playPop();
                onOpenCart();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#efff00] hover:bg-[#d6e600] text-[#111111] font-display font-black text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 shadow-lg shadow-[#efff00]/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>GET BULLDOZED NOW</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onExplore3D();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#161616] hover:bg-[#202020] text-white border border-white/10 hover:border-white/30 font-display font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#efff00]" />
              <span>EXPERIENCE 3D PACK</span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div
        className="w-full flex flex-col items-center justify-center text-center z-10 cursor-pointer pt-4 opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => {
          sounds.playClick();
          onExplore3D();
        }}
      >
        <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 mb-1.5">
          SCROLL TO TEAR FOIL IN 3D
        </span>
        <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[#efff00]">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
