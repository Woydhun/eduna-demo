"use client";

import * as React from "react";
import {
  ChevronRight,
  Heart,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RemoteImg } from "./remote-img";
import { TopBar } from "./top-bar";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { EdunaModals } from "./eduna-modals";
import { EdunaDemoProvider, useEdunaDemo } from "./home-context";
import { ALL_DEMO_PRODUCTS } from "./data";
import { findProductBySlug, productSlug } from "./product-utils";

const DEMO_SPECS: Record<string, Record<string, string>> = {
  tapo: {
    Márka: "TP-Link",
    Modell: "Tapo C520WS",
    Felbontás: "2K QHD 4MP (2560 × 1440 px)",
    Védelem: "IP66",
    "Wi-Fi": "802.11b/g/n, 2.4 GHz",
    "Éjjellátó funkció": "850 nm IR LED, Starlight Color Night Vision",
    "Memória bővíthető": "Igen (MicroSD max 512 GB)",
    Szín: "Fehér",
    "Gyártó cikkszám": "TP-TAPOC520WS-WHT",
  },
  "iphone16": {
    Márka: "Apple",
    Modell: "iPhone 16 Pro Max",
    Tárhely: "256 GB",
    Szín: "Fekete titán",
    Kijelző: '6.9" Super Retina XDR OLED',
    Processzor: "A18 Pro chip",
    RAM: "8 GB",
    "SIM típus": "Nano-SIM + eSIM",
    Operációs_rendszer: "iOS 18",
  },
  airpods4: {
    Márka: "Apple",
    Modell: "AirPods 4",
    Csatlakozó: "USB-C",
    "Aktív zajszűrés": "Nem",
    Bluetooth: "5.3",
    "Akkumulátor idő": "Akár 30 óra (tokkal)",
    Szín: "Fehér",
  },
  "dyson-v12": {
    Márka: "Dyson",
    Modell: "V12 Detect Slim Absolute",
    Típus: "Vezeték nélküli porszívó",
    "Üzemidő (max)": "60 perc",
    Szűrő: "Egész gépre kiterjedő HEPA szűrés",
    Érzékelő: "Piezo szenzor + lézer port-detektálás",
    Szín: "Sárga / Nikkel",
  },
  "jbl-party": {
    Márka: "JBL",
    Modell: "Partybox Ultimate",
    Típus: "Bluetooth hangfal",
    Teljesítmény: "1100 W RMS",
    "Akkumulátor idő": "Akár 24 óra",
    Bluetooth: "5.3",
    Védelem: "IPX4",
    Szín: "Fekete",
  },
  scooter: {
    Márka: "Xiaomi",
    Modell: "Electric Scooter 5 Pro",
    "Max sebesség": "25 km/h",
    Hatótáv: "Akár 50 km",
    "Motor teljesítmény": "500 W (csúcs: 960 W)",
    "Kerékmér.": '10" pneumatikus',
    Szín: "Fekete",
  },
  "tab-s10": {
    Márka: "Samsung",
    Modell: 'Galaxy Tab S10 FE+ 13.1"',
    Kijelző: '13.1" TFT LCD',
    Processzor: "Exynos 1580",
    RAM: "8 GB",
    Tárhely: "128 GB",
    "Wi-Fi": "Wi-Fi 6E",
    Szín: "Ezüst",
  },
  cw300: {
    Márka: "Xiaomi",
    Modell: "CW300",
    Típus: "Kültéri kamera",
    Felbontás: "2.5K Super HD",
    Védelem: "IP66",
    "Wi-Fi": "802.11b/g/n, 2.4 GHz",
    Szín: "Fehér",
  },
  "gan-joy": {
    Márka: "Joyroom",
    Modell: "JR-TCG13",
    Típus: "GaN USB-C töltő",
    Teljesítmény: "45 W",
    Portok: "1× USB-C",
    Szín: "Fekete",
  },
  airpur: {
    Márka: "Xiaomi",
    Modell: "Smart Air Purifier 4 Compact",
    Típus: "Légtisztító",
    CADR: "230 m³/h",
    "Javasolt szobameéret": "16–27 m²",
    Szűrő: "HEPA H13",
    Szín: "Fehér",
  },
};

const DEMO_DESCRIPTIONS: Record<string, string> = {
  tapo: `Okos. Biztonságos. Könnyű. Teljes körű védelem élénk színekkel.

A Tapo C520WS a starlight-érzékelőnek köszönhetően fényesebb képet ad, mint más színes éjjellátó kamerák bekapcsolt reflektorral. Az intelligens AI azonosítja az embereket, a háziállatokat és a járműveket, és szükség esetén értesíti a felhasználókat.

Testreszabhatja az észlelést: állítsa be a mozgásérzékelés érzékenységét, és állítson be tevékenységi zónákat/határokat az Ön kényelme érdekében. Bekapcsolhatja a járőr módot is, hogy a kamera két testreszabott pont között mozogjon.

A kettős erős külső antenna nagyobb vezeték nélküli lefedettséget és stabilabb kapcsolatot biztosít. A kameráját az RJ45 Ethernet porton keresztül is csatlakoztathatja a hálózathoz. IP66 időjárásálló — kiváló víz- és porálló teljesítményt nyújt kültéri forgatókönyvekhez.

Intelligens mozgáskövetés: követi a mozgást nagy sebességű forgással, hogy a tárgy a kamera látószögében maradjon. Kétirányú hang: kényelme érdekében közvetlenül kommunikálhat a külvilággal.

Többféle telepítési lehetőség: a rögzítőcsavarokkal, sablonnal és hurkokkal bármilyen falra, mennyezetre vagy oszlopra szerelheti a tökéletes kilátás érdekében. Fizikai adatvédelmi mód fenntartja a magánéletét, mivel a lencsét fizikailag blokkolja a ház. Alexa és Google Assistant támogatás.`,
  iphone16: `Az iPhone 16 Pro Max az eddigi legnagyobb Apple kijelzőt hozza 6,9 hüvelyken, az A18 Pro chippel, amelyet a teljesítmény és az energiahatékonyság csúcsára terveztek.

A titán keret erős és könnyű; a Ceramic Shield elöl még tartósabb védelmet biztosít. A 48 MP-es fő kamerával profi szintű fotókat és 4K Dolby Vision videókat készíthetsz, a tetra prizma telefotó objektívvel pedig 5× optikai zoom áll rendelkezésedre.

USB-C csatlakozó, Wi-Fi 7, 5G – a legfrissebb technológiák egyben.`,
};

function getDescription(id: string, name: string): string {
  if (DEMO_DESCRIPTIONS[id]) return DEMO_DESCRIPTIONS[id];
  return `A(z) ${name} prémium minőségű termék, amelyet a legmagasabb gyártási szabványok szerint készítenek. Kiváló teljesítmény, modern dizájn, megbízható tartósság — mindez egy termékben.\n\nRészletes specifikációkért lásd a Paraméterek fület.`;
}

function getSpecs(id: string, brand: string, name: string): Record<string, string> {
  if (DEMO_SPECS[id]) return DEMO_SPECS[id];
  return { Márka: brand, Terméknév: name };
}

export function ProductDetailPage() {
  return (
    <EdunaDemoProvider>
      <ProductDetailInner />
    </EdunaDemoProvider>
  );
}

function ProductDetailInner() {
  const { productId } = useParams({ from: "/product/$productId" });
  const product = findProductBySlug(productId);
  const { addToCart, toggleWish, wishlist, fmtHu, stockText } = useEdunaDemo();
  const [qty, setQty] = React.useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <TopBar />
        <SiteHeader />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-4xl font-bold">Termék nem található</h1>
          <p className="mt-3 text-muted-foreground">
            A keresett termék nem létezik vagy már nem elérhető.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Vissza a főoldalra
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const p = product;
  const discount = p.old ? Math.round((1 - p.price / p.old) * 100) : null;
  const wishlisted = wishlist.has(p.id);
  const specs = getSpecs(p.id, p.brand, p.name);
  const description = getDescription(p.id, p.name);

  const related = ALL_DEMO_PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Navigáció" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <Link to="/" className="transition-colors hover:text-foreground">
                Főoldal
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="transition-colors hover:text-foreground">{p.brand}</span>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <span className="font-normal text-foreground">{p.name}</span>
            </li>
          </ol>
        </nav>

        {/* Product top section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-square">
              <RemoteImg
                src={p.remoteSrc}
                fallback={p.fallbackSrc}
                alt={p.name}
                className="absolute inset-0 h-full w-full object-contain p-6 sm:p-10"
                width={600}
                height={600}
              />
              {p.tag && (
                <Badge className="absolute left-4 top-4 text-xs uppercase">{p.tag}</Badge>
              )}
              {discount != null && (
                <span className="absolute bottom-4 left-4 rounded bg-neon px-2 py-1 font-mono text-sm font-semibold text-neon-foreground">
                  −{discount}%
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {p.brand}
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {p.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(p.rating) ? "fill-neon text-neon" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{p.rating} / 5</span>
            </div>

            <Separator className="my-5" />

            {/* Price block */}
            <div className="flex items-end gap-3">
              <span className="font-mono text-3xl font-bold text-primary">{fmtHu(p.price)}</span>
              {p.old != null && (
                <span className="mb-0.5 text-lg text-muted-foreground line-through">
                  {fmtHu(p.old)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  p.stock === "raktaron"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : p.stock === "utolso"
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    p.stock === "raktaron"
                      ? "bg-emerald-500"
                      : p.stock === "utolso"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                />
                {stockText(p.stock)}
              </span>
            </div>

            {/* Quantity + Cart */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-11 w-fit items-center rounded-xl border border-border">
                <button
                  type="button"
                  className="flex h-full w-10 items-center justify-center rounded-l-xl text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground disabled:opacity-40"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Mennyiség csökkentése"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex w-12 items-center justify-center font-mono text-sm font-semibold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  className="flex h-full w-10 items-center justify-center rounded-r-xl text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Mennyiség növelése"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                size="lg"
                className="h-11 flex-1 gap-2 rounded-xl text-sm font-semibold sm:max-w-xs"
                onClick={() => {
                  for (let i = 0; i < qty; i++) addToCart(p);
                }}
                disabled={p.stock === "nincs"}
              >
                <ShoppingBag className="h-4 w-4" />
                Kosárba
              </Button>
              <button
                type="button"
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border transition-colors hover:border-primary/50 ${wishlisted ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => toggleWish(p.id, p.name)}
                aria-label={wishlisted ? "Eltávolítás a kedvencekből" : "Kedvencekhez adás"}
              >
                <Heart className={`h-5 w-5 ${wishlisted ? "fill-accent" : ""}`} />
              </button>
            </div>

            <Separator className="my-5" />

            {/* Shipping info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Szállítás</p>
                  <p className="text-muted-foreground">
                    GLS 1 190 Ft-tól &middot; MPL 1 090 Ft-tól
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Akár 1 munkanapos kiszállítás! Az átlagos szállítási idő 1–3 munkanap.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Garancia</p>
                  <p className="text-muted-foreground">
                    Gyártói garancia &middot; 14 napos visszaküldési jog
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Package className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Nincsenek rejtett költségek</p>
                  <p className="text-muted-foreground">
                    Garantált vásárlói adat- és jogvédelem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description + Specs */}
        <div className="mt-12">
          <Tabs defaultValue="leiras">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger
                value="leiras"
                className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Leírás
              </TabsTrigger>
              <TabsTrigger
                value="parameterek"
                className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Paraméterek
              </TabsTrigger>
            </TabsList>
            <TabsContent value="leiras" className="mt-6">
              <div className="prose prose-sm max-w-3xl text-foreground dark:prose-invert">
                {description.split("\n\n").map((para, i) => (
                  <p key={i} className="mb-4 leading-relaxed text-muted-foreground last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="parameterek" className="mt-6">
              <div className="max-w-2xl overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(specs).map(([key, val], i) => (
                      <tr
                        key={key}
                        className={
                          i % 2 === 0 ? "bg-surface/60" : "bg-transparent"
                        }
                      >
                        <td className="w-1/3 px-4 py-3 font-medium text-foreground">{key}</td>
                        <td className="px-4 py-3 text-muted-foreground">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16 pb-8">
            <h2 className="mb-6 font-display text-xl font-bold tracking-tight sm:text-2xl">
              Hasonló termékek
            </h2>
            <div className="grid min-w-0 gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,13.5rem),1fr))]">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  to="/product/$productId"
                  params={{ productId: productSlug(rp) }}
                  className="group flex min-w-0 flex-col rounded-2xl border border-border bg-card shadow-sm transition-interactive hover:border-primary/40 hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted/40">
                    <RemoteImg
                      src={rp.remoteSrc}
                      fallback={rp.fallbackSrc}
                      alt=""
                      className="absolute inset-0 h-full w-full object-contain p-3 transition-interactive group-hover:scale-[1.02]"
                      width={400}
                      height={400}
                    />
                    <span className="absolute left-2 top-2 rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">
                      {rp.tag}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {rp.brand}
                    </p>
                    <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug">
                      {rp.name}
                    </h3>
                    <p className="mt-auto pt-3 font-mono text-base font-bold text-primary">
                      {fmtHu(rp.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
      <EdunaModals />
    </div>
  );
}
