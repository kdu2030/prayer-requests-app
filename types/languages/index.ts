import { englishTranslations } from "../../i18n/en-us";

export enum SupportedLanguages {
  English = "en",
  Chinese = "cn",
}

export type LanguageOption = {
  displayOptionKey: keyof typeof englishTranslations;
  icon: string;
  value: SupportedLanguages;
};
