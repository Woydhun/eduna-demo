export type ProductFilter = "all" | "phones" | "audio" | "wearables" | "charging";

export type StockLabel = "raktaron" | "utolso" | "nincs";

export type DemoProduct = {
  id: string;
  brand: string;
  name: string;
  price: number;
  old: number | null;
  rating: number;
  tag: string;
  remoteSrc: string;
  fallbackSrc: string;
  filters: ProductFilter[];
  stock: StockLabel;
  color?: string;
  storage?: string;
  ram?: string;
  model?: string;
};

export type CartLine = { product: DemoProduct; qty: number };
