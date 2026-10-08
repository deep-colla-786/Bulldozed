"use client";

import React, { useState } from "react";
import { RunningMan } from "./RunningMan";
import { sounds } from "./SoundEffects";
import { EyeIcon } from "./EyePattern";
import { Zap, ArrowUpRight, ShieldAlert, Mail, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sounds.playSuccess();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#0a0a0a] border-t-2 border-[#202020] text-[#fffbee] pt-20 pb-12 overflow-hidden">
      {/* Background Graphic Watermark */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Manifesto Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#202020]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <RunningMan variant="sprint" color="#efff00" size={32} />
              <span className="font-display font-black text-2xl tracking-tight uppercase text-white">
                BULLDOZED HQ
              </span>
            </div>

            <p className="max-w-lg text-sm sm:text-base text-[#fffbee]/70 font-sans leading-relaxed">
              We engineer functional chewing confectionery for high-velocity humans who refuse to wait
              for liquid energy to digest. Formulated with pure natural anhydrous caffeine and sublingual carrier matrix.
            </p>

            {/* Safety Warning Tag */}
            <div className="mt-6 p-4 rounded-2xl bg-[#141414] border border-red-500/30 flex items-start gap-3 max-w-xl">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs font-mono text-white/60 leading-relaxed">
                <strong className="text-red-400 uppercase">Caution: Extremely potent.</strong> Each piece contains
                50mg active caffeine (equivalent to 1 shot of espresso). Do not exceed 4 pieces in 24 hours. Keep out of reach of children and pets.
              </p>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#efff00] block mb-2">
                JOIN THE BULLDOZED UNDERGROUND
              </span>
              <h4 className="text-xl sm:text-2xl font-display font-black uppercase text-white">
                GET FIRST DROP ACCESS & SECRET BATCHES
              </h4>
              <p className="mt-1 text-xs text-white/50 font-sans">
                Never miss limited release flavor runs or underground merchandise drops.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  placeholder="ENTER YOUR WORK EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-xs font-mono text-white placeholder:text-white/30 placeholder:text-[11px] focus:outline-none focus:border-[#efff00]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#efff00] hover:bg-[#d6e600] text-[#111111] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center shrink-0"
              >
                {subscribed ? <Check className="w-4 h-4" /> : "JOIN"}
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#202020] text-xs font-mono">
          <div>
            <h5 className="font-bold text-white uppercase tracking-widest mb-4 text-[#0087ce]">
              PRODUCTS
            </h5>
            <ul className="space-y-2 text-white/60">
              <li><a href="#flavors" className="hover:text-[#efff00] transition-colors">Minty Freshness</a></li>
              <li><a href="#flavors" className="hover:text-[#efff00] transition-colors">Mixed Berries</a></li>
              <li><a href="#flavors" className="hover:text-[#efff00] transition-colors">Sour Lime</a></li>
              <li><a href="#stash" className="hover:text-[#efff00] transition-colors">Variety Trio Crate</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-widest mb-4 text-[#efff00]">
              SCIENCE & R&D
            </h5>
            <ul className="space-y-2 text-white/60">
              <li><a href="#chew-vs-drink" className="hover:text-[#efff00] transition-colors">Buccal Absorption 101</a></li>
              <li><a href="#chew-vs-drink" className="hover:text-[#efff00] transition-colors">Pharmacokinetics vs Drinks</a></li>
              <li><a href="#chew-vs-drink" className="hover:text-[#efff00] transition-colors">L-Theanine Synergy</a></li>
              <li><a href="#chew-vs-drink" className="hover:text-[#efff00] transition-colors">Third-Party Lab Reports</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-widest mb-4 text-[#ff007a]">
              COMMUNITY
            </h5>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-[#efff00] transition-colors flex items-center gap-1">Discord Lab <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="#" className="hover:text-[#efff00] transition-colors flex items-center gap-1">Instagram (@bulldozed) <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="#" className="hover:text-[#efff00] transition-colors flex items-center gap-1">TikTok Feed <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="#" className="hover:text-[#efff00] transition-colors flex items-center gap-1">Strava Club <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-widest mb-4 text-white">
              LEGAL
            </h5>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-[#efff00] transition-colors">Privacy Protocol</a></li>
              <li><a href="#" className="hover:text-[#efff00] transition-colors">Terms of Dispatch</a></li>
              <li><a href="#" className="hover:text-[#efff00] transition-colors">FDA Disclaimer</a></li>
              <li><a href="#" className="hover:text-[#efff00] transition-colors">Subscription Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Giant Bottom Brand Wordmark - Full Brand Name Always 100% Visible */}
        <div className="pt-12 text-center w-full flex flex-col items-center justify-center">
          <div className="text-[clamp(2.4rem,8.2vw,7.2rem)] font-black font-display tracking-tight uppercase text-white/10 select-none leading-none whitespace-nowrap text-center">
            BULLDOZED
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-4">
            <div>© 2026 BULLDOZED ENERGY INC. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10ff70]" />
              <span>ALL SYSTEMS OPERATIONAL • SHIPMENT QUEUE: READY</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
