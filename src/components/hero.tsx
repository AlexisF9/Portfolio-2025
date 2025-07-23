"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const intro = useRef(null);
  const h1Ref = useRef(null);
  const titleRef = useRef(null);
  const title2Ref = useRef(null);
  const pictureRef = useRef(null);
  const subtitleRef = useRef(null);

  const [animationIsOver, setAnimationIsOver] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 1,
        onComplete: () => setAnimationIsOver(true),
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
      {
        opacity: 0,
        clipPath: "inset(0% 0% 100% 0%)",
      },
      {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.8,
        ease: "power2.inOut",
      }
    );

    const elements = gsap.utils.toArray(".test");

    elements.forEach((el) => {
      const t = el as HTMLElement;
      gsap.fromTo(
        t,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.8,
          delay: 1.8,
          ease: "power3.out",
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (animationIsOver) {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          gsap.to(h1Ref.current, {
            maxWidth: "100%",
            y: 50,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: intro.current,
              start: "top top",
              end: "center top",
              scrub: true,
              markers: false,
            },
          });
        },

        //"(max-width: 768px)": () => {
        //  // Tu peux soit ne rien faire, soit reset le style :
        //  gsap.set(home.current, { clearProps: "all" });
        //},
      });
    }
  }, [animationIsOver]);

  return (
    <div
      ref={intro}
      className="h-dvh flex justify-center items-center -ml-4 -mr-4 md:-ml-9 md:-mr-9 overflow-x-hidden"
    >
      <div className="flex flex-col items-center justify-center relative dark:text-white w-full gap-9 md:gap-4 h-[400px] md:h-[60%] md:max-h-[650px] portrait:max-h-[500px]">
        <span className="absolute aspect-[2/3] w-auto h-full opacity-0 test">
          <span
            className={`absolute aspect-[2/3] w-auto h-full scale-[1.2] border border-neutral-900 dark:border-white rounded-full animate-radar1`}
          ></span>
          <span
            className={`absolute aspect-[2/3] w-auto h-full scale-[1.4] border border-neutral-900 dark:border-white rounded-full animate-radar2`}
          ></span>
          <span
            className={`absolute aspect-[2/3] w-auto h-full scale-[1.6] border border-neutral-900 dark:border-white rounded-full animate-radar3`}
          ></span>
        </span>
        <h1
          ref={h1Ref}
          className="absolute -top-8 font-gothic text-fluid flex flex-col text-center md:max-w-[90%] md:w-full leading-none mx-auto uppercase text-white mix-blend-difference z-[1]"
        >
          <span ref={titleRef} className="opacity-[0] md:self-start">
            Alexis
          </span>
          <span ref={title2Ref} className="opacity-[0] md:self-end">
            Flacher
          </span>
        </h1>
        <img
          src={"/Alexis.webp"}
          alt="Photo Alexis Flacher"
          ref={pictureRef}
          className="picture-animation-reset rounded-full aspect-[2/3] w-auto h-full object-cover z-[0]"
        />
        <h2
          ref={subtitleRef}
          className="absolute -bottom-16 opacity-[0] text-xl md:text-2xl text-center z-[1]"
        >
          Développeur Front-end
        </h2>
      </div>
    </div>
  );
}
