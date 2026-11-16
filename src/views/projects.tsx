import type { Metadata } from "next";
import { Projects } from "@/src/components/projects";
import { getAlternates, Locale, routes } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n";

export function getProjectsMetadata(lang: Locale): Metadata {
  return {
    title: getDictionary(lang).meta.projectsTitle,
    alternates: getAlternates(lang, routes.projects),
  };
}

export function ProjectsPage() {
  return (
    <section className="max-w-7xl mx-auto pr-4 pl-4 md:pr-9 md:pl-9 pt-30 md:pt-40">
      <Projects />
    </section>
  );
}
