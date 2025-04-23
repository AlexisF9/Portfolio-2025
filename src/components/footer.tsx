import Link from "next/link";

export function Footer() {
  //useEffect(() => {
  //  gsap.fromTo(
  //    footerRef.current,
  //    { width: "40%" },
  //    {
  //      width: "100%",
  //      ease: "power3.out",
  //      scrollTrigger: {
  //        trigger: footerRef.current,
  //        start: "top bottom", // quand le haut entre dans la vue
  //        end: "bottom bottom", // quand le bas atteint le bas de la vue
  //        scrub: true,
  //      },
  //    }
  //  );
  //}, [pathname]);

  return (
    <footer className="flex flex-col align-center gap-2 mx-auto flex items-center justify-center mt-20 py-20 px-9 bg-neutral-800 rounded-t-4xl dark:bg-white">
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
