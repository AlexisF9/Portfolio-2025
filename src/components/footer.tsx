"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footer = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
        gsap.fromTo(
          footer.current,
          { opacity: 0, width: "50%" },
          {
            opacity: 1,
            width: "100%",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footer.current,
              start: "top bottom",
              end: "bottom bottom",
              markers: false,
            },
          }
        );
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer
      ref={footer}
      className="flex flex-col align-center gap-2 items-center justify-center md:opacity-0 w-full mx-auto mt-20 md:mb-8 py-12 px-9 bg-neutral-800 rounded-t-4xl md:rounded-full dark:bg-white"
    >
      <p className="w-max font-gothic text-xl md:text-4xl text-white dark:text-neutral-950">
        Alexis Flacher
      </p>
      <Link
        href={"mailto:alexis.flacher38@gmail.com"}
        className="w-max bg-linear-to-r from-react to-vue inline-block text-transparent bg-clip-text"
      >
        alexis.flacher38@gmail.com
      </Link>
    </footer>
  );
}
