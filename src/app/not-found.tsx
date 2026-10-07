import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow text-botanical">404</p>
      <h1 className="mt-5 font-display text-[clamp(2.4rem,7vw,4.4rem)] font-light leading-[1] text-cocoa-950">
        This page has been eaten.
      </h1>
      <p className="mt-6 max-w-md text-[16px] leading-relaxed text-cocoa-700">
        The page you requested doesn&apos;t exist. The snacks, happily, still do.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="bg-cocoa-950 px-9 py-4 label-xs text-cream transition-colors hover:bg-cocoa-700"
        >
          Shop All Snacks
        </Link>
        <Link
          href="/"
          className="border border-cocoa-950/25 px-9 py-4 label-xs text-cocoa-950 transition-colors hover:border-cocoa-950"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
