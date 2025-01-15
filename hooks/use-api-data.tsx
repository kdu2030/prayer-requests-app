import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";
import * as React from "react";

import { getUserTokenPair } from "../api/get-user-token-pair";
import { decodeJwtToken } from "../components/authentication/auth-helpers";
import { BEARER_PREFIX } from "../constants/auth-constants";
import {
  ApiDataContextType,
  UserData,
  UserTokenPair,
} from "../types/context/api-data-context-type";
import { isTokenValid } from "../helpers/api-helpers";

const defaultApiData: ApiDataContextType = {
  baseUrl: "https://prayerappservices.onrender.com",
  setUserData: () => {},
  setUserTokens: () => {},
};

const ApiDataContext = React.createContext(defaultApiData);

type Props = {
  children: React.ReactNode;
};

export const ApiDataContextProvider: React.FC<Props> = ({ children }) => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL ?? "";
  const [userData, setUserData] = React.useState<UserData>({});
  const [userTokens, setUserTokens] = React.useState<
    UserTokenPair | undefined
  >();

  return (
    <ApiDataContext.Provider
      value={{
        baseUrl,
        userData,
        setUserData,
        userTokens,
        setUserTokens,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiDataContext = () => {
  const apiDataContext = React.useContext(ApiDataContext);
  const fetchRef = React.useRef<AxiosInstance>(axios.create());

  const addAuthorizationHeader = async (config: InternalAxiosRequestConfig) => {
    const { userTokens, baseUrl, setUserTokens } = apiDataContext;
    let currentUserTokens: UserTokenPair = { ...userTokens };

    if (isTokenValid(userTokens?.refreshToken)) {
      router.push("/auth/welcome");
      throw new Error("Refresh token is expired.");
    }

    if (isTokenValid(userTokens?.accessToken)) {
      const response = await getUserTokenPair(
        baseUrl,
        userTokens?.refreshToken?.token ?? ""
      );
      if (response.isError) {
        router.push("/auth/welcome");
        throw new Error("Unable to fetch user tokens.");
      }

      const updatedAccessToken = decodeJwtToken(
        response.value?.accessToken ?? ""
      );
      const updatedRefreshToken = decodeJwtToken(
        response.value?.refreshToken ?? ""
      );

      currentUserTokens = {
        accessToken: updatedAccessToken,
        refreshToken: updatedRefreshToken,
      };

      setUserTokens(currentUserTokens);
    }

    config.headers.setAuthorization(
      `${BEARER_PREFIX} ${currentUserTokens.accessToken}`
    );

    return config;
  };

  fetchRef.current.interceptors.request.use(addAuthorizationHeader);

  return {
    ...apiDataContext,
    fetch: fetchRef.current,
  };
};
