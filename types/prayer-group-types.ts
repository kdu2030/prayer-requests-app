import {
  JoinStatus,
  PrayerGroupRole,
  VisibilityLevel,
} from "../constants/prayer-group-constants";
import { MediaFile } from "./media-file-types";

export type RawPrayerGroupUserSummary = {
  userId?: number;
  fullName?: string;
  username?: string;
  image?: MediaFile;
  prayerGroupRole?: PrayerGroupRole;
};

export type PrayerGroupUserSummary = {
  userId?: number;
  fullName?: string;
  username?: string;
  image?: MediaFile;
  prayerGroupRole?: PrayerGroupRole;
};

export type RawPrayerGroupDetails = {
  prayerGroupId?: number;
  groupName?: string;
  description?: string;
  rules?: string;
  visibilityLevel?: VisibilityLevel;
  userJoinStatus?: JoinStatus;
  prayerGroupRole?: PrayerGroupRole;
  admins?: PrayerGroupUserSummary[];
  avatarFile?: MediaFile;
  bannerFile?: MediaFile;
};

export type PrayerGroupDetails = {
  prayerGroupId?: number;
  groupName?: string;
  description?: string;
  rules?: string;
  visibilityLevel?: VisibilityLevel;
  userJoinStatus?: JoinStatus;
  prayerGroupRole?: PrayerGroupRole;
  admins?: PrayerGroupUserSummary[];
  avatarFile?: MediaFile;
  bannerFile?: MediaFile;
};

export type RawPrayerGroupSummary = {
  id?: number;
  groupName?: string;
  avatarFile?: MediaFile;
};

export type PrayerGroupSummary = Omit<RawPrayerGroupSummary, "id"> & {
  prayerGroupId?: number;
};
