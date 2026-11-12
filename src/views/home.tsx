import type { Metadata } from "next";
import { Intro } from "@/src/components/intro";
import { getAlternates, Locale, routes } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n";
import Hero from "../components/hero";

export function getHomeMetadata(lang: Locale): Metadata {
  const t = getDictionary(lang).meta;

  return {
    title: t.homeTitle,
    description: t.description,
    alternates: getAlternates(lang, routes.home),
  };
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
    </>
  );
}
