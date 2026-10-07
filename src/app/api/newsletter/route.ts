import { addSubscriber } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return Response.json({ ok: false, error: "invalid email" }, { status: 400 });
    }
    await addSubscriber(email, (body.source ?? "site").slice(0, 40));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "unavailable" }, { status: 500 });
  }
}
