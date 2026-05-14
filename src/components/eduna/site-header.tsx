"use client";

import * as React from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { EDUNA_IMAGES } from "./images";
import { NAV_GROUPS } from "./data";
import { RemoteImg } from "./remote-img";
import { useEdunaDemo } from "./home-context";

import imgPhone from "@/assets/products/phone.jpg";

export function SiteHeader() {
  const {
    searchRef,
    search,
    setSearch,
    onSearchSubmit,
    setMobileOpen,
    cartCount,
    setCartOpen,
    setWishOpen,
    setAccountOpen,
    wishProducts,
  } = useEdunaDemo();

  const [navValue, setNavValue] = React.useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const location = useRouterState({ select: (s) => s.location.pathname });

  React.useEffect(() => {
    setNavValue("");
  }, [location]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-brand-strip dark:glass">
      <div className="mx-auto flex max-w-7xl flex-col overflow-visible px-3 sm:px-6 lg:px-8">
        <div className="flex min-h-14 items-center gap-2 py-2 sm:min-h-16 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Menü megnyitása"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RemoteImg
              src={EDUNA_IMAGES.logo}
              fallback={imgPhone}
              alt="eDuna"
              className="h-8 w-auto max-w-[120px] object-contain sm:h-9"
              width={120}
              height={36}
            />
          </Link>

          <div className="min-w-0 flex-1" aria-hidden />

          <form
            className="hidden w-full max-w-[min(100%,14rem)] shrink-0 md:block lg:max-w-[11rem] xl:max-w-sm 2xl:max-w-md"
            onSubmit={onSearchSubmit}
            role="search"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="q"
                placeholder="Keresés a webáruházban…"
                className="h-10 w-full rounded-xl border border-border bg-surface/90 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-interactive focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/25"
                aria-label="Keresés"
              />
            </div>
          </form>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Keresés"
            onClick={() => setMobileSearchOpen((v) => !v)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <ThemeToggle />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Kedvencek (${wishProducts.length})`}
              onClick={() => setWishOpen(true)}
            >
              <Heart
                className={`h-5 w-5 ${wishProducts.length ? "fill-accent text-accent" : ""}`}
              />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Belépés"
              onClick={() => setAccountOpen(true)}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setAccountOpen(true)}
            >
              Belépés
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Kosár (${cartCount})`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {mobileSearchOpen && (
          <form
            className="border-t border-border/60 py-2 md:hidden"
            onSubmit={(e) => {
              onSearchSubmit(e);
              setMobileSearchOpen(false);
            }}
            role="search"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="q"
                placeholder="Keresés a webáruházban…"
                className="h-10 w-full rounded-xl border border-border bg-surface/90 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-interactive focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/25"
                aria-label="Keresés"
                autoFocus
              />
            </div>
          </form>
        )}

        <nav
          className="hidden w-full min-w-0 border-t border-border/60 py-1.5 lg:block lg:overflow-visible"
          aria-label="Fő kategóriák"
        >
          <NavigationMenu
            value={navValue}
            onValueChange={setNavValue}
            delayDuration={0}
            skipDelayDuration={300}
            className="relative z-50 flex w-full min-w-0 max-w-full items-center justify-start"
          >
            <NavigationMenuList className="flex w-full flex-nowrap items-center justify-start space-x-0 gap-x-1 sm:gap-x-1.5">
              {NAV_GROUPS.map((g) => (
                <NavigationMenuItem key={g.label} value={g.label} className="shrink-0 basis-auto">
                  <NavigationMenuTrigger
                    className={cn(
                      "h-9 shrink-0 whitespace-nowrap rounded-lg border-0 bg-transparent px-2 py-0 text-xs font-normal text-muted-foreground shadow-none sm:px-3 sm:text-sm",
                      "hover:bg-accent/20 hover:text-black",
                      "focus:bg-accent/20 focus-visible:bg-accent/20 focus:text-black",
                      "data-[state=open]:bg-accent/25 data-[state=open]:text-black",
                      "[&>svg:last-child]:hidden",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      "transition-colors",
                    )}
                  >
                    {g.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="min-w-[12rem] p-1">
                      <p className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
                        {g.label}
                      </p>
                      <ul className="space-y-0.5">
                        {g.items.map((it) => (
                          <li key={it.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/category/$categorySlug"
                                params={{ categorySlug: it.slug }}
                                className="block w-full cursor-pointer rounded-sm px-2 py-1.5 text-left text-sm font-normal text-foreground outline-none transition-colors hover:bg-accent/70 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                onClick={() => setNavValue("")}
                              >
                                {it.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
  );
}
