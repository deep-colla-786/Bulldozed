import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "BULLDOZED | Rebellious Caffeine Energy Gum (50mg Instant Kick)",
  description: "We aren't really selling caffeine. We are selling energy. 50mg fast-acting caffeine chewing gum. Zero liquid, zero crash, instant buccal absorption.",
  keywords: ["caffeine gum", "energy gum", "bulldozed", "fast caffeine", "sugar free energy", "nootropic"],
  openGraph: {
    title: "BULLDOZED | Rebellious Caffeine Energy Gum",
    description: "We aren't really selling caffeine. We are selling energy. 50mg instant kick.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-[#111111] text-[#fffbee] font-sans antialiased selection:bg-[#efff00] selection:text-[#111111] overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
