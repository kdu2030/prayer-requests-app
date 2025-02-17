import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { RawMediaFile } from "./media-file-types";

export type RawPrayerGroupAdminSummary = {
  id?: number;
  fullName?: string;
  image?: RawMediaFile;
};

export type RawPrayerGroupDetails = {
  id?: number;
  groupName?: string;
  description?: string;
  rules?: string;
  color?: string;
  isUserJoined?: boolean;
  userRole?: PrayerGroupRole;
  admins?: RawPrayerGroupAdminSummary[];
  imageFile?: RawMediaFile;
  bannerImageFile?: RawMediaFile;
};

export type RawPrayerGroupSummary = {
  id?: number;
  groupName?: string;
  imageFile?: RawMediaFile;
};

export type PrayerGroupSummary = Omit<RawPrayerGroupSummary, "id"> & {
  prayerGroupId?: number;
};
