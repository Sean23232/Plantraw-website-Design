import { db } from "@/db";
import { messages } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      topic?: string;
      body?: string;
    };
    const name = (body.name ?? "").trim().slice(0, 120);
    const email = (body.email ?? "").trim().toLowerCase().slice(0, 160);
    const text = (body.body ?? "").trim().slice(0, 4000);

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || text.length < 5) {
      return Response.json({ ok: false, error: "Please complete every field." }, { status: 400 });
    }

    await db.insert(messages).values({
      name,
      email,
      topic: (body.topic ?? "general").slice(0, 40),
      body: text,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Message could not be saved." }, { status: 500 });
  }
}
