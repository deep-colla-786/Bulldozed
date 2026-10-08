"use client";

import React, { useState } from "react";
import { sounds } from "./SoundEffects";
import { Zap, Clock, ShieldCheck, Flame } from "lucide-react";

export const DoseCalculator: React.FC = () => {
  const [hours, setHours] = useState<number>(6);
  const [intensity, setIntensity] = useState<"normal" | "turbo" | "beast">("turbo");

  const getPieces = () => {
    if (intensity === "normal") return Math.max(1, Math.round(hours / 4));
    if (intensity === "turbo") return Math.max(1, Math.round(hours / 2.5));
    return Math.max(2, Math.round(hours / 2));
  };

  const pieces = getPieces();
  const totalCaffeine = pieces * 50;

  return (
    <section className="w-full py-16 bg-[#111111] border-y border-[#222222]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#161616] to-[#121212] border-2 border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#efff00] font-bold uppercase mb-2">
            <Zap className="w-4 h-4 fill-current" />
            <span>INTERACTIVE ENERGY CALCULATOR</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
            CALCULATE YOUR BULLDOZED DOSE
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#fffbee]/70 font-sans">
            Dial in your focus timeline. We calculate the exact piece timing for zero jitters and zero sugar crash.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Input Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono text-white/70 mb-2">
                  <span>HOURS OF SHARP FOCUS NEEDED:</span>
                  <span className="text-[#efff00] font-bold text-sm">{hours} HOURS</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="14"
                  step="1"
                  value={hours}
                  onChange={(e) => {
                    sounds.playClick();
                    setHours(Number(e.target.value));
                  }}
                  className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#efff00]"
                />
              </div>

              <div>
                <span className="block text-xs font-mono text-white/70 mb-2">OUTPUT INTENSITY:</span>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {(["normal", "turbo", "beast"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        sounds.playClick();
                        setIntensity(lvl);
                      }}
                      className={`py-2 px-1 sm:px-3 rounded-xl text-[10px] sm:text-xs font-mono font-bold uppercase transition-all border ${
                        intensity === lvl
                          ? "bg-[#efff00] text-[#111111] border-[#efff00]"
                          : "bg-[#1f1f1f] text-white/70 border-white/10 hover:text-white"
                      }`}
                    >
                      {lvl === "normal" ? "Clean Flow" : lvl === "turbo" ? "⚡ Turbo" : "🔥 Beast"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                  <span>RECOMMENDED DOSAGE</span>
                  <span className="text-[#10ff70] font-bold">OPTIMIZED</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-display text-[#efff00]">
                    {pieces} {pieces === 1 ? "PIECE" : "PIECES"}
                  </span>
                  <span className="text-xs font-mono text-white/60">
                    ({totalCaffeine}mg total)
                  </span>
                </div>

                <p className="mt-3 text-xs text-white/70 font-mono leading-relaxed">
                  Chew 1 piece at minute 0. Chew next piece at minute {Math.round((hours * 60) / pieces)}. 
                  Maintain continuous buccal plasma levels.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>Equivalent to {Math.round(totalCaffeine / 80)} Espressos</span>
                <span className="text-[#efff00]">0 Calories</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
