import axios, { AxiosError } from "axios";

import { ApiResponse } from "../types/api-response-types";
import { SigninForm } from "../types/forms/auth-forms";
import { ApiAuthResponse } from "./post-signup";

export const postSignin = async (
  baseUrl: string,
  signinRequest: SigninForm
): Promise<ApiResponse<ApiAuthResponse>> => {
  try {
    const url = `${baseUrl}/auth/signin`;
    const signinResponse = await axios.post<ApiAuthResponse>(
      url,
      signinRequest
    );

    return { isError: false, value: signinResponse.data };
  } catch (error) {
    const axiosError = error as AxiosError<ApiAuthResponse>;
    return { isError: true, errors: axiosError?.response?.data.errors ?? [] };
  }
};
