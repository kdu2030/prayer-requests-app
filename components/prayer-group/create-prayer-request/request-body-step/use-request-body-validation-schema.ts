import * as Yup from "yup";

import { TEXT_INPUT_MAX_LENGTH } from "../../../../constants/input-constants";
import { formatNumber } from "../../../../helpers/formatting-helpers";
import { useI18N } from "../../../../hooks/use-i18n";
import { CultureCode } from "../../../../types/languages";
import { CreatePrayerRequestForm } from "../create-prayer-request-types";

export const useRequestBodyValidationSchema =
  (): Yup.ObjectSchema<CreatePrayerRequestForm> => {
    const { i18n, translate } = useI18N();

    const requestTitleRequired = translate("form.validation.isRequired.error", {
      field: translate("prayerGroup.request.title"),
    });

    const requestTitleMaxLength = translate("form.validation.maxLength", {
      field: translate("prayerGroup.request.title"),
      length: formatNumber(TEXT_INPUT_MAX_LENGTH, i18n.language as CultureCode),
    });

    const requestDescriptionRequired = translate(
      "form.validation.isRequired.error",
      {
        field: translate("createPrayerGroup.groupNameDescription.description"),
      }
    );

    return Yup.object().shape({
      requestTitle: Yup.string()
        .required(requestTitleRequired)
        .max(TEXT_INPUT_MAX_LENGTH, requestTitleMaxLength),
      requestDescription: Yup.string().required(requestDescriptionRequired),
    }) as Yup.ObjectSchema<CreatePrayerRequestForm>;
  };
