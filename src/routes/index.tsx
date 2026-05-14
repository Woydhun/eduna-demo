import { createFileRoute } from "@tanstack/react-router";

import { EdunaHomePage } from "@/components/eduna/eduna-home-page";

export const Route = createFileRoute("/")({
  component: EdunaHomePage,
  head: () => ({
    meta: [
      { title: "eDuna.hu — Elektronikai webáruház (UI demo)" },
      {
        name: "description",
        content:
          "Bemutató főoldal az eduna.hu szerkezetéhez igazítva: új érkezés, top termékek, kategóriák, hírlevél. Világos / sötét mód, rendszer alapértelmezés.",
      },
    ],
  }),
});
