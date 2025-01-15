import { AxiosError } from "axios";
import { router } from "expo-router";

import { Token, UserTokenPair } from "../types/context/api-data-context-type";
import { ManagedErrorResponse } from "../types/error-handling";

export const handleApiErrors = <TResponse>(
  error: any
): ManagedErrorResponse<TResponse> => {
  const axiosError = error as AxiosError;
  return { isError: true, error: axiosError?.response?.data };
};

export const isTokenValid = (token: Token | undefined) => {
  const currentDate = new Date();
  return token && currentDate > token.expiryDate;
};

export const validateRefreshToken = (userTokens: UserTokenPair) => {
  const currentDate = new Date();

  if (isTokenValid(userTokens.refreshToken)) {
    router.push("/auth/welcome");
    throw new Error("Refresh token is expired.");
  }
};
