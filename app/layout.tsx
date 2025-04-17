import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import LenisScroll from "./lenis-scroll";
import { Navbar } from "@/src/components/navbar";

export const metadata: Metadata = {
  title: "Mon portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="max-w-5xl mx-auto pr-9 pl-9 bg-white dark:bg-neutral-900">
        <LenisScroll />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
