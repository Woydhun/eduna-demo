"use client";

import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

const NEWS = [
  {
    title: "Vissza a pillanathoz: 3 retro fényképezőgép, amivel újra élmény lesz fotózni",
    date: "2026. 05. 11.",
    excerpt:
      "Van valami különleges abban, amikor egy kép nem csak egy fájl a telefonod galériájában — a lassabb, figyelmesebb fotózás élménye.",
  },
  {
    title: "Motorola Razr 60 Swarovski Edition: Ahol a technológia és a luxus találkozik",
    date: "2026. 05. 04.",
    excerpt: "A formatervezés új korszaka – Swarovski® kristályokkal.",
  },
];

export function NewsSection() {
  return (
    <section id="hirek" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Hírek</h2>
        <Button
          type="button"
          variant="link"
          className="text-primary"
          onClick={() => window.open("https://www.eduna.hu/", "_blank", "noopener,noreferrer")}
        >
          További hírek <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {NEWS.map((n) => (
          <article
            key={n.title}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-interactive hover:border-primary/30 focus-within:border-primary/35 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
          >
            <p className="text-xs text-muted-foreground">{n.date}</p>
            <h3 className="mt-2 font-semibold leading-snug">{n.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{n.excerpt}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4 rounded-lg"
              onClick={() => window.open("https://www.eduna.hu/", "_blank")}
            >
              Részletek
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
