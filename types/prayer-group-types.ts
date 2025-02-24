import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { MediaFile, RawMediaFile } from "./media-file-types";

export type RawPrayerGroupUserSummary = {
  id?: number;
  fullName?: string;
  image?: RawMediaFile;
  role?: PrayerGroupRole;
};

export type PrayerGroupUserSummary = {
  userId?: number;
  fullName?: string;
  image?: MediaFile;
  role?: PrayerGroupRole;
};

export type RawPrayerGroupDetails = {
  id?: number;
  groupName?: string;
  description?: string;
  rules?: string;
  color?: string;
  isUserJoined?: boolean;
  userRole?: PrayerGroupRole;
  admins?: RawPrayerGroupUserSummary[];
  imageFile?: RawMediaFile;
  bannerImageFile?: RawMediaFile;
};

export type PrayerGroupDetails = {
  prayerGroupId?: number;
  groupName?: string;
  description?: string;
  rules?: string;
  color?: string;
  isUserJoined?: boolean;
  userRole?: PrayerGroupRole;
  admins?: PrayerGroupUserSummary[];
  imageFile?: MediaFile;
  bannerImageFile?: MediaFile;
};

export type RawPrayerGroupSummary = {
  id?: number;
  groupName?: string;
  imageFile?: RawMediaFile;
};

export type PrayerGroupSummary = Omit<RawPrayerGroupSummary, "id"> & {
  prayerGroupId?: number;
};
