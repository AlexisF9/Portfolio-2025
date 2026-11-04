import { getRootMetadata, RootShell } from "@/src/components/root-shell";

export const metadata = getRootMetadata("fr");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>;
}
