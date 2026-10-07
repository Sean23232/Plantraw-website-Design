"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/catalog";

export type CartItemInput = {
  slug: string;
  name: string;
  line: string;
  price: number;
  image: string;
  sizeOz: string;
};

export type CartLine = CartItemInput & { quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  hydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: CartItemInput, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  isWished: (slug: string) => boolean;
  toggleWish: (slug: string) => void;
  wishlist: string[];
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "plantraw.cart.v1";
const WISH_KEY = "plantraw.wishlist.v1";

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const pending = useRef<Array<{ slug: string; quantity: number }>>([]);
  const flushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLines(readLocal<CartLine[]>(CART_KEY, []));
    setWishlist(readLocal<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  // keep the server cart in sync so the cart survives a page reload
  const flushServer = useCallback(() => {
    if (pending.current.length === 0) return;
    const payload = pending.current;
    pending.current = [];
    void fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines: payload }),
    }).catch(() => {});
  }, []);

  const queueSync = useCallback(
    (slug: string, quantity: number) => {
      pending.current = [
        ...pending.current.filter((p) => p.slug !== slug),
        { slug, quantity },
      ];
      if (flushTimer.current) clearTimeout(flushTimer.current);
      flushTimer.current = setTimeout(flushServer, 700);
    },
    [flushServer],
  );

  const add = useCallback(
    (item: CartItemInput, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.slug === item.slug);
        if (existing) {
          const next = prev.map((l) =>
            l.slug === item.slug ? { ...l, quantity: l.quantity + quantity } : l,
          );
          queueSync(item.slug, existing.quantity + quantity);
          return next;
        }
        queueSync(item.slug, quantity);
        return [...prev, { ...item, quantity }];
      });
      setOpen(true);
    },
    [queueSync],
  );

  const setQuantity = useCallback(
    (slug: string, quantity: number) => {
      setLines((prev) => {
        const next =
          quantity <= 0
            ? prev.filter((l) => l.slug !== slug)
            : prev.map((l) => (l.slug === slug ? { ...l, quantity } : l));
        queueSync(slug, quantity);
        return next;
      });
    },
    [queueSync],
  );

  const remove = useCallback(
    (slug: string) => {
      setLines((prev) => prev.filter((l) => l.slug !== slug));
      queueSync(slug, 0);
    },
    [queueSync],
  );

  const toggleWish = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((n, l) => n + l.quantity * l.price, 0);
    return {
      lines,
      count,
      subtotal,
      open,
      hydrated,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add,
      setQuantity,
      remove,
      isWished: (slug: string) => wishlist.includes(slug),
      toggleWish,
      wishlist,
    };
  }, [lines, open, hydrated, add, setQuantity, remove, wishlist, toggleWish]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function shippingProgress(subtotal: number) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  return {
    remaining,
    unlocked: remaining === 0,
    percent: Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)),
  };
}

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
