import * as Yup from "yup";
import { SupportedLanguages, TranslationKey } from "../../types/languages";
import { PrayerRequest } from "../../types/forms/create-prayer-request-form";
import { formatDate } from "../common/format-helpers";
import { isDateStringValid } from "../common/validation-helpers";

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

        return isDateStringValid(languageCode, value);
      })
      .nullable(),
  });
};
