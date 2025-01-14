import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { ManagedErrorResponse } from "../types/error-handling";
import { MediaFile } from "../types/media-file-types";
import { RawUserTokenPair } from "./post-signup";

export type GetUserSummaryResponse = {
  id?: number;
  username?: string;
  email?: string;
  fullName?: string;
  tokens?: RawUserTokenPair;
  image?: MediaFile;
};

const getUserSummary = async (
  fetch: AxiosInstance,
  baseUrl: string,
  userId: number
): Promise<ManagedErrorResponse<GetUserSummaryResponse>> => {
  try {
    const url = `${baseUrl}/api/v1/user/${userId}/summary`;
    const response = await fetch.get<GetUserSummaryResponse>(url, {
      headers: { "Content-Type": "application/json" },
    });

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors<GetUserSummaryResponse>(error);
  }
};
