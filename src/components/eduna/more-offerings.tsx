"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { MORE_OFFERINGS } from "./data";

export function MoreOfferings() {
  return (
    <section id="tovabbi" className="border-y border-border bg-muted/20 py-10 dark:bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-bold sm:text-2xl">További kínálatunk</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {MORE_OFFERINGS.map((o) => (
            <Button
              key={o.label}
              type="button"
              variant="secondary"
              size="sm"
              className="rounded-full"
              onClick={() =>
                toast.message(o.label, { description: "Demo — kategória oldal a webshopban." })
              }
            >
              {o.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
