"use client";

import Image from "next/image";
import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD, type Product } from "@/lib/catalog";
import { money, shippingProgress, useCart } from "@/components/cart-provider";
import { ArrowIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, TruckIcon } from "@/components/icons";

export default function CartDrawer({ recommendations }: { recommendations?: Product[] }) {
  const { lines, open, closeCart, setQuantity, remove, subtotal, add } = useCart();
  const progress = shippingProgress(subtotal);
  const recs = recommendations ?? [];

  const inCart = new Set(lines.map((l) => l.slug));
  const suggestions = recs.filter((p) => !inCart.has(p.slug)).slice(0, 3);

  return (
    <div className={`fixed inset-0 z-[90] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-cocoa-950/55 backdrop-blur-[2px] transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[27rem] flex-col bg-ivory shadow-[0_0_80px_rgba(26,15,10,0.35)] transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-sand px-5">
          <h2 className="eyebrow text-cocoa-950">Your Cart ({lines.length})</h2>
          <button type="button" onClick={closeCart} aria-label="Close cart" className="p-2 text-cocoa-700">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="shrink-0 border-b border-sand bg-cream px-5 py-4">
          <div className="mb-2 flex items-start gap-2.5">
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
                  You&apos;re <strong className="font-semibold text-cocoa-950">{money(progress.remaining)}</strong>{" "}
                  away from free shipping
                </>
              )}
            </p>
          </div>
          <div className="h-[3px] w-full overflow-hidden bg-sand-dark/60">
            <div
              className="h-full bg-botanical transition-[width] duration-700 ease-out"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-cocoa-500">
            Free shipping on orders {money(FREE_SHIPPING_THRESHOLD)}+ east of the Mississippi
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <p className="font-display text-2xl text-cocoa-950">Your cart is empty</p>
              <p className="mt-2 max-w-xs text-sm text-cocoa-500">
                Start with Chocolith® — the cocoa-date truffle our customers keep reordering.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-6 bg-cocoa-950 px-8 py-3.5 label-xs text-cream transition-colors hover:bg-cocoa-700"
              >
                Shop All Snacks
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-sand/70">
              {lines.map((line) => (
                <li key={line.slug} className="flex gap-4 py-5">
                  <Link href={`/products/${line.slug}`} onClick={closeCart} className="shrink-0">
                    <Image
                      src={line.image}
                      alt={line.name}
                      width={84}
                      height={112}
                      className="pack-shot h-[112px] w-[84px] object-contain"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${line.slug}`}
                        onClick={closeCart}
                        className="text-[13px] font-medium leading-snug text-cocoa-950 hover:underline"
                      >
                        {line.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        aria-label={`Remove ${line.name}`}
                        className="p-1 text-cocoa-500 hover:text-clay"
                      >
                        <CloseIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-[11px] tracking-wide text-cocoa-500">{line.sizeOz}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-sand">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.slug, line.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="px-2.5 py-1.5 text-cocoa-700 hover:bg-cream"
                        >
                          <MinusIcon className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-[13px] tabular-nums">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.slug, line.quantity + 1)}
                          aria-label="Increase quantity"
                          className="px-2.5 py-1.5 text-cocoa-700 hover:bg-cream"
                        >
                          <PlusIcon className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-[13px] tabular-nums text-cocoa-950">
                        {money(line.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 && suggestions.length > 0 && (
            <div className="border-t border-sand py-6">
              <p className="eyebrow mb-4 text-botanical">Complete your order with…</p>
              <ul className="space-y-3">
                {suggestions.map((p) => (
                  <li key={p.slug} className="flex items-center gap-3">
                    <Image src={p.images[0]} alt={p.name} width={52} height={68} className="pack-shot h-[68px] w-[52px] object-contain" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-cocoa-950">{p.name}</p>
                      <p className="text-[11px] text-cocoa-500">{money(p.price)}</p>
                    </div>
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
                      className="border border-cocoa-950 px-3 py-1.5 label-xs text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="shrink-0 border-t border-sand bg-cream px-5 py-5">
            <div className="mb-1 flex items-center justify-between">
              <span className="label-xs text-cocoa-700">Subtotal</span>
              <span className="font-display text-2xl tabular-nums text-cocoa-950">{money(subtotal)}</span>
            </div>
            <p className="mb-4 text-[11px] text-cocoa-500">
              Taxes and shipping calculated at checkout.
            </p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="group flex items-center justify-center gap-2 bg-cocoa-950 py-4 label-xs text-cream transition-colors hover:bg-cocoa-700"
            >
              Checkout
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 w-full py-2 text-[12px] tracking-wide text-cocoa-600 underline decoration-sand-dark underline-offset-4 hover:text-ink"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
