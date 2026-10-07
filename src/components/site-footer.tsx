import Link from "next/link";
import { nav } from "@/lib/content";
import NewsletterForm from "@/components/newsletter-form";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/plantrawfoods", glyph: "IG" },
  { label: "Facebook", href: "https://www.facebook.com/plantraw", glyph: "FB" },
  { label: "Email", href: "mailto:info@plantraw.com", glyph: "✉" },
];

export default function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden bg-cocoa-950 text-cream">
      <div className="shell relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr] lg:gap-20">
          <div>
            <p className="font-display text-[28px] leading-none">PLANTRAW<span className="align-super text-[10px]">®</span></p>
            <p className="mt-5 max-w-sm font-display text-2xl leading-snug text-sand">
              You can now live a little… and live long™.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand/70">
              Raw, minimally processed, plant-based snacks made in our own dedicated
              gluten-free, grain-free, peanut-free and dairy-free facility.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center border border-sand/30 text-[11px] tracking-wider text-sand transition-colors hover:border-sand hover:bg-sand hover:text-cocoa-950"
                >
                  {s.glyph}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <FooterColumn title="Shop" links={nav.shop} />
            <FooterColumn title="Learn" links={nav.learn} />
            <FooterColumn title="Help" links={nav.help} />
          </div>
        </div>

        <div className="mt-16 border-t border-sand/20 pt-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow text-sand/70">Newsletter</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-cream md:text-4xl">
                Good Things, Delivered.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-sand/70">
                Get wellness insights, new product updates, exclusive offers, and occasional
                Plantraw treats.
              </p>
            </div>
            <NewsletterForm tone="dark" source="footer" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-sand/20 pt-7 text-[11px] tracking-wide text-sand/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Plantraw®. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <span>Certified Organic</span>
            <span aria-hidden="true">·</span>
            <span>Kosher</span>
            <span aria-hidden="true">·</span>
            <span>Vegan</span>
            <span aria-hidden="true">·</span>
            <span>Gluten-Free</span>
            <span aria-hidden="true">·</span>
            <span>Grain-Free</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="eyebrow mb-5 text-sand/70">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="link-line text-sm text-sand/85 transition-colors hover:text-cream">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
