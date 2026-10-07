import "server-only";
import { cookies } from "next/headers";

export const CART_COOKIE = "plantraw_cart";

export async function readCartToken(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_COOKIE)?.value;
  if (existing) return existing;
  const token = crypto.randomUUID();
  try {
    store.set(CART_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 60,
    });
  } catch {
    // called from a context that cannot set cookies — read-only usage
  }
  return token;
}
