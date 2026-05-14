"use client";

import { Button } from "@/components/ui/button";
import { useEdunaDemo } from "./home-context";
import { EDUNA_PRODUCT_GRID_CLASS, ProductCard } from "./product-card";

export function CatalogSection() {
  const { filteredProducts, filter, setFilter, search, setSearch, onSearchSubmit, FILTER_TABS } =
    useEdunaDemo();

  return (
    <section
      id="katalogus"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby="kat-heading"
    >
      <h2 id="kat-heading" className="font-display text-2xl font-bold sm:text-3xl">
        Katalógus (demo szűrő)
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Keresés + kategória szűrő — a terméklista a demo adatokból épül.
      </p>
      <form className="mt-4 md:hidden" onSubmit={onSearchSubmit}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Keresés…"
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm transition-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Keresés"
        />
      </form>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Szűrők">
        {FILTER_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={filter === t.id}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              filter === t.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/40"
            }`}
            onClick={() => setFilter(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {filteredProducts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="font-medium">Nincs találat</p>
          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
          >
            Szűrők törlése
          </Button>
        </div>
      ) : (
        <div className={`mt-8 ${EDUNA_PRODUCT_GRID_CLASS}`}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
