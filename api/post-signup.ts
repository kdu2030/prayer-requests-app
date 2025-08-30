import axios, { AxiosError } from "axios";

import { ApiErrorResponse, ApiResponse } from "../types/api-response-types";
import { SignupForm } from "../types/forms/auth-forms";
import { MediaFile, RawMediaFile } from "../types/media-file-types";
import {
  PrayerGroupSummary,
  RawPrayerGroupSummary,
} from "../types/prayer-group-types";

export type RawUserTokenPair = {
  accessToken?: string;
  refreshToken?: string;
};

export type ApiAuthResponse = {
  userId?: number;
  username?: string;
  emailAddress?: string;
  fullName?: string;
  tokens?: RawUserTokenPair;
  image?: MediaFile;
  prayerGroups?: PrayerGroupSummary[];
};

export const postSignup = async (
  baseUrl: string,
  signupRequest: SignupForm
): Promise<ApiResponse<ApiAuthResponse>> => {
  try {
    const url = `${baseUrl}/api/user`;
    const signupResponse = await axios.post<ApiAuthResponse>(
      url,
      signupRequest
    );

    return { isError: false, value: signupResponse.data };
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return {
      isError: true,
      errors: axiosError?.response?.data.dataValidationErrors ?? [],
    };
  }
};
