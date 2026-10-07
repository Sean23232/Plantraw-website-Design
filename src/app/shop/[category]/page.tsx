import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/store";
import ShopBrowser from "@/components/shop-browser";
import { Reveal } from "@/components/ui";

export const dynamic = "force-dynamic";

const meta: Record<string, { title: string; h1: string; blurb: string }> = {
  chocolith: {
    title: "Chocolith® Cocoa-Date Truffles — Raw, Vegan, 0g Refined Carbs",
    h1: "Chocolith®",
    blurb:
      "A velvety rich, natural chocolate alternative. Raw and unprocessed, sweetened with whole organic dates. Ten flavours, from Dark to Dubai.",
  },
  granola: {
    title: "Grain-Free Granola — Un-Cereal™, No Added Sugar",
    h1: "Un-Cereal™ Granola",
    blurb:
      "Grain-free, gluten-free breakfast granola sweetened solely with whole organic dates and gently dehydrated instead of baked.",
  },
  crackers: {
    title: "Complete Crackers™ — Dehydrated, Gluten-Free, Seed-Dense",
    h1: "Complete Crackers™",
    blurb:
      "Prebiotic, nutritionally dense seed crackers with no sugar, no sweeteners and no grains. Dehydrated to keep their micronutrients.",
  },
  keto: {
    title: "Keto Snacks — 1.5g to 3.2g Net Carbs, 0g Refined Carbs",
    h1: "Keto Snacks",
    blurb:
      "Our keto range runs from 1.5g to 3.2g net carbs per serving, sweetened with organic allulose alongside whole dates.",
  },
  cookies: {
    title: "Cookies — Raw, Keto, Vegan, Gluten-Free",
    h1: "Cookies",
    blurb: "Simply mixed and never baked. Kale, chia and flaxseed inside a genuinely indulgent cookie.",
  },
  "date-snacks": {
    title: "Date Snacks — Coconut-Date Rolls, Raw and Low FODMAP",
    h1: "Date Snacks",
    blurb: "Whole organic dates and unsweetened coconut. Nothing else.",
  },
  "ginger-snacks": {
    title: "Ginger Snaps — Date-Sweetened, Grain-Free, Nutritionally Dense",
    h1: "Ginger Snaps",
    blurb: "The classic snap, rebuilt from plants. Real ginger, cinnamon and clove, with kale and spinach in the base.",
  },
};

export async function generateStaticParams() {
  return Object.keys(meta).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const m = meta[category];
  if (!m) return { title: "Shop" };
  return {
    title: m.title,
    description: m.blurb,
    alternates: { canonical: `/shop/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const m = meta[category];
  if (!m) notFound();

  const products = await getProducts();
  const filtered =
    category === "keto"
      ? products.filter((p) => p.keto)
      : products.filter((p) => p.category === category);

  const image =
    category === "chocolith"
      ? "/images/chocolith-editorial.jpg"
      : category === "granola"
        ? "/images/granola-editorial.jpg"
        : category === "crackers"
          ? "/images/crackers-editorial.jpg"
          : filtered[0]?.images[0] ?? "/images/hero.jpg";

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
              <Link href="/shop" className="hover:text-ink">
                Shop
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-cocoa-950">{m.h1}</span>
            </nav>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em] text-cocoa-950">
              {m.h1}
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-cocoa-700">{m.blurb}</p>
            <p className="mt-6 text-[12px] tracking-[0.14em] text-cocoa-500">
              {filtered.length} {filtered.length === 1 ? "product" : "products"} · Vegan ·
              Gluten-Free · Grain-Free · Organic
            </p>
          </div>
          <div className="relative hidden justify-end lg:flex">
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden">
              <Image src={image} alt={`${m.h1} by Plantraw`} fill sizes="40vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 lg:py-16">
        <Reveal>
          <ShopBrowser products={products} initialCategory={category} />
        </Reveal>
      </div>
    </>
  );
}
