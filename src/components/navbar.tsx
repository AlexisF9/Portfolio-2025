"use client";
import gsap from "gsap";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [openMenu, setOpenMenu] = useState(false);
  const [hasAlreadyAnimated, setHasAlreadyAnimated] = useState(false);

  const headerRef = useRef(null);
  const linksRef = useRef<(HTMLLIElement | HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const alreadyAnimated = sessionStorage.getItem("fadeAnimated");
    setHasAlreadyAnimated(alreadyAnimated || pathname !== "/" ? true : false);

    if (!alreadyAnimated && pathname === "/" && headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -150 },
        {
          y: 0,
          duration: 1.5,
          delay: 1.5,
          onComplete: () => {
            sessionStorage.setItem("fadeAnimated", "true");
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    //Theme
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");
    setThemeClass(matchMedia.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
      setThemeClass(matchMedia.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handler);

    // Resize
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpenMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      matchMedia.removeEventListener("change", handler);
    };
  }, []);

  const setThemeClass = (t: "dark" | "light") => {
    if (t === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setTheme(t);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setTheme(t);
    }
  };

  useEffect(() => {
    document.documentElement.style.overflow = openMenu ? "hidden" : "inherit";

    if (openMenu) {
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [openMenu]);

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  };

  const links = [
    {
      label: "Accueil",
      link: "/",
    },
    {
      label: "Mes réalisations",
      link: "/mes-realisations",
    },
  ];

  return (
    <nav>
      <div
        ref={headerRef}
        className={`fixed z-[9] top-4 left-[50%] translate-x-[-50%] p-4 border border-neutral-600 dark:border-neutral-300 rounded-full backdrop-blur-md ${
          !hasAlreadyAnimated && "translate-y-[-150px]"
        }`}
      >
        <button
          onClick={() => setOpenMenu(true)}
          className="cursor-pointer text-neutral-950 dark:text-white block md:hidden"
        >
          <Menu />
        </button>
        <div className="hidden md:flex md:items-center md:gap-4">
          <ul className="flex items-center gap-4">
            {links.map((link, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    pathname === link.link
                      ? "text-neutral-500"
                      : "dark:text-white"
                  }`}
                >
                  <Link href={link.link}>{link.label}</Link>
                </li>
              );
            })}
          </ul>
          <button
            onClick={toggleTheme}
            className="cursor-pointer text-neutral-950 dark:text-white"
          >
            <span className="sr-only">
              {theme === "dark" ? "Dark mode" : "Light mode"}
            </span>
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
      <div
        className={`flex md:hidden fixed inset-[0] w-full z-[9] flex-col bg-neutral-200 dark:bg-neutral-800 transition-all duration-300 ease-in-out ${
          openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="cursor-pointer absolute dark:text-white top-4 right-4"
          onClick={() => setOpenMenu(false)}
        >
          <X />
        </button>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              {links.map((link, index) => {
                return (
                  <li
                    key={index}
                    ref={(el) => {
                      linksRef.current[index] = el;
                    }}
                    className={`text-xl ${
                      pathname === link.link
                        ? "text-neutral-500"
                        : "dark:text-white"
                    }`}
                  >
                    <Link href={link.link}>{link.label}</Link>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={toggleTheme}
              ref={(el) => {
                linksRef.current[links.length] = el;
              }}
              className="cursor-pointer text-neutral-950 dark:text-white"
            >
              <span className="sr-only">
                {theme === "dark" ? "Dark mode" : "Light mode"}
              </span>
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
