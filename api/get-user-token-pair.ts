import { BEARER_PREFIX } from "../constants/auth-constants";
import { ManagedErrorResponse } from "../types/error-handling";
import { RawUserTokenPair } from "./post-signup";
import axios, { AxiosError } from "axios";

export const getUserTokenPair = async (
  baseUrl: string,
  refreshToken: string
): Promise<ManagedErrorResponse<RawUserTokenPair>> => {
  try {
    const url = `${baseUrl}/api/v1/user/token`;
    const response = await axios.get<RawUserTokenPair>(url, {
      headers: {
        Authorization: `${BEARER_PREFIX} ${refreshToken}`,
      },
    });

    return { isError: false, value: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<ManagedErrorResponse<any>>;
    return {
      isError: true,
      error: axiosError.response?.data,
    };
  }
};
