import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CartDrawer from "@/components/cart-drawer";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plantraw.com"),
  title: {
    default: "Plantraw® — Raw, Plant-Based Snacks Without Compromise",
    template: "%s | Plantraw®",
  },
  description:
    "Premium raw, minimally processed plant-based snacks: Chocolith® cocoa-date truffles, grain-free granola, Complete Crackers, keto snacks, cookies, date rolls and ginger snaps. Vegan, gluten-free, grain-free, organic.",
  keywords: [
    "Plantraw",
    "Chocolith",
    "cocoa date truffles",
    "grain-free granola",
    "raw vegan snacks",
    "keto snacks",
    "gluten-free crackers",
  ],
  openGraph: {
    type: "website",
    siteName: "Plantraw®",
    title: "Plantraw® — Indulgence, without compromise.",
    description:
      "Wholesome snacks made from thoughtfully chosen ingredients, with no refined carbs and no unnecessary additives.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ivory text-ink antialiased">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-cocoa-950 focus:px-4 focus:py-2 focus:text-cream"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
