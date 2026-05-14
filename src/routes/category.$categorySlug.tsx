import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/eduna/category-page";

export const Route = createFileRoute("/category/$categorySlug")({
  component: CategoryPage,
  head: () => ({
    meta: [{ title: "Kategória — eDuna.hu (UI demo)" }],
  }),
});
