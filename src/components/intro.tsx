"use client";
import gsap from "gsap";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import experiences from "@/public/experiences.json";
import Image from "next/image";
import { IconButton } from "./icon-button";

gsap.registerPlugin(ScrollTrigger);

export function Intro() {
  const skillsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const elements = gsap.utils.toArray(".translate-anim");

    elements.forEach((el) => {
      const t = el as HTMLElement;
      gsap.fromTo(
        t,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: t,
            start: "top 80%",
          },
        }
      );
    });

    const buttons = gsap.utils.toArray(".opacity-anim");

    buttons.forEach((el) => {
      const t = el as HTMLElement;
      gsap.fromTo(
        t,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: t,
            start: "top 80%",
          },
        }
      );
    });

    gsap.fromTo(
      skillsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const skills = [
    {
      name: "js",
      label: "JavaScript",
    },
    {
      name: "ts",
      label: "TypeScript",
    },
    {
      name: "sass",
      label: "Sass",
    },
    {
      name: "react",
      label: "ReactJs",
    },
    {
      name: "next",
      label: "NextJs",
    },
    {
      name: "vue",
      label: "VueJs",
    },
    {
      name: "stimulus",
      label: "Stimulus",
    },
    {
      name: "tailwind",
      label: "TailwindCSS",
    },
    {
      name: "strapi",
      label: "Strapi",
    },
    {
      name: "gsap",
      label: "GSAP",
    },
    {
      name: "twig",
      label: "Twig",
    },
    {
      name: "figma",
      label: "Figma",
    },
    {
      name: "styled",
      label: "Styled Components",
    },
    {
      name: "storybook",
      label: "Storybook",
    },
    {
      name: "algolia",
      label: "Algolia",
    },
  ];
  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col">
        <h3 className="translate-anim text-xl md:text-2xl font-gothic dark:text-white mb-9">
          Qui suis-je ?
        </h3>
        <p className="translate-anim dark:text-white mb-4">
          Je suis Alexis, j&apos;ai 23 ans et je suis développeur front-end à
          Grenoble depuis 2022. Durant mon parcours j&apos;ai pu travailler sur
          des projets variés allant de la création de site vitrine à des
          applications web complexes. J&apos;ai pu collaborer étroitement avec
          des équipes créatives et techniques où j&apos;ai appris à traduire les
          maquettes visuelles Figma en code propre et fonctionnel et j&apos;ai
          appris à concevoir des interfaces dynamiques et fluides tout en
          respectant les contraintes et les spécifications de chaque projets.
        </p>
        <p className="translate-anim dark:text-white">
          Aujourd&apos;hui, ma maîtrise de l&apos;écosystème JavaScript et des
          technologies front-end indispensables me permettent de concevoir des
          interfaces performantes et accessibles, centrées sur
          l&apos;utilisateur.
        </p>
        <div className="opacity-anim flex gap-4 mt-4">
          <IconButton
            label="Linkedin"
            url="https://www.linkedin.com/in/alexis-flacher-772ba7197/"
            icon={<Linkedin />}
          />
          <IconButton
            label="Github"
            url="https://github.com/AlexisF9"
            icon={<Github />}
          />
        </div>
      </div>

      <div className="mt-20" id="skills">
        <h3 className="translate-anim text-xl md:text-2xl font-gothic dark:text-white mb-9">
          Mes compétences clés
        </h3>
        <ul className="flex flex-wrap items-center gap-4 md:gap-9">
          {skills.map((skill, index) => {
            return (
              <li
                key={index}
                ref={(el) => {
                  skillsRef.current[index] = el;
                }}
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
        </ul>
      </div>

      <div className="mt-20">
        <h3 className="translate-anim text-xl md:text-2xl font-gothic dark:text-white mb-9">
          Mes expériences
        </h3>
        <ul className="flex flex-col gap-4">
          {experiences.map((exp, index) => {
            return (
              <li key={index} className="translate-anim dark:text-white">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-gothic">{exp.company}</h4>
                      <p className="text-sm border px-2 rounded-full">
                        {exp.type}
                      </p>
                    </div>
                    <p>
                      {exp.date} | {exp.loc}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <p>{exp.role}</p>
                    {exp.technos && (
                      <div className="flex items-center gap-2">
                        {exp.technos.map((techno, index) => {
                          return (
                            <Image
                              key={index}
                              src={`/images/logos/logo-${techno}.png`}
                              width={20}
                              height={20}
                              alt={`logo ${techno}`}
                              className="h-[20px] w-auto"
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="opacity-anim flex justify-center mt-20">
        <Link
          className="block font-gothic w-fit border border-transparent rounded-full py-2 px-4 bg-linear-to-r hover:from-transparent hover:to-transparent hover:dark:text-white hover:border-neutral-600 hover:dark:border-white from-react to-vue transition duration-300 ease-in-out"
          href={"./alexis-flacher-cv.pdf"}
          target="_blank"
        >
          Télécharger mon CV
        </Link>
      </div>
    </div>
  );
}
