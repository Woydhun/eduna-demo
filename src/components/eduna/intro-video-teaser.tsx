"use client";

import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function IntroVideoTeaser() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      aria-labelledby="video-heading"
    >
      <h2 id="video-heading" className="font-display text-xl font-bold sm:text-2xl">
        Bemutatkozó videó
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        A webshop tartalmát az eduna.hu szolgáltatja — itt csak a demo keret.
      </p>
      <div className="mt-4 flex max-w-xl flex-col gap-3 rounded-2xl border border-border bg-muted/30 p-6 sm:flex-row sm:items-center">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Play className="h-6 w-6" aria-hidden />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">Ismerd meg az eDunát</p>
          <p className="text-xs text-muted-foreground">
            A valódi beágyazott videó a főoldalon található.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="shrink-0 rounded-xl"
          onClick={() =>
            toast.message("Videó (demo)", {
              description: "Ide kerülne a beágyazott lejátszó vagy link.",
            })
          }
        >
          Lejátszás
        </Button>
      </div>
    </section>
  );
}
