import "server-only";
import { cache } from "react";
import { asc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { cartItems, products as productsTable, subscribers } from "@/db/schema";
import { products as catalog, type Product } from "@/lib/catalog";

let seeded = false;

export async function ensureSeed() {
  if (seeded) return;
  const rows = catalog.map((p) => ({
    slug: p.slug,
    name: p.name,
    line: p.line,
    title: p.title,
    descriptor: p.descriptor,
    category: p.category,
    price: p.price.toFixed(2),
    compareAt: p.compareAt ? p.compareAt.toFixed(2) : null,
    sizeOz: p.sizeOz,
    netCarbs: p.netCarbs ?? null,
    available: p.available,
    keto: p.keto,
    featuredRank: p.featuredRank ?? null,
    bestsellerRank: p.bestsellerRank ?? null,
    badges: p.badges,
    ingredients: p.ingredients,
    images: p.images,
    panel: p.panel ?? null,
    story: p.story,
    highlights: p.highlights,
    allergens: p.allergens,
    process: p.process,
  }));

  for (const row of rows) {
    await db
      .insert(productsTable)
      .values(row)
      .onConflictDoUpdate({ target: productsTable.slug, set: { ...row } });
  }
  seeded = true;
}

function rowToProduct(row: typeof productsTable.$inferSelect): Product {
  return {
    slug: row.slug,
    name: row.name,
    line: row.line,
    title: row.title,
    descriptor: row.descriptor,
    category: row.category as Product["category"],
    price: Number(row.price),
    compareAt: row.compareAt ? Number(row.compareAt) : undefined,
    sizeOz: row.sizeOz,
    netCarbs: row.netCarbs ?? undefined,
    available: row.available,
    keto: row.keto,
    featuredRank: row.featuredRank ?? undefined,
    bestsellerRank: row.bestsellerRank ?? undefined,
    badges: row.badges ?? [],
    ingredients: row.ingredients ?? [],
    images: row.images ?? [],
    panel: row.panel ?? undefined,
    story: row.story ?? [],
    highlights: row.highlights ?? [],
    allergens: row.allergens,
    process: row.process,
  };
}

/** Products read from Postgres, seeded from the catalog. Falls back to the static catalog. */
export const getProducts = cache(async (): Promise<Product[]> => {
  try {
    await ensureSeed();
    const rows = await db.select().from(productsTable).orderBy(asc(productsTable.id));
    if (rows.length === 0) return catalog;
    return rows.map(rowToProduct);
  } catch {
    return catalog;
  }
});

export async function getProduct(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export type CartLine = { product: Product; quantity: number };

export async function readCart(token: string): Promise<CartLine[]> {
  const all = await getProducts();
  try {
    const rows = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartToken, token))
      .orderBy(asc(cartItems.createdAt));
    return rows
      .map((row) => {
        const product = all.find((p) => p.slug === row.productId);
        return product ? { product, quantity: row.quantity } : null;
      })
      .filter((x): x is CartLine => x !== null);
  } catch {
    return [];
  }
}

export async function addToCart(token: string, productId: string, quantity = 1) {
  await ensureSeed().catch(() => {});
  await db
    .insert(cartItems)
    .values({ cartToken: token, productId, quantity })
    .onConflictDoUpdate({
      target: [cartItems.cartToken, cartItems.productId],
      set: { quantity: sql`${cartItems.quantity} + ${quantity}` },
    });
}

export async function setCartQuantity(token: string, productId: string, quantity: number) {
  if (quantity <= 0) {
    await db
      .delete(cartItems)
      .where(sql`${cartItems.cartToken} = ${token} and ${cartItems.productId} = ${productId}`);
    return;
  }
  await db
    .insert(cartItems)
    .values({ cartToken: token, productId, quantity })
    .onConflictDoUpdate({
      target: [cartItems.cartToken, cartItems.productId],
      set: { quantity },
    });
}

export async function addSubscriber(email: string, source = "site") {
  await db.insert(subscribers).values({ email: email.toLowerCase(), source }).onConflictDoNothing();
}
