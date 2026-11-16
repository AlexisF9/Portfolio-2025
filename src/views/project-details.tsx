import type { Metadata } from "next";
import { notFound } from "next/navigation";
import realisations from "@/public/realisations.json";
import { RealisationDetails } from "@/src/components/realisation-details";
import { getAlternates, Locale, projectRoute } from "@/src/i18n/config";
import { Realisation } from "@/src/types";
import { getOpenGraph } from "@/src/components/root-shell";

export type ProjectParams = { params: Promise<{ slug: string }> };

function findRealisation(slug: string): Realisation {
  const rea = realisations.find((el: Realisation) => el.name === slug);

  if (!rea) {
    notFound();
  }

  return rea;
}

export function getProjectStaticParams() {
  return realisations.map((rea) => ({ slug: rea.name }));
}

export async function getProjectMetadata(
  lang: Locale,
  { params }: ProjectParams,
): Promise<Metadata> {
  const { slug } = await params;
  const rea = findRealisation(slug);
  const route = projectRoute(slug);

  return {
    title: rea.title,
    description: rea.shortDescription[lang],
    alternates: getAlternates(lang, route),
    // Image de partage : la première image du projet
    openGraph: getOpenGraph(lang, {
      title: `${rea.title} - Alexis Flacher`,
      description: rea.shortDescription[lang],
      path: route[lang],
      image: rea.pictures[0],
    }),
  };
}

export async function ProjectDetailsPage({ params }: ProjectParams) {
  const { slug } = await params;

  return <RealisationDetails rea={findRealisation(slug)} />;
}
