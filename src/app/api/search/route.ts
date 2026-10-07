import { getProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim().toLowerCase();
  if (q.length < 2) return Response.json({ results: [] });

  const all = await getProducts();
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = all
    .map((p) => {
      const haystack = [
        p.name,
        p.line,
        p.title,
        p.descriptor,
        p.category,
        p.badges.join(" "),
        p.ingredients.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (p.name.toLowerCase().includes(t)) score += 6;
        if (p.line.toLowerCase().includes(t)) score += 3;
        if (p.descriptor.toLowerCase().includes(t)) score += 2;
        if (haystack.includes(t)) score += 1;
      }
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return Response.json({
    results: scored.map(({ p }) => ({
      slug: p.slug,
      name: p.name,
      descriptor: p.descriptor,
      price: p.price,
      image: p.images[0],
    })),
  });
}
