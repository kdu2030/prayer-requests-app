import { CultureCode } from "../types/languages";

export const formatNumber = (
  value: number,
  cultureCode: CultureCode,
  options?: Intl.NumberFormatOptions
) => {
  const formatter = new Intl.NumberFormat(cultureCode, options);
  return formatter.format(value);
};
