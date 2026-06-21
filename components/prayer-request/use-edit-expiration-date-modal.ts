import * as React from "react";

import { formatDate } from "../../helpers/formatting-helpers";
import { useI18N } from "../../hooks/use-i18n";
import { DropdownOption } from "../../types/inputs/dropdown";
import { CultureCode } from "../../types/languages";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { TimeToLiveOption } from "../prayer-group/create-prayer-request/create-prayer-request-types";
import { EditExpirationDateForm } from "./prayer-request-types";

export function useEditExpirationDateModal(prayerRequest: PrayerRequestModel) {
  const { translate, i18n } = useI18N();

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
    [translate],
  );

  const getUpdatedExpirationDate = (values: EditExpirationDateForm): string => {
    if (!prayerRequest.expirationDate) {
      return "";
    }

    const additionalDays = values.timeToLive ?? 0;
    const updatedExpirationDate = new Date(prayerRequest.expirationDate);

    updatedExpirationDate.setDate(
      updatedExpirationDate.getDate() + additionalDays,
    );

    return formatDate(
      updatedExpirationDate.toISOString(),
      i18n.language as CultureCode,
    );
  };

  return {
    expirationDateOptions,
    getUpdatedExpirationDate,
  };
}
