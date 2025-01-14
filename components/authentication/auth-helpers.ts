import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";
import _ from "lodash";

import { ApiAuthResponse } from "../../api/post-signup";
import { ApiResponse } from "../../types/api-response-types";
import {
  UserData,
  UserTokenPair,
} from "../../types/context/api-data-context-type";
import {
  JwtTokenFields,
  REFRESH_TOKEN_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY,
} from "./auth-constants";

export type DecodeData = {
  token: string;
  tokenExpiryDate: Date;
};

export const decodeJwtToken = (token: string): DecodeData => {
  const tokenParts = token.split(".");
  const payload = JSON.parse(decode(tokenParts[1]));
  // exp field is in seconds since Jan 1, 1970. Date constructor expects ms since 1970
  const tokenExpiryDate = new Date(
    payload[JwtTokenFields.ExpiryDateSecs] * 1000
  );

  return {
    token,
    tokenExpiryDate,
  };
};

export const handleSuccessfulAuthentication = (
  apiAuthResponse: ApiAuthResponse,
  setUserData: (userData: UserData) => void,
  setUserTokens: (userTokenPair: UserTokenPair) => void
) => {
  const { userId, username, emailAddress, fullName } = apiAuthResponse;
  const { refreshToken, accessToken } = apiAuthResponse?.tokens ?? {};

  if (!refreshToken || !accessToken) {
    return;
  }

  const userTokenDecodeData = decodeJwtToken(accessToken);
  const refreshTokenDecodeData = decodeJwtToken(refreshToken);

  const userTokenPair: UserTokenPair = {
    accessToken: userTokenDecodeData.token,
    accessTokenExpiryDate: userTokenDecodeData.tokenExpiryDate,
    refreshToken: refreshTokenDecodeData.token,
    refreshTokenExpiryDate: userTokenDecodeData.tokenExpiryDate,
  };

  const userData: UserData = {
    userId,
    username,
    fullName,
    email: emailAddress,
  };

  setUserData(userData);
  setUserTokens(userTokenPair);

  console.log(apiAuthResponse.tokens);

  AsyncStorage.setItem(USER_TOKEN_STORAGE_KEY, userTokenPair.accessToken);
  AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, userTokenPair.refreshToken);
};
