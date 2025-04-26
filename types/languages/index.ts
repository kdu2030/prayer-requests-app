import { englishTranslations } from "../../i18n/en-us";

export type TranslationKey = keyof typeof englishTranslations;

export enum CultureCode {
  enUS = "en-US",
  zhCN = "zh-CN",
}

export type LanguageOption = {
  displayOptionKey: TranslationKey;
  icon: string;
  value: CultureCode;
};
