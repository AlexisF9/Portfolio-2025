import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 md:mt-26 md:mb-8">
      <div className="flex flex-col items-center gap-2 pr-4 pl-4 mb-10 md:pr-9 md:pl-9 dark:text-white text-center">
        <p className="font-gothic text-xl md:text-2xl">Connectons-nous :</p>
        <div className="flex gap-2 dark:text-white">
          <Link
            className="underline"
            href="https://www.linkedin.com/in/alexis-flacher-772ba7197/"
          >
            LinkedIn
          </Link>
          <span>/</span>
          <Link className="underline" href="https://github.com/AlexisF9">
            GitHub
          </Link>
        </div>
        <p>
          Ou envoyez-moi un email :{" "}
          <Link
            href={"mailto:alexis.flacher38@gmail.com"}
            className="w-max bg-linear-to-r from-react to-vue inline-block text-transparent bg-clip-text"
          >
            alexis.flacher38@gmail.com
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-full mx-auto p-12 border-t md:border border-neutral-900 dark:border-white md:rounded-full text-neutral-950 dark:text-white ">
        <p className="w-max font-gothic text-2xl md:text-4xl">Alexis Flacher</p>
        <p className="text-sm opacity-70 text-center">
          © 2025 Alexis Flacher. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
