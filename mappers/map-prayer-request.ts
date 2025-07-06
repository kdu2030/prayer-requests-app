import {
  PrayerRequestModel,
  RawPrayerRequestModel,
} from "../types/prayer-request-types";
import { mapPrayerGroupSummary, mapPrayerGroupUser } from "./map-prayer-group";

export const mapPrayerRequests = (
  rawPrayerRequests: RawPrayerRequestModel[]
): PrayerRequestModel[] => {
  return rawPrayerRequests.map((rawPrayerRequest) => ({
    prayerRequestId: rawPrayerRequest.id,
    requestTitle: rawPrayerRequest.requestTitle,
    requestDescription: rawPrayerRequest.requestDescription,
    createdDate: rawPrayerRequest.createdDate,
    prayerGroup: mapPrayerGroupSummary(rawPrayerRequest.prayerGroup),
    user: rawPrayerRequest.user
      ? mapPrayerGroupUser(rawPrayerRequest.user)
      : undefined,
    likeCount: rawPrayerRequest.likeCount,
    commentCount: rawPrayerRequest.commentCount,
    prayedCount: rawPrayerRequest.prayedCount,
    expirationDate: rawPrayerRequest.expirationDate,
    isUserCommented: rawPrayerRequest.isUserCommented,
    isUserLiked: rawPrayerRequest.isUserLiked,
    isUserPrayed: rawPrayerRequest.isUserPrayed,
  }));
};
