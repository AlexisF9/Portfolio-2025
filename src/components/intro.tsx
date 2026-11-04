"use client";
import gsap from "gsap";
import { Github, Linkedin, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import experiences from "@/public/experiences.json";
import benevolat from "@/public/benevolat.json";
import Image from "next/image";
import { IconButton } from "./icon-button";
import { useI18n } from "@/src/i18n/i18n-provider";
import { formatPeriod } from "@/src/i18n";

gsap.registerPlugin(ScrollTrigger);

export function Intro() {
  const { lang, t } = useI18n();
  const buttonsRef = useRef(null);
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
        },
      );
    });

    const buttons = gsap.utils.toArray(".opacity-anim");

    gsap.fromTo(
      buttons,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: buttonsRef.current,
          start: "top 80%",
        },
      },
    );

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
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const skills = [
    {
      name: "html",
      label: "Html",
    },
    {
      name: "css",
      label: "CSS",
    },
    {
      name: "sass",
      label: "SCSS",
    },
    {
      name: "js",
      label: "JavaScript",
    },
    {
      name: "ts",
      label: "TypeScript",
    },
    {
      name: "react",
      label: "React",
    },
    {
      name: "next",
      label: "Next.js",
    },
    {
      name: "angular",
      label: "Angular",
    },
    {
      name: "vue",
      label: "Vue.js",
    },
    {
      name: "stencil",
      label: "Stencil.js",
    },
    {
      name: "node-js",
      label: "Node.js",
    },
    {
      name: "stimulus",
      label: "Stimulus",
    },
    {
      name: "git",
      label: "Git",
    },
    {
      name: "tailwind",
      label: "TailwindCSS",
    },
    {
      name: "figma",
      label: "Figma",
    },
    {
      name: "wordpress",
      label: "WordPress",
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
      name: "twig",
      label: "Twig",
    },
    {
      name: "strapi",
      label: "Strapi",
    },
  ];

  return (
    <section className="overflow-x-hidden">
      <div className="flex flex-col">
        <h3 className="translate-anim text-xl md:text-2xl font-gothic dark:text-white mb-9">
          {t.intro.aboutTitle}
        </h3>
        <p className="translate-anim dark:text-white mb-4">{t.intro.about1}</p>
        <p className="translate-anim dark:text-white">{t.intro.about2}</p>
        <div ref={buttonsRef} className="flex flex-wrap gap-4 mt-4">
          <div className="opacity-anim">
            <IconButton
              label="Linkedin"
              url="https://www.linkedin.com/in/alexis-flacher-772ba7197/"
              icon={<Linkedin />}
            />
          </div>
          <div className="opacity-anim">
            <IconButton
              label="Github"
              url="https://github.com/AlexisF9"
              icon={<Github />}
            />
          </div>
          <Link
            className="opacity-anim block font-gothic w-fit border border-transparent rounded-full py-2 px-4 bg-linear-to-r hover:from-transparent hover:to-transparent hover:dark:text-white hover:border-neutral-600 hover:dark:border-white from-react to-vue transition-border transition-colors duration-300 ease-in-out"
            href={t.intro.cvUrl}
            target="_blank"
          >
            {t.intro.cv}
          </Link>
        </div>
      </div>

      <div className="mt-20 md:mt-24" id="skills">
        <h3 className="translate-anim text-xl md:text-2xl font-gothic dark:text-white mb-9">
          {t.intro.skillsTitle}
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

      <div className="mt-20 md:mt-24">
        <h3 className="translate-anim text-xl md:text-2xl font-gothic dark:text-white mb-9">
          {t.intro.experiencesTitle}
        </h3>
        <ul className="flex flex-col gap-4">
          {experiences.map((exp, index) => {
            return (
              <li key={index} className="translate-anim dark:text-white">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-gothic">{exp.company}</h4>
                      <p className="text-sm border px-2 rounded-full">
                        {
                          t.intro.experienceTypes[
                            exp.type as keyof typeof t.intro.experienceTypes
                          ]
                        }
                      </p>
                    </div>
                    <p>
                      {formatPeriod(exp.start, exp.end, lang)} | {exp.loc}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <p>{exp.role[lang]}</p>
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

      <div className="mt-20 md:mt-24">
        <h3 className="translate-anim text-xl md:text-2xl font-gothic dark:text-white mb-9">
          {t.intro.volunteeringTitle}
        </h3>
        <ul className="flex flex-col gap-4">
          {benevolat.map((exp, index) => {
            return (
              <li key={index} className="translate-anim dark:text-white">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-gothic">{exp.title[lang]}</h4>
                      {exp.link && (
                        <Link
                          href={`${exp.link}`}
                          aria-label={t.intro.learnMore}
                          target="_blank"
                        >
                          <SquareArrowOutUpRight />
                        </Link>
                      )}
                    </div>
                    <p>
                      {exp.date} | {exp.school}
                    </p>
                  </div>
                  <p>{exp.description[lang]}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
