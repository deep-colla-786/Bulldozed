"use client";

import React, { useState, useEffect } from "react";
import { RunningMan } from "./RunningMan";
import { sounds } from "./SoundEffects";
import { Volume2, VolumeX, ShoppingBag, Menu, X, Zap } from "lucide-react";

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onOpenCart }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    setSoundEnabled(sounds.enabled);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { label: "3D EXPERIENCE", href: "#experience-3d" },
    { label: "FLAVORS", href: "#flavors" },
    { label: "CHEW VS DRINK", href: "#chew-vs-drink" },
    { label: "THE STASH", href: "#stash" },
    { label: "INTEL", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/10 py-2.5 shadow-2xl"
            : "bg-transparent py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          
          {/* Authentic Bulldozed Horizontal Brand Lockup */}
          <a
            href="#"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <div className="p-1 sm:p-1.5 rounded-xl bg-[#efff00] text-[#111111] transition-transform group-hover:scale-105 shadow-md shadow-[#efff00]/20">
              <RunningMan variant="sprint" color="#111111" size={20} />
            </div>
            <span className="font-display font-black text-lg sm:text-2xl tracking-tighter uppercase text-white group-hover:text-[#efff00] transition-colors whitespace-nowrap">
              BULLDOZED
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 font-mono text-xs uppercase tracking-widest font-bold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => sounds.playClick()}
                className="text-white/70 hover:text-[#efff00] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#efff00] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Sound FX & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Tactile Audio Mute Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl border transition-all ${
                soundEnabled
                  ? "bg-[#1e1e1e] border-white/10 text-[#efff00] hover:border-[#efff00]/50"
                  : "bg-[#141414] border-white/5 text-white/40 hover:text-white"
              }`}
              title={soundEnabled ? "Mute Tactile FX" : "Unmute Tactile FX"}
            >
              {soundEnabled ? (
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold">
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden lg:inline text-[9px]">SFX</span>
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                sounds.playPop();
                onOpenCart();
              }}
              className="p-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-[#efff00] hover:bg-[#d6e600] text-[#111111] font-display font-black text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-1.5 shadow-[0_0_15px_rgba(239,255,0,0.3)]"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">STASH</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#111111] text-[#efff00] text-[10px] font-mono font-bold">
                {cartItemCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#1e1e1e] border border-white/10 text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#111111]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <div className="flex flex-col gap-6 font-display font-black text-3xl uppercase">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-white hover:text-[#efff00] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <Zap className="w-6 h-6 text-[#efff00]" />
              </a>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-white/50">TACTICAL SOUND FX</span>
            <button
              onClick={handleToggleSound}
              className="px-4 py-2 rounded-xl bg-[#222222] text-xs font-mono text-[#efff00] font-bold"
            >
              {soundEnabled ? "SFX ACTIVE" : "MUTED"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
