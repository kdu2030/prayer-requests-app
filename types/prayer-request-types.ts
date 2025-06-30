import { SortConfig } from "./api-response-types";
import {
  PrayerGroupSummary,
  PrayerGroupUserSummary,
  RawPrayerGroupSummary,
  RawPrayerGroupUserSummary,
} from "./prayer-group-types";

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

export type RawPrayerRequestGetResponse = {
  prayerRequests?: RawPrayerRequestModel[];
  totalCount?: number;
};

export type PrayerRequestModel = {
  prayerRequestId?: number;
  requestTitle?: string;
  requestDescription?: string;
  createdDate?: string;
  prayerGroup?: PrayerGroupSummary;
  user?: PrayerGroupUserSummary;
  likeCount?: number;
  commentCount?: number;
  prayedCount?: number;
  expirationDate?: string;
  isUserPrayed?: boolean;
  isUserLiked?: boolean;
  isUserCommented?: boolean;
};

export enum PrayerRequestSortFields {
  CreatedDate = "CreatedDate",
  LikeCount = "LikeCount",
  CommentCount = "CommentCount",
  PrayedCount = "PrayedCount",
}
