import { VisibilityLevel } from "../../constants/prayer-group-constants";
import { MediaFile } from "../../types/media-file-types";

export type CreatePrayerGroupForm = {
  groupName?: string;
  description?: string;
  rules?: string;
  visibilityLevel?: VisibilityLevel;
  avatarFile?: MediaFile;
  bannerFile?: MediaFile;
};
