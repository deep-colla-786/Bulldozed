"use client";

import React, { useState } from "react";
import { sounds } from "./SoundEffects";
import { Zap, Check, ShoppingBag } from "lucide-react";

export interface BundleTier {
  id: string;
  name: string;
  pieces: number;
  packs: number;
  priceOneTime: number;
  priceSub: number;
  tag: string;
  popular?: boolean;
  perks: string[];
}

export const BUNDLES: BundleTier[] = [
  {
    id: "single",
    name: "Starter Pack",
    pieces: 10,
    packs: 1,
    priceOneTime: 4.99,
    priceSub: 4.24,
    tag: "TRIAL",
    perks: ["10 Buccal Chews", "Single Foil Pouch", "Pocket Form Factor"],
  },
  {
    id: "trio",
    name: "Variety Trio",
    pieces: 30,
    packs: 3,
    priceOneTime: 12.99,
    priceSub: 11.04,
    tag: "MOST POPULAR",
    popular: true,
    perks: [
      "30 Chews (All 3 Flavors Included)",
      "Free Collectible Sticker Pack",
      "Save 15% vs Single Pack",
    ],
  },
  {
    id: "crate",
    name: "Hustler Crate",
    pieces: 100,
    packs: 10,
    priceOneTime: 36.99,
    priceSub: 31.44,
    tag: "BEST VALUE",
    perks: [
      "100 Chews (Heavy Supply)",
      "FREE Express Priority Shipping",
      "Limited Edition Pocket Tin",
      "Maximum Value ($0.37/chew)",
    ],
  },
];

interface PurchaseSectionProps {
  onAddToCart: (bundle: BundleTier, flavor: string, isSub: boolean) => void;
  onOpenCart: () => void;
}

export const PurchaseSection: React.FC<PurchaseSectionProps> = ({
  onAddToCart,
  onOpenCart,
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>("trio");
  const [selectedFlavor, setSelectedFlavor] = useState<string>("variety");
  const [isSubscription, setIsSubscription] = useState<boolean>(true);

  const currentBundle = BUNDLES.find((b) => b.id === selectedBundleId) || BUNDLES[1];
  const activePrice = isSubscription ? currentBundle.priceSub : currentBundle.priceOneTime;

  const handleBuyNow = () => {
    sounds.playPop();
    onAddToCart(currentBundle, selectedFlavor, isSubscription);
    onOpenCart();
  };

  return (
    <section id="stash" className="relative w-full py-28 bg-[#0a0a0a] text-[#fffbee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 text-[11px] font-mono tracking-widest text-[#efff00] uppercase">
            <span>D2C STORE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-white">
            BUILD YOUR <span className="text-[#efff00]">STASH</span>
          </h2>

          <p className="mt-3 max-w-lg text-sm text-white/60 font-sans">
            Direct buccal energy. Free express shipping on all orders over $30.
          </p>

          {/* Clean Plan Toggle */}
          <div className="mt-6 sm:mt-8 inline-flex items-center p-1 rounded-2xl bg-[#141414] border border-white/10 max-w-full">
            <button
              onClick={() => {
                sounds.playClick();
                setIsSubscription(false);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all ${
                !isSubscription ? "bg-[#fffbee] text-[#111111]" : "text-white/60 hover:text-white"
              }`}
            >
              One-Time
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setIsSubscription(true);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1 sm:gap-1.5 ${
                isSubscription ? "bg-[#efff00] text-[#111111]" : "text-white/60 hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Subscribe -15%</span>
            </button>
          </div>
        </div>

        {/* 3 Clean Bundle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BUNDLES.map((bundle) => {
            const isSelected = selectedBundleId === bundle.id;
            const price = isSubscription ? bundle.priceSub : bundle.priceOneTime;

            return (
              <div
                key={bundle.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedBundleId(bundle.id);
                }}
                className={`relative rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? "border-white bg-[#141414] shadow-xl"
                    : "border-white/10 bg-[#0f0f0f] hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-[#efff00] font-bold uppercase tracking-wider">
                      {bundle.tag}
                    </span>
                    <span className="text-xs font-mono text-white/40">{bundle.packs} PACK</span>
                  </div>

                  <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight">
                    {bundle.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-black font-display text-white">
                      ${price.toFixed(2)}
                    </span>
                    {isSubscription && (
                      <span className="text-xs line-through text-white/40 font-mono">
                        ${bundle.priceOneTime.toFixed(2)}
                      </span>
                    )}
                    <span className="text-xs font-mono text-white/50">
                      (${(price / bundle.pieces).toFixed(2)}/chew)
                    </span>
                  </div>

                  <div className="mt-6 space-y-2 pt-4 border-t border-white/5">
                    {bundle.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs font-mono text-white/70">
                        <Check className="w-3.5 h-3.5 text-[#efff00] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <div
                    className={`w-full py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider text-center transition-all ${
                      isSelected
                        ? "bg-[#efff00] text-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {isSelected ? "SELECTED" : "SELECT BUNDLE"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master Purchase Action Box */}
        <div className="rounded-2xl bg-[#121212] border border-white/10 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-auto">
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-2">
              FLAVOR SELECTION:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "variety", label: "Trio Variety Mix (All 3)" },
                { id: "mint", label: "Minty Freshness" },
                { id: "berry", label: "Mixed Berries" },
                { id: "lime", label: "Sour Lime" },
              ].map((flv) => (
                <button
                  key={flv.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedFlavor(flv.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                    selectedFlavor === flv.id
                      ? "bg-[#fffbee] text-black border-[#fffbee]"
                      : "bg-[#181818] text-white/60 border-white/10 hover:text-white"
                  }`}
                >
                  {flv.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="text-right hidden sm:block font-mono">
              <div className="text-[10px] text-white/40">TOTAL</div>
              <div className="text-2xl font-bold text-[#efff00]">
                ${activePrice.toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#efff00] hover:bg-[#d6e600] text-black font-display font-black text-xs sm:text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#efff00]/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                GET BULLDOZED <span className="sm:hidden">• ${activePrice.toFixed(2)}</span>
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
