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
import { mapMediaFile } from "./map-media-file";

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
    avatarFile: mapMediaFile(rawPrayerGroupSummary.avatarFile),
  };
};

export const mapPrayerGroupUser = (
  rawPrayerGroupUser: RawPrayerGroupUserSummary
): PrayerGroupUserSummary => {
  return {
    userId: rawPrayerGroupUser.userId,
    image: mapMediaFile(rawPrayerGroupUser.image),
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
    userRole: rawPrayerGroupDetails.userRole,
    admins,
    avatarFile: mapMediaFile(rawPrayerGroupDetails.avatarFile),
    bannerFile: mapMediaFile(rawPrayerGroupDetails.bannerFile),
  };
};

export const mapPrayerGroupSummaryFromPrayerGroupDetails = (
  prayerGroupDetails: RawPrayerGroupDetails
): PrayerGroupSummary => {
  return {
    prayerGroupId: prayerGroupDetails.prayerGroupId,
    groupName: prayerGroupDetails.groupName,
    avatarFile: mapMediaFile(prayerGroupDetails.avatarFile),
  };
};

export const mapPrayerGroupToPutPrayerGroupRequest = (
  prayerGroupDetails: PrayerGroupDetails
): PutPrayerGroupRequest => {
  return {
    groupName: prayerGroupDetails.groupName,
    description: prayerGroupDetails.description,
    rules: prayerGroupDetails.rules,
    imageFileId: prayerGroupDetails.avatarFile?.mediaFileId,
    bannerImageFileId: prayerGroupDetails.bannerFile?.mediaFileId,
  };
};
