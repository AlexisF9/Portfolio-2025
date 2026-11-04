import { getProjectsMetadata, ProjectsPage } from "@/src/views/projects";

export const metadata = getProjectsMetadata("fr");

export default function Page() {
  return <ProjectsPage />;
}
