import {
  getProjectMetadata,
  getProjectStaticParams,
  ProjectDetailsPage,
  ProjectParams,
} from "@/src/views/project-details";

export const generateStaticParams = getProjectStaticParams;

export function generateMetadata(props: ProjectParams) {
  return getProjectMetadata("en", props);
}

export default function Page(props: ProjectParams) {
  return <ProjectDetailsPage {...props} />;
}
