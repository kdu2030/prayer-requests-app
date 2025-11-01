import { SortConfig } from "./api-response-types";
import {
  PrayerGroupSummary,
  PrayerGroupUserSummary,
} from "./prayer-group-types";

export type PrayerRequestFilterCriteria = {
  prayerGroupIds?: number[];
  pageIndex?: number;
  pageSize?: number;
  bookmarkedByUserId?: number;
  includeExpiredRequests?: boolean;
  sortConfig: SortConfig;
};

export type PrayerRequestGetResponse = {
  prayerRequests?: PrayerRequestModel[];
  totalCount?: number;
  numberOfPages?: number;
  pageIndex?: number;
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
  userLikeId?: number;
  userCommentId?: number;
  userBookmarkId?: number;
  userPrayerSessionId?: number;
};

export enum PrayerRequestSortFields {
  CreatedDate = "CREATED_DATE",
  LikeCount = "LIKE_COUNT",
  CommentCount = "COMMENT_COUNT",
  PrayedCount = "PRAYED_COUNT",
}
