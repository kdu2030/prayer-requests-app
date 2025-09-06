import { compact } from "lodash";

import { GetUserSummaryResponse } from "../api/get-user-summary";
import { decodeJwtToken } from "../components/authentication/jwt-helpers";
import {
  UserData,
  UserTokenPair,
} from "../types/context/api-data-context-type";

export const mapUserData = (
  userSummaryResponse: GetUserSummaryResponse
): UserData => {
  return {
    userId: userSummaryResponse.userId,
    fullName: userSummaryResponse.fullName,
    email: userSummaryResponse.email,
    username: userSummaryResponse.username,
    image: userSummaryResponse.image,
    prayerGroups: userSummaryResponse.prayerGroups ?? [],
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
