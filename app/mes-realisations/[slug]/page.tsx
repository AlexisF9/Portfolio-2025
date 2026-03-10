import { notFound } from "next/navigation";
import { Realisation } from "../page";
import realisations from "@/public/realisations.json";
import { Metadata } from "next";
import { RealisationDetails } from "@/src/components/realisation-details";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const rea = realisations.find((el: Realisation) => el.name === slug);

  if (!rea) {
    notFound();
  }

  return {
    title: rea.title,
    description: rea.shortDescription,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const rea = realisations.find((el: Realisation) => el.name === slug);

  if (!rea) {
    notFound();
  }

  return <RealisationDetails rea={rea} />;
}
