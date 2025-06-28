import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/src/components/footer";
import LenisScroll from "./lenis-scroll";
import { Navbar } from "@/src/components/navbar";

export const metadata: Metadata = {
  title: "Alexis Flacher - Portfolio",
  description:
    "Bienvenue sur mon portfolio ! Je suis Alexis Flacher, développeur front-end à Grenoble depuis 2022.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.jpg", type: "image/jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 overflow-x-hidden">
        <LenisScroll />
        <Navbar />
        <div className="pr-4 pl-4 md:pr-9 md:pl-9">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
