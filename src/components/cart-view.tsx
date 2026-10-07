"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/catalog";
import { money, shippingProgress, useCart } from "@/components/cart-provider";
import { ArrowIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, TruckIcon } from "@/components/icons";

export default function CartView({ recommendations }: { recommendations: Product[] }) {
  const { lines, setQuantity, remove, subtotal, add } = useCart();
  const progress = shippingProgress(subtotal);
  const inCart = new Set(lines.map((l) => l.slug));
  const suggestions = recommendations.filter((p) => !inCart.has(p.slug)).slice(0, 4);

  if (lines.length === 0) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="font-display text-[clamp(2.2rem,6vw,3.6rem)] font-light text-cocoa-950">
          Your cart is empty.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-cocoa-700">
          Start with Chocolith® — the cocoa-date truffle our customers keep reordering. Three
          ingredients, 0g refined carbs.
        </p>
        <Link
          href="/shop"
          className="group mt-9 inline-flex items-center gap-2.5 bg-cocoa-950 px-10 py-4 label-xs text-cream transition-colors hover:bg-cocoa-700"
        >
          Shop All Snacks
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-12 lg:py-16">
      <nav aria-label="Breadcrumb" className="label-xs text-cocoa-500">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-cocoa-950">Cart</span>
      </nav>
      <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,3.8rem)] font-light leading-[1] text-cocoa-950">
        Your cart
      </h1>

      <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-16">
        <div>
          <div className="border-y border-sand bg-cream px-5 py-4">
            <div className="flex items-start gap-2.5">
              {progress.unlocked ? (
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-botanical" />
              ) : (
                <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cocoa-500" />
              )}
              <p className="text-[13px] leading-snug text-cocoa-700">
                {progress.unlocked ? (
                  <span className="font-medium text-botanical-deep">Free shipping unlocked</span>
                ) : (
                  <>
                    You&apos;re{" "}
                    <strong className="font-semibold text-cocoa-950">{money(progress.remaining)}</strong>{" "}
                    away from free shipping
                  </>
                )}
              </p>
            </div>
            <div className="mt-3 h-[3px] w-full overflow-hidden bg-sand-dark/60">
              <div
                className="h-full bg-botanical transition-[width] duration-700"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>

          <ul className="divide-y divide-sand">
            {lines.map((line) => (
              <li key={line.slug} className="flex gap-5 py-7">
                <Link href={`/products/${line.slug}`} className="shrink-0">
                  <Image
                    src={line.image}
                    alt={line.name}
                    width={110}
                    height={150}
                    className="pack-shot h-[150px] w-[110px] object-contain"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="label-xs text-botanical">{line.line}</p>
                      <Link
                        href={`/products/${line.slug}`}
                        className="mt-1.5 block font-display text-[20px] leading-snug text-cocoa-950 hover:text-clay"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1 text-[12px] tracking-wide text-cocoa-500">
                        {line.sizeOz} · {money(line.price)} each
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.slug)}
                      className="p-1 text-cocoa-500 transition-colors hover:text-clay"
                      aria-label={`Remove ${line.name}`}
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-sand">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.slug, line.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="px-3.5 py-2.5 text-cocoa-700 hover:bg-cream"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="w-9 text-center text-[14px] tabular-nums">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.slug, line.quantity + 1)}
                        aria-label="Increase quantity"
                        className="px-3.5 py-2.5 text-cocoa-700 hover:bg-cream"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-display text-[22px] tabular-nums text-cocoa-950">
                      {money(line.price * line.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {suggestions.length > 0 && (
            <div className="mt-12 border-t border-sand pt-10">
              <h2 className="font-display text-[26px] text-cocoa-950">Complete your order with…</h2>
              <ul className="mt-7 grid grid-cols-2 gap-5 lg:grid-cols-4">
                {suggestions.map((p) => (
                  <li key={p.slug} className="flex flex-col">
                    <Link href={`/products/${p.slug}`} className="bg-cream">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        width={240}
                        height={320}
                        className="pack-shot aspect-[4/5] w-full object-contain p-3"
                      />
                    </Link>
                    <p className="mt-3 text-[13px] font-medium leading-snug text-cocoa-950">{p.name}</p>
                    <p className="mt-1 text-[12px] text-cocoa-600">{money(p.price)}</p>
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
                      className="mt-3 border border-cocoa-950 py-2.5 label-xs text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream"
                    >
                      Add to cart
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-sand bg-cream p-7">
            <h2 className="eyebrow text-cocoa-950">Order summary</h2>
            <dl className="mt-6 space-y-3 text-[14px]">
              <div className="flex items-center justify-between">
                <dt className="text-cocoa-700">Subtotal</dt>
                <dd className="tabular-nums text-cocoa-950">{money(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-cocoa-700">Shipping</dt>
                <dd className="text-cocoa-950">
                  {progress.unlocked ? "Free" : "Calculated at checkout"}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-sand pt-5">
              <span className="label-xs text-cocoa-700">Total</span>
              <span className="font-display text-[30px] tabular-nums text-cocoa-950">
                {money(subtotal)}
              </span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-cocoa-500">
              Free shipping on orders {money(FREE_SHIPPING_THRESHOLD)}+ east of the Mississippi.
            </p>
            <Link
              href="/shop"
              className="mt-6 flex items-center justify-center gap-2.5 bg-cocoa-950 py-4 label-xs text-cream transition-colors hover:bg-cocoa-700"
            >
              Proceed to checkout
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="mt-3 block text-center py-2 text-[12px] tracking-wide text-cocoa-600 underline decoration-sand-dark underline-offset-4 hover:text-ink"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
