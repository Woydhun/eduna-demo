"use client";

import * as React from "react";
import { toast } from "sonner";

import { ALL_DEMO_PRODUCTS, FILTER_TABS } from "./data";
import type { CartLine, DemoProduct, ProductFilter } from "./types";

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "smooth" });
}

export function fmtHu(n: number) {
  return new Intl.NumberFormat("hu-HU").format(n) + " Ft";
}

function stockText(s: DemoProduct["stock"]): string {
  if (s === "raktaron") return "Raktáron";
  if (s === "utolso") return "Utolsó darabok";
  return "Nincs készleten";
}

type EdunaCtx = {
  searchRef: React.RefObject<HTMLInputElement | null>;
  search: string;
  setSearch: (s: string) => void;
  filter: ProductFilter;
  setFilter: (f: ProductFilter) => void;
  filteredProducts: DemoProduct[];
  cart: CartLine[];
  wishlist: Set<string>;
  wishProducts: DemoProduct[];
  cartCount: number;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishOpen: boolean;
  setWishOpen: (v: boolean) => void;
  accountOpen: boolean;
  setAccountOpen: (v: boolean) => void;
  addToCart: (p: DemoProduct) => void;
  removeLine: (id: string) => void;
  decLine: (id: string) => void;
  toggleWish: (id: string, name: string) => void;
  goCatalog: (next: ProductFilter, label?: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onNewsletter: (e: React.FormEvent<HTMLFormElement>) => void;
  navTo: (id: string) => void;
  stockText: typeof stockText;
  fmtHu: typeof fmtHu;
  FILTER_TABS: typeof FILTER_TABS;
};

const EdunaContext = React.createContext<EdunaCtx | null>(null);

export function EdunaDemoProvider({ children }: { children: React.ReactNode }) {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [wishOpen, setWishOpen] = React.useState(false);
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<ProductFilter>("all");
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [wishlist, setWishlist] = React.useState<Set<string>>(() => new Set());

  const cartCount = React.useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);

  const filteredProducts = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_DEMO_PRODUCTS.filter((p) => {
      const byFilter = filter === "all" || p.filters.includes(filter) || p.filters.includes("all");
      if (!byFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    });
  }, [filter, search]);

  const wishProducts = React.useMemo(
    () => ALL_DEMO_PRODUCTS.filter((p) => wishlist.has(p.id)),
    [wishlist],
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const addToCart = React.useCallback((p: DemoProduct) => {
    if (p.stock === "nincs") {
      toast.error("Nincs készleten", { description: p.name });
      return;
    }
    setCart((prev) => {
      const i = prev.findIndex((l) => l.product.id === p.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { product: p, qty: 1 }];
    });
    toast.success("Kosárba téve", { description: p.name });
    setCartOpen(true);
  }, []);

  const removeLine = React.useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.product.id !== id));
    toast.message("Eltávolítva a kosárból");
  }, []);

  const decLine = React.useCallback((id: string) => {
    setCart((prev) =>
      prev
        .map((l) => (l.product.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const toggleWish = React.useCallback((id: string, name: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.message("Eltávolítva a kedvencekből", { description: name });
      } else {
        next.add(id);
        toast.success("Kedvencekhez adva", { description: name });
      }
      return next;
    });
  }, []);

  const goCatalog = React.useCallback((next: ProductFilter, label?: string) => {
    setFilter(next);
    scrollToSection("katalogus");
    if (label) toast.message(label, { description: "Szűrés a lenti katalógusban." });
  }, []);

  const onSearchSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = search.trim();
      if (!q) {
        toast.message("Írj be keresőkifejezést", { description: "Például: Apple, töltő, Dyson" });
        return;
      }
      scrollToSection("katalogus");
      toast.success("Keresés alkalmazva", { description: `„${q}”` });
    },
    [search],
  );

  const onNewsletter = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const consent = fd.get("consent") === "on";
    if (!email || !email.includes("@")) {
      toast.error("Hiányzó vagy hibás e-mail");
      return;
    }
    if (!consent) {
      toast.error("Kérjük, pipáld be az adatkezelési jelölőnégyzetet", {
        description: "Ahogy az eredeti oldalon is szükséges.",
      });
      return;
    }
    toast.success("Feliratkozás (demo)", {
      description: "Ez a bemutató nem tárol adatot és nem küld levelet.",
    });
    e.currentTarget.reset();
  }, []);

  const navTo = React.useCallback((id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  }, []);

  const value = React.useMemo<EdunaCtx>(
    () => ({
      searchRef,
      search,
      setSearch,
      filter,
      setFilter,
      filteredProducts,
      cart,
      wishlist,
      wishProducts,
      cartCount,
      mobileOpen,
      setMobileOpen,
      cartOpen,
      setCartOpen,
      wishOpen,
      setWishOpen,
      accountOpen,
      setAccountOpen,
      addToCart,
      removeLine,
      decLine,
      toggleWish,
      goCatalog,
      onSearchSubmit,
      onNewsletter,
      navTo,
      stockText,
      fmtHu,
      FILTER_TABS,
    }),
    [
      search,
      filter,
      filteredProducts,
      cart,
      wishlist,
      wishProducts,
      cartCount,
      mobileOpen,
      cartOpen,
      wishOpen,
      accountOpen,
      addToCart,
      removeLine,
      decLine,
      toggleWish,
      goCatalog,
      onSearchSubmit,
      onNewsletter,
      navTo,
    ],
  );

  return <EdunaContext.Provider value={value}>{children}</EdunaContext.Provider>;
}

export function useEdunaDemo() {
  const ctx = React.useContext(EdunaContext);
  if (!ctx) throw new Error("useEdunaDemo must be used within EdunaDemoProvider");
  return ctx;
}
