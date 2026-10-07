"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { money, useCart } from "@/components/cart-provider";
import { HeartIcon } from "@/components/icons";

export default function WishlistView({ products }: { products: Product[] }) {
  const { wishlist, add } = useCart();
  const saved = products.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="shell py-12 lg:py-16">
      <nav aria-label="Breadcrumb" className="label-xs text-cocoa-500">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-cocoa-950">Account</span>
      </nav>
      <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,3.8rem)] font-light leading-[1] text-cocoa-950">
        Your wishlist
      </h1>
      <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-cocoa-700">
        Snacks you&apos;ve saved while browsing. Your wishlist is stored on this device.
      </p>

      {saved.length === 0 ? (
        <div className="mt-14 flex flex-col items-start border border-sand bg-cream p-10">
          <HeartIcon className="h-6 w-6 text-clay" />
          <p className="mt-5 font-display text-2xl text-cocoa-950">Nothing saved yet.</p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-cocoa-700">
            Tap the heart on any product to keep it here for later.
          </p>
          <Link
            href="/shop"
            className="mt-7 bg-cocoa-950 px-8 py-3.5 label-xs text-cream transition-colors hover:bg-cocoa-700"
          >
            Browse the range
          </Link>
        </div>
      ) : (
        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">
          {saved.map((p) => (
            <li key={p.slug} className="flex flex-col">
              <Link href={`/products/${p.slug}`} className="bg-cream">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  width={300}
                  height={400}
                  className="pack-shot aspect-[4/5] w-full object-contain p-4"
                />
              </Link>
              <p className="mt-4 label-xs text-botanical">{p.line}</p>
              <h2 className="mt-1.5 font-display text-[19px] leading-tight text-cocoa-950">
                {p.title === p.line ? p.name : p.title}
              </h2>
              <p className="mt-2 text-[14px] tabular-nums text-cocoa-950">{money(p.price)}</p>
              <button
                type="button"
                onClick={() =>
                  add({
                    slug: p.slug,
                    name: p.name,
                    line: p.line,
                    price: p.price,
                    image: p.images[0],
                    sizeOz: p.sizeOz,
                  })
                }
                className="mt-4 border border-cocoa-950 py-3 label-xs text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream"
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
