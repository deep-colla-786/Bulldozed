"use client";

import React, { useState } from "react";
import { sounds } from "./SoundEffects";
import { Zap, Check, Sparkles } from "lucide-react";

export interface FlavorCardData {
  id: "mint" | "berry" | "lime";
  name: string;
  subtitle: string;
  caffeine: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  tastingNotes: string[];
  metrics: {
    label: string;
    value: number;
  }[];
  activeIngredients: string[];
}

const FLAVOR_CARDS: FlavorCardData[] = [
  {
    id: "mint",
    name: "Minty Freshness",
    subtitle: "Arctic Menthol & Spearmint Frost",
    caffeine: "50mg",
    badge: "FAN FAVORITE",
    primaryColor: "#0087ce",
    secondaryColor: "#efff00",
    description:
      "A sub-zero icy blast that shocks your palate awake. Clean spearmint crystal notes with zero medicinal bitterness. Delivers 50mg of fast buccal caffeine.",
    tastingNotes: ["Glacial Peppermint", "Crisp Spearmint", "Cool Menthol Rush"],
    metrics: [
      { label: "Cooling Intensity", value: 9 },
      { label: "Kick Speed", value: 10 },
      { label: "Sweetness Balance", value: 6 },
    ],
    activeIngredients: [
      "50mg Micro-Encapsulated Natural Caffeine",
      "Vitamin B6 & B12 Cellular Complex",
      "L-Theanine (Zero Jitter Balance)",
      "Dental-Grade Birch Xylitol",
    ],
  },
  {
    id: "berry",
    name: "Mixed Berries",
    subtitle: "Electric Raspberry & Wild Acai",
    caffeine: "50mg",
    badge: "CANDY REBEL",
    primaryColor: "#ff007a",
    secondaryColor: "#efff00",
    description:
      "Nostalgic sour-candy sweetness colliding with potent energy. Ripe blackberries, wild raspberries, and tart acai with an electric clean finish.",
    tastingNotes: ["Wild Blackberries", "Tart Red Raspberry", "Acai Punch"],
    metrics: [
      { label: "Cooling Intensity", value: 3 },
      { label: "Kick Speed", value: 9 },
      { label: "Sweetness Balance", value: 9 },
    ],
    activeIngredients: [
      "50mg Micro-Encapsulated Natural Caffeine",
      "Vitamin B6 & B12 Complex",
      "Taurine (Focus & Endurance)",
      "Natural Fruit Terpene Flavors",
    ],
  },
  {
    id: "lime",
    name: "Sour Lime",
    subtitle: "Pucker Citrus Shockwave & Yuzu",
    caffeine: "55mg",
    badge: "MAX CAFFEINE",
    primaryColor: "#10ff70",
    secondaryColor: "#0087ce",
    description:
      "Extreme pucker power designed to snap heavy eyelids open. Key lime and tart Japanese yuzu formulated at 55mg natural caffeine for all-night grinds.",
    tastingNotes: ["Key Lime Pucker", "Zesty Yuzu", "Sour Citrus Snap"],
    metrics: [
      { label: "Cooling Intensity", value: 5 },
      { label: "Kick Speed", value: 10 },
      { label: "Sweetness Balance", value: 5 },
    ],
    activeIngredients: [
      "55mg Ultra-Fast Natural Caffeine",
      "Citric & Malic Acid Actives",
      "Electrolyte Trace Minerals",
      "Zero Sugar / Zero Aspartame",
    ],
  },
];

import { FlavorModal } from "./FlavorModal";

interface FlavorSectionProps {
  onSelectFlavorFor3D: (id: "mint" | "berry" | "lime") => void;
  onAddToCart: (flavorId: "mint" | "berry" | "lime") => void;
}

export const FlavorSection: React.FC<FlavorSectionProps> = ({
  onSelectFlavorFor3D,
  onAddToCart,
}) => {
  const [selectedId, setSelectedId] = useState<"mint" | "berry" | "lime">("mint");
  const [addedId, setAddedId] = useState<string | null>(null);
  const [modalFlavor, setModalFlavor] = useState<FlavorCardData | null>(null);

  const selectedFlavor = FLAVOR_CARDS.find((f) => f.id === selectedId) || FLAVOR_CARDS[0];

  const handleAdd = (id: "mint" | "berry" | "lime") => {
    sounds.playPop();
    setAddedId(id);
    onAddToCart(id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="flavors" className="relative w-full py-28 bg-[#0a0a0a] text-[#fffbee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3 text-[11px] font-mono tracking-widest text-[#efff00] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PILOT TRIO // 2026 FORMULA</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-white">
              THE FLAVOR <span className="text-[#efff00]">MATRIX</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-sans leading-relaxed">
            Candy-shop taste profile engineered with pharmaceutical precision. 45–55mg of
            bioavailable caffeine without the chalky medicinal bitterness of pills.
          </p>
        </div>

        {/* 3 Clean Modern Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {FLAVOR_CARDS.map((card) => {
            const isCurrent = selectedId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedId(card.id);
                  onSelectFlavorFor3D(card.id);
                }}
                className={`relative rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                  isCurrent
                    ? "border-white/40 bg-[#141414] shadow-xl"
                    : "border-white/10 bg-[#0f0f0f] hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: card.primaryColor,
                        color: card.id === "lime" ? "#111111" : "#ffffff",
                      }}
                    >
                      {card.badge}
                    </span>

                    <span className="text-xs font-mono font-bold text-[#efff00]">
                      ⚡ {card.caffeine}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight">
                    {card.name}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-white/50">{card.subtitle}</p>

                  <p className="mt-4 text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {card.description}
                  </p>

                  {/* Tasting Note Badges */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {card.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-white/80 border border-white/5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Sensory Intensity Bars */}
                  <div className="mt-6 space-y-2 pt-4 border-t border-white/5">
                    {card.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
                          <span>{m.label}</span>
                          <span className="text-white font-bold">{m.value}/10</span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${m.value * 10}%`,
                              backgroundColor: card.primaryColor,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase font-mono text-white/40">10 PIECES</span>
                      <span className="text-base font-bold text-white font-mono">$4.99</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAdd(card.id);
                      }}
                      className={`px-4 py-2 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                        addedId === card.id
                          ? "bg-[#10ff70] text-black"
                          : "bg-[#efff00] hover:bg-[#d6e600] text-black"
                      }`}
                    >
                      {addedId === card.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> ADDED
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 fill-current" /> ADD TO STASH
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playClick();
                      setModalFlavor(card);
                    }}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-white/5"
                  >
                    <Sparkles className="w-3 h-3 text-[#efff00]" />
                    <span>SENSORY SPECS & LAB PROFILE</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Formulation Specs Row */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#121212] border border-white/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#efff00] uppercase font-bold">
                CLEAN FORMULATION STANDARD
              </span>
              <h4 className="text-xl sm:text-2xl font-display font-black uppercase text-white mt-1">
                {selectedFlavor.name.toUpperCase()} INGREDIENT PROFILE
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full lg:w-auto">
              {selectedFlavor.activeIngredients.map((ing, i) => (
                <div
                  key={i}
                  className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-white/80 flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#efff00] shrink-0" />
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Sensory Tasting Modal */}
      <FlavorModal
        flavor={modalFlavor}
        isOpen={!!modalFlavor}
        onClose={() => setModalFlavor(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
