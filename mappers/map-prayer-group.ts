import { PostCreatePrayerGroupRequest } from "../api/post-prayer-group";
import { CreatePrayerGroupForm } from "../components/create-prayer-group/create-prayer-group-types";
import {
  PrayerGroupAdminSummary,
  PrayerGroupDetails,
  PrayerGroupSummary,
  RawPrayerGroupAdminSummary,
  RawPrayerGroupDetails,
  RawPrayerGroupSummary,
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

export const mapPrayerGroupAdmin = (
  rawPrayerGroupAdmin: RawPrayerGroupAdminSummary
): PrayerGroupAdminSummary => {
  return {
    userId: rawPrayerGroupAdmin.id,
    image: mapMediaFile(rawPrayerGroupAdmin.image),
    fullName: rawPrayerGroupAdmin.fullName,
  };
};

export const mapPrayerGroupDetails = (
  rawPrayerGroupDetails: RawPrayerGroupDetails
): PrayerGroupDetails => {
  const admins = rawPrayerGroupDetails.admins?.map((admin) =>
    mapPrayerGroupAdmin(admin)
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
