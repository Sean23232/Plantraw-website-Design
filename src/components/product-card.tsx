"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { money, useCart } from "@/components/cart-provider";
import { BagIcon, HeartIcon } from "@/components/icons";

export default function ProductCard({
  product,
  priority = false,
  compact = false,
}: {
  product: Product;
  priority?: boolean;
  compact?: boolean;
}) {
  const { add, isWished, toggleWish } = useCart();
  const wished = isWished(product.slug);

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="block overflow-hidden bg-cream"
          aria-label={product.name}
        >
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.images[0]}
              alt={`${product.name} — ${product.descriptor}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className="pack-shot object-contain p-4 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="pack-shot object-contain p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </div>
        </Link>

        <button
          type="button"
          onClick={() => toggleWish(product.slug)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wished}
          className={`absolute right-3 top-3 z-10 rounded-full bg-ivory/85 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-ivory ${
            wished ? "text-clay" : "text-cocoa-600"
          }`}
        >
          <HeartIcon filled={wished} className="h-4 w-4" />
        </button>

        {!product.available && (
          <span className="absolute left-3 top-3 z-10 bg-cocoa-950/90 px-2.5 py-1 label-xs text-cream">
            Sold out
          </span>
        )}
        {product.available && product.keto && (
          <span className="absolute left-3 top-3 z-10 border border-botanical/50 bg-ivory/85 px-2.5 py-1 label-xs text-botanical-deep backdrop-blur-sm">
            {product.netCarbs ? product.netCarbs : "Keto"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="label-xs text-botanical">{product.line}</p>
        <h3 className="mt-2 font-display text-[19px] leading-tight text-cocoa-950">
          <Link href={`/products/${product.slug}`} className="hover:text-clay">
            {product.title === product.line ? product.name : product.title}
          </Link>
        </h3>
        {!compact && (
          <p className="mt-1.5 text-[13px] leading-relaxed text-cocoa-600">{product.descriptor}</p>
        )}

        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[11px] tracking-wide text-cocoa-500">
          {product.badges.slice(0, 3).map((b, i) => (
            <li key={b} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-sand-dark">•</span>}
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-[15px] font-medium tabular-nums text-cocoa-950">
            {money(product.price)}
          </span>
          <span className="text-[11px] tracking-wide text-cocoa-500">{product.sizeOz}</span>
        </div>

        <div className="mt-4">
          {product.available ? (
            <button
              type="button"
              onClick={() =>
                add({
                  slug: product.slug,
                  name: product.name,
                  line: product.line,
                  price: product.price,
                  image: product.images[0],
                  sizeOz: product.sizeOz,
                })
              }
              className="flex w-full items-center justify-center gap-2 border border-cocoa-950 py-3 label-xs text-cocoa-950 transition-all duration-300 hover:bg-cocoa-950 hover:text-cream"
            >
              <BagIcon className="h-4 w-4" />
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed border border-sand-dark py-3 label-xs text-cocoa-500"
            >
              Sold out
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
