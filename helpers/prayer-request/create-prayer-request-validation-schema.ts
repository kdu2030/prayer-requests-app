import * as Yup from "yup";
import { SupportedLanguages, TranslationKey } from "../../types/languages";
import { PrayerRequest } from "../../types/forms/create-prayer-request-form";
import { formatDate } from "../common/format-helpers";

export const createPrayerRequestValidationSchema = (
  translate: (key: TranslationKey) => void,
  languageCode: SupportedLanguages
) => {
  return Yup.object().shape({
    expiryDate: Yup.date().nullable(),
    expiryDateStr: Yup.string()
      .test("isDateValid", "Invalid date", (value, context) => {
        if (!value) {
          return true;
        }
        const formValues = context.options.context as PrayerRequest;
        const dateValue = formValues.expiryDate;

        const dateFormatOptions: Intl.DateTimeFormatOptions = {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        };

        console.log(value);
        console.log(
          dateValue && formatDate(dateValue, languageCode, dateFormatOptions)
        );

        if (!dateValue && value) {
          return false;
        } else if (!dateValue) {
          return true;
        }

        return value === formatDate(dateValue, languageCode, dateFormatOptions);
      })
      .nullable(),
  });
};
