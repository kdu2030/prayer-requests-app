import { GetPrayerGroupUsersRequest } from "../../../api/post-prayer-group-users-query";
import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { SortOrder } from "../../../types/api-response-types";

export const PRAYER_GROUP_USERS_QUERY: GetPrayerGroupUsersRequest = {
  prayerGroupRoles: [PrayerGroupRole.Admin, PrayerGroupRole.Member],
  sortConfig: {
    sortField: "USERNAME",
    sortOrder: SortOrder.Ascending,
  },
};
