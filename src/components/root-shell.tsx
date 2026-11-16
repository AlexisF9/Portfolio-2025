import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { Footer } from "@/src/components/footer";
import LenisScroll from "@/app/lenis-scroll";
import { Navbar } from "@/src/components/navbar";
import { Locale, routes, siteUrl } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n";
import { I18nProvider } from "@/src/i18n/i18n-provider";

// Polices auto-hébergées en woff2 (sous-ensemble latin) : préchargées par
// Next.js, avec font-display: swap pour afficher le texte sans attendre
const inconsolata = localFont({
  src: "../fonts/inconsolata.woff2",
  weight: "200 900",
  display: "swap",
  variable: "--font-inconsolata-src",
  fallback: ["monospace"],
});

const specialGothic = localFont({
  src: "../fonts/special-gothic-expanded-one.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-gothic-src",
  fallback: ["sans-serif"],
});

// Image de partage par défaut (toutes les pages sauf le détail d'un projet)
const defaultOgImage = "/Alexis.webp";

// Open Graph complet d'une page : Next.js remplace l'objet openGraph du
// layout au lieu de le fusionner, d'où la reprise de tous les champs
export function getOpenGraph(
  lang: Locale,
  page: {
    title: string;
    description: string;
    path: string;
    image?: string;
  },
): Metadata["openGraph"] {
  const t = getDictionary(lang).meta;

  return {
    title: page.title,
    description: page.description,
    url: `${siteUrl}${page.path}`,
    images: `${siteUrl}${page.image ?? defaultOgImage}`,
    siteName: "Alexis Flacher",
    type: "website",
    locale: t.ogLocale,
    alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
  };
}

export function getRootMetadata(lang: Locale): Metadata {
  const t = getDictionary(lang).meta;

  return {
    metadataBase: new URL(siteUrl),
    title: t.siteTitle,
    description: t.description,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.jpg", type: "image/jpg" },
      ],
    },
    keywords: t.keywords,
    authors: [{ name: "Alexis Flacher" }],
    creator: "Alexis Flacher",
    openGraph: getOpenGraph(lang, {
      title: t.ogTitle,
      description: t.ogDescription,
      path: routes.home[lang],
    }),
  };
}

export function RootShell({
  lang,
  children,
}: Readonly<{
  lang: Locale;
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={lang}
      className={`${inconsolata.variable} ${specialGothic.variable}`}
    >
      <body className="bg-white dark:bg-neutral-900 overflow-x-hidden">
        <I18nProvider lang={lang}>
          <LenisScroll />
          <Navbar />
          <main>{children}</main>
          <Footer lang={lang} />
        </I18nProvider>
      </body>
    </html>
  );
}
