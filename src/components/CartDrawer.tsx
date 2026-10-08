"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { sounds } from "./SoundEffects";
import { RunningMan } from "./RunningMan";
import { X, Trash2, Plus, Minus, Zap, ShieldCheck, Tag, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  flavor: string;
  pieces: number;
  price: number;
  quantity: number;
  isSub: boolean;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  // Free shipping threshold: $30
  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= 30 || subtotal === 0 ? 0 : 3.99;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const freeShippingProgress = Math.min(100, (subtotal / 30) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    const code = promoCode.trim().toUpperCase();
    if (code === "HUSTLE20") {
      setDiscountPercent(20);
      setPromoApplied(true);
      sounds.playSuccess();
    } else if (code === "ENERGY50") {
      setDiscountPercent(50);
      setPromoApplied(true);
      sounds.playSuccess();
    } else if (code === "BULLDOZED10") {
      setDiscountPercent(10);
      setPromoApplied(true);
      sounds.playSuccess();
    } else {
      alert("Invalid code! Try: HUSTLE20 or ENERGY50");
    }
  };

  const handleCheckout = () => {
    sounds.playSuccess();
    // Confetti cannon
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#efff00", "#0087ce", "#ff007a", "#10ff70", "#ffffff"],
    });
    setOrderComplete(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#141414] border-l-2 border-[#2b2b2b] text-[#fffbee] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#242424] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#efff00]" />
              <h2 className="text-xl font-display font-black uppercase tracking-tight text-white">
                YOUR ENERGY STASH
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#242424] text-xs font-mono text-white/70">
                {items.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-[#1f1f1f] hover:bg-[#2b2b2b] text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Indicator */}
          <div className="px-6 py-3.5 bg-[#1a1a1a] border-b border-[#262626]">
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span>
                {subtotal >= 30 ? (
                  <strong className="text-[#10ff70] font-black">
                    🎉 UNLOCKED: FREE SHIPPING + STICKER PACK!
                  </strong>
                ) : (
                  <span>
                    Add <strong className="text-[#efff00]">${(30 - subtotal).toFixed(2)}</strong> for Free Shipping
                  </span>
                )}
              </span>
              <span className="font-bold text-white/60">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#2a2a2a] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0087ce] via-[#efff00] to-[#10ff70] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Order Complete Modal View */}
          {orderComplete ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#efff00] text-black flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-black uppercase text-white">
                YOU ARE BULLDOZED!
              </h3>
              <p className="mt-2 text-sm text-[#fffbee]/70 font-sans max-w-xs">
                Order #BDZ-8492 confirmed. Dispatching from our rapid energy warehouse within 2 hours.
              </p>
              <div className="my-6 p-4 rounded-2xl bg-[#1b1b1b] border border-white/10 w-full text-left font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/50">Estimated Arrival:</span>
                  <span className="text-[#efff00]">2 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Absorption Speed:</span>
                  <span className="text-white">300 Seconds</span>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setOrderComplete(false);
                  onClearCart();
                  onClose();
                }}
                className="w-full py-4 rounded-xl bg-[#efff00] text-black font-display font-black text-sm uppercase tracking-wider"
              >
                RETURN TO LAB
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#222222]">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-white/50 py-16">
                    <RunningMan variant="chewing" color="#efff00" size={64} className="opacity-60 mb-4" />
                    <p className="font-display uppercase font-bold text-lg text-white">YOUR STASH IS EMPTY</p>
                    <p className="text-xs font-mono mt-1 text-white/40">Chew fast. Stay sharp.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-black uppercase text-white text-sm">
                            {item.name}
                          </h4>
                          {item.isSub && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#efff00]/20 text-[#efff00]">
                              SUB -15%
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-[#0087ce] mt-0.5">
                          Flavor: {item.flavor.toUpperCase()} • {item.pieces} CHEWS
                        </p>
                        <p className="text-sm font-bold font-mono text-white mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center rounded-lg bg-[#202020] border border-white/10">
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onUpdateQuantity(item.id, -1);
                            }}
                            className="p-1.5 text-white/60 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onUpdateQuantity(item.id, 1);
                            }}
                            className="p-1.5 text-white/60 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            sounds.playClick();
                            onRemoveItem(item.id);
                          }}
                          className="p-1.5 text-white/40 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Calculation Footer */}
              {items.length > 0 && (
                <div className="p-6 bg-[#161616] border-t border-[#262626] space-y-4">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        placeholder="PROMO CODE (e.g. HUSTLE20)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#202020] border border-white/10 text-xs font-mono text-white uppercase placeholder:text-white/30 focus:outline-none focus:border-[#efff00]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#282828] hover:bg-[#333333] text-xs font-mono font-bold text-[#efff00]"
                    >
                      APPLY
                    </button>
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs font-mono text-white/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-[#10ff70]">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <strong className="text-[#10ff70]">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex justify-between text-base font-bold text-white font-display">
                      <span>TOTAL</span>
                      <span className="text-[#efff00]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-2xl bg-[#efff00] hover:bg-[#d6e600] text-[#111111] font-display font-black text-base uppercase tracking-wider shadow-[0_0_25px_rgba(239,255,0,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    <span>CHECKOUT • ${total.toFixed(2)}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-white/40">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0087ce]" />
                    <span>256-Bit SSL Encrypted • 30-Day Money Back Kick Guarantee</span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
