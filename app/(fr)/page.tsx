import { getHomeMetadata, HomePage } from "@/src/views/home";

export const metadata = getHomeMetadata("fr");

export default function Page() {
  return <HomePage />;
}
