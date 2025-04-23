"use client";
import gsap from "gsap";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">();
  const [openMenu, setOpenMenu] = useState(false);
  const [hasAlreadyAnimated, setHasAlreadyAnimated] = useState(false);

  const headerRef = useRef(null);

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
          delay: 2,
          onComplete: () => {
            sessionStorage.setItem("fadeAnimated", "true");
          },
        }
      );
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpenMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = openMenu ? "hidden" : "inherit";
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
        className={`fixed z-[9] top-4 left-[50%] translate-x-[-50%] p-4 border bg-neutral-600/20 dark:bg-white/20 border-neutral-600 dark:border-neutral-300 rounded-full backdrop-blur-sm ${
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
                    pathname === link.link && "opacity-[.5]"
                  } dark:text-white`}
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
          openMenu
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[100%] pointer-events-none"
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
                    className={`text-xl ${
                      pathname === link.link && "opacity-[.5]"
                    } dark:text-white`}
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
      </div>
    </nav>
  );
}
