import type { Metadata } from "next";
import { getProducts } from "@/lib/store";
import WishlistView from "@/components/wishlist-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Account",
  description: "Your saved Plantraw snacks.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const products = await getProducts();
  return <WishlistView products={products} />;
}
