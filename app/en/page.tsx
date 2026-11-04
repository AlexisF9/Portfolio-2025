import { getHomeMetadata, HomePage } from "@/src/views/home";

export const metadata = getHomeMetadata("en");

export default function Page() {
  return <HomePage />;
}
