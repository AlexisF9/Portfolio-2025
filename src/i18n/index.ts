import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { fr, type Dictionary } from "./dictionaries/fr";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

function formatMonth(value: string, lang: Locale) {
  // "2021" → année seule, "2026-06" → "Juin 2026" / "June 2026"
  if (!value.includes("-")) return value;

  const [year, month] = value.split("-").map(Number);
  const label = new Intl.DateTimeFormat(lang, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1)));

  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatPeriod(
  start: string,
  end: string | null,
  lang: Locale,
): string {
  if (start === end) return formatMonth(start, lang);

  const { periodSeparator, present } = getDictionary(lang).intro;
  return `${formatMonth(start, lang)} ${periodSeparator} ${
    end ? formatMonth(end, lang) : present
  }`;
}
