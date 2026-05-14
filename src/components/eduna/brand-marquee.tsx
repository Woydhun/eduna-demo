"use client";

import { BRAND_LOGOS } from "./data";
import { RemoteImg } from "./remote-img";

import imgPhone from "@/assets/products/phone.jpg";

export function BrandMarquee() {
  const row = [...BRAND_LOGOS, ...BRAND_LOGOS];
  return (
    <section className="overflow-hidden border-b border-border bg-brand-strip py-8" aria-labelledby="brands-heading">
      <h2
        id="brands-heading"
        className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
      >
        Forgalmazott márkáink
      </h2>
      <div className="flex animate-marquee items-center gap-10 px-4">
        {row.map((b, i) => (
          <div
            key={`${b.name}-${i}`}
            className="flex h-12 shrink-0 items-center justify-center opacity-80 transition-interactive hover:opacity-100"
          >
            <RemoteImg
              src={b.remote}
              fallback={imgPhone}
              alt={b.name}
              className="max-h-10 w-auto max-w-[100px] object-contain"
              height={40}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
