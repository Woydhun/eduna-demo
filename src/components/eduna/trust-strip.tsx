"use client";

import { Package, Scale, Truck } from "lucide-react";

export function TrustStrip() {
  return (
    <section
      className="border-b border-border bg-primary/5 py-6 dark:bg-primary/10"
      aria-label="Előnyök"
    >
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div className="flex gap-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Gyors kiszállítás</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Az ország egész területén — átlátható szállítási információk.
            </p>
          </div>
        </div>
        <div className="flex gap-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Garantált vásárlói adat- és jogvédelem</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Itt vásárolhatsz biztonságosan — a demo csak a felületet mutatja.
            </p>
          </div>
        </div>
        <div className="flex gap-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Nincsenek rejtett költségek</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Egyszerű, olvasható kosár- és fizetési lépések.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
