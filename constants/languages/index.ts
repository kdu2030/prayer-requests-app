import { CultureCode, LanguageOption } from "../../types/languages";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    displayOptionKey: "language.english.option",
    icon: "🇺🇸",
    value: CultureCode.enUS,
  },
  {
    displayOptionKey: "language.chinese.option",
    icon: "🇨🇳",
    value: CultureCode.zhCN,
  },
];

export const CULTURE_CODES = [CultureCode.enUS, CultureCode.zhCN];

export const LANGUAGE_STORAGE_KEY = "prayerRequestsApp.language";
