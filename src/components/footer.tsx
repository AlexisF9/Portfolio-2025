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
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-fit flex flex-col align-center gap-2 mx-auto flex items-center justify-center mt-20 py-20 px-9 bg-neutral-800 rounded-t-4xl dark:bg-white"
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
