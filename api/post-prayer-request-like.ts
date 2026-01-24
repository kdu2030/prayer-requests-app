import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import {
  PrayerRequestActionCreateRequest,
  PrayerRequestLikeModel,
} from "../types/prayer-request-types";

const postPrayerRequestLike = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestId: number,
  createRequest: PrayerRequestActionCreateRequest,
): Promise<ManagedErrorResponse<PrayerRequestLikeModel>> => {
  const url = `${baseUrl}/api/prayerrequest/${prayerRequestId}/like`;

  try {
    const response = await fetch.post<PrayerRequestLikeModel>(
      url,
      createRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostPrayerRequestLike = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (
      prayerRequestId: number,
      createRequest: PrayerRequestActionCreateRequest,
    ) => {
      return postPrayerRequestLike(
        fetch,
        baseUrl,
        prayerRequestId,
        createRequest,
      );
    },
    [baseUrl, fetch],
  );
};
