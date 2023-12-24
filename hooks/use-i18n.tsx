import * as React from "react";
import { useTranslation } from "react-i18next";
import { englishTranslations } from "../i18n/en-us";
import { TranslationKey } from "../types/languages";
import { SupportedLanguages } from "../types/languages";

export function useI18N() {
  const resources = useTranslation();

  function translate(key: TranslationKey): string {
    // This wrapper is for typing purposes
    return resources.t(key);
  }

  async function setLanguage(language: SupportedLanguages) {
    await resources.i18n.changeLanguage(language);
  }

  return {
    ...resources,
    setLanguage,
    translate,
  };
}
