import { setNestedObjectValues, useFormikContext } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";

import { useI18N } from "../../../../hooks/use-i18n";
import { DropdownOption } from "../../../../types/inputs/dropdown";
import {
  CreatePrayerRequestForm,
  TimeToLiveOption,
} from "../create-prayer-request-types";

export const useExpirationStep = () => {
  const { translate } = useI18N();
  const { validateForm, setTouched, setErrors, touched } =
    useFormikContext<CreatePrayerRequestForm>();

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
  };

  return {
    expirationDateOptions,
    onSavePrayerRequest,
  };
};
