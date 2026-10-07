import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/store";
import { faqs } from "@/lib/content";
import { Accordion } from "@/components/ui";
import NewsletterForm from "@/components/newsletter-form";
import ContactForm from "@/components/contact-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Help — Shipping, Returns, FAQs",
  description:
    "Contact Plantraw, or find answers on shipping, returns, sweeteners, kosher certification, keto products and how to store our snacks.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const products = await getProducts();
  const bestsellers = products.filter((p) => p.bestsellerRank).slice(0, 4);

  return (
    <>
      <section className="border-b border-sand bg-cream">
        <div className="shell py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="label-xs text-cocoa-500">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-cocoa-950">Contact</span>
          </nav>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,6.5vw,4.4rem)] font-light leading-[0.98] tracking-[-0.02em] text-cocoa-950">
            We&apos;d love to hear from you.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cocoa-700">
            Questions about an order, an ingredient, or stocking Plantraw in your store? Ask a
            nutrition question — we genuinely like those.
          </p>
        </div>
      </section>

      <div className="shell grid gap-14 py-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20 lg:py-20">
        <ContactForm />

        <div className="space-y-10">
          <div className="border border-sand bg-cream p-7">
            <p className="eyebrow text-botanical">Quick facts</p>
            <dl className="mt-5 space-y-4 text-[14px] leading-relaxed">
              <div>
                <dt className="font-medium text-cocoa-950">Free shipping</dt>
                <dd className="text-cocoa-700">East of the Mississippi on orders $39+.</dd>
              </div>
              <div>
                <dt className="font-medium text-cocoa-950">Facility</dt>
                <dd className="text-cocoa-700">
                  Dedicated gluten-free, grain-free, peanut-free and dairy-free.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-cocoa-950">Certifications</dt>
                <dd className="text-cocoa-700">Certified organic and kosher.</dd>
              </div>
              <div>
                <dt className="font-medium text-cocoa-950">Wholesale</dt>
                <dd className="text-cocoa-700">
                  Ask your local grocer to carry Plantraw — or write to us about retail and food
                  service.
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="eyebrow text-botanical">Customer favourites</p>
            <ul className="mt-5 divide-y divide-sand border-y border-sand">
              {bestsellers.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:text-clay"
                  >
                    <span className="text-[14px] text-cocoa-800-solid">{p.name}</span>
                    <span className="text-[13px] tabular-nums text-cocoa-600">
                      ${p.price.toFixed(2)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-botanical">Newsletter</p>
            <p className="mt-4 font-display text-2xl leading-snug text-cocoa-950">
              Good things, delivered.
            </p>
            <div className="mt-5">
              <NewsletterForm tone="light" source="contact" />
            </div>
          </div>
        </div>
      </div>

      <section id="faq" className="border-t border-sand bg-cream py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <p className="eyebrow text-botanical">FAQ</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,2.8rem)] font-light leading-tight text-cocoa-950">
              Frequently asked.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-cocoa-700">
              Can&apos;t find your answer? Use the form above and we&apos;ll reply personally.
            </p>
          </div>
          <Accordion items={faqs.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} defaultOpen={0} />
        </div>
      </section>

      <section id="shipping" className="border-t border-sand bg-ivory py-14">
        <div className="shell grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              id: "shipping",
              title: "Shipping",
              body: "Free shipping east of the Mississippi on orders of $39 or more. All other orders are calculated at checkout.",
            },
            {
              id: "returns",
              title: "Returns",
              body: "If a product arrives damaged or isn't what you expected, contact us with your order number and we'll make it right.",
            },
            {
              id: "privacy",
              title: "Privacy",
              body: "We use your email only to send order updates and, if you opt in, our newsletter. We never sell customer data.",
            },
            {
              id: "terms",
              title: "Terms",
              body: "Statements on this site describe our ingredients and methods. They are not medical advice and are not intended to diagnose, treat or prevent any condition.",
            },
          ].map((b) => (
            <div key={b.id} id={b.id}>
              <p className="label-xs text-botanical">{b.title}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-cocoa-700">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
