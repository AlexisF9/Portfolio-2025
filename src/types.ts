import type { Localized } from "./i18n/config";

export interface Realisation {
  id: number;
  name: string;
  title: string;
  pictures: string[];
  description: Localized;
  shortDescription: Localized;
  mainTechnos: { name: string; label: string }[];
  technos: { name: string; label: string }[];
  type: string;
  date: string;
  link: string | null;
  github: string | null;
}
