"use client";
import gsap from "gsap";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { RefObject, useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import experiences from "@/public/experiences.json";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const title2Ref = useRef(null);
  const pictureRef = useRef(null);
  const subtitleRef = useRef(null);
  const skillsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 1,
      }
    );
    gsap.fromTo(
      title2Ref.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 1,
      }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
      }
    );
    gsap.fromTo(
      pictureRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.3,
      }
    );

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

    if (skillsRef.current.length > 0) {
      gsap.from(skillsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
        },
      });
    }

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
      name: "twig",
      label: "Twig",
    },
    {
      name: "figma",
      label: "Figma",
    },
    {
      name: "styled",
      label: "Styled Component",
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
    <div ref={pageRef}>
      <div className="h-dvh flex justify-center items-center">
        <img
          src={"/Alexis.jpg"}
          alt="Photo Alexis Flacher"
          ref={pictureRef}
          className="opacity-[0] rounded-full absolute aspect-[2/3] w-auto h-[400px] md:h-[65%] md:max-h-[700px] portrait:max-h-[500px] object-cover z-[0] p-4"
        />
        <div className="flex flex-col dark:text-white w-full gap-9 md:gap-4 h-[440px] md:h-[70%] md:max-h-[740px] portrait:max-h-[540px] justify-between">
          <h1 className="font-gothic text-fluid flex flex-col text-center leading-none md:text-start md:grid grid-rows-2 grid-cols-2 mx-auto uppercase text-white mix-blend-difference">
            <span ref={titleRef} className="opacity-[0] justify-self-end">
              Alexis
            </span>
            <span
              ref={title2Ref}
              className="opacity-[0] row-start-2 col-start-2"
            >
              Flacher
            </span>
          </h1>
          <h2 ref={subtitleRef} className="opacity-[0] text-xl text-center">
            Développeur Front-end
          </h2>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <h3 className="translate-anim text-xl md:text-2xl font-gothic dark:text-white mb-9">
            Qui suis-je ?
          </h3>
          <p className="translate-anim dark:text-white">
            Je suis Alexis, j&apos;ai 23 ans et je suis développeur front-end
            depuis 2022. J&apos;ai tout d&apos;abord fait un{" "}
            <span className="font-bold">DUT MMI</span> (Métiers du Multimédia et
            de l&apos;Internet) à Grenoble en 2 ans. A la fin de ce DUT
            j&apos;ai réalisé un stage en tant qu&apos;intégrateur web et
            webdesigner dans l&apos;agence{" "}
            <span className="font-bold">6tematik</span>. Puis je me suis
            spécialisé dans le développement web en faisant la troisième année
            du <span className="font-bold">Bachelor Développeur Web</span> à
            l&apos;école <span className="font-bold">Hetic</span> à Paris, en
            alternance en tant que développeur front-end dans l&apos;agence de
            pub <span className="font-bold">TBWA\Paris</span>.
          </p>
          <div className="opacity-anim flex gap-4 mt-4">
            <Link
              className="block font-gothic w-fit border border-neutral-600 rounded-full p-2 dark:text-white dark:border-white"
              href={"https://www.linkedin.com/in/alexis-flacher-772ba7197/"}
            >
              <Linkedin />
            </Link>
            <Link
              className="block font-gothic w-fit border border-neutral-600 rounded-full p-2 dark:text-white dark:border-white"
              href={"https://github.com/AlexisF9"}
            >
              <Github />
            </Link>
          </div>
        </div>

        <div className="mt-16">
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
                                src={`/images/logo-${techno}.png`}
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

        <div className="mt-16">
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
                  className="flex items-center gap-2"
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
    </div>
  );
}
