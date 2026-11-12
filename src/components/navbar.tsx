"use client";
import gsap from "gsap";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { routes, translatePath } from "@/src/i18n/config";
import { useI18n } from "@/src/i18n/i18n-provider";
import { onHeroSequenceEnd } from "./hero-sequence";

export function Navbar() {
  const pathname = usePathname();
  const { lang, t } = useI18n();
  const otherLang = lang === "fr" ? "en" : "fr";
  const isHome = pathname === routes.home[lang];
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [openMenu, setOpenMenu] = useState(false);
  const [hasAlreadyAnimated, setHasAlreadyAnimated] = useState(false);

  const headerRef = useRef(null);
  const linksRef = useRef<
    (HTMLLIElement | HTMLButtonElement | HTMLAnchorElement | null)[]
  >([]);

  useEffect(() => {
    const alreadyAnimated = sessionStorage.getItem("fadeAnimated");
    setHasAlreadyAnimated(alreadyAnimated || !isHome ? true : false);

    if (!alreadyAnimated && isHome && headerRef.current) {
      const header = headerRef.current;
      let tween: gsap.core.Tween | undefined;

      // Desktop : attend la fin des animations du hero, puis part sans délai
      const unsubscribe = onHeroSequenceEnd((waited) => {
        tween = gsap.fromTo(
          header,
          { y: -150 },
          {
            y: 0,
            duration: 1.5,
            delay: waited ? 0 : 1.5,
            onComplete: () => {
              sessionStorage.setItem("fadeAnimated", "true");
            },
          },
        );
      });

      return () => {
        unsubscribe();
        tween?.kill();
      };
    }
  }, []);

  useEffect(() => {
    // Theme
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");
    setThemeClass(matchMedia.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
      setThemeClass(matchMedia.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handler);

    // Resize : le menu mobile se ferme si on repasse en desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
        },
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
      label: t.nav.home,
      link: routes.home[lang],
      active: pathname === routes.home[lang],
    },
    {
      label: t.nav.projects,
      link: routes.projects[lang],
      // Actif aussi sur la page d'un projet
      active: pathname.startsWith(routes.projects[lang]),
    },
  ];

  const langSwitchProps = {
    href: translatePath(pathname, otherLang),
    hrefLang: otherLang,
    lang: otherLang,
    "aria-label": t.nav.switchLang,
  };

  // Libellé de l'action (passer à l'autre thème)
  const themeLabel = theme === "dark" ? t.nav.lightMode : t.nav.darkMode;
  const closeMenuLabel = lang === "fr" ? "Fermer le menu" : "Close menu";

  const logo = (
    <span className="font-gothic text-[15px] text-neutral-950 dark:text-white">
      A·F
    </span>
  );

  // Boutons ronds du header desktop (langue / thème)
  const desktopIconButtonClass =
    "inline-flex items-center justify-center rounded-full cursor-pointer font-bold text-neutral-950 dark:text-white";

  // Bouton rond noir (menu / fermer) de la maquette 1C
  const roundButtonClass =
    "inline-flex items-center justify-center w-11 h-11 rounded-full cursor-pointer bg-neutral-950 text-white dark:bg-white dark:text-neutral-950";

  return (
    <nav aria-label={t.nav.menu}>
      {/* Header : pilule centrée (desktop), barre pleine largeur (mobile) */}
      <div
        ref={headerRef}
        className={`fixed z-[9] top-3 md:top-4 left-[50%] translate-x-[-50%] w-[calc(100%-2rem)] md:w-auto flex items-center justify-between gap-6 py-1.5 pr-1.5 pl-5 md:py-4 md:px-6 border bg-white/80 dark:bg-neutral-900/80 border-neutral-600 dark:border-neutral-300 rounded-full backdrop-blur-sm ${
          !hasAlreadyAnimated && "translate-y-[-150px]"
        }`}
      >
        {logo}

        {/* Desktop */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.link}>
                <Link
                  href={link.link}
                  aria-current={link.active ? "page" : undefined}
                  className={`text-neutral-950 dark:text-white hover:text-vue ${
                    link.active ? "font-bold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <Link {...langSwitchProps} className={desktopIconButtonClass}>
              {t.nav.switchLangShort}
            </Link>
            <button
              onClick={toggleTheme}
              aria-label={themeLabel}
              className={desktopIconButtonClass}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile : bouton menu */}
        <button
          onClick={() => setOpenMenu(true)}
          aria-label={t.nav.menu}
          aria-expanded={openMenu}
          aria-controls="mobile-menu"
          className={`${roundButtonClass} md:hidden`}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu mobile ouvert */}
      <div
        id="mobile-menu"
        inert={!openMenu}
        className={`flex md:hidden fixed inset-0 z-[9] flex-col px-4 pt-3 pb-7 bg-neutral-100 dark:bg-neutral-900 transition-opacity duration-300 ease-in-out ${
          openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between py-1.5 pr-1.5 pl-5 border border-neutral-600 dark:border-neutral-300 rounded-full bg-white dark:bg-neutral-900">
          {logo}
          <button
            onClick={() => setOpenMenu(false)}
            aria-label={closeMenuLabel}
            className={roundButtonClass}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center px-2">
          <ul className="flex flex-col">
            {links.map((link, index) => (
              <li
                key={link.link}
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
                className="border-b last:border-b-0 border-neutral-300 dark:border-neutral-700"
              >
                <Link
                  href={link.link}
                  aria-current={link.active ? "page" : undefined}
                  className="flex items-center justify-between min-h-16 font-gothic text-[22px] text-neutral-950 dark:text-white"
                >
                  {link.label}
                  <span
                    className={`font-inconsolata text-[15px] ${
                      link.active
                        ? "text-vue font-bold"
                        : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Langue + thème */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <Link
              {...langSwitchProps}
              ref={(el) => {
                linksRef.current[links.length] = el;
              }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-neutral-600 dark:border-neutral-300 bg-white dark:bg-neutral-900 font-bold text-neutral-950 dark:text-white"
            >
              {t.nav.switchLangShort}
            </Link>
            <button
              onClick={toggleTheme}
              aria-label={themeLabel}
              ref={(el) => {
                linksRef.current[links.length + 1] = el;
              }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer border border-neutral-600 dark:border-neutral-300 bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
