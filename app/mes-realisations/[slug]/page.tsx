import { notFound } from "next/navigation";
import { Realisation } from "../page";
import realisations from "@/public/realisations.json";
import Link from "next/link";
import { Slider } from "@/src/components/slider";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const rea = realisations.find((el: Realisation) => el.name === params.slug);

  if (!rea) {
    return {
      title: "404",
    };
  }

  return {
    title: `${rea.title}`,
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

  return (
    <div className="pt-30 md:pt-40">
      <div className="flex items-center flex-wrap-reverse justify-between mb-9">
        <h1 className="text-xl md:text-4xl dark:text-white font-gothic">
          {rea.title}
        </h1>
        <div className="flex items-center gap-2 dark:text-white">
          <p className="text-sm">{rea.date}</p>
          <p className="border rounded-full px-2 py-px w-fit text-sm">
            Projet {rea.type}
          </p>
          <div className="flex items-center gap-2">
            {rea.technos.map((techno, index) => {
              return (
                <Image
                  key={index}
                  src={`/images/logos/logo-${techno.name}.png`}
                  width={20}
                  height={20}
                  alt={`logo ${techno.label}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <p className="pb-9 dark:text-white">{rea.description}</p>

      <Slider pictures={rea.pictures} />

      {(rea.link || rea.github) && (
        <div className="flex items-center gap-4 w-fit mx-auto pt-9">
          {rea.link && (
            <Link
              className="flex items-center gap-2 font-gothic w-fit border border-transparent rounded-full py-2 px-4 bg-linear-to-r hover:from-transparent hover:to-transparent hover:dark:text-white hover:border-neutral-600 hover:dark:border-white from-react to-vue transition duration-300 ease-in-out"
              href={rea.link}
              target="_blank"
            >
              Voir le site <SquareArrowOutUpRight className="w-[20px]" />
            </Link>
          )}
          {rea.github && (
            <Link
              className="block font-gothic w-fit border border-neutral-600 rounded-full p-2 dark:text-white dark:border-white"
              href={rea.github}
              target="_blank"
            >
              <Github />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
