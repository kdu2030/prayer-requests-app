import { PostCreatePrayerGroupRequest } from "../api/post-prayer-group";
import { CreatePrayerGroupForm } from "../components/create-prayer-group/create-prayer-group-types";
import {
  PrayerGroupSummary,
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
