import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";
import _ from "lodash";

import {
  JwtTokenFields,
  REFRESH_TOKEN_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY,
} from "../../constants/auth/auth-constants";
import { ApiResponse } from "../../types/api-response-types";
import {
  UserData,
  UserTokenPair,
} from "../../types/context/api-data-context-type";

export type DecodeData = {
  token: string;
  tokenExpiryDate: Date;
  userData: UserData;
};

export const errorsArrayIncludes = <ValueType>(
  apiResponse: ApiResponse<ValueType>,
  field: string,
  error: string
) => {
  if (!apiResponse.isError) {
    return false;
  }

  return (_.get(apiResponse.errors, field, []) as string[]).includes(error);
};

export const decodeJwtToken = (token: string): DecodeData => {
  const tokenParts = token.split(".");
  const payload = JSON.parse(decode(tokenParts[1]));

  const userData: UserData = {
    userId: Number.parseInt(payload[JwtTokenFields.UserId]),
    username: payload[JwtTokenFields.Username],
    email: payload[JwtTokenFields.EmailAddress],
  };

  // exp field is in seconds since Jan 1, 1970. Date constructor expects ms since 1970
  const tokenExpiryDate = new Date(
    payload[JwtTokenFields.ExpiryDateSecs] * 1000
  );

  return {
    token,
    tokenExpiryDate,
    userData,
  };
};

export const handleSuccessfulAuthentication = (
  token: string,
  refreshToken: string,
  setUserData: (userData: UserData) => void,
  setUserTokens: (userTokenPair: UserTokenPair) => void
) => {
  const userTokenDecodeData = decodeJwtToken(token);
  const refreshTokenDecodeData = decodeJwtToken(refreshToken);

  const userTokenPair: UserTokenPair = {
    token: userTokenDecodeData.token,
    tokenExpiryDate: userTokenDecodeData.tokenExpiryDate,
    refreshToken: refreshTokenDecodeData.token,
    refreshTokenExpiryDate: userTokenDecodeData.tokenExpiryDate,
  };

  setUserData(userTokenDecodeData.userData);
  setUserTokens(userTokenPair);

  AsyncStorage.setItem(USER_TOKEN_STORAGE_KEY, userTokenPair.token);
  AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, userTokenPair.refreshToken);
};
