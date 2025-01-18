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
  const [isErrorVisible, setIsErrorVisible] = React.useState<boolean>(false);

  const { translate } = useI18N();

  const { values, validateForm, touched, setTouched, errors, setErrors } =
    useFormikContext<CreatePrayerGroupForm>();
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
      setIsErrorVisible(true);
      return false;
    }

    const prayerGroupErrors = response.value.errors ?? [];
    if (prayerGroupErrors.includes(PRAYER_GROUP_NAME_EXISTS)) {
      setErrors({
        ...errors,
        groupName: translate("form.validation.unique.error", {
          field: translate("createPrayerGroup.groupNameDescription.groupName"),
        }),
      });
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
    isErrorVisible,
    setIsErrorVisible,
    onNext,
  };
};
