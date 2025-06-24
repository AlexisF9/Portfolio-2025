"use client";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footer = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (footer.current) {
      const ytop = footer.current.getBoundingClientRect().top + window.scrollY;
      const ybottom =
        footer.current.getBoundingClientRect().top +
        window.scrollY +
        footer.current.offsetHeight;

      gsap.to(footer.current, {
        maxWidth: "100%",
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          start: `${ytop} bottom`,
          end: `bottom bottom`,
          scrub: true,
          markers: false,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer
      ref={footer}
      className="flex flex-col align-center gap-2 items-center justify-center max-w-[70%] opacity-0 w-full mx-auto mt-20 py-20 px-9 bg-neutral-800 rounded-t-4xl dark:bg-white"
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
