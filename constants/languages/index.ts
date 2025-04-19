import { LanguageOption, CultureCode } from "../../types/languages";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    displayOptionKey: "language.english.option",
    icon: "🇺🇸",
    value: CultureCode.English,
  },
  {
    displayOptionKey: "language.chinese.option",
    icon: "🇨🇳",
    value: CultureCode.Chinese,
  },
];

export const LANGUAGE_STORAGE_KEY = "prayerRequestsApp.language";
