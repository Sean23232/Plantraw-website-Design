"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { useCart } from "@/components/cart-provider";
import {
  BagIcon,
  ChevronIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";

type SearchHit = {
  slug: string;
  name: string;
  descriptor: string;
  price: number;
  image: string;
};

export default function SiteHeader() {
  const pathname = usePathname();
  const { count, openCart, hydrated } = useCart();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 60);
  }, [searchOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setHits([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = (await res.json()) as { results: SearchHit[] };
        setHits(data.results);
      } catch {
        setHits([]);
      }
    }, 180);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <>
      <div className="bg-cocoa-950 text-cream">
        <div className="shell flex h-9 items-center justify-center overflow-hidden">
          <p className="label-xs text-center tracking-[0.24em] text-sand">
            Free shipping east of the Mississippi on orders $39+
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          stuck
            ? "border-sand/70 bg-ivory/92 backdrop-blur-xl"
            : "border-transparent bg-ivory"
        }`}
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              stuck ? "h-[68px]" : "h-[84px]"
            }`}
          >
            {/* left */}
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="-ml-2 p-2 lg:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </button>

              <nav className="hidden items-center gap-7 lg:flex">
                <div className="group relative">
                  <Link
                    href="/shop"
                    className="label-xs link-line flex items-center gap-1.5 py-2 text-cocoa-700 hover:text-ink"
                    data-active={pathname.startsWith("/shop")}
                  >
                    Shop
                    <ChevronIcon className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full w-[300px] translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="border border-sand/80 bg-ivory p-2 shadow-[0_28px_60px_-30px_rgba(35,20,12,0.4)]">
                      {nav.shop.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-[13px] tracking-wide text-cocoa-700 transition-colors hover:bg-cream hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/#why-plantraw"
                  className="label-xs link-line py-2 text-cocoa-700 hover:text-ink"
                >
                  Why Plantraw
                </Link>
                <Link href="/about" className="label-xs link-line py-2 text-cocoa-700 hover:text-ink">
                  Our Story
                </Link>
                <div className="group relative">
                  <Link
                    href="/wellness"
                    className="label-xs link-line flex items-center gap-1.5 py-2 text-cocoa-700 hover:text-ink"
                    data-active={pathname.startsWith("/wellness")}
                  >
                    Wellness
                    <ChevronIcon className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full w-[280px] translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="border border-sand/80 bg-ivory p-2 shadow-[0_28px_60px_-30px_rgba(35,20,12,0.4)]">
                      {nav.learn.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-[13px] tracking-wide text-cocoa-700 transition-colors hover:bg-cream hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href="/contact" className="label-xs link-line py-2 text-cocoa-700 hover:text-ink">
                  Contact
                </Link>
              </nav>
            </div>

            {/* logo */}
            <Link
              href="/"
              aria-label="Plantraw home"
              className="absolute left-1/2 -translate-x-1/2 text-center"
            >
              <span className="block font-display text-[26px] leading-none tracking-tight text-cocoa-950 md:text-[30px]">
                PLANTRAW<span className="align-super text-[10px]">®</span>
              </span>
              <span className="mt-1 hidden text-[8px] font-medium uppercase tracking-[0.42em] text-botanical md:block">
                Live a little · live long
              </span>
            </Link>

            {/* right */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="p-2.5 text-cocoa-700 transition-colors hover:text-ink"
              >
                <SearchIcon className="h-[19px] w-[19px]" />
              </button>
              <Link
                href="/account"
                aria-label="Account"
                className="hidden p-2.5 text-cocoa-700 transition-colors hover:text-ink md:block"
              >
                <UserIcon className="h-[19px] w-[19px]" />
              </Link>
              <button
                type="button"
                onClick={openCart}
                aria-label={`Cart, ${count} items`}
                className="relative p-2.5 text-cocoa-700 transition-colors hover:text-ink"
              >
                <BagIcon className="h-[19px] w-[19px]" />
                {hydrated && count > 0 && (
                  <span className="absolute right-0.5 top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-clay px-1 text-[10px] font-semibold text-white">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-cocoa-950/50 transition-opacity duration-400 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-sand px-5">
            <span className="font-display text-xl">PLANTRAW<span className="align-super text-[8px]">®</span></span>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2">
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <p className="eyebrow mb-3 text-botanical">Shop</p>
            <ul className="mb-8 space-y-1">
              {nav.shop.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block border-b border-sand/60 py-3 font-display text-2xl text-cocoa-950"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-3 text-botanical">Learn</p>
            <ul className="mb-8 space-y-3">
              {nav.learn.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-cocoa-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-cocoa-700">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-sm text-cocoa-700">
                  Account
                </Link>
              </li>
            </ul>
          </div>
          <div className="border-t border-sand bg-cream px-5 py-4">
            <Link
              href="/shop"
              className="block w-full bg-cocoa-950 py-3.5 text-center label-xs text-cream"
            >
              Shop All Snacks
            </Link>
          </div>
        </div>
      </div>

      {/* search overlay */}
      <div
        className={`fixed inset-0 z-[80] ${searchOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!searchOpen}
      >
        <div
          className={`absolute inset-0 bg-cocoa-950/55 backdrop-blur-sm transition-opacity duration-300 ${
            searchOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSearchOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            searchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="shell py-6">
            <div className="flex items-center gap-4 border-b border-sand pb-4">
              <SearchIcon className="h-5 w-5 shrink-0 text-cocoa-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Chocolith, granola, keto…"
                className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-sand-dark md:text-3xl"
                aria-label="Search products"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="p-2">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto py-6">
              {query.trim().length < 2 ? (
                <div className="flex flex-wrap gap-2">
                  {["Chocolith", "Granola", "Keto", "Crackers", "Date Rolls", "Ginger Snaps"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="border border-sand px-4 py-2 text-xs tracking-wide text-cocoa-700 transition-colors hover:border-cocoa-500"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : hits.length === 0 ? (
                <p className="text-sm text-cocoa-500">
                  No products matched “{query}”. Try Chocolith, granola, keto or crackers.
                </p>
              ) : (
                <ul className="grid gap-3 md:grid-cols-2">
                  {hits.map((h) => (
                    <li key={h.slug}>
                      <Link
                        href={`/products/${h.slug}`}
                        className="flex items-center gap-4 border border-transparent p-3 transition-colors hover:border-sand hover:bg-cream"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={h.image}
                          alt={h.name}
                          className="h-16 w-16 shrink-0 object-contain"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-cocoa-950">{h.name}</span>
                          <span className="block truncate text-xs text-cocoa-500">{h.descriptor}</span>
                        </span>
                        <span className="text-sm text-cocoa-700">${h.price.toFixed(2)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
