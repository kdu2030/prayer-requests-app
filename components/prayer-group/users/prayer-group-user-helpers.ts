import { PrayerGroupUserUpdateModel } from "../../../api/put-prayer-group-users";
import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { PrayerGroupUserSummary } from "../../../types/prayer-group-types";

export const normalizeText = (text: string | undefined): string => {
  if (!text) {
    return "";
  }
  return text.toLocaleLowerCase().replaceAll(" ", "");
};

export const mapPrayerGroupUsers = (
  prayerGroupUsers: PrayerGroupUserSummary[]
): PrayerGroupUserUpdateModel[] => {
  return prayerGroupUsers.map((prayerGroupUser) => {
    return {
      userId: prayerGroupUser.userId,
      prayerGroupRole: prayerGroupUser.prayerGroupRole,
    };
  });
};
