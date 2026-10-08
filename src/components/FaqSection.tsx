"use client";

import React, { useState } from "react";
import { sounds } from "./SoundEffects";
import { Plus, Minus, HelpCircle, Zap, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";

interface FaqItem {
  id: string;
  category: "science" | "ingredients" | "dosing" | "shipping";
  question: string;
  answer: string;
  highlight?: string;
}

const FAQS: FaqItem[] = [
  {
    id: "buccal-vs-liquid",
    category: "science",
    question: "WHY CHEW INSTEAD OF DRINKING 500ML COLD BREW?",
    answer:
      "When you drink coffee or energy drinks, liquids must travel down the esophagus, survive harsh gastric acids in your stomach, pass through the intestine, and undergo hepatic first-pass metabolism in your liver. That takes 35 to 45 minutes. Buccal absorption passes directly through the ultra-thin mucosal capillaries inside your cheeks and under your tongue into your arterial circulation in approximately 5 minutes flat.",
    highlight: "5-MINUTE ARTERIAL ONSET // ZERO DIGESTION DELAY",
  },
  {
    id: "jitters-crash",
    category: "science",
    question: "WILL BULLDOZED CAUSE JITTERS, SHAKES, OR ACID REFLUX?",
    answer:
      "No. Coffee acidity and carbonated energy drinks cause stomach distress and erratic glucose surges. Bulldozed is completely liquid-free and formulated with L-Theanine and bioavailable Vitamin B6/B12 to smooth neurotransmitter firing. You get laser cognitive focus with zero trembling hands and zero afternoon sugar crash.",
    highlight: "L-THEANINE BALANCED // 0G SUGAR",
  },
  {
    id: "caffeine-content",
    category: "dosing",
    question: "HOW MUCH CAFFEINE IS IN EACH PIECE?",
    answer:
      "Each piece contains precisely 50mg of pure micro-encapsulated anhydrous caffeine (55mg in Sour Lime). That is chemically calibrated to match 1 pulled shot of espresso or a standard 250ml energy can. You can dose with micro-precision without consuming 400ml of fluid.",
    highlight: "50MG PRECISION ANHYDROUS PER CHEW",
  },
  {
    id: "ingredients-dental",
    category: "ingredients",
    question: "IS BULLDOZED SUGAR-FREE, KETO, AND DENTIST-APPROVED?",
    answer:
      "100% sugar-free, zero calories, zero aspartame, 100% vegan. Bulldozed is sweetened with premium dental-grade birch xylitol. Clinical research proves xylitol actively starves Streptococcus mutans bacteria in oral biofilm, neutralizing cavity-causing acids while freshening your breath.",
    highlight: "BIRCH XYLITOL // ZERO SUGAR // TOOTH-ENAMEL SAFE",
  },
  {
    id: "daily-limit",
    category: "dosing",
    question: "HOW MANY PIECES CAN I SAFELY CHEW PER DAY?",
    answer:
      "The EFSA and FDA suggest a healthy adult daily caffeine limit of 400mg. We advise a maximum of 4 pieces (200mg total) per 24 hours. Most high-performers chew 1 piece at 8:30 AM to initiate flow state, and 1 piece at 2:00 PM to crush the afternoon slump.",
    highlight: "MAX 4 PIECES PER 24 HOURS",
  },
  {
    id: "taste-profile",
    category: "ingredients",
    question: "DOES IT TASTE LIKE MEDICINE OR CHALKY POWDER?",
    answer:
      "Not at all. We spent 14 months perfecting our micro-encapsulation barrier. The caffeine is encapsulated within a natural lipid matrix that dissolves only at capillary temperature, allowing intense candy-shop flavor to lead: arctic peppermint frost, wild raspberry-acai, or tart Japanese yuzu-lime.",
    highlight: "MICRO-ENCAPSULATION TASTE TECH",
  },
  {
    id: "shipping-dispatch",
    category: "shipping",
    question: "HOW FAST IS SHIPPING & CAN I CANCEL MY SUBSCRIPTION?",
    answer:
      "All orders placed before 2:00 PM EST dispatch same day via Express Priority. Subscriptions are 100% flexible: skip, pause, swap flavors, or cancel in 1 click from your SMS or email portal anytime. No contracts, no friction.",
    highlight: "SAME-DAY DISPATCH // 1-CLICK CANCEL",
  },
];

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>("buccal-vs-liquid");

  const categories = [
    { id: "all", label: "ALL INTEL" },
    { id: "science", label: "PHARMACOKINETICS" },
    { id: "ingredients", label: "INGREDIENTS" },
    { id: "dosing", label: "DOSING" },
    { id: "shipping", label: "DISPATCH" },
  ];

  const filteredFaqs = activeCategory === "all"
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleAccordion = (id: string) => {
    sounds.playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative w-full py-24 sm:py-28 bg-[#0a0a0a] text-[#fffbee] border-t border-[#1e1e1e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#efff00] uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSPARENT REBEL INTEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white">
            FREQUENTLY ASKED <span className="text-[#efff00]">INTEL</span>
          </h2>

          <p className="mt-3 max-w-xl text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
            Everything you need to know about buccal bioavailability, chemical synthesis, and clean stimulant delivery.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold transition-all border ${
                  activeCategory === cat.id
                    ? "bg-[#efff00] text-[#111111] border-[#efff00] shadow-md shadow-[#efff00]/20"
                    : "bg-[#141414] text-white/60 border-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-[#141414] border-white/20 shadow-xl"
                    : "bg-[#0f0f0f] border-white/5 hover:border-white/15"
                }`}
              >
                {/* Header Button */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#efff00] text-black"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {isOpen ? <Zap className="w-4 h-4 fill-current" /> : "?"}
                    </span>
                    <h3 className="font-display font-black text-sm sm:text-base md:text-lg uppercase tracking-wide text-white">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`p-1.5 rounded-lg border shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#efff00]/10 border-[#efff00]/30 text-[#efff00] rotate-180"
                        : "bg-white/5 border-white/10 text-white/40"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated Body */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-white/5 mt-1">
                    {faq.highlight && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#efff00]/10 text-[#efff00] font-mono text-[10px] font-bold tracking-widest uppercase">
                        <Sparkles className="w-3 h-3" />
                        <span>{faq.highlight}</span>
                      </div>
                    )}

                    <p className="mt-3 text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Question Prompt */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#121212] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-display font-black text-base uppercase text-white">
              STILL HAVE QUESTIONS ABOUT BIOAVAILABILITY?
            </h4>
            <p className="text-xs text-white/50 font-sans mt-0.5">
              Talk directly with our formulation and biochemistry team on Discord.
            </p>
          </div>

          <a
            href="#"
            onClick={() => sounds.playClick()}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 border border-white/10 shrink-0"
          >
            <span>JOIN RESEARCH DISCORD</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
