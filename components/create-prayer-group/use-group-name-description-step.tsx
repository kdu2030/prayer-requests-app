import { setNestedObjectValues, useFormikContext } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";

import { useGetPrayerGroupNameValidation } from "../../api/get-prayer-group-name-validation";
import { useI18N } from "../../hooks/use-i18n";
import {
  CreatePrayerGroupWizardStep,
  PRAYER_GROUP_NAME_EXISTS,
} from "./create-prayer-group-constants";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

export const usePrayerGroupDescriptionStep = (
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [snackbarError, setSnackbarError] = React.useState<
    string | undefined
  >();

  const { translate } = useI18N();

  const {
    values,
    validateForm,
    touched,
    setTouched,
    setFieldTouched,
    setFieldError,
    setErrors,
  } = useFormikContext<CreatePrayerGroupForm>();
  const getPrayerGroupNameValidation = useGetPrayerGroupNameValidation();

  const validatePrayerGroupStep = async (): Promise<boolean> => {
    const errors = await validateForm();
    if (!isEmpty(errors)) {
      setErrors(errors);
      setTouched(setNestedObjectValues({ ...touched, ...errors }, true));
      return false;
    }
    return true;
  };

  const validateGroupName = async (groupName: string): Promise<boolean> => {
    setIsLoading(true);
    const response = await getPrayerGroupNameValidation(groupName);
    setIsLoading(false);

    if (response.isError) {
      setSnackbarError(
        translate("createPrayerGroup.groupNameDescription.validateGroupFailed")
      );
      return false;
    }

    const prayerGroupErrors = response.value.errors ?? [];
    if (prayerGroupErrors.includes(PRAYER_GROUP_NAME_EXISTS)) {
      setFieldError(
        "groupName",
        translate("form.validation.unique.error", {
          field: translate("createPrayerGroup.groupNameDescription.groupName"),
        })
      );

      // We don't want to validate group name again since the error is not part of the validation schema
      setFieldTouched("groupName", true, false);
    }

    return prayerGroupErrors.length === 0;
  };

  const onNext = async () => {
    const isStepValid = await validatePrayerGroupStep();
    if (!isStepValid) {
      return;
    }

    const isGroupNameValid = await validateGroupName(values.groupName!);
    if (!isGroupNameValid) {
      return;
    }

    setWizardStep(CreatePrayerGroupWizardStep.RulesStep);
  };

  return {
    isLoading,
    onNext,
    snackbarError,
    setSnackbarError,
  };
};
