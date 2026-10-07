import Image from "next/image";
import Link from "next/link";
import { benefitStrip } from "@/lib/content";
import { benefitIcons, ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/ui";
import type { Product } from "@/lib/catalog";

export function Hero({ heroes }: { heroes: Product[] }) {
  const [a, b, c] = heroes;

  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #e3d3ba 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="shell relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:pb-24 lg:pt-16">
        {/* copy */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow text-botanical">Raw · Plant-Based · Since 2016</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7.5vw,4.9rem)] font-light leading-[0.96] tracking-[-0.02em] text-cocoa-950">
              Indulgence,
              <br />
              <span className="italic">without</span> compromise.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-md text-[17px] leading-relaxed text-cocoa-700">
              Wholesome snacks made from thoughtfully chosen ingredients, with no refined
              carbs and no unnecessary additives.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/shop"
                className="group flex items-center justify-center gap-2.5 bg-cocoa-950 px-9 py-4 label-xs text-cream transition-colors duration-300 hover:bg-cocoa-700"
              >
                Shop All Snacks
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#why-plantraw"
                className="flex items-center justify-center gap-2.5 border border-cocoa-950/25 px-9 py-4 label-xs text-cocoa-950 transition-colors duration-300 hover:border-cocoa-950 hover:bg-ivory"
              >
                Why Plantraw
              </Link>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.16em] text-cocoa-500">
              Vegan • Gluten-Free • Grain-Free • Organic • Paleo-Friendly
            </p>
          </Reveal>
        </div>

        {/* imagery */}
        <div className="relative order-1 lg:order-2">
          <Reveal delay={60}>
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/13] lg:aspect-[5/6]">
              <Image
                src="/images/hero.jpg"
                alt="Raw cocoa-date truffles with whole dates, cacao nibs and almonds arranged on linen and stone"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,15,10,0.05) 0%, rgba(26,15,10,0) 40%, rgba(26,15,10,0.28) 100%)",
                }}
                aria-hidden="true"
              />
            </div>
          </Reveal>

          {/* floating packs */}
          <div className="pointer-events-none absolute -bottom-6 left-0 hidden w-[62%] sm:flex sm:items-end sm:gap-2 lg:-left-14 lg:w-[64%] lg:gap-4">
            {a && (
              <div className="pointer-events-auto relative -rotate-[7deg]">
                <Image
                  src={a.images[0]}
                  alt={a.name}
                  width={230}
                  height={315}
                  className="h-auto w-[30vw] max-w-[188px] drop-shadow-[0_28px_40px_rgba(35,20,12,0.32)] lg:max-w-[218px]"
                />
              </div>
            )}
            {b && (
              <div className="pointer-events-auto relative mt-8 rotate-[5deg]">
                <Image
                  src={b.images[0]}
                  alt={b.name}
                  width={230}
                  height={315}
                  className="h-auto w-[30vw] max-w-[188px] drop-shadow-[0_28px_40px_rgba(35,20,12,0.32)] lg:max-w-[218px]"
                />
              </div>
            )}
          </div>

          {c && (
            <Link
              href={`/products/${c.slug}`}
              className="absolute right-4 top-4 hidden w-[128px] rotate-[6deg] transition-transform duration-500 hover:rotate-0 lg:block"
            >
              <Image
                src={c.images[0]}
                alt={c.name}
                width={230}
                height={315}
                className="h-auto w-full drop-shadow-[0_24px_34px_rgba(35,20,12,0.3)]"
              />
            </Link>
          )}

          <div className="absolute bottom-5 right-5 hidden max-w-[190px] bg-ivory/92 p-4 backdrop-blur-sm lg:block">
            <p className="label-xs text-botanical">0g refined carbs</p>
            <p className="mt-2 font-display text-[17px] leading-snug text-cocoa-950">
              Sweetened only with whole organic dates.
            </p>
          </div>
        </div>
      </div>

      <BenefitStrip />
    </section>
  );
}

function BenefitStrip() {
  return (
    <div className="border-y border-sand/80 bg-ivory">
      <div className="shell">
        <ul className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-0 overflow-x-auto md:grid md:grid-cols-3 md:divide-x md:divide-sand/70 lg:grid-cols-6">
          {benefitStrip.map((item, i) => {
            const Icon = benefitIcons[item.icon];
            return (
              <li
                key={item.label}
                className={`flex shrink-0 snap-start items-center gap-3 px-5 py-5 md:justify-center md:px-4 ${
                  i < benefitStrip.length - 1 ? "border-r border-sand/70 md:border-r-0" : ""
                }`}
              >
                {Icon && <Icon className="h-5 w-5 shrink-0 text-botanical" />}
                <span className="whitespace-nowrap label-xs text-cocoa-800-solid">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
