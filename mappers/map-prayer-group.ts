import { PostCreatePrayerGroupRequest } from "../api/post-prayer-group";
import { CreatePrayerGroupForm } from "../components/create-prayer-group/create-prayer-group-types";

export const mapCreatePrayerGroupRequest = (
  createPrayerGroupForm: CreatePrayerGroupForm,
  imageId: number | undefined
): PostCreatePrayerGroupRequest => {
  return {
    groupName: createPrayerGroupForm.groupName,
    description: createPrayerGroupForm.description,
    rules: createPrayerGroupForm.rules,
    color: createPrayerGroupForm.color,
    imageFileId: imageId,
  };
};
