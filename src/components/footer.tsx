import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col align-center gap-2 items-center justify-center w-full mx-auto mt-20 md:mb-8 py-12 px-9 bg-neutral-800 rounded-t-4xl md:rounded-full dark:bg-white">
      <p className="w-max font-gothic text-xl md:text-4xl text-white dark:text-neutral-950">
        Alexis Flacher
      </p>
      <Link
        href={"mailto:alexis.flacher38@gmail.com"}
        className="w-max bg-linear-to-r from-react to-vue inline-block text-transparent bg-clip-text"
      >
        alexis.flacher38@gmail.com
      </Link>
    </footer>
  );
}
