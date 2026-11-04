import { getNotFoundMetadata, NotFoundView } from "@/src/views/not-found";

export const metadata = getNotFoundMetadata("en");

export default function NotFound() {
  return <NotFoundView lang="en" />;
}
