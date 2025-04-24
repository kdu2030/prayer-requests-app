import * as Yup from "yup";

import { TEXT_INPUT_MAX_LENGTH } from "../../constants/input-constants";
import { formatNumber } from "../../helpers/formatting-helpers";
import { CultureCode, TranslationKey } from "../../types/languages";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

export const groupNameValidationSchema = (
  translate: (key: TranslationKey, options?: any) => string,
  cultureCode: CultureCode
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

  const groupNameMaxLength = translate("form.validation.maxLength", {
    field: translate("createPrayerGroup.groupNameDescription.groupName"),
    length: formatNumber(TEXT_INPUT_MAX_LENGTH, cultureCode),
  });

  return Yup.object().shape({
    groupName: Yup.string()
      .trim()
      .required(groupNameRequiredError)
      .max(TEXT_INPUT_MAX_LENGTH, groupNameMaxLength),
    description: Yup.string().trim().required(descriptionRequiredError),
  }) as Yup.ObjectSchema<CreatePrayerGroupForm>;
};
