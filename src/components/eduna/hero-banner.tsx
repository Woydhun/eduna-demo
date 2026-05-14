"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EDUNA_IMAGES } from "./images";
import { RemoteImg } from "./remote-img";
import { scrollToSection } from "./home-context";

import heroDevice from "@/assets/hero-device.jpg";

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden border-b border-border bg-hero"
      aria-label="Kiemelt ajánlat"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.22]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:px-6 lg:gap-12 lg:px-8 lg:py-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            eDuna.hu — UI demo
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            A technikai termékek webáruháza —{" "}
            <span className="text-gradient">gyorsabb keresés, átláthatóbb kosár</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground md:text-base">
            Ez a felület a főoldal szerkezetét követi (új érkezés, top termékek, kategóriák,
            hírlevél), világos és sötét móddal. Nem helyettesíti a valódi webshopot.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="default"
              className="rounded-xl"
              onClick={() => scrollToSection("uj-erkezes")}
            >
              Új érkezés <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => scrollToSection("katalogus")}
            >
              Teljes katalógus (demo)
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-elevated">
          <RemoteImg
            src={EDUNA_IMAGES.bannerS26}
            fallback={heroDevice}
            alt="Kiemelt kampány"
            className="aspect-[4/3] w-full object-cover md:aspect-video"
            width={960}
            height={540}
          />
        </div>
      </div>
    </section>
  );
}
