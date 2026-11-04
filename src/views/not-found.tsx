import type { Metadata } from "next";
import Link from "next/link";
import { Locale, routes } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n";

export function getNotFoundMetadata(lang: Locale): Metadata {
  return {
    title: getDictionary(lang).meta.notFoundTitle,
  };
}

export function NotFoundView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).notFound;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="font-gothic text-4xl font-bold mb-4 dark:text-white">
        {t.title}
      </h1>
      <p className="text-lg mb-6 dark:text-white">{t.text}</p>
      <Link
        className="block font-gothic w-fit border border-transparent rounded-full py-2 px-4 bg-linear-to-r hover:from-transparent hover:to-transparent hover:dark:text-white hover:border-neutral-600 hover:dark:border-white from-react to-vue transition duration-300 ease-in-out"
        href={routes.home[lang]}
      >
        {t.back}
      </Link>
    </div>
  );
}
