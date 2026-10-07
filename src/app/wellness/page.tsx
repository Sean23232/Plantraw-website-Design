import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/content";
import { Reveal } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Wellness — Nutrition, Ingredients & Healthy Snacking",
  description:
    "The Plantraw journal: why we don't use refined sugar, what minimally processed actually means, why we dehydrate, and how we choose ingredients.",
  alternates: { canonical: "/wellness" },
};

const categoryOrder = ["Nutrition", "Ingredients", "Healthy Snacking", "Recipes", "Wellness", "Behind the Brand"];

export default function WellnessPage() {
  const [hero, second, third, ...rest] = articles;

  return (
    <>
      <section className="border-b border-sand bg-cream">
        <div className="shell py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="label-xs text-cocoa-500">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-cocoa-950">Wellness</span>
          </nav>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,6.5vw,4.6rem)] font-light leading-[0.98] tracking-[-0.02em] text-cocoa-950">
            Know what you&apos;re eating.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cocoa-700">
            Short, honest explanations of the choices behind every Plantraw product — written by the
            people who make them.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {categoryOrder.map((c) => (
              <li
                key={c}
                className="border border-sand-dark/70 bg-ivory px-4 py-2 text-[11px] tracking-[0.14em] text-cocoa-700"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="shell py-14 lg:py-20">
        {/* hero article */}
        <Reveal>
          <Link
            href={`/wellness/${hero.slug}`}
            className="group grid gap-8 border-b border-sand pb-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden">
              <Image
                src={hero.image}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div>
              <p className="label-xs text-botanical">
                {hero.category} · {hero.minutes} min read
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.2rem)] font-light leading-[1.02] text-cocoa-950">
                {hero.title}
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-cocoa-700">{hero.standfirst}</p>
              <span className="mt-7 inline-flex items-center gap-2 border-b border-cocoa-950/30 pb-1 label-xs text-cocoa-950">
                Read the article
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* secondary */}
        <ul className="mt-14 grid gap-10 md:grid-cols-2 lg:gap-14">
          {[second, third].map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 80}>
              <Link href={`/wellness/${a.slug}`} className="group block">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 label-xs text-botanical">
                  {a.category} · {a.minutes} min read
                </p>
                <h3 className="mt-3 font-display text-[26px] leading-tight text-cocoa-950">{a.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cocoa-600">{a.standfirst}</p>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* grid */}
        <ul className="mt-16 grid gap-8 border-t border-sand pt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {rest.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 60}>
              <Link href={`/wellness/${a.slug}`} className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 label-xs text-botanical">
                  {a.category} · {a.minutes} min read
                </p>
                <h3 className="mt-3 font-display text-[22px] leading-tight text-cocoa-950">{a.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-cocoa-600">{a.standfirst}</p>
                <span className="mt-auto pt-5 text-[11px] tracking-[0.16em] text-cocoa-950">READ →</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
