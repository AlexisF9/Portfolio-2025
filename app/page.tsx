import { Hero } from "@/src/components/hero";
import { Intro } from "@/src/components/intro";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexis Flacher - Développeur front-end",
  description:
    "Bienvenue sur mon portfolio ! Je suis Alexis Flacher, développeur front-end à Grenoble depuis 2022. Je suis à l'écoute d'opportunités freelance comme développeur front ou intégrateur web.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
    </>
  );
}
