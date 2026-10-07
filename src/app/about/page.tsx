import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Our Story — Food With Purpose",
  description:
    "Why Plantraw exists: founder Izhar Groner's three decades of nutrition study, a first product called Chocolith®, and the decision to build our own dedicated production facility.",
  alternates: { canonical: "/about" },
};

const timeline = [
  {
    year: "The beginning",
    title: "Healthy treats made at home",
    body: "As someone who used to crave refined carbs, Izhar had to find satisfying alternatives he could stick to — real foods he could indulge in without harming his body. He used whole organic dates instead of sugar and kept the snacks raw, not denatured.",
  },
  {
    year: "2016",
    title: "Neoliv Foods",
    body: "Friends and family loved the creations and kept asking for more, telling him he should sell them in stores. He followed that passion and started Neoliv Foods, which later became Primeraw Foods, now Plantraw®.",
  },
  {
    year: "The first product",
    title: "Chocolith®",
    body: "Originally known as Cocoa-Date Truffles. In new stores Izhar would run demos, handing out samples and listening. Sizes and additional flavors came directly from customer requests.",
  },
  {
    year: "The factory",
    title: "Our own production facility",
    body: "After searching throughout Northern and Central New Jersey, he found an industrial space — a former mattress factory, clean, chemical-free and big enough. Machinery arrived before the build-out was finished, so teams worked around the packed machines.",
  },
  {
    year: "Today",
    title: "The full range",
    body: "Grain-free granolas, kale-keto crackers, Complete Crackers, natural Ginger Snaps, keto cookies and date rolls — all vegan, grain-free, gluten-free, kosher and organic, with no added sugar.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cocoa-950 text-cream">
        <div className="absolute inset-0">
          <Image
            src="/images/founder-workshop.jpg"
            alt="The Plantraw production facility, with trays of raw snacks loaded into dehydrator racks"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(100deg, rgba(26,15,10,0.95) 8%, rgba(26,15,10,0.7) 55%, rgba(26,15,10,0.35) 100%)" }}
            aria-hidden="true"
          />
        </div>
        <div className="shell relative py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-sand/70">Our story</p>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,7.5vw,5rem)] font-light leading-[0.96] tracking-[-0.02em]">
              Food with purpose.
            </h1>
            <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-sand/85">
              Plantraw® exists because one person spent thirty years studying nutrition and
              couldn&apos;t find a snack he was willing to eat every day.
            </p>
          </div>
        </div>
      </section>

      {/* founder */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <p className="eyebrow text-botanical">From the founder</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.02] text-cocoa-950">
              Izhar Groner
            </h2>
            <p className="mt-3 text-[13px] tracking-[0.14em] text-cocoa-500">
              Founder, CEO &amp; Chief Research Officer
            </p>
            <div className="relative mt-8 aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/ingredients-hero.jpg"
                alt="The raw whole ingredients Plantraw builds its snacks from"
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-6 text-[16px] leading-relaxed text-cocoa-700 lg:pt-16">
            <p className="font-display text-[22px] leading-snug text-cocoa-900">
              As a kid I saw family members gaining weight and getting sick with the modern-day
              scourges of high blood pressure, diabetes and heart disease. Determined not to go
              there, I have been studying everything I could about health and nutrition ever since.
            </p>
            <p>
              That path ran from biology in college through books, journals and professional
              podcasts over three decades. I hold an MBA from NYU with majors in finance and
              economics, I&apos;m a Phi Beta Kappa graduate of Hofstra University where I took
              biology, and I&apos;m a graduate of Cornell University&apos;s Plant-Based Nutrition
              Program.
            </p>
            <p>
              I set up my own production facility and spared no effort in sourcing the very best
              ingredients so my customers may enjoy peerless treats. All my processes revolve around
              preserving the nutritional value of my products.
            </p>
            <p>
              I hope that you too embark on a journey to a healthier, longer life. I trust that my
              products will make your journey a more pleasurable one.
            </p>
            <p className="font-display text-[20px] text-cocoa-950">Be well, Izhar</p>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="shell">
          <p className="eyebrow text-botanical">The history of Plantraw®</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,3.8rem)] font-light leading-[1.02] tracking-[-0.02em] text-cocoa-950">
            From a home kitchen to our own factory floor.
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden border border-sand bg-sand md:grid-cols-2 lg:grid-cols-3">
            {timeline.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 70}>
                <div className="h-full bg-ivory p-7 lg:p-9">
                  <p className="label-xs text-clay">{item.year}</p>
                  <h3 className="mt-4 font-display text-[24px] leading-tight text-cocoa-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-cocoa-700">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* philosophies */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-botanical">Ingredient philosophy</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,2.8rem)] font-light leading-tight text-cocoa-950">
              Nothing added just because it&apos;s conventional.
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-cocoa-700">
              <p>
                We source the highest-quality cocoa paste, from Peru. Part of the quality is the
                flavor, mouthfeel and aroma. The other part is the paucity of heavy metals. Each
                batch is lab-tested, and we receive a certificate of analysis with each delivery.
              </p>
              <p>
                We avoid refined sugar, honey, coconut nectar, maple syrup, or any other substance
                that may spike blood glucose. Our sweetener is the whole organic date — and in keto
                products, organic allulose.
              </p>
              <p>
                Even our iodized salt is specified without anti-caking agents.
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-botanical">Production philosophy</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,2.8rem)] font-light leading-tight text-cocoa-950">
              We only augment nature&apos;s work.
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-cocoa-700">
              <p>
                We soak our almonds and seeds to deactivate the phytate and other anti-nutrients that
                naturally occur in them. Also known as sprouting, this enhances mineral absorption so
                the nutrients in our products are as bioavailable as possible.
              </p>
              <p>
                We dehydrate our granolas, crackers and chips instead of baking them, keeping their
                vitamin content intact while creating a shelf-stable snack. We don&apos;t heat our
                Chocolith® or our cookies, and we don&apos;t denature them in any other way.
              </p>
              <p>
                Everything is produced in a dedicated gluten-free, grain-free, peanut-free and
                dairy-free facility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* mission */}
      <section className="grain relative overflow-hidden bg-cocoa-950 py-20 text-cream lg:py-28">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(90% 80% at 20% 20%, #6b452c 0%, #1a0f0a 65%)" }}
          aria-hidden="true"
        />
        <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center">
          <div>
            <p className="eyebrow text-sand/70">The mission</p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5.4vw,3.8rem)] font-light leading-[1.02] tracking-[-0.02em]">
              Nutritionally dense, superb snacks.
            </h2>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-sand/85">
              We craft vegan, gluten-free, grain-free and keto snacks that are as delectable as they
              are wholesome and nutritious. As you deeply enjoy them, know that you are nourishing
              your body with the best possible ingredients — plants that are good sources of fiber,
              protein and essential nutrients.
            </p>
            <p className="mt-6 font-display text-[24px] text-sand">
              You can now live a little… and live long™.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]">
            <Image
              src="/images/chocolith-editorial.jpg"
              alt="Chocolith cocoa-date truffles with raw cacao nibs and unprocessed cocoa paste"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="shell text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-tight text-cocoa-950">
            Shop the snacks behind the story.
          </h2>
          <Link
            href="/shop"
            className="group mt-9 inline-flex items-center gap-2.5 bg-cocoa-950 px-10 py-4 label-xs text-cream transition-colors duration-300 hover:bg-cocoa-700"
          >
            Shop All Snacks
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
