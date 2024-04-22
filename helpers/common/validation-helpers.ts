import { DATE_INPUT_FORMAT_OPTIONS } from "../../constants/common/input-constants";
import { SupportedLanguages } from "../../types/languages";
import { formatDate } from "./format-helpers";

export const isDateStringValid = (
  languageCode: SupportedLanguages,
  dateStr?: string
) => {
  if (!dateStr) {
    return true;
  }

  const validationDate = formatDate(
    new Date("1970-01-01"),
    languageCode,
    DATE_INPUT_FORMAT_OPTIONS
  );

  const validationDateParts = validationDate.split("/");
  const dateStrParts = dateStr.split("/");

  return validationDateParts.length === dateStrParts.length;
};
