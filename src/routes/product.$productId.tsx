import { createFileRoute } from "@tanstack/react-router";

import { ProductDetailPage } from "@/components/eduna/product-detail-page";

export const Route = createFileRoute("/product/$productId")({
  component: ProductDetailPage,
  head: () => ({
    meta: [{ title: "Termék — eDuna.hu (UI demo)" }],
  }),
});
