import type { Metadata } from "next";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const siteUrl = "https://www.alexisflacher.fr";

export type Localized = Record<Locale, string>;

// Le français reste à la racine (URLs historiques), l'anglais sous /en
export const routes = {
  home: { fr: "/", en: "/en" },
  projects: { fr: "/mes-realisations", en: "/en/projects" },
} satisfies Record<string, Localized>;

export function projectRoute(slug: string): Localized {
  return {
    fr: `${routes.projects.fr}/${slug}`,
    en: `${routes.projects.en}/${slug}`,
  };
}

export function getAlternates(
  lang: Locale,
  route: Localized,
): Metadata["alternates"] {
  return {
    canonical: route[lang],
    languages: { fr: route.fr, en: route.en, "x-default": route.fr },
  };
}

// Équivalent d'une URL dans l'autre langue (utilisé par le sélecteur de langue)
export function translatePath(pathname: string, target: Locale): string {
  for (const lang of locales) {
    if (pathname === routes.home[lang]) return routes.home[target];

    const base = routes.projects[lang];
    if (pathname === base || pathname.startsWith(`${base}/`)) {
      return routes.projects[target] + pathname.slice(base.length);
    }
  }

  return routes.home[target];
}
