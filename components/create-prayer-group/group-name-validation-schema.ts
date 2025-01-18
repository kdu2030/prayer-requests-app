import * as Yup from "yup";

import { TranslationKey } from "../../types/languages";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

export const groupNameValidationSchema = (
  translate: (key: TranslationKey, options?: any) => string
): Yup.ObjectSchema<CreatePrayerGroupForm> => {
  const groupNameRequiredError = translate("form.validation.isRequired.error", {
    field: translate("createPrayerGroup.groupNameDescription.groupName"),
  });

  const descriptionRequiredError = translate(
    "form.validation.isRequired.error",
    {
      field: translate("createPrayerGroup.groupNameDescription.description"),
    }
  );

  return Yup.object().shape({
    groupName: Yup.string().trim().required(groupNameRequiredError),
    description: Yup.string().trim().required(descriptionRequiredError),
  }) as Yup.ObjectSchema<CreatePrayerGroupForm>;
};
