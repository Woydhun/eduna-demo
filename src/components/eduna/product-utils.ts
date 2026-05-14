import { ALL_DEMO_PRODUCTS } from "./data";
import type { DemoProduct } from "./types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[áàâä]/g, "a")
    .replace(/[éèêë]/g, "e")
    .replace(/[íìîï]/g, "i")
    .replace(/[óòôö]/g, "o")
    .replace(/[őö]/g, "o")
    .replace(/[úùûü]/g, "u")
    .replace(/[űü]/g, "u")
    .replace(/[ñ]/g, "n")
    .replace(/[ç]/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function productSlug(p: DemoProduct): string {
  return slugify(`${p.brand} ${p.name}`) + `-${p.id}`;
}

export function findProductBySlug(slug: string): DemoProduct | undefined {
  return ALL_DEMO_PRODUCTS.find((p) => productSlug(p) === slug);
}
