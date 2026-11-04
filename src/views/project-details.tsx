import type { Metadata } from "next";
import { notFound } from "next/navigation";
import realisations from "@/public/realisations.json";
import { RealisationDetails } from "@/src/components/realisation-details";
import { getAlternates, Locale, projectRoute } from "@/src/i18n/config";
import { Realisation } from "@/src/types";

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

  return {
    title: rea.title,
    description: rea.shortDescription[lang],
    alternates: getAlternates(lang, projectRoute(slug)),
  };
}

export async function ProjectDetailsPage({ params }: ProjectParams) {
  const { slug } = await params;

  return <RealisationDetails rea={findRealisation(slug)} />;
}
