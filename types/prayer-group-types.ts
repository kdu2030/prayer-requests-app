import {
  JoinStatus,
  PrayerGroupRole,
  VisibilityLevel,
} from "../constants/prayer-group-constants";
import { MediaFile } from "./media-file-types";

export type PrayerGroupUserSummary = {
  userId?: number;
  fullName?: string;
  username?: string;
  image?: MediaFile;
  prayerGroupRole?: PrayerGroupRole;
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
  joinRequestCount?: number;
};

export type PrayerGroupSummary = {
  prayerGroupId?: number;
  groupName?: string;
  avatarFile?: MediaFile;
  joinStatus?: JoinStatus;
};
