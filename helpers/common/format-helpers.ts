import { SupportedLanguages } from "../../types/languages";

export const formatDate = (
  date: Date,
  language: SupportedLanguages,
  options?: Intl.DateTimeFormatOptions
) => {
  const dateFormat = new Intl.DateTimeFormat(language, options);
  return dateFormat.format(date);
};
