"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import type { Dict } from "./dictionaries";
import { localizePath, splitLocale, type Lang } from "./locales";

interface I18nValue {
  lang: Lang;
  t: Dict;
  /** Localize an internal path for the active language ("/work" → "/de/work"). */
  href: (path: string) => string;
  /** Switch language, remembering the choice so the proxy respects it. */
  switchLang: (next: Lang) => void;
}

const LanguageContext = createContext<I18nValue | null>(null);

// The language comes from the URL (/de, /es, or unprefixed English) and is
// resolved on the server, so the first paint is already in the right language
// and search engines index every locale.
export function LanguageProvider({
  lang,
  dict,
  children,
}: {
  lang: Lang;
  dict: Dict;
  children: ReactNode;
}) {
  const href = useCallback((path: string) => localizePath(path, lang), [lang]);

  const switchLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
      const { path } = splitLocale(window.location.pathname);
      window.location.assign(localizePath(path, next) + window.location.search + window.location.hash);
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, t: dict, href, switchLang }), [lang, dict, href, switchLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
