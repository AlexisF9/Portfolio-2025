import { notFound } from "next/navigation";
import { Realisation } from "../page";
import realisations from "@/public/realisations.json";

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

  return <div>My Post: {slug}</div>;
}
