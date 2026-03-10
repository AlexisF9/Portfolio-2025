import { Projects } from "@/src/components/projects";
import { Metadata } from "next";

export interface Realisation {
  id: number;
  name: string;
  title: string;
  pictures: string[];
  description: string;
  shortDescription: string;
  mainTechnos?: { name: string; label: string }[];
  technos: { name: string; label: string }[];
  type: string;
  date: string;
}

export const metadata: Metadata = {
  title: "Mes réalisations",
};

export default function Page() {
  return (
    <section className="pt-30 md:pt-40">
      <Projects />
    </section>
  );
}
