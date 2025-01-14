import { AxiosError } from "axios";
import { router } from "expo-router";

import { UserTokenPair } from "../types/context/api-data-context-type";
import { ManagedErrorResponse } from "../types/error-handling";

export const handleApiErrors = <TResponse>(
  error: any
): ManagedErrorResponse<TResponse> => {
  const axiosError = error as AxiosError;
  return { isError: true, error: axiosError?.response?.data };
};

export const validateRefreshToken = (userTokens: UserTokenPair) => {
  const currentDate = new Date();

  if (
    !userTokens?.refreshToken ||
    !userTokens.refreshTokenExpiryDate ||
    userTokens.refreshTokenExpiryDate < currentDate
  ) {
    router.push("/auth/welcome");
    throw new Error("Refresh token is expired.");
  }
};
