import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as React from "react";

import {
  REFRESH_TOKEN_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY,
} from "../components/authentication/auth-constants";
import { decodeJwtToken } from "../components/authentication/auth-helpers";
import {
  ApiDataContextType,
  UserData,
  UserTokenPair,
} from "../types/context/api-data-context-type";

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

  const initializeContextFromStorage = async () => {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

    const refreshTokenExpiryDate = refreshToken
      ? decodeJwtToken(refreshToken).tokenExpiryDate
      : undefined;

    if (
      refreshToken == null ||
      refreshTokenExpiryDate == null ||
      refreshTokenExpiryDate <= new Date()
    ) {
      router.push("/auth/welcome");
      return;
    }
  };

  return { ...apiDataContext, initializeContextFromStorage };
};
