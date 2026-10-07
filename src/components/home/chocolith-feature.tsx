"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { money } from "@/components/cart-provider";
import { ArrowIcon } from "@/components/icons";

export default function ChocolithFeature({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const current = products[active];

  return (
    <section className="grain relative overflow-hidden bg-cocoa-950 text-cream">
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          background:
            "radial-gradient(120% 90% at 82% 12%, #6b452c 0%, #241611 52%, #1a0f0a 100%)",
        }}
        aria-hidden="true"
      />
      <div className="shell relative py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow text-sand/70">The signature</p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em]">
              Chocolate,
              <br />
              <span className="italic">reimagined.</span>
            </h2>
            <p className="mt-7 max-w-md text-[17px] leading-relaxed text-sand/85">
              Rich cocoa. Whole organic dates. Thoughtfully chosen ingredients. A decadent
              experience without the refined sugar overload.
            </p>

            <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Chocolith flavours">
              {products.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`border px-4 py-2.5 label-xs transition-all duration-300 ${
                    i === active
                      ? "border-cream bg-cream text-cocoa-950"
                      : "border-sand/35 text-sand/80 hover:border-sand hover:text-cream"
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            {current && (
              <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-sand/25 pt-7">
                <div>
                  <p className="label-xs text-sand/60">Currently viewing</p>
                  <p className="mt-2 font-display text-2xl">{current.title}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-relaxed text-sand/80">{current.descriptor}</p>
                  <p className="mt-2 text-sm text-sand/60">
                    {money(current.price)} · {current.sizeOz}
                  </p>
                </div>
                <Link
                  href={`/products/${current.slug}`}
                  className="group flex items-center gap-2 border-b border-cream/40 pb-1 label-xs text-cream transition-colors hover:border-cream"
                >
                  View
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            )}

            <Link
              href="/shop/chocolith"
              className="group mt-10 inline-flex items-center gap-2.5 bg-cream px-9 py-4 label-xs text-cocoa-950 transition-colors duration-300 hover:bg-sand"
            >
              Explore Chocolith®
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/6] w-full overflow-hidden">
              <Image
                src="/images/chocolith-editorial.jpg"
                alt="Close-up of Chocolith cocoa-date truffles with cacao nibs and unprocessed cocoa paste"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(26,15,10,0.1), rgba(26,15,10,0.45))" }}
                aria-hidden="true"
              />
            </div>

            <div className="absolute -bottom-8 -left-4 hidden w-[210px] bg-cocoa-900/95 p-5 backdrop-blur-sm sm:block lg:-left-14">
              <p className="label-xs text-sand/60">Sourced</p>
              <p className="mt-2 text-sm leading-relaxed text-sand/90">
                Cocoa paste from Peru. Every batch lab-tested, with a certificate of analysis on
                delivery.
              </p>
            </div>

            {current && (
              <div
                key={current.slug}
                className="absolute -right-3 top-6 w-[150px] sm:w-[172px] lg:-right-10 lg:top-10 lg:w-[196px]"
                style={{ animation: "none" }}
              >
                <Image
                  src={current.images[0]}
                  alt={current.name}
                  width={230}
                  height={315}
                  className="h-auto w-full drop-shadow-[0_30px_44px_rgba(0,0,0,0.55)]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
