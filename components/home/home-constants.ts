import { SortOrder } from "../../types/api-response-types";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestSortFields,
} from "../../types/prayer-request-types";

export const HOME_BASE_PRAYER_REQUEST_FILTERS: PrayerRequestFilterCriteria = {
  pageSize: 10,
  sortConfig: {
    sortField: PrayerRequestSortFields.CreatedDate,
    sortDirection: SortOrder.Descending,
  },
};
