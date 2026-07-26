import { PostCreatePrayerGroupRequest } from "../api/post-prayer-group";
import { PutPrayerGroupRequest } from "../api/put-prayer-group";
import { CreatePrayerGroupForm } from "../components/create-prayer-group/create-prayer-group-types";
import { JoinStatus } from "../constants/prayer-group-constants";
import {
  PrayerGroupDetails,
  PrayerGroupSummary,
} from "../types/prayer-group-types";

export const mapCreatePrayerGroupRequest = (
  createPrayerGroupForm: CreatePrayerGroupForm,
  avatarFileId: number | undefined,
  bannerFileId: number | undefined,
): PostCreatePrayerGroupRequest => {
  return {
    groupName: createPrayerGroupForm.groupName,
    description: createPrayerGroupForm.description,
    rules: createPrayerGroupForm.rules,
    visibilityLevel: createPrayerGroupForm.visibilityLevel,
    avatarFileId: avatarFileId,
    bannerFileId: bannerFileId,
  };
};

export const mapPrayerGroupSummaryFromPrayerGroupDetails = (
  prayerGroupDetails: PrayerGroupDetails,
): PrayerGroupSummary => {
  return {
    prayerGroupId: prayerGroupDetails.prayerGroupId,
    groupName: prayerGroupDetails.groupName,
    avatarFile: prayerGroupDetails.avatarFile,
    joinStatus: prayerGroupDetails.userJoinStatus,
    addedDate:
      prayerGroupDetails.userJoinStatus === JoinStatus.RequestSubmitted
        ? prayerGroupDetails.userRequestSubmittedDate
        : prayerGroupDetails.userJoinDate,
  };
};

export const sortPrayerGroupSummaries = (
  prayerGroupSummaries: PrayerGroupSummary[],
): PrayerGroupSummary[] => {
  const sortedPrayerGroups = [...prayerGroupSummaries];

  sortedPrayerGroups.sort((prayerGroupA, prayerGroupB) => {
    const joinStatusA = prayerGroupA.joinStatus ?? JoinStatus.NotJoined;
    const joinStatusB = prayerGroupB.joinStatus ?? JoinStatus.NotJoined;

    if (
      joinStatusA === JoinStatus.Joined &&
      joinStatusB !== JoinStatus.Joined
    ) {
      return -1;
    }

    if (
      joinStatusB === JoinStatus.Joined &&
      joinStatusA !== JoinStatus.Joined
    ) {
      return 1;
    }

    const addedDateA = prayerGroupA.addedDate
      ? new Date(prayerGroupA.addedDate)
      : undefined;
    const addedDateB = prayerGroupB.addedDate
      ? new Date(prayerGroupB.addedDate)
      : undefined;

    if (addedDateA && !addedDateB) {
      return -1;
    }

    if (!addedDateA && addedDateB) {
      return 1;
    }

    return (addedDateA?.getDate() ?? 0) - (addedDateB?.getDate() ?? 0);
  });

  return sortedPrayerGroups;
};

export const mapPrayerGroupToPutPrayerGroupRequest = (
  prayerGroupDetails: PrayerGroupDetails,
): PutPrayerGroupRequest => {
  return {
    groupName: prayerGroupDetails.groupName,
    description: prayerGroupDetails.description,
    rules: prayerGroupDetails.rules,
    avatarFileId: prayerGroupDetails.avatarFile?.mediaFileId,
    bannerFileId: prayerGroupDetails.bannerFile?.mediaFileId,
    visibilityLevel: prayerGroupDetails.visibilityLevel,
  };
};
