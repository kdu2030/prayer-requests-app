import { SortConfig } from "../../../types/api-response-types";
import {
  RawPrayerGroupSummary,
  RawPrayerGroupUserSummary,
} from "../../../types/prayer-group-types";

export enum TimeToLiveOption {
  OneWeek = 7,
  TwoWeeks = 14,
  ThreeWeeks = 15,
}

export type CreatePrayerRequestForm = {
  requestTitle?: string;
  requestDescription?: string;
  timeToLive?: TimeToLiveOption;
};

export type RawCreatePrayerRequestForm = {
  userId?: number;
  requestTitle?: string;
  requestDescription?: string;
  expirationDate?: string;
};

export enum CreatePrayerRequestWizardStep {
  RequestBodyStep = "RequestBodyStep",
  ExpirationStep = "ExpirationStep",
}

export type PrayerRequestFilterCriteria = {
  prayerGroupIds?: number[];
  creatorUserIds?: number[];
  pageIndex?: number;
  pageSize?: number;
  bookmarkedByUserId?: number;
  includeExpiredRequests?: boolean;
  sortConfig: SortConfig;
};

export type RawPrayerRequestModel = {
  id?: number;
  requestTitle?: string;
  requestDescription?: string;
  createdDate?: string;
  prayerGroup?: RawPrayerGroupSummary;
  user?: RawPrayerGroupUserSummary;
  likeCount?: number;
  commentCount?: number;
  prayedCount?: number;
  expirationDate?: string;
  isUserPrayed?: boolean;
  isUserLiked?: boolean;
  isUserCommented?: boolean;
};
