import type { MetadataRoute } from "next";
import realisations from "@/public/realisations.json";
import {
  Localized,
  locales,
  projectRoute,
  routes,
  siteUrl,
} from "@/src/i18n/config";

type Entry = MetadataRoute.Sitemap[number];

function localizedEntries(
  route: Localized,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  const languages = {
    fr: `${siteUrl}${route.fr}`,
    en: `${siteUrl}${route.en}`,
  };

  return locales.map((lang) => ({
    url: languages[lang],
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntries(routes.home, "monthly", 1),
    ...localizedEntries(routes.projects, "monthly", 0.8),
    ...realisations.flatMap((rea) =>
      localizedEntries(projectRoute(rea.name), "yearly", 0.6),
    ),
  ];
}
