import { Hero } from "@/src/components/hero";
import { Intro } from "@/src/components/intro";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexis Flacher - Développeur Front-end freelance à Grenoble",
  description:
    "Bienvenue sur mon portfolio ! Je suis Alexis Flacher, développeur web freelance à Grenoble spécialisé en développement Front-end. Je développe des sites et applications web design et performants. Je suis à l'écoute de nouvelles missions comme développeur Front-end ou Full-stack.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
    </>
  );
}
