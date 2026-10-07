"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ingredients } from "@/lib/content";

export default function IngredientExplorer() {
  const [active, setActive] = useState(0);
  const current = ingredients[active];

  return (
    <section id="ingredients" className="bg-ivory py-20 lg:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-botanical">Ingredient story</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em] text-cocoa-950">
            Nothing to hide.
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-cocoa-700">
            We believe great snacks start with great ingredients. Select one to see why we use it
            and where you&apos;ll find it.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <ul className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
              {ingredients.map((ing, i) => (
                <li key={ing.id} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={`border px-4 py-2.5 text-[12px] tracking-[0.08em] transition-all duration-300 ${
                      i === active
                        ? "border-cocoa-950 bg-cocoa-950 text-cream"
                        : "border-sand text-cocoa-700 hover:border-cocoa-500"
                    }`}
                  >
                    {ing.name}
                  </button>
                </li>
              ))}
            </ul>

            <div key={current.id} className="mt-10 border-t border-sand pt-8">
              <p className="label-xs text-botanical">{current.role}</p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-cocoa-950">{current.name}</h3>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-cocoa-700">{current.why}</p>
              <div className="mt-7">
                <p className="label-xs text-cocoa-500">Found in</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {current.products.map((p) => (
                    <span
                      key={p}
                      className="border border-sand bg-cream px-3 py-1.5 text-[12px] tracking-wide text-cocoa-700"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-[3/4]">
              <Image
                key={current.image + current.id}
                src={current.image}
                alt={current.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                style={{ transition: "opacity .6s ease" }}
              />
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ background: current.tone, opacity: 0.24 }}
                aria-hidden="true"
              />
            </div>
            <Link
              href="/wellness/how-we-choose-ingredients"
              className="mt-4 inline-flex items-center gap-2 border-b border-cocoa-950/30 pb-1 label-xs text-cocoa-950 transition-colors hover:border-cocoa-950"
            >
              How we choose ingredients
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
