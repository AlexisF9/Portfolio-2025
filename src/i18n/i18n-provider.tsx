"use client";
import { createContext, ReactNode, useContext } from "react";
import { defaultLocale, Locale } from "./config";
import { getDictionary } from ".";

const I18nContext = createContext<Locale>(defaultLocale);

export function I18nProvider(props: { lang: Locale; children: ReactNode }) {
  return (
    <I18nContext.Provider value={props.lang}>
      {props.children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const lang = useContext(I18nContext);
  return { lang, t: getDictionary(lang) };
}
