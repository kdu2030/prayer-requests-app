import { SupportedLanguages } from "../types/languages";

export const formatNumber = (
  value: number,
  cultureCode: SupportedLanguages,
  options?: Intl.NumberFormatOptions
) => {
  const formatter = new Intl.NumberFormat(cultureCode, options);
  return formatter.format(value);
};
