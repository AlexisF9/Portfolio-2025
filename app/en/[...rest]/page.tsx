import { notFound } from "next/navigation";

// Les URLs inconnues sous /en affichent la 404 anglaise (app/en/not-found.tsx)
export default function Page() {
  notFound();
}
