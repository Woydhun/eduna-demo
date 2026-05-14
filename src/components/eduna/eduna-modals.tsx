"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NAV_GROUPS } from "./data";
import { useEdunaDemo } from "./home-context";

export function EdunaModals() {
  const {
    mobileOpen,
    setMobileOpen,
    cartOpen,
    setCartOpen,
    wishOpen,
    setWishOpen,
    accountOpen,
    setAccountOpen,
    cart,
    cartCount,
    addToCart,
    decLine,
    removeLine,
    wishProducts,
    toggleWish,
    navTo,
    fmtHu,
  } = useEdunaDemo();

  return (
    <>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="liquid-panel w-[min(100%,20rem)] border-border/60 sm:max-w-sm"
        >
          <SheetHeader>
            <SheetTitle className="text-left font-display">Menü</SheetTitle>
            <SheetDescription className="text-left">Szekciók és gyors linkek.</SheetDescription>
          </SheetHeader>
          <nav
            className="mt-4 flex flex-col gap-1 border-b border-border pb-4"
            aria-label="Mobil menü"
          >
            <button
              type="button"
              className="rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-interactive hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => navTo("uj-erkezes")}
            >
              Új érkezés
            </button>
            <button
              type="button"
              className="rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-interactive hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => navTo("top-termekek")}
            >
              Top termékek
            </button>
            <button
              type="button"
              className="rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-interactive hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => navTo("katalogus")}
            >
              Katalógus
            </button>
            <button
              type="button"
              className="rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-interactive hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => navTo("hirlevel-footer")}
            >
              Hírlevél
            </button>
          </nav>
          <div className="mt-4">
            <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Kategóriák
            </p>
            <Accordion type="multiple" className="mt-2 w-full">
              {NAV_GROUPS.map((g) => (
                <AccordionItem key={g.label} value={g.label} className="border-border">
                  <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
                    {g.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-0">
                    <ul className="space-y-0.5 pl-1">
                      {g.items.map((it) => (
                        <li key={it.label}>
                          <button
                            type="button"
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-foreground/90 transition-interactive hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            onClick={() => {
                              if (it.anchor) {
                                const id = it.anchor.replace(/^#/, "");
                                document
                                  .getElementById(id)
                                  ?.scrollIntoView({ block: "start", behavior: "smooth" });
                              }
                              setMobileOpen(false);
                              toast.message(it.label);
                            }}
                          >
                            {it.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="liquid-panel flex flex-col border-border/60 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-left font-display">Kosár</SheetTitle>
            <SheetDescription className="text-left">
              {cartCount ? `${cartCount} tétel (demo)` : "A kosarad üres."}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {cart.map((line) => (
              <div
                key={line.product.id}
                className="flex gap-3 rounded-xl border border-border bg-card p-3"
              >
                <img
                  src={line.product.fallbackSrc}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  width={64}
                  height={64}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{line.product.name}</p>
                  <p className="font-mono text-sm text-primary">{fmtHu(line.product.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 px-2"
                      onClick={() => decLine(line.product.id)}
                    >
                      −
                    </Button>
                    <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 px-2"
                      onClick={() => addToCart(line.product)}
                    >
                      +
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="ml-auto h-8 w-8"
                      aria-label="Törlés"
                      onClick={() => removeLine(line.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="flex justify-between text-sm">
                <span className="text-muted-foreground">Részösszeg (demo)</span>
                <span className="font-mono font-semibold">
                  {fmtHu(cart.reduce((s, l) => s + l.product.price * l.qty, 0))}
                </span>
              </p>
              <Button
                type="button"
                className="mt-3 w-full rounded-xl"
                onClick={() =>
                  toast.message("Fizetés (demo)", { description: "Ide jön a valódi checkout." })
                }
              >
                Tovább a fizetéshez
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={wishOpen} onOpenChange={setWishOpen}>
        <SheetContent className="liquid-panel sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-left font-display">Kedvencek</SheetTitle>
            <SheetDescription className="text-left">
              A szív ikonnal mentett termékek.
            </SheetDescription>
          </SheetHeader>
          <ul className="mt-4 space-y-2">
            {wishProducts.length === 0 ? (
              <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Még nincs mentett termék.
              </li>
            ) : (
              wishProducts.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2"
                >
                  <span className="truncate text-sm">{p.name}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleWish(p.id, p.name)}
                  >
                    Eltávolítás
                  </Button>
                </li>
              ))
            )}
          </ul>
        </SheetContent>
      </Sheet>

      <Dialog open={accountOpen} onOpenChange={setAccountOpen}>
        <DialogContent className="liquid-panel border-border/60 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Belépés</DialogTitle>
            <DialogDescription>
              Demo felület — a valódi belépés az eduna.hu-n történik. Itt csak a gombok működését
              mutatjuk.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              className="flex-1 rounded-xl"
              onClick={() => toast.message("Belépés (demo)")}
            >
              Folytatás
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => setAccountOpen(false)}
            >
              Bezárás
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
