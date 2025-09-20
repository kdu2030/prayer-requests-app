import { SortOrder } from "../../types/api-response-types";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestSortFields,
} from "../../types/prayer-request-types";

export const DEFAULT_PRAYER_REQUEST_FILTERS: PrayerRequestFilterCriteria = {
  creatorUserIds: [],
  pageIndex: 0,
  pageSize: 10,
  includeExpiredRequests: false,
  sortConfig: {
    sortField: PrayerRequestSortFields.CreatedDate,
    sortDirection: SortOrder.Descending,
  },
};
