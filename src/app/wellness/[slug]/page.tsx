import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Wellness" };
  return {
    title: article.title,
    description: article.standfirst,
    alternates: { canonical: `/wellness/${article.slug}` },
    openGraph: { title: article.title, description: article.standfirst, images: [article.image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-sand bg-cream">
          <div className="shell py-12 lg:py-16">
            <nav aria-label="Breadcrumb" className="label-xs text-cocoa-500">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href="/wellness" className="hover:text-ink">
                Wellness
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-cocoa-950">{article.category}</span>
            </nav>
            <p className="mt-8 label-xs text-botanical">
              {article.category} · {article.minutes} min read
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,5.8vw,4.2rem)] font-light leading-[1] tracking-[-0.02em] text-cocoa-950">
              {article.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-cocoa-700">
              {article.standfirst}
            </p>
          </div>
        </header>

        <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-[21/8]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="shell grid gap-14 py-16 lg:grid-cols-[minmax(0,8fr)_minmax(0,3fr)] lg:gap-20 lg:py-20">
          <div className="max-w-2xl">
            {article.body.map((section, i) => (
              <section key={section.heading} className={i > 0 ? "mt-12" : ""}>
                <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-light leading-tight text-cocoa-950">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5 text-[17px] leading-[1.75] text-cocoa-700">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <div className="mt-14 border-t border-sand pt-8">
              <p className="font-display text-[20px] leading-snug text-cocoa-900">
                Everything we make follows the same set of rules — no refined sugar, no unnecessary
                additives, and no method that denatures the food.
              </p>
              <Link
                href="/shop"
                className="mt-7 inline-flex items-center gap-2.5 bg-cocoa-950 px-8 py-4 label-xs text-cream transition-colors hover:bg-cocoa-700"
              >
                Shop All Snacks
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-botanical">Keep reading</p>
            <ul className="mt-6 space-y-6">
              {more.map((a) => (
                <li key={a.slug}>
                  <Link href={`/wellness/${a.slug}`} className="group flex gap-4">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden">
                      <Image src={a.image} alt="" fill sizes="80px" className="object-cover" />
                    </div>
                    <div>
                      <p className="label-xs text-cocoa-500">{a.category}</p>
                      <p className="mt-1.5 font-display text-[17px] leading-snug text-cocoa-950 group-hover:text-clay">
                        {a.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>
    </>
  );
}
