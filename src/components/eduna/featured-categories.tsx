"use client";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FEATURED_CATEGORY_CARDS } from "./data";
import { RemoteImg } from "./remote-img";
import { useEdunaDemo } from "./home-context";

export function FeaturedCategories() {
  const { goCatalog } = useEdunaDemo();

  return (
    <section id="kiemelt" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Kiemelt kategóriák
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ugorj a szűrt katalógushoz — mint a főoldalon.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="self-start text-muted-foreground sm:self-auto"
          onClick={() => goCatalog("all", "Összes termék")}
        >
          Összes kategória <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {FEATURED_CATEGORY_CARDS.map((c) => (
          <button
            key={c.key}
            type="button"
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-interactive hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => goCatalog(c.filter, c.label)}
          >
            <div className="relative aspect-[4/3] bg-muted/30">
              <RemoteImg
                src={c.remote}
                fallback={c.fallback}
                alt=""
                className="h-full w-full object-contain p-3"
                width={200}
                height={150}
              />
            </div>
            <div className="p-3">
              <p className="font-semibold">{c.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.hint}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
