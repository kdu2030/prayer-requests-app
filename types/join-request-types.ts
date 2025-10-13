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
  user?: JoinRequestUserSummary;
  submittedDate?: string;
};

export type JoinRequestForm = {
  approvedJoinRequestIds: number[];
  rejectedJoinRequestIds: number[];
};
