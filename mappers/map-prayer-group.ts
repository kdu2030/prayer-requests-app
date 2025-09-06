import { PostCreatePrayerGroupRequest } from "../api/post-prayer-group";
import { PutPrayerGroupRequest } from "../api/put-prayer-group";
import { CreatePrayerGroupForm } from "../components/create-prayer-group/create-prayer-group-types";
import {
  PrayerGroupDetails,
  PrayerGroupSummary,
  PrayerGroupUserSummary,
  RawPrayerGroupDetails,
  RawPrayerGroupSummary,
  RawPrayerGroupUserSummary,
} from "../types/prayer-group-types";

export const mapCreatePrayerGroupRequest = (
  createPrayerGroupForm: CreatePrayerGroupForm,
  avatarFileId: number | undefined,
  bannerFileId: number | undefined
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

export const mapPrayerGroupSummary = (
  rawPrayerGroupSummary: RawPrayerGroupSummary | undefined
): PrayerGroupSummary | undefined => {
  if (!rawPrayerGroupSummary) {
    return;
  }

  return {
    ...rawPrayerGroupSummary,
    prayerGroupId: rawPrayerGroupSummary.id,
    avatarFile: rawPrayerGroupSummary.avatarFile,
  };
};

export const mapPrayerGroupUser = (
  rawPrayerGroupUser: RawPrayerGroupUserSummary
): PrayerGroupUserSummary => {
  return {
    userId: rawPrayerGroupUser.userId,
    image: rawPrayerGroupUser.image,
    fullName: rawPrayerGroupUser.fullName,
    username: rawPrayerGroupUser.username,
    prayerGroupRole: rawPrayerGroupUser.prayerGroupRole,
  };
};

export const mapPrayerGroupDetails = (
  rawPrayerGroupDetails: RawPrayerGroupDetails
): PrayerGroupDetails => {
  const admins = rawPrayerGroupDetails.admins?.map((admin) =>
    mapPrayerGroupUser(admin)
  );

  return {
    prayerGroupId: rawPrayerGroupDetails.prayerGroupId,
    description: rawPrayerGroupDetails.description,
    groupName: rawPrayerGroupDetails.groupName,
    rules: rawPrayerGroupDetails.rules,
    userJoinStatus: rawPrayerGroupDetails.userJoinStatus,
    prayerGroupRole: rawPrayerGroupDetails.prayerGroupRole,
    admins,
    avatarFile: rawPrayerGroupDetails.avatarFile,
    bannerFile: rawPrayerGroupDetails.bannerFile,
  };
};

export const mapPrayerGroupSummaryFromPrayerGroupDetails = (
  prayerGroupDetails: PrayerGroupDetails
): PrayerGroupSummary => {
  return {
    prayerGroupId: prayerGroupDetails.prayerGroupId,
    groupName: prayerGroupDetails.groupName,
    avatarFile: prayerGroupDetails.avatarFile,
  };
};

export const mapPrayerGroupToPutPrayerGroupRequest = (
  prayerGroupDetails: PrayerGroupDetails
): PutPrayerGroupRequest => {
  return {
    groupName: prayerGroupDetails.groupName,
    description: prayerGroupDetails.description,
    rules: prayerGroupDetails.rules,
    avatarFileId: prayerGroupDetails.avatarFile?.mediaFileId,
    bannerFileId: prayerGroupDetails.bannerFile?.mediaFileId,
  };
};
