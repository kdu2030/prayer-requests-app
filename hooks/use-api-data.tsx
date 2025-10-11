import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";
import * as React from "react";

import { getUserTokenPair } from "../api/get-user-token-pair";
import { decodeJwtToken } from "../components/authentication/jwt-helpers";
import { BEARER_PREFIX } from "../constants/auth-constants";
import { isTokenValid } from "../helpers/api-helpers";
import {
  ApiDataContextType,
  UserData,
  UserTokenPair,
} from "../types/context/api-data-context-type";

const defaultApiData = {
  baseUrl: "https://prayerappservices.onrender.com",
  setUserData: () => {},
  setUserTokens: () => {},
  fetch: () => {},
};

export const ApiDataContext = React.createContext<ApiDataContextType>(
  defaultApiData as unknown as ApiDataContextType
);

type Props = {
  children: React.ReactNode;
};

export const ApiDataContextProvider: React.FC<Props> = ({ children }) => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL ?? "";
  const [userData, setUserData] = React.useState<UserData>({});
  const [userTokens, setUserTokens] = React.useState<
    UserTokenPair | undefined
  >();
  const fetchRef = React.useRef<AxiosInstance>(axios.create());

  const refreshTokens = React.useCallback(async () => {
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

    const newUserTokens = {
      accessToken: updatedAccessToken,
      refreshToken: updatedRefreshToken,
    };

    setUserTokens(newUserTokens);
    return newUserTokens;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  const addAuthorizationHeader = React.useCallback(
    async (config: InternalAxiosRequestConfig) => {
      let tokensToUse = userTokens;

      if (!isTokenValid(userTokens?.refreshToken)) {
        router.push("/auth/welcome");
        throw new Error("Refresh token is expired.");
      }

      if (!isTokenValid(userTokens?.accessToken)) {
        tokensToUse = await refreshTokens();
      }

      config.headers.setAuthorization(
        `${BEARER_PREFIX} ${tokensToUse?.accessToken?.token}`
      );

      return config;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    const fetch = fetchRef.current;
    const interceptorId = fetch.interceptors.request.use(
      addAuthorizationHeader
    );

    return () => {
      fetch.interceptors.request.eject(interceptorId);
    };
  }, [addAuthorizationHeader]);

  return (
    <ApiDataContext.Provider
      value={{
        baseUrl,
        userData,
        setUserData,
        userTokens,
        setUserTokens,
        fetch: fetchRef.current,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiDataContext = () => React.useContext(ApiDataContext);
