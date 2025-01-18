import { MediaFile } from "../../types/media-file-types";

export type CreatePrayerGroupForm = {
  groupName?: string;
  description?: string;
  rules?: string;
  image?: MediaFile;
  color?: string;
};
