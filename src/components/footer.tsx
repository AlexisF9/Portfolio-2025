"use client";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Footer() {
  const footerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !hasAnimated) {
          gsap.fromTo(
            footerRef.current,
            { opacity: 0, width: "60%" },
            {
              opacity: 1,
              width: "100%",
              duration: 1.5,
              ease: "power3.out",
            }
          );

          setHasAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Commence à 20% visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <footer
      ref={footerRef}
      className="opacity-[0] w-[60%] flex flex-col align-center gap-2 mx-auto flex items-center justify-center mt-20 py-20 px-9 bg-neutral-800 rounded-t-4xl dark:bg-white"
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
