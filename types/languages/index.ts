import { englishTranslations } from "../../i18n/en-us";

export type TranslationKey = keyof typeof englishTranslations;

export enum CultureCode {
  English = "en",
  Chinese = "cn",
}

export type LanguageOption = {
  displayOptionKey: TranslationKey;
  icon: string;
  value: CultureCode;
};
