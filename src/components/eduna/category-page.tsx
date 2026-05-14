"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronRight, ChevronLeft, SlidersHorizontal, X } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TopBar } from "./top-bar";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { EdunaModals } from "./eduna-modals";
import { EdunaDemoProvider, useEdunaDemo } from "./home-context";
import { ProductCard, EDUNA_PRODUCT_GRID_CLASS } from "./product-card";
import { findCategoryBySlug, getCategoryProducts } from "./data";
import type { DemoProduct } from "./types";

const ITEMS_PER_PAGE = 24;

const COLOR_SWATCHES: Record<string, string> = {
  fekete: "#000000",
  fehér: "#ffffff",
  kék: "#0000ff",
  lila: "#7272cc",
  ezüst: "#c0c0c0",
  zöld: "#008000",
  arany: "#ffd700",
  szürke: "#808080",
  rózsaszín: "#ffc0cb",
  narancssárga: "#ffa500",
};

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc" | "brand-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "price-asc", label: "Ár, alacsony > magas" },
  { value: "price-desc", label: "Ár, magas > alacsony" },
  { value: "name-asc", label: "Név, A-Z" },
  { value: "name-desc", label: "Név, Z-A" },
  { value: "brand-asc", label: "Gyártó, A-Z" },
];

export function CategoryPage() {
  return (
    <EdunaDemoProvider>
      <CategoryPageInner />
    </EdunaDemoProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Collapsible filter section                                        */
/* ------------------------------------------------------------------ */

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-3 pt-1">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Checkbox row                                                       */
/* ------------------------------------------------------------------ */

function CheckboxRow({
  label,
  count,
  checked,
  onChange,
  swatch,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
  swatch?: string;
}) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onChange}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange();
        }
      }}
      className="flex cursor-pointer items-center gap-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-surface hover:border-primary/50"
        }`}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      {swatch !== undefined && (
        <span
          className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-border"
          style={{ backgroundColor: swatch }}
        />
      )}
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span className="ml-auto shrink-0 text-xs text-muted-foreground/60">({count})</span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination                                                         */
/* ------------------------------------------------------------------ */

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav aria-label="Oldalak" className="flex items-center gap-1">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-accent"
            }`}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Helper: count occurrences of a field value                         */
/* ------------------------------------------------------------------ */

function countBy<T>(items: T[], fn: (item: T) => string | undefined): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of items) {
    const v = fn(item);
    if (v !== undefined) map.set(v, (map.get(v) ?? 0) + 1);
  }
  return map;
}

function toggleSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

/* ------------------------------------------------------------------ */
/*  Filter sidebar contents (shared between desktop & mobile)          */
/* ------------------------------------------------------------------ */

function FilterSidebar({
  allProducts,
  stockOnly,
  setStockOnly,
  selectedBrands,
  setSelectedBrands,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  onApplyPrice,
  selectedModels,
  setSelectedModels,
  selectedColors,
  setSelectedColors,
  selectedStorage,
  setSelectedStorage,
  selectedRam,
  setSelectedRam,
}: {
  allProducts: DemoProduct[];
  stockOnly: boolean;
  setStockOnly: (v: boolean) => void;
  selectedBrands: Set<string>;
  setSelectedBrands: (v: Set<string>) => void;
  priceMin: string;
  setPriceMin: (v: string) => void;
  priceMax: string;
  setPriceMax: (v: string) => void;
  onApplyPrice: () => void;
  selectedModels: Set<string>;
  setSelectedModels: (v: Set<string>) => void;
  selectedColors: Set<string>;
  setSelectedColors: (v: Set<string>) => void;
  selectedStorage: Set<string>;
  setSelectedStorage: (v: Set<string>) => void;
  selectedRam: Set<string>;
  setSelectedRam: (v: Set<string>) => void;
}) {
  const brandCounts = countBy(allProducts, (p) => p.brand);

  const brandFiltered =
    selectedBrands.size > 0
      ? allProducts.filter((p) => selectedBrands.has(p.brand))
      : allProducts;

  const modelCounts = countBy(brandFiltered, (p) => p.model);
  const colorCounts = countBy(brandFiltered, (p) => p.color);
  const storageCounts = countBy(brandFiltered, (p) => p.storage);
  const ramCounts = countBy(brandFiltered, (p) => p.ram);

  const prices = brandFiltered.map((p) => p.price);
  const globalMin = prices.length ? Math.min(...prices) : 0;
  const globalMax = prices.length ? Math.max(...prices) : 0;

  const STORAGE_ORDER = ["128GB", "256GB", "512GB", "1TB"];
  const RAM_ORDER = ["4 GB", "6 GB", "8 GB", "12 GB", "16 GB"];

  return (
    <div className="space-y-1">
      {/* Apply price filter button */}
      <Button
        size="sm"
        className="w-full rounded-lg bg-primary text-xs font-semibold text-background hover:bg-primary/90 dark:text-background"
        onClick={onApplyPrice}
      >
        Szűrés
      </Button>

      <Separator />

      {/* Stock filter */}
      <div className="pb-2">
        <div
          role="checkbox"
          aria-checked={stockOnly}
          tabIndex={0}
          onClick={() => setStockOnly(!stockOnly)}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              setStockOnly(!stockOnly);
            }
          }}
          className="flex cursor-pointer items-center gap-2 py-1 text-sm font-medium text-foreground"
        >
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
              stockOnly
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface hover:border-primary/50"
            }`}
          >
            {stockOnly && <Check className="h-3 w-3" strokeWidth={3} />}
          </span>
          Csak raktáron lévő termékek
        </div>
      </div>

      <Separator />

      {/* Brand */}
      <FilterSection title="Gyártó">
        <div className="max-h-52 space-y-0.5 overflow-y-auto">
          {[...brandCounts.entries()]
            .sort(([a], [b]) => a.localeCompare(b, "hu"))
            .map(([brand, count]) => (
              <CheckboxRow
                key={brand}
                label={brand}
                count={count}
                checked={selectedBrands.has(brand)}
                onChange={() => setSelectedBrands(toggleSet(selectedBrands, brand))}
              />
            ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Price range */}
      <FilterSection title="Ár">
        <p className="mb-2 text-xs text-muted-foreground">
          {globalMin.toLocaleString("hu-HU")} Ft – {globalMax.toLocaleString("hu-HU")} Ft
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9]/g, "");
              setPriceMin(v);
            }}
            className="w-0 min-w-0 flex-1 rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-foreground outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/25"
          />
          <span className="shrink-0 text-xs text-muted-foreground">–</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9]/g, "");
              setPriceMax(v);
            }}
            className="w-0 min-w-0 flex-1 rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-foreground outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/25"
          />
        </div>
      </FilterSection>

      <Separator />

      {/* Model */}
      {modelCounts.size > 0 && (
        <>
          <FilterSection title="Modell">
            <div className="max-h-52 space-y-0.5 overflow-y-auto">
              {[...modelCounts.entries()]
                .sort(([a], [b]) => a.localeCompare(b, "hu"))
                .map(([model, count]) => (
                  <CheckboxRow
                    key={model}
                    label={model}
                    count={count}
                    checked={selectedModels.has(model)}
                    onChange={() => setSelectedModels(toggleSet(selectedModels, model))}
                  />
                ))}
            </div>
          </FilterSection>
          <Separator />
        </>
      )}

      {/* Color */}
      {colorCounts.size > 0 && (
        <>
          <FilterSection title="Szín">
            <div className="space-y-0.5">
              {[...colorCounts.entries()]
                .sort(([a], [b]) => a.localeCompare(b, "hu"))
                .map(([color, count]) => (
                  <CheckboxRow
                    key={color}
                    label={color}
                    count={count}
                    checked={selectedColors.has(color)}
                    onChange={() => setSelectedColors(toggleSet(selectedColors, color))}
                    swatch={COLOR_SWATCHES[color]}
                  />
                ))}
            </div>
          </FilterSection>
          <Separator />
        </>
      )}

      {/* Storage */}
      {storageCounts.size > 0 && (
        <>
          <FilterSection title="Tárhely">
            <div className="space-y-0.5">
              {STORAGE_ORDER.filter((s) => storageCounts.has(s)).map((s) => (
                <CheckboxRow
                  key={s}
                  label={s}
                  count={storageCounts.get(s)}
                  checked={selectedStorage.has(s)}
                  onChange={() => setSelectedStorage(toggleSet(selectedStorage, s))}
                />
              ))}
            </div>
          </FilterSection>
          <Separator />
        </>
      )}

      {/* RAM */}
      {ramCounts.size > 0 && (
        <FilterSection title="RAM">
          <div className="space-y-0.5">
            {RAM_ORDER.filter((r) => ramCounts.has(r)).map((r) => (
              <CheckboxRow
                key={r}
                label={r}
                count={ramCounts.get(r)}
                checked={selectedRam.has(r)}
                onChange={() => setSelectedRam(toggleSet(selectedRam, r))}
              />
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main inner component                                               */
/* ------------------------------------------------------------------ */

function CategoryPageInner() {
  const { categorySlug } = useParams({ from: "/category/$categorySlug" });
  const match = findCategoryBySlug(categorySlug);
  const { fmtHu } = useEdunaDemo();

  /* Sort & page */
  const [sort, setSort] = React.useState<SortOption>("price-asc");
  const [page, setPage] = React.useState(1);

  /* Filter state */
  const [stockOnly, setStockOnly] = React.useState(false);
  const [selectedBrands, setSelectedBrandsRaw] = React.useState<Set<string>>(new Set());
  const [priceMin, setPriceMin] = React.useState("");
  const [priceMax, setPriceMax] = React.useState("");
  const [appliedPriceMin, setAppliedPriceMin] = React.useState<number | null>(null);
  const [appliedPriceMax, setAppliedPriceMax] = React.useState<number | null>(null);
  const [selectedModels, setSelectedModels] = React.useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = React.useState<Set<string>>(new Set());
  const [selectedStorage, setSelectedStorage] = React.useState<Set<string>>(new Set());
  const [selectedRam, setSelectedRam] = React.useState<Set<string>>(new Set());

  const setSelectedBrands = React.useCallback((brands: Set<string>) => {
    setSelectedBrandsRaw((prev) => {
      const changed = prev.size !== brands.size || [...prev].some((b) => !brands.has(b));
      if (changed) {
        setSelectedModels(new Set());
        setSelectedColors(new Set());
        setSelectedStorage(new Set());
        setSelectedRam(new Set());
      }
      return brands;
    });
  }, []);

  /* Mobile filter panel */
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  /* Reset filters on slug change */
  React.useEffect(() => {
    setStockOnly(false);
    setSelectedBrandsRaw(new Set());
    setPriceMin("");
    setPriceMax("");
    setAppliedPriceMin(null);
    setAppliedPriceMax(null);
    setSelectedModels(new Set());
    setSelectedColors(new Set());
    setSelectedStorage(new Set());
    setSelectedRam(new Set());
    setPage(1);
    setSort("price-asc");
  }, [categorySlug]);

  function handleApplyPrice() {
    setAppliedPriceMin(priceMin ? Number(priceMin) : null);
    setAppliedPriceMax(priceMax ? Number(priceMax) : null);
    setPage(1);
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <TopBar />
        <SiteHeader />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-4xl font-bold">Kategória nem található</h1>
          <p className="mt-3 text-muted-foreground">A keresett kategória nem létezik.</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Vissza a főoldalra
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const { group, item } = match;
  const allProducts = getCategoryProducts(categorySlug);

  /* ---- Filtering ---- */
  const filtered = React.useMemo(() => {
    let list = allProducts;

    if (stockOnly) {
      list = list.filter((p) => p.stock === "raktaron");
    }
    if (selectedBrands.size > 0) {
      list = list.filter((p) => selectedBrands.has(p.brand));
    }
    if (appliedPriceMin != null) {
      list = list.filter((p) => p.price >= appliedPriceMin);
    }
    if (appliedPriceMax != null) {
      list = list.filter((p) => p.price <= appliedPriceMax);
    }
    if (selectedModels.size > 0) {
      list = list.filter((p) => p.model && selectedModels.has(p.model));
    }
    if (selectedColors.size > 0) {
      list = list.filter((p) => p.color && selectedColors.has(p.color));
    }
    if (selectedStorage.size > 0) {
      list = list.filter((p) => p.storage && selectedStorage.has(p.storage));
    }
    if (selectedRam.size > 0) {
      list = list.filter((p) => p.ram && selectedRam.has(p.ram));
    }

    return list;
  }, [
    allProducts,
    stockOnly,
    selectedBrands,
    appliedPriceMin,
    appliedPriceMax,
    selectedModels,
    selectedColors,
    selectedStorage,
    selectedRam,
  ]);

  /* ---- Sorting ---- */
  const sorted = React.useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name, "hu"));
      case "name-desc":
        return list.sort((a, b) => b.name.localeCompare(a.name, "hu"));
      case "brand-asc":
        return list.sort(
          (a, b) => a.brand.localeCompare(b.brand, "hu") || a.name.localeCompare(b.name, "hu"),
        );
      default:
        return list;
    }
  }, [filtered, sort]);

  /* ---- Pagination ---- */
  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * ITEMS_PER_PAGE;
  const pageEnd = Math.min(pageStart + ITEMS_PER_PAGE, sorted.length);
  const pageProducts = sorted.slice(pageStart, pageEnd);

  function handlePageChange(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* Reset page when filters change */
  React.useEffect(() => {
    setPage(1);
  }, [
    stockOnly,
    selectedBrands,
    appliedPriceMin,
    appliedPriceMax,
    selectedModels,
    selectedColors,
    selectedStorage,
    selectedRam,
  ]);

  const siblingItems = group.items.filter((it) => it.slug !== categorySlug);

  const filterSidebarProps = {
    allProducts,
    stockOnly,
    setStockOnly,
    selectedBrands,
    setSelectedBrands,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    onApplyPrice: handleApplyPrice,
    selectedModels,
    setSelectedModels,
    selectedColors,
    setSelectedColors,
    selectedStorage,
    setSelectedStorage,
    selectedRam,
    setSelectedRam,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Navigáció" className="mb-4 sm:mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-xs sm:gap-1.5 sm:text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <Link to="/" className="transition-colors hover:text-foreground">
                Főoldal
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Link
                to="/category/$categorySlug"
                params={{ categorySlug: group.slug }}
                className="transition-colors hover:text-foreground"
              >
                {group.label}
              </Link>
            </li>
            {item.slug !== group.slug && (
              <>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <span className="font-normal text-foreground">{item.label}</span>
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="flex gap-4 lg:gap-8">
          {/* ============ Desktop Sidebar ============ */}
          <aside className="hidden lg:block" style={{ width: 240, minWidth: 240, maxWidth: 240 }}>
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden rounded-xl border border-border bg-surface/40">
              <div className="max-h-[calc(100vh-7rem)] space-y-1 overflow-y-auto p-4">
                <FilterSidebar {...filterSidebarProps} />
              </div>
            </div>
          </aside>

          {/* ============ Main content ============ */}
          <div className="min-w-0 flex-1">
            {/* Category header */}
            <div className="mb-4">
              <h1 className="font-display text-2xl font-bold lowercase tracking-tight first-letter:uppercase sm:text-3xl">
                {item.label}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tájékoztató: Kínálatunkban megtalálod a legújabb okostelefonokat a vezető gyártóktól
                — Apple, Samsung, Xiaomi, Honor, Motorola, Google és más márkáktól. Minden termék
                gyári garanciával, hivatalos magyar forgalmazásból. Szállítás 1-3 munkanap.
              </p>
            </div>

            {/* Toolbar: count + sort + mobile filter button */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5">
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-lg lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Szűrés
                </Button>
                <span className="text-sm text-muted-foreground">
                  {sorted.length > 0 ? (
                    <>
                      {pageStart + 1} – {pageEnd} / {sorted.length} termék
                    </>
                  ) : (
                    "0 termék"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="hidden h-4 w-4 text-muted-foreground sm:block" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="max-w-[10rem] truncate rounded-md border border-border bg-transparent px-2 py-1 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/25 sm:max-w-none sm:text-sm"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product grid */}
            {pageProducts.length > 0 ? (
              <div className={EDUNA_PRODUCT_GRID_CLASS}>
                {pageProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium">Nincs megjeleníthető termék</p>
                <p className="mt-1 text-sm text-muted-foreground">Próbáld módosítani a szűrőket!</p>
              </div>
            )}

            {/* Bottom pagination */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <span className="text-sm text-muted-foreground">
                {sorted.length > 0 && (
                  <>
                    {pageStart + 1} – {pageEnd} / {sorted.length} termék
                  </>
                )}
              </span>
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>

            {/* Related subcategories */}
            {siblingItems.length > 0 && (
              <section className="mt-12 rounded-xl border border-border bg-surface/40 p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Kapcsolódó alkategóriák
                </h2>
                <div className="flex flex-wrap gap-2">
                  {siblingItems.map((it) => (
                    <Button
                      key={it.slug}
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-lg"
                    >
                      <Link to="/category/$categorySlug" params={{ categorySlug: it.slug }}>
                        {it.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* ============ Mobile filter slide-over ============ */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          {/* Panel */}
          <div className="absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-lg font-semibold">Szűrés</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-md transition-colors hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <FilterSidebar {...filterSidebarProps} />
            </div>
            <div className="border-t border-border px-4 py-3">
              <Button className="w-full rounded-lg" onClick={() => setMobileFiltersOpen(false)}>
                Találatok megtekintése ({sorted.length})
              </Button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <EdunaModals />
    </div>
  );
}
