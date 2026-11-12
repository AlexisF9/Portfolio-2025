import type { Metadata } from "next";
import "@/app/globals.css";
import { Footer } from "@/src/components/footer";
import LenisScroll from "@/app/lenis-scroll";
import { Navbar } from "@/src/components/navbar";
import { Locale, routes, siteUrl } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n";
import { I18nProvider } from "@/src/i18n/i18n-provider";

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
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      images: `${siteUrl}/Alexis.webp`,
      url: `${siteUrl}${routes.home[lang]}`,
      type: "website",
      locale: t.ogLocale,
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
    },
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
    <html lang={lang}>
      <body className="max-w-7xl mx-auto bg-white dark:bg-neutral-900 overflow-x-hidden">
        <I18nProvider lang={lang}>
          <LenisScroll />
          <Navbar />
          <main className="pr-4 pl-4 md:pr-9 md:pl-9">{children}</main>
          <Footer lang={lang} />
        </I18nProvider>
      </body>
    </html>
  );
}
