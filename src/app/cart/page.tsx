import type { Metadata } from "next";
import { getProducts } from "@/lib/store";
import CartView from "@/components/cart-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your Plantraw order, adjust quantities, and add recommended snacks.",
  robots: { index: false, follow: true },
};

export default async function CartPage() {
  const products = await getProducts();
  const recommendations = products
    .filter((p) => p.available && p.bestsellerRank)
    .sort((a, b) => (a.bestsellerRank ?? 99) - (b.bestsellerRank ?? 99));

  return <CartView recommendations={recommendations} />;
}
