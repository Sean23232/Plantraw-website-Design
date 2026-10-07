import type { Metadata } from "next";
import { getProducts } from "@/lib/store";
import { categories } from "@/lib/catalog";
import { Hero } from "@/components/home/hero";

export const revalidate = 3600;
import ChocolithFeature from "@/components/home/chocolith-feature";
import IngredientExplorer from "@/components/home/ingredient-explorer";
import Testimonials from "@/components/home/testimonials";
import {
  CategoryGrid,
  EducationSection,
  FeaturedProducts,
  FounderSection,
  GranolaFeature,
  NewsletterSection,
  WhyPlantraw,
} from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Plantraw® — Indulgence, Without Compromise",
  description:
    "Premium raw, minimally processed plant-based snacks: Chocolith® cocoa-date truffles, grain-free granola, Complete Crackers and keto snacks. Vegan, gluten-free, grain-free, organic, 0g refined carbs.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const products = await getProducts();

  const featured = products
    .filter((p) => p.featuredRank)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))
    .slice(0, 6);

  const chocolith = products
    .filter((p) => p.line === "Chocolith®")
    .sort((a, b) => a.title.localeCompare(b.title));

  const granola = products.filter((p) => p.line === "Un-Cereal™ Granola");

  const sampleProducts: Record<string, typeof products> = {};
  for (const cat of categories) {
    sampleProducts[cat.slug] =
      cat.slug === "keto"
        ? products.filter((p) => p.keto)
        : products.filter((p) => p.category === cat.slug);
  }

  const heroPicks = [
    products.find((p) => p.slug === "chocolith-almonds"),
    products.find((p) => p.slug === "granola-original"),
    products.find((p) => p.slug === "complete-crackers-zaatar-onion"),
  ].filter((p): p is (typeof products)[number] => Boolean(p));

  return (
    <>
      <Hero heroes={heroPicks} />
      <FeaturedProducts products={featured.length ? featured : products.slice(0, 6)} />
      <ChocolithFeature products={chocolith} />
      <WhyPlantraw />
      <IngredientExplorer />
      <CategoryGrid sampleProducts={sampleProducts} />
      <GranolaFeature products={granola} />
      <Testimonials />
      <FounderSection />
      <EducationSection />
      <NewsletterSection />
    </>
  );
}
