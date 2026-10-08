"use client";

import React, { useState } from "react";
import { sounds } from "./SoundEffects";
import { Zap, Check, X, Terminal, Dumbbell, GraduationCap, Car, Gamepad2 } from "lucide-react";

const COMPARISONS = [
  {
    feature: "Absorption Onset Time",
    bulldozed: "5 Minutes Flat (Buccal Mucosa)",
    energyDrink: "40–55 Minutes (Stomach Digestion)",
    coffee: "30–45 Minutes (Slow GI Breakdown)",
  },
  {
    feature: "Sugar & Crash Factor",
    bulldozed: "0g Sugar / Zero Crash",
    energyDrink: "38–54g Sugar / Severe 3PM Crash",
    coffee: "Acidity Spike / Jitters & Drop",
  },
  {
    feature: "Fluid Burden & Bladder Pressure",
    bulldozed: "0 ml Fluid (Zero interruptions)",
    energyDrink: "473 ml (16 fl oz) Carbonated Liquid",
    coffee: "350 ml Diuretic Liquid",
  },
  {
    feature: "Pocket Portability",
    bulldozed: "Ultra-thin 15g foil pouch in coin pocket",
    energyDrink: "Bulky, lukewarm aluminum can",
    coffee: "Fragile hot cup or costly machine",
  },
  {
    feature: "Cost Per 50mg Energy Kick",
    bulldozed: "$0.49 / dose",
    energyDrink: "$3.50 – $4.50 / can",
    coffee: "$5.00 – $7.00 / latte",
  },
];

const HUSTLE_MODES = [
  {
    id: "coding",
    icon: Terminal,
    title: "Late-Night Coding & Debugging",
    tagline: "Break Through The 2:00 AM Wall",
    description:
      "When production is down or you are in flow state, you cannot afford bathroom breaks or waiting 45 minutes for coffee to digest. Bulldozed delivers instant cognitive clarity.",
    dosage: "1 Chewing Piece every 3 hours",
  },
  {
    id: "college",
    icon: GraduationCap,
    title: "College Finals & Cramming",
    tagline: "Retain Maximum Focus Density",
    description:
      "Micro-encapsulated caffeine paired with L-theanine sharpens working memory without the jittery palpitations of cheap convenience store energy drinks.",
    dosage: "1 Piece at start of study block",
  },
  {
    id: "gym",
    icon: Dumbbell,
    title: "Pre-Workout Heavy Sessions",
    tagline: "Explosive Neuromuscular Drive",
    description:
      "Heavy squats and deadlifts don't mix with a stomach full of 500ml pre-workout sludge sloshing around. Chew two pieces as you tie your lifting shoes.",
    dosage: "1–2 Pieces 10 mins before warm-up",
  },
  {
    id: "esports",
    icon: Gamepad2,
    title: "Competitive Esports Reflexes",
    tagline: "Sub-Millisecond Tracking",
    description:
      "Competitive esports athletes rely on hand-eye speed. Bulldozed delivers clean dopamine without sticky soda spills on keyboards or sweaty adrenaline crashes.",
    dosage: "1 Piece before Ranked matches",
  },
  {
    id: "drive",
    icon: Car,
    title: "Highway Long-Haul Driving",
    tagline: "Vigilance When Fatigue Strikes",
    description:
      "Highway hypnosis happens fast. Popping a sour lime Bulldozed triggers instant sensory pucker and rapid capillary caffeine to snap micro-sleep impulses.",
    dosage: "1 Piece as eyelids get heavy",
  },
];

export const ChewVsDrinkManifesto: React.FC = () => {
  const [activeHustle, setActiveHustle] = useState(HUSTLE_MODES[0]);

  return (
    <section id="chew-vs-drink" className="relative w-full py-28 bg-[#0a0a0a] text-[#fffbee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 text-[11px] font-mono tracking-widest text-[#efff00] uppercase">
            <span>SCIENTIFIC PHARMACOKINETICS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-white max-w-3xl">
            CHEW VS DRINK: <br />
            <span className="text-[#efff00]">THE LIQUID ERA</span> IS OVER.
          </h2>

          <p className="mt-4 max-w-xl text-sm sm:text-base text-white/60 font-sans leading-relaxed">
            Ingestion is slow and outdated. Buccal sublingual delivery cuts time-to-brain from 45 minutes down to 300 seconds.
          </p>
        </div>

        {/* Desktop Comparison Matrix Table (Hidden on Mobile) */}
        <div className="hidden md:block mb-20 overflow-x-auto">
          <div className="min-w-[700px] rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8">
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs font-mono font-bold tracking-widest uppercase">
              <div className="col-span-4 text-white/40">METRIC</div>
              <div className="col-span-3 text-[#efff00] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>BULLDOZED GUM</span>
              </div>
              <div className="col-span-3 text-white/40">CAN ENERGY DRINK</div>
              <div className="col-span-2 text-white/40">ESPRESSO</div>
            </div>

            <div className="divide-y divide-white/5">
              {COMPARISONS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-4 py-4 items-center hover:bg-white/[0.02] transition-colors"
                >
                  <div className="col-span-4 font-mono font-bold text-xs sm:text-sm text-white">
                    {row.feature}
                  </div>

                  <div className="col-span-3 font-mono font-bold text-xs sm:text-sm text-[#efff00] flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#efff00] shrink-0" />
                    <span>{row.bulldozed}</span>
                  </div>

                  <div className="col-span-3 font-mono text-xs text-white/40 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400/60 shrink-0" />
                    <span>{row.energyDrink}</span>
                  </div>

                  <div className="col-span-2 font-mono text-xs text-white/40 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400/60 shrink-0" />
                    <span>{row.coffee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Comparison Cards (Visible only on mobile screens < 768px) */}
        <div className="md:hidden mb-16 space-y-3.5">
          {COMPARISONS.map((row, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#121212] border border-white/10 flex flex-col gap-2.5 shadow-md"
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 font-bold border-b border-white/5 pb-1.5">
                {row.feature}
              </div>

              {/* Bulldozed Winner Box */}
              <div className="p-2.5 rounded-lg bg-[#efff00]/10 border border-[#efff00]/30 flex items-center gap-2">
                <div className="p-1 rounded bg-[#efff00] text-black shrink-0">
                  <Zap className="w-3 h-3 fill-current" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-[#efff00] font-bold uppercase tracking-wider">
                    BULLDOZED GUM
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {row.bulldozed}
                  </span>
                </div>
              </div>

              {/* Legacy Liquids Comparison */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <span className="text-white/40 block mb-0.5">Energy Drink:</span>
                  <span className="text-white/70 line-through decoration-red-400/60">{row.energyDrink}</span>
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <span className="text-white/40 block mb-0.5">Espresso:</span>
                  <span className="text-white/70 line-through decoration-red-400/60">{row.coffee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tactical Hustle Arenas */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
              TACTICAL ARENAS
            </h3>
            <p className="mt-1 text-xs text-white/50 font-mono">
              Engineered for high-focus scenarios
            </p>
          </div>

          {/* Arena Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {HUSTLE_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeHustle.id === mode.id;

              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveHustle(mode);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    isActive
                      ? "bg-[#fffbee] text-black border-[#fffbee] font-bold"
                      : "bg-[#111111] text-white/60 border-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{mode.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Arena Detail */}
          <div className="rounded-2xl bg-[#121212] border border-white/10 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-[10px] font-mono text-[#efff00] font-bold uppercase tracking-wider block mb-1">
                  {activeHustle.tagline}
                </span>
                <h4 className="text-xl sm:text-2xl font-display font-black uppercase text-white">
                  {activeHustle.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                  {activeHustle.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 w-full lg:w-auto lg:min-w-[240px]">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#0087ce] font-bold block mb-1">
                  PROTOCOL
                </span>
                <span className="text-sm font-bold text-white font-mono block">
                  {activeHustle.dosage}
                </span>
                <span className="text-[10px] text-[#efff00] font-mono mt-1 block">
                  ⚡ Peak absorption in 5 minutes
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
