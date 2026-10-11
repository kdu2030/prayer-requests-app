import { PrayerRequestFilterCriteria } from "../../types/prayer-request-types";
import { HOME_BASE_PRAYER_REQUEST_FILTERS } from "./home-constants";

export const getHomePrayerRequestFilterCriteria = (
  pageIndex: number,
  prayerGroupIds: number[],
  userId: number,
): PrayerRequestFilterCriteria => {
  return {
    ...HOME_BASE_PRAYER_REQUEST_FILTERS,
    pageIndex,
    prayerGroupIds,
    excludedCreatorUserIds: [userId],
  };
};
