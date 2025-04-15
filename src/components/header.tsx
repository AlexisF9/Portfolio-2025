"use client";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
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

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  };

  return (
    <nav className="top-4 md:top-9 right-[0] fixed flex w-full justify-center z-[9]">
      <div
        className={`${
          !openMenu ? "backdrop-blur-sm" : "md:backdrop-blur-sm"
        } flex gap-4 p-4 border bg-white/20 border-neutral-600 dark:border-neutral-300 rounded-full`}
      >
        <button
          onClick={() => setOpenMenu(true)}
          className="cursor-pointer text-neutral-950 dark:text-white block md:hidden"
        >
          <Menu />
        </button>

        <div
          className={`${
            openMenu
              ? "fixed inset-[0] bg-white dark:bg-neutral-600 z-[9] md:dark:bg-transparent md:bg-transparent"
              : "hidden md:block"
          } md:relative flex justify-center items-center `}
        >
          <button
            className={`${
              openMenu ? "block" : "hidden"
            } cursor-pointer absolute dark:text-white top-4 right-4 md:hidden`}
            onClick={() => setOpenMenu(false)}
          >
            <X />
          </button>
          <ul
            className={`gap-4 text-neutral-950 dark:text-white h-fit flex flex-col md:flex-row`}
          >
            <li className={`${pathname === "/" && "opacity-[.5]"}`}>
              <Link href={"/"}>Accueil</Link>
            </li>
            <li
              className={`${
                pathname === "/mes-realisations" && "opacity-[.5]"
              }`}
            >
              <Link href={"/mes-realisations"}>Réalisations</Link>
            </li>
          </ul>
        </div>

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
