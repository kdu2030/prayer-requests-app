import * as Yup from "yup";

import { useI18N } from "../../../../hooks/use-i18n";
import { CreatePrayerRequestForm } from "../create-prayer-request-types";

export const useExpirationStepValidationSchema =
  (): Yup.ObjectSchema<CreatePrayerRequestForm> => {
    const { translate } = useI18N();

    const timeToLiveRequiredError = translate(
      "form.validation.isRequired.error",
      {
        field: translate("prayerGroup.request.visibilityDuration.label"),
      }
    );

    return Yup.object().shape({
      timeToLive: Yup.number().required(timeToLiveRequiredError),
    }) as Yup.ObjectSchema<CreatePrayerRequestForm>;
  };
