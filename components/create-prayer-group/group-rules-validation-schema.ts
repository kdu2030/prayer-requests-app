import * as Yup from "yup";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";
import { TranslationKey } from "../../types/languages";

export const groupRulesValidationSchema = (
  translate: (key: TranslationKey, options?: any) => string
): Yup.ObjectSchema<CreatePrayerGroupForm> => {
  const visibilityLevelRequiredError = translate(
    "form.validation.isRequired.error",
    {
      field: translate("createPrayerGroup.visibilityLevel.label"),
    }
  );

  return Yup.object().shape({
    visibilityLevel: Yup.string().required(visibilityLevelRequiredError),
  }) as Yup.ObjectSchema<CreatePrayerGroupForm>;
};
