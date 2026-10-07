import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  line: text("line").notNull(),
  title: text("title").notNull(),
  descriptor: text("descriptor").notNull(),
  category: text("category").notNull(),
  price: numeric("price", { precision: 8, scale: 2 }).notNull(),
  compareAt: numeric("compare_at", { precision: 8, scale: 2 }),
  sizeOz: numeric("size_oz", { precision: 5, scale: 2 }).notNull(),
  netCarbs: text("net_carbs"),
  available: boolean("available").notNull().default(true),
  keto: boolean("keto").notNull().default(false),
  featuredRank: integer("featured_rank"),
  bestsellerRank: integer("bestseller_rank"),
  badges: jsonb("badges").$type<string[]>().notNull().default([]),
  ingredients: jsonb("ingredients").$type<string[]>().notNull().default([]),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  panel: text("panel"),
  story: jsonb("story").$type<string[]>().notNull().default([]),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  allergens: text("allergens").notNull().default(""),
  process: text("process").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const cartItems = pgTable(
  "cart_items",
  {
    id: serial("id").primaryKey(),
    cartToken: text("cart_token").notNull(),
    productId: text("product_id").notNull(),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("cart_items_token_product_idx").on(table.cartToken, table.productId)],
);

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("site"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const wishlistItems = pgTable("wishlist_items", {
  id: serial("id").primaryKey(),
  visitorToken: text("visitor_token").notNull(),
  productId: text("product_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  topic: text("topic").notNull().default("general"),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ProductRow = typeof products.$inferSelect;
export type NewProductRow = typeof products.$inferInsert;
