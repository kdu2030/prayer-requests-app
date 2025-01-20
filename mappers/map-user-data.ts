import { GetUserSummaryResponse } from "../api/get-user-summary";
import { decodeJwtToken } from "../components/authentication/auth-helpers";
import {
  UserData,
  UserTokenPair,
} from "../types/context/api-data-context-type";

export const mapUserData = (
  userSummaryResponse: GetUserSummaryResponse
): UserData => {
  return {
    userId: userSummaryResponse.id,
    fullName: userSummaryResponse.fullName,
    email: userSummaryResponse.email,
    username: userSummaryResponse.username,
    image: {
      ...userSummaryResponse.image,
      mediaFileId: userSummaryResponse.id,
    },
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
