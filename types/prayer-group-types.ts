import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { RawMediaFile } from "./media-file-types";

export type PrayerGroupAdminSummary = {
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
  admins?: PrayerGroupAdminSummary[];
};
