import { Realisation } from "@/app/mes-realisations/page";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Card({ card }: { card: Realisation }) {
  return (
    <div className="relative">
      <div className="rounded-2xl shadow-lg overflow-hidden">
        <Image
          className="w-full aspect-[4/2] object-cover"
          src={card.pictures[0]}
          width={400}
          height={300}
          alt=""
        />
      </div>

      <div className="flex flex-col mt-4 gap-2 dark:text-white">
        <div className="flex items-center gap-2 flex-wrap-reverse justify-between">
          <h2 className="text-lg font-bold">{card.title}</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm">{card.date}</p>
            <p className="border rounded-full px-2 py-px w-fit text-sm">
              Projet {card.type}
            </p>
          </div>
        </div>

        <p className="text-sm">{card.shortDescription}</p>
        <Link
          href={`/mes-realisations/${card.name}`}
          className="font-gothic text-sm w-fit flex items-center gap-2"
        >
          En savoir plus <MoveRight />
        </Link>
      </div>
    </div>
  );
}
