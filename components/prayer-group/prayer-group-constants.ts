import { SortOrder } from "../../types/api-response-types";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestMetadata,
  PrayerRequestSortFields,
} from "../../types/prayer-request-types";

export const DEFAULT_PRAYER_REQUEST_FILTERS: PrayerRequestFilterCriteria = {
  pageIndex: 0,
  pageSize: 3,
  includeExpiredPrayerRequests: false,
  sortConfig: {
    sortField: PrayerRequestSortFields.CreatedDate,
    sortDirection: SortOrder.Descending,
  },
};

export const DEFAULT_PRAYER_REQUEST_METADATA: PrayerRequestMetadata = {
  numberOfPages: 0,
  totalCount: 0,
  pageIndex: 0,
};
