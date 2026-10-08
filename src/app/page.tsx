"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ProductCanvas3D } from "@/components/ProductCanvas3D";
import { FlavorSection } from "@/components/FlavorSection";
import { ChewVsDrinkManifesto } from "@/components/ChewVsDrinkManifesto";
import { DoseCalculator } from "@/components/DoseCalculator";
import { ReviewTicker } from "@/components/ReviewTicker";
import { PurchaseSection, BundleTier, BUNDLES } from "@/components/PurchaseSection";
import { FaqSection } from "@/components/FaqSection";
import { FloatingBuyBar } from "@/components/FloatingBuyBar";
import { CartDrawer, CartItem } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { sounds } from "@/components/SoundEffects";

export default function Home() {
  const [activeFlavor, setActiveFlavor] = useState<"mint" | "berry" | "lime">("mint");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "trio-sub-variety",
      name: "Variety Trio (3-Pack)",
      flavor: "All 3 Flavors",
      pieces: 30,
      price: 11.04,
      quantity: 1,
      isSub: true,
    },
  ]);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  const handleScrollTo3D = () => {
    const el = document.getElementById("experience-3d");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddFlavorDirect = (flavorId: "mint" | "berry" | "lime") => {
    const flavorNames = {
      mint: "Minty Freshness",
      berry: "Mixed Berries",
      lime: "Sour Lime",
    };
    const newItemId = `single-${flavorId}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === newItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === newItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: newItemId,
          name: "Starter Pack (10 Chews)",
          flavor: flavorNames[flavorId],
          pieces: 10,
          price: 4.99,
          quantity: 1,
          isSub: false,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleAddBundleToCart = (bundle: BundleTier, flavor: string, isSub: boolean) => {
    const flavorLabels: Record<string, string> = {
      variety: "Variety Mix",
      mint: "Minty Freshness",
      berry: "Mixed Berries",
      lime: "Sour Lime",
    };
    const itemId = `${bundle.id}-${flavor}-${isSub ? "sub" : "onetime"}`;
    const price = isSub ? bundle.priceSub : bundle.priceOneTime;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          name: bundle.name,
          flavor: flavorLabels[flavor] || flavor,
          pieces: bundle.pieces,
          price,
          quantity: 1,
          isSub,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <main className="min-h-screen bg-[#111111] text-[#fffbee] selection:bg-[#efff00] selection:text-[#111111] relative overflow-x-clip">
      {/* Top Navigation */}
      <Navbar
        cartItemCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 1. Hero Entry */}
      <Hero
        onExplore3D={handleScrollTo3D}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Ticker Ribbon */}
      <MarqueeTicker />

      {/* 2. The 3D Product Revelation Canvas (Scroll-Driven Bi-directional Experience) */}
      <ProductCanvas3D
        activeFlavorId={activeFlavor}
        onFlavorChange={(f) => setActiveFlavor(f)}
        onAddToCart={(f) => handleAddFlavorDirect(f)}
      />

      {/* 3. The Flavor Matrix & Energy Specs */}
      <FlavorSection
        onSelectFlavorFor3D={(f) => {
          setActiveFlavor(f);
          handleScrollTo3D();
        }}
        onAddToCart={(f) => handleAddFlavorDirect(f)}
      />

      {/* 4. The "Chew vs. Drink" Manifesto */}
      <ChewVsDrinkManifesto />

      {/* Interactive Dose Calculator */}
      <DoseCalculator />

      {/* Social Proof / Cult Reviews */}
      <ReviewTicker />

      {/* 5. Conversion E-Commerce Purchase Module */}
      <PurchaseSection
        onAddToCart={handleAddBundleToCart}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 6. Transparent Rebel FAQ & Science Intel */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Floating Quick Buy Pill (Responsive) */}
      <FloatingBuyBar
        activeFlavorId={activeFlavor}
        onFlavorChange={(f) => setActiveFlavor(f)}
        onAddToCart={(f) => handleAddFlavorDirect(f)}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </main>
  );
}
