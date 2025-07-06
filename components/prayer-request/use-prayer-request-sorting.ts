import * as React from "react";

import { useI18N } from "../../hooks/use-i18n";
import { DropdownOption } from "../../types/inputs/dropdown";
import { PrayerRequestSortFields } from "../../types/prayer-request-types";

export const usePrayerRequestSorting = () => {
  const { translate } = useI18N();

  const sortFieldOptions: DropdownOption<string>[] = React.useMemo(
    () => [
      {
        label: translate("prayerRequest.sorting.createdDate"),
        value: PrayerRequestSortFields.CreatedDate,
      },
      {
        label: translate("prayerRequest.sorting.likeCount"),
        value: PrayerRequestSortFields.LikeCount,
      },
      {
        label: translate("prayerRequest.sorting.commentCount"),
        value: PrayerRequestSortFields.CommentCount,
      },
      {
        label: translate("prayerRequqest.sorting.prayerCount"),
        value: PrayerRequestSortFields.PrayedCount,
      },
    ],
    [translate]
  );

  return {
    sortFieldOptions,
  };
};
