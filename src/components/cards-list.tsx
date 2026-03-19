import { Card } from "@/src/components/card";
import realisations from "@/public/realisations.json";
import { Realisation } from "@/app/mes-realisations/page";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export function CardsList(props: { filter: string }) {
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      skillsRef.current,
      { opacity: 0, y: 30, webkitFilter: "blur(" + 5 + "px)" },
      {
        opacity: 1,
        y: 0,
        webkitFilter: "blur(" + 0 + "px)",
        stagger: 0.2,
        delay: 1,
        duration: 0.8,
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

  return (
    <>
      {realisations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
          {realisations
            .filter((item) =>
              props.filter !== "all" ? item.type === props.filter : item,
            )
            .map((el: Realisation, index) => {
              return (
                <div
                  key={index}
                  ref={(el) => {
                    skillsRef.current[index] = el;
                  }}
                >
                  <Card card={el} />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
