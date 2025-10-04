import { MediaFile } from "./media-file-types";

export type JoinRequestUserSummary = {
  userId?: number;
  username?: string;
  fullName?: string;
  image?: MediaFile;
};

export type JoinRequestModel = {
  joinRequestId?: number;
  prayerGroupId?: number;
  userSummary?: JoinRequestUserSummary;
  submittedDate?: string;
};
