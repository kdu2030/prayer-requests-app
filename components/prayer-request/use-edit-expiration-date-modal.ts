import * as React from "react";

import { useI18N } from "../../hooks/use-i18n";
import { DropdownOption } from "../../types/inputs/dropdown";
import { TimeToLiveOption } from "../prayer-group/create-prayer-request/create-prayer-request-types";

export function useEditExpirationDateModal() {
  const { translate } = useI18N();

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

  return {
    expirationDateOptions,
  };
}
