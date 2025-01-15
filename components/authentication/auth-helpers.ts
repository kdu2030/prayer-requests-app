import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";

import { ApiAuthResponse } from "../../api/post-signup";
import {
  Token,
  UserData,
  UserTokenPair,
} from "../../types/context/api-data-context-type";
import {
  JwtTokenFields,
  REFRESH_TOKEN_STORAGE_KEY,
  USER_ID_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY,
} from "./auth-constants";

export const decodeJwtToken = (token: string): Token => {
  const tokenParts = token.split(".");
  const payload = JSON.parse(decode(tokenParts[1]));
  // exp field is in seconds since Jan 1, 1970. Date constructor expects ms since 1970
  const expiryDate = new Date(payload[JwtTokenFields.ExpiryDateSecs] * 1000);

  return {
    token,
    expiryDate,
  };
};

export const handleSuccessfulAuthentication = (
  apiAuthResponse: ApiAuthResponse,
  setUserData: (userData: UserData) => void,
  setUserTokens: (userTokenPair: UserTokenPair) => void
) => {
  const { id: userId, username, emailAddress, fullName } = apiAuthResponse;
  const { refreshToken, accessToken } = apiAuthResponse?.tokens ?? {};

  if (!refreshToken || !accessToken) {
    return;
  }

  const accessTokenData = decodeJwtToken(accessToken);
  const refreshTokenData = decodeJwtToken(refreshToken);

  const userTokenPair: UserTokenPair = {
    accessToken: accessTokenData,
    refreshToken: refreshTokenData,
  };

  const userData: UserData = {
    userId,
    username,
    fullName,
    email: emailAddress,
  };

  setUserData(userData);
  setUserTokens(userTokenPair);

  AsyncStorage.setItem(
    USER_TOKEN_STORAGE_KEY,
    userTokenPair.accessToken?.token ?? ""
  );
  AsyncStorage.setItem(
    REFRESH_TOKEN_STORAGE_KEY,
    userTokenPair.refreshToken?.token ?? ""
  );
  AsyncStorage.setItem(USER_ID_STORAGE_KEY, (userId ?? "").toString());
};
