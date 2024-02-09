import { BaseAPIResponse } from "../types";
import { SignupForm } from "../types/forms/signup-form";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface SignupResponse extends BaseAPIResponse {
  token?: string;
  refreshToken?: string;
}

export const postSignup = async (
  baseUrl: string,
  signupRequest: SignupForm
): Promise<SignupResponse> => {
  try {
    const URL = `${baseUrl}/auth/signup`;
    console.log(URL);
    const signupResponse = await axios.post<SignupResponse>(URL, signupRequest);

    return signupResponse.data;
  } catch (error) {
    const axiosError = error as AxiosError<SignupResponse>;
    return { isError: true, errors: axiosError?.response?.data.errors };
  }
};
