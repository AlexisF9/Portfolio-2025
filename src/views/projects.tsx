import type { Metadata } from "next";
import { Projects } from "@/src/components/projects";
import { getAlternates, Locale, routes } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n";
import { getOpenGraph } from "@/src/components/root-shell";

export function getProjectsMetadata(lang: Locale): Metadata {
  const t = getDictionary(lang).meta;

  return {
    title: t.projectsTitle,
    description: t.projectsDescription,
    alternates: getAlternates(lang, routes.projects),
    openGraph: getOpenGraph(lang, {
      title: `${t.projectsTitle} - Alexis Flacher`,
      description: t.projectsDescription,
      path: routes.projects[lang],
    }),
  };
}

export function ProjectsPage() {
  return (
    <section className="max-w-7xl mx-auto pr-4 pl-4 md:pr-9 md:pl-9 pt-30 md:pt-40">
      <Projects />
    </section>
  );
}
