import * as React from "react";

import { useI18N } from "../../hooks/use-i18n";
import { DropdownOption } from "../../types/inputs/dropdown";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestSortFields,
} from "../../types/prayer-request-types";

export const usePrayerRequestSorting = (
  initialFilterCriteria: PrayerRequestFilterCriteria,
  setIsSortingOpen: (isOpen: boolean) => void,
  onUpdateFilters: (filterCriteria: PrayerRequestFilterCriteria) => void
) => {
  const [filterCriteria, setFilterCriteria] =
    React.useState<PrayerRequestFilterCriteria>(initialFilterCriteria);

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
        label: translate("prayerRequest.sorting.prayerCount"),
        value: PrayerRequestSortFields.PrayedCount,
      },
    ],
    [translate]
  );

  const updateSortField = (value: PrayerRequestSortFields) => {
    setFilterCriteria((filterCriteria) => ({
      ...filterCriteria,
      sortConfig: {
        ...filterCriteria.sortConfig,
        sortField: value as PrayerRequestSortFields,
      },
    }));
  };

  const updateSortOrder = (value: string) => {
    setFilterCriteria((filterCriteria) => ({
      ...filterCriteria,
      sortConfig: {
        ...filterCriteria.sortConfig,
        sortOrder: +value,
      },
    }));
  };

  const handleFilterUpdate = () => {
    setIsSortingOpen(false);
    onUpdateFilters({ ...filterCriteria, pageIndex: 0 });
  };

  return {
    sortFieldOptions,
    filterCriteria,
    setFilterCriteria,
    updateSortField,
    updateSortOrder,
    handleFilterUpdate,
  };
};
