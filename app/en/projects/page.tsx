import { getProjectsMetadata, ProjectsPage } from "@/src/views/projects";

export const metadata = getProjectsMetadata("en");

export default function Page() {
  return <ProjectsPage />;
}
