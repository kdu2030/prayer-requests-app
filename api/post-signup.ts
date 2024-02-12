import axios, { AxiosError } from "axios";

import {
  ApiResponse,
  ValidationErrorResponse,
} from "../types/api-response-types";
import { SignupForm } from "../types/forms/signup-form";

export interface ApiSignupResponse extends ValidationErrorResponse {
  token?: string;
  refreshToken?: string;
}

export const postSignup = async (
  baseUrl: string,
  signupRequest: SignupForm
): Promise<ApiResponse<ApiSignupResponse>> => {
  try {
    const url = `${baseUrl}/auth/signup`;
    const signupResponse = await axios.post<ApiSignupResponse>(
      url,
      signupRequest
    );

    return { isError: false, value: signupResponse.data };
  } catch (error) {
    const axiosError = error as AxiosError<ApiSignupResponse>;
    return { isError: true, errors: axiosError?.response?.data.errors };
  }
};
