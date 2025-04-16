"use client";
import { Card } from "@/src/components/card";
import realisations from "@/public/realisations.json";

export interface Realisation {
  id: number;
  name: string;
  title: string;
  pictures: string[];
  description: string;
  shortDescription: string;
  type: string;
  date: string;
}

export default function Page() {
  return (
    <div className="pt-40">
      <h1 className="text-xl mb-9 md:text-2xl dark:text-white font-gothic">
        Mes réalisations
      </h1>
      {realisations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
          {realisations.map((el: Realisation, index) => {
            return <Card key={index} card={el} />;
          })}
        </div>
      )}
    </div>
  );
}
