import AsyncStorage from "@react-native-async-storage/async-storage";

import { ApiAuthResponse } from "../../api/post-signup";
import { mapUserData } from "../../mappers/map-user-data";
import {
  UserData,
  UserTokenPair,
} from "../../types/context/api-data-context-type";
import {
  REFRESH_TOKEN_STORAGE_KEY,
  USER_ID_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY,
} from "./auth-constants";
import { decodeJwtToken } from "./jwt-helpers";

export const handleSuccessfulAuthentication = (
  apiAuthResponse: ApiAuthResponse,
  setUserData: (userData: UserData) => void,
  setUserTokens: (userTokenPair: UserTokenPair) => void
) => {
  const { id: userId } = apiAuthResponse;
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

  setUserData(mapUserData(apiAuthResponse));
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
