import * as Yup from "yup";

import { TranslationKey } from "../../types/languages";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

export const groupNameValidationSchema = (
  translate: (key: TranslationKey, options?: any) => string
): Yup.ObjectSchema<CreatePrayerGroupForm> => {
  const groupNameRequiredError = translate("form.validation.isRequired.error", {
    field: translate("createPrayerGroup.groupNameDescription.groupName"),
  });

  return Yup.object().shape({
    groupName: Yup.string().required(groupNameRequiredError),
  }) as Yup.ObjectSchema<CreatePrayerGroupForm>;
};
