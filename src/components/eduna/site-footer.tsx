"use client";

import { ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { EDUNA_IMAGES } from "./images";
import { RemoteImg } from "./remote-img";
import { useEdunaDemo } from "./home-context";

import imgPhone from "@/assets/products/phone.jpg";

const FOOTER_LINKS = [
  { label: "ÁSZF", href: "https://www.eduna.hu/" },
  { label: "Adatkezelés", href: "https://www.eduna.hu/" },
  { label: "Szállítás és fizetés", href: "https://www.eduna.hu/" },
  { label: "Kapcsolat", href: "https://www.eduna.hu/" },
];

export function SiteFooter() {
  const { onNewsletter } = useEdunaDemo();

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <RemoteImg
              src={EDUNA_IMAGES.logo}
              fallback={imgPhone}
              alt="eDuna"
              className="h-10 w-auto max-w-[140px]"
              width={140}
              height={42}
            />
          </Link>
          <p className="mt-4 text-sm font-semibold text-foreground">
            A technikai termékek kis- és nagykereskedelme.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            6500 Baja, Péter Pál utca 1.
            <br />
            <a href="mailto:info@eduna.hu" className="text-primary hover:underline">
              info@eduna.hu
            </a>
            <br />
            <a href="tel:+36703251280" className="text-primary hover:underline">
              +36 70 325 1280
            </a>
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Ez az oldal <strong className="text-foreground">UI demo</strong>. A vásárlás a{" "}
            <a
              href="https://www.eduna.hu/"
              className="text-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              eduna.hu
            </a>{" "}
            webshopon történik.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:col-span-5 lg:mt-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Gyorslinkek
            </p>
            <ul className="mt-3 space-y-2">
              {["Főoldal", "Új termékek", "Akciók"].map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    className="rounded-md text-left text-sm text-foreground/90 transition-interactive hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    onClick={() =>
                      document.getElementById("uj-erkezes")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Jogi
            </p>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm hover:text-primary"
                  >
                    {l.label}
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div id="hirlevel-footer" className="mt-10 lg:col-span-3 lg:mt-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Hírlevél
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Értesülj újdonságokról és akciókról (demo — nincs adattárolás).
          </p>
          <form className="mt-4 space-y-3" onSubmit={onNewsletter}>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="e-mail címed"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm transition-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              required
            />
            <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                name="consent"
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
              <span>
                Hozzájárulok, hogy az eDuna a nevemet és e-mail címemet hírlevelezési céllal
                kezelje, és gazdasági reklámot is tartalmazó e-maileket küldjön (mint az eredeti
                űrlapon).
              </span>
            </label>
            <Button type="submit" className="w-full rounded-lg">
              Feliratkozás
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} eDuna — UI demo. A márka és a tartalom az eduna.hu kínálatára
        utal.
      </div>
    </footer>
  );
}
