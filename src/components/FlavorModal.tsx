"use client";

import React from "react";
import { sounds } from "./SoundEffects";
import { FlavorCardData } from "./FlavorSection";
import { X, Zap, ShieldCheck, Sparkles, Check, ShoppingBag, Droplets, Clock, Flame } from "lucide-react";

interface FlavorModalProps {
  flavor: FlavorCardData | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (id: "mint" | "berry" | "lime") => void;
}

export const FlavorModal: React.FC<FlavorModalProps> = ({
  flavor,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !flavor) return null;

  const handleAdd = () => {
    sounds.playPop();
    onAddToCart(flavor.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-2xl rounded-3xl bg-[#121212] border-2 border-white/15 text-[#fffbee] shadow-2xl overflow-hidden my-8">
          
          {/* Top Banner with Flavor Glow */}
          <div
            className="p-6 sm:p-8 relative border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, ${flavor.primaryColor}22 0%, #121212 100%)`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: flavor.primaryColor,
                  color: flavor.id === "lime" ? "#111111" : "#ffffff",
                }}
              >
                {flavor.badge}
              </span>
              <span className="text-xs font-mono font-bold text-[#efff00]">
                ⚡ {flavor.caffeine} ACTIVE BUCCAL
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
              {flavor.name}
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-mono text-white/60">
              {flavor.subtitle}
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Description */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold mb-2">
                TASTE MANIFESTO
              </h4>
              <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                {flavor.description}
              </p>
            </div>

            {/* Tasting Notes */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold mb-2">
                PALATE NOTES
              </h4>
              <div className="flex flex-wrap gap-2">
                {flavor.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-mono text-white border border-white/10 flex items-center gap-1.5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: flavor.primaryColor }}
                    />
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Sensory Intensity Breakdown */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold mb-3">
                SENSORY METRIC ANALYSIS
              </h4>
              <div className="space-y-3">
                {flavor.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-mono text-white/60 mb-1">
                      <span>{m.label}</span>
                      <span className="text-[#efff00] font-bold">{m.value}/10</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${m.value * 10}%`,
                          backgroundColor: flavor.primaryColor,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Biochemical Ingredients */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold mb-2.5">
                BIOAVAILABLE FORMULA SPECS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {flavor.activeIngredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-white/80"
                  >
                    <Check className="w-3.5 h-3.5 text-[#10ff70] shrink-0" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer CTA */}
          <div className="p-6 sm:p-8 bg-[#0d0d0d] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase">PILOT PACK (10 CHEWS)</div>
              <div className="text-2xl font-bold font-mono text-[#efff00]">$4.99</div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#efff00] hover:bg-[#d6e600] text-[#111111] font-display font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#efff00]/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>STASH THIS FLAVOR • $4.99</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
