import { CultureCode } from "../types/languages";

export const formatNumber = (
  value: number,
  cultureCode: CultureCode,
  options?: Intl.NumberFormatOptions
) => {
  const formatter = new Intl.NumberFormat(cultureCode, options);
  return formatter.format(value);
};

export const formatDate = (
  value: string,
  cultureCode: CultureCode,
  options?: Intl.DateTimeFormatOptions
) => {
  const formatter = Intl.DateTimeFormat(cultureCode, options);
  return formatter.format(new Date(value));
};
