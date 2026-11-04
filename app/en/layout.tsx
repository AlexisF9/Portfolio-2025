import { getRootMetadata, RootShell } from "@/src/components/root-shell";

export const metadata = getRootMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
