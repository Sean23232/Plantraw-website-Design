"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import ProductCard from "@/components/product-card";
import { CloseIcon, PlusIcon } from "@/components/icons";

const dietaryOptions = [
  "Vegan",
  "Gluten-Free",
  "Grain-Free",
  "Paleo",
  "Keto",
  "Organic",
  "No Added Sugar",
  "No Refined Carbs",
  "Raw",
  "Kosher",
];

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "best", label: "Best Selling" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "newest", label: "Newest" },
] as const;

type SortId = (typeof sortOptions)[number]["id"];

const priceBuckets = [
  { id: "under10", label: "Under $10", test: (p: Product) => p.price < 10 },
  { id: "10to11", label: "$10 – $11", test: (p: Product) => p.price >= 10 && p.price < 11 },
  { id: "11plus", label: "$11 & up", test: (p: Product) => p.price >= 11 },
];

const allIngredientTags = (products: Product[]) =>
  Array.from(new Set(products.flatMap((p) => p.ingredients.map((i) => i.replace(/^Organic /, "")))))
    .filter((i) => !/^(iodized salt|baking soda)$/i.test(i))
    .sort((a, b) => a.localeCompare(b));

export default function ShopBrowser({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const [dietary, setDietary] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [ingredientSel, setIngredientSel] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [sort, setSort] = useState<SortId>("featured");
  const [panelOpen, setPanelOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(["category", "dietary"]);

  const ingredientOptions = useMemo(() => allIngredientTags(products), [products]);

  const categoryOptions = useMemo(() => {
    const map = new Map<string, { label: string; href: string; count: number }>();
    for (const p of products) {
      const key = p.category;
      const existing = map.get(key);
      if (existing) existing.count += 1;
      else
        map.set(key, {
          label:
            key === "chocolith"
              ? "Chocolith®"
              : key === "granola"
                ? "Granola"
                : key === "crackers"
                  ? "Complete Crackers"
                  : key === "cookies"
                    ? "Cookies"
                    : key === "date-snacks"
                      ? "Date Snacks"
                      : key === "ginger-snacks"
                        ? "Ginger Snaps"
                        : key,
          href: key === "keto" ? "/shop/keto" : `/shop/${key}`,
          count: 1,
        });
    }
    const list = Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
    return [
      { label: "Keto Snacks", href: "/shop/keto", count: products.filter((p) => p.keto).length },
      ...list,
    ];
  }, [products]);

  const filtered = useMemo(() => {
    let out = products.slice();

    if (initialCategory === "keto") out = out.filter((p) => p.keto);
    if (dietary.length > 0) out = out.filter((p) => dietary.every((d) => p.badges.includes(d)));
    if (price.length > 0) {
      const tests = priceBuckets.filter((b) => price.includes(b.id)).map((b) => b.test);
      out = out.filter((p) => tests.some((t) => t(p)));
    }
    if (ingredientSel.length > 0)
      out = out.filter((p) =>
        ingredientSel.every((sel) =>
          p.ingredients.some((i) => i.replace(/^Organic /, "").toLowerCase().includes(sel.toLowerCase())),
        ),
      );
    if (availability.length > 0)
      out = out.filter((p) => (availability.includes("in-stock") ? p.available : !p.available));

    switch (sort) {
      case "price-asc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        out.reverse();
        break;
      case "best":
        out.sort((a, b) => (a.bestsellerRank ?? 99) - (b.bestsellerRank ?? 99));
        break;
      default:
        out.sort((a, b) => (a.featuredRank ?? 50) - (b.featuredRank ?? 50));
    }
    return out;
  }, [products, dietary, price, ingredientSel, availability, sort, initialCategory]);

  const activeCount = dietary.length + price.length + ingredientSel.length + availability.length;

  function toggle(list: string[], set: (v: string[]) => void, value: string) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const groups: {
    id: string;
    title: string;
    content: React.ReactNode;
    count?: number;
  }[] = [
    {
      id: "category",
      title: "Category",
      content: (
        <ul className="space-y-2.5">
          <li>
            <Link href="/shop" className="text-[13px] text-cocoa-700 hover:text-ink">
              All Products ({products.length})
            </Link>
          </li>
          {categoryOptions.map((c) => (
            <li key={c.href} className="flex items-center justify-between gap-3">
              <Link href={c.href} className="text-[13px] text-cocoa-700 hover:text-ink">
                {c.label}
              </Link>
              <span className="text-[11px] text-cocoa-500">{c.count}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "dietary",
      title: "Dietary Preference",
      content: (
        <ul className="space-y-2.5">
          {dietaryOptions.map((d) => (
            <li key={d}>
              <label className="flex cursor-pointer items-center gap-3 text-[13px] text-cocoa-700">
                <input
                  type="checkbox"
                  checked={dietary.includes(d)}
                  onChange={() => toggle(dietary, setDietary, d)}
                  className="h-[15px] w-[15px] accent-[#5d6b45]"
                />
                {d}
              </label>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "ingredients",
      title: "Ingredients",
      content: (
        <div className="max-h-56 overflow-y-auto pr-1">
          <ul className="space-y-2.5">
            {ingredientOptions.map((d) => (
              <li key={d}>
                <label className="flex cursor-pointer items-center gap-3 text-[13px] text-cocoa-700">
                  <input
                    type="checkbox"
                    checked={ingredientSel.includes(d)}
                    onChange={() => toggle(ingredientSel, setIngredientSel, d)}
                    className="h-[15px] w-[15px] accent-[#5d6b45]"
                  />
                  {d}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "price",
      title: "Price",
      content: (
        <ul className="space-y-2.5">
          {priceBuckets.map((b) => (
            <li key={b.id}>
              <label className="flex cursor-pointer items-center gap-3 text-[13px] text-cocoa-700">
                <input
                  type="checkbox"
                  checked={price.includes(b.id)}
                  onChange={() => toggle(price, setPrice, b.id)}
                  className="h-[15px] w-[15px] accent-[#5d6b45]"
                />
                {b.label}
              </label>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "availability",
      title: "Availability",
      content: (
        <ul className="space-y-2.5">
          {[
            { id: "in-stock", label: "In stock" },
            { id: "sold-out", label: "Sold out" },
          ].map((a) => (
            <li key={a.id}>
              <label className="flex cursor-pointer items-center gap-3 text-[13px] text-cocoa-700">
                <input
                  type="checkbox"
                  checked={availability.includes(a.id)}
                  onChange={() => toggle(availability, setAvailability, a.id)}
                  className="h-[15px] w-[15px] accent-[#5d6b45]"
                />
                {a.label}
              </label>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="shell grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
      {/* filter rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="flex items-center justify-between border-b border-sand pb-4">
            <p className="eyebrow text-cocoa-950">Filter</p>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setDietary([]);
                  setPrice([]);
                  setIngredientSel([]);
                  setAvailability([]);
                }}
                className="text-[11px] tracking-wide text-clay underline underline-offset-4"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
          <div className="mt-2 divide-y divide-sand/70">
            {groups.map((g) => {
              const isOpen = openGroups.includes(g.id);
              return (
                <div key={g.id} className="py-4">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroups((prev) =>
                        prev.includes(g.id) ? prev.filter((x) => x !== g.id) : [...prev, g.id],
                      )
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="label-xs text-cocoa-950">{g.title}</span>
                    <PlusIcon
                      className={`h-3.5 w-3.5 text-cocoa-500 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-400"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4">{g.content}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* results */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand pb-4">
          <p className="text-[13px] text-cocoa-600">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="border border-cocoa-950/25 px-4 py-2 label-xs text-cocoa-950 lg:hidden"
            >
              Filter{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
            <label className="flex items-center gap-2">
              <span className="hidden text-[12px] tracking-wide text-cocoa-500 sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="border border-cocoa-950/25 bg-transparent px-3 py-2 text-[12px] tracking-wide text-cocoa-950 outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {activeCount > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {[...dietary, ...price, ...ingredientSel, ...availability].map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-2 border border-sand bg-cream px-3 py-1.5 text-[11px] tracking-wide text-cocoa-700"
              >
                {tag.replace(/-/g, " ")}
                <button
                  type="button"
                  aria-label={`Remove ${tag}`}
                  onClick={() => {
                    setDietary((d) => d.filter((x) => x !== tag));
                    setPrice((d) => d.filter((x) => x !== tag));
                    setIngredientSel((d) => d.filter((x) => x !== tag));
                    setAvailability((d) => d.filter((x) => x !== tag));
                  }}
                  className="text-cocoa-500 hover:text-clay"
                >
                  <CloseIcon className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-cocoa-950">Nothing matches those filters.</p>
            <p className="mt-3 text-sm text-cocoa-600">
              Try removing a dietary requirement or two.
            </p>
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-7">
            {filtered.map((p, i) => (
              <li key={p.slug}>
                <ProductCard product={p} priority={i < 3} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* mobile filter panel */}
      <div className={`fixed inset-0 z-[85] lg:hidden ${panelOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-cocoa-950/50 transition-opacity duration-300 ${
            panelOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setPanelOpen(false)}
        />
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            panelOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="sticky top-0 flex items-center justify-between border-b border-sand bg-ivory px-5 py-4">
            <p className="eyebrow">Filter</p>
            <button type="button" onClick={() => setPanelOpen(false)} aria-label="Close filters" className="p-2">
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="divide-y divide-sand/70 px-5">
            {groups.slice(1).map((g) => (
              <div key={g.id} className="py-4">
                <p className="label-xs mb-4 text-cocoa-950">{g.title}</p>
                {g.content}
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 flex gap-3 border-t border-sand bg-cream px-5 py-4">
            <button
              type="button"
              onClick={() => {
                setDietary([]);
                setPrice([]);
                setIngredientSel([]);
                setAvailability([]);
              }}
              className="flex-1 border border-cocoa-950/25 py-3.5 label-xs text-cocoa-950"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="flex-1 bg-cocoa-950 py-3.5 label-xs text-cream"
            >
              Show {filtered.length}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
