import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projectRoute } from "@/src/i18n/config";
import { useI18n } from "@/src/i18n/i18n-provider";
import { Realisation } from "@/src/types";

export function Card({ card }: { card: Realisation }) {
  const { lang, t } = useI18n();

  return (
    <div className="relative group">
      <div className="rounded-2xl shadow-lg overflow-hidden">
        <Image
          className="w-full aspect-[2/1] group-hover:scale-110 transition duration-300 ease-in-out"
          src={card.pictures[0]}
          width={500}
          height={300}
          alt=""
        />
      </div>

      <div className="flex flex-col mt-4 gap-4 dark:text-white">
        <div className="flex items-center gap-2 flex-wrap-reverse justify-between">
          <h2 className="text-lg font-bold">{card.title}</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm">{card.date}</p>
            <p className="border rounded-full px-2 py-px w-fit text-sm">
              {t.projects.types[card.type as keyof typeof t.projects.types]}
            </p>
            <div className="flex items-center gap-2">
              {card?.mainTechnos?.map((techno, index) => {
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
        <p className="text-sm">{card.shortDescription[lang]}</p>
        <Link
          href={projectRoute(card.name)[lang]}
          className="font-gothic text-sm w-fit flex items-center gap-2 after:absolute after:inset-[0]"
        >
          {t.projects.learnMore}{" "}
          <span className="group-hover:translate-x-2 transition duration-300 ease-in-out">
            <ArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}
