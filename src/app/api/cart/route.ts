import { readCartToken } from "@/lib/cart-token";
import { readCart, setCartQuantity } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = await readCartToken();
    const lines = await readCart(token);
    return Response.json({
      lines: lines.map((l) => ({ slug: l.product.slug, quantity: l.quantity })),
      subtotal: lines.reduce((n, l) => n + l.product.price * l.quantity, 0),
    });
  } catch {
    return Response.json({ lines: [], subtotal: 0 });
  }
}

export async function PUT(request: Request) {
  try {
    const token = await readCartToken();
    const body = (await request.json()) as { lines?: { slug: string; quantity: number }[] };
    const lines = Array.isArray(body.lines) ? body.lines.slice(0, 50) : [];
    for (const line of lines) {
      if (typeof line.slug !== "string" || typeof line.quantity !== "number") continue;
      await setCartQuantity(token, line.slug, Math.max(0, Math.round(line.quantity)));
    }
    return Response.json({ ok: true, synced: lines.length });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
