import { getNotFoundMetadata, NotFoundView } from "@/src/views/not-found";

export const metadata = getNotFoundMetadata("fr");

export default function NotFound() {
  return <NotFoundView lang="fr" />;
}
