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
    <div ref={intro} className="h-dvh flex justify-center items-center">
      <img
        src={"/Alexis.webp"}
        alt="Photo Alexis Flacher"
        ref={pictureRef}
        className="picture-animation-reset rounded-full absolute aspect-[2/3] w-auto h-[400px] md:h-[65%] md:max-h-[700px] portrait:max-h-[500px] object-cover z-[0] p-4"
      />
      <div className="flex flex-col dark:text-white w-full gap-9 md:gap-4 h-[440px] md:h-[70%] md:max-h-[740px] portrait:max-h-[540px] justify-between">
        <h1
          ref={h1Ref}
          className="font-gothic text-fluid flex flex-col text-center md:max-w-[90%] md:w-full leading-none mx-auto uppercase text-white mix-blend-difference"
        >
          <span ref={titleRef} className="opacity-[0] md:self-start">
            Alexis
          </span>
          <span ref={title2Ref} className="opacity-[0] md:self-end">
            Flacher
          </span>
        </h1>
        <h2 ref={subtitleRef} className="opacity-[0] text-xl text-center">
          Développeur Front-end
        </h2>
      </div>
    </div>
  );
}
