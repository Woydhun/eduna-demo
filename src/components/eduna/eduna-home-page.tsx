"use client";

import { EdunaDemoProvider } from "./home-context";
import { TopBar } from "./top-bar";
import { SiteHeader } from "./site-header";
import { HeroBanner } from "./hero-banner";
import { TrustStrip } from "./trust-strip";
import { BrandMarquee } from "./brand-marquee";
import { ProductRail } from "./product-card";
import { NEW_ARRIVALS, TOP_PRODUCTS } from "./data";
import { FeaturedCategories } from "./featured-categories";
import { MoreOfferings } from "./more-offerings";
import { IntroVideoTeaser } from "./intro-video-teaser";
import { NewsSection } from "./news-section";
import { CatalogSection } from "./catalog-section";
import { SiteFooter } from "./site-footer";
import { EdunaModals } from "./eduna-modals";

export function EdunaHomePage() {
  return (
    <EdunaDemoProvider>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <a
          href="#katalogus"
          className="absolute left-[-9999px] top-4 z-[100] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow focus:left-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Ugrás a katalógushoz
        </a>
        <TopBar />
        <SiteHeader />
        <HeroBanner />
        <TrustStrip />
        <BrandMarquee />
        <ProductRail
          id="uj-erkezes"
          title="Új érkezés"
          subtitle="Frissen listázott termékek — készletjelzéssel és kosár gombbal (demo)."
          products={NEW_ARRIVALS}
        />
        <FeaturedCategories />
        <ProductRail
          id="top-termekek"
          title="Top termékek"
          subtitle="A legnépszerűbb választások a webáruházból — illusztráció."
          products={TOP_PRODUCTS}
        />
        <MoreOfferings />
        <IntroVideoTeaser />
        <CatalogSection />
        <NewsSection />
        <SiteFooter />
        <EdunaModals />
      </div>
    </EdunaDemoProvider>
  );
}
