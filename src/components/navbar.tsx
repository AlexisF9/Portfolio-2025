"use client";
import { Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
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
      <div className="fixed z-[9] p-4 border bg-white/20 border-neutral-600 dark:border-neutral-300 rounded-full backdrop-blur-sm">
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
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
      <div
        className={`flex md:hidden fixed inset-[0] w-full z-[9] flex-col bg-red-600 transition-all duration-300 ease-in-out ${
          openMenu
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[100%] pointer-events-none"
        }`}
      >
        <ul>
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
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  );
}
