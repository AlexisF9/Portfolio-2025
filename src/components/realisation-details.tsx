"use client";
import { IconButton } from "@/src/components/icon-button";
import { useEffect } from "react";
import Link from "next/link";
import { Slider } from "@/src/components/slider";
import { ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import { Realisation } from "@/src/types";
import { useI18n } from "@/src/i18n/i18n-provider";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function RealisationDetails(props: { rea: Realisation }) {
  const { rea } = props;
  const { lang, t } = useI18n();

  useEffect(() => {
    const elements = gsap.utils.toArray(".fade-in");

    elements.forEach((el, index) => {
      const t = el as HTMLElement;

      gsap.fromTo(
        t,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          delay: 0.3 + index * 0.2,
          duration: 1,
          ease: "power3.out",
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <article className="pt-30 md:pt-40">
      <div className="flex items-center flex-wrap gap-2 justify-between mb-9">
        <h1 className="fade-in text-xl md:text-4xl dark:text-white font-gothic">
          {rea.title}
        </h1>
        <div className="fade-in flex items-center gap-2 dark:text-white">
          <p className="text-sm">{rea.date}</p>
          <p className="border rounded-full px-2 py-px w-fit text-sm">
            {t.projects.types[rea.type as keyof typeof t.projects.types]}
          </p>
        </div>
      </div>
      <p className="fade-in pb-9 dark:text-white">{rea.description[lang]}</p>

      <Slider pictures={rea.pictures} />

      <div className="pt-9">
        <h2 className="fade-in text-xl md:text-2xl font-gothic dark:text-white mb-4">
          {t.projects.technos}
        </h2>
        <div className="fade-in flex items-center flex-wrap gap-2">
          {rea.technos.map((skill, index) => {
            return (
              <li
                key={index}
                className="flex items-center gap-2 dark:text-white"
              >
                <Image
                  src={`/images/logos/logo-${skill.name}.png`}
                  width={24}
                  height={24}
                  alt={`logo ${skill.name}`}
                  className="h-[24px] w-auto"
                />
                <span className="text-sm">{skill.label}</span>
              </li>
            );
          })}
        </div>
      </div>

      {(rea.link || rea.github) && (
        <div className="fade-in flex items-center gap-4 w-fit mx-auto pt-9">
          {rea.link && (
            <Link
              className="group flex items-center font-gothic w-fit border border-transparent rounded-full py-2 px-4 bg-linear-to-r from-react to-vue"
              href={rea.link}
              target="_blank"
            >
              {t.projects.visit}
              <span
                aria-hidden="true"
                className="inline-flex overflow-hidden w-0 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:w-6 group-hover:ml-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:w-6 group-focus-visible:ml-2 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 motion-reduce:transition-none"
              >
                <ArrowRight className="shrink-0" />
              </span>
            </Link>
          )}
          {rea.github && (
            <IconButton label="Github" url={rea.github} icon={<Github />} />
          )}
        </div>
      )}
    </article>
  );
}
