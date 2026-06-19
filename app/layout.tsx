import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/src/components/footer";
import LenisScroll from "./lenis-scroll";
import { Navbar } from "@/src/components/navbar";

export const metadata: Metadata = {
  title: "Alexis Flacher - Portfolio",
  description:
    "Bienvenue sur mon portfolio ! Je suis Alexis Flacher, développeur web freelance à Grenoble spécialisé en développement Front-end. Je développe des sites et applications web design et performants. Je suis à l'écoute de nouvelles missions comme développeur Front-end ou Full-stack.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.jpg", type: "image/jpg" }],
  },
  keywords: [
    "développeur web freelance",
    "développeur freelance Grenoble",
    "développeur front-end",
    "développeur full-stack",
    "création site web",
    "création site vitrine",
    "développeur React",
    "développeur Next.js",
    "développeur Vue.js",
    "développeur Javascript",
    "développeur",
    "freelance Grenoble",
    "freelance Voiron",
    "freelance Isère",
    "développeur web Voiron",
    "développeur web Grenoble",
    "développeur web Isère",
    "développeur web Auvergne-Rhône-Alpes",
    "création site internet Grenoble",
    "agence web Grenoble",
    "développeur Voiron",
    "développeur Grenoble",
    "développeur Isère",
    "développeur Auvergne-Rhône-Alpes",
  ],
  authors: [{ name: "Alexis Flacher" }],
  creator: "Alexis Flacher",
  openGraph: {
    title: "Alexis Flacher - Développeur Front-end freelance à Grenoble",
    description:
      "Développeur web freelance spécialisé en développement Front React, Next.Js, Vue.Js. Disponible pour des missions.",
    images: "https://www.alexisflacher.fr/Alexis.webp",
    url: "https://www.alexisflacher.fr/",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 overflow-x-hidden">
        <LenisScroll />
        <Navbar />
        <main className="pr-4 pl-4 md:pr-9 md:pl-9">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
