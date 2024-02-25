import axios, { AxiosError } from "axios";

import {
  ApiResponse,
  ValidationErrorResponse,
} from "../types/api-response-types";
import { SignupForm } from "../types/forms/auth-forms";

export interface ApiAuthResponse extends ValidationErrorResponse {
  token?: string;
  refreshToken?: string;
}

export const postSignup = async (
  baseUrl: string,
  signupRequest: SignupForm
): Promise<ApiResponse<ApiAuthResponse>> => {
  try {
    const url = `${baseUrl}/auth/signup`;
    const signupResponse = await axios.post<ApiAuthResponse>(
      url,
      signupRequest
    );

    return { isError: false, value: signupResponse.data };
  } catch (error) {
    const axiosError = error as AxiosError<ApiAuthResponse>;
    return { isError: true, errors: axiosError?.response?.data.errors };
  }
};
