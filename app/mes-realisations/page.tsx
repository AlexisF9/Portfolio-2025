"use client";
import { Card } from "@/src/components/card";
import realisations from "@/public/realisations.json";
import { useEffect } from "react";
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
  useEffect(() => {
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

  return (
    <div className="pt-40">
      <h1 className="text-xl mb-9 md:text-2xl dark:text-white font-gothic">
        Mes réalisations
      </h1>
      {realisations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
          {realisations.map((el: Realisation, index) => {
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
