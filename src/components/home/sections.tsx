import Image from "next/image";
import Link from "next/link";
import { categories, type Product } from "@/lib/catalog";
import { whyPlantraw, educationCards } from "@/lib/content";
import ProductCard from "@/components/product-card";
import NewsletterForm from "@/components/newsletter-form";
import { Reveal } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-botanical">Shop our favourites</p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em] text-cocoa-950">
              Meet your new favorite snacks.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-cocoa-700">
              Indulgent flavor. Thoughtful ingredients. Nothing unnecessary.
            </p>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 border-b border-cocoa-950/30 pb-1.5 label-xs text-cocoa-950 transition-colors hover:border-cocoa-950"
          >
            Shop bestsellers
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-6">
          {products.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 60} className="flex">
              <div className="w-full">
                <ProductCard product={p} priority={i < 3} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhyPlantraw() {
  return (
    <section id="why-plantraw" className="bg-cream py-20 lg:py-28">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-botanical">What makes Plantraw different</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.2vw,3.8rem)] font-light leading-[1.02] tracking-[-0.02em] text-cocoa-950">
            Food should work for your body — and delight your taste buds.
          </h2>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden border border-sand bg-sand md:grid-cols-2">
          {whyPlantraw.map((card, i) => (
            <Reveal as="li" key={card.n} delay={i * 70}>
              <article className="group h-full bg-ivory">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 font-display text-[13px] tracking-[0.2em] text-cream/90">
                    {card.n}
                  </span>
                </div>
                <div className="p-7 lg:p-9">
                  <h3 className="font-display text-[26px] leading-tight text-cocoa-950 lg:text-[30px]">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-cocoa-700">{card.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CategoryGrid({ sampleProducts }: { sampleProducts: Record<string, Product[]> }) {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-botanical">Explore the range</p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em] text-cocoa-950">
              Find your craving.
            </h2>
          </div>
          <Link href="/shop" className="label-xs link-line text-cocoa-950">
            Explore all snacks
          </Link>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const first = sampleProducts[cat.slug]?.[0];
            const count = sampleProducts[cat.slug]?.length ?? 0;
            return (
              <Reveal as="li" key={cat.slug} delay={i * 50}>
                <Link
                  href={`/shop/${cat.slug}`}
                  className="group relative block h-full overflow-hidden bg-cocoa-950"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-90 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(26,15,10,0.05) 0%, rgba(26,15,10,0.35) 55%, rgba(26,15,10,0.92) 100%)",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="label-xs text-sand/70">{cat.eyebrow}</p>
                      <h3 className="mt-2 font-display text-[26px] leading-none text-cream">
                        {cat.name}
                      </h3>
                      <p className="mt-2 max-w-[22ch] text-[13px] leading-snug text-sand/85">
                        {cat.tagline}
                      </p>
                      <p className="mt-3 text-[11px] tracking-[0.14em] text-sand/60">
                        {count} {count === 1 ? "product" : "products"}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-cream/40 text-cream transition-all duration-300 group-hover:border-cream group-hover:bg-cream group-hover:text-cocoa-950">
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <p className="sr-only">
          Categories include Chocolith® truffles, granola, Complete Crackers, keto snacks, cookies,
          date snacks and ginger snaps.
        </p>
      </div>
    </section>
  );
}

export function GranolaFeature({ products }: { products: Product[] }) {
  return (
    <section className="relative overflow-hidden bg-sand/50 py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/6]">
            <Image
              src="/images/granola-editorial.jpg"
              alt="Bowl of grain-free Plantraw granola with almonds, pecans, seeds and dates"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:absolute lg:-right-6 lg:bottom-8 lg:mt-0 lg:w-[240px] lg:border lg:border-sand-dark/60 lg:bg-ivory lg:p-5">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="flex items-center gap-3 border border-sand-dark/60 bg-ivory/80 p-2 pr-4 transition-colors hover:bg-ivory lg:w-full lg:border-0 lg:bg-transparent lg:p-0 lg:pr-0"
              >
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  width={56}
                  height={76}
                  className="pack-shot h-[76px] w-[56px] object-contain"
                />
                <span className="text-[13px] font-medium leading-tight text-cocoa-950">{p.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow text-botanical">Un-Cereal™ Breakfast Granola</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.2vw,3.8rem)] font-light leading-[1.02] tracking-[-0.02em] text-cocoa-950">
            Breakfast, without the compromise.
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-cocoa-700">
            Sweetened solely with whole organic dates, whose dietary fiber slows digestion. Never
            cooked, baked or denatured — gently dehydrated instead.
          </p>

          <ul className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3">
            {[
              "Grain-free",
              "Gluten-free",
              "Vegan",
              "No added sugar",
              "Dehydrated, never baked",
              "Nutritionally focused",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-cocoa-800-solid">
                <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-botanical" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/shop/granola"
              className="group flex items-center gap-2.5 bg-cocoa-950 px-9 py-4 label-xs text-cream transition-colors duration-300 hover:bg-cocoa-700"
            >
              Shop Granola
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/wellness/what-minimally-processed-means"
              className="flex items-center gap-2 border-b border-cocoa-950/25 pb-1 label-xs text-cocoa-950 transition-colors hover:border-cocoa-950"
            >
              Why we dehydrate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:items-center">
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/founder-workshop.jpg"
              alt="Hands sliding trays of raw granola and crackers into dehydrator racks in the Plantraw facility"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-[12px] leading-relaxed tracking-wide text-cocoa-500">
            Our own production facility — dedicated gluten-free, grain-free, peanut-free and
            dairy-free.
          </p>
        </div>

        <div>
          <p className="eyebrow text-botanical">The founder</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.2vw,3.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-cocoa-950">
            Why Plantraw exists.
          </h2>
          <div className="mt-7 max-w-xl space-y-5 text-[16px] leading-relaxed text-cocoa-700">
            <p>
              Izhar Groner grew up watching family members struggle with the modern-day scourges of
              high blood pressure, diabetes and heart disease — and spent the three decades since
              college studying everything he could about health and nutrition.
            </p>
            <p>
              As someone who used to crave refined carbs, he had to find satisfying alternatives he
              could actually stick to. So he made them himself: whole organic dates instead of sugar,
              kept raw, never denatured. Friends and family kept asking for more.
            </p>
            <p>
              The first product was Chocolith®. Then came grain-free granolas, Complete Crackers,
              ginger snaps and keto snacks — and a factory of our own to make them in.
            </p>
          </div>
          <Link
            href="/about"
            className="group mt-9 inline-flex items-center gap-2.5 border border-cocoa-950 px-9 py-4 label-xs text-cocoa-950 transition-colors duration-300 hover:bg-cocoa-950 hover:text-cream"
          >
            Read Our Story
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-botanical">Nutrition, explained</p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4rem)] font-light leading-[0.98] tracking-[-0.02em] text-cocoa-950">
              Know what you&apos;re eating.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-cocoa-700">
              Short, honest explanations of the choices behind every Plantraw product.
            </p>
          </div>
          <Link
            href="/wellness"
            className="group flex items-center gap-2 border-b border-cocoa-950/30 pb-1.5 label-xs text-cocoa-950 transition-colors hover:border-cocoa-950"
          >
            Explore Wellness
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {educationCards.map((card, i) => (
            <Reveal as="li" key={card.slug} delay={i * 60}>
              <Link
                href={`/wellness/${card.slug}`}
                className="group flex h-full flex-col border border-sand/80 bg-ivory transition-colors duration-300 hover:border-cocoa-950/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="label-xs text-botanical">
                    {card.category} · {card.minutes} min read
                  </p>
                  <h3 className="mt-3 font-display text-[22px] leading-tight text-cocoa-950">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-cocoa-600">{card.standfirst}</p>
                  <span className="mt-auto pt-5 text-[11px] tracking-[0.16em] text-cocoa-950">
                    READ →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="bg-ivory py-20 lg:py-24">
      <div className="shell">
        <div className="relative overflow-hidden border border-sand bg-cream px-6 py-14 text-center md:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, #e5d6bd 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow text-botanical">Newsletter</p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5.4vw,3.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-cocoa-950">
              Good things, delivered.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-cocoa-700">
              Get wellness insights, new product updates, exclusive offers, and occasional Plantraw
              treats.
            </p>
            <div className="mx-auto mt-9 max-w-lg text-left">
              <NewsletterForm tone="light" source="homepage" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
