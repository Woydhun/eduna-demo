"use client";

import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { RemoteImg } from "./remote-img";
import { useEdunaDemo } from "./home-context";
import { productSlug } from "./product-utils";
import type { DemoProduct } from "./types";

/** Responsive product grid: reflows before columns become too narrow for CTAs. Slightly wider min column than 12rem for CTA breathing room only. */
export const EDUNA_PRODUCT_GRID_CLASS =
  "grid min-w-0 gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,13.5rem),1fr))]";

/** Full-width in column layout; shares row on sm+. Icon+label stay on one line and clip inside the pill. */
const ctaButtonClass =
  "h-auto min-h-8 w-full min-w-0 flex-nowrap items-center justify-center gap-1.5 overflow-hidden px-2 py-1.5 text-center text-xs leading-tight sm:flex-1 sm:px-2 sm:py-2";

export function ProductCard({ product: p, dense }: { product: DemoProduct; dense?: boolean }) {
  const { addToCart, toggleWish, wishlist, fmtHu, stockText } = useEdunaDemo();
  const discount = p.old ? Math.round((1 - p.price / p.old) * 100) : null;
  const wishlisted = wishlist.has(p.id);

  return (
    <article
      className={`group flex min-w-0 flex-col rounded-2xl border border-border bg-card shadow-sm transition-interactive hover:border-primary/40 hover:shadow-md ${dense ? "" : ""}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted/40">
        <RemoteImg
          src={p.remoteSrc}
          fallback={p.fallbackSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-contain p-3 transition-interactive group-hover:scale-[1.02]"
          width={400}
          height={400}
        />
        <span className="absolute left-2 top-2 rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">
          {p.tag}
        </span>
        <button
          type="button"
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-interactive hover:border-primary/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={wishlisted ? "Eltávolítás a kedvencekből" : "Kedvencekhez adás"}
          aria-pressed={wishlisted}
          onClick={() => toggleWish(p.id, p.name)}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-accent text-accent" : ""}`} />
        </button>
        {discount != null && (
          <span className="absolute bottom-2 left-2 rounded bg-neon px-1.5 py-0.5 font-mono text-[11px] font-semibold text-neon-foreground">
            −{discount}%
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col rounded-b-2xl p-3 sm:p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {p.brand}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug">
          {p.name}
        </h3>
        <p className="mt-2 text-xs text-muted-foreground">{stockText(p.stock)}</p>
        <div className="mt-2 flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 shrink-0 fill-neon text-neon" aria-hidden />
          {p.rating}
        </div>
        <div className="mt-auto flex min-w-0 flex-wrap items-end justify-between gap-2 border-t border-border/60 pt-3">
          <div className="min-w-0">
            {p.old != null && (
              <p className="text-xs text-muted-foreground line-through">{fmtHu(p.old)}</p>
            )}
            <p className="font-mono text-base font-bold text-primary">{fmtHu(p.price)}</p>
          </div>
        </div>
        <div className="mt-3 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-stretch">
          <Button
            asChild
            variant="outline"
            size="sm"
            className={`rounded-lg text-xs ${ctaButtonClass}`}
          >
            <Link
              to="/product/$productId"
              params={{ productId: productSlug(p) }}
            >
              <span className="min-w-0 truncate">Részletek</span>
            </Link>
          </Button>
          <Button
            type="button"
            size="sm"
            className={`rounded-lg text-xs ${ctaButtonClass}`}
            variant="default"
            onClick={() => addToCart(p)}
            disabled={p.stock === "nincs"}
          >
            <ShoppingBag className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="min-w-0 truncate">Kosárba</span>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductRail({
  id,
  title,
  subtitle,
  products,
}: {
  id: string;
  title: string;
  subtitle?: string;
  products: DemoProduct[];
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className={EDUNA_PRODUCT_GRID_CLASS}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} dense />
        ))}
      </div>
    </section>
  );
}
