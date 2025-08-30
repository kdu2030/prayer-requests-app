import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { MediaFile, RawMediaFile } from "./media-file-types";

export type RawPrayerGroupUserSummary = {
  id?: number;
  fullName?: string;
  username?: string;
  image?: RawMediaFile;
  role?: PrayerGroupRole;
};

export type PrayerGroupUserSummary = {
  userId?: number;
  fullName?: string;
  username?: string;
  image?: MediaFile;
  role?: PrayerGroupRole;
};

export interface DeletablePrayerGroupUser extends PrayerGroupUserSummary {
  isDeleted?: boolean;
}

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
  isUserJoined?: boolean;
  userRole?: PrayerGroupRole;
  admins?: PrayerGroupUserSummary[];
  avatarFile?: MediaFile;
  bannerImageFile?: MediaFile;
};

export type RawPrayerGroupSummary = {
  id?: number;
  groupName?: string;
  avatarFile?: RawMediaFile;
};

export type PrayerGroupSummary = Omit<RawPrayerGroupSummary, "id"> & {
  prayerGroupId?: number;
};
