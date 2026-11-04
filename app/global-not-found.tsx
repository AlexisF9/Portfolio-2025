import { RootShell } from "@/src/components/root-shell";
import { getNotFoundMetadata, NotFoundView } from "@/src/views/not-found";

// Plusieurs layouts racines (fr / en) : la 404 des URLs inconnues est définie ici
export const metadata = getNotFoundMetadata("fr");

export default function GlobalNotFound() {
  return (
    <RootShell lang="fr">
      <NotFoundView lang="fr" />
    </RootShell>
  );
}
