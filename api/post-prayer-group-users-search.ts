import { AxiosInstance } from "axios";
import { PrayerGroupRole } from "../constants/prayer-group-constants"
import { SortConfig } from "../types/api-response-types";
import { PrayerGroupUserSummary } from "../types/prayer-group-types";

export type GetPrayerGroupUsersRequest = {
    prayerGroupRoles?: PrayerGroupRole[];
    sortConfig: SortConfig
}

export type GetPrayerGroupUsersResponse = {
    prayerGroupUsers: PrayerGroupUserSummary[]
}

