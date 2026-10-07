import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/store";
import { products as catalog } from "@/lib/catalog";
import ProductDetail, { ProductReviews } from "@/components/product-detail";
import ProductCard from "@/components/product-card";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = catalog.find((p) => p.slug === slug);
  if (!product) return { title: "Product" };
  const title = `${product.name} (${product.sizeOz}) — ${product.badges.slice(0, 3).join(", ")}`;
  return {
    title,
    description: `${product.descriptor} ${product.badges.join(", ")}. 0g refined carbs. Made in Plantraw's dedicated gluten-free, grain-free, peanut-free and dairy-free facility.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description: product.descriptor,
      images: [product.images[0]],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const all = await getProducts();
  const related = all
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => {
      const score = (x: typeof product) =>
        (x.line === product.line ? 2 : 0) + (x.keto === product.keto ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.descriptor,
    image: product.images,
    brand: { "@type": "Brand", name: "Plantraw®" },
    category: product.line,
    weight: { "@type": "QuantitativeValue", name: product.sizeOz },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://plantraw.com/products/${product.slug}`,
    },
    keywords: product.badges.join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://plantraw.com/" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://plantraw.com/shop" },
      {
        "@type": "ListItem",
        position: 3,
        name: product.line,
        item: `https://plantraw.com/shop/${product.category}`,
      },
      { "@type": "ListItem", position: 4, name: product.name },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="shell pt-8">
        <nav aria-label="Breadcrumb" className="label-xs text-cocoa-500">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href={`/shop/${product.category}`} className="hover:text-ink">
            {product.line}
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-cocoa-950">{product.title}</span>
        </nav>
      </div>

      <div className="shell py-10 lg:py-16">
        <ProductDetail product={product} />
      </div>

      <section className="border-t border-sand bg-ivory py-16 lg:py-20">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
            <div>
              <p className="eyebrow text-botanical">Related products</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-tight text-cocoa-950">
                Pairs well with.
              </h2>
              <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:gap-x-7">
                {related.map((p) => (
                  <li key={p.slug}>
                    <ProductCard product={p} compact />
                  </li>
                ))}
              </ul>
            </div>
            <ProductReviews />
          </div>
        </div>
      </section>
    </>
  );
}
