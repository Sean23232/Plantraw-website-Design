import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/store";
import ShopBrowser from "@/components/shop-browser";
import { Reveal } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop All Snacks — Chocolith®, Granola, Crackers & Keto",
  description:
    "Browse every Plantraw snack: Chocolith® cocoa-date truffles, grain-free Un-Cereal™ granola, Complete Crackers, keto snacks, cookies, date rolls and ginger snaps. All vegan, gluten-free and grain-free.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getProducts();
  const hero = products.find((p) => p.slug === "chocolith-coconut") ?? products[0];

  return (
    <>
      <section className="border-b border-sand bg-cream">
        <div className="shell grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="label-xs text-cocoa-500">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-cocoa-950">Shop</span>
            </nav>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em] text-cocoa-950">
              Every Plantraw snack.
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-cocoa-700">
              Raw, minimally processed, plant-based — and made in our own dedicated gluten-free,
              grain-free, peanut-free and dairy-free facility.
            </p>
          </div>
          {hero && (
            <div className="relative hidden justify-end lg:flex">
              <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden">
                <Image
                  src="/images/ingredients-hero.jpg"
                  alt="Flat lay of the raw ingredients used across the Plantraw range"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="py-12 lg:py-16">
        <Reveal>
          <ShopBrowser products={products} />
        </Reveal>
      </div>
    </>
  );
}
