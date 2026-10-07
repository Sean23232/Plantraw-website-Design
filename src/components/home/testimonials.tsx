"use client";

import { useRef, useState } from "react";
import { testimonials } from "@/lib/content";
import { Stars } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const perView = 3;
  const pages = Math.ceil(testimonials.length / perView);

  function goTo(i: number) {
    const next = ((i % pages) + pages) % pages;
    setIndex(next);
    trackRef.current?.scrollTo({
      left: trackRef.current.clientWidth * next,
      behavior: "smooth",
    });
  }

  return (
    <section id="testimonials" className="bg-cream py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-botanical">Customer love</p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5.2vw,3.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-cocoa-950">
              Loved by people who care what they eat.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center border border-cocoa-950/25 text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center border border-cocoa-950/25 text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream"
            >
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name + t.quote.slice(0, 12)}
              className="flex min-w-[86%] snap-start flex-col justify-between border border-sand/80 bg-ivory p-7 sm:min-w-[48%] lg:min-w-[calc((100%-2.5rem)/3)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars className="text-clay" />
                  <span className="label-xs text-cocoa-500">{t.topic}</span>
                </div>
                <blockquote className="mt-5 font-display text-[19px] leading-[1.45] text-cocoa-900">
                  “{t.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-7 border-t border-sand/70 pt-4 text-[12px] tracking-wide text-cocoa-600">
                <span className="font-medium text-cocoa-950">{t.name}</span>
                {t.location ? ` · ${t.location}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial page ${i + 1}`}
              className={`h-[2px] w-10 transition-colors ${i === index ? "bg-cocoa-950" : "bg-sand-dark"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
