import * as Yup from "yup";

import { TranslationKey } from "../../../types/languages";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";

export const prayerGroupDetailsValidationSchema = (
  translate: (key: TranslationKey, args?: object) => string
): Yup.ObjectSchema<PrayerGroupDetails> => {
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
    groupName: Yup.string().required(groupNameRequiredError),
    description: Yup.string().required(descriptionRequiredError),
  }) as Yup.ObjectSchema<PrayerGroupDetails>;
};
