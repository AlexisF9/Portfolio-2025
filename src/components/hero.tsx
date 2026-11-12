"use client";

import {
  ArrowRight,
  Calendar,
  CodeXml,
  Github,
  Linkedin,
  PersonStanding,
} from "lucide-react";
import { IconButton } from "./icon-button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { endHeroSequence, startHeroSequence } from "./hero-sequence";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { routes } from "../i18n/config";
import { useI18n } from "../i18n/i18n-provider";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { lang, t } = useI18n();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef(null);
  const disponibilityRef = useRef(null);
  const pictureBackgroundRef = useRef(null);
  const pictureRef = useRef(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const subActionsRef = useRef<HTMLDivElement>(null);

  // Annonce la séquence desktop avant que les autres composants ne lancent
  // leurs animations (les useLayoutEffect passent avant tous les useEffect)
  useLayoutEffect(() => {
    if (
      window.matchMedia(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      ).matches
    ) {
      startHeroSequence();
    }
  }, []);

  useEffect(() => {
    const reveal = { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" };
    const revealed = {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.5,
      ease: "power2.inOut",
    };
    const rise = { opacity: 0, y: 30 };

    // Chaque étape : ce qu'on anime, "at" = son moment de départ dans la
    // timeline desktop, et "mobile" = l'élément observé à l'écran + son
    // moment de départ dans la séquence mobile du chargement.
    const steps: {
      targets: gsap.TweenTarget;
      from: gsap.TweenVars;
      to: gsap.TweenVars;
      at: number;
      mobile: { trigger: Element | null; at: number };
    }[] = [
      {
        targets: pictureBackgroundRef.current,
        from: reveal,
        to: revealed,
        at: 0,
        // Mobile : la photo est sous le texte, elle passe après lui
        mobile: { trigger: pictureRef.current, at: 2.4 },
      },
      {
        targets: pictureRef.current,
        from: reveal,
        to: revealed,
        at: 0.2,
        mobile: { trigger: pictureRef.current, at: 2.6 },
      },
      {
        targets: titleRef.current?.children ?? [],
        from: rise,
        to: {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
        },
        at: 1,
        mobile: { trigger: titleRef.current, at: 0 },
      },
      {
        targets: introRef.current,
        from: rise,
        to: { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        at: 1.6,
        mobile: { trigger: introRef.current, at: 0.6 },
      },
      {
        targets: actionsRef.current?.children ?? [],
        from: rise,
        to: { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out" },
        at: 2,
        mobile: { trigger: actionsRef.current, at: 1 },
      },
      {
        targets: subActionsRef.current?.children ?? [],
        from: rise,
        to: {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
        },
        at: 2.5,
        mobile: { trigger: subActionsRef.current, at: 1.5 },
      },
      {
        targets: disponibilityRef.current,
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.6, ease: "power2.out" },
        at: 3.2,
        // Mobile : en même temps que le titre
        mobile: { trigger: titleRef.current, at: 0 },
      },
    ];

    const mm = gsap.matchMedia();

    // Desktop : la séquence enchaînée au chargement
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline();
        steps.forEach((s) => tl.fromTo(s.targets, s.from, s.to, s.at));

        // Libère les autres animations de la page au moment où démarrent les
        // dernières animations du hero (étiquettes et badge)
        const lastStart = Math.max(...steps.map((s) => s.at));
        tl.call(endHeroSequence, undefined, lastStart);

        // Si la séquence est interrompue (démontage, passage en mobile),
        // on libère quand même les animations en attente
        return () => endHeroSequence();
      },
    );

    // Mobile :
    // - les éléments déjà à l'écran au chargement s'animent à la suite,
    //   dans l'ordre de la séquence (mobile.at), en commençant tout de suite ;
    // - les autres s'animent quand leur déclencheur arrive à l'écran. Ceux
    //   qui partagent un déclencheur gardent leur ordre entre eux (ex. les
    //   étiquettes après la photo), le premier partant sans délai.
    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => {
        const isInView = (el: Element | null) =>
          !!el && el.getBoundingClientRect().top < window.innerHeight * 0.9;

        // Regroupe les étapes : "load" pour celles visibles au chargement,
        // sinon par élément déclencheur
        const groups = new Map<Element | "load", typeof steps>();
        steps.forEach((s) => {
          if (!s.mobile.trigger) return;
          const key = isInView(s.mobile.trigger) ? "load" : s.mobile.trigger;
          groups.set(key, [...(groups.get(key) ?? []), s]);
        });

        groups.forEach((group, key) => {
          const start = Math.min(...group.map((s) => s.mobile.at));
          const tl = gsap.timeline(
            key === "load"
              ? {}
              : {
                  scrollTrigger: { trigger: key, start: "top 90%", once: true },
                },
          );
          group.forEach((s) =>
            tl.fromTo(s.targets, s.from, s.to, s.mobile.at - start),
          );
        });
      },
    );

    // Animations réduites : tout est affiché directement
    mm.add("(prefers-reduced-motion: reduce)", () => {
      steps.forEach((s) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { duration, ease, stagger, ...finalState } = s.to;
        gsap.set(s.targets, finalState);
      });
    });

    return () => mm.revert();
  }, []);

  const hoverArrow = (
    <span
      aria-hidden="true"
      className="inline-flex overflow-hidden w-0 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:w-6 group-hover:ml-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:w-6 group-focus-visible:ml-2 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 motion-reduce:transition-none"
    >
      <ArrowRight className="shrink-0" />
    </span>
  );

  return (
    <div className="flex flex-col md:flex-row gap-20 md:gap-8 items-center mt-26 mb-20 md:mt-34 md:mb-34">
      <div>
        <div
          ref={disponibilityRef}
          className="opacity-0 border rounded-4xl px-3 py-2 w-fit mb-6 dark:border-white"
        >
          <p className="text-sm lg:text-lg flex items-center gap-3 dark:text-white">
            <span className="block w-3 h-3 rounded-2xl bg-vue"></span>
            {t.hero.available}
          </p>
        </div>
        <h1
          ref={titleRef}
          className="flex flex-col *:opacity-0 font-gothic text-3xl lg:text-5xl font-bold uppercase leading-[1.2] dark:text-white"
        >
          {lang === "fr" ? (
            <>
              <span>{t.hero.title1}</span>
              <span className="relative px-2 rounded-xl bg-linear-160 from-react via-vue to-react bg-size-[200%_200%] motion-safe:animate-[gradient-shift_6s_ease-in-out_infinite] text-black w-fit">
                {t.hero.title2}
              </span>
              <span>{t.hero.title3}</span>
              <span>{t.hero.title4}</span>
            </>
          ) : (
            <>
              <span>{t.hero.title1}</span>
              <span>{t.hero.title2}</span>
              <span>{t.hero.title3}</span>
              <span className="relative px-2 rounded-xl bg-linear-160 from-react via-vue to-react bg-size-[200%_200%] motion-safe:animate-[gradient-shift_6s_ease-in-out_infinite] text-black w-fit">
                {t.hero.title4}
              </span>
            </>
          )}
        </h1>
        <p
          ref={introRef}
          className="opacity-0 text-md lg:text-xl mt-8 dark:text-white"
        >
          {t.intro.about1}
        </p>
        <div ref={actionsRef} className="flex flex-wrap gap-4 mt-8 *:opacity-0">
          <Link
            className="group flex items-center font-gothic w-full justify-center md:w-fit border border-transparent rounded-full py-3 px-4 bg-linear-to-r from-react to-vue"
            href={"mailto:alexis.flacher38@gmail.com"}
          >
            {t.hero.talk}
            {hoverArrow}
          </Link>
          <Link
            className="group flex items-center font-gothic w-full justify-center md:w-fit border rounded-full py-3 px-4 border-neutral-600 dark:border-white dark:text-white"
            href={routes.projects[lang]}
          >
            {t.hero.projects}
            {hoverArrow}
          </Link>
        </div>
        <div
          ref={subActionsRef}
          className="flex flex-wrap items-center gap-4 mt-8 *:opacity-0"
        >
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
          <Link
            className="block w-fit rounded-full underline dark:text-white"
            href="https://alexisflacher.fr/AlexisFlacher_CV.pdf"
            target="_blank"
          >
            {t.intro.cv}
          </Link>
        </div>
      </div>

      <div className="relative shrink-0 w-[260px] lg:w-[400px] max-w-full aspect-[3/4] mr-10 ml-10 mb-6">
        <span
          aria-hidden="true"
          ref={pictureBackgroundRef}
          className="opacity-0 absolute inset-0 rounded-t-full bg-linear-160 from-react via-vue to-react bg-size-[200%_200%] motion-safe:animate-[gradient-shift_6s_ease-in-out_infinite] translate-x-2 translate-y-2 lg:translate-x-4 lg:translate-y-4 z-0"
        />
        <Image
          src="/Alexis.webp"
          alt="Portrait d'Alexis Flacher"
          fill
          priority
          sizes="(min-width: 768px) 460px, 100vw"
          className="opacity-0 object-cover object-[50%_30%] rounded-t-full z-0"
          ref={pictureRef}
        />
      </div>
    </div>
  );
}
