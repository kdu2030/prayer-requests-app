import axios from "axios";

import { BEARER_PREFIX } from "../constants/auth-constants";
import { handleApiErrors } from "../helpers/api-helpers";
import { ManagedErrorResponse } from "../types/error-handling";
import { RawUserTokenPair } from "./post-signup";

export const getUserTokenPair = async (
  baseUrl: string,
  refreshToken: string
): Promise<ManagedErrorResponse<RawUserTokenPair>> => {
  try {
    const url = `${baseUrl}/api/user/token`;
    const response = await axios.get<RawUserTokenPair>(url, {
      headers: {
        Authorization: `${BEARER_PREFIX} ${refreshToken}`,
      },
    });

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};
