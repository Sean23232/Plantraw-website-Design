"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/catalog";
import { faqs } from "@/lib/content";
import { money, useCart } from "@/components/cart-provider";
import { Accordion, Stars } from "@/components/ui";
import { ArrowIcon, BagIcon, HeartIcon, MinusIcon, PlusIcon } from "@/components/icons";

export default function ProductDetail({ product }: { product: Product }) {
  const { add, isWished, toggleWish } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const wished = isWished(product.slug);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("buy-box");
      if (!el) return;
      setShowSticky(window.scrollY > el.offsetTop + el.offsetHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function addItem() {
    add(
      {
        slug: product.slug,
        name: product.name,
        line: product.line,
        price: product.price,
        image: product.images[0],
        sizeOz: product.sizeOz,
      },
      quantity,
    );
  }

  const shortBadges = product.badges.slice(0, 6);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        {/* gallery */}
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
            <Image
              key={activeImage}
              src={product.images[activeImage]}
              alt={`${product.name} — ${product.descriptor}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="pack-shot object-contain p-6"
            />
          </div>
          {product.images.length > 1 && (
            <ul className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <li key={img}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1} of ${product.name}`}
                    className={`relative block h-[104px] w-[80px] overflow-hidden border transition-colors ${
                      i === activeImage ? "border-cocoa-950" : "border-sand hover:border-cocoa-500"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="80px" className="pack-shot object-contain p-1.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* buy box */}
        <div id="buy-box">
          <p className="eyebrow text-botanical">{product.line}</p>
          <h1 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.2rem)] font-light leading-[1.02] tracking-[-0.02em] text-cocoa-950">
            {product.title === product.line ? product.name : product.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[22px] font-medium tabular-nums text-cocoa-950">
              {money(product.price)}
            </span>
            <span className="text-[13px] tracking-wide text-cocoa-500">{product.sizeOz}</span>
            {product.available ? (
              <span className="flex items-center gap-2 text-[12px] tracking-wide text-botanical-deep">
                <span className="h-[6px] w-[6px] rounded-full bg-botanical" aria-hidden="true" />
                In stock
              </span>
            ) : (
              <span className="text-[12px] tracking-wide text-clay">Sold out</span>
            )}
          </div>

          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-cocoa-700">
            {product.descriptor}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {shortBadges.map((b) => (
              <li
                key={b}
                className="border border-sand bg-cream px-3 py-1.5 text-[11px] tracking-[0.1em] text-cocoa-700"
              >
                {b}
              </li>
            ))}
          </ul>

          {product.available && (
            <>
              <div className="mt-8 flex flex-wrap items-stretch gap-3">
                <div className="flex items-center border border-cocoa-950/25">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="px-4 py-4 text-cocoa-700 transition-colors hover:bg-cream"
                  >
                    <MinusIcon className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-[15px] tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(12, q + 1))}
                    aria-label="Increase quantity"
                    className="px-4 py-4 text-cocoa-700 transition-colors hover:bg-cream"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="flex flex-1 items-center justify-center gap-2.5 bg-cocoa-950 px-6 py-4 label-xs text-cream transition-colors duration-300 hover:bg-cocoa-700"
                >
                  <BagIcon className="h-4 w-4" />
                  Add to cart — {money(product.price * quantity)}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWish(product.slug)}
                  aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
                  aria-pressed={wished}
                  className={`flex items-center justify-center border px-5 transition-colors ${
                    wished ? "border-clay text-clay" : "border-cocoa-950/25 text-cocoa-700 hover:border-cocoa-950"
                  }`}
                >
                  <HeartIcon filled={wished} className="h-[18px] w-[18px]" />
                </button>
              </div>

              <Link
                href="/cart"
                onClick={addItem}
                className="group mt-3 flex w-full items-center justify-center gap-2.5 border border-cocoa-950 py-4 label-xs text-cocoa-950 transition-colors duration-300 hover:bg-cream"
              >
                Buy it now
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </>
          )}

          <div className="mt-8 border-t border-sand pt-7">
            <Accordion
              defaultOpen={0}
              items={[
                {
                  meta: "01",
                  title: "Why you'll love it",
                  content: (
                    <ul className="space-y-2.5">
                      {product.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <span
                            className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-botanical"
                            aria-hidden="true"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  meta: "02",
                  title: "Ingredients",
                  content: (
                    <>
                      <ul className="flex flex-wrap gap-2">
                        {product.ingredients.map((i) => (
                          <li
                            key={i}
                            className="border border-sand bg-cream px-3 py-1.5 text-[13px] text-cocoa-700"
                          >
                            {i}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-[14px] text-cocoa-600">
                        No sugar added, no sweeteners, no preservatives, no additives.
                      </p>
                    </>
                  ),
                },
                {
                  meta: "03",
                  title: "How it's made",
                  content: <p>{product.process}</p>,
                },
                {
                  meta: "04",
                  title: "Allergen information",
                  content: <p>{product.allergens}</p>,
                },
                {
                  meta: "05",
                  title: "Nutrition facts",
                  content: (
                    <div className="max-w-xs">
                      {product.panel ? (
                        <Image
                          src={product.panel}
                          alt={`Nutrition facts panel for ${product.name}`}
                          width={420}
                          height={900}
                          className="h-auto w-full border border-sand bg-white"
                        />
                      ) : (
                        <p>
                          Full nutrition facts are printed on every pack. {product.netCarbs ?? "0g refined carbs"}
                          {product.netCarbs ? " net carbs per serving." : "."}
                        </p>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* story + reviews */}
      <div className="mt-20 grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          <p className="eyebrow text-botanical">The details</p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-tight text-cocoa-950">
            What&apos;s actually in the bag.
          </h2>
          <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-cocoa-700">
            {product.story.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-botanical">FAQ</p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-tight text-cocoa-950">
            Questions, answered.
          </h2>
          <div className="mt-6">
            <Accordion items={faqs.slice(0, 5).map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />
          </div>
        </div>
      </div>

      {/* sticky mobile ATC */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-ivory/95 px-5 py-3 backdrop-blur-md transition-transform duration-400 lg:hidden ${
          showSticky && product.available ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <Image
            src={product.images[0]}
            alt=""
            width={40}
            height={54}
            className="pack-shot h-[54px] w-[40px] shrink-0 object-contain"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-cocoa-950">{product.name}</p>
            <p className="text-[12px] text-cocoa-600">
              {money(product.price)} · {product.sizeOz}
            </p>
          </div>
          <button
            type="button"
            onClick={addItem}
            className="shrink-0 bg-cocoa-950 px-6 py-3.5 label-xs text-cream"
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export function ProductReviews() {
  return (
    <div className="border border-sand bg-cream p-8">
      <div className="flex items-center gap-3">
        <Stars className="text-clay" />
        <span className="label-xs text-cocoa-700">Customer reactions</span>
      </div>
      <ul className="mt-6 space-y-6">
        <li>
          <p className="font-display text-[19px] leading-snug text-cocoa-900">
            “So glad I ordered the almond chocoliths. Literally like a healthy candy bar.”
          </p>
          <p className="mt-2 text-[12px] tracking-wide text-cocoa-600">S.P. · via email</p>
        </li>
        <li>
          <p className="font-display text-[19px] leading-snug text-cocoa-900">
            “I&apos;m spoiled now! Never start a single day without your products.”
          </p>
          <p className="mt-2 text-[12px] tracking-wide text-cocoa-600">K.S. · New York, NY</p>
        </li>
      </ul>
      <Link
        href="/#testimonials"
        className="mt-7 inline-flex items-center gap-2 border-b border-cocoa-950/30 pb-1 label-xs text-cocoa-950"
      >
        Read more customer reactions
        <ArrowIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
