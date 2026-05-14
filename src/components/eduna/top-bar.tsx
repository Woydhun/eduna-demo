"use client";

import { Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden border-b border-border bg-surface/80 text-xs text-muted-foreground backdrop-blur-sm sm:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2 sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a
            href="tel:+36709072578"
            className="inline-flex items-center gap-1.5 rounded-sm transition-interactive hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>Garancia: +36 70 907 2578</span>
          </a>
          <span className="hidden text-border sm:inline" aria-hidden>
            |
          </span>
          <a
            href="tel:+36703251280"
            className="rounded-sm transition-interactive hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Ügyfélszolgálat: +36 70 325 1280
          </a>
        </div>
        <a
          href="mailto:info@eduna.hu"
          className="rounded-sm transition-interactive hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          info@eduna.hu
        </a>
      </div>
    </div>
  );
}
