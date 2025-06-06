import { compact } from "lodash";

import { GetUserSummaryResponse } from "../api/get-user-summary";
import { decodeJwtToken } from "../components/authentication/jwt-helpers";
import {
  UserData,
  UserTokenPair,
} from "../types/context/api-data-context-type";
import { mapMediaFile } from "./map-media-file";
import { mapPrayerGroupSummary } from "./map-prayer-group";

export const mapUserData = (
  userSummaryResponse: GetUserSummaryResponse
): UserData => {
  const prayerGroups = userSummaryResponse.prayerGroups?.map((summary) =>
    mapPrayerGroupSummary(summary)
  );

  return {
    userId: userSummaryResponse.id,
    fullName: userSummaryResponse.fullName,
    email: userSummaryResponse.email,
    username: userSummaryResponse.username,
    image: mapMediaFile(userSummaryResponse.image),
    prayerGroups: compact(prayerGroups),
  };
};

export const mapUserTokens = (
  userSummaryResponse: GetUserSummaryResponse
): UserTokenPair => {
  const rawAccessToken = userSummaryResponse.tokens?.accessToken;
  const rawRefreshToken = userSummaryResponse.tokens?.refreshToken;

  const accessToken = rawAccessToken
    ? decodeJwtToken(rawAccessToken)
    : undefined;

  const refreshToken = rawRefreshToken
    ? decodeJwtToken(rawRefreshToken)
    : undefined;

  return {
    accessToken,
    refreshToken,
  };
};
