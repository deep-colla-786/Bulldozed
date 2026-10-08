"use client";

import React from "react";
import { Star, CheckCircle, Flame } from "lucide-react";

const REVIEWS = [
  {
    author: "Elena Rostova",
    handle: "@elena_builds",
    role: "Y-Combinator Founder",
    text: "Replaced 4 daily iced americanos with Bulldozed Mint. No bladder urgency during investor pitches. Immediate kick in 4 mins.",
    flavor: "Minty Freshness",
    stars: 5,
  },
  {
    author: "Kai Vance",
    handle: "@kaivance_drift",
    role: "Sim Racer & Modder",
    text: "Sour Lime is dangerously good. First time chewing caffeine that didn't taste like crushed Tylenol. Reflexes are noticeably crisper.",
    flavor: "Sour Lime",
    stars: 5,
  },
  {
    author: "Marcus Zhang",
    handle: "@marcus_devs",
    role: "Staff Backend Engineer",
    text: "Keeps me alive during 3AM outages without the stomach acid of cold brew. Plus the packet looks like an absolute art piece on my desk.",
    flavor: "Mixed Berries",
    stars: 5,
  },
  {
    author: "Dr. Maya Jensen",
    handle: "@mayaj_neuro",
    role: "Cognitive Researcher",
    text: "Buccal mucosa absorption is scientifically superior for acute psychomotor speed. Bulldozed nailed the pharmacokinetics.",
    flavor: "Minty Freshness",
    stars: 5,
  },
];

export const ReviewTicker: React.FC = () => {
  return (
    <section className="py-20 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efff00]/10 text-[#efff00] text-xs font-mono font-bold uppercase mb-3">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>UNCENSORED REBEL REVIEWS</span>
        </div>
        <h3 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
          THE WALL OF <span className="text-[#0087ce]">ENERGY ADDICTS</span>
        </h3>
      </div>

      {/* Infinite scrolling reviews track */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 w-max animate-marquee-fast hover:[animation-play-state:paused] py-4">
          {[...REVIEWS, ...REVIEWS].map((rev, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[380px] p-6 rounded-3xl bg-[#141414] border-2 border-[#252525] flex flex-col justify-between shrink-0 hover:border-[#efff00] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1 text-[#efff00]">
                    {[...Array(rev.stars)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white/50 uppercase">
                    {rev.flavor}
                  </span>
                </div>

                <p className="text-sm text-[#fffbee]/90 font-sans leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-sm text-white flex items-center gap-1">
                    {rev.author}
                    <CheckCircle className="w-3.5 h-3.5 text-[#0087ce] fill-current" />
                  </div>
                  <div className="text-[11px] font-mono text-white/50">{rev.role}</div>
                </div>
                <span className="text-xs font-mono text-[#efff00]">{rev.handle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
