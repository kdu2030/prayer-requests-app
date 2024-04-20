import { englishTranslations } from "../../i18n/en-us";

export type TranslationKey = keyof typeof englishTranslations;

export enum SupportedLanguages {
  English = "en",
  Chinese = "zh",
}

export type LanguageOption = {
  displayOptionKey: TranslationKey;
  icon: string;
  value: SupportedLanguages;
};
