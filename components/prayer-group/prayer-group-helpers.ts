import { JoinStatus } from "../../constants/prayer-group-constants";
import { PrayerGroupSummary } from "../../types/prayer-group-types";

export const addNewPrayerGroupToUserGroups = (
  existingPrayerGroups: PrayerGroupSummary[],
  newPrayerGroup: PrayerGroupSummary,
): PrayerGroupSummary[] => {
  const updatedPrayerGroups = [...existingPrayerGroups];

  const indexToAdd = updatedPrayerGroups.findIndex(
    (prayerGroup) => prayerGroup.joinStatus !== JoinStatus.Joined,
  );

  if (indexToAdd == -1) {
    updatedPrayerGroups.push(newPrayerGroup);
  } else {
    updatedPrayerGroups.splice(indexToAdd, 0, newPrayerGroup);
  }

  return updatedPrayerGroups;
};

export const getJoinedPrayerGroups = (
  prayerGroups: PrayerGroupSummary[],
): PrayerGroupSummary[] => {
  return prayerGroups.filter(
    (prayerGroup) => prayerGroup.joinStatus === JoinStatus.Joined,
  );
};
