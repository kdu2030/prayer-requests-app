import * as Yup from "yup";

import { TranslationKey } from "../../types/languages";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

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
