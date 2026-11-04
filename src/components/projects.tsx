"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CardsList } from "@/src/components/cards-list";
import { useI18n } from "@/src/i18n/i18n-provider";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const { t } = useI18n();
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
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          delay: 0.5,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: t,
            start: "top 95%",
          },
        },
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
      label: t.projects.filters.all,
    },
    {
      name: "pro",
      label: t.projects.filters.pro,
    },
    {
      name: "perso",
      label: t.projects.filters.perso,
    },
  ];
  return (
    <>
      <div className="flex flex-col mb-9 gap-4 md:flex-row md:justify-between">
        <h1 className="fade-in text-xl md:text-2xl dark:text-white font-gothic">
          {t.projects.title}
        </h1>
        <div className="fade-in flex items-center flex-wrap gap-2">
          {filters.map((item, index) => {
            return (
              <button
                key={index}
                className={`cursor-pointer border rounded-full px-2 transition duration-300 ease-out ${
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
      </div>

      <CardsList filter={filter} />
    </>
  );
}
