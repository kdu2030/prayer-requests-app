import { setNestedObjectValues, useFormikContext } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";

import {
  CreatePrayerRequestForm,
  CreatePrayerRequestWizardStep,
} from "../create-prayer-request-types";

export const useRequestBodyStep = (
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerRequestWizardStep>
  >
) => {
  const { validateForm, setTouched, setErrors, touched } =
    useFormikContext<CreatePrayerRequestForm>();

  const onNext = async () => {
    const errors = await validateForm();

    if (!isEmpty(errors)) {
      setErrors(errors);
      setTouched(setNestedObjectValues({ ...touched, ...errors }, true));
      return;
    }

    setWizardStep(CreatePrayerRequestWizardStep.ExpirationStep);
  };

  return {
    onNext,
  };
};
