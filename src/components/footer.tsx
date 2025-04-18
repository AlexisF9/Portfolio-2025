"use client";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Footer() {
  const footerRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, width: "60%" },
      {
        opacity: 1,
        width: "100%",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-fit flex flex-col align-center gap-2 max-w-5xl mx-auto flex items-center justify-center my-20 py-9 px-9 bg-neutral-800 rounded-full dark:bg-transparent border border-transparent dark:border-white"
    >
      <p className="w-max font-gothic text-xl md:text-4xl text-white">
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
