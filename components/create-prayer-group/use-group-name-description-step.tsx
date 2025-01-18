import { setNestedObjectValues, useFormikContext } from "formik";
import { isEmpty, isError } from "lodash";
import * as React from "react";

import { useGetPrayerGroupNameValidation } from "../../api/get-prayer-group-name-validation";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

export const usePrayerGroupDescriptionStep = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isErrorVisible, setIsErrorVisible] = React.useState<boolean>(false);

  const { values, validateForm, touched, setTouched, setErrors } =
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

  const validateGroupName = async (groupName: string) => {
    setIsLoading(true);
    const response = await getPrayerGroupNameValidation(groupName);
    setIsLoading(false);
  };

  const onNext = async () => {
    const isStepValid = await validatePrayerGroupStep();
    if (!isStepValid) {
      return;
    }
  };

  return {
    isErrorVisible,
    setIsErrorVisible,
  };
};
