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
  imageId: number | undefined,
  bannerImageId: number | undefined
): PostCreatePrayerGroupRequest => {
  return {
    groupName: createPrayerGroupForm.groupName,
    description: createPrayerGroupForm.description,
    rules: createPrayerGroupForm.rules,
    color: createPrayerGroupForm.color,
    imageFileId: imageId,
    bannerImageFileId: bannerImageId,
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
    imageFile: mapMediaFile(rawPrayerGroupSummary.imageFile),
  };
};

export const mapPrayerGroupUser = (
  rawPrayerGroupUser: RawPrayerGroupUserSummary
): PrayerGroupUserSummary => {
  return {
    userId: rawPrayerGroupUser.id,
    image: mapMediaFile(rawPrayerGroupUser.image),
    fullName: rawPrayerGroupUser.fullName,
    role: rawPrayerGroupUser.role,
  };
};

export const mapPrayerGroupDetails = (
  rawPrayerGroupDetails: RawPrayerGroupDetails
): PrayerGroupDetails => {
  const admins = rawPrayerGroupDetails.admins?.map((admin) =>
    mapPrayerGroupUser(admin)
  );

  return {
    prayerGroupId: rawPrayerGroupDetails.id,
    description: rawPrayerGroupDetails.description,
    groupName: rawPrayerGroupDetails.groupName,
    color: rawPrayerGroupDetails.color,
    rules: rawPrayerGroupDetails.rules,
    isUserJoined: rawPrayerGroupDetails.isUserJoined,
    userRole: rawPrayerGroupDetails.userRole,
    admins,
    imageFile: mapMediaFile(rawPrayerGroupDetails.imageFile),
    bannerImageFile: mapMediaFile(rawPrayerGroupDetails.bannerImageFile),
  };
};

export const mapPrayerGroupSummaryFromPrayerGroupDetails = (
  prayerGroupDetails: RawPrayerGroupDetails
): PrayerGroupSummary => {
  return {
    prayerGroupId: prayerGroupDetails.id,
    groupName: prayerGroupDetails.groupName,
    imageFile: mapMediaFile(prayerGroupDetails.imageFile),
  };
};

export const mapPrayerGroupToPutPrayerGroupRequest = (
  prayerGroupDetails: PrayerGroupDetails
): PutPrayerGroupRequest => {
  return {
    groupName: prayerGroupDetails.groupName,
    description: prayerGroupDetails.description,
    rules: prayerGroupDetails.rules,
    imageFileId: prayerGroupDetails.imageFile?.mediaFileId,
    bannerImageFileId: prayerGroupDetails.bannerImageFile?.mediaFileId,
  };
};
