"use client";
import { Card } from "@/src/components/card";
import realisations from "@/public/realisations.json";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export interface Realisation {
  id: number;
  name: string;
  title: string;
  pictures: string[];
  description: string;
  shortDescription: string;
  technos: { name: string; label: string }[];
  type: string;
  date: string;
}

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [filter, setFilter] = useState<"all" | "perso" | "pro">("all");

  useEffect(() => {
    if (sessionStorage.getItem("filters")) {
      setFilter(sessionStorage.getItem("filters") as "all" | "perso" | "pro");
    }

    const elements = gsap.utils.toArray(".fade-in");

    elements.forEach((el) => {
      const t = el as HTMLElement;
      gsap.fromTo(
        t,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          delay: 0.3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: t,
            start: "top 95%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleFilterChange = (newFilter: "all" | "perso" | "pro") => {
    setFilter(newFilter);
    sessionStorage.setItem("filters", newFilter);
  };

  const filters = [
    {
      name: "all",
      label: "Tout",
    },
    {
      name: "pro",
      label: "Projets pro",
    },
    {
      name: "perso",
      label: "Projets perso",
    },
  ];

  return (
    <div className="pt-30 md:pt-40">
      <h1 className="fade-in text-xl mb-4 md:text-2xl dark:text-white font-gothic">
        Mes réalisations
      </h1>
      <div className="fade-in flex items-center flex-wrap gap-2 mb-9">
        {filters.map((item, index) => {
          return (
            <button
              key={index}
              className={`cursor-pointer border rounded-full px-2 ${
                filter === item.name
                  ? "bg-linear-to-r from-react to-vue text-neutral-950 dark:border-transparent"
                  : "dark:text-white dark:border-white"
              }`}
              onClick={() =>
                handleFilterChange(item.name as "all" | "perso" | "pro")
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {realisations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
          {realisations
            .filter((item) => (filter !== "all" ? item.type === filter : item))
            .map((el: Realisation, index) => {
              return (
                <div className="fade-in" key={index}>
                  <Card card={el} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
