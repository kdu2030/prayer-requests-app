import { setNestedObjectValues, useFormikContext } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";

import { usePostPrayerRequest } from "../../../../api/post-prayer-request";
import { useApiDataContext } from "../../../../hooks/use-api-data";
import { useI18N } from "../../../../hooks/use-i18n";
import { mapCreatePrayerRequest } from "../../../../mappers/map-create-prayer-request";
import { DropdownOption } from "../../../../types/inputs/dropdown";
import { usePrayerGroupContext } from "../../prayer-group-context";
import {
  CreatePrayerRequestForm,
  TimeToLiveOption,
} from "../create-prayer-request-types";

export const useExpirationStep = () => {
  const { translate } = useI18N();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [snackbarError, setSnackbarError] = React.useState<
    string | undefined
  >();

  const { validateForm, setTouched, setErrors, touched, values } =
    useFormikContext<CreatePrayerRequestForm>();

  const { userData } = useApiDataContext();
  const { prayerGroupDetails } = usePrayerGroupContext();

  const postPrayerRequest = usePostPrayerRequest();

  const expirationDateOptions: DropdownOption<number>[] = React.useMemo(
    () => [
      {
        label: translate("prayerGroup.request.expirationDate.week", {
          count: 1,
        }),
        value: TimeToLiveOption.OneWeek,
      },
      {
        label: translate("prayerGroup.request.expirationDate.weeks", {
          count: 2,
        }),
        value: TimeToLiveOption.TwoWeeks,
      },
      {
        label: translate("prayerGroup.request.expirationDate.weeks", {
          count: 3,
        }),
        value: TimeToLiveOption.ThreeWeeks,
      },
    ],
    [translate]
  );

  const onSavePrayerRequest = async () => {
    const errors = await validateForm();
    if (!isEmpty(errors)) {
      setErrors(errors);
      setTouched(setNestedObjectValues({ ...errors, ...touched }, true));
      return;
    }

    if (!userData?.userId || !prayerGroupDetails?.prayerGroupId) {
      console.log(userData);
      return;
    }

    const createPrayerRequestForm = mapCreatePrayerRequest(
      userData.userId,
      values
    );

    setIsLoading(true);
    const response = await postPrayerRequest(
      prayerGroupDetails.prayerGroupId,
      createPrayerRequestForm
    );
    setIsLoading(false);

    if (response.isError) {
      setSnackbarError(
        translate("toaster.failed.saveFailure", {
          item: translate("prayerRequest.label"),
        })
      );
      return;
    }

    // TODO: Redirect to prayer request with replace
  };

  return {
    expirationDateOptions,
    onSavePrayerRequest,
    snackbarError,
    isLoading,
    setSnackbarError,
  };
};
