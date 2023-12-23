import { LanguageOption, SupportedLanguages } from "../../types/languages";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    displayOptionKey: "language.english.option",
    icon: "🇺🇸",
    value: SupportedLanguages.English,
  },
  {
    displayOptionKey: "language.chinese.option",
    icon: "🇨🇳",
    value: SupportedLanguages.Chinese,
  },
];
