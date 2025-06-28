import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page introuvable",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="font-gothic text-4xl font-bold mb-4 dark:text-white">
        404 - Page introuvable
      </h1>
      <p className="text-lg mb-6 dark:text-white">
        Désolé, la page que vous recherchez n&apos;existe pas.
      </p>
      <Link
        className="block font-gothic w-fit border border-transparent rounded-full py-2 px-4 bg-linear-to-r hover:from-transparent hover:to-transparent hover:dark:text-white hover:border-neutral-600 hover:dark:border-white from-react to-vue transition duration-300 ease-in-out"
        href={"/"}
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
